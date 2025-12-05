/**
 * 크롤링된 데이터를 Supabase에 저장하는 스크립트
 * 
 * 사용법:
 *   node scripts/import-to-supabase.js
 */

require('dotenv').config();
const { supabase, insert, select, update } = require('../src/config/supabase');
const { getAllBrandsData } = require('../../frontend/src/mockData/realCollectedData');
const logger = require('../src/config/logger');

/**
 * 채널 코드를 채널 ID로 변환
 */
async function getChannelIdByCode(channelCode) {
  try {
    // Supabase 클라이언트를 사용하여 직접 조회
    const { data, error } = await supabase
      .from('channels')
      .select('channel_id')
      .eq('channel_code', channelCode)
      .single();
    
    if (error) {
      // 테이블이 존재하지 않는 경우
      if (error.code === '42P01' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
        logger.error('❌ channels 테이블이 존재하지 않습니다.');
        logger.error('먼저 Supabase 대시보드에서 스키마를 생성해주세요:');
        logger.error('   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new');
        logger.error('   SQL 파일: database/supabase_schema.sql');
        throw new Error('스키마가 생성되지 않았습니다. 먼저 스키마를 생성해주세요.');
      }
      logger.error(`채널 ID 조회 실패 (${channelCode}):`, error.message);
      return null;
    }
    
    if (data && data.channel_id) {
      return data.channel_id;
    }
    
    return null;
  } catch (error) {
    logger.error(`채널 ID 조회 실패 (${channelCode}):`, error.message);
    return null;
  }
}

/**
 * 라이브 방송 데이터를 Supabase에 저장
 */
async function saveLiveBroadcast(liveData) {
  try {
    // meta와 metadata 둘 다 지원
    const meta = liveData.meta || liveData.metadata;
    const schedule = liveData.schedule || {};
    
    if (!meta || !meta.live_id) {
      logger.warn('라이브 ID가 없습니다:', liveData);
      return null;
    }

    // 채널 코드 결정
    let channelCode = 'NAVER';
    if (meta.platform_name === '카카오') channelCode = 'KAKAO';
    else if (meta.platform_name === '11번가') channelCode = '11ST';
    else if (meta.platform_name === 'G마켓') channelCode = 'GMARKET';
    else if (meta.platform_name === '올리브영') channelCode = 'OLIVEYOUNG';
    else if (meta.platform_name === '그립') channelCode = 'GRIP';
    else if (meta.platform_name === '무신사') channelCode = 'MUSINSA';
    else if (meta.platform_name === '롯데온') channelCode = 'LOTTEON';
    else if (meta.platform_name === '아모레몰') channelCode = 'AMOREMALL';
    else if (meta.platform_name === '이니스프리몰' || meta.platform_name === '이니스프리') channelCode = 'INNISFREE_MALL';

    // 채널 ID 조회
    const channelId = await getChannelIdByCode(channelCode);
    if (!channelId) {
      logger.warn(`채널을 찾을 수 없습니다: ${channelCode}`);
      return null;
    }

    // 날짜 파싱
    const broadcastDate = schedule.broadcast_date || meta.collected_at?.split('T')[0] || new Date().toISOString().split('T')[0];
    const benefitStart = schedule.benefit_start_datetime || null;
    const benefitEnd = schedule.benefit_end_datetime || null;

    // 라이브 방송 기본 정보 저장
    const broadcastData = {
      live_id: meta.live_id,
      channel_id: channelId,
      channel_code: channelCode,
      platform_name: meta.platform_name || '',
      brand_name: meta.brand_name || '',
      live_title_customer: meta.live_title_customer || meta.live_title_cs || '',
      live_title_cs: meta.live_title_cs || '',
      source_url: meta.source_url || '',
      thumbnail_url: meta.thumbnail_url || '',
      broadcast_date: broadcastDate,
      broadcast_start_time: schedule.broadcast_start_time || null,
      broadcast_end_time: schedule.broadcast_end_time || null,
      benefit_valid_type: schedule.benefit_valid_type || null,
      benefit_start_datetime: benefitStart || null,
      benefit_end_datetime: benefitEnd || null,
      broadcast_type: schedule.broadcast_type || schedule.broadcast_format || null,
      status: meta.status || 'PENDING',
      collected_at: meta.collected_at || new Date().toISOString(),
    };

    // 기존 데이터 확인
    const { rows: existing } = await select('live_broadcasts', 'live_id', { live_id: meta.live_id });
    
    if (existing && existing.length > 0) {
      // 업데이트
      await update('live_broadcasts', broadcastData, { live_id: meta.live_id });
      logger.info(`✅ 업데이트: ${meta.live_id} - ${meta.live_title_customer}`);
    } else {
      // 삽입
      await insert('live_broadcasts', broadcastData);
      logger.info(`✅ 삽입: ${meta.live_id} - ${meta.live_title_customer}`);
    }

    // 상품 정보 저장 (벌크 업로드)
    if (liveData.products) {
      const products = Array.isArray(liveData.products) 
        ? liveData.products 
        : (liveData.products.product_list || liveData.products.product_details || []);
      
      if (products.length > 0) {
        // 모든 상품 데이터를 배열로 수집
        const productsData = products.map(product => ({
          live_id: meta.live_id,
          product_order: product.product_order || 0,
          product_name: product.product_name || '',
          sku: product.sku || null,
          original_price: product.original_price || null,
          sale_price: product.sale_price || null,
          discount_rate: product.discount_rate || null,
          product_type: product.product_type || null,
          stock_info: product.stock_info || null,
          set_composition: product.set_composition || null,
          product_url: product.product_url || null,
        }));
        
        // 벌크 삽입
        await insert('live_products', productsData);
        logger.info(`   상품 ${products.length}개 저장 완료`);
      }
    }

    // 혜택 정보 저장 (벌크 업로드)
    if (liveData.benefits) {
      const benefits = liveData.benefits;
      const benefitsData = [];
      
      // 모든 혜택 타입을 하나의 배열로 수집
      if (benefits.discounts && Array.isArray(benefits.discounts)) {
        benefits.discounts.forEach(discount => {
          benefitsData.push({
            live_id: meta.live_id,
            benefit_type: '할인',
            benefit_name: discount.discount_type || discount.benefit_name || '',
            benefit_detail: discount.discount_detail || discount.benefit_detail || '',
            benefit_condition: discount.discount_condition || discount.benefit_condition || null,
            benefit_valid_period: discount.discount_valid_period || discount.benefit_valid_period || null,
            quantity_limit: discount.quantity_limit || null,
          });
        });
      }
      
      if (benefits.gifts && Array.isArray(benefits.gifts)) {
        benefits.gifts.forEach(gift => {
          benefitsData.push({
            live_id: meta.live_id,
            benefit_type: '사은품',
            benefit_name: gift.gift_name || gift.benefit_name || '',
            benefit_detail: gift.gift_detail || gift.benefit_detail || '',
            benefit_condition: gift.gift_condition || gift.benefit_condition || null,
            quantity_limit: gift.gift_quantity_limit || gift.quantity_limit || null,
          });
        });
      }
      
      if (benefits.coupons && Array.isArray(benefits.coupons)) {
        benefits.coupons.forEach(coupon => {
          benefitsData.push({
            live_id: meta.live_id,
            benefit_type: '쿠폰',
            benefit_name: coupon.coupon_name || coupon.coupon_detail || '',
            benefit_detail: coupon.coupon_detail || coupon.benefit_detail || '',
            benefit_condition: coupon.coupon_issue_condition || coupon.benefit_condition || null,
          });
        });
      }
      
      if (benefits.points && Array.isArray(benefits.points)) {
        benefits.points.forEach(point => {
          benefitsData.push({
            live_id: meta.live_id,
            benefit_type: '포인트',
            benefit_name: point.point_name || point.benefit_name || '',
            benefit_detail: point.point_detail || point.benefit_detail || '',
            benefit_condition: point.point_condition || point.benefit_condition || null,
          });
        });
      }
      
      if (benefits.shipping && Array.isArray(benefits.shipping)) {
        benefits.shipping.forEach(shipping => {
          benefitsData.push({
            live_id: meta.live_id,
            benefit_type: '배송',
            benefit_name: shipping.shipping_type || shipping.benefit_name || '',
            benefit_detail: shipping.shipping_detail || shipping.benefit_detail || '',
            benefit_condition: shipping.shipping_condition || shipping.benefit_condition || null,
          });
        });
      }
      
      // 벌크 삽입
      if (benefitsData.length > 0) {
        await insert('live_benefits', benefitsData);
        logger.info(`   혜택 ${benefitsData.length}개 저장 완료`);
      }
    }

    // STT 기반 정보 처리 (크롤러에서 수집한 stt_info)
    // stt_info는 live_specific과 동일한 구조이거나 별도로 제공될 수 있음
    const sttInfo = liveData.stt_info || liveData.live_specific || {};
    
    // 키 멘션 저장 (STT 기반 또는 live_specific에서)
    let keyMentions = [];
    if (sttInfo.key_message) {
      // JSON 문자열인 경우 파싱
      if (typeof sttInfo.key_message === 'string') {
        try {
          keyMentions = JSON.parse(sttInfo.key_message);
        } catch (e) {
          // JSON이 아닌 경우 문자열 배열로 처리
          keyMentions = sttInfo.key_message.split('\n').filter(m => m.trim());
        }
      } else if (Array.isArray(sttInfo.key_message)) {
        keyMentions = sttInfo.key_message;
      }
    } else if (liveData.live_specific?.key_mentions) {
      keyMentions = liveData.live_specific.key_mentions;
    }
    
    // 키 멘션 저장 (벌크 업로드)
    if (keyMentions && keyMentions.length > 0) {
      const mentionsData = keyMentions.map(mention => {
        // 문자열인 경우 "[시간] 내용" 형식 파싱
        let time = '';
        let content = '';
        
        if (typeof mention === 'string') {
          if (mention.includes('] ')) {
            const match = mention.match(/\[(.*?)\]/);
            time = match ? match[1] : '';
            content = mention.split('] ').slice(1).join('] ') || mention;
          } else {
            content = mention;
          }
        } else if (typeof mention === 'object' && mention.time && mention.content) {
          time = mention.time;
          content = mention.content;
        } else {
          content = String(mention);
        }
        
        return {
          live_id: meta.live_id,
          message_time: time,
          message_content: content,
          message_type: 'MENTION',
        };
      });
      
      // 벌크 삽입
      await insert('live_chat_messages', mentionsData);
      logger.info(`   키 멘션 ${keyMentions.length}개 저장 완료`);
    }

    // Q&A 저장 (STT 기반 broadcast_qa 또는 live_specific에서)
    let broadcastQa = [];
    if (sttInfo.broadcast_qa) {
      // JSON 문자열인 경우 파싱
      if (typeof sttInfo.broadcast_qa === 'string') {
        try {
          broadcastQa = JSON.parse(sttInfo.broadcast_qa);
        } catch (e) {
          logger.warn(`   broadcast_qa 파싱 실패: ${e.message}`);
          broadcastQa = [];
        }
      } else if (Array.isArray(sttInfo.broadcast_qa)) {
        broadcastQa = sttInfo.broadcast_qa;
      }
    } else if (liveData.live_specific?.broadcast_qa) {
      broadcastQa = liveData.live_specific.broadcast_qa;
    }
    
    // Q&A 저장 (벌크 업로드)
    if (broadcastQa && broadcastQa.length > 0) {
      const qaData = broadcastQa.map(qa => {
        // 객체 형태인 경우
        const question = (typeof qa === 'object' && qa.question) ? qa.question : (typeof qa === 'string' ? qa : '');
        const answer = (typeof qa === 'object' && qa.answer) ? qa.answer : '';
        
        return {
          live_id: meta.live_id,
          question: question || '',
          answer: answer || '',
          questioner: (typeof qa === 'object' && qa.questioner) ? qa.questioner : null,
          answerer: (typeof qa === 'object' && qa.answerer) ? qa.answerer : null,
          question_date: (typeof qa === 'object' && qa.question_date) ? qa.question_date : null,
          answer_date: (typeof qa === 'object' && qa.answer_date) ? qa.answer_date : null,
          is_answered: !!answer,
          helpful_count: (typeof qa === 'object' && qa.helpful_count) ? qa.helpful_count : 0,
          status: answer ? '답변완료' : '답변대기',
        };
      });
      
      // 벌크 삽입
      await insert('live_qa', qaData);
      logger.info(`   Q&A ${broadcastQa.length}개 저장 완료`);
    }

    // 타임라인 저장 (STT 기반 timeline_summary 또는 live_specific에서)
    let timelineData = [];
    if (sttInfo.timeline_summary) {
      // JSON 문자열인 경우 파싱
      if (typeof sttInfo.timeline_summary === 'string') {
        try {
          timelineData = JSON.parse(sttInfo.timeline_summary);
        } catch (e) {
          logger.warn(`   timeline_summary 파싱 실패: ${e.message}`);
          timelineData = [];
        }
      } else if (Array.isArray(sttInfo.timeline_summary)) {
        timelineData = sttInfo.timeline_summary;
      }
    } else if (liveData.live_specific?.timeline) {
      timelineData = liveData.live_specific.timeline;
    } else if (liveData.live_specific?.timeline_summary) {
      timelineData = liveData.live_specific.timeline_summary;
    }
    
    // 타임라인 저장 (벌크 업로드)
    if (timelineData && timelineData.length > 0) {
      const timelineRecords = timelineData.map(timeline => {
        // 객체 형태인 경우
        const time = (typeof timeline === 'object' && timeline.time) ? timeline.time : '';
        const content = (typeof timeline === 'object' && timeline.content) ? timeline.content : String(timeline);
        
        return {
          live_id: meta.live_id,
          time: time || '',
          content: content || '',
        };
      });
      
      // 벌크 삽입
      await insert('live_timeline', timelineRecords);
      logger.info(`   타임라인 ${timelineData.length}개 저장 완료`);
    }

    // 중복 정책 저장
    if (liveData.duplicate_policy) {
      const policy = liveData.duplicate_policy;
      await insert('live_duplicate_policy', {
        live_id: meta.live_id,
        coupon_duplicate: policy.coupon_duplicate || null,
        point_duplicate: policy.point_duplicate || null,
        other_promotion_duplicate: policy.other_promotion_duplicate || null,
        employee_discount: policy.employee_discount || null,
        duplicate_note: policy.duplicate_note || null,
      });
    }

    // 제한사항 저장 (벌크 업로드)
    if (liveData.restrictions) {
      const restrictions = liveData.restrictions;
      const restrictionsData = [];
      
      // 모든 제한사항 타입을 하나의 배열로 수집
      if (restrictions.excluded_products && Array.isArray(restrictions.excluded_products)) {
        restrictions.excluded_products.forEach(product => {
          restrictionsData.push({
            live_id: meta.live_id,
            restriction_type: '제외상품',
            restriction_detail: product,
          });
        });
      }
      
      if (restrictions.channel_restrictions && Array.isArray(restrictions.channel_restrictions)) {
        restrictions.channel_restrictions.forEach(restriction => {
          restrictionsData.push({
            live_id: meta.live_id,
            restriction_type: '채널제한',
            restriction_detail: restriction,
          });
        });
      }
      
      if (restrictions.payment_restrictions && Array.isArray(restrictions.payment_restrictions)) {
        restrictions.payment_restrictions.forEach(restriction => {
          restrictionsData.push({
            live_id: meta.live_id,
            restriction_type: '결제제한',
            restriction_detail: restriction,
          });
        });
      }
      
      if (restrictions.region_restrictions && Array.isArray(restrictions.region_restrictions)) {
        restrictions.region_restrictions.forEach(restriction => {
          restrictionsData.push({
            live_id: meta.live_id,
            restriction_type: '지역제한',
            restriction_detail: restriction,
          });
        });
      }
      
      if (restrictions.other_restrictions && Array.isArray(restrictions.other_restrictions)) {
        restrictions.other_restrictions.forEach(restriction => {
          restrictionsData.push({
            live_id: meta.live_id,
            restriction_type: '기타제한',
            restriction_detail: restriction,
          });
        });
      }
      
      // 벌크 삽입
      if (restrictionsData.length > 0) {
        await insert('live_restrictions', restrictionsData);
        logger.info(`   제한사항 ${restrictionsData.length}개 저장 완료`);
      }
    }

    // CS 정보 저장 (예상 고객 질문, CS 응답 스크립트 등)
    if (liveData.cs_info) {
      const csInfo = liveData.cs_info;
      
      // expected_questions 파싱 (JSON 문자열 또는 배열)
      let expectedQuestions = [];
      if (csInfo.expected_questions) {
        if (typeof csInfo.expected_questions === 'string') {
          try {
            expectedQuestions = JSON.parse(csInfo.expected_questions);
          } catch (e) {
            // JSON이 아닌 경우 문자열 배열로 처리
            expectedQuestions = csInfo.expected_questions.split('\n').filter(q => q.trim());
          }
        } else if (Array.isArray(csInfo.expected_questions)) {
          expectedQuestions = csInfo.expected_questions;
        }
      }
      
      // response_scripts 파싱 (JSON 문자열 또는 배열)
      let responseScripts = [];
      if (csInfo.response_scripts) {
        if (typeof csInfo.response_scripts === 'string') {
          try {
            responseScripts = JSON.parse(csInfo.response_scripts);
          } catch (e) {
            logger.warn(`   response_scripts 파싱 실패: ${e.message}`);
            responseScripts = [];
          }
        } else if (Array.isArray(csInfo.response_scripts)) {
          responseScripts = csInfo.response_scripts;
        }
      }
      
      // risk_points 파싱 (JSON 문자열 또는 배열)
      let riskPoints = [];
      if (csInfo.risk_points) {
        if (typeof csInfo.risk_points === 'string') {
          try {
            riskPoints = JSON.parse(csInfo.risk_points);
          } catch (e) {
            // JSON이 아닌 경우 문자열 배열로 처리
            riskPoints = csInfo.risk_points.split('\n').filter(r => r.trim());
          }
        } else if (Array.isArray(csInfo.risk_points)) {
          riskPoints = csInfo.risk_points;
        }
      }
      
      // CS 정보 저장 (UPSERT 사용 - live_id가 UNIQUE이므로)
      try {
        // 기존 데이터 확인
        const { data: existingCsInfo } = await supabase
          .from('live_cs_info')
          .select('live_id')
          .eq('live_id', meta.live_id)
          .single();
        
        const csData = {
          live_id: meta.live_id,
          expected_questions: expectedQuestions.length > 0 ? expectedQuestions : [],
          response_scripts: responseScripts.length > 0 ? responseScripts : [],
          risk_points: riskPoints.length > 0 ? riskPoints : [],
          cs_note: csInfo.cs_note || csInfo.cs_notes || null,
        };
        
        if (existingCsInfo) {
          // 업데이트
          await update('live_cs_info', csData, { live_id: meta.live_id });
          logger.info(`   CS 정보 업데이트 완료 (예상 질문: ${expectedQuestions.length}개, 응답 스크립트: ${responseScripts.length}개)`);
        } else {
          // 삽입
          await insert('live_cs_info', csData);
          logger.info(`   CS 정보 저장 완료 (예상 질문: ${expectedQuestions.length}개, 응답 스크립트: ${responseScripts.length}개)`);
        }
      } catch (error) {
        logger.error(`   CS 정보 저장 실패: ${error.message}`);
        // 에러가 발생해도 계속 진행
      }
    }

    // 공지사항 저장 (벌크 업로드)
    if (liveData.notice_section?.notices) {
      const noticesData = liveData.notice_section.notices.map((notice, index) => ({
        notice_id: notice.notice_id || `NOTICE_${meta.live_id}_${Date.now()}_${index}`,
        live_id: meta.live_id,
        title: notice.title || '',
        content: notice.content || '',
        post_date: notice.post_date || null,
        view_count: notice.view_count || 0,
        is_important: notice.is_important || false,
      }));
      
      // 벌크 삽입
      if (noticesData.length > 0) {
        await insert('live_notices', noticesData);
        logger.info(`   공지사항 ${noticesData.length}개 저장 완료`);
      }
    }

    // FAQ 저장 (벌크 업로드)
    if (liveData.faq_section?.categories) {
      const faqsData = [];
      let faqIndex = 0;
      
      liveData.faq_section.categories.forEach(category => {
        if (category.faqs && Array.isArray(category.faqs)) {
          category.faqs.forEach(faq => {
            faqsData.push({
              faq_id: faq.faq_id || `FAQ_${meta.live_id}_${Date.now()}_${faqIndex++}`,
              live_id: meta.live_id,
              category: category.category_name || faq.category || null,
              question: faq.question || '',
              answer: faq.answer || '',
              view_count: faq.view_count || 0,
              helpful_count: faq.helpful_count || 0,
            });
          });
        }
      });
      
      // 벌크 삽입
      if (faqsData.length > 0) {
        await insert('live_faqs', faqsData);
        logger.info(`   FAQ ${faqsData.length}개 저장 완료`);
      }
    }

    return meta.live_id;
  } catch (error) {
    logger.error(`라이브 방송 저장 실패 (${liveData.meta?.live_id || liveData.metadata?.live_id}):`, error);
    throw error;
  }
}

/**
 * 스키마 존재 여부 확인
 */
async function checkSchemaExists() {
  try {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .limit(0);
    
    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
        return false;
      }
      throw error;
    }
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 모든 크롤링 데이터를 Supabase에 저장
 */
async function importAllData() {
  try {
    logger.info('='.repeat(60));
    logger.info('크롤링 데이터 Supabase 저장 시작');
    logger.info('='.repeat(60));

    // 스키마 확인
    logger.info('스키마 존재 여부 확인 중...');
    const schemaExists = await checkSchemaExists();
    
    if (!schemaExists) {
      logger.error('\n❌ 스키마가 생성되지 않았습니다!');
      logger.error('');
      logger.error('다음 단계를 따라주세요:');
      logger.error('');
      logger.error('1. Supabase 대시보드 접속:');
      logger.error('   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new');
      logger.error('');
      logger.error('2. SQL 파일 확인:');
      logger.error('   cat ../../database/supabase_schema.sql');
      logger.error('');
      logger.error('3. SQL을 복사하여 Supabase SQL Editor에 붙여넣고 실행');
      logger.error('');
      logger.error('4. 스키마 생성 후 다시 이 스크립트를 실행하세요.');
      logger.error('');
      process.exit(1);
    }
    
    logger.info('✅ 스키마 확인 완료\n');

    // 실제 수집 데이터 가져오기
    const allLiveData = getAllBrandsData();

    logger.info(`총 ${allLiveData.length}개의 라이브 방송 데이터를 처리합니다.`);

    let successCount = 0;
    let errorCount = 0;

    // 배치 처리 (한 번에 너무 많이 처리하지 않도록)
    const batchSize = 10;
    for (let i = 0; i < allLiveData.length; i += batchSize) {
      const batch = allLiveData.slice(i, i + batchSize);
      
      logger.info(`\n[${i + 1}-${Math.min(i + batchSize, allLiveData.length)}/${allLiveData.length}] 배치 처리 중...`);
      
      for (const liveData of batch) {
        try {
          await saveLiveBroadcast(liveData);
          successCount++;
        } catch (error) {
          errorCount++;
          logger.error(`저장 실패:`, error.message);
        }
      }
      
      // 배치 간 짧은 대기 (API Rate Limit 방지)
      if (i + batchSize < allLiveData.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    logger.info('\n' + '='.repeat(60));
    logger.info('데이터 저장 완료!');
    logger.info(`  ✅ 성공: ${successCount}개`);
    logger.info(`  ❌ 실패: ${errorCount}개`);
    logger.info('='.repeat(60));

  } catch (error) {
    logger.error('데이터 저장 중 오류 발생:', error);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  importAllData()
    .then(() => {
      logger.info('모든 작업이 완료되었습니다.');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('작업 실패:', error);
      process.exit(1);
    });
}

module.exports = { importAllData, saveLiveBroadcast };

