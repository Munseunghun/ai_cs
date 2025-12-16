/**
 * 이벤트 서비스
 * 이벤트/프로모션 관련 비즈니스 로직 처리
 * Supabase 데이터베이스 사용
 */

const { supabase: supabaseClient } = require('../config/supabase');
const cache = require('../config/redis');
const logger = require('../config/logger');

/**
 * 이벤트 목록 조회 (live_broadcasts 테이블 사용)
 * @param {Object} p_filters - 필터 조건
 * @returns {Promise<Object>} - 이벤트 목록 및 페이지네이션 정보
 */
const searchEvents = async (p_filters = {}) => {
  try {
    // 기본값 설정
    const _v_page = parseInt(p_filters.page || 0);
    const _v_page_size = parseInt(p_filters.page_size || 20);
    const _v_offset = _v_page * _v_page_size;
    
    // 정렬 필드 매핑 (프론트엔드 컬럼명 -> 데이터베이스 컬럼명)
    // live_broadcasts 테이블에는 start_date가 없고 broadcast_date만 있음
    const _v_sort_field_mapping = {
      'start_date': 'broadcast_date',
      'end_date': 'broadcast_date',
      'broadcast_date': 'broadcast_date',
      'broadcast_start_time': 'broadcast_start_time',
      'broadcast_end_time': 'broadcast_end_time',
      'created_at': 'created_at',
      'updated_at': 'updated_at',
    };
    
    // 정렬 필드 변환 (존재하지 않는 컬럼명을 실제 컬럼명으로 매핑)
    const _v_raw_sort_by = p_filters.sort_by || 'broadcast_date';
    const _v_sort_by = _v_sort_field_mapping[_v_raw_sort_by] || 'broadcast_date';
    const _v_sort_order = p_filters.sort_order || 'desc';
    
    // 정렬 필드가 변경되었으면 로그 기록
    if (_v_raw_sort_by !== _v_sort_by) {
      logger.debug('정렬 필드 매핑:', {
        original: _v_raw_sort_by,
        mapped: _v_sort_by
      });
    }
    
    // 캐시 키 생성
    const _v_cache_key = `events:search:${JSON.stringify(p_filters)}`;
    
    // 캐시 확인
    const _v_cached = await cache.getCache(_v_cache_key);
    if (_v_cached) {
      logger.debug('이벤트 검색 결과 캐시 히트');
      return _v_cached;
    }
    
    // Supabase 쿼리 빌더 시작
    let _v_query = supabaseClient
      .from('live_broadcasts')
      .select('*', { count: 'exact' });
    
    // 필터가 복잡한 경우(채널, 키워드 등)를 위해 클라이언트 측 필터링 사용
    // or() 메서드가 불안정할 수 있으므로, 더 많은 데이터를 가져온 후 메모리에서 필터링
    // 빈 문자열이나 "전체"는 필터로 인식하지 않음
    const _v_has_channel_filter = !!(p_filters.channel && p_filters.channel.trim() !== '' && p_filters.channel !== '전체');
    const _v_has_brand_filter = !!(p_filters.brand && p_filters.brand.trim() !== '' && p_filters.brand !== '전체');
    const _v_has_keyword_filter = !!(p_filters.keyword && p_filters.keyword.trim() !== '');
    const _v_needs_client_filtering = !!(_v_has_channel_filter || _v_has_keyword_filter || _v_has_brand_filter);
    
    // broadcast_type 필터 (LIVE: 라이브 방송, EXHIBITION: 전시/이벤트)
    if (p_filters.broadcast_type) {
      _v_query = _v_query.eq('broadcast_type', p_filters.broadcast_type);
      logger.info('broadcast_type 필터 적용:', { broadcast_type: p_filters.broadcast_type });
    } else if (p_filters.exclude_exhibition === 'true') {
      // Live 방송 조회에서는 EXHIBITION 제외 (NULL 또는 'LIVE'만 조회)
      _v_query = _v_query.or('broadcast_type.is.null,broadcast_type.neq.EXHIBITION');
      logger.info('EXHIBITION 제외 필터 적용');
    }
    
    // 상태 필터 확인 (빈 문자열이나 "전체"는 필터로 인식하지 않음)
    const _v_status_value = p_filters.status ? p_filters.status.trim().toUpperCase() : '';
    const _v_has_status_filter = !!(_v_status_value && 
                                     _v_status_value !== '' && 
                                     _v_status_value !== '전체' &&
                                     ['ACTIVE', 'PENDING', 'ENDED'].includes(_v_status_value));
    
    // 한국 시간대 계산 함수
    const getKoreaToday = () => {
      const _v_now = new Date();
      const _v_korea_offset = 9 * 60; // 한국은 UTC+9
      const _v_korea_time = new Date(_v_now.getTime() + (_v_korea_offset - _v_now.getTimezoneOffset()) * 60000);
      const _v_year = _v_korea_time.getFullYear();
      const _v_month = String(_v_korea_time.getMonth() + 1).padStart(2, '0');
      const _v_day = String(_v_korea_time.getDate()).padStart(2, '0');
      return `${_v_year}-${_v_month}-${_v_day}`;
    };
    
    // ACTIVE 상태 필터가 있으면 오늘 날짜만 조회 (현재 시점에 진행 중인 방송만)
    if (_v_has_status_filter && _v_status_value === 'ACTIVE') {
      const _v_today_str = getKoreaToday();
      
      // 오늘 날짜만 조회
      _v_query = _v_query.eq('broadcast_date', _v_today_str);
      
      logger.info('ACTIVE 상태 필터: 오늘 날짜만 조회', { 
        today: _v_today_str,
        statusValue: _v_status_value
      });
    }
    // PENDING 상태 필터가 있으면 오늘 이후 날짜만 조회 (예정된 방송만)
    else if (_v_has_status_filter && _v_status_value === 'PENDING') {
      const _v_today_str = getKoreaToday();
      
      // 오늘 이후 날짜만 조회 (오늘 포함 - 오늘 날짜이지만 아직 시작하지 않은 방송 포함)
      _v_query = _v_query.gte('broadcast_date', _v_today_str);
      
      logger.info('PENDING 상태 필터: 오늘 이후 날짜만 조회', { 
        fromDate: _v_today_str,
        statusValue: _v_status_value
      });
    }
    // ENDED 상태 필터가 있으면 오늘 이전 날짜만 조회 (종료된 방송만)
    else if (_v_has_status_filter && _v_status_value === 'ENDED') {
      const _v_today_str = getKoreaToday();
      
      // 오늘 이전 날짜만 조회
      _v_query = _v_query.lt('broadcast_date', _v_today_str);
      
      logger.info('ENDED 상태 필터: 오늘 이전 날짜만 조회', { 
        toDate: _v_today_str,
        statusValue: _v_status_value
      });
    }
    
    // 사용자 지정 날짜 필터 (상태 필터가 없을 때만 적용)
    if (!_v_has_status_filter) {
      // 시작일 필터
      if (p_filters.start_date) {
        _v_query = _v_query.gte('broadcast_date', p_filters.start_date);
      }
      
      // 종료일 필터
      if (p_filters.end_date) {
        _v_query = _v_query.lte('broadcast_date', p_filters.end_date);
      }
    }
    
    // 정렬 적용 (정렬 필드가 존재하는지 확인)
    try {
      _v_query = _v_query.order(_v_sort_by, { ascending: _v_sort_order === 'asc' });
    } catch (p_order_error) {
      logger.warn('정렬 필드 오류, 기본 정렬 사용:', p_order_error);
      _v_query = _v_query.order('broadcast_date', { ascending: false });
    }
    
    // 클라이언트 측 필터링이 필요하거나 상태 필터가 있는 경우 더 많은 데이터 가져오기
    // 상태 필터는 계산된 상태로 필터링해야 하므로 메모리에서 처리해야 함
    // 단, ACTIVE 상태 필터는 이미 오늘 날짜로 필터링했으므로 데이터 양이 적을 수 있음
    if (_v_needs_client_filtering || _v_has_status_filter) {
      // 클라이언트 측 필터링 또는 상태 필터링을 위해 더 많은 데이터 가져오기 (최대 1000개)
      // 페이지네이션은 메모리에서 처리
      _v_query = _v_query.range(0, 999);
      
      logger.debug('메모리 필터링 모드: 더 많은 데이터 조회', {
        needsClientFiltering: _v_needs_client_filtering,
        hasStatusFilter: _v_has_status_filter,
        maxRecords: 999
      });
    } else {
      // 필터가 없으면 DB 쿼리 레벨에서 페이지네이션 적용
      _v_query = _v_query.range(_v_offset, _v_offset + _v_page_size - 1);
      
      logger.debug('DB 레벨 페이지네이션 모드', {
        offset: _v_offset,
        pageSize: _v_page_size
      });
    }
    
    // 쿼리 실행
    let _v_data, _v_error, _v_total;
    try {
      const _v_result = await _v_query;
      _v_data = _v_result.data;
      _v_error = _v_result.error;
      _v_total = _v_result.count;
      
      logger.info('Supabase 쿼리 실행 완료:', {
        dataCount: _v_data?.length || 0,
        totalCount: _v_total,
        hasError: !!_v_error,
        filters: p_filters,
        needsClientFiltering: _v_needs_client_filtering,
        hasStatusFilter: _v_has_status_filter
      });
    } catch (p_query_error) {
      logger.error('Supabase 쿼리 실행 실패:', {
        error: p_query_error,
        message: p_query_error.message,
        stack: p_query_error.stack
      });
      throw new Error(`데이터베이스 쿼리 실행 실패: ${p_query_error.message || '알 수 없는 오류'}`);
    }
    
    if (_v_error) {
      logger.error('Supabase 이벤트 검색 실패:', {
        error: _v_error,
        message: _v_error.message,
        details: _v_error.details,
        hint: _v_error.hint,
        code: _v_error.code,
        filters: p_filters
      });
      
      // 에러 메시지와 힌트 추출
      const _v_error_message = _v_error.message || '알 수 없는 오류';
      const _v_error_hint = _v_error.hint ? ` (힌트: ${_v_error.hint})` : '';
      const _v_error_code = _v_error.code || '';
      
      // 모든 에러는 원래 메시지로 전달
      throw new Error(`데이터베이스 조회 실패: ${_v_error_message}${_v_error_hint}`);
    }
    
    // 클라이언트 측 필터링 적용 (필요한 경우)
    let _v_filtered_data = _v_data || [];
    
    logger.info('데이터 처리 시작:', {
      needsClientFiltering: _v_needs_client_filtering,
      hasStatusFilter: _v_has_status_filter,
      dataCount: _v_data?.length || 0,
      totalCount: _v_total,
      filters: {
        channel: p_filters.channel,
        brand: p_filters.brand,
        keyword: p_filters.keyword,
        status: p_filters.status
      },
      sampleData: _v_data?.slice(0, 3).map(item => ({
        live_id: item.live_id,
        channel_code: item.channel_code,
        platform_name: item.platform_name,
        brand_name: item.brand_name
      })) || []
    });
    
    // 클라이언트 측 필터링 적용 (채널, 브랜드, 키워드)
    if (_v_needs_client_filtering) {
      // 채널 코드와 한글 이름 매핑 테이블
      const _v_channel_name_map = {
        'NAVER': ['네이버', 'naver'],
        'KAKAO': ['카카오', 'kakao'],
        '11ST': ['11번가', '11st', '11번'],
        'GMARKET': ['G마켓', 'gmarket', '지마켓'],
        'OLIVEYOUNG': ['올리브영', 'oliveyoung', '올리브'],
        'GRIP': ['그립', 'grip'],
        'MUSINSA': ['무신사', 'musinsa'],
        'LOTTEON': ['롯데온', 'lotteon', '롯데'],
        'AMOREMALL': ['아모레몰', 'amoremall', '아모레'],
      };
      
      // 채널/플랫폼 필터 (클라이언트 측) - 빈 문자열이나 "전체"는 필터링하지 않음
      if (_v_has_channel_filter) {
        const _v_channel_value = p_filters.channel.trim().toUpperCase();
        const _v_channel_names = _v_channel_name_map[_v_channel_value] || [];
        const _v_channel_value_lower = _v_channel_value.toLowerCase();
        const _v_before_count = _v_filtered_data.length;
        
        _v_filtered_data = _v_filtered_data.filter(_v_item => {
          const _v_channel_code = (_v_item?.channel_code || '').toUpperCase();
          const _v_platform_name = (_v_item?.platform_name || '').toLowerCase();
          
          // 채널 코드 정확 일치
          if (_v_channel_code === _v_channel_value) {
            return true;
          }
          
          // 플랫폼 이름 일치 (한글 이름 또는 영문 이름)
          if (_v_channel_names.some(name => _v_platform_name.includes(name.toLowerCase()))) {
            return true;
          }
          
          // 부분 일치 (하위 호환성)
          if (_v_channel_code.includes(_v_channel_value) || _v_platform_name.includes(_v_channel_value_lower)) {
            return true;
          }
          
          return false;
        });
        
        logger.debug(`채널 필터 적용: ${_v_before_count} -> ${_v_filtered_data.length}`, {
          channelFilter: _v_channel_value,
          channelNames: _v_channel_names,
          sampleItems: _v_filtered_data.slice(0, 3).map(item => ({
            channel_code: item.channel_code,
            platform_name: item.platform_name
          }))
        });
      }
      
      // 브랜드 필터 (클라이언트 측) - 정확 일치 또는 부분 일치, 빈 문자열이나 "전체"는 필터링하지 않음
      if (_v_has_brand_filter) {
        const _v_brand_value = p_filters.brand.trim().toLowerCase();
        const _v_before_count = _v_filtered_data.length;
        _v_filtered_data = _v_filtered_data.filter(_v_item => {
          const _v_brand_name = (_v_item?.brand_name || '').toLowerCase();
          // 정확 일치 또는 부분 일치
          return _v_brand_name === _v_brand_value || _v_brand_name.includes(_v_brand_value);
        });
        logger.debug(`브랜드 필터 적용: ${_v_before_count} -> ${_v_filtered_data.length}`, {
          brandFilter: p_filters.brand,
          sampleItems: _v_filtered_data.slice(0, 3).map(item => ({
            brand_name: item.brand_name
          }))
        });
      }
      
      // 키워드 필터 (클라이언트 측) - 빈 문자열은 필터링하지 않음
      if (_v_has_keyword_filter) {
        const _v_keyword_value = p_filters.keyword.trim().toLowerCase();
        const _v_before_count = _v_filtered_data.length;
        _v_filtered_data = _v_filtered_data.filter(_v_item => {
          const _v_title_customer = (_v_item?.live_title_customer || '').toLowerCase();
          const _v_title_cs = (_v_item?.live_title_cs || '').toLowerCase();
          const _v_brand_name = (_v_item?.brand_name || '').toLowerCase();
          return _v_title_customer.includes(_v_keyword_value) || 
                 _v_title_cs.includes(_v_keyword_value) || 
                 _v_brand_name.includes(_v_keyword_value);
        });
        logger.debug(`키워드 필터 적용: ${_v_before_count} -> ${_v_filtered_data.length}`);
      }
      
      // 필터링 후 총 개수 업데이트
      _v_total = _v_filtered_data.length;
      logger.info(`클라이언트 측 필터링 완료: 최종 ${_v_total}개`, {
        beforeFiltering: _v_data?.length || 0,
        afterFiltering: _v_total,
        filters: {
          channel: p_filters.channel,
          brand: p_filters.brand,
          keyword: p_filters.keyword
        },
        sampleData: _v_filtered_data.slice(0, 3).map(item => ({
          live_id: item.live_id,
          channel_code: item.channel_code,
          platform_name: item.platform_name,
          brand_name: item.brand_name,
          title: item.live_title_customer
        }))
      });
    } else {
      // 클라이언트 측 필터링이 필요 없으면 원본 데이터 사용
      // _v_total은 이미 Supabase 쿼리 결과로 설정됨
      logger.debug('클라이언트 측 필터링 불필요, 원본 데이터 사용', {
        dataCount: _v_data?.length || 0,
        totalCount: _v_total
      });
    }
    
    // 데이터 변환 (live_broadcasts 테이블 구조에 맞게)
    const _v_transformed_data = _v_filtered_data
      .filter(_v_item => {
        // live_id가 없는 항목은 제외 (유효하지 않은 데이터)
        if (!_v_item?.live_id) {
          logger.warn('live_id가 없는 항목 제외:', {
            item: _v_item,
            title: _v_item?.live_title_customer || _v_item?.live_title_cs
          });
          return false;
        }
        return true;
      })
      .map((_v_item, _v_index) => {
      try {
        // 현재 시간 기준으로 상태 계산 (안전하게 처리)
        const _v_calculated_status = calculateLiveStatus(
          _v_item?.broadcast_date || null,
          _v_item?.broadcast_start_time || null,
          _v_item?.broadcast_end_time || null
        );
        
        return {
          event_id: _v_item.live_id, // live_id가 필수이므로 항상 존재함
          title: _v_item?.live_title_customer || _v_item?.live_title_cs || '제목 없음',
          subtitle: _v_item?.live_title_cs || '',
          channel_id: _v_item?.channel_id || null,
          channel_name: _v_item?.platform_name || _v_item?.channel_name || '알 수 없음',
          channel_code: _v_item?.channel_code || '',
          channel_type: _v_item?.channel_type || 'LIVE',
          start_date: _v_item?.broadcast_date || null,
          end_date: _v_item?.broadcast_date || null, // live_broadcasts는 단일 날짜
          discount_rate: null, // live_broadcasts에는 없을 수 있음
          discount_amount: null,
          benefit_summary: _v_item?.benefit_summary || '',
          benefit_detail: _v_item?.benefit_detail || '',
          target_products: _v_item?.target_products || '',
          event_url: _v_item?.source_url || '',
          thumbnail_url: _v_item?.thumbnail_url || '',
          status: _v_calculated_status, // 계산된 상태 사용
          priority: _v_item?.priority || 0,
          favorite_count: _v_item?.favorite_count || 0,
          view_count: _v_item?.view_count || 0,
          tags: Array.isArray(_v_item?.tags) ? _v_item.tags : [],
          created_at: _v_item?.created_at || null,
          updated_at: _v_item?.updated_at || null,
          // 추가 필드
          brand_name: _v_item?.brand_name || '',
          platform_name: _v_item?.platform_name || '',
          broadcast_date: _v_item?.broadcast_date || null,
          broadcast_start_time: _v_item?.broadcast_start_time || null,
          broadcast_end_time: _v_item?.broadcast_end_time || null,
        };
      } catch (p_item_error) {
        logger.error(`데이터 변환 실패 (인덱스 ${_v_index}):`, {
          error: p_item_error,
          item: _v_item,
          live_id: _v_item?.live_id
        });
        // 에러가 발생한 항목은 null 반환하여 필터링
        return null;
      }
    }).filter(_v_item => _v_item !== null && !_v_item.error); // null 및 에러 항목 제외
    
    // 상태 필터가 있고 계산된 상태로 필터링해야 하는 경우
    let _v_status_filtered_data = _v_transformed_data;
    if (_v_has_status_filter) {
      _v_status_filtered_data = _v_transformed_data.filter(_v_item => {
        const _v_item_status = _v_item.status || 'PENDING';
        
        if (_v_status_value === 'ACTIVE') {
          return _v_item_status === 'ACTIVE';
        } else if (_v_status_value === 'PENDING') {
          // PENDING: 미래 날짜이거나 오늘 날짜이지만 아직 시작하지 않은 방송
          return _v_item_status === 'PENDING' || _v_item_status === 'SCHEDULED';
        } else if (_v_status_value === 'ENDED') {
          // ENDED: 과거 날짜이거나 오늘 날짜이지만 이미 종료된 방송
          return _v_item_status === 'ENDED' || _v_item_status === 'COMPLETED';
        }
        return true;
      });
      
      // 상태 필터링 후 총 개수 업데이트
      _v_total = _v_status_filtered_data.length;
      
      logger.info('상태 필터링 결과:', {
        status: _v_status_value,
        originalStatus: p_filters.status,
        beforeFilter: _v_transformed_data.length,
        afterFilter: _v_total,
        sampleStatuses: _v_transformed_data.slice(0, 5).map(item => ({
          title: item.title,
          status: item.status,
          broadcast_date: item.broadcast_date,
          broadcast_start_time: item.broadcast_start_time
        }))
      });
      
      // 상태 필터링 후 페이지네이션은 나중에 통합적으로 적용
      // (클라이언트 측 필터링과 함께 처리)
    }
    
    // 최종 데이터 (상태 필터링 적용 여부에 따라)
    const _v_final_data = _v_has_status_filter ? _v_status_filtered_data : _v_transformed_data;
    
    // 페이지네이션 적용
    // 클라이언트 측 필터링 또는 상태 필터가 있으면 메모리에서 페이지네이션 적용
    let _v_paginated_data = _v_final_data;
    if (_v_needs_client_filtering || _v_has_status_filter) {
      // 클라이언트 측 필터링 또는 상태 필터링 후 페이지네이션 적용
      const _v_start_index = _v_offset;
      const _v_end_index = _v_offset + _v_page_size;
      _v_paginated_data = _v_final_data.slice(_v_start_index, _v_end_index);
      
      logger.debug('페이지네이션 적용:', {
        offset: _v_offset,
        pageSize: _v_page_size,
        startIndex: _v_start_index,
        endIndex: _v_end_index,
        beforePagination: _v_final_data.length,
        afterPagination: _v_paginated_data.length,
        needsClientFiltering: _v_needs_client_filtering,
        hasStatusFilter: _v_has_status_filter
      });
    }
    
    // 결과 구성
    const _v_result = {
      success: true,
      data: _v_paginated_data,
      pagination: {
        total: _v_total || _v_paginated_data.length,
        page: _v_page,
        page_size: _v_page_size,
        total_pages: Math.ceil((_v_total || _v_paginated_data.length) / _v_page_size),
      },
    };
    
    // 캐시 저장 (5분)
    await cache.setCache(_v_cache_key, _v_result, 300);
    
    logger.info('이벤트 검색 완료 (Supabase):', {
      filters: p_filters,
      resultCount: _v_paginated_data.length,
      total: _v_total || _v_paginated_data.length,
      needsClientFiltering: _v_needs_client_filtering,
      hasStatusFilter: _v_has_status_filter,
      statusValue: _v_status_value,
      hasChannelFilter: _v_has_channel_filter,
      hasBrandFilter: _v_has_brand_filter,
      hasKeywordFilter: _v_has_keyword_filter,
      pagination: {
        page: _v_page,
        pageSize: _v_page_size,
        totalPages: Math.ceil((_v_total || _v_paginated_data.length) / _v_page_size)
      },
      dataFlow: {
        rawDataCount: _v_data?.length || 0,
        afterClientFiltering: _v_needs_client_filtering ? _v_filtered_data.length : 'N/A',
        afterTransformation: _v_transformed_data.length,
        afterStatusFiltering: _v_has_status_filter ? _v_status_filtered_data.length : 'N/A',
        finalDataCount: _v_final_data.length,
        paginatedCount: _v_paginated_data.length
      }
    });
    
    return _v_result;
  } catch (p_error) {
    logger.error('이벤트 검색 실패:', {
      error: p_error,
      message: p_error.message,
      stack: p_error.stack,
      filters: p_filters,
      errorName: p_error.name,
      errorCode: p_error.code
    });
    
    // 더 구체적인 에러 메시지 전달
    let _v_error_message = p_error.message || '이벤트 검색 중 오류가 발생했습니다.';
    
    // Supabase 에러인 경우 더 자세한 정보 포함
    if (p_error.message && p_error.message.includes('데이터베이스')) {
      _v_error_message = p_error.message;
    } else if (p_error.message) {
      _v_error_message = `이벤트 검색 중 오류가 발생했습니다: ${p_error.message}`;
    }
    
    throw new Error(_v_error_message);
  }
};

/**
 * 이벤트 상세 조회 (live_broadcasts 테이블 사용)
 * @param {string} p_event_id - 이벤트 ID (live_id)
 * @param {number} p_user_id - 조회하는 사용자 ID (선택)
 * @returns {Promise<Object>} - 이벤트 상세 정보
 */
const getEventById = async (p_event_id, p_user_id = null) => {
  try {
    logger.info('이벤트 상세 조회 시작:', {
      event_id: p_event_id,
      user_id: p_user_id
    });
    
    // 캐시 확인
    const _v_cache_key = `event:${p_event_id}`;
    const _v_cached = await cache.getCache(_v_cache_key);
    
    if (_v_cached) {
      logger.debug('이벤트 상세 캐시 히트:', p_event_id);
      return _v_cached;
    }
    
    // event_id 유효성 검사 (live_id 형식 확인)
    if (!p_event_id || typeof p_event_id !== 'string' || p_event_id.trim() === '') {
      logger.warn('유효하지 않은 event_id 형식:', {
        event_id: p_event_id,
        type: typeof p_event_id
      });
      return null;
    }
    
    // live_id 정규화 (공백 제거)
    const _v_normalized_live_id = p_event_id.trim();
    
    // Supabase에서 조회
    logger.debug('Supabase 쿼리 실행:', {
      table: 'live_broadcasts',
      filter: { live_id: _v_normalized_live_id },
      original_event_id: p_event_id
    });
    
    // 기본 정보 조회
    const { data: _v_data, error: _v_error } = await supabaseClient
      .from('live_broadcasts')
      .select('*')
      .eq('live_id', _v_normalized_live_id)
      .single();
    
    if (_v_error) {
      logger.error('Supabase 이벤트 상세 조회 실패:', {
        error: _v_error,
        event_id: p_event_id,
        error_code: _v_error.code,
        error_message: _v_error.message,
        error_details: _v_error.details,
        error_hint: _v_error.hint
      });
      
      if (_v_error.code === 'PGRST116') {
        // 데이터 없음
        logger.warn('이벤트를 찾을 수 없음 (PGRST116):', p_event_id);
        return null;
      }
      throw _v_error;
    }
    
    if (!_v_data) {
      logger.warn('이벤트 데이터가 null:', p_event_id);
      return null;
    }
    
    logger.debug('이벤트 데이터 조회 성공:', {
      event_id: p_event_id,
      live_id: _v_data.live_id,
      title: _v_data.live_title_customer || _v_data.live_title_cs
    });
    
    // 관련 데이터 병렬 조회
    // ✅ 신규 테이블 포함: live_coupons, live_comments, live_faqs, live_intro, live_statistics, live_images
    const [
      { data: _v_products },
      { data: _v_all_benefits },
      { data: _v_stt_info },
      { data: _v_cs_info },
      { data: _v_restrictions },
      { data: _v_policy },
      { data: _v_coupons_new },
      { data: _v_comments },
      { data: _v_faqs },
      { data: _v_intro },
      { data: _v_statistics },
      { data: _v_images }
    ] = await Promise.all([
      supabaseClient.from('live_products').select('*').eq('live_id', _v_normalized_live_id).order('product_order', { ascending: true }),
      supabaseClient.from('live_benefits').select('*').eq('live_id', _v_normalized_live_id),
      supabaseClient.from('live_stt_info').select('*').eq('live_id', _v_normalized_live_id).maybeSingle(),
      supabaseClient.from('live_cs_info').select('*').eq('live_id', _v_normalized_live_id).maybeSingle(),
      supabaseClient.from('live_restrictions').select('*').eq('live_id', _v_normalized_live_id).maybeSingle(),
      supabaseClient.from('live_policy').select('*').eq('live_id', _v_normalized_live_id).maybeSingle().then(result => result).catch(() => ({ data: null })),
      // 신규 테이블 조회
      supabaseClient.from('live_coupons').select('*').eq('live_id', _v_normalized_live_id).eq('is_active', true),
      supabaseClient.from('live_comments').select('*').eq('live_id', _v_normalized_live_id).order('comment_timestamp', { ascending: false }).limit(50),
      supabaseClient.from('live_faqs').select('*').eq('live_id', _v_normalized_live_id).order('view_count', { ascending: false }),
      supabaseClient.from('live_intro').select('*').eq('live_id', _v_normalized_live_id).maybeSingle(),
      supabaseClient.from('live_statistics').select('*').eq('live_id', _v_normalized_live_id).order('snapshot_time', { ascending: false }).limit(1).maybeSingle(),
      supabaseClient.from('live_images').select('*').eq('live_id', _v_normalized_live_id).order('image_type', { ascending: true })
    ]);
    
    // live_benefits 테이블에서 benefit_type으로 분류
    const _v_discounts_raw = _v_all_benefits?.filter(b => b.benefit_type === '할인') || [];
    const _v_gifts_raw = _v_all_benefits?.filter(b => b.benefit_type === '사은품' || b.benefit_type === 'GWP') || [];
    const _v_coupons_raw = _v_all_benefits?.filter(b => b.benefit_type === '쿠폰' || b.benefit_type === '적립') || [];
    const _v_shipping_raw = _v_all_benefits?.filter(b => b.benefit_type === '배송') || [];
    const _v_benefits = _v_all_benefits || [];
    
    // 혜택 중복 제거 함수
    const removeDuplicateBenefits = (p_benefits) => {
      const _v_unique = [];
      const _v_keys = new Set();
      
      if (p_benefits && Array.isArray(p_benefits)) {
        for (const _v_benefit of p_benefits) {
          // 중복 체크를 위한 고유 키 생성
          const _v_unique_key = [
            _v_benefit.benefit_type || '',
            _v_benefit.benefit_name || '',
            _v_benefit.benefit_detail || '',
            _v_benefit.benefit_condition || '',
            _v_benefit.benefit_valid_period || ''
          ].join('|');
          
          // 중복되지 않은 경우에만 추가
          if (!_v_keys.has(_v_unique_key)) {
            _v_keys.add(_v_unique_key);
            _v_unique.push(_v_benefit);
          }
        }
      }
      
      return _v_unique;
    };
    
    // 각 혜택 타입별로 중복 제거
    const _v_discounts = removeDuplicateBenefits(_v_discounts_raw);
    const _v_gifts = removeDuplicateBenefits(_v_gifts_raw);
    const _v_coupons = removeDuplicateBenefits(_v_coupons_raw);
    const _v_shipping = removeDuplicateBenefits(_v_shipping_raw);
    
    // 상품 중복 제거 로직
    // 같은 상품 (product_name, option_name, sale_price가 모두 동일)인 경우 하나만 남김
    const _v_unique_products = [];
    const _v_product_keys = new Set();
    
    if (_v_products && Array.isArray(_v_products)) {
      for (const _v_product of _v_products) {
        // 중복 체크를 위한 고유 키 생성
        // 상품명, 옵션명, 판매가를 기준으로 중복 판단
        const _v_unique_key = [
          (_v_product.product_name || '').trim(),
          (_v_product.option_name || '').trim(),
          (_v_product.sale_price || '').toString().trim()
        ].join('|');
        
        // 중복되지 않은 경우에만 추가
        if (!_v_product_keys.has(_v_unique_key)) {
          _v_product_keys.add(_v_unique_key);
          _v_unique_products.push(_v_product);
        } else {
          logger.debug('중복 상품 제거:', {
            product_name: _v_product.product_name,
            option_name: _v_product.option_name,
            sale_price: _v_product.sale_price,
            unique_key: _v_unique_key
          });
        }
      }
    }
    
    logger.info('관련 데이터 조회 완료:', {
      products_raw: _v_products?.length || 0,
      products_unique: _v_unique_products.length,
      products_duplicates_removed: (_v_products?.length || 0) - _v_unique_products.length,
      all_benefits: _v_all_benefits?.length || 0,
      discounts_raw: _v_discounts_raw?.length || 0,
      discounts_unique: _v_discounts.length,
      discounts_duplicates_removed: (_v_discounts_raw?.length || 0) - _v_discounts.length,
      gifts_raw: _v_gifts_raw?.length || 0,
      gifts_unique: _v_gifts.length,
      gifts_duplicates_removed: (_v_gifts_raw?.length || 0) - _v_gifts.length,
      coupons_raw: _v_coupons_raw?.length || 0,
      coupons_unique: _v_coupons.length,
      coupons_duplicates_removed: (_v_coupons_raw?.length || 0) - _v_coupons.length,
      shipping_raw: _v_shipping_raw?.length || 0,
      shipping_unique: _v_shipping.length,
      shipping_duplicates_removed: (_v_shipping_raw?.length || 0) - _v_shipping.length,
      benefits: _v_benefits?.length || 0,
      hasSttInfo: !!_v_stt_info,
      sttInfoRaw: _v_stt_info ? {
        has_key_message: !!_v_stt_info.key_message,
        has_broadcast_qa: !!_v_stt_info.broadcast_qa,
        has_timeline_summary: !!_v_stt_info.timeline_summary
      } : null,
      hasCsInfo: !!_v_cs_info,
      hasRestrictions: !!_v_restrictions,
      hasPolicy: !!_v_policy,
      // 혜택 타입별 분류 확인
      benefit_types: _v_all_benefits?.map(b => b.benefit_type).filter((v, i, a) => a.indexOf(v) === i) || []
    });
    
    // 데이터 변환
    const _v_calculated_status = calculateLiveStatus(
      _v_data.broadcast_date,
      _v_data.broadcast_start_time,
      _v_data.broadcast_end_time
    );
    
    // STT 정보 파싱 (JSON 문자열인 경우)
    let _v_parsed_stt_info = null;
    if (_v_stt_info) {
      try {
        logger.debug('STT 정보 원본 데이터:', {
          has_key_message: !!_v_stt_info.key_message,
          key_message_type: typeof _v_stt_info.key_message,
          key_message_preview: typeof _v_stt_info.key_message === 'string' 
            ? _v_stt_info.key_message.substring(0, 100) 
            : 'not string',
          has_broadcast_qa: !!_v_stt_info.broadcast_qa,
          broadcast_qa_type: typeof _v_stt_info.broadcast_qa,
          has_timeline_summary: !!_v_stt_info.timeline_summary,
          timeline_summary_type: typeof _v_stt_info.timeline_summary
        });
        
        // key_message 파싱
        let _v_key_mentions = [];
        if (_v_stt_info.key_message) {
          if (typeof _v_stt_info.key_message === 'string') {
            try {
              _v_key_mentions = JSON.parse(_v_stt_info.key_message || '[]');
            } catch (p_parse_error) {
              // JSON이 아닌 경우 문자열 그대로 사용
              logger.debug('key_message가 JSON이 아님, 문자열로 처리:', p_parse_error);
              _v_key_mentions = _v_stt_info.key_message.split('\n').filter(m => m.trim());
            }
          } else if (Array.isArray(_v_stt_info.key_message)) {
            _v_key_mentions = _v_stt_info.key_message;
          }
        }
        
        // broadcast_qa 파싱
        let _v_broadcast_qa = [];
        if (_v_stt_info.broadcast_qa) {
          if (typeof _v_stt_info.broadcast_qa === 'string') {
            try {
              _v_broadcast_qa = JSON.parse(_v_stt_info.broadcast_qa || '[]');
            } catch (p_parse_error) {
              logger.debug('broadcast_qa 파싱 실패:', p_parse_error);
              _v_broadcast_qa = [];
            }
          } else if (Array.isArray(_v_stt_info.broadcast_qa)) {
            _v_broadcast_qa = _v_stt_info.broadcast_qa;
          }
        }
        
        // timeline_summary 파싱
        let _v_timeline_summary = [];
        if (_v_stt_info.timeline_summary) {
          if (typeof _v_stt_info.timeline_summary === 'string') {
            try {
              _v_timeline_summary = JSON.parse(_v_stt_info.timeline_summary || '[]');
            } catch (p_parse_error) {
              logger.debug('timeline_summary 파싱 실패:', p_parse_error);
              _v_timeline_summary = [];
            }
          } else if (Array.isArray(_v_stt_info.timeline_summary)) {
            _v_timeline_summary = _v_stt_info.timeline_summary;
          }
        }
        
        _v_parsed_stt_info = {
          key_mentions: _v_key_mentions,
          key_message: _v_key_mentions, // 호환성을 위해 중복
          broadcast_qa: _v_broadcast_qa,
          timeline_summary: _v_timeline_summary,
          timeline: _v_timeline_summary // 호환성을 위해 중복
        };
        
        logger.info('STT 정보 파싱 완료:', {
          key_mentions_count: _v_key_mentions.length,
          broadcast_qa_count: _v_broadcast_qa.length,
          timeline_summary_count: _v_timeline_summary.length
        });
      } catch (p_parse_error) {
        logger.error('STT 정보 파싱 실패:', {
          error: p_parse_error,
          message: p_parse_error.message,
          stack: p_parse_error.stack
        });
        _v_parsed_stt_info = {
          key_mentions: [],
          key_message: [],
          broadcast_qa: [],
          timeline_summary: [],
          timeline: []
        };
      }
    } else {
      logger.debug('STT 정보가 없음:', {
        live_id: _v_normalized_live_id,
        stt_info: _v_stt_info
      });
    }
    
    // CS 정보 파싱
    let _v_parsed_cs_info = null;
    if (_v_cs_info) {
      try {
        _v_parsed_cs_info = {
          expected_questions: typeof _v_cs_info.expected_questions === 'string'
            ? JSON.parse(_v_cs_info.expected_questions || '[]')
            : (_v_cs_info.expected_questions || []),
          response_scripts: typeof _v_cs_info.response_scripts === 'string'
            ? JSON.parse(_v_cs_info.response_scripts || '[]')
            : (_v_cs_info.response_scripts || []),
          risk_points: typeof _v_cs_info.risk_points === 'string'
            ? JSON.parse(_v_cs_info.risk_points || '[]')
            : (_v_cs_info.risk_points || []),
          cs_note: _v_cs_info.cs_notes || _v_cs_info.cs_note
        };
      } catch (p_parse_error) {
        logger.warn('CS 정보 파싱 실패:', p_parse_error);
        _v_parsed_cs_info = {
          expected_questions: [],
          response_scripts: [],
          risk_points: [],
          cs_note: null
        };
      }
    }
    
    // 혜택 데이터 구조화
    const _v_structured_benefits = {
      discounts: _v_discounts || [],
      gifts: _v_gifts || [],
      coupons: _v_coupons || [],
      shipping: _v_shipping || _v_benefits?.filter(b => b.benefit_type === '배송') || [],
      delivery: _v_shipping || [], // 호환성을 위해
      point_details: _v_benefits?.filter(b => b.benefit_type === '포인트') || []
    };
    
    // 혜택 데이터 디버깅 로그 (상세)
    logger.info('혜택 데이터 구조화 완료:', {
      live_id: _v_normalized_live_id,
      discounts_count: _v_structured_benefits.discounts.length,
      gifts_count: _v_structured_benefits.gifts.length,
      coupons_count: _v_structured_benefits.coupons.length,
      shipping_count: _v_structured_benefits.shipping.length,
      point_details_count: _v_structured_benefits.point_details.length,
      total_benefits: _v_structured_benefits.discounts.length + 
                     _v_structured_benefits.gifts.length + 
                     _v_structured_benefits.coupons.length + 
                     _v_structured_benefits.shipping.length + 
                     _v_structured_benefits.point_details.length,
      raw_data: {
        discounts_raw: _v_discounts?.length || 0,
        gifts_raw: _v_gifts?.length || 0,
        coupons_raw: _v_coupons?.length || 0,
        benefits_raw: _v_benefits?.length || 0,
        shipping_raw: _v_shipping?.length || 0
      },
      // 샘플 데이터 추가
      discount_sample: _v_discounts?.[0] ? {
        discount_id: _v_discounts[0].discount_id,
        discount_type: _v_discounts[0].discount_type,
        discount_detail: _v_discounts[0].discount_detail?.substring(0, 50)
      } : null,
      gift_sample: _v_gifts?.[0] ? {
        gift_id: _v_gifts[0].gift_id,
        gift_type: _v_gifts[0].gift_type,
        gift_name: _v_gifts[0].gift_name?.substring(0, 50)
      } : null,
      coupon_sample: _v_coupons?.[0] ? {
        coupon_id: _v_coupons[0].coupon_id,
        coupon_type: _v_coupons[0].coupon_type,
        coupon_name: _v_coupons[0].coupon_name?.substring(0, 50)
      } : null
    });
    
    const _v_transformed_data = {
      ..._v_data,
      event_id: _v_data.live_id,
      title: _v_data.live_title_customer || _v_data.live_title_cs,
      subtitle: _v_data.live_title_cs,
      channel_name: _v_data.platform_name || _v_data.channel_name,
      channel_code: _v_data.channel_code,
      channel_type: _v_data.channel_type || 'LIVE',
      start_date: _v_data.broadcast_date,
      end_date: _v_data.broadcast_date,
      event_url: _v_data.source_url,
      source_url: _v_data.source_url, // 원천 URL
      status: _v_calculated_status,
      // 메타데이터 구조화
      metadata: {
        live_id: _v_data.live_id,
        live_title_customer: _v_data.live_title_customer,
        live_title_cs: _v_data.live_title_cs,
        platform_name: _v_data.platform_name,
        brand_name: _v_data.brand_name,
        source_url: _v_data.source_url
      },
      // 스케줄 정보 구조화
      schedule: {
        broadcast_date: _v_data.broadcast_date,
        broadcast_start_time: _v_data.broadcast_start_time,
        broadcast_end_time: _v_data.broadcast_end_time,
        benefit_valid_type: _v_data.benefit_valid_type,
        benefit_start_datetime: _v_data.benefit_start_datetime,
        benefit_end_datetime: _v_data.benefit_end_datetime,
        broadcast_type: _v_data.broadcast_type || _v_data.broadcast_format
      },
      // 상품 목록 (중복 제거됨)
      products: _v_unique_products || [],
      // 혜택 정보 구조화
      benefits: _v_structured_benefits,
      // 이벤트 정보 (혜택에서 이벤트 타입 추출)
      events: _v_benefits?.filter(b => b.benefit_type === '이벤트') || [],
      // STT 정보
      stt_info: _v_parsed_stt_info,
      live_specific: _v_parsed_stt_info, // 호환성을 위해 중복
      // CS 정보
      cs_info: _v_parsed_cs_info,
      cs_response: _v_parsed_cs_info, // 호환성을 위해 중복
      // 제한 사항
      restrictions: _v_restrictions || {},
      // 중복 적용 정책 (live_policy 테이블 또는 restrictions에서 추출)
      duplicate_policy: {
        coupon_duplicate: _v_policy?.coupon_duplicate || _v_restrictions?.coupon_duplicate || null,
        point_duplicate: _v_policy?.reward_duplicate || _v_restrictions?.reward_duplicate || null,
        other_promotion_duplicate: _v_policy?.other_event_combination || _v_restrictions?.other_event_combination || null,
        employee_discount: _v_policy?.employee_discount_applicable || _v_restrictions?.employee_discount_applicable || null,
        duplicate_note: _v_policy?.policy_detail || _v_restrictions?.policy_detail || null
      },
      policy: _v_policy || _v_restrictions || {}, // 호환성을 위해
      // ✅ 신규 테이블 데이터 추가
      coupons_new: _v_coupons_new || [], // 신규 쿠폰 테이블 데이터
      comments: _v_comments || [], // 댓글/채팅
      faqs: _v_faqs || [], // FAQ
      intro: _v_intro || null, // 라이브 소개
      statistics: _v_statistics || null, // 통계 정보
      images: _v_images || [] // 이미지
    };
    
    // 캐시 저장 (5분)
    await cache.setCache(_v_cache_key, _v_transformed_data, 300);
    
    // 조회수 증가 (비동기, 에러 무시)
    supabaseClient
      .from('live_broadcasts')
      .update({ view_count: (_v_data.view_count || 0) + 1 })
      .eq('live_id', p_event_id)
      .then(() => logger.debug('조회수 증가 완료'))
      .catch((_v_err) => logger.warn('조회수 증가 실패:', _v_err));
    
    // 조회 로그 기록 (비동기, 에러 무시)
    if (p_user_id) {
      // view_logs 테이블이 있다면 기록
      const { insert } = require('../config/supabase');
      insert('view_logs', {
        user_id: p_user_id,
        event_id: p_event_id,
        view_type: 'DETAIL'
      }).catch((_v_err) => logger.warn('조회 로그 기록 실패:', _v_err));
    }
    
    logger.info('이벤트 상세 조회 완료 (Supabase):', p_event_id);
    return _v_transformed_data;
  } catch (p_error) {
    logger.error('이벤트 상세 조회 실패:', p_error);
    throw new Error('이벤트 조회 중 오류가 발생했습니다.');
  }
};

/**
 * 현재 시간 기준으로 라이브 방송 상태 계산
 * @param {Date} p_broadcast_date - 방송 날짜
 * @param {string} p_start_time - 방송 시작 시간 (HH:MM 형식)
 * @param {string} p_end_time - 방송 종료 시간 (HH:MM 형식)
 * @returns {string} - 'ACTIVE', 'PENDING', 'ENDED'
 */
const calculateLiveStatus = (p_broadcast_date, p_start_time, p_end_time) => {
  try {
    // 한국 시간대 고려 (UTC+9)
    const _v_now_utc = new Date();
    const _v_korea_offset = 9 * 60; // 한국은 UTC+9
    const _v_now = new Date(_v_now_utc.getTime() + (_v_korea_offset - _v_now_utc.getTimezoneOffset()) * 60000);
    
    // 오늘 날짜 (한국 시간 기준)
    const _v_today = new Date(_v_now.getFullYear(), _v_now.getMonth(), _v_now.getDate());
    
    if (!p_broadcast_date) {
      return 'PENDING';
    }
    
    // 날짜 파싱 안전하게 처리
    let _v_broadcast_date;
    if (p_broadcast_date instanceof Date) {
      _v_broadcast_date = p_broadcast_date;
    } else if (typeof p_broadcast_date === 'string') {
      _v_broadcast_date = new Date(p_broadcast_date);
      // 유효하지 않은 날짜인지 확인
      if (isNaN(_v_broadcast_date.getTime())) {
        logger.warn('유효하지 않은 날짜:', p_broadcast_date);
        return 'PENDING';
      }
    } else {
      logger.warn('예상치 못한 날짜 형식:', typeof p_broadcast_date, p_broadcast_date);
      return 'PENDING';
    }
    
    const _v_broadcast_date_only = new Date(_v_broadcast_date.getFullYear(), _v_broadcast_date.getMonth(), _v_broadcast_date.getDate());
    
    const _v_date_diff = _v_broadcast_date_only.getTime() - _v_today.getTime();
    const _v_days_diff = Math.floor(_v_date_diff / (1000 * 60 * 60 * 24));
  
    // 미래 날짜
    if (_v_days_diff > 0) {
      return 'PENDING';
    }
    
    // 과거 날짜
    if (_v_days_diff < 0) {
      return 'ENDED';
    }
    
    // 오늘 날짜인 경우 시간으로 판단
    if (_v_days_diff === 0 && p_start_time && p_end_time) {
      try {
        const [_v_start_hour, _v_start_minute] = p_start_time.split(':').map(Number);
        const [_v_end_hour, _v_end_minute] = p_end_time.split(':').map(Number);
        
        // 시간 파싱 검증
        if (isNaN(_v_start_hour) || isNaN(_v_start_minute) || isNaN(_v_end_hour) || isNaN(_v_end_minute)) {
          logger.warn('유효하지 않은 시간 형식:', { p_start_time, p_end_time });
          return 'PENDING';
        }
        
        const _v_start_datetime = new Date(_v_broadcast_date);
        _v_start_datetime.setHours(_v_start_hour || 0, _v_start_minute || 0, 0, 0);
        
        const _v_end_datetime = new Date(_v_broadcast_date);
        _v_end_datetime.setHours(_v_end_hour || 23, _v_end_minute || 59, 59, 999);
        
        const _v_now_time = _v_now.getTime();
        
        if (_v_now_time >= _v_start_datetime.getTime() && _v_now_time <= _v_end_datetime.getTime()) {
          return 'ACTIVE';
        } else if (_v_now_time < _v_start_datetime.getTime()) {
          return 'PENDING';
        } else {
          return 'ENDED';
        }
      } catch (p_time_error) {
        logger.warn('시간 계산 오류:', {
          error: p_time_error,
          start_time: p_start_time,
          end_time: p_end_time
        });
        return 'PENDING';
      }
    }
    
    return 'PENDING';
  } catch (p_error) {
    logger.error('상태 계산 중 오류:', {
      error: p_error,
      broadcast_date: p_broadcast_date,
      start_time: p_start_time,
      end_time: p_end_time
    });
    return 'PENDING'; // 기본값 반환
  }
};

/**
 * 대시보드 데이터 조회 (live_broadcasts 테이블 사용, Supabase)
 * @returns {Promise<Object>} - 대시보드 통계 데이터
 */
const getDashboardData = async () => {
  try {
    // 캐시 확인 (1분 캐시 - 최신 데이터를 위해 짧게 설정)
    const _v_cache_key = 'dashboard:live:stats';
    // 실시간 데이터를 위해 캐시 비활성화 (임시)
    // const _v_cached = await cache.getCache(_v_cache_key);
    // 
    // if (_v_cached) {
    //   logger.debug('대시보드 데이터 캐시 히트');
    //   return _v_cached;
    // }
    
    // 모든 라이브 방송 데이터 조회 (Supabase)
    // Supabase는 기본적으로 1000개 limit이 있으므로 페이지네이션으로 모든 데이터 가져오기
    let _v_all_lives = [];
    let _v_page = 0;
    const _v_page_size = 1000;
    let _v_has_more = true;
    
    while (_v_has_more) {
      const { data: _v_page_data, error: _v_page_error } = await supabaseClient
        .from('live_broadcasts')
        .select('*')
        .order('broadcast_date', { ascending: false })
        .order('broadcast_start_time', { ascending: false })
        .range(_v_page * _v_page_size, (_v_page + 1) * _v_page_size - 1);
      
      if (_v_page_error) {
        logger.error(`Supabase 페이지 ${_v_page} 조회 실패:`, _v_page_error);
        break;
      }
      
      if (_v_page_data && _v_page_data.length > 0) {
        _v_all_lives = _v_all_lives.concat(_v_page_data);
        _v_has_more = _v_page_data.length === _v_page_size;
        _v_page++;
        logger.debug(`페이지 ${_v_page} 로드 완료: ${_v_page_data.length}개 (총 ${_v_all_lives.length}개)`);
      } else {
        _v_has_more = false;
      }
    }
    
    logger.info(`전체 라이브 방송 데이터 로드 완료: ${_v_all_lives.length}개`);
    
    const _v_error = null; // 에러 변수 초기화
    
    if (_v_error) {
      logger.error('Supabase 대시보드 데이터 조회 실패:', _v_error);
      // 에러 발생 시 빈 데이터 반환
      return {
        success: true,
        data: {
          summary: {
            totalEvents: 0,
            activeEvents: 0,
            pendingEvents: 0,
            endedEvents: 0,
            totalPlatforms: 0,
            totalBrands: 0,
            lastUpdated: new Date().toISOString()
          },
          platformStats: [],
          brandStats: [],
          recentActiveEvents: [],
          recentPendingEvents: []
        },
      };
    }
    
    const _v_all_lives_data = _v_all_lives || [];
    
    // 현재 시간 기준으로 상태 재계산
    const _v_lives_with_status = _v_all_lives_data.map(_v_live => {
      const _v_calculated_status = calculateLiveStatus(
        _v_live.broadcast_date,
        _v_live.broadcast_start_time,
        _v_live.broadcast_end_time
      );
      return {
        ..._v_live,
        status: _v_calculated_status,
        calculatedStatus: _v_calculated_status,
        title: _v_live.live_title_customer || _v_live.live_title_cs,
        subtitle: _v_live.live_title_cs,
        channel_name: _v_live.platform_name || _v_live.channel_name,
        event_url: _v_live.source_url,
      };
    });
    
    // 1. 전체 통계
    const _v_active_count = _v_lives_with_status.filter(_v_l => _v_l.calculatedStatus === 'ACTIVE').length;
    const _v_pending_count = _v_lives_with_status.filter(_v_l => _v_l.calculatedStatus === 'PENDING' || _v_l.calculatedStatus === 'SCHEDULED').length;
    const _v_ended_count = _v_lives_with_status.filter(_v_l => _v_l.calculatedStatus === 'ENDED' || _v_l.calculatedStatus === 'COMPLETED').length;
    const _v_total_count = _v_lives_with_status.length;
    
    // 2. 플랫폼별 통계
    const _v_platform_stats = {};
    _v_lives_with_status.forEach(_v_live => {
      const _v_platform = _v_live.platform_name || '기타';
      if (!_v_platform_stats[_v_platform]) {
        _v_platform_stats[_v_platform] = {
          platform: _v_platform,
          active: 0,
          pending: 0,
          ended: 0,
          total: 0
        };
      }
      _v_platform_stats[_v_platform].total++;
      if (_v_live.calculatedStatus === 'ACTIVE') _v_platform_stats[_v_platform].active++;
      else if (_v_live.calculatedStatus === 'PENDING' || _v_live.calculatedStatus === 'SCHEDULED') _v_platform_stats[_v_platform].pending++;
      else if (_v_live.calculatedStatus === 'ENDED' || _v_live.calculatedStatus === 'COMPLETED') _v_platform_stats[_v_platform].ended++;
    });
    
    // 3. 브랜드별 통계
    const _v_brand_stats = {};
    _v_lives_with_status.forEach(_v_live => {
      const _v_brand = _v_live.brand_name || '기타';
      if (!_v_brand_stats[_v_brand]) {
        _v_brand_stats[_v_brand] = {
          brand: _v_brand,
          active: 0,
          pending: 0,
          ended: 0,
          total: 0
        };
      }
      _v_brand_stats[_v_brand].total++;
      if (_v_live.calculatedStatus === 'ACTIVE') _v_brand_stats[_v_brand].active++;
      else if (_v_live.calculatedStatus === 'PENDING' || _v_live.calculatedStatus === 'SCHEDULED') _v_brand_stats[_v_brand].pending++;
      else if (_v_live.calculatedStatus === 'ENDED' || _v_live.calculatedStatus === 'COMPLETED') _v_brand_stats[_v_brand].ended++;
    });
    
    // 4. 최근 진행중인 방송 (최대 5개)
    const _v_recent_active = _v_lives_with_status
      .filter(_v_l => _v_l.calculatedStatus === 'ACTIVE')
      .slice(0, 5)
      .map(_v_l => ({
        event_id: _v_l.live_id,
        title: _v_l.title || _v_l.live_title_customer || _v_l.live_title_cs,
        subtitle: _v_l.subtitle || _v_l.live_title_cs || `${_v_l.brand_name}`,
        channel_name: _v_l.channel_name || _v_l.platform_name,
        start_date: _v_l.broadcast_date,
        status: _v_l.calculatedStatus,
        broadcast_date: _v_l.broadcast_date,
        broadcast_start_time: _v_l.broadcast_start_time,
        broadcast_end_time: _v_l.broadcast_end_time,
        brand_name: _v_l.brand_name,
        tags: _v_l.tags || []
      }));
    
    // 5. 최근 예정된 방송 (최대 5개)
    const _v_recent_pending = _v_lives_with_status
      .filter(_v_l => (_v_l.calculatedStatus === 'PENDING' || _v_l.calculatedStatus === 'SCHEDULED') && _v_l.broadcast_date >= new Date().toISOString().split('T')[0])
      .slice(0, 5)
      .map(_v_l => ({
        event_id: _v_l.live_id,
        title: _v_l.title || _v_l.live_title_customer || _v_l.live_title_cs,
        subtitle: _v_l.subtitle || _v_l.live_title_cs || `${_v_l.brand_name}`,
        channel_name: _v_l.channel_name || _v_l.platform_name,
        start_date: _v_l.broadcast_date,
        status: _v_l.calculatedStatus,
        broadcast_date: _v_l.broadcast_date,
        broadcast_start_time: _v_l.broadcast_start_time,
        broadcast_end_time: _v_l.broadcast_end_time,
        brand_name: _v_l.brand_name,
        tags: _v_l.tags || []
      }));
    
    // 결과 구성
    const _v_result = {
      success: true,
      data: {
        summary: {
          totalEvents: _v_total_count,
          activeEvents: _v_active_count,
          pendingEvents: _v_pending_count,
          endedEvents: _v_ended_count,
          totalPlatforms: Object.keys(_v_platform_stats).length,
          totalBrands: Object.keys(_v_brand_stats).length,
          lastUpdated: new Date().toISOString()
        },
        platformStats: Object.values(_v_platform_stats),
        brandStats: Object.values(_v_brand_stats),
        recentActiveEvents: _v_recent_active,
        recentPendingEvents: _v_recent_pending
      },
    };
    
    // 캐시 저장 (1분 - 최신 데이터를 위해 짧게 설정)
    await cache.setCache(_v_cache_key, _v_result, 60);
    
    logger.info('대시보드 데이터 조회 완료 (Supabase, live_broadcasts 테이블 사용)');
    return _v_result;
  } catch (p_error) {
    logger.error('대시보드 데이터 조회 실패:', p_error);
    throw new Error('대시보드 데이터 조회 중 오류가 발생했습니다.');
  }
};

/**
 * 상담용 문구 생성 (live_broadcasts 테이블 사용)
 * @param {string} p_event_id - 이벤트 ID (live_id)
 * @returns {Promise<Object>} - 생성된 상담 문구
 */
const generateConsultationText = async (p_event_id) => {
  try {
    // 이벤트 정보 조회
    const _v_event = await getEventById(p_event_id);
    
    if (!_v_event) {
      throw new Error('이벤트를 찾을 수 없습니다.');
    }
    
    // 날짜 포맷팅
    const _v_start_date = new Date(_v_event.start_date || _v_event.broadcast_date).toLocaleDateString('ko-KR');
    const _v_end_date = new Date(_v_event.end_date || _v_event.broadcast_date).toLocaleDateString('ko-KR');
    
    // 상담 문구 템플릿 생성
    let _v_text = '안녕하세요, 고객님.\n\n';
    _v_text += `문의하신 [${_v_event.title || _v_event.live_title_customer || _v_event.live_title_cs}] 라이브 방송은\n`;
    _v_text += `${_v_event.channel_name || _v_event.platform_name}에서 진행 중입니다.\n\n`;
    _v_text += '■ 방송 일정\n';
    _v_text += `${_v_start_date}`;
    if (_v_event.broadcast_start_time && _v_event.broadcast_end_time) {
      _v_text += ` ${_v_event.broadcast_start_time} ~ ${_v_event.broadcast_end_time}`;
    }
    _v_text += `\n\n`;
    _v_text += '■ 혜택 내용\n';
    _v_text += `${_v_event.benefit_summary || _v_event.benefit_detail || '상세 혜택은 라이브 방송 페이지를 참고해주세요.'}\n\n`;
    
    if (_v_event.brand_name) {
      _v_text += `■ 브랜드: ${_v_event.brand_name}\n\n`;
    }
    
    _v_text += '자세한 내용은 아래 링크에서 확인하실 수 있습니다.\n';
    _v_text += `${_v_event.event_url || _v_event.source_url}\n\n`;
    _v_text += '감사합니다.';
    
    // 조회 로그 기록 (비동기, 에러 무시)
    const { insert } = require('../config/supabase');
    insert('view_logs', {
      event_id: p_event_id,
      view_type: 'CONSULTATION'
    }).catch((_v_err) => logger.warn('조회 로그 기록 실패:', _v_err));
    
    logger.info('상담 문구 생성 완료 (Supabase):', p_event_id);
    
    return {
      success: true,
      data: {
        event_id: p_event_id,
        event_title: _v_event.title || _v_event.live_title_customer || _v_event.live_title_cs,
        text: _v_text,
      },
    };
  } catch (p_error) {
    logger.error('상담 문구 생성 실패:', p_error);
    throw new Error(p_error.message || '상담 문구 생성 중 오류가 발생했습니다.');
  }
};

/**
 * 채널 비교
 * @param {string} p_keyword - 제품 키워드
 * @returns {Promise<Object>} - 채널별 비교 결과
 */
const compareChannels = async (p_keyword) => {
  try {
    // 캐시 확인
    const _v_cache_key = `channel:compare:${p_keyword}`;
    const _v_cached = await cache.getCache(_v_cache_key);
    
    if (_v_cached) {
      logger.debug('채널 비교 캐시 히트:', p_keyword);
      return _v_cached;
    }
    
    // 제품 관련 이벤트 조회
    const _v_query = `
      SELECT 
        c.channel_id,
        c.channel_name,
        c.channel_type,
        e.event_id,
        e.title,
        e.benefit_summary,
        e.discount_rate,
        e.event_url,
        e.start_date,
        e.end_date
      FROM events e
      INNER JOIN channels c ON e.channel_id = c.channel_id
      WHERE e.status = 'ACTIVE'
        AND (
          e.title ILIKE $1 OR 
          e.target_products ILIKE $1 OR
          e.benefit_summary ILIKE $1
        )
      ORDER BY c.channel_id, e.discount_rate DESC NULLS LAST
    `;
    
    const _v_result = await db.query(_v_query, [`%${p_keyword}%`]);
    
    if (_v_result.rows.length === 0) {
      return {
        success: true,
        data: {
          keyword: p_keyword,
          comparison: [],
          recommended_channel: null,
          message: '검색 결과가 없습니다.',
        },
      };
    }
    
    // 채널별 그룹화
    const _v_grouped = _v_result.rows.reduce((_v_acc, _v_row) => {
      if (!_v_acc[_v_row.channel_id]) {
        _v_acc[_v_row.channel_id] = {
          channel_id: _v_row.channel_id,
          channel_name: _v_row.channel_name,
          channel_type: _v_row.channel_type,
          events: [],
          best_discount: 0,
        };
      }
      
      _v_acc[_v_row.channel_id].events.push({
        event_id: _v_row.event_id,
        title: _v_row.title,
        benefit_summary: _v_row.benefit_summary,
        discount_rate: _v_row.discount_rate,
        event_url: _v_row.event_url,
      });
      
      // 최고 할인율 업데이트
      if (_v_row.discount_rate && _v_row.discount_rate > _v_acc[_v_row.channel_id].best_discount) {
        _v_acc[_v_row.channel_id].best_discount = _v_row.discount_rate;
      }
      
      return _v_acc;
    }, {});
    
    const _v_comparison = Object.values(_v_grouped);
    
    // 추천 채널 결정 (최고 할인율 기준)
    const _v_recommended = _v_comparison.reduce((_v_best, _v_current) => {
      return _v_current.best_discount > _v_best.best_discount ? _v_current : _v_best;
    });
    
    const _v_response = {
      success: true,
      data: {
        keyword: p_keyword,
        comparison: _v_comparison,
        recommended_channel: _v_recommended.channel_name,
        reason: _v_recommended.best_discount > 0 
          ? `최대 ${_v_recommended.best_discount}% 할인`
          : '관련 이벤트 진행 중',
      },
    };
    
    // 캐시 저장 (10분)
    await cache.setCache(_v_cache_key, _v_response, 600);
    
    logger.info('채널 비교 완료:', {
      keyword: p_keyword,
      channelCount: _v_comparison.length,
    });
    
    return _v_response;
  } catch (p_error) {
    logger.error('채널 비교 실패:', p_error);
    throw new Error('채널 비교 중 오류가 발생했습니다.');
  }
};

module.exports = {
  searchEvents,
  getEventById,
  getDashboardData,
  generateConsultationText,
  compareChannels,
};


