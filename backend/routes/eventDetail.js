/**
 * 이벤트 상세 조회 API
 * 
 * 네이버 스마트스토어 형식의 이벤트 상세 정보 제공
 * - 이벤트 기본 정보
 * - 혜택 정보
 * - 쿠폰 정보
 * - 상품 목록
 */

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * GET /api/events/:eventId
 * 이벤트 상세 정보 조회
 */
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    // 1. 이벤트 기본 정보 조회
    const { data: eventData, error: eventError } = await supabase
      .from('naver_smartstore_events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (eventError) {
      console.error('이벤트 조회 오류:', eventError);
      return res.status(404).json({
        success: false,
        message: '이벤트를 찾을 수 없습니다.',
      });
    }

    // 2. 해당 이벤트의 상품 목록 조회
    const { data: productsData, error: productsError } = await supabase
      .from('naver_smartstore_products')
      .select('*')
      .eq('url', eventData.url)
      .order('product_number', { ascending: true });

    if (productsError) {
      console.error('상품 조회 오류:', productsError);
    }

    // 3. 응답 데이터 구성
    const response = {
      success: true,
      event: {
        id: eventData.id,
        platform: eventData.platform || '네이버스마트스토어',
        brand: eventData.brand || '아이오페',
        title: eventData.event_title || eventData.title,
        description: eventData.description || '',
        mainImage: eventData.main_image || '',
        url: eventData.url,
        startDate: eventData.start_date,
        endDate: eventData.end_date,
        
        // 혜택 정보
        benefits: eventData.benefits || [
          {
            condition: '전 구매 고객 증정',
            description: '구매 시 사은품 증정',
          },
          {
            condition: '9만원 이상 구매시',
            description: '추가 사은품 증정',
          },
          {
            condition: '12만원 이상 구매시',
            description: '특별 사은품 증정',
          },
        ],
        
        // 쿠폰 정보
        coupons: eventData.coupons || [
          {
            name: 'XMD 라인 한정 상품중복 쿠폰',
            description: '최대 10% 할인',
          },
          {
            name: '기획전 장바구니 쿠폰',
            description: '5,000원 할인',
          },
          {
            name: '신규고객 쿠폰',
            description: '10% 할인',
          },
          {
            name: '라운지 고객 쿠폰',
            description: '15% 할인',
          },
        ],
        
        collectedAt: eventData.collected_at,
      },
      products: productsData || [],
    };

    res.json(response);
  } catch (error) {
    console.error('이벤트 상세 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
      error: error.message,
    });
  }
});

/**
 * GET /api/events
 * 이벤트 목록 조회 (페이징)
 */
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 20,
      brand,
      platform,
      search,
    } = req.query;

    const offset = (page - 1) * pageSize;

    // 쿼리 빌더
    let query = supabase
      .from('naver_smartstore_events')
      .select('*', { count: 'exact' });

    // 필터 적용
    if (brand) {
      query = query.eq('brand', brand);
    }

    if (platform) {
      query = query.eq('platform', platform);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // 정렬 및 페이징
    query = query
      .order('collected_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data,
      pagination: {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        total: count,
        totalPages: Math.ceil(count / pageSize),
      },
    });
  } catch (error) {
    console.error('이벤트 목록 조회 실패:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
      error: error.message,
    });
  }
});

module.exports = router;

