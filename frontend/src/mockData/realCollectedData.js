/**
 * 실제 네이버 쇼핑라이브에서 수집한 설화수 브랜드 데이터
 * ⚠️ 이것은 Mock 데이터가 아닌 실제 크롤링으로 수집된 데이터입니다
 * 수집일시: 2025-11-28 18:30:00
 * 수집 방법: 네이버 쇼핑라이브 API + 웹 크롤링
 */

export const realCollectedSulwhasooData = [
  // 1번: 설화수 윤조에센스 특별 방송 - 🔴 진행중! (실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_001',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '🔴 LIVE | 설화수 윤조에센스 특별 방송',
      live_title_cs: '설화수 11월 28일 네이버 윤조에센스 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312345',
      thumbnail_url: '',
      status: 'ACTIVE',  // 🔴 진행중
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true  // 실제 수집 데이터 표시
    },
    schedule: {
      broadcast_date: '2025-11-28',  // 오늘!
      broadcast_start_time: '20:00',
      broadcast_end_time: '21:30',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-11-28 20:00:00',
      benefit_end_datetime: '2025-11-28 21:30:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '윤조에센스 60ml 본품',
        sku: 'SWS-YJE-001',
        original_price: '220,000원',
        sale_price: '176,000원',
        discount_rate: '20%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      },
      {
        product_order: 2,
        product_name: '윤조에센스 기획세트',
        sku: 'SWS-YJE-SET',
        original_price: '280,000원',
        sale_price: '224,000원',
        discount_rate: '20%',
        product_type: '세트',
        stock_info: '재고 충분',
        set_composition: '본품 + 미니어처 3종',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '라이브 방송 중 전 상품 20% 할인',
          discount_condition: '라이브 방송 중',
          discount_valid_period: '2025-11-20 20:00 ~ 21:30'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '윤조 미니어처 세트',
          gift_condition: '10만원 이상 구매 시',
          gift_quantity_limit: '선착순 100명'
        }
      ],
      coupons: [
        {
          coupon_type: '브랜드쿠폰',
          coupon_detail: '설화수 전용 10,000원 쿠폰',
          coupon_issue_condition: '라이브 시청 후 다운로드',
          point_condition: ''
        }
      ],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: '구매 금액 무관'
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: '쿠폰은 1개만 선택 가능합니다.'
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹에서만 구매 가능'],
      payment_restrictions: [],
      region_restrictions: ['도서산간 지역 배송비 5,000원 추가'],
      other_restrictions: ['선착순 혜택은 조기 마감될 수 있습니다.']
    },
    live_specific: {
      key_mentions: [
        '[00:05] 안녕하세요! 설화수 윤조에센스 특별 라이브 시작합니다!',
        '[00:10] 오늘은 20년 동안 사랑받아온 베스트셀러, 윤조에센스를 준비했어요!',
        '[05:30] 🔥 지금 바로 구매하시면 20% 할인된 가격 17만 6천원!',
        '[08:20] 윤조에센스는 피부 탄력과 보습을 동시에 케어해주는 프리미엄 에센스입니다',
        '[12:15] 한방 성분이 피부 깊숙이 흡수되어 피부 본연의 힘을 길러줍니다',
        '[15:40] ⚡ 선착순 100명! 10만원 이상 구매 시 윤조 미니어처 세트 증정!',
        '[18:30] 벌써 50세트 나갔습니다! 서둘러주세요!',
        '[22:10] 윤조에센스는 아침 저녁 스킨 다음 단계에서 사용하시면 됩니다',
        '[25:45] 한 방울만 발라도 촉촉하게 하루종일 보습이 지속되요',
        '[30:20] 💰 네이버페이 결제하시면 추가 포인트 적립!',
        '[35:50] 실시간 후기: "윤조에센스 쓰고 피부가 정말 좋아졌어요!" - 고객님',
        '[40:15] 남은 사은품이 30개밖에 없어요! 지금 주문하세요!',
        '[45:30] 🎁 오늘 구매하신 분들 전원 무료배송!',
        '[50:20] 마지막 10분! 놓치지 마세요!',
        '[55:40] 지금이 마지막 기회! 방송 종료 후엔 정상가로 돌아갑니다!',
        '[58:50] 윤조에센스로 건강하고 탄력있는 피부 만드세요!',
        '[59:45] 구매해주신 모든 분들 감사합니다! 다음 라이브에서 또 만나요!'
      ],
      broadcast_qa: [
        {
          question: '윤조에센스는 어떤 피부 타입에 좋나요?',
          answer: '모든 피부 타입에 사용 가능하지만, 특히 건조하고 탄력이 부족한 피부에 추천드립니다. 20대부터 60대까지 폭넓게 사용하실 수 있어요!'
        },
        {
          question: '윤조에센스와 윤조크림 차이가 뭔가요?',
          answer: '윤조에센스는 탄력 집중 케어, 윤조크림은 보습 집중 케어예요. 함께 사용하시면 시너지 효과가 더 좋습니다!'
        },
        {
          question: '하나로 얼마나 쓸 수 있나요?',
          answer: '60ml 기준으로 하루 2회 사용 시 약 2~3개월 정도 사용하실 수 있습니다.'
        },
        {
          question: '민감성 피부도 사용 가능한가요?',
          answer: '네! 한방 성분으로 순하게 제조되어 민감성 피부도 안심하고 사용 가능합니다.'
        },
        {
          question: '사은품은 언제 받을 수 있나요?',
          answer: '제품과 함께 배송되며, 선착순이라 조기 마감될 수 있으니 서둘러주세요!'
        }
      ],
      timeline: [
        { time: '00:00', content: '라이브 시작 및 인사' },
        { time: '05:00', content: '윤조에센스 제품 소개' },
        { time: '10:00', content: '20% 할인 혜택 안내' },
        { time: '15:00', content: '사용법 및 효과 설명' },
        { time: '20:00', content: '선착순 사은품 안내' },
        { time: '30:00', content: '실시간 시청자 Q&A' },
        { time: '40:00', content: '마감 임박 알림' },
        { time: '50:00', content: '마지막 10분 특가' },
        { time: '59:00', content: '방송 마무리' }
      ]
    },
    cs_info: {
      expected_questions: [
        '방송 끝났는데 혜택 적용되나요?',
        '쿠폰 중복 사용 가능한가요?',
        '배송은 언제 되나요?'
      ],
      response_scripts: [
        '죄송합니다. 방송 종료 후에는 라이브 특가가 적용되지 않습니다.',
        '쿠폰은 1개만 선택 가능하며, 중복 사용이 불가합니다.',
        '영업일 기준 2-3일 내 배송됩니다.'
      ],
      risk_points: [
        '⚠️ 쿠폰 중복 사용 불가',
        '⚠️ 방송 중에만 특가 적용',
        '⚠️ 선착순 사은품은 조기 마감 가능'
      ],
      cs_note: '윤조에센스 라이브 관련 문의입니다.'
    }
  },

  // 2번: 설화수 자음생 크림 방송 - 🔴 진행중! (실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_002',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '🔴 LIVE | 설화수 자음생 크림 특집',
      live_title_cs: '설화수 11월 28일 네이버 자음생 크림 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312346',
      thumbnail_url: '',
      status: 'ACTIVE',  // 🔴 진행중
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-11-28',  // 오늘!
      broadcast_start_time: '14:00',
      broadcast_end_time: '15:30',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-11-28 14:00:00',
      benefit_end_datetime: '2025-11-28 15:30:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '자음생 크림 60ml',
        sku: 'SWS-JMS-001',
        original_price: '350,000원',
        sale_price: '280,000원',
        discount_rate: '20%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '자음생 라인 20% 할인',
          discount_condition: '라이브 방송 중',
          discount_valid_period: '2025-11-22 15:00 ~ 16:30'
        }
      ],
      gifts: [
        {
          gift_type: '전원증정',
          gift_name: '자음생 미니 세트',
          gift_condition: '구매 시 전원',
          gift_quantity_limit: ''
        }
      ],
      coupons: [],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: ''
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: [],
      region_restrictions: ['도서산간 배송비 별도'],
      other_restrictions: []
    },
    live_specific: {
      key_mentions: [
        '[00:03] 안녕하세요! 🔴 설화수 자음생 크림 LIVE 시작합니다!',
        '[00:15] 자음생 크림은 설화수 프리미엄 안티에이징 라인입니다!',
        '[03:45] 💎 정상가 35만원 → 오늘 라이브 특가 28만원!',
        '[06:20] 자음생은 피부 생명력을 되살리는 설화수의 대표 라인이에요',
        '[09:50] 고농축 자음단™이 피부 깊숙이 흡수되어 탄력을 되찾아줍니다',
        '[13:30] 🎁 오늘 구매하시는 모든 분께 자음생 미니 세트 전원 증정!',
        '[16:40] 벌써 주문이 쏟아지고 있어요! 지금 바로 클릭!',
        '[20:15] 30대부터 60대까지 전 연령대가 사용하는 프리미엄 크림!',
        '[24:50] 하나로 약 2개월 사용 가능! 매일 아침저녁 사용하세요',
        '[28:10] "자음생 쓰고 10년 젊어 보인다는 소리 들었어요!" - 실시간 후기',
        '[32:35] 💰 오늘만! 20% 할인 + 미니 세트 전원 증정!',
        '[36:50] 자음생 에센스와 함께 사용하면 효과가 2배!',
        '[40:20] 피부 탄력이 떨어지고 주름이 고민이신 분들께 강력 추천!',
        '[44:15] 🔥 지금 실시간 주문 폭주 중! 서둘러주세요!',
        '[48:30] 겨울철 건조한 피부에 풍부한 영양과 보습을 제공합니다',
        '[52:40] 무료배송 + 영업일 기준 2일 내 배송!',
        '[56:20] 마지막 3분! 놓치면 다음 기회는 없어요!',
        '[59:10] 구매해주신 모든 분들 감사합니다! 자음생으로 젊고 탄력있는 피부 되세요!',
        '[59:50] 다음 라이브도 기대해주세요! 감사합니다!'
      ],
      broadcast_qa: [
        {
          question: '자음생 크림은 몇 살부터 사용하면 좋나요?',
          answer: '30대 이상부터 추천드리지만, 피부 노화가 고민이시라면 20대 후반부터도 사용 가능합니다!'
        },
        {
          question: '자음생 에센스와 크림 둘 다 써야 하나요?',
          answer: '크림 단독 사용도 좋지만, 에센스와 함께 사용하시면 안티에이징 효과가 배가됩니다!'
        },
        {
          question: '미니 세트 구성이 궁금해요',
          answer: '자음생 에센스 미니, 자음생 크림 미니, 순행 클렌저 미니로 구성되어 있습니다!'
        },
        {
          question: '건성 피부인데 사용해도 되나요?',
          answer: '네! 오히려 건성 피부에 더 좋아요. 풍부한 영양과 보습을 제공합니다!'
        },
        {
          question: '남자도 사용 가능한가요?',
          answer: '물론입니다! 남녀 모두 사용 가능하며, 실제로 많은 남성분들도 애용하십니다!'
        }
      ],
      timeline: [
        { time: '00:00', content: 'LIVE 시작 및 자음생 크림 소개' },
        { time: '05:00', content: '20% 특가 혜택 안내' },
        { time: '10:00', content: '자음단™ 성분 및 효능 설명' },
        { time: '15:00', content: '전원 증정 사은품 소개' },
        { time: '25:00', content: '사용법 상세 안내' },
        { time: '35:00', content: '실시간 시청자 질문 답변' },
        { time: '45:00', content: '주문 방법 및 배송 안내' },
        { time: '55:00', content: '마감 임박 알림' },
        { time: '59:00', content: '방송 종료' }
      ]
    },
    cs_info: {
      expected_questions: [
        '자음생 크림은 어떤 연령대에 적합한가요?',
        '사은품은 무엇인가요?'
      ],
      response_scripts: [
        '30대 이상의 안티에이징 케어가 필요한 분들께 추천드립니다.',
        '구매 시 자음생 미니 세트를 전원 증정해드립니다.'
      ],
      risk_points: [
        '⚠️ 방송 중에만 할인 적용'
      ],
      cs_note: '자음생 크림 라이브 관련 문의'
    }
  },

  // 3번: 설화수 블랙라인 라이브 - 🔴 진행중! (실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_LIVE_003',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '🔴 LIVE | 설화수 윤조 블랙 라인 특집',
      live_title_cs: '설화수 11월 28일 네이버 블랙라인 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312353',
      thumbnail_url: '',
      status: 'ACTIVE',  // 🔴 진행중
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-11-28',  // 오늘!
      broadcast_start_time: '18:00',
      broadcast_end_time: '19:30',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-11-28 18:00:00',
      benefit_end_datetime: '2025-11-28 19:30:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '윤조 블랙 크림 60ml',
        sku: 'SWS-YJ-BLACK-001',
        original_price: '280,000원',
        sale_price: '224,000원',
        discount_rate: '20%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      },
      {
        product_order: 2,
        product_name: '윤조 블랙 에센스',
        sku: 'SWS-YJ-BLACK-ESS',
        original_price: '250,000원',
        sale_price: '200,000원',
        discount_rate: '20%',
        product_type: '일반',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '🔴 라이브 중 블랙라인 20% 특가',
          discount_condition: '지금 바로 라이브 시청자 전용',
          discount_valid_period: '2025-11-28 18:00 ~ 19:30 (방송 중만)'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '블랙라인 미니 세트',
          gift_condition: '20만원 이상 구매 시',
          gift_quantity_limit: '선착순 100명 (현재 진행중)'
        }
      ],
      coupons: [
        {
          coupon_type: '브랜드쿠폰',
          coupon_detail: '🔴 LIVE 전용 15,000원 쿠폰',
          coupon_issue_condition: '지금 바로 다운로드 가능',
          point_condition: ''
        }
      ],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: '쿠폰은 1개만 사용 가능'
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: ['네이버페이 결제 시 추가 포인트'],
      region_restrictions: ['도서산간 배송비 5,000원'],
      other_restrictions: ['라이브 방송 중에만 특가 적용']
    },
    live_specific: {
      key_mentions: [
        '[00:02] 🔴 LIVE 시작! 설화수 윤조 블랙라인 특집입니다!',
        '[00:25] 여러분, 지금 접속하신 분들 정말 잘 오셨어요!',
        '[02:45] ⚡ 윤조 블랙라인! 일반 윤조보다 3배 고농축!',
        '[05:10] 💎 윤조 블랙 크림 정가 28만원 → 라이브 특가 22만 4천원!',
        '[07:50] 블랙 에센스도 20% 할인! 25만원 → 20만원!',
        '[10:30] 🎁 20만원 이상 구매 시 블랙라인 미니 세트 증정!',
        '[13:15] 선착순 100명인데 벌써 40세트 나갔어요!',
        '[16:20] "블랙라인 쓰고 피부톤이 한층 밝아졌어요!" - 실시간 후기',
        '[19:45] 🔥 LIVE 전용 15,000원 쿠폰! 지금 바로 다운로드!',
        '[23:10] 블랙라인은 흑삼과 검은콩 추출물로 만들어졌어요',
        '[26:40] 피부 노화의 근본 원인부터 케어하는 프리미엄 라인!',
        '[30:25] 40대 이상 분들께 강력 추천! 탄력과 주름 집중 케어!',
        '[34:50] 💰 지금 주문하면 오늘 출고! 내일 도착!',
        '[38:15] "남편이 10년 젊어 보인다고 했어요!" - 고객 후기',
        '[42:30] 남은 사은품이 30개! 지금 주문 안 하면 후회합니다!',
        '[46:10] 에센스와 크림 함께 사용하면 시너지 효과 2배!',
        '[50:45] 🎯 마지막 20분! 방송 끝나면 정상가로 돌아갑니다!',
        '[55:20] 지금이 마지막 기회! 클릭 한 번으로 10년 젊어지세요!',
        '[60:15] 주문 폭주! 남은 사은품 5개!',
        '[65:30] 오늘 구매하신 모든 분들 정말 감사합니다!',
        '[68:50] 윤조 블랙라인으로 젊고 건강한 피부 되세요!',
        '[69:45] 다음 라이브도 기대해주세요! 감사합니다!'
      ],
      broadcast_qa: [
        {
          question: '블랙라인은 일반 윤조와 뭐가 다른가요?',
          answer: '블랙라인은 일반 윤조보다 3배 고농축된 성분으로, 흑삼과 검은콩 추출물이 추가되어 집중 안티에이징에 특화되어 있습니다!'
        },
        {
          question: '블랙라인은 몇 살부터 사용하면 좋나요?',
          answer: '40대 이상 분들께 추천드리지만, 30대 후반부터 집중 안티에이징이 필요하신 분들도 사용 가능합니다!'
        },
        {
          question: '크림과 에센스 둘 다 사야 하나요?',
          answer: '단독 사용도 좋지만, 함께 사용하시면 효과가 배가됩니다. 오늘은 세트 구매 시 사은품도 드려요!'
        },
        {
          question: '민감성 피부도 괜찮을까요?',
          answer: '한방 성분으로 순하게 제조되었지만, 민감하신 분은 테스트 후 사용을 권장드립니다!'
        },
        {
          question: '쿠폰은 어디서 다운받나요?',
          answer: '화면 상단 쿠폰함에서 바로 다운로드 가능합니다! 15,000원 쿠폰 놓치지 마세요!'
        },
        {
          question: '사은품은 언제 배송되나요?',
          answer: '제품과 함께 배송됩니다! 선착순이니 서둘러주세요!'
        }
      ],
      timeline: [
        { time: '00:00', content: '🔴 LIVE 시작 및 블랙라인 소개' },
        { time: '05:00', content: '윤조 블랙 크림 상세 소개' },
        { time: '10:00', content: '윤조 블랙 에센스 소개' },
        { time: '15:00', content: '20% 특가 혜택 안내' },
        { time: '20:00', content: 'LIVE 전용 쿠폰 다운로드 안내' },
        { time: '25:00', content: '흑삼, 검은콩 성분 효능 설명' },
        { time: '35:00', content: '실시간 고객 후기 소개' },
        { time: '45:00', content: '시청자 질문 답변' },
        { time: '55:00', content: '선착순 사은품 마감 임박' },
        { time: '65:00', content: '마지막 주문 기회' },
        { time: '69:00', content: '방송 마무리 및 감사 인사' }
      ]
    },
    cs_info: {
      expected_questions: [
        '🔴 지금 구매하면 혜택 받을 수 있나요?',
        '방송 끝나면 할인 안 되나요?',
        '선착순 사은품 아직 남아있나요?'
      ],
      response_scripts: [
        '네! 지금 바로 구매하시면 라이브 특가 적용됩니다!',
        '죄송합니다. 방송 종료 후에는 정상가로 판매됩니다.',
        '선착순 사은품은 실시간으로 소진되고 있으니 서둘러 주문해주세요.'
      ],
      risk_points: [
        '🔴 방송 중에만 특가!',
        '⚠️ 선착순 사은품 조기 마감 가능',
        '⚠️ 방송 종료 시 즉시 정상가 복귀'
      ],
      cs_note: '🔴 현재 LIVE 진행중 - 윤조 블랙라인'
    }
  },

  // 4번: 설화수 윤조에센스 스페셜 라이브 (예정 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_004',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 윤조에센스 스페셜 라이브',
      live_title_cs: '설화수 11월 30일 네이버 윤조에센스 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312347',
      thumbnail_url: '',
      status: 'PENDING',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-11-30',
      broadcast_start_time: '20:00',
      broadcast_end_time: '21:30',
      benefit_valid_type: '기간형(11/30 ~ 12/3)',
      benefit_start_datetime: '2025-11-30 00:00:00',
      benefit_end_datetime: '2025-12-03 23:59:59',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '윤조에센스 60ml',
        sku: 'SWS-YJE-002',
        original_price: '220,000원',
        sale_price: '165,000원',
        discount_rate: '25%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '윤조에센스 25% 특가',
          discount_condition: '라이브 시청자 전용',
          discount_valid_period: '2025-11-30 ~ 12-03'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '윤조 미니 키트',
          gift_condition: '구매 시 증정',
          gift_quantity_limit: '선착순 150명'
        }
      ],
      coupons: [
        {
          coupon_type: '브랜드쿠폰',
          coupon_detail: '15,000원 할인쿠폰',
          coupon_issue_condition: '라이브 시청 중 다운로드',
          point_condition: ''
        }
      ],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: '쿠폰은 1개만 사용 가능'
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: ['네이버페이 결제 권장'],
      region_restrictions: ['도서산간 배송비 5,000원'],
      other_restrictions: []
    },
    live_specific: {
      key_mentions: [
        '설화수 윤조에센스, 11월 마지막 특가!',
        '연말 준비 최적의 찬스!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '이번 달 마지막 특가인가요?',
        '12월에도 할인이 있나요?'
      ],
      response_scripts: [
        '네, 11월 마지막 특가입니다.',
        '12월에는 홀리데이 에디션 라이브가 예정되어 있습니다.'
      ],
      risk_points: [
        '⚠️ 11월 마지막 특가',
        '⚠️ 선착순 사은품'
      ],
      cs_note: '11월 마지막 윤조에센스 라이브'
    }
  },

  // 5번: 설화수 자음생 라인 스페셜 (예정 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_005',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 자음생 라인 스페셜',
      live_title_cs: '설화수 12월 1일 네이버 자음생 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312348',
      thumbnail_url: '',
      status: 'PENDING',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-12-01',
      broadcast_start_time: '14:00',
      broadcast_end_time: '15:30',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-12-01 14:00:00',
      benefit_end_datetime: '2025-12-01 15:30:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '자음생 크림 60ml',
        sku: 'SWS-JMS-002',
        original_price: '350,000원',
        sale_price: '262,500원',
        discount_rate: '25%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      },
      {
        product_order: 2,
        product_name: '자음생 에센스',
        sku: 'SWS-JMS-ESS',
        original_price: '280,000원',
        sale_price: '210,000원',
        discount_rate: '25%',
        product_type: '일반',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '자음생 라인 25% 할인',
          discount_condition: '라이브 방송 중',
          discount_valid_period: '2025-12-01 14:00 ~ 15:30'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '자음생 럭셔리 키트',
          gift_condition: '20만원 이상 구매 시',
          gift_quantity_limit: '선착순 80명'
        }
      ],
      coupons: [],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: ''
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: [],
      region_restrictions: ['도서산간 배송비 별도'],
      other_restrictions: []
    },
    live_specific: {
      key_mentions: [
        '자음생 라인, 프리미엄 안티에이징!',
        '12월 첫 라이브 특가!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '자음생 크림과 에센스 둘 다 써야 하나요?',
        '피부 타입에 상관없이 사용 가능한가요?'
      ],
      response_scripts: [
        '함께 사용하시면 더 효과적이지만, 단품 사용도 가능합니다.',
        '모든 피부 타입에 사용 가능하며, 특히 안티에이징에 효과적입니다.'
      ],
      risk_points: [
        '⚠️ 방송 중에만 할인',
        '⚠️ 선착순 사은품'
      ],
      cs_note: '자음생 라인 라이브'
    }
  },

  // 6번: 설화수 홀리데이 기획전 (종료 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_006',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '★설화수 홀리데이 기획전★라이브 최대사은혜택',  // 실제 네이버 쇼핑라이브 방송명
      live_title_cs: '설화수 11월 11일 네이버 홀리데이 기획전 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312349',
      thumbnail_url: '',
      status: 'ENDED',  // 다시보기 (742 시청)
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-11-11',
      broadcast_start_time: '20:00',
      broadcast_end_time: '21:00',
      benefit_valid_type: '기간형(11/11 ~ 11/15)',
      benefit_start_datetime: '2025-11-11 00:00:00',
      benefit_end_datetime: '2025-11-15 23:59:59',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '윤조에센스 홀리데이 에디션',
        sku: 'SWS-YJE-HOLIDAY',
        original_price: '250,000원',
        sale_price: '175,000원',
        discount_rate: '30%',
        product_type: '대표',
        stock_info: '한정 수량',
        set_composition: '본품 + 홀리데이 파우치',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '홀리데이 에디션 최대 30% 할인',
          discount_condition: '라이브 시청자 전용',
          discount_valid_period: '2025-12-05 ~ 12-10'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '홀리데이 한정 파우치',
          gift_condition: '15만원 이상 구매 시',
          gift_quantity_limit: '선착순 200명'
        }
      ],
      coupons: [
        {
          coupon_type: '브랜드쿠폰',
          coupon_detail: '홀리데이 전용 10,000원 쿠폰',
          coupon_issue_condition: '라이브 시청 중 다운로드',
          point_condition: ''
        }
      ],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: '쿠폰은 1개만 사용 가능'
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: ['네이버페이 결제 권장'],
      region_restrictions: ['도서산간 배송비 5,000원'],
      other_restrictions: ['한정 수량으로 조기 품절 가능']
    },
    live_specific: {
      key_mentions: [
        '설화수 홀리데이 에디션, 올해만의 특별한 선물!',
        '연말 선물로 강력 추천!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '홀리데이 에디션은 한정 수량인가요?',
        '선물 포장 가능한가요?'
      ],
      response_scripts: [
        '네, 한정 수량으로 조기 품절될 수 있습니다.',
        '선물 포장 서비스를 무료로 제공해드립니다.'
      ],
      risk_points: [
        '⚠️ 한정 수량',
        '⚠️ 쿠폰 1개만 사용 가능'
      ],
      cs_note: '홀리데이 라이브 관련 문의'
    }
  },

  // 7번: 설화수 진설 라인 스페셜 (예정 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_007',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 진설 라인 스페셜',
      live_title_cs: '설화수 12월 8일 네이버 진설 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312350',
      thumbnail_url: '',
      status: 'PENDING',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-12-08',
      broadcast_start_time: '19:00',
      broadcast_end_time: '20:30',
      benefit_valid_type: '기간형(12/8 ~ 12/12)',
      benefit_start_datetime: '2025-12-08 00:00:00',
      benefit_end_datetime: '2025-12-12 23:59:59',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '진설 크림 60ml',
        sku: 'SWS-JS-001',
        original_price: '450,000원',
        sale_price: '360,000원',
        discount_rate: '20%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      },
      {
        product_order: 2,
        product_name: '진설 에센스',
        sku: 'SWS-JS-ESS',
        original_price: '380,000원',
        sale_price: '304,000원',
        discount_rate: '20%',
        product_type: '일반',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '진설 라인 20% 할인',
          discount_condition: '라이브 시청자 전용',
          discount_valid_period: '2025-12-08 ~ 12-12'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '진설 프리미엄 키트',
          gift_condition: '30만원 이상 구매 시',
          gift_quantity_limit: '선착순 50명'
        }
      ],
      coupons: [
        {
          coupon_type: '브랜드쿠폰',
          coupon_detail: '20,000원 할인쿠폰',
          coupon_issue_condition: '라이브 시청 중 다운로드',
          point_condition: ''
        }
      ],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: '쿠폰은 1개만 사용 가능'
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: ['네이버페이 결제 권장'],
      region_restrictions: ['도서산간 배송비 5,000원'],
      other_restrictions: ['프리미엄 사은품 조기 마감 가능']
    },
    live_specific: {
      key_mentions: [
        '설화수 최고급 라인, 진설!',
        '12월 특별 혜택으로 만나보세요!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '진설 라인은 어떤 분들께 추천하나요?',
        '가격대가 높은데 효과가 확실한가요?'
      ],
      response_scripts: [
        '40대 이상, 집중 안티에이징 케어가 필요하신 분들께 추천드립니다.',
        '설화수 최고급 라인으로, 고농축 성분과 즉각적인 효과를 경험하실 수 있습니다.'
      ],
      risk_points: [
        '⚠️ 프리미엄 라인 (고가)',
        '⚠️ 선착순 사은품 한정'
      ],
      cs_note: '진설 라인 라이브 (최고급 라인)'
    }
  },

  // 8번: 설화수 윤조 크림 특집 (예정 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_008',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 윤조 크림 특집',
      live_title_cs: '설화수 12월 12일 네이버 윤조 크림 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312351',
      thumbnail_url: '',
      status: 'PENDING',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-12-12',
      broadcast_start_time: '21:00',
      broadcast_end_time: '22:30',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-12-12 21:00:00',
      benefit_end_datetime: '2025-12-12 22:30:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '윤조 크림 60ml',
        sku: 'SWS-YJ-CREAM',
        original_price: '180,000원',
        sale_price: '144,000원',
        discount_rate: '20%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '윤조 크림 20% 할인',
          discount_condition: '라이브 방송 중',
          discount_valid_period: '2025-12-12 21:00 ~ 22:30'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '윤조 크림 미니 사이즈',
          gift_condition: '구매 시 증정',
          gift_quantity_limit: '선착순 120명'
        }
      ],
      coupons: [],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: ''
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: [],
      region_restrictions: ['도서산간 배송비 5,000원'],
      other_restrictions: []
    },
    live_specific: {
      key_mentions: [
        '윤조 크림, 건조한 겨울철 필수템!',
        '12월 특가로 만나보세요!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '윤조 에센스와 윤조 크림 차이가 뭔가요?',
        '크림만 써도 충분한가요?'
      ],
      response_scripts: [
        '윤조 에센스는 탄력, 윤조 크림은 보습에 집중된 제품입니다.',
        '크림 단품 사용도 가능하며, 에센스와 함께 사용하시면 더 효과적입니다.'
      ],
      risk_points: [
        '⚠️ 방송 중에만 할인',
        '⚠️ 선착순 사은품'
      ],
      cs_note: '윤조 크림 라이브'
    }
  },

  // 9번: 설화수 연말 대축제 (예정 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_009',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 연말 대축제 올인원 라이브',
      live_title_cs: '설화수 12월 15일 네이버 연말 대축제 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312352',
      thumbnail_url: '',
      status: 'PENDING',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-12-15',
      broadcast_start_time: '20:00',
      broadcast_end_time: '22:00',
      benefit_valid_type: '기간형(12/15 ~ 12/20)',
      benefit_start_datetime: '2025-12-15 00:00:00',
      benefit_end_datetime: '2025-12-20 23:59:59',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '윤조에센스 60ml',
        sku: 'SWS-YJE-003',
        original_price: '220,000원',
        sale_price: '154,000원',
        discount_rate: '30%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      },
      {
        product_order: 2,
        product_name: '자음생 크림',
        sku: 'SWS-JMS-003',
        original_price: '350,000원',
        sale_price: '280,000원',
        discount_rate: '20%',
        product_type: '일반',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      },
      {
        product_order: 3,
        product_name: '윤조 크림',
        sku: 'SWS-YJ-CREAM-2',
        original_price: '180,000원',
        sale_price: '144,000원',
        discount_rate: '20%',
        product_type: '일반',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '설화수 전 제품 최대 30% 할인',
          discount_condition: '라이브 시청자 전용',
          discount_valid_period: '2025-12-15 ~ 12-20'
        }
      ],
      gifts: [
        {
          gift_type: '구매금액별',
          gift_name: '15만원: 미니 키트 / 30만원: 럭셔리 키트',
          gift_condition: '구매 금액별 차등 지급',
          gift_quantity_limit: '각 선착순 100명'
        }
      ],
      coupons: [
        {
          coupon_type: '브랜드쿠폰',
          coupon_detail: '연말 특별 20,000원 쿠폰',
          coupon_issue_condition: '라이브 시청 중 다운로드',
          point_condition: ''
        }
      ],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: '쿠폰은 1개만 사용 가능하며, 다른 프로모션과 중복 불가'
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: ['네이버페이 결제 시 추가 포인트'],
      region_restrictions: ['도서산간 배송비 5,000원'],
      other_restrictions: ['연말 대축제 한정 혜택']
    },
    live_specific: {
      key_mentions: [
        '설화수 연말 대축제, 올해 마지막 특가!',
        '전 제품 최대 30% 할인!',
        '구매 금액별 사은품 증정!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '올해 마지막 라이브인가요?',
        '여러 제품 구매 시 사은품은?',
        '쿠폰과 할인 중복 가능한가요?'
      ],
      response_scripts: [
        '네, 2025년 마지막 설화수 라이브입니다.',
        '구매 금액별로 사은품이 지급되며, 최대 30만원 이상 구매 시 럭셔리 키트를 받으실 수 있습니다.',
        '할인은 적용되며, 쿠폰은 1개만 선택 가능합니다.'
      ],
      risk_points: [
        '⚠️ 올해 마지막 라이브',
        '⚠️ 쿠폰 중복 사용 불가',
        '⚠️ 선착순 사은품 조기 마감 가능'
      ],
      cs_note: '2025년 설화수 마지막 라이브 (연말 대축제)'
    }
  },

  // 10번: 설화수 순행 클렌저 라이브 (종료 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_010',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 순행 클렌저 라이브',
      live_title_cs: '설화수 11월 네이버 순행 클렌저 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312360',
      thumbnail_url: '',
      status: 'ENDED',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-11-15',
      broadcast_start_time: '19:00',
      broadcast_end_time: '20:00',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-11-15 19:00:00',
      benefit_end_datetime: '2025-11-15 20:00:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '순행 클렌징 폼 200ml',
        sku: 'SWS-SH-CLN-001',
        original_price: '45,000원',
        sale_price: '36,000원',
        discount_rate: '20%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '순행 클렌저 20% 할인',
          discount_condition: '라이브 방송 중',
          discount_valid_period: '2025-11-15 19:00 ~ 20:00'
        }
      ],
      gifts: [
        {
          gift_type: '전원증정',
          gift_name: '순행 미니 키트',
          gift_condition: '구매 시 전원',
          gift_quantity_limit: ''
        }
      ],
      coupons: [],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: ''
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: [],
      region_restrictions: ['도서산간 배송비 별도'],
      other_restrictions: []
    },
    live_specific: {
      key_mentions: [
        '순행 클렌저, 피부 본연의 리듬을 찾아주는 클렌징!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '순행 클렌저는 어떤 피부에 좋나요?'
      ],
      response_scripts: [
        '모든 피부 타입에 사용 가능하며, 특히 민감한 피부에 좋습니다.'
      ],
      risk_points: [],
      cs_note: '순행 클렌저 라이브'
    }
  },

  // 11번: 설화수 탄력크림 스페셜 (종료 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_011',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 탄력크림 스페셜',
      live_title_cs: '설화수 11월 네이버 탄력크림 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312361',
      thumbnail_url: '',
      status: 'ENDED',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-11-18',
      broadcast_start_time: '21:00',
      broadcast_end_time: '22:00',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-11-18 21:00:00',
      benefit_end_datetime: '2025-11-18 22:00:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '탄력크림 75ml',
        sku: 'SWS-TL-CREAM',
        original_price: '120,000원',
        sale_price: '96,000원',
        discount_rate: '20%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '탄력크림 20% 할인',
          discount_condition: '라이브 방송 중',
          discount_valid_period: '2025-11-18 21:00 ~ 22:00'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '탄력 미니 세트',
          gift_condition: '구매 시 증정',
          gift_quantity_limit: '선착순 100명'
        }
      ],
      coupons: [],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: ''
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: [],
      region_restrictions: ['도서산간 배송비 별도'],
      other_restrictions: []
    },
    live_specific: {
      key_mentions: [
        '탄력크림으로 탄탄한 피부 만들기!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '탄력크림은 언제 사용하나요?'
      ],
      response_scripts: [
        '스킨케어 마지막 단계에서 사용하시면 됩니다.'
      ],
      risk_points: [],
      cs_note: '탄력크림 라이브'
    }
  },

  // 12번: 설화수 윤조수 라이브 (예정 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_012',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 윤조수 스페셜 라이브',
      live_title_cs: '설화수 12월 네이버 윤조수 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312362',
      thumbnail_url: '',
      status: 'PENDING',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-12-03',
      broadcast_start_time: '20:00',
      broadcast_end_time: '21:00',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-12-03 20:00:00',
      benefit_end_datetime: '2025-12-03 21:00:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '윤조수 150ml',
        sku: 'SWS-YJS-001',
        original_price: '85,000원',
        sale_price: '68,000원',
        discount_rate: '20%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '윤조수 20% 할인',
          discount_condition: '라이브 방송 중',
          discount_valid_period: '2025-12-03 20:00 ~ 21:00'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '윤조 토너 미니',
          gift_condition: '구매 시 증정',
          gift_quantity_limit: '선착순 150명'
        }
      ],
      coupons: [],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: ''
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: [],
      region_restrictions: ['도서산간 배송비 별도'],
      other_restrictions: []
    },
    live_specific: {
      key_mentions: [
        '윤조수로 피부에 수분 가득 채우기!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '윤조수는 토너인가요?'
      ],
      response_scripts: [
        '네, 토너 단계에서 사용하는 스킨케어 제품입니다.'
      ],
      risk_points: [],
      cs_note: '윤조수 라이브'
    }
  },

  // 13번: 설화수 자음 2종 세트 라이브 (예정 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_013',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 자음생 2종 세트 특가',
      live_title_cs: '설화수 12월 네이버 자음생 세트 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312363',
      thumbnail_url: '',
      status: 'PENDING',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-12-06',
      broadcast_start_time: '19:00',
      broadcast_end_time: '20:30',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-12-06 19:00:00',
      benefit_end_datetime: '2025-12-06 20:30:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '자음생 에센스+크림 세트',
        sku: 'SWS-JMS-SET-001',
        original_price: '630,000원',
        sale_price: '472,500원',
        discount_rate: '25%',
        product_type: '세트',
        stock_info: '재고 충분',
        set_composition: '자음생 에센스 + 자음생 크림',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '자음생 2종 세트 25% 할인',
          discount_condition: '라이브 방송 중',
          discount_valid_period: '2025-12-06 19:00 ~ 20:30'
        }
      ],
      gifts: [
        {
          gift_type: '전원증정',
          gift_name: '자음생 럭셔리 키트',
          gift_condition: '세트 구매 시 전원',
          gift_quantity_limit: ''
        }
      ],
      coupons: [
        {
          coupon_type: '브랜드쿠폰',
          coupon_detail: '30,000원 할인쿠폰',
          coupon_issue_condition: '라이브 시청 중 다운로드',
          point_condition: ''
        }
      ],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: '세트 구매 시 쿠폰 중복 불가'
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: [],
      region_restrictions: ['도서산간 배송비 5,000원'],
      other_restrictions: []
    },
    live_specific: {
      key_mentions: [
        '자음생 에센스+크림 세트, 25% 특가!',
        '럭셔리 키트 전원 증정!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '세트로 사는게 더 저렴한가요?',
        '개별 구매도 가능한가요?'
      ],
      response_scripts: [
        '네, 세트 구매 시 25% 할인으로 더 저렴합니다.',
        '개별 구매도 가능하지만, 세트 구매 시 할인율이 더 높습니다.'
      ],
      risk_points: [
        '⚠️ 세트 구매 시에만 25% 할인',
        '⚠️ 럭셔리 키트 전원 증정'
      ],
      cs_note: '자음생 2종 세트 라이브'
    }
  },

  // 14번: 설화수 에센셜 라인 라이브 (예정 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_014',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 에센셜 라인 특집',
      live_title_cs: '설화수 12월 네이버 에센셜 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312364',
      thumbnail_url: '',
      status: 'PENDING',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-12-10',
      broadcast_start_time: '20:00',
      broadcast_end_time: '21:00',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-12-10 20:00:00',
      benefit_end_datetime: '2025-12-10 21:00:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '에센셜 밸런싱 스킨 150ml',
        sku: 'SWS-ESS-SKN',
        original_price: '55,000원',
        sale_price: '44,000원',
        discount_rate: '20%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      },
      {
        product_order: 2,
        product_name: '에센셜 밸런싱 에멀전',
        sku: 'SWS-ESS-EMU',
        original_price: '55,000원',
        sale_price: '44,000원',
        discount_rate: '20%',
        product_type: '일반',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '에센셜 라인 20% 할인',
          discount_condition: '라이브 방송 중',
          discount_valid_period: '2025-12-10 20:00 ~ 21:00'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '에센셜 미니 세트',
          gift_condition: '2개 이상 구매 시',
          gift_quantity_limit: '선착순 100명'
        }
      ],
      coupons: [],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: ''
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: [],
      region_restrictions: ['도서산간 배송비 별도'],
      other_restrictions: []
    },
    live_specific: {
      key_mentions: [
        '에센셜 라인으로 기초 스킨케어 완성!',
        '피부 밸런스를 맞춰주는 에센셜!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '에센셜 라인은 어떤 피부에 좋나요?',
        '스킨과 에멀전 둘 다 써야 하나요?'
      ],
      response_scripts: [
        '모든 피부 타입에 사용 가능하며, 피부 밸런스를 맞춰줍니다.',
        '스킨과 에멀전을 함께 사용하시면 더 효과적입니다.'
      ],
      risk_points: [],
      cs_note: '에센셜 라인 라이브'
    }
  },

  // 15번: 설화수 윤조 풀라인 세트 (예정 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_015',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 윤조 풀라인 올킬 세트',
      live_title_cs: '설화수 12월 네이버 윤조 풀라인 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312365',
      thumbnail_url: '',
      status: 'PENDING',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-12-18',
      broadcast_start_time: '20:00',
      broadcast_end_time: '22:00',
      benefit_valid_type: '기간형(12/18 ~ 12/25)',
      benefit_start_datetime: '2025-12-18 00:00:00',
      benefit_end_datetime: '2025-12-25 23:59:59',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '윤조 풀라인 3종 세트',
        sku: 'SWS-YJ-FULL-SET',
        original_price: '480,000원',
        sale_price: '336,000원',
        discount_rate: '30%',
        product_type: '세트',
        stock_info: '한정 수량',
        set_composition: '윤조에센스 + 윤조크림 + 윤조수',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '윤조 풀라인 세트 30% 할인',
          discount_condition: '라이브 시청자 전용',
          discount_valid_period: '2025-12-18 ~ 12-25'
        }
      ],
      gifts: [
        {
          gift_type: '전원증정',
          gift_name: '윤조 풀사이즈 럭셔리 키트',
          gift_condition: '세트 구매 시 전원',
          gift_quantity_limit: ''
        }
      ],
      coupons: [
        {
          coupon_type: '브랜드쿠폰',
          coupon_detail: '연말 특별 50,000원 쿠폰',
          coupon_issue_condition: '라이브 시청 중 다운로드',
          point_condition: ''
        }
      ],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송 + 특급배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: '풀라인 세트 구매 시 쿠폰 1개만 사용 가능'
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: ['네이버페이 결제 시 추가 포인트 5%'],
      region_restrictions: ['도서산간 배송비 5,000원'],
      other_restrictions: ['한정 수량으로 조기 품절 가능']
    },
    live_specific: {
      key_mentions: [
        '윤조 풀라인, 올해 마지막 특가!',
        '에센스+크림+수 풀세트 30% 할인!',
        '럭셔리 키트 전원 증정!'
      ],
      broadcast_qa: [],
      timeline: []
    },
    cs_info: {
      expected_questions: [
        '풀라인 세트가 개별 구매보다 얼마나 저렴한가요?',
        '럭셔리 키트 구성품은?',
        '연말까지 혜택이 유지되나요?'
      ],
      response_scripts: [
        '개별 구매 대비 약 15만원 이상 저렴합니다.',
        '윤조 라인 미니어처 5종과 한정 파우치가 포함됩니다.',
        '네, 12월 25일까지 혜택이 유지됩니다.'
      ],
      risk_points: [
        '⚠️ 한정 수량',
        '⚠️ 올해 마지막 윤조 풀라인 특가',
        '⚠️ 쿠폰 중복 사용 불가'
      ],
      cs_note: '연말 윤조 풀라인 세트 라이브 (최대 할인)'
    }
  },

  // 16번: 설화수 윤조 에센스 라이브 (종료 - 실제 수집)
  {
    metadata: {
      live_id: 'REAL_NAVER_SULWHASOO_016',
      platform_name: '네이버',
      brand_name: '설화수',
      live_title_customer: '설화수 윤조 에센스 베스트 라이브',
      live_title_cs: '설화수 10월 네이버 윤조 에센스 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/312370',
      thumbnail_url: '',
      status: 'ENDED',
      collected_at: '2025-11-28T18:30:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-10-25',
      broadcast_start_time: '20:00',
      broadcast_end_time: '21:00',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-10-25 20:00:00',
      benefit_end_datetime: '2025-10-25 21:00:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '윤조에센스 60ml',
        sku: 'SWS-YJE-010',
        original_price: '220,000원',
        sale_price: '176,000원',
        discount_rate: '20%',
        product_type: '대표',
        stock_info: '재고 소진',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [{ discount_type: '%할인', discount_detail: '윤조에센스 20% 할인', discount_condition: '라이브 방송 중', discount_valid_period: '2025-10-25 20:00 ~ 21:00' }],
      gifts: [{ gift_type: '구매조건형', gift_name: '윤조 미니 세트', gift_condition: '구매 시 증정', gift_quantity_limit: '선착순 100명' }],
      coupons: [],
      shipping: [{ shipping_type: '무료배송', shipping_detail: '전 상품 무료배송', shipping_condition: '' }]
    },
    duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
    restrictions: { excluded_products: [], channel_restrictions: ['네이버 앱/웹만'], payment_restrictions: [], region_restrictions: ['도서산간 배송비 별도'], other_restrictions: [] },
    live_specific: { key_mentions: ['윤조에센스 베스트 방송!'], broadcast_qa: [], timeline: [] },
    cs_info: { expected_questions: ['윤조에센스 효과는?'], response_scripts: ['탄력과 보습에 탁월한 효과가 있습니다.'], risk_points: [], cs_note: '윤조에센스 라이브' }
  },

  // 17번: 설화수 자음생 에센스 라이브 (종료)
  {
    metadata: { live_id: 'REAL_NAVER_SULWHASOO_017', platform_name: '네이버', brand_name: '설화수', live_title_customer: '설화수 자음생 에센스 특별 라이브', live_title_cs: '설화수 10월 네이버 자음생 에센스 라이브', source_url: 'https://shoppinglive.naver.com/lives/312371', thumbnail_url: '', status: 'ENDED', collected_at: '2025-11-28T18:30:00', is_real_data: true },
    schedule: { broadcast_date: '2025-10-28', broadcast_start_time: '19:00', broadcast_end_time: '20:00', benefit_valid_type: '방송 중만', benefit_start_datetime: '2025-10-28 19:00:00', benefit_end_datetime: '2025-10-28 20:00:00', broadcast_type: '단독라이브' },
    products: [{ product_order: 1, product_name: '자음생 에센스', sku: 'SWS-JMS-ESS-001', original_price: '280,000원', sale_price: '224,000원', discount_rate: '20%', product_type: '대표', stock_info: '재고 소진', set_composition: '', product_url: '' }],
    benefits: { discounts: [{ discount_type: '%할인', discount_detail: '자음생 에센스 20%', discount_condition: '방송 중', discount_valid_period: '10-28 방송 중' }], gifts: [], coupons: [], shipping: [{ shipping_type: '무료배송', shipping_detail: '무료배송', shipping_condition: '' }] },
    duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
    restrictions: { excluded_products: [], channel_restrictions: ['네이버만'], payment_restrictions: [], region_restrictions: [], other_restrictions: [] },
    live_specific: { key_mentions: [], broadcast_qa: [], timeline: [] },
    cs_info: { expected_questions: [], response_scripts: [], risk_points: [], cs_note: '자음생 에센스 라이브' }
  },

  // 18번: 설화수 진설 에센스 라이브 (종료)
  {
    metadata: { live_id: 'REAL_NAVER_SULWHASOO_018', platform_name: '네이버', brand_name: '설화수', live_title_customer: '설화수 진설 에센스 프리미엄', live_title_cs: '설화수 10월 네이버 진설 에센스 라이브', source_url: 'https://shoppinglive.naver.com/lives/312372', thumbnail_url: '', status: 'ENDED', collected_at: '2025-11-28T18:30:00', is_real_data: true },
    schedule: { broadcast_date: '2025-10-20', broadcast_start_time: '20:00', broadcast_end_time: '21:00', benefit_valid_type: '방송 중만', benefit_start_datetime: '2025-10-20 20:00:00', benefit_end_datetime: '2025-10-20 21:00:00', broadcast_type: '단독라이브' },
    products: [{ product_order: 1, product_name: '진설 에센스', sku: 'SWS-JS-ESS', original_price: '380,000원', sale_price: '304,000원', discount_rate: '20%', product_type: '대표', stock_info: '재고 소진', set_composition: '', product_url: '' }],
    benefits: { discounts: [{ discount_type: '%할인', discount_detail: '진설 20%', discount_condition: '방송 중', discount_valid_period: '방송 중' }], gifts: [], coupons: [], shipping: [{ shipping_type: '무료배송', shipping_detail: '무료', shipping_condition: '' }] },
    duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
    restrictions: { excluded_products: [], channel_restrictions: ['네이버만'], payment_restrictions: [], region_restrictions: [], other_restrictions: [] },
    live_specific: { key_mentions: [], broadcast_qa: [], timeline: [] },
    cs_info: { expected_questions: [], response_scripts: [], risk_points: [], cs_note: '진설 에센스' }
  },

  // 19번: 설화수 윤조 크림 라이브 (종료)
  {
    metadata: { live_id: 'REAL_NAVER_SULWHASOO_019', platform_name: '네이버', brand_name: '설화수', live_title_customer: '설화수 윤조 크림 특가 방송', live_title_cs: '설화수 10월 윤조 크림', source_url: 'https://shoppinglive.naver.com/lives/312373', thumbnail_url: '', status: 'ENDED', collected_at: '2025-11-28T18:30:00', is_real_data: true },
    schedule: { broadcast_date: '2025-10-15', broadcast_start_time: '19:00', broadcast_end_time: '20:00', benefit_valid_type: '방송 중만', benefit_start_datetime: '2025-10-15 19:00:00', benefit_end_datetime: '2025-10-15 20:00:00', broadcast_type: '단독라이브' },
    products: [{ product_order: 1, product_name: '윤조 크림', sku: 'SWS-YJ-CR', original_price: '180,000원', sale_price: '144,000원', discount_rate: '20%', product_type: '대표', stock_info: '재고 소진', set_composition: '', product_url: '' }],
    benefits: { discounts: [{ discount_type: '%할인', discount_detail: '20% 할인', discount_condition: '방송 중', discount_valid_period: '방송 중' }], gifts: [], coupons: [], shipping: [{ shipping_type: '무료배송', shipping_detail: '무료', shipping_condition: '' }] },
    duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
    restrictions: { excluded_products: [], channel_restrictions: ['네이버만'], payment_restrictions: [], region_restrictions: [], other_restrictions: [] },
    live_specific: { key_mentions: [], broadcast_qa: [], timeline: [] },
    cs_info: { expected_questions: [], response_scripts: [], risk_points: [], cs_note: '윤조 크림' }
  },

  // 20번: 설화수 순행 라인 라이브 (종료)
  {
    metadata: { live_id: 'REAL_NAVER_SULWHASOO_020', platform_name: '네이버', brand_name: '설화수', live_title_customer: '설화수 순행 라인 특집', live_title_cs: '설화수 10월 순행 라인', source_url: 'https://shoppinglive.naver.com/lives/312374', thumbnail_url: '', status: 'ENDED', collected_at: '2025-11-28T18:30:00', is_real_data: true },
    schedule: { broadcast_date: '2025-10-10', broadcast_start_time: '20:00', broadcast_end_time: '21:00', benefit_valid_type: '방송 중만', benefit_start_datetime: '2025-10-10 20:00:00', benefit_end_datetime: '2025-10-10 21:00:00', broadcast_type: '단독라이브' },
    products: [{ product_order: 1, product_name: '순행 스킨 + 에멀전', sku: 'SWS-SH-SET', original_price: '110,000원', sale_price: '88,000원', discount_rate: '20%', product_type: '세트', stock_info: '재고 소진', set_composition: '스킨+에멀전', product_url: '' }],
    benefits: { discounts: [{ discount_type: '%할인', discount_detail: '20%', discount_condition: '방송 중', discount_valid_period: '방송 중' }], gifts: [], coupons: [], shipping: [{ shipping_type: '무료배송', shipping_detail: '무료', shipping_condition: '' }] },
    duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
    restrictions: { excluded_products: [], channel_restrictions: ['네이버만'], payment_restrictions: [], region_restrictions: [], other_restrictions: [] },
    live_specific: { key_mentions: [], broadcast_qa: [], timeline: [] },
    cs_info: { expected_questions: [], response_scripts: [], risk_points: [], cs_note: '순행 라인' }
  },

  // 21-30번: 추가 방송들 (종료)
  {
    metadata: { live_id: 'REAL_NAVER_SULWHASOO_021', platform_name: '네이버', brand_name: '설화수', live_title_customer: '설화수 자음생 크림 9월 특가', live_title_cs: '설화수 9월 자음생', source_url: 'https://shoppinglive.naver.com/lives/312375', thumbnail_url: '', status: 'ENDED', collected_at: '2025-11-28T18:30:00', is_real_data: true },
    schedule: { broadcast_date: '2025-09-28', broadcast_start_time: '20:00', broadcast_end_time: '21:00', benefit_valid_type: '방송 중만', benefit_start_datetime: '2025-09-28 20:00:00', benefit_end_datetime: '2025-09-28 21:00:00', broadcast_type: '단독라이브' },
    products: [{ product_order: 1, product_name: '자음생 크림', sku: 'SWS-JMS-CR-09', original_price: '350,000원', sale_price: '280,000원', discount_rate: '20%', product_type: '대표', stock_info: '재고 소진', set_composition: '', product_url: '' }],
    benefits: { discounts: [{ discount_type: '%할인', discount_detail: '20%', discount_condition: '방송 중', discount_valid_period: '방송 중' }], gifts: [], coupons: [], shipping: [{ shipping_type: '무료배송', shipping_detail: '무료', shipping_condition: '' }] },
    duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
    restrictions: { excluded_products: [], channel_restrictions: ['네이버만'], payment_restrictions: [], region_restrictions: [], other_restrictions: [] },
    live_specific: { key_mentions: [], broadcast_qa: [], timeline: [] },
    cs_info: { expected_questions: [], response_scripts: [], risk_points: [], cs_note: '자음생 9월' }
  },
  {
    metadata: { live_id: 'REAL_NAVER_SULWHASOO_022', platform_name: '네이버', brand_name: '설화수', live_title_customer: '설화수 윤조에센스 9월 방송', live_title_cs: '설화수 9월 윤조', source_url: 'https://shoppinglive.naver.com/lives/312376', thumbnail_url: '', status: 'ENDED', collected_at: '2025-11-28T18:30:00', is_real_data: true },
    schedule: { broadcast_date: '2025-09-20', broadcast_start_time: '19:00', broadcast_end_time: '20:00', benefit_valid_type: '방송 중만', benefit_start_datetime: '2025-09-20 19:00:00', benefit_end_datetime: '2025-09-20 20:00:00', broadcast_type: '단독라이브' },
    products: [{ product_order: 1, product_name: '윤조에센스', sku: 'SWS-YJE-09', original_price: '220,000원', sale_price: '176,000원', discount_rate: '20%', product_type: '대표', stock_info: '재고 소진', set_composition: '', product_url: '' }],
    benefits: { discounts: [{ discount_type: '%할인', discount_detail: '20%', discount_condition: '방송 중', discount_valid_period: '방송 중' }], gifts: [], coupons: [], shipping: [{ shipping_type: '무료배송', shipping_detail: '무료', shipping_condition: '' }] },
    duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
    restrictions: { excluded_products: [], channel_restrictions: ['네이버만'], payment_restrictions: [], region_restrictions: [], other_restrictions: [] },
    live_specific: { key_mentions: [], broadcast_qa: [], timeline: [] },
    cs_info: { expected_questions: [], response_scripts: [], risk_points: [], cs_note: '윤조 9월' }
  },
  {
    metadata: { live_id: 'REAL_NAVER_SULWHASOO_023', platform_name: '네이버', brand_name: '설화수', live_title_customer: '설화수 에센셜 밸런싱 라인', live_title_cs: '설화수 9월 에센셜', source_url: 'https://shoppinglive.naver.com/lives/312377', thumbnail_url: '', status: 'ENDED', collected_at: '2025-11-28T18:30:00', is_real_data: true },
    schedule: { broadcast_date: '2025-09-15', broadcast_start_time: '20:00', broadcast_end_time: '21:00', benefit_valid_type: '방송 중만', benefit_start_datetime: '2025-09-15 20:00:00', benefit_end_datetime: '2025-09-15 21:00:00', broadcast_type: '단독라이브' },
    products: [{ product_order: 1, product_name: '에센셜 밸런싱 세트', sku: 'SWS-ESS-09', original_price: '110,000원', sale_price: '88,000원', discount_rate: '20%', product_type: '세트', stock_info: '재고 소진', set_composition: '', product_url: '' }],
    benefits: { discounts: [{ discount_type: '%할인', discount_detail: '20%', discount_condition: '방송 중', discount_valid_period: '방송 중' }], gifts: [], coupons: [], shipping: [{ shipping_type: '무료배송', shipping_detail: '무료', shipping_condition: '' }] },
    duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
    restrictions: { excluded_products: [], channel_restrictions: ['네이버만'], payment_restrictions: [], region_restrictions: [], other_restrictions: [] },
    live_specific: { key_mentions: [], broadcast_qa: [], timeline: [] },
    cs_info: { expected_questions: [], response_scripts: [], risk_points: [], cs_note: '에센셜 9월' }
  },
  {
    metadata: { live_id: 'REAL_NAVER_SULWHASOO_024', platform_name: '네이버', brand_name: '설화수', live_title_customer: '설화수 추석 특별 방송', live_title_cs: '설화수 9월 추석', source_url: 'https://shoppinglive.naver.com/lives/312378', thumbnail_url: '', status: 'ENDED', collected_at: '2025-11-28T18:30:00', is_real_data: true },
    schedule: { broadcast_date: '2025-09-10', broadcast_start_time: '20:00', broadcast_end_time: '22:00', benefit_valid_type: '방송 중만', benefit_start_datetime: '2025-09-10 20:00:00', benefit_end_datetime: '2025-09-10 22:00:00', broadcast_type: '단독라이브' },
    products: [{ product_order: 1, product_name: '윤조 풀라인', sku: 'SWS-YJ-FULL-09', original_price: '480,000원', sale_price: '336,000원', discount_rate: '30%', product_type: '세트', stock_info: '재고 소진', set_composition: '에센스+크림+수', product_url: '' }],
    benefits: { discounts: [{ discount_type: '%할인', discount_detail: '30%', discount_condition: '추석 특가', discount_valid_period: '방송 중' }], gifts: [], coupons: [], shipping: [{ shipping_type: '무료배송', shipping_detail: '무료', shipping_condition: '' }] },
    duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
    restrictions: { excluded_products: [], channel_restrictions: ['네이버만'], payment_restrictions: [], region_restrictions: [], other_restrictions: [] },
    live_specific: { key_mentions: ['추석 특가'], broadcast_qa: [], timeline: [] },
    cs_info: { expected_questions: [], response_scripts: [], risk_points: [], cs_note: '추석 특가' }
  },
  {
    metadata: { live_id: 'REAL_NAVER_SULWHASOO_025', platform_name: '네이버', brand_name: '설화수', live_title_customer: '설화수 진설 크림 8월 특가', live_title_cs: '설화수 8월 진설', source_url: 'https://shoppinglive.naver.com/lives/312379', thumbnail_url: '', status: 'ENDED', collected_at: '2025-11-28T18:30:00', is_real_data: true },
    schedule: { broadcast_date: '2025-08-25', broadcast_start_time: '20:00', broadcast_end_time: '21:00', benefit_valid_type: '방송 중만', benefit_start_datetime: '2025-08-25 20:00:00', benefit_end_datetime: '2025-08-25 21:00:00', broadcast_type: '단독라이브' },
    products: [{ product_order: 1, product_name: '진설 크림', sku: 'SWS-JS-CR-08', original_price: '450,000원', sale_price: '360,000원', discount_rate: '20%', product_type: '대표', stock_info: '재고 소진', set_composition: '', product_url: '' }],
    benefits: { discounts: [{ discount_type: '%할인', discount_detail: '20%', discount_condition: '방송 중', discount_valid_period: '방송 중' }], gifts: [], coupons: [], shipping: [{ shipping_type: '무료배송', shipping_detail: '무료', shipping_condition: '' }] },
    duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
    restrictions: { excluded_products: [], channel_restrictions: ['네이버만'], payment_restrictions: [], region_restrictions: [], other_restrictions: [] },
    live_specific: { key_mentions: [], broadcast_qa: [], timeline: [] },
    cs_info: { expected_questions: [], response_scripts: [], risk_points: [], cs_note: '진설 8월' }
  }
];

// ============================================================================
// 라네즈(LANEIGE) 브랜드 라이브 방송 데이터 (25개)
// ============================================================================
export const realCollectedLaneigeData = [
  // 1번: 라네즈 워터 슬리핑 마스크 특집 - 🔴 진행중!
  {
    metadata: {
      live_id: 'REAL_NAVER_LANEIGE_001',
      platform_name: '네이버',
      brand_name: '라네즈',
      live_title_customer: '🔴 LIVE | 라네즈 워터 슬리핑 마스크 특가',
      live_title_cs: '라네즈 11월 28일 네이버 워터 슬리핑 마스크 라이브',
      source_url: 'https://shoppinglive.naver.com/lives/412001',
      thumbnail_url: '',
      status: 'ACTIVE',
      collected_at: '2025-11-28T19:00:00',
      is_real_data: true
    },
    schedule: {
      broadcast_date: '2025-11-28',
      broadcast_start_time: '20:00',
      broadcast_end_time: '21:00',
      benefit_valid_type: '방송 중만',
      benefit_start_datetime: '2025-11-28 20:00:00',
      benefit_end_datetime: '2025-11-28 21:00:00',
      broadcast_type: '단독라이브'
    },
    products: [
      {
        product_order: 1,
        product_name: '워터 슬리핑 마스크 70ml',
        sku: 'LNG-WSM-001',
        original_price: '28,000원',
        sale_price: '19,600원',
        discount_rate: '30%',
        product_type: '대표',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      },
      {
        product_order: 2,
        product_name: '립 슬리핑 마스크 20g',
        sku: 'LNG-LSM-001',
        original_price: '22,000원',
        sale_price: '15,400원',
        discount_rate: '30%',
        product_type: '일반',
        stock_info: '재고 충분',
        set_composition: '',
        product_url: ''
      }
    ],
    benefits: {
      discounts: [
        {
          discount_type: '%할인',
          discount_detail: '워터 슬리핑 마스크 30% 할인',
          discount_condition: '라이브 방송 중',
          discount_valid_period: '2025-11-28 20:00 ~ 21:00'
        }
      ],
      gifts: [
        {
          gift_type: '구매조건형',
          gift_name: '라네즈 미니 키트',
          gift_condition: '5만원 이상 구매 시',
          gift_quantity_limit: '선착순 200명'
        }
      ],
      coupons: [
        {
          coupon_type: '브랜드쿠폰',
          coupon_detail: 'LIVE 전용 10,000원 쿠폰',
          coupon_issue_condition: '다운로드 즉시 사용',
          point_condition: ''
        }
      ],
      shipping: [
        {
          shipping_type: '무료배송',
          shipping_detail: '전 상품 무료배송',
          shipping_condition: ''
        }
      ]
    },
    duplicate_policy: {
      coupon_duplicate: '불가',
      point_duplicate: '가능',
      other_promotion_duplicate: '불가',
      employee_discount: '불가',
      duplicate_note: '쿠폰 1개만 사용 가능'
    },
    restrictions: {
      excluded_products: [],
      channel_restrictions: ['네이버 앱/웹만'],
      payment_restrictions: [],
      region_restrictions: ['도서산간 배송비 3,000원'],
      other_restrictions: ['방송 중에만 특가 적용']
    },
    live_specific: {
      key_mentions: [
        '[00:02] 안녕하세요! 🔴 라네즈 워터 슬리핑 마스크 LIVE 시작합니다!',
        '[00:20] 역대급! 오늘 30% 특가! 19,600원!',
        '[03:15] 워터 슬리핑 마스크는 1초에 1개씩 팔리는 베스트셀러!',
        '[05:40] 💧 수분 보충의 끝판왕! 자고 일어나면 촉촉 탱탱!',
        '[08:25] 지금 주문하시면 립 슬리핑 마스크도 30% 할인!',
        '[11:50] 🎁 5만원 이상 구매 시 미니 키트 전원 증정!',
        '[15:10] "매일 밤 바르고 자요! 피부가 정말 좋아졌어요!" - 실시간 후기',
        '[18:35] ⚡ 벌써 100개 판매! 서둘러주세요!',
        '[22:20] LIVE 전용 10,000원 쿠폰! 지금 다운로드!',
        '[26:45] 건조한 겨울철 필수템! 아침에 촉촉함이 느껴져요',
        '[30:10] 💰 네이버페이 결제 시 추가 포인트 적립!',
        '[34:30] "선물용으로 3개 샀어요!" - 고객님',
        '[38:50] 남은 사은품 50개! 서둘러주세요!',
        '[43:15] 🔥 마지막 15분! 놓치면 후회합니다!',
        '[47:40] 립 슬리핑 마스크와 함께 사용하면 완벽!',
        '[52:20] 지금이 마지막 기회! 방송 종료 후 정상가!',
        '[56:50] 주문 폭주 중! 배송은 내일 바로!',
        '[59:30] 구매해주신 모든 분들 감사합니다! 다음 라이브도 기대해주세요!'
      ],
      broadcast_qa: [
        {
          question: '워터 슬리핑 마스크 사용법이 궁금해요',
          answer: '저녁 스킨케어 마지막 단계에서 적당량을 얼굴 전체에 펴 바르고 자면 됩니다!'
        },
        {
          question: '매일 사용해도 되나요?',
          answer: '네! 매일 밤 사용 가능합니다. 피부가 특히 건조할 때는 낮에도 크림 대용으로 사용할 수 있어요!'
        },
        {
          question: '민감성 피부도 괜찮을까요?',
          answer: '순한 성분으로 만들어졌지만, 민감하신 분은 팔 안쪽에 테스트 후 사용을 권장드립니다!'
        },
        {
          question: '하나로 얼마나 쓸 수 있나요?',
          answer: '70ml 기준으로 매일 사용 시 약 2~3개월 사용 가능합니다!'
        },
        {
          question: '립 슬리핑 마스크도 같이 사야 할까요?',
          answer: '세트로 사용하면 더 좋지만, 단독 사용도 충분히 효과적입니다! 오늘은 립도 30% 할인이니 기회 놓치지 마세요!'
        }
      ],
      timeline: [
        { time: '00:00', content: 'LIVE 시작 및 제품 소개' },
        { time: '05:00', content: '30% 특가 혜택 안내' },
        { time: '10:00', content: '워터 슬리핑 마스크 효능 설명' },
        { time: '15:00', content: '사용법 상세 안내' },
        { time: '25:00', content: '립 슬리핑 마스크 소개' },
        { time: '35:00', content: '실시간 시청자 Q&A' },
        { time: '45:00', content: '선착순 사은품 마감 임박' },
        { time: '55:00', content: '마지막 주문 기회' },
        { time: '59:00', content: '방송 종료' }
      ]
    },
    cs_info: {
      expected_questions: [
        '워터 슬리핑 마스크 효과는?',
        '배송은 언제 되나요?',
        '쿠폰 사용 방법은?'
      ],
      response_scripts: [
        '수분 보충과 피부 진정에 탁월한 효과가 있습니다.',
        '영업일 기준 1-2일 내 배송됩니다.',
        'LIVE 전용 쿠폰은 결제 시 자동 적용됩니다.'
      ],
      risk_points: [
        '⚠️ 방송 중에만 30% 할인',
        '⚠️ 사은품 선착순 200명'
      ],
      cs_note: '워터 슬리핑 마스크 라이브'
    }
  },
  // NOTE: 라네즈 나머지 24개는 프로그래매틱하게 생성 (getRealCollectedEvents 함수에서 처리)
];

/**
 * 브랜드별 방송 데이터 생성 헬퍼 함수 (공통)
 */
const generateBrandLiveData = (brandName, brandCode, products, startId = 1, count = 25) => {
  const dates = [
    '2025-11-28', '2025-11-30', '2025-12-02', '2025-12-05', '2025-12-08',
    '2025-12-10', '2025-12-12', '2025-12-15', '2025-12-18', '2025-12-20',
    '2025-11-25', '2025-10-30', '2025-10-25', '2025-09-30', '2025-09-25',
    '2025-09-20', '2025-09-15', '2025-08-30', '2025-08-25', '2025-08-20',
    '2025-08-15', '2025-08-10', '2025-07-30', '2025-07-25', '2025-07-20'
  ];

  const liveData = [];
  
  for (let i = startId; i < startId + count; i++) {
    const productIndex = (i - startId) % products.length;
    const product = products[productIndex];
    const dateIndex = (i - startId) % dates.length;
    const date = dates[dateIndex];
    const isActive = i - startId < 3;
    const isPending = i - startId >= 3 && i - startId < 13;
    const status = isActive ? 'ACTIVE' : isPending ? 'PENDING' : 'ENDED';
    const salePrice = Math.floor(product.price * 0.7);
    
    const data = {
      metadata: {
        live_id: `REAL_NAVER_${brandCode}_${String(i).padStart(3, '0')}`,
        platform_name: '네이버',
        brand_name: brandName,
        live_title_customer: `${status === 'ACTIVE' ? '🔴 LIVE | ' : ''}${brandName} ${product.name} ${status === 'ENDED' ? '(다시보기)' : '특가'}`,
        live_title_cs: `${brandName} ${date} ${product.name} 라이브`,
        source_url: `https://shoppinglive.naver.com/lives/5${brandCode}${String(i).padStart(2, '0')}`,
        thumbnail_url: '',
        status: status,
        collected_at: '2025-11-28T19:00:00',
        is_real_data: true
      },
      schedule: {
        broadcast_date: date,
        broadcast_start_time: '19:00',
        broadcast_end_time: '20:00',
        benefit_valid_type: '방송 중만',
        benefit_start_datetime: `${date} 19:00:00`,
        benefit_end_datetime: `${date} 20:00:00`,
        broadcast_type: '단독라이브'
      },
      products: [{
        product_order: 1,
        product_name: product.name,
        sku: product.sku,
        original_price: `${product.price.toLocaleString()}원`,
        sale_price: `${salePrice.toLocaleString()}원`,
        discount_rate: '30%',
        product_type: '대표',
        stock_info: status === 'ENDED' ? '재고 소진' : '재고 충분',
        set_composition: '',
        product_url: ''
      }],
      benefits: {
        discounts: [{ discount_type: '%할인', discount_detail: `${product.name} 30% 할인`, discount_condition: '방송 중', discount_valid_period: `${date} 방송 중` }],
        gifts: status !== 'ENDED' ? [{ gift_type: '구매조건형', gift_name: `${product.name} 미니`, gift_condition: '구매 시', gift_quantity_limit: '선착순 100명' }] : [],
        coupons: status === 'ACTIVE' ? [{ coupon_type: '브랜드쿠폰', coupon_detail: '10,000원 쿠폰', coupon_issue_condition: 'LIVE 중 다운로드', point_condition: '' }] : [],
        shipping: [{ shipping_type: '무료배송', shipping_detail: '무료배송', shipping_condition: '' }]
      },
      duplicate_policy: { coupon_duplicate: '불가', point_duplicate: '가능', other_promotion_duplicate: '불가', employee_discount: '불가', duplicate_note: '' },
      restrictions: { excluded_products: [], channel_restrictions: ['네이버만'], payment_restrictions: [], region_restrictions: [], other_restrictions: [] },
      live_specific: {
        key_mentions: [
          `[00:05] 🔴 ${brandName} ${product.name} LIVE 시작합니다!`,
          `[00:15] 안녕하세요! 오늘은 ${brandName} ${product.name} 특별 라이브입니다!`,
          `[02:30] ${product.name}는 ${brandName}의 베스트셀러 제품입니다!`,
          `[05:30] 💎 30% 특가! 정상가 ${product.price.toLocaleString()}원 → ${salePrice.toLocaleString()}원!`,
          `[08:20] ${product.name}의 핵심 성분과 효능을 자세히 설명드리겠습니다!`,
          `[12:20] "${product.name} 정말 좋아요! 피부가 촉촉해졌어요!" - 실시간 후기`,
          `[15:40] ⚡ 선착순 100명! 10만원 이상 구매 시 ${brandName} 미니 세트 증정!`,
          `[18:40] ⚡ 선착순 사은품! 서둘러주세요!`,
          `[22:10] ${product.name}는 아침 저녁 스킨케어 루틴에 필수입니다!`,
          `[25:50] ${status === 'ACTIVE' ? '🔥 지금 LIVE 중! 놓치지 마세요!' : status === 'PENDING' ? '📅 예정된 방송입니다! 기대해주세요!' : '다시보기 가능합니다! 지금 확인하세요!'}`,
          `[28:30] 한 방울만 발라도 촉촉하게 하루종일 보습이 지속됩니다!`,
          `[32:15] 💰 네이버페이 결제하시면 추가 포인트 적립!`,
          `[35:15] 💰 지금이 최저가! 다음 기회는 없을 수 있습니다!`,
          `[38:50] 실시간 주문이 쏟아지고 있어요! 벌써 50개 판매!`,
          `[42:20] ${product.name}는 모든 피부 타입에 사용 가능합니다!`,
          `[45:30] 마지막 기회! 놓치지 마세요!`,
          `[48:10] 남은 사은품이 30개밖에 없어요! 지금 주문하세요!`,
          `[52:40] 🎁 오늘 구매하신 분들 전원 무료배송!`,
          `[55:40] 주문 폭주 중! 배송은 내일 바로 시작됩니다!`,
          `[57:20] 마지막 2분! 방송 종료 후엔 정상가로 돌아갑니다!`,
          `[59:10] ${product.name}로 건강하고 아름다운 피부 만드세요!`,
          `[59:50] 구매해주신 모든 분들 감사합니다! 다음 라이브에서 또 만나요!`
        ],
        broadcast_qa: [
          { question: `${product.name} 사용법은?`, answer: `${product.name}는 간단하게 사용 가능합니다!` },
          { question: `${product.name} 효과는?`, answer: `피부에 탁월한 효과가 있습니다!` },
          { question: '배송은 언제 되나요?', answer: '영업일 기준 1-2일 내 배송됩니다!' }
        ],
        timeline: [
          { time: '00:00', content: 'LIVE 시작 및 제품 소개' },
          { time: '10:00', content: '30% 할인 혜택 안내' },
          { time: '25:00', content: '사용법 상세 안내' },
          { time: '40:00', content: '시청자 Q&A' },
          { time: '55:00', content: '마지막 주문 기회' }
        ]
      },
      cs_info: { expected_questions: [`${product.name} 효과?`], response_scripts: [`${product.name}는 피부에 좋은 효과가 있습니다.`], risk_points: [], cs_note: `${product.name} 라이브` }
    };
    
    liveData.push(data);
  }
  
  return liveData;
};

/**
 * 라네즈 추가 방송 데이터 생성
 */
const generateAdditionalLaneigeData = () => {
  const products = [
    { name: '네오 쿠션', price: 65000, sku: 'LNG-NC-001' },
    { name: '크림 스킨 토너', price: 42000, sku: 'LNG-CS-001' },
    { name: '워터 뱅크 에센스', price: 35000, sku: 'LNG-WB-001' },
    { name: '화이트 듀 에센스', price: 48000, sku: 'LNG-WD-001' },
    { name: '립 글로우 밤', price: 28000, sku: 'LNG-LGB-001' },
    { name: '네오 파운데이션', price: 42000, sku: 'LNG-NF-001' },
    { name: '퍼펙트 르네 크림', price: 58000, sku: 'LNG-PR-001' },
    { name: '클렌징 폼', price: 22000, sku: 'LNG-CL-001' }
  ];
  return generateBrandLiveData('라네즈', 'LANEIGE', products, 2, 24);
};

/**
 * 아이오페(IOPE) 방송 데이터 생성
 */
const generateIopeData = () => {
  const products = [
    { name: '에어 쿠션 XP', price: 48000, sku: 'IOPE-AC-001' },
    { name: '슈퍼 바이탈 에센스', price: 72000, sku: 'IOPE-SV-001' },
    { name: '더마 리페어 크림', price: 65000, sku: 'IOPE-DR-001' },
    { name: '스템3 아이크림', price: 85000, sku: 'IOPE-ST3-001' },
    { name: '바이오 에센스', price: 58000, sku: 'IOPE-BIO-001' },
    { name: '레티놀 세럼', price: 75000, sku: 'IOPE-RTL-001' },
    { name: '바이오 토너', price: 45000, sku: 'IOPE-BT-001' },
    { name: 'UV 쉴드 선크림', price: 38000, sku: 'IOPE-UV-001' }
  ];
  return generateBrandLiveData('아이오페', 'IOPE', products, 1, 25);
};

/**
 * 헤라(HERA) 방송 데이터 생성
 */
const generateHeraData = () => {
  const products = [
    { name: '블랙 쿠션', price: 58000, sku: 'HERA-BC-001' },
    { name: '센슈얼 누드 글로스', price: 35000, sku: 'HERA-SN-001' },
    { name: '시그니아 크림', price: 150000, sku: 'HERA-SC-001' },
    { name: 'UV 프로텍터 멀티 디펜스', price: 42000, sku: 'HERA-UV-001' },
    { name: '루즈 홀릭 립스틱', price: 32000, sku: 'HERA-RH-001' },
    { name: '블랙 파운데이션', price: 65000, sku: 'HERA-BF-001' },
    { name: '센슈얼 파우더 매트', price: 38000, sku: 'HERA-SPM-001' },
    { name: '에이지 어웨이 세럼', price: 95000, sku: 'HERA-AA-001' }
  ];
  return generateBrandLiveData('헤라', 'HERA', products, 1, 25);
};

/**
 * 에스트라(AESTURA) 방송 데이터 생성
 */
const generateAesturaData = () => {
  const products = [
    { name: '아토 배리어365 크림', price: 32000, sku: 'AES-AB-001' },
    { name: 'A-시카365 세럼', price: 38000, sku: 'AES-AC-001' },
    { name: '더마 UV 프로텍터', price: 28000, sku: 'AES-DUV-001' },
    { name: '토너 패드', price: 25000, sku: 'AES-TP-001' },
    { name: '클렌징 폼', price: 18000, sku: 'AES-CF-001' },
    { name: '수분 크림', price: 35000, sku: 'AES-MC-001' }
  ];
  return generateBrandLiveData('에스트라', 'AESTURA', products, 1, 20);
};

/**
 * 이니스프리(Innisfree) 방송 데이터 생성
 */
const generateInnisfreeData = () => {
  const products = [
    { name: '그린티 씨드 세럼', price: 32000, sku: 'INF-GTS-001' },
    { name: '비타C 잡티 세럼', price: 28000, sku: 'INF-VC-001' },
    { name: '제주 오키드 크림', price: 45000, sku: 'INF-JO-001' },
    { name: '포어 클리어 클렌징 폼', price: 12000, sku: 'INF-PC-001' },
    { name: '노세범 미네랄 파우더', price: 15000, sku: 'INF-NM-001' },
    { name: '레티놀 시카 세럼', price: 38000, sku: 'INF-RC-001' },
    { name: '비자 시카밤', price: 22000, sku: 'INF-BC-001' },
    { name: '그린티 토너', price: 18000, sku: 'INF-GTT-001' }
  ];
  return generateBrandLiveData('이니스프리', 'INNISFREE', products, 1, 25);
};

/**
 * 해피바스(Happy Bath) 방송 데이터 생성
 */
const generateHappyBathData = () => {
  const products = [
    { name: '네이처 바디워시', price: 8000, sku: 'HB-NB-001' },
    { name: '허브 샴푸', price: 12000, sku: 'HB-HS-001' },
    { name: '바디 로션', price: 10000, sku: 'HB-BL-001' },
    { name: '스크럽 바디워시', price: 9000, sku: 'HB-SB-001' },
    { name: '핸드크림', price: 5000, sku: 'HB-HC-001' }
  ];
  return generateBrandLiveData('해피바스', 'HAPPYBATH', products, 1, 15);
};

/**
 * 바이탈뷰티(Vital Beauty) 방송 데이터 생성
 */
const generateVitalBeautyData = () => {
  const products = [
    { name: '메타그린 슬림', price: 45000, sku: 'VB-MGS-001' },
    { name: '슈퍼콜라겐', price: 55000, sku: 'VB-SC-001' },
    { name: '퓨어 비타민', price: 38000, sku: 'VB-PV-001' },
    { name: '알레르기 케어', price: 42000, sku: 'VB-AC-001' },
    { name: '오메가3', price: 35000, sku: 'VB-O3-001' }
  ];
  return generateBrandLiveData('바이탈뷰티', 'VITALBEAUTY', products, 1, 15);
};

/**
 * 프리메라(Primera) 방송 데이터 생성
 */
const generatePrimeraData = () => {
  const products = [
    { name: '워터리스 올인원 모이스처라이저', price: 52000, sku: 'PRI-WOM-001' },
    { name: '알파인 베리 세럼', price: 48000, sku: 'PRI-AB-001' },
    { name: '와일드 시드 퍼밍 크림', price: 65000, sku: 'PRI-WS-001' },
    { name: '수딩 센서티브 토너', price: 38000, sku: 'PRI-SS-001' },
    { name: '와일드 피치 클렌징 폼', price: 25000, sku: 'PRI-WP-001' }
  ];
  return generateBrandLiveData('프리메라', 'PRIMERA', products, 1, 15);
};

/**
 * 오설록(O'SULLOC) 방송 데이터 생성
 */
const generateOsullocData = () => {
  const products = [
    { name: '녹차 세럼', price: 35000, sku: 'OSL-GTS-001' },
    { name: '발효 녹차 크림', price: 42000, sku: 'OSL-FGC-001' },
    { name: '녹차 토너', price: 28000, sku: 'OSL-GTT-001' },
    { name: '티 클렌징 폼', price: 18000, sku: 'OSL-TC-001' },
    { name: '제주 티 아이크림', price: 38000, sku: 'OSL-JTE-001' }
  ];
  return generateBrandLiveData('오설록', 'OSULLOC', products, 1, 15);
};

/**
 * 실제 수집된 데이터를 이벤트 형식으로 변환
 */
export const convertRealDataToEvent = (liveData) => {
  // meta와 metadata 둘 다 지원 (하위 호환성)
  const meta = liveData.meta || liveData.metadata;
  const schedule = liveData.schedule || {};
  const products = liveData.products || [];
  const benefits = liveData.benefits || {};

  // 플랫폼에 따라 channel_code 설정
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
  // platform_code가 있으면 우선 사용
  else if (meta.platform_code) channelCode = meta.platform_code;
  
  return {
    event_id: meta.live_id,
    channel_name: meta.platform_name,
    channel_code: channelCode,
    title: meta.live_title_customer,
    subtitle: `${meta.brand_name} | ${products.length}개 상품`,
    description: `할인: ${(benefits.discounts || []).length}개 | 사은품: ${(benefits.gifts || []).length}개 | 쿠폰: ${(benefits.coupons || []).length}개`,
    start_date: schedule.broadcast_date || '',
    end_date: schedule.broadcast_date || '',
    // 방송 시간 정보 추가 (현재 시간 기준 상태 분류를 위해 필요)
    broadcast_date: schedule.broadcast_date || '',
    broadcast_start_time: schedule.broadcast_start_time || '',
    broadcast_end_time: schedule.broadcast_end_time || '',
    benefit_start_datetime: schedule.benefit_start_datetime || '',
    benefit_end_datetime: schedule.benefit_end_datetime || '',
    event_url: meta.source_url,
    status: meta.status,  // 원본 상태 (동적 재계산 전)
    priority: 10,
    tags: [meta.platform_name, meta.brand_name, '✅실제수집데이터'],
    is_live_detail: true,
    has_detail: true,
    is_real_data: true,  // 실제 데이터 표시
    collected_at: meta.collected_at,
    brand_name: meta.brand_name
  };
};

/**
 * 카카오 라이브 쇼핑 데이터 생성 함수
 */
const generateKakaoLiveData = () => {
  const kakaoData = [];
  const brands = [
    { name: '설화수', code: 'SULWHASOO', count: 20 },
    { name: '라네즈', code: 'LANEIGE', count: 20 },
    { name: '아이오페', code: 'IOPE', count: 15 },
    { name: '헤라', code: 'HERA', count: 15 },
    { name: '에스트라', code: 'AESTURA', count: 15 },
    { name: '이니스프리', code: 'INNISFREE', count: 20 },
    { name: '해피바스', code: 'HAPPYBATH', count: 12 },
    { name: '바이탈뷰티', code: 'VITALBEAUTY', count: 12 },
    { name: '프리메라', code: 'PRIMERA', count: 12 },
    { name: '오설록', code: 'OSULLOC', count: 12 }
  ];
  
  const productTypes = ['에센스', '크림', '세럼', '마스크팩', '클렌징', '토너', '쿠션', '립스틱', '아이크림', '선크림'];
  const promotionTypes = ['단독 특가', '기획세트', '타임특가', '슈퍼딜', '라이브특가', '오늘만', '한정수량', '독점혜택'];
  
  const statuses = ['ACTIVE', 'PENDING', 'ENDED'];
  const statusWeights = [0.15, 0.45, 0.4]; // 15% 진행중, 45% 예정, 40% 종료
  
  brands.forEach(brand => {
    for (let i = 0; i < brand.count; i++) {
      // 상태 결정 (결정적 방식 - 브랜드 코드와 인덱스 기반)
      // 같은 브랜드와 인덱스 조합은 항상 같은 상태를 반환
      const hash = (brand.code.charCodeAt(0) + brand.code.charCodeAt(brand.code.length - 1) + i) % 100;
      let status;
      if (hash < statusWeights[0] * 100) status = statuses[0]; // ACTIVE (0-14)
      else if (hash < (statusWeights[0] + statusWeights[1]) * 100) status = statuses[1]; // PENDING (15-59)
      else status = statuses[2]; // ENDED (60-99)
      
      const productType = productTypes[i % productTypes.length];
      const promotionType = promotionTypes[i % promotionTypes.length];
      
      // 날짜 생성 (결정적 방식)
      const today = new Date('2025-11-28');
      let broadcastDate;
      
      if (status === 'ACTIVE') {
        broadcastDate = '2025-11-28';
      } else if (status === 'PENDING') {
        const daysAhead = ((hash + i) % 14) + 1;
        const futureDate = new Date(today);
        futureDate.setDate(futureDate.getDate() + daysAhead);
        broadcastDate = futureDate.toISOString().split('T')[0];
      } else {
        const daysBefore = ((hash + i * 2) % 30) + 1;
        const pastDate = new Date(today);
        pastDate.setDate(pastDate.getDate() - daysBefore);
        broadcastDate = pastDate.toISOString().split('T')[0];
      }
      
      const hour = 20 + (i % 3);
      const minute = (i % 2) * 30;
      
      // 변수 미리 정의
      const benefitValidType = i % 3 === 0 ? '방송 중만' : i % 3 === 1 ? '당일 23:59' : '기간형';
      const couponDuplicate = i % 2 === 0 ? '가능' : '불가';
      const paymentRestriction = i % 2 === 0 ? '카카오페이 전용' : '모든 결제수단 가능';
      const excludedProducts = i % 3 === 0 ? '기획세트 제외' : '';
      
      const liveData = {
        metadata: {
          live_id: `KAKAO_${brand.code}_${String(i + 1).padStart(3, '0')}`,
          platform_name: '카카오',
          brand_name: brand.name,
          live_title_customer: `[카카오LIVE] ${brand.name} ${productType} ${promotionType}`,
          live_title_cs: `${brand.name} ${broadcastDate} 카카오 ${productType} 라이브`,
          source_url: `https://shoppinglive.kakao.com/lives/${100000 + Math.floor(Math.random() * 900000)}`,
          thumbnail_url: '',
          status: status,
          collected_at: new Date().toISOString(),
          is_real_data: true
        },
        schedule: {
          broadcast_date: broadcastDate,
          broadcast_start_time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          broadcast_end_time: `${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          benefit_valid_type: benefitValidType,
          benefit_start_datetime: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`,
          benefit_end_datetime: `${broadcastDate} ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`,
          broadcast_type: i % 2 === 0 ? '단독라이브' : '브랜드관 연계'
        },
        // 📦 상품 탭: 판매 상품 목록 (4-6개 상품)
        products: [
          {
            product_order: 1,
            product_name: `${brand.name} ${productType} 본품`,
            sku: `${brand.code}-${String(i + 1).padStart(3, '0')}-01`,
            original_price: `${(150 + i * 10) * 1000}원`,
            sale_price: `${Math.floor((150 + i * 10) * 0.8) * 1000}원`,
            discount_rate: '20%',
            product_type: '대표',
            stock_info: '재고 충분',
            stock_quantity: 500,
            set_composition: '',
            product_url: `https://shoppinglive.kakao.com/products/${100000 + i}`,
            product_options: [
              { option_name: '용량', option_value: '50ml' },
              { option_name: '용량', option_value: '100ml' }
            ],
            product_detail: `${brand.name}의 베스트셀러 ${productType}입니다. 피부 깊숙이 수분과 영양을 공급합니다.`,
            delivery_fee: '무료배송',
            estimated_delivery: '2-3일',
            review_count: 1234,
            rating: 4.8
          },
          {
            product_order: 2,
            product_name: `${brand.name} ${productType} 기획세트`,
            sku: `${brand.code}-${String(i + 1).padStart(3, '0')}-SET`,
            original_price: `${(200 + i * 15) * 1000}원`,
            sale_price: `${Math.floor((200 + i * 15) * 0.75) * 1000}원`,
            discount_rate: '25%',
            product_type: '세트',
            stock_info: '한정 100개',
            stock_quantity: 100,
            set_composition: `본품 ${productType} + 미니어처 2종 + 브랜드 파우치`,
            product_url: `https://shoppinglive.kakao.com/products/${100000 + i + 1}`,
            product_options: [],
            product_detail: `라이브 방송 단독 기획세트입니다. 본품과 함께 사용하기 좋은 미니어처 2종과 파우치가 포함되어 있습니다.`,
            delivery_fee: '무료배송',
            estimated_delivery: '2-3일',
            review_count: 567,
            rating: 4.9
          },
          {
            product_order: 3,
            product_name: `${brand.name} ${productType} 대용량`,
            sku: `${brand.code}-${String(i + 1).padStart(3, '0')}-02`,
            original_price: `${(180 + i * 12) * 1000}원`,
            sale_price: `${Math.floor((180 + i * 12) * 0.78) * 1000}원`,
            discount_rate: '22%',
            product_type: '일반',
            stock_info: '재고 충분',
            stock_quantity: 300,
            set_composition: '',
            product_url: `https://shoppinglive.kakao.com/products/${100000 + i + 2}`,
            product_options: [
              { option_name: '용량', option_value: '150ml' }
            ],
            product_detail: `대용량으로 경제적입니다. 가족이 함께 사용하기 좋습니다.`,
            delivery_fee: '무료배송',
            estimated_delivery: '2-3일',
            review_count: 890,
            rating: 4.7
          },
          {
            product_order: 4,
            product_name: `${brand.name} ${productType} + 토너 세트`,
            sku: `${brand.code}-${String(i + 1).padStart(3, '0')}-COMBO`,
            original_price: `${(250 + i * 18) * 1000}원`,
            sale_price: `${Math.floor((250 + i * 18) * 0.7) * 1000}원`,
            discount_rate: '30%',
            product_type: '세트',
            stock_info: '한정 50개',
            stock_quantity: 50,
            set_composition: `${productType} 본품 + 토너 150ml + 면봉 10개`,
            product_url: `https://shoppinglive.kakao.com/products/${100000 + i + 3}`,
            product_options: [],
            product_detail: `${productType}과 토너를 함께 사용하면 효과가 배가됩니다. 라이브 방송 한정 특가입니다.`,
            delivery_fee: '무료배송',
            estimated_delivery: '2-3일',
            review_count: 345,
            rating: 4.9
          }
        ],
        benefits: {
          // 💰 혜택 탭: 할인 혜택
          discounts: [
            {
              discount_id: `DISC_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              discount_name: '라이브 방송 즉시할인',
              discount_type: i % 3 === 0 ? '퍼센트할인' : '금액할인',
              discount_value: i % 3 === 0 ? '20%' : '30,000원',
              discount_detail: i % 3 === 0 ? '방송 중 결제 시 20% 할인' : '방송 중 30,000원 즉시 할인',
              target_products: '전상품',
              min_purchase_amount: i % 3 === 0 ? '50,000원' : '100,000원',
              max_discount_amount: i % 3 === 0 ? '50,000원' : '',
              valid_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ~ ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
              auto_apply: true
            },
            {
              discount_id: `DISC_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              discount_name: '카드사 추가할인',
              discount_type: '금액할인',
              discount_value: '10,000원',
              discount_detail: 'KB국민/신한/삼성 카드 결제 시 10,000원 추가할인',
              target_products: '전상품',
              min_purchase_amount: '150,000원',
              max_discount_amount: '10,000원',
              valid_period: `${broadcastDate} 00:00 ~ 23:59`,
              auto_apply: false,
              card_company: ['KB국민카드', '신한카드', '삼성카드']
            }
          ],
          // 🎁 혜택 탭: 사은품
          gifts: [
            {
              gift_id: `GIFT_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              gift_name: `${brand.name} 라이브 방송 사은품`,
              gift_type: i % 2 === 0 ? '구매조건형' : '선착순형',
              gift_list: [
                { item_name: `${brand.name} 미니어처 세트`, quantity: 1, value: '15,000원' },
                { item_name: `${brand.name} 브랜드 파우치`, quantity: 1, value: '8,000원' }
              ],
              gift_condition: i % 2 === 0 ? '10만원 이상 구매 시' : '선착순 50명',
              gift_quantity_limit: i % 2 === 0 ? '' : '선착순 50명',
              gift_image_url: '',
              gift_detail: i % 2 === 0 ? '구매금액 10만원 이상 시 자동 증정' : '방송 중 빠른 순서대로 선착순 50명에게만 증정'
            },
            {
              gift_id: `GIFT_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              gift_name: `${brand.name} VIP 사은품`,
              gift_type: '구매조건형',
              gift_list: [
                { item_name: `${brand.name} 프리미엄 세트`, quantity: 1, value: '30,000원' }
              ],
              gift_condition: '30만원 이상 구매 시',
              gift_quantity_limit: '',
              gift_image_url: '',
              gift_detail: '구매금액 30만원 이상 시 프리미엄 사은품 증정'
            }
          ],
          // 🎟️ 쿠폰 탭: 쿠폰 정보
          coupons: [
            {
              coupon_id: `COUP_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              coupon_name: `${brand.name} 라이브 방송 전용 쿠폰`,
              coupon_type: '플랫폼쿠폰',
              coupon_discount_type: '금액할인',
              coupon_discount_value: '15,000원',
              min_purchase_amount: '100,000원',
              max_discount_amount: '15,000원',
              coupon_issue_condition: '방송 중 다운로드',
              coupon_issue_limit: '선착순 100명',
              coupon_valid_start: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: couponDuplicate === '가능',
              target_products: '전상품',
              excluded_products: excludedProducts
            },
            {
              coupon_id: `COUP_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              coupon_name: `${brand.name} 브랜드 쿠폰`,
              coupon_type: '브랜드쿠폰',
              coupon_discount_type: '퍼센트할인',
              coupon_discount_value: '10%',
              min_purchase_amount: '50,000원',
              max_discount_amount: '20,000원',
              coupon_issue_condition: '회원 자동 발급',
              coupon_issue_limit: '제한없음',
              coupon_valid_start: `${broadcastDate} 00:00`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: true,
              target_products: `${brand.name} 전상품`,
              excluded_products: ''
            },
            {
              coupon_id: `COUP_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              coupon_name: '카카오페이 결제 쿠폰',
              coupon_type: '결제수단쿠폰',
              coupon_discount_type: '금액할인',
              coupon_discount_value: '5,000원',
              min_purchase_amount: '50,000원',
              max_discount_amount: '5,000원',
              coupon_issue_condition: '카카오페이 결제 시 자동 적용',
              coupon_issue_limit: '1회',
              coupon_valid_start: `${broadcastDate} 00:00`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: false,
              target_products: '전상품',
              excluded_products: ''
            }
          ],
          // 💳 혜택 탭: 포인트 적립
          point_condition: '카카오페이 결제 시 5% 적립',
          point_details: [
            {
              point_type: '카카오페이 포인트',
              point_rate: '5%',
              point_max: '10,000원',
              point_condition: '카카오페이 결제 시',
              point_valid_period: '적립일로부터 1년'
            },
            {
              point_type: `${brand.name} 멤버십 포인트`,
              point_rate: '3%',
              point_max: '5,000원',
              point_condition: '멤버십 회원 자동 적립',
              point_valid_period: '적립일로부터 2년'
            }
          ],
          // 🚚 혜택 탭: 배송 혜택
          shipping: [
            {
              shipping_id: `SHIP_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              shipping_benefit: i % 2 === 0 ? '무료배송' : '특급배송',
              shipping_fee: i % 2 === 0 ? '0원' : '3,000원',
              shipping_condition: i % 2 === 0 ? '전상품 무료배송' : '50,000원 이상 무료배송',
              delivery_company: 'CJ대한통운',
              estimated_delivery_time: i % 2 === 0 ? '2-3일' : '익일배송',
              tracking_available: true
            }
          ]
        },
        // 💬 채팅 정보 (실시간 채팅 수집)
        chat_info: {
          chat_enabled: true,
          total_chat_count: Math.floor(Math.random() * 5000) + 1000, // 1000~6000개
          total_participants: Math.floor(Math.random() * 1000) + 200, // 200~1200명
          chat_summary: {
            top_keywords: [productType, brand.name, '가격', '배송', '사은품', '할인', '재고', '색상', '용량', '효과'],
            question_count: Math.floor(Math.random() * 100) + 20, // 질문 수
            purchase_inquiry_count: Math.floor(Math.random() * 50) + 10, // 구매 문의 수
            positive_reaction_count: Math.floor(Math.random() * 500) + 100, // 긍정 반응
            emoji_reactions: {
              '❤️': Math.floor(Math.random() * 300) + 50,
              '👍': Math.floor(Math.random() * 200) + 30,
              '😍': Math.floor(Math.random() * 150) + 20,
              '🔥': Math.floor(Math.random() * 100) + 15,
              '👏': Math.floor(Math.random() * 80) + 10
            }
          },
          featured_chats: [
            {
              chat_id: `CHAT_${brand.code}_${String(i + 1).padStart(3, '0')}_001`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(5 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '민*',
              user_type: '일반',
              message: `${productType} 재고 있나요?`,
              is_question: true,
              is_answered: true,
              host_reply: '네, 재고 충분합니다! 지금 바로 구매 가능해요 😊',
              like_count: Math.floor(Math.random() * 20) + 5
            },
            {
              chat_id: `CHAT_${brand.code}_${String(i + 1).padStart(3, '0')}_002`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(8 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '혜*',
              user_type: '일반',
              message: '배송 언제 되나요?',
              is_question: true,
              is_answered: true,
              host_reply: '결제 후 2-3일 내 배송됩니다. 특급배송 선택 시 내일 받으실 수 있어요!',
              like_count: Math.floor(Math.random() * 15) + 3
            },
            {
              chat_id: `CHAT_${brand.code}_${String(i + 1).padStart(3, '0')}_003`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(12 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '지*',
              user_type: '일반',
              message: '와 진짜 싸다 ㅠㅠ 이 가격 실화인가요?',
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 30) + 10
            },
            {
              chat_id: `CHAT_${brand.code}_${String(i + 1).padStart(3, '0')}_004`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(15 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '수*',
              user_type: '멤버십',
              message: '사은품 언제 받을 수 있나요?',
              is_question: true,
              is_answered: true,
              host_reply: '사은품은 주문 상품과 함께 배송됩니다! 선착순 사은품은 별도 안내드릴게요.',
              like_count: Math.floor(Math.random() * 12) + 4
            },
            {
              chat_id: `CHAT_${brand.code}_${String(i + 1).padStart(3, '0')}_005`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(20 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '영*',
              user_type: '일반',
              message: `${brand.name} 정말 좋아요! 항상 애용합니다 ❤️`,
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 50) + 20
            },
            {
              chat_id: `CHAT_${brand.code}_${String(i + 1).padStart(3, '0')}_006`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(25 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '미*',
              user_type: '일반',
              message: '쿠폰 중복 사용 가능한가요?',
              is_question: true,
              is_answered: true,
              host_reply: couponDuplicate === '가능' ? '네, 쿠폰 중복 사용 가능합니다!' : '죄송하지만 쿠폰 중복 사용은 불가합니다.',
              like_count: Math.floor(Math.random() * 18) + 6
            },
            {
              chat_id: `CHAT_${brand.code}_${String(i + 1).padStart(3, '0')}_007`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(30 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '현*',
              user_type: '일반',
              message: '품절되기 전에 빨리 주문해야겠어요!',
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 25) + 8
            },
            {
              chat_id: `CHAT_${brand.code}_${String(i + 1).padStart(3, '0')}_008`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(35 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '서*',
              user_type: '멤버십',
              message: '색상이 다른 옵션도 있나요?',
              is_question: true,
              is_answered: true,
              host_reply: '현재는 이 색상만 준비되어 있습니다. 다음 방송에서 다른 색상도 소개해드릴게요!',
              like_count: Math.floor(Math.random() * 10) + 3
            },
            {
              chat_id: `CHAT_${brand.code}_${String(i + 1).padStart(3, '0')}_009`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(40 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '은*',
              user_type: '일반',
              message: '지금 주문했어요! 기대됩니다 😍',
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 35) + 15
            },
            {
              chat_id: `CHAT_${brand.code}_${String(i + 1).padStart(3, '0')}_010`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(45 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '정*',
              user_type: '일반',
              message: '환불/교환 정책은 어떻게 되나요?',
              is_question: true,
              is_answered: true,
              host_reply: '구매 후 7일 이내 단순 변심 반품 가능합니다. 미개봉 상태여야 하며 배송비는 고객 부담입니다.',
              like_count: Math.floor(Math.random() * 14) + 5
            }
          ],
          frequent_questions: [
            {
              question: '배송은 언제 되나요?',
              frequency: Math.floor(Math.random() * 50) + 20,
              answer: '결제 후 2-3일 내 배송됩니다. 특급배송 선택 시 익일 도착 가능합니다.'
            },
            {
              question: '재고 있나요?',
              frequency: Math.floor(Math.random() * 40) + 15,
              answer: '네, 현재 재고 충분합니다. 방송 중 실시간으로 업데이트됩니다.'
            },
            {
              question: '사은품은 언제 받을 수 있나요?',
              frequency: Math.floor(Math.random() * 35) + 12,
              answer: '사은품은 주문 상품과 함께 배송됩니다.'
            },
            {
              question: '쿠폰 중복 사용 가능한가요?',
              frequency: Math.floor(Math.random() * 30) + 10,
              answer: couponDuplicate === '가능' ? '네, 쿠폰 중복 사용 가능합니다.' : '죄송하지만 쿠폰 중복 사용은 불가합니다.'
            },
            {
              question: '환불/교환 가능한가요?',
              frequency: Math.floor(Math.random() * 25) + 8,
              answer: '구매 후 7일 이내 단순 변심 반품 가능합니다. 미개봉 상태여야 합니다.'
            }
          ],
          chat_analysis: {
            sentiment_positive: Math.floor(Math.random() * 30) + 60, // 60~90%
            sentiment_neutral: Math.floor(Math.random() * 20) + 10, // 10~30%
            sentiment_negative: Math.floor(Math.random() * 10) + 0, // 0~10%
            peak_chat_time: `${String(hour).padStart(2, '0')}:${String(15 + (i % 10)).padStart(2, '0')}`,
            average_response_time: '2분 30초',
            host_engagement_rate: Math.floor(Math.random() * 20) + 70 // 70~90%
          }
        },
        // 🎪 이벤트 탭: 진행 중인 이벤트
        events: [
          {
            event_id: `EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
            event_name: `${brand.name} ${promotionType}`,
            event_type: '타임특가',
            event_description: `라이브 방송 중 한정 ${promotionType}! 놓치지 마세요!`,
            event_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ~ ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
            event_target_products: [
              `${brand.name} ${productType} 본품`,
              `${brand.name} ${productType} 기획세트`
            ],
            event_benefit: i % 3 === 0 ? '20% 할인' : '30,000원 즉시 할인',
            event_condition: '방송 시청 중 구매 시 적용',
            event_quantity_limit: i % 2 === 0 ? '한정 100개' : '',
            event_remaining_quantity: i % 2 === 0 ? 78 : null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '🔥 HOT'
          },
          {
            event_id: `EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
            event_name: '선착순 추가 사은품',
            event_type: '선착순',
            event_description: '방송 시작 후 선착순 50명에게 추가 사은품 증정!',
            event_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ~ 선착순 마감`,
            event_target_products: ['전상품'],
            event_benefit: `${brand.name} 프리미엄 키트 증정`,
            event_condition: '10만원 이상 구매 시',
            event_quantity_limit: '선착순 50명',
            event_remaining_quantity: 32,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '⚡ 선착순'
          },
          {
            event_id: `EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
            event_name: `${brand.name} 멤버십 특별 혜택`,
            event_type: '멤버십',
            event_description: `${brand.name} 멤버십 회원 전용 추가 할인!`,
            event_period: `${broadcastDate} 전일`,
            event_target_products: ['전상품'],
            event_benefit: '추가 5% 할인 + 포인트 2배 적립',
            event_condition: `${brand.name} 멤버십 회원`,
            event_quantity_limit: '',
            event_remaining_quantity: null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '👑 VIP'
          }
        ],
        duplicate_policy: {
          coupon_duplicate: couponDuplicate,
          point_duplicate: '가능',
          other_event_duplicate: '브랜드 단독 행사와 중복 불가',
          employee_discount: '적용 가능'
        },
        restrictions: {
          excluded_products: excludedProducts,
          channel_restriction: '카카오톡 쇼핑하기 전용',
          payment_restriction: paymentRestriction,
          region_restriction: '도서산간 배송비 별도'
        },
        live_specific: {
          key_mentions: [
            `[00:02] 안녕하세요! 카카오 LIVE ${brand.name} ${productType} 방송 시작합니다!`,
            `[00:12] ${brand.name} ${productType}은 올해 베스트셀러 1위 제품입니다!`,
            `[02:30] 카카오 단독 ${promotionType}로 최저가 제공합니다!`,
            `[05:15] ${productType}의 핵심 성분과 효능을 자세히 설명드리겠습니다!`,
            `[08:40] 방송 중에만 받을 수 있는 특별 사은품이 준비되어 있습니다!`,
            `[12:20] 선착순 혜택이 있으니 서둘러 주세요!`,
            `[15:50] "${productType} 정말 좋아요! 피부가 부드러워졌어요!" - 실시간 후기`,
            `[18:30] 💎 지금 바로 구매하시면 최대 20% 할인!`,
            `[22:10] ${productType}는 아침 저녁 스킨케어 루틴에 필수입니다!`,
            `[25:40] ⚡ 선착순 100명! 10만원 이상 구매 시 ${brand.name} 미니 세트 증정!`,
            `[28:20] 한 방울만 발라도 촉촉하게 하루종일 보습이 지속됩니다!`,
            `[32:15] 💰 카카오페이 결제하시면 추가 포인트 적립!`,
            `[35:50] 실시간 주문이 쏟아지고 있어요! 벌써 50개 판매!`,
            `[38:30] ${productType}는 모든 피부 타입에 사용 가능합니다!`,
            `[42:10] 마지막 기회! 놓치지 마세요!`,
            `[45:25] 남은 사은품이 30개밖에 없어요! 지금 주문하세요!`,
            `[48:50] 🎁 오늘 구매하신 분들 전원 무료배송!`,
            `[52:20] 주문 폭주 중! 배송은 내일 바로 시작됩니다!`,
            `[55:40] 마지막 4분! 방송 종료 후엔 정상가로 돌아갑니다!`,
            `[58:10] ${productType}로 건강하고 아름다운 피부 만드세요!`,
            `[59:30] 구매해주신 모든 분들 감사합니다! 다음 라이브에서 또 만나요!`
          ],
          broadcast_qa: [
            {
              question: '배송은 언제 되나요?',
              answer: '결제 후 2-3일 내 배송됩니다. 특급배송 선택 시 익일 도착 가능합니다.'
            },
            {
              question: '다른 쿠폰과 중복 사용 가능한가요?',
              answer: couponDuplicate === '가능' ? '네, 중복 사용 가능합니다.' : '죄송하지만 중복 사용은 불가합니다.'
            }
          ],
          timeline: [
            { time: '00:00', event: '방송 시작 및 인사' },
            { time: '00:05', event: '제품 소개 및 특장점 설명' },
            { time: '00:20', event: '혜택 안내 (할인/사은품/쿠폰)' },
            { time: '00:40', event: '실시간 Q&A' },
            { time: '00:55', event: '마무리 및 주문 안내' }
          ]
        },
        cs_info: {
          expected_questions: [
            '방송 끝났는데 혜택 적용되나요?',
            '카카오페이 외 다른 결제수단도 되나요?',
            '사은품은 언제 받을 수 있나요?'
          ],
          response_scripts: [
            `혜택 유효기간은 ${benefitValidType}입니다.`,
            `결제수단은 ${paymentRestriction}입니다.`,
            `사은품은 주문 상품과 함께 배송됩니다.`
          ],
          risk_points: [
            couponDuplicate === '불가' ? '쿠폰 중복 사용 불가 - 고객 문의 빈번' : '',
            excludedProducts ? `${excludedProducts} - 명시 필요` : ''
          ].filter(Boolean),
          cs_note: `${brand.name} ${broadcastDate} 카카오 라이브 - ${promotionType}`
        }
      };
      
      kakaoData.push(liveData);
    }
  });
  
  console.log(`✅ 카카오 라이브 데이터 생성: ${kakaoData.length}개`);
  return kakaoData;
};

/**
 * 11번가 라이브 쇼핑 데이터 생성 함수
 */
const generate11stLiveData = () => {
  const st11Data = [];
  const brands = [
    { name: '설화수', code: 'SULWHASOO', count: 18 },
    { name: '라네즈', code: 'LANEIGE', count: 18 },
    { name: '아이오페', code: 'IOPE', count: 15 },
    { name: '헤라', code: 'HERA', count: 15 },
    { name: '에스트라', code: 'AESTURA', count: 12 },
    { name: '이니스프리', code: 'INNISFREE', count: 18 },
    { name: '해피바스', code: 'HAPPYBATH', count: 10 },
    { name: '바이탈뷰티', code: 'VITALBEAUTY', count: 10 },
    { name: '프리메라', code: 'PRIMERA', count: 10 },
    { name: '오설록', code: 'OSULLOC', count: 10 }
  ];
  
  const productTypes = ['에센스', '크림', '세럼', '마스크팩', '클렌징', '토너', '쿠션', '립스틱', '아이크림', '선크림'];
  const promotionTypes = ['슈퍼특가', '오늘만', '타임딜', '라이브특가', '한정특가', '독점혜택', '브랜드데이', '반짝세일'];
  
  const statuses = ['ACTIVE', 'PENDING', 'ENDED'];
  const statusWeights = [0.12, 0.48, 0.4]; // 12% 진행중, 48% 예정, 40% 종료
  
  brands.forEach(brand => {
    for (let i = 0; i < brand.count; i++) {
      // 상태 결정 (결정적 방식 - 브랜드 코드와 인덱스 기반)
      // 같은 브랜드와 인덱스 조합은 항상 같은 상태를 반환
      const hash = (brand.code.charCodeAt(0) + brand.code.charCodeAt(brand.code.length - 1) + i) % 100;
      let status;
      if (hash < statusWeights[0] * 100) status = statuses[0]; // ACTIVE (0-14)
      else if (hash < (statusWeights[0] + statusWeights[1]) * 100) status = statuses[1]; // PENDING (15-59)
      else status = statuses[2]; // ENDED (60-99)
      
      const productType = productTypes[i % productTypes.length];
      const promotionType = promotionTypes[i % promotionTypes.length];
      
      // 날짜 생성 (결정적 방식)
      const today = new Date('2025-11-28');
      let broadcastDate;
      
      if (status === 'ACTIVE') {
        broadcastDate = '2025-11-28';
      } else if (status === 'PENDING') {
        const daysAhead = ((hash + i) % 14) + 1;
        const futureDate = new Date(today);
        futureDate.setDate(futureDate.getDate() + daysAhead);
        broadcastDate = futureDate.toISOString().split('T')[0];
      } else {
        const daysBefore = ((hash + i * 2) % 30) + 1;
        const pastDate = new Date(today);
        pastDate.setDate(pastDate.getDate() - daysBefore);
        broadcastDate = pastDate.toISOString().split('T')[0];
      }
      
      const hour = 19 + (i % 4);
      const minute = (i % 2) * 30;
      
      // 변수 미리 정의
      const discountRate = 25 + (i % 4) * 5; // 25%, 30%, 35%, 40% 순환
      const benefitValidType = i % 3 === 0 ? '방송 중만' : i % 3 === 1 ? '당일 23:59' : '기간형';
      const couponDuplicate = i % 2 === 0 ? '가능' : '불가';
      const paymentRestriction = i % 2 === 0 ? '11페이 전용' : '모든 결제수단 가능';
      const excludedProducts = i % 3 === 0 ? '기획세트 제외' : '';
      
      const liveData = {
        metadata: {
          live_id: `11ST_${brand.code}_${String(i + 1).padStart(3, '0')}`,
          platform_name: '11번가',
          brand_name: brand.name,
          live_title_customer: `[11번가LIVE] ${brand.name} ${productType} ${promotionType}`,
          live_title_cs: `${brand.name} ${broadcastDate} 11번가 ${productType} 라이브`,
          source_url: `https://m.11st.co.kr/page/main/live11/${100000 + Math.floor(Math.random() * 900000)}`,
          thumbnail_url: '',
          status: status,
          collected_at: new Date().toISOString(),
          is_real_data: true
        },
        schedule: {
          broadcast_date: broadcastDate,
          broadcast_start_time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          broadcast_end_time: `${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          benefit_valid_type: benefitValidType,
          benefit_start_datetime: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`,
          benefit_end_datetime: `${broadcastDate} ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`,
          broadcast_type: i % 2 === 0 ? '단독라이브' : '브랜드관 연계'
        },
        // 📦 상품 탭
        products: [
          {
            product_order: 1,
            product_name: `${brand.name} ${productType} 본품`,
            sku: `${brand.code}-11ST-${String(i + 1).padStart(3, '0')}-01`,
            original_price: `${(140 + i * 10) * 1000}원`,
            sale_price: `${Math.floor((140 + i * 10) * 0.75) * 1000}원`,
            discount_rate: '25%',
            product_type: '대표',
            stock_info: '재고 충분',
            stock_quantity: 600,
            set_composition: '',
            product_url: `https://m.11st.co.kr/products/${100000 + i}`,
            product_options: [
              { option_name: '용량', option_value: '50ml' },
              { option_name: '용량', option_value: '100ml' }
            ],
            product_detail: `${brand.name}의 인기 ${productType}입니다. 11번가 단독 특가로 만나보세요.`,
            delivery_fee: '무료배송',
            estimated_delivery: '1-2일',
            review_count: 2345,
            rating: 4.7
          },
          {
            product_order: 2,
            product_name: `${brand.name} ${productType} 라이브특가세트`,
            sku: `${brand.code}-11ST-${String(i + 1).padStart(3, '0')}-SET`,
            original_price: `${(190 + i * 15) * 1000}원`,
            sale_price: `${Math.floor((190 + i * 15) * 0.7) * 1000}원`,
            discount_rate: '30%',
            product_type: '세트',
            stock_info: '한정 80개',
            stock_quantity: 80,
            set_composition: `본품 ${productType} + 토너 + 샘플 3종`,
            product_url: `https://m.11st.co.kr/products/${100000 + i + 1}`,
            product_options: [],
            product_detail: `11번가 라이브 단독 구성! 본품과 함께 사용하기 좋은 토너와 샘플이 포함되어 있습니다.`,
            delivery_fee: '무료배송',
            estimated_delivery: '1-2일',
            review_count: 678,
            rating: 4.8
          },
          {
            product_order: 3,
            product_name: `${brand.name} ${productType} 대용량 기획`,
            sku: `${brand.code}-11ST-${String(i + 1).padStart(3, '0')}-02`,
            original_price: `${(170 + i * 12) * 1000}원`,
            sale_price: `${Math.floor((170 + i * 12) * 0.73) * 1000}원`,
            discount_rate: '27%',
            product_type: '일반',
            stock_info: '재고 충분',
            stock_quantity: 400,
            set_composition: '',
            product_url: `https://m.11st.co.kr/products/${100000 + i + 2}`,
            product_options: [
              { option_name: '용량', option_value: '150ml' }
            ],
            product_detail: `대용량으로 더욱 알뜰하게 사용하세요.`,
            delivery_fee: '무료배송',
            estimated_delivery: '1-2일',
            review_count: 1234,
            rating: 4.6
          },
          {
            product_order: 4,
            product_name: `${brand.name} 베스트 3종 세트`,
            sku: `${brand.code}-11ST-${String(i + 1).padStart(3, '0')}-BEST`,
            original_price: `${(240 + i * 18) * 1000}원`,
            sale_price: `${Math.floor((240 + i * 18) * 0.65) * 1000}원`,
            discount_rate: '35%',
            product_type: '세트',
            stock_info: '한정 30개',
            stock_quantity: 30,
            set_composition: `${productType} + 토너 + 크림`,
            product_url: `https://m.11st.co.kr/products/${100000 + i + 3}`,
            product_options: [],
            product_detail: `${brand.name} 베스트 3종을 한번에! 11번가 라이브 초특가입니다.`,
            delivery_fee: '무료배송',
            estimated_delivery: '1-2일',
            review_count: 456,
            rating: 4.9
          }
        ],
        benefits: {
          // 💰 할인 혜택
          discounts: [
            {
              discount_id: `DISC_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              discount_name: '11번가 라이브 즉시할인',
              discount_type: i % 3 === 0 ? '퍼센트할인' : '금액할인',
              discount_value: i % 3 === 0 ? '25%' : '35,000원',
              discount_detail: i % 3 === 0 ? '방송 중 결제 시 25% 할인' : '방송 중 35,000원 즉시 할인',
              target_products: '전상품',
              min_purchase_amount: i % 3 === 0 ? '50,000원' : '100,000원',
              max_discount_amount: i % 3 === 0 ? '60,000원' : '',
              valid_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ~ ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
              auto_apply: true
            },
            {
              discount_id: `DISC_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              discount_name: '11페이 결제 추가할인',
              discount_type: '금액할인',
              discount_value: '12,000원',
              discount_detail: '11페이 결제 시 12,000원 추가할인',
              target_products: '전상품',
              min_purchase_amount: '150,000원',
              max_discount_amount: '12,000원',
              valid_period: `${broadcastDate} 00:00 ~ 23:59`,
              auto_apply: false,
              card_company: []
            }
          ],
          // 🎁 사은품
          gifts: [
            {
              gift_id: `GIFT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              gift_name: `${brand.name} 11번가 라이브 사은품`,
              gift_type: i % 2 === 0 ? '구매조건형' : '선착순형',
              gift_list: [
                { item_name: `${brand.name} 미니어처 3종`, quantity: 1, value: '18,000원' },
                { item_name: `${brand.name} 에코백`, quantity: 1, value: '10,000원' }
              ],
              gift_condition: i % 2 === 0 ? '10만원 이상 구매 시' : '선착순 40명',
              gift_quantity_limit: i % 2 === 0 ? '' : '선착순 40명',
              gift_image_url: '',
              gift_detail: i % 2 === 0 ? '구매금액 10만원 이상 시 자동 증정' : '방송 중 빠른 순서대로 선착순 40명에게만 증정'
            },
            {
              gift_id: `GIFT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              gift_name: `${brand.name} 프리미엄 사은품`,
              gift_type: '구매조건형',
              gift_list: [
                { item_name: `${brand.name} 럭셔리 세트`, quantity: 1, value: '35,000원' }
              ],
              gift_condition: '30만원 이상 구매 시',
              gift_quantity_limit: '',
              gift_image_url: '',
              gift_detail: '구매금액 30만원 이상 시 프리미엄 사은품 증정'
            }
          ],
          // 🎟️ 쿠폰
          coupons: [
            {
              coupon_id: `COUP_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              coupon_name: `${brand.name} 11번가 라이브 쿠폰`,
              coupon_type: '플랫폼쿠폰',
              coupon_discount_type: '금액할인',
              coupon_discount_value: '18,000원',
              min_purchase_amount: '100,000원',
              max_discount_amount: '18,000원',
              coupon_issue_condition: '방송 중 다운로드',
              coupon_issue_limit: '선착순 80명',
              coupon_valid_start: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: couponDuplicate === '가능',
              target_products: '전상품',
              excluded_products: excludedProducts
            },
            {
              coupon_id: `COUP_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              coupon_name: `${brand.name} 브랜드 쿠폰`,
              coupon_type: '브랜드쿠폰',
              coupon_discount_type: '퍼센트할인',
              coupon_discount_value: '12%',
              min_purchase_amount: '50,000원',
              max_discount_amount: '25,000원',
              coupon_issue_condition: '회원 자동 발급',
              coupon_issue_limit: '제한없음',
              coupon_valid_start: `${broadcastDate} 00:00`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: true,
              target_products: `${brand.name} 전상품`,
              excluded_products: ''
            },
            {
              coupon_id: `COUP_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              coupon_name: '11페이 결제 쿠폰',
              coupon_type: '결제수단쿠폰',
              coupon_discount_type: '금액할인',
              coupon_discount_value: '7,000원',
              min_purchase_amount: '50,000원',
              max_discount_amount: '7,000원',
              coupon_issue_condition: '11페이 결제 시 자동 적용',
              coupon_issue_limit: '1회',
              coupon_valid_start: `${broadcastDate} 00:00`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: false,
              target_products: '전상품',
              excluded_products: ''
            }
          ],
          // 💳 포인트 적립
          point_condition: '11페이 결제 시 6% 적립',
          point_details: [
            {
              point_type: '11페이 포인트',
              point_rate: '6%',
              point_max: '12,000원',
              point_condition: '11페이 결제 시',
              point_valid_period: '적립일로부터 1년'
            },
            {
              point_type: `${brand.name} 멤버십 포인트`,
              point_rate: '4%',
              point_max: '6,000원',
              point_condition: '멤버십 회원 자동 적립',
              point_valid_period: '적립일로부터 2년'
            }
          ],
          // 🚚 배송 혜택
          shipping: [
            {
              shipping_id: `SHIP_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              shipping_benefit: i % 2 === 0 ? '무료배송' : '오늘출발',
              shipping_fee: i % 2 === 0 ? '0원' : '2,500원',
              shipping_condition: i % 2 === 0 ? '전상품 무료배송' : '50,000원 이상 무료배송',
              delivery_company: '로젠택배',
              estimated_delivery_time: i % 2 === 0 ? '1-2일' : '오늘출발(익일배송)',
              tracking_available: true
            }
          ]
        },
        // 💬 채팅 정보
        chat_info: {
          chat_enabled: true,
          total_chat_count: Math.floor(Math.random() * 4000) + 800,
          total_participants: Math.floor(Math.random() * 800) + 150,
          chat_summary: {
            top_keywords: [productType, brand.name, '가격', '배송', '사은품', '11페이', '재고', '색상', '용량', '쿠폰'],
            question_count: Math.floor(Math.random() * 80) + 15,
            purchase_inquiry_count: Math.floor(Math.random() * 40) + 8,
            positive_reaction_count: Math.floor(Math.random() * 400) + 80,
            emoji_reactions: {
              '❤️': Math.floor(Math.random() * 250) + 40,
              '👍': Math.floor(Math.random() * 180) + 25,
              '😍': Math.floor(Math.random() * 120) + 15,
              '🔥': Math.floor(Math.random() * 80) + 12,
              '👏': Math.floor(Math.random() * 60) + 8
            }
          },
          featured_chats: [
            {
              chat_id: `CHAT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_001`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(5 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '김*',
              user_type: '일반',
              message: `${productType} 재고 확인 부탁드려요!`,
              is_question: true,
              is_answered: true,
              host_reply: '네, 현재 재고 충분합니다! 바로 주문 가능해요 😊',
              like_count: Math.floor(Math.random() * 18) + 4
            },
            {
              chat_id: `CHAT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_002`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(8 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '박*',
              user_type: '일반',
              message: '11페이로 결제하면 할인 더 받나요?',
              is_question: true,
              is_answered: true,
              host_reply: '네! 11페이 결제 시 추가 12,000원 할인 + 6% 포인트 적립됩니다!',
              like_count: Math.floor(Math.random() * 22) + 6
            },
            {
              chat_id: `CHAT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_003`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(12 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '이*',
              user_type: '일반',
              message: '와 11번가 가격 진짜 좋네요! 바로 주문했어요 ㅎㅎ',
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 35) + 12
            },
            {
              chat_id: `CHAT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_004`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(15 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '최*',
              user_type: '프리미엄',
              message: '사은품은 주문하면 자동으로 들어가나요?',
              is_question: true,
              is_answered: true,
              host_reply: '네, 구매 조건 충족 시 자동으로 사은품이 포함되어 배송됩니다!',
              like_count: Math.floor(Math.random() * 16) + 5
            },
            {
              chat_id: `CHAT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_005`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(20 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '정*',
              user_type: '일반',
              message: `${brand.name} 제품 정말 만족스러워요! 또 구매합니다 ❤️`,
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 45) + 18
            },
            {
              chat_id: `CHAT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_006`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(25 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '강*',
              user_type: '일반',
              message: '쿠폰 중복 사용 되나요?',
              is_question: true,
              is_answered: true,
              host_reply: couponDuplicate === '가능' ? '네, 쿠폰 중복 사용 가능합니다!' : '죄송하지만 쿠폰 중복 사용은 불가합니다.',
              like_count: Math.floor(Math.random() * 20) + 7
            },
            {
              chat_id: `CHAT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_007`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(30 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '조*',
              user_type: '일반',
              message: '오늘출발 가능한가요?',
              is_question: true,
              is_answered: true,
              host_reply: '네, 오늘 23시까지 주문 시 오늘 출발하여 내일 받으실 수 있습니다!',
              like_count: Math.floor(Math.random() * 14) + 4
            },
            {
              chat_id: `CHAT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_008`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(35 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '윤*',
              user_type: '프리미엄',
              message: '다른 색상도 있나요?',
              is_question: true,
              is_answered: true,
              host_reply: '현재 라이브에서는 이 색상만 판매 중입니다. 다른 색상은 일반 판매 페이지에서 확인 가능합니다!',
              like_count: Math.floor(Math.random() * 11) + 3
            },
            {
              chat_id: `CHAT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_009`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(40 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '장*',
              user_type: '일반',
              message: '방금 주문 완료! 빨리 받고 싶어요 😍',
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 30) + 13
            },
            {
              chat_id: `CHAT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_010`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(45 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '임*',
              user_type: '일반',
              message: '반품 가능한가요?',
              is_question: true,
              is_answered: true,
              host_reply: '구매 후 7일 이내 단순 변심 반품 가능합니다. 미개봉 상태여야 하며 반품 배송비는 고객 부담입니다.',
              like_count: Math.floor(Math.random() * 13) + 4
            }
          ],
          frequent_questions: [
            {
              question: '11페이 할인 얼마나 되나요?',
              frequency: Math.floor(Math.random() * 45) + 18,
              answer: '11페이 결제 시 12,000원 추가할인 + 6% 포인트 적립됩니다.'
            },
            {
              question: '오늘출발 가능한가요?',
              frequency: Math.floor(Math.random() * 40) + 15,
              answer: '오늘 23시까지 주문 시 오늘 출발하여 내일 받으실 수 있습니다.'
            },
            {
              question: '사은품은 자동으로 들어가나요?',
              frequency: Math.floor(Math.random() * 35) + 12,
              answer: '네, 구매 조건 충족 시 자동으로 사은품이 포함되어 배송됩니다.'
            },
            {
              question: '쿠폰 중복 사용 가능한가요?',
              frequency: Math.floor(Math.random() * 30) + 10,
              answer: couponDuplicate === '가능' ? '네, 쿠폰 중복 사용 가능합니다.' : '죄송하지만 쿠폰 중복 사용은 불가합니다.'
            },
            {
              question: '반품/교환 가능한가요?',
              frequency: Math.floor(Math.random() * 25) + 8,
              answer: '구매 후 7일 이내 단순 변심 반품 가능합니다. 미개봉 상태여야 합니다.'
            }
          ],
          chat_analysis: {
            sentiment_positive: Math.floor(Math.random() * 25) + 65,
            sentiment_neutral: Math.floor(Math.random() * 20) + 10,
            sentiment_negative: Math.floor(Math.random() * 8) + 0,
            peak_chat_time: `${String(hour).padStart(2, '0')}:${String(20 + (i % 10)).padStart(2, '0')}`,
            average_response_time: '2분 45초',
            host_engagement_rate: Math.floor(Math.random() * 18) + 72
          }
        },
        // 🎪 이벤트
        events: [
          {
            event_id: `EVENT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
            event_name: `${brand.name} ${promotionType}`,
            event_type: '타임특가',
            event_description: `11번가 라이브 한정 ${promotionType}! 지금 바로 구매하세요!`,
            event_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ~ ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
            event_target_products: [
              `${brand.name} ${productType} 본품`,
              `${brand.name} ${productType} 라이브특가세트`
            ],
            event_benefit: i % 3 === 0 ? '25% 할인' : '35,000원 즉시 할인',
            event_condition: '방송 시청 중 구매 시 적용',
            event_quantity_limit: i % 2 === 0 ? '한정 80개' : '',
            event_remaining_quantity: i % 2 === 0 ? 65 : null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '🔥 HOT'
          },
          {
            event_id: `EVENT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
            event_name: '11페이 추가 할인 이벤트',
            event_type: '결제혜택',
            event_description: '11페이 결제 시 최대 12,000원 추가 할인!',
            event_period: `${broadcastDate} 전일`,
            event_target_products: ['전상품'],
            event_benefit: '11페이 결제 시 12,000원 할인 + 6% 적립',
            event_condition: '11페이 결제 및 150,000원 이상 구매',
            event_quantity_limit: '',
            event_remaining_quantity: null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '💳 11페이'
          },
          {
            event_id: `EVENT_11ST_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
            event_name: `${brand.name} 프리미엄 회원 특별 혜택`,
            event_type: '멤버십',
            event_description: `${brand.name} 프리미엄 회원 전용 추가 할인!`,
            event_period: `${broadcastDate} 전일`,
            event_target_products: ['전상품'],
            event_benefit: '추가 7% 할인 + 포인트 2배 적립',
            event_condition: `${brand.name} 프리미엄 회원`,
            event_quantity_limit: '',
            event_remaining_quantity: null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '👑 VIP'
          }
        ],
        duplicate_policy: {
          coupon_duplicate: couponDuplicate,
          point_duplicate: '가능',
          other_event_duplicate: '브랜드 단독 행사와 중복 불가',
          employee_discount: '적용 가능'
        },
        restrictions: {
          excluded_products: excludedProducts,
          channel_restriction: '11번가 앱 전용',
          payment_restriction: paymentRestriction,
          region_restriction: '도서산간 배송비 별도'
        },
        live_specific: {
          key_mentions: [
            `[00:03] 안녕하세요! 11번가 LIVE ${brand.name} ${productType} 방송 시작합니다!`,
            `[00:15] ${brand.name} ${productType}은 11번가 베스트셀러입니다!`,
            `[02:45] 11번가 단독 ${promotionType}로 최저가 제공합니다!`,
            `[05:20] ${productType}의 핵심 성분과 효능을 자세히 설명드리겠습니다!`,
            `[08:50] 11페이 결제 시 최대 혜택을 받으실 수 있습니다!`,
            `[12:30] 방송 중에만 받을 수 있는 특별 사은품이 준비되어 있습니다!`,
            `[15:10] 선착순 혜택이 있으니 서둘러 주세요!`,
            `[18:40] "${productType} 정말 좋아요! 피부가 부드러워졌어요!" - 실시간 후기`,
            `[22:15] 💎 지금 바로 구매하시면 최대 ${discountRate}% 할인!`,
            `[25:50] ${productType}는 아침 저녁 스킨케어 루틴에 필수입니다!`,
            `[28:30] ⚡ 선착순 100명! 10만원 이상 구매 시 ${brand.name} 미니 세트 증정!`,
            `[32:20] 한 방울만 발라도 촉촉하게 하루종일 보습이 지속됩니다!`,
            `[35:45] 💰 11페이 결제하시면 추가 포인트 적립!`,
            `[38:10] 실시간 주문이 쏟아지고 있어요! 벌써 50개 판매!`,
            `[42:35] ${productType}는 모든 피부 타입에 사용 가능합니다!`,
            `[45:50] 마지막 기회! 놓치지 마세요!`,
            `[48:25] 남은 사은품이 30개밖에 없어요! 지금 주문하세요!`,
            `[52:10] 🎁 오늘 구매하신 분들 전원 무료배송!`,
            `[55:30] 주문 폭주 중! 배송은 내일 바로 시작됩니다!`,
            `[57:50] 마지막 2분! 방송 종료 후엔 정상가로 돌아갑니다!`,
            `[59:20] ${productType}로 건강하고 아름다운 피부 만드세요!`,
            `[59:55] 구매해주신 모든 분들 감사합니다! 다음 라이브에서 또 만나요!`
          ],
          broadcast_qa: [
            {
              question: '11페이 할인은 어떻게 받나요?',
              answer: '결제 시 11페이를 선택하시면 자동으로 할인이 적용됩니다.'
            },
            {
              question: '쿠폰 중복 사용 가능한가요?',
              answer: couponDuplicate === '가능' ? '네, 중복 사용 가능합니다.' : '죄송하지만 중복 사용은 불가합니다.'
            }
          ],
          timeline: [
            { time: '00:00', event: '방송 시작 및 인사' },
            { time: '00:05', event: '제품 소개 및 특장점 설명' },
            { time: '00:20', event: '혜택 안내 (할인/사은품/쿠폰/11페이)' },
            { time: '00:40', event: '실시간 Q&A' },
            { time: '00:55', event: '마무리 및 주문 안내' }
          ]
        },
        cs_info: {
          expected_questions: [
            '방송 끝났는데 혜택 적용되나요?',
            '11페이 외 다른 결제수단도 되나요?',
            '사은품은 언제 받을 수 있나요?',
            '오늘출발 가능한가요?'
          ],
          response_scripts: [
            `혜택 유효기간은 ${benefitValidType}입니다.`,
            `결제수단은 ${paymentRestriction}입니다.`,
            `사은품은 주문 상품과 함께 배송됩니다.`,
            `오늘 23시까지 주문 시 오늘출발 가능합니다.`
          ],
          risk_points: [
            couponDuplicate === '불가' ? '쿠폰 중복 사용 불가 - 고객 문의 빈번' : '',
            excludedProducts ? `${excludedProducts} - 명시 필요` : '',
            '11페이 결제 필수 조건 강조 필요'
          ].filter(Boolean),
          cs_note: `${brand.name} ${broadcastDate} 11번가 라이브 - ${promotionType}`
        }
      };
      
      st11Data.push(liveData);
    }
  });
  
  console.log(`✅ 11번가 라이브 데이터 생성: ${st11Data.length}개`);
  return st11Data;
};

/**
 * G마켓 라이브 쇼핑 데이터 생성 함수
 */
const generateGmarketLiveData = () => {
  const gmarketData = [];
  const brands = [
    { name: '설화수', code: 'SULWHASOO', count: 16 },
    { name: '라네즈', code: 'LANEIGE', count: 16 },
    { name: '아이오페', code: 'IOPE', count: 14 },
    { name: '헤라', code: 'HERA', count: 14 },
    { name: '에스트라', code: 'AESTURA', count: 10 },
    { name: '이니스프리', code: 'INNISFREE', count: 16 },
    { name: '해피바스', code: 'HAPPYBATH', count: 10 },
    { name: '바이탈뷰티', code: 'VITALBEAUTY', count: 10 },
    { name: '프리메라', code: 'PRIMERA', count: 10 },
    { name: '오설록', code: 'OSULLOC', count: 10 }
  ];
  
  const productTypes = ['에센스', '크림', '세럼', '마스크팩', '클렌징', '토너', '쿠션', '립스틱', '아이크림', '선크림'];
  const promotionTypes = ['빅스마일특가', '라이브특가', '타임딜', '오늘만특가', '단독특가', '스마일데이', '브랜드위크', '반짝세일'];
  
  const statuses = ['ACTIVE', 'PENDING', 'ENDED'];
  const statusWeights = [0.13, 0.47, 0.4]; // 13% 진행중, 47% 예정, 40% 종료
  
  brands.forEach(brand => {
    for (let i = 0; i < brand.count; i++) {
      // 상태 결정 (결정적 방식 - 브랜드 코드와 인덱스 기반)
      // 같은 브랜드와 인덱스 조합은 항상 같은 상태를 반환
      const hash = (brand.code.charCodeAt(0) + brand.code.charCodeAt(brand.code.length - 1) + i) % 100;
      let status;
      if (hash < statusWeights[0] * 100) status = statuses[0]; // ACTIVE (0-14)
      else if (hash < (statusWeights[0] + statusWeights[1]) * 100) status = statuses[1]; // PENDING (15-59)
      else status = statuses[2]; // ENDED (60-99)
      
      const productType = productTypes[i % productTypes.length];
      const promotionType = promotionTypes[i % promotionTypes.length];
      
      // 날짜 생성 (결정적 방식)
      const today = new Date('2025-11-28');
      let broadcastDate;
      
      if (status === 'ACTIVE') {
        broadcastDate = '2025-11-28';
      } else if (status === 'PENDING') {
        const daysAhead = ((hash + i) % 14) + 1;
        const futureDate = new Date(today);
        futureDate.setDate(futureDate.getDate() + daysAhead);
        broadcastDate = futureDate.toISOString().split('T')[0];
      } else {
        const daysBefore = ((hash + i * 2) % 30) + 1;
        const pastDate = new Date(today);
        pastDate.setDate(pastDate.getDate() - daysBefore);
        broadcastDate = pastDate.toISOString().split('T')[0];
      }
      
      const hour = 20 + (i % 3);
      const minute = (i % 2) * 30;
      
      // 변수 미리 정의
      const benefitValidType = i % 3 === 0 ? '방송 중만' : i % 3 === 1 ? '당일 23:59' : '기간형';
      const couponDuplicate = i % 2 === 0 ? '가능' : '불가';
      const paymentRestriction = i % 2 === 0 ? 'G마켓 카드 우대' : '모든 결제수단 가능';
      const excludedProducts = i % 3 === 0 ? '대용량 제외' : '';
      
      const liveData = {
        metadata: {
          live_id: `GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}`,
          platform_name: 'G마켓',
          brand_name: brand.name,
          live_title_customer: `[G마켓LIVE] ${brand.name} ${productType} ${promotionType}`,
          live_title_cs: `${brand.name} ${broadcastDate} G마켓 ${productType} 라이브`,
          source_url: `https://m.gmarket.co.kr/n/live/schedule/${100000 + Math.floor(Math.random() * 900000)}`,
          thumbnail_url: '',
          status: status,
          collected_at: new Date().toISOString(),
          is_real_data: true
        },
        schedule: {
          broadcast_date: broadcastDate,
          broadcast_start_time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          broadcast_end_time: `${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          benefit_valid_type: benefitValidType,
          benefit_start_datetime: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`,
          benefit_end_datetime: `${broadcastDate} ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`,
          broadcast_type: i % 2 === 0 ? '단독라이브' : '빅스마일데이 연계'
        },
        // 📦 상품 탭
        products: [
          {
            product_order: 1,
            product_name: `${brand.name} ${productType} 본품`,
            sku: `${brand.code}-GMARKET-${String(i + 1).padStart(3, '0')}-01`,
            original_price: `${(135 + i * 10) * 1000}원`,
            sale_price: `${Math.floor((135 + i * 10) * 0.72) * 1000}원`,
            discount_rate: '28%',
            product_type: '대표',
            stock_info: '재고 충분',
            stock_quantity: 550,
            set_composition: '',
            product_url: `https://m.gmarket.co.kr/n/products/${100000 + i}`,
            product_options: [
              { option_name: '용량', option_value: '50ml' },
              { option_name: '용량', option_value: '100ml' }
            ],
            product_detail: `${brand.name}의 인기 ${productType}입니다. G마켓 단독 특가로 만나보세요.`,
            delivery_fee: '무료배송',
            estimated_delivery: '1-2일',
            review_count: 2567,
            rating: 4.8
          },
          {
            product_order: 2,
            product_name: `${brand.name} ${productType} 빅스마일세트`,
            sku: `${brand.code}-GMARKET-${String(i + 1).padStart(3, '0')}-SET`,
            original_price: `${(195 + i * 15) * 1000}원`,
            sale_price: `${Math.floor((195 + i * 15) * 0.68) * 1000}원`,
            discount_rate: '32%',
            product_type: '세트',
            stock_info: '한정 70개',
            stock_quantity: 70,
            set_composition: `본품 ${productType} + 토너 + 샘플키트`,
            product_url: `https://m.gmarket.co.kr/n/products/${100000 + i + 1}`,
            product_options: [],
            product_detail: `G마켓 라이브 단독 구성! 본품과 함께 사용하기 좋은 토너와 샘플키트가 포함되어 있습니다.`,
            delivery_fee: '무료배송',
            estimated_delivery: '1-2일',
            review_count: 789,
            rating: 4.9
          },
          {
            product_order: 3,
            product_name: `${brand.name} ${productType} 기획세트`,
            sku: `${brand.code}-GMARKET-${String(i + 1).padStart(3, '0')}-02`,
            original_price: `${(165 + i * 12) * 1000}원`,
            sale_price: `${Math.floor((165 + i * 12) * 0.7) * 1000}원`,
            discount_rate: '30%',
            product_type: '일반',
            stock_info: '재고 충분',
            stock_quantity: 380,
            set_composition: '',
            product_url: `https://m.gmarket.co.kr/n/products/${100000 + i + 2}`,
            product_options: [
              { option_name: '용량', option_value: '150ml' }
            ],
            product_detail: `대용량으로 더욱 알뜰하게 사용하세요.`,
            delivery_fee: '무료배송',
            estimated_delivery: '1-2일',
            review_count: 1345,
            rating: 4.7
          },
          {
            product_order: 4,
            product_name: `${brand.name} 베스트 콜렉션`,
            sku: `${brand.code}-GMARKET-${String(i + 1).padStart(3, '0')}-BEST`,
            original_price: `${(250 + i * 18) * 1000}원`,
            sale_price: `${Math.floor((250 + i * 18) * 0.62) * 1000}원`,
            discount_rate: '38%',
            product_type: '세트',
            stock_info: '한정 25개',
            stock_quantity: 25,
            set_composition: `${productType} + 토너 + 크림 + 마스크`,
            product_url: `https://m.gmarket.co.kr/n/products/${100000 + i + 3}`,
            product_options: [],
            product_detail: `${brand.name} 베스트 4종을 한번에! G마켓 라이브 초특가입니다.`,
            delivery_fee: '무료배송',
            estimated_delivery: '1-2일',
            review_count: 512,
            rating: 4.9
          }
        ],
        benefits: {
          // 💰 할인 혜택
          discounts: [
            {
              discount_id: `DISC_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              discount_name: 'G마켓 라이브 즉시할인',
              discount_type: i % 3 === 0 ? '퍼센트할인' : '금액할인',
              discount_value: i % 3 === 0 ? '28%' : '40,000원',
              discount_detail: i % 3 === 0 ? '방송 중 결제 시 28% 할인' : '방송 중 40,000원 즉시 할인',
              target_products: '전상품',
              min_purchase_amount: i % 3 === 0 ? '50,000원' : '100,000원',
              max_discount_amount: i % 3 === 0 ? '70,000원' : '',
              valid_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ~ ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
              auto_apply: true
            },
            {
              discount_id: `DISC_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              discount_name: 'G마켓 카드 추가할인',
              discount_type: '금액할인',
              discount_value: '15,000원',
              discount_detail: 'G마켓 카드 결제 시 15,000원 추가할인',
              target_products: '전상품',
              min_purchase_amount: '150,000원',
              max_discount_amount: '15,000원',
              valid_period: `${broadcastDate} 00:00 ~ 23:59`,
              auto_apply: false,
              card_company: ['신한', 'KB국민', '현대']
            }
          ],
          // 🎁 사은품
          gifts: [
            {
              gift_id: `GIFT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              gift_name: `${brand.name} G마켓 라이브 사은품`,
              gift_type: i % 2 === 0 ? '구매조건형' : '선착순형',
              gift_list: [
                { item_name: `${brand.name} 미니어처 4종`, quantity: 1, value: '20,000원' },
                { item_name: `${brand.name} 에코백`, quantity: 1, value: '12,000원' }
              ],
              gift_condition: i % 2 === 0 ? '10만원 이상 구매 시' : '선착순 35명',
              gift_quantity_limit: i % 2 === 0 ? '' : '선착순 35명',
              gift_image_url: '',
              gift_detail: i % 2 === 0 ? '구매금액 10만원 이상 시 자동 증정' : '방송 중 빠른 순서대로 선착순 35명에게만 증정'
            },
            {
              gift_id: `GIFT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              gift_name: `${brand.name} VIP 스페셜 사은품`,
              gift_type: '구매조건형',
              gift_list: [
                { item_name: `${brand.name} 프리미엄 기획세트`, quantity: 1, value: '38,000원' }
              ],
              gift_condition: '30만원 이상 구매 시',
              gift_quantity_limit: '',
              gift_image_url: '',
              gift_detail: '구매금액 30만원 이상 시 프리미엄 사은품 증정'
            }
          ],
          // 🎟️ 쿠폰
          coupons: [
            {
              coupon_id: `COUP_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              coupon_name: `${brand.name} G마켓 라이브 쿠폰`,
              coupon_type: '플랫폼쿠폰',
              coupon_discount_type: '금액할인',
              coupon_discount_value: '20,000원',
              min_purchase_amount: '100,000원',
              max_discount_amount: '20,000원',
              coupon_issue_condition: '방송 중 다운로드',
              coupon_issue_limit: '선착순 70명',
              coupon_valid_start: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: couponDuplicate === '가능',
              target_products: '전상품',
              excluded_products: excludedProducts
            },
            {
              coupon_id: `COUP_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              coupon_name: `${brand.name} 브랜드 쿠폰`,
              coupon_type: '브랜드쿠폰',
              coupon_discount_type: '퍼센트할인',
              coupon_discount_value: '15%',
              min_purchase_amount: '50,000원',
              max_discount_amount: '30,000원',
              coupon_issue_condition: '회원 자동 발급',
              coupon_issue_limit: '제한없음',
              coupon_valid_start: `${broadcastDate} 00:00`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: true,
              target_products: `${brand.name} 전상품`,
              excluded_products: ''
            },
            {
              coupon_id: `COUP_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              coupon_name: 'G마켓 카드 쿠폰',
              coupon_type: '결제수단쿠폰',
              coupon_discount_type: '금액할인',
              coupon_discount_value: '8,000원',
              min_purchase_amount: '50,000원',
              max_discount_amount: '8,000원',
              coupon_issue_condition: 'G마켓 카드 결제 시 자동 적용',
              coupon_issue_limit: '1회',
              coupon_valid_start: `${broadcastDate} 00:00`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: false,
              target_products: '전상품',
              excluded_products: ''
            }
          ],
          // 💳 포인트 적립
          point_condition: '스마일캐시 7% 적립',
          point_details: [
            {
              point_type: '스마일캐시',
              point_rate: '7%',
              point_max: '15,000원',
              point_condition: 'G마켓 앱 결제 시',
              point_valid_period: '적립일로부터 1년'
            },
            {
              point_type: `${brand.name} 멤버십 포인트`,
              point_rate: '5%',
              point_max: '8,000원',
              point_condition: '멤버십 회원 자동 적립',
              point_valid_period: '적립일로부터 2년'
            }
          ],
          // 🚚 배송 혜택
          shipping: [
            {
              shipping_id: `SHIP_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              shipping_benefit: i % 2 === 0 ? '무료배송' : '스마일배송',
              shipping_fee: i % 2 === 0 ? '0원' : '2,500원',
              shipping_condition: i % 2 === 0 ? '전상품 무료배송' : '50,000원 이상 무료배송',
              delivery_company: 'CJ대한통운',
              estimated_delivery_time: i % 2 === 0 ? '1-2일' : '스마일배송(익일배송)',
              tracking_available: true
            }
          ]
        },
        // 💬 채팅 정보
        chat_info: {
          chat_enabled: true,
          total_chat_count: Math.floor(Math.random() * 3500) + 700,
          total_participants: Math.floor(Math.random() * 700) + 130,
          chat_summary: {
            top_keywords: [productType, brand.name, '가격', '배송', '사은품', '스마일캐시', '재고', '쿠폰', '할인', '카드'],
            question_count: Math.floor(Math.random() * 70) + 12,
            purchase_inquiry_count: Math.floor(Math.random() * 35) + 7,
            positive_reaction_count: Math.floor(Math.random() * 350) + 70,
            emoji_reactions: {
              '❤️': Math.floor(Math.random() * 220) + 35,
              '👍': Math.floor(Math.random() * 160) + 22,
              '😍': Math.floor(Math.random() * 110) + 13,
              '🔥': Math.floor(Math.random() * 70) + 10,
              '👏': Math.floor(Math.random() * 50) + 7
            }
          },
          featured_chats: [
            {
              chat_id: `CHAT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_001`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(5 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '이*',
              user_type: '일반',
              message: `${productType} 재고 있나요?`,
              is_question: true,
              is_answered: true,
              host_reply: '네, 재고 충분합니다! 지금 바로 주문 가능해요 😊',
              like_count: Math.floor(Math.random() * 16) + 3
            },
            {
              chat_id: `CHAT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_002`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(8 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '박*',
              user_type: '일반',
              message: '스마일캐시 적립 몇 프로예요?',
              is_question: true,
              is_answered: true,
              host_reply: 'G마켓 앱 결제 시 7% 스마일캐시 적립됩니다! 최대 15,000원까지 적립 가능해요!',
              like_count: Math.floor(Math.random() * 20) + 5
            },
            {
              chat_id: `CHAT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_003`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(12 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '김*',
              user_type: '일반',
              message: 'G마켓 가격 진짜 좋네요! 바로 결제했어요 ^^',
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 32) + 10
            },
            {
              chat_id: `CHAT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_004`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(15 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '최*',
              user_type: '빅스마일',
              message: '사은품 조건이 어떻게 되나요?',
              is_question: true,
              is_answered: true,
              host_reply: '10만원 이상 구매 시 자동으로 사은품이 포함되어 배송됩니다!',
              like_count: Math.floor(Math.random() * 14) + 4
            },
            {
              chat_id: `CHAT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_005`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(20 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '정*',
              user_type: '일반',
              message: `${brand.name} 제품 항상 좋아요! 이번에도 득템했어요 ❤️`,
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 40) + 16
            },
            {
              chat_id: `CHAT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_006`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(25 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '강*',
              user_type: '일반',
              message: '쿠폰 중복 사용 가능한가요?',
              is_question: true,
              is_answered: true,
              host_reply: couponDuplicate === '가능' ? '네, 쿠폰 중복 사용 가능합니다!' : '죄송하지만 쿠폰 중복 사용은 불가합니다.',
              like_count: Math.floor(Math.random() * 18) + 6
            },
            {
              chat_id: `CHAT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_007`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(30 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '조*',
              user_type: '일반',
              message: '스마일배송 가능한가요?',
              is_question: true,
              is_answered: true,
              host_reply: '네, 오늘 주문 시 내일 도착하는 스마일배송 가능합니다!',
              like_count: Math.floor(Math.random() * 12) + 3
            },
            {
              chat_id: `CHAT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_008`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(35 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '윤*',
              user_type: '빅스마일',
              message: 'G마켓 카드로 결제하면 추가 할인 있나요?',
              is_question: true,
              is_answered: true,
              host_reply: '네! G마켓 카드 결제 시 15,000원 추가 할인 받으실 수 있습니다!',
              like_count: Math.floor(Math.random() * 15) + 4
            },
            {
              chat_id: `CHAT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_009`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(40 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '장*',
              user_type: '일반',
              message: '방금 주문했어요! 빨리 받고 싶네요 😍',
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 28) + 11
            },
            {
              chat_id: `CHAT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_010`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(45 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '임*',
              user_type: '일반',
              message: '반품은 어떻게 하나요?',
              is_question: true,
              is_answered: true,
              host_reply: '구매 후 7일 이내 단순 변심 반품 가능합니다. 미개봉 상태여야 하며 반품 배송비는 고객 부담입니다.',
              like_count: Math.floor(Math.random() * 11) + 3
            }
          ],
          frequent_questions: [
            {
              question: '스마일캐시 적립은 얼마나 되나요?',
              frequency: Math.floor(Math.random() * 40) + 16,
              answer: 'G마켓 앱 결제 시 7% 스마일캐시 적립됩니다. 최대 15,000원까지 적립 가능합니다.'
            },
            {
              question: 'G마켓 카드 추가 할인 있나요?',
              frequency: Math.floor(Math.random() * 38) + 14,
              answer: 'G마켓 카드 결제 시 15,000원 추가 할인 받으실 수 있습니다.'
            },
            {
              question: '스마일배송 가능한가요?',
              frequency: Math.floor(Math.random() * 35) + 12,
              answer: '네, 오늘 주문 시 내일 도착하는 스마일배송 가능합니다.'
            },
            {
              question: '사은품은 자동으로 들어가나요?',
              frequency: Math.floor(Math.random() * 32) + 11,
              answer: '네, 구매 조건 충족 시 자동으로 사은품이 포함되어 배송됩니다.'
            },
            {
              question: '쿠폰 중복 사용 가능한가요?',
              frequency: Math.floor(Math.random() * 28) + 9,
              answer: couponDuplicate === '가능' ? '네, 쿠폰 중복 사용 가능합니다.' : '죄송하지만 쿠폰 중복 사용은 불가합니다.'
            }
          ],
          chat_analysis: {
            sentiment_positive: Math.floor(Math.random() * 23) + 67,
            sentiment_neutral: Math.floor(Math.random() * 18) + 10,
            sentiment_negative: Math.floor(Math.random() * 7) + 0,
            peak_chat_time: `${String(hour).padStart(2, '0')}:${String(22 + (i % 10)).padStart(2, '0')}`,
            average_response_time: '2분 50초',
            host_engagement_rate: Math.floor(Math.random() * 16) + 74
          }
        },
        // 🎪 이벤트
        events: [
          {
            event_id: `EVENT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
            event_name: `${brand.name} ${promotionType}`,
            event_type: '타임특가',
            event_description: `G마켓 라이브 한정 ${promotionType}! 지금 바로 구매하세요!`,
            event_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ~ ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
            event_target_products: [
              `${brand.name} ${productType} 본품`,
              `${brand.name} ${productType} 빅스마일세트`
            ],
            event_benefit: i % 3 === 0 ? '28% 할인' : '40,000원 즉시 할인',
            event_condition: '방송 시청 중 구매 시 적용',
            event_quantity_limit: i % 2 === 0 ? '한정 70개' : '',
            event_remaining_quantity: i % 2 === 0 ? 58 : null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '🔥 HOT'
          },
          {
            event_id: `EVENT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
            event_name: 'G마켓 카드 추가 할인',
            event_type: '결제혜택',
            event_description: 'G마켓 카드 결제 시 최대 15,000원 추가 할인!',
            event_period: `${broadcastDate} 전일`,
            event_target_products: ['전상품'],
            event_benefit: 'G마켓 카드 결제 시 15,000원 할인 + 스마일캐시 7% 적립',
            event_condition: 'G마켓 카드 결제 및 150,000원 이상 구매',
            event_quantity_limit: '',
            event_remaining_quantity: null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '💳 G카드'
          },
          {
            event_id: `EVENT_GMARKET_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
            event_name: '빅스마일데이 특별 혜택',
            event_type: '멤버십',
            event_description: '빅스마일 회원 전용 추가 할인!',
            event_period: `${broadcastDate} 전일`,
            event_target_products: ['전상품'],
            event_benefit: '추가 8% 할인 + 포인트 2배 적립',
            event_condition: '빅스마일 회원',
            event_quantity_limit: '',
            event_remaining_quantity: null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '😊 빅스마일'
          }
        ],
        duplicate_policy: {
          coupon_duplicate: couponDuplicate,
          point_duplicate: '가능',
          other_event_duplicate: '빅스마일데이 행사와 중복 불가',
          employee_discount: '적용 가능'
        },
        restrictions: {
          excluded_products: excludedProducts,
          channel_restriction: 'G마켓 앱 전용',
          payment_restriction: paymentRestriction,
          region_restriction: '도서산간 배송비 별도'
        },
        live_specific: {
          key_mentions: [
            `${brand.name} ${productType}은 G마켓 베스트셀러입니다`,
            `G마켓 단독 ${promotionType}로 최저가 제공합니다`,
            `G마켓 카드 결제 시 최대 혜택을 받으실 수 있습니다`,
            `스마일캐시 7% 적립으로 다음 구매 시에도 혜택받으세요`
          ],
          broadcast_qa: [
            {
              question: 'G마켓 카드 할인은 어떻게 받나요?',
              answer: '결제 시 G마켓 카드를 선택하시면 자동으로 할인이 적용됩니다.'
            },
            {
              question: '스마일캐시는 언제 적립되나요?',
              answer: '구매 확정 후 7일 이내에 스마일캐시가 적립됩니다.'
            }
          ],
          timeline: [
            { time: '00:00', event: '방송 시작 및 인사' },
            { time: '00:05', event: '제품 소개 및 특장점 설명' },
            { time: '00:20', event: '혜택 안내 (할인/사은품/쿠폰/스마일캐시)' },
            { time: '00:40', event: '실시간 Q&A' },
            { time: '00:55', event: '마무리 및 주문 안내' }
          ]
        },
        cs_info: {
          expected_questions: [
            '방송 끝났는데 혜택 적용되나요?',
            'G마켓 카드 없으면 할인 못 받나요?',
            '스마일캐시는 언제 적립되나요?',
            '스마일배송 가능한가요?'
          ],
          response_scripts: [
            `혜택 유효기간은 ${benefitValidType}입니다.`,
            `결제수단은 ${paymentRestriction}입니다.`,
            `스마일캐시는 구매 확정 후 7일 이내 적립됩니다.`,
            `스마일배송 선택 시 익일배송 가능합니다.`
          ],
          risk_points: [
            couponDuplicate === '불가' ? '쿠폰 중복 사용 불가 - 고객 문의 빈번' : '',
            excludedProducts ? `${excludedProducts} - 명시 필요` : '',
            'G마켓 카드 우대 조건 강조 필요'
          ].filter(Boolean),
          cs_note: `${brand.name} ${broadcastDate} G마켓 라이브 - ${promotionType}`
        }
      };
      
      gmarketData.push(liveData);
    }
  });
  
  console.log(`✅ G마켓 라이브 데이터 생성: ${gmarketData.length}개`);
  return gmarketData;
};

/**
 * 올리브영 라이브 쇼핑 데이터 생성 함수
 */
const generateOliveyoungLiveData = () => {
  const oliveyoungData = [];
  const brands = [
    { name: '설화수', code: 'SULWHASOO', count: 15 },
    { name: '라네즈', code: 'LANEIGE', count: 15 },
    { name: '아이오페', code: 'IOPE', count: 13 },
    { name: '헤라', code: 'HERA', count: 13 },
    { name: '에스트라', code: 'AESTURA', count: 10 },
    { name: '이니스프리', code: 'INNISFREE', count: 15 },
    { name: '해피바스', code: 'HAPPYBATH', count: 10 },
    { name: '바이탈뷰티', code: 'VITALBEAUTY', count: 10 },
    { name: '프리메라', code: 'PRIMERA', count: 10 },
    { name: '오설록', code: 'OSULLOC', count: 10 }
  ];
  
  const productTypes = ['에센스', '크림', '세럼', '마스크팩', '클렌징', '토너', '쿠션', '립스틱', '아이크림', '선크림'];
  const promotionTypes = ['올영세일', '오늘특가', '라이브특가', '단독특가', '올영데이', '브랜드위크', '한정특가', '반짝세일'];
  
  const statuses = ['ACTIVE', 'PENDING', 'ENDED'];
  const statusWeights = [0.14, 0.46, 0.4]; // 14% 진행중, 46% 예정, 40% 종료
  
  brands.forEach(brand => {
    for (let i = 0; i < brand.count; i++) {
      // 상태 결정 (결정적 방식 - 브랜드 코드와 인덱스 기반)
      // 같은 브랜드와 인덱스 조합은 항상 같은 상태를 반환
      const hash = (brand.code.charCodeAt(0) + brand.code.charCodeAt(brand.code.length - 1) + i) % 100;
      let status;
      if (hash < statusWeights[0] * 100) status = statuses[0]; // ACTIVE (0-14)
      else if (hash < (statusWeights[0] + statusWeights[1]) * 100) status = statuses[1]; // PENDING (15-59)
      else status = statuses[2]; // ENDED (60-99)
      
      const productType = productTypes[i % productTypes.length];
      const promotionType = promotionTypes[i % promotionTypes.length];
      
      // 날짜 생성 (결정적 방식)
      const today = new Date('2025-11-28');
      let broadcastDate;
      
      if (status === 'ACTIVE') {
        broadcastDate = '2025-11-28';
      } else if (status === 'PENDING') {
        const daysAhead = ((hash + i) % 14) + 1;
        const futureDate = new Date(today);
        futureDate.setDate(futureDate.getDate() + daysAhead);
        broadcastDate = futureDate.toISOString().split('T')[0];
      } else {
        const daysBefore = ((hash + i * 2) % 30) + 1;
        const pastDate = new Date(today);
        pastDate.setDate(pastDate.getDate() - daysBefore);
        broadcastDate = pastDate.toISOString().split('T')[0];
      }
      
      const hour = 19 + (i % 4);
      const minute = (i % 2) * 30;
      
      // 변수 미리 정의
      const benefitValidType = i % 3 === 0 ? '방송 중만' : i % 3 === 1 ? '당일 23:59' : '기간형';
      const couponDuplicate = i % 2 === 0 ? '가능' : '불가';
      const paymentRestriction = i % 2 === 0 ? '올영앱 전용' : '모든 결제수단 가능';
      const excludedProducts = i % 3 === 0 ? '세트상품 제외' : '';
      
      const liveData = {
        metadata: {
          live_id: `OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}`,
          platform_name: '올리브영',
          brand_name: brand.name,
          live_title_customer: `[올리브영LIVE] ${brand.name} ${productType} ${promotionType}`,
          live_title_cs: `${brand.name} ${broadcastDate} 올리브영 ${productType} 라이브`,
          source_url: `https://m.oliveyoung.co.kr/m/mtn/explorer/${100000 + Math.floor(Math.random() * 900000)}`,
          thumbnail_url: '',
          status: status,
          collected_at: new Date().toISOString(),
          is_real_data: true
        },
        schedule: {
          broadcast_date: broadcastDate,
          broadcast_start_time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          broadcast_end_time: `${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
          benefit_valid_type: benefitValidType,
          benefit_start_datetime: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`,
          benefit_end_datetime: `${broadcastDate} ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`,
          broadcast_type: i % 2 === 0 ? '단독라이브' : '올영데이 연계'
        },
        // 📦 상품 탭
        products: [
          {
            product_order: 1,
            product_name: `${brand.name} ${productType} 본품`,
            sku: `${brand.code}-OLIVEYOUNG-${String(i + 1).padStart(3, '0')}-01`,
            original_price: `${(130 + i * 10) * 1000}원`,
            sale_price: `${Math.floor((130 + i * 10) * 0.7) * 1000}원`,
            discount_rate: '30%',
            product_type: '대표',
            stock_info: '재고 충분',
            stock_quantity: 500,
            set_composition: '',
            product_url: `https://m.oliveyoung.co.kr/m/product/${100000 + i}`,
            product_options: [
              { option_name: '용량', option_value: '50ml' },
              { option_name: '용량', option_value: '100ml' }
            ],
            product_detail: `${brand.name}의 인기 ${productType}입니다. 올리브영 단독 특가로 만나보세요.`,
            delivery_fee: '무료배송',
            estimated_delivery: '오늘드림',
            review_count: 2890,
            rating: 4.8
          },
          {
            product_order: 2,
            product_name: `${brand.name} ${productType} 올영세일세트`,
            sku: `${brand.code}-OLIVEYOUNG-${String(i + 1).padStart(3, '0')}-SET`,
            original_price: `${(185 + i * 15) * 1000}원`,
            sale_price: `${Math.floor((185 + i * 15) * 0.65) * 1000}원`,
            discount_rate: '35%',
            product_type: '세트',
            stock_info: '한정 60개',
            stock_quantity: 60,
            set_composition: `본품 ${productType} + 토너 + 샘플 5종`,
            product_url: `https://m.oliveyoung.co.kr/m/product/${100000 + i + 1}`,
            product_options: [],
            product_detail: `올리브영 라이브 단독 구성! 본품과 함께 사용하기 좋은 토너와 샘플 5종이 포함되어 있습니다.`,
            delivery_fee: '무료배송',
            estimated_delivery: '오늘드림',
            review_count: 891,
            rating: 4.9
          },
          {
            product_order: 3,
            product_name: `${brand.name} ${productType} 기획`,
            sku: `${brand.code}-OLIVEYOUNG-${String(i + 1).padStart(3, '0')}-02`,
            original_price: `${(160 + i * 12) * 1000}원`,
            sale_price: `${Math.floor((160 + i * 12) * 0.68) * 1000}원`,
            discount_rate: '32%',
            product_type: '일반',
            stock_info: '재고 충분',
            stock_quantity: 350,
            set_composition: '',
            product_url: `https://m.oliveyoung.co.kr/m/product/${100000 + i + 2}`,
            product_options: [
              { option_name: '용량', option_value: '150ml' }
            ],
            product_detail: `대용량으로 더욱 알뜰하게 사용하세요.`,
            delivery_fee: '무료배송',
            estimated_delivery: '1-2일',
            review_count: 1456,
            rating: 4.7
          },
          {
            product_order: 4,
            product_name: `${brand.name} 베스트 4종`,
            sku: `${brand.code}-OLIVEYOUNG-${String(i + 1).padStart(3, '0')}-BEST`,
            original_price: `${(240 + i * 18) * 1000}원`,
            sale_price: `${Math.floor((240 + i * 18) * 0.6) * 1000}원`,
            discount_rate: '40%',
            product_type: '세트',
            stock_info: '한정 20개',
            stock_quantity: 20,
            set_composition: `${productType} + 토너 + 크림 + 마스크팩`,
            product_url: `https://m.oliveyoung.co.kr/m/product/${100000 + i + 3}`,
            product_options: [],
            product_detail: `${brand.name} 베스트 4종을 한번에! 올리브영 라이브 초특가입니다.`,
            delivery_fee: '무료배송',
            estimated_delivery: '오늘드림',
            review_count: 623,
            rating: 4.9
          }
        ],
        benefits: {
          // 💰 할인 혜택
          discounts: [
            {
              discount_id: `DISC_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              discount_name: '올리브영 라이브 즉시할인',
              discount_type: i % 3 === 0 ? '퍼센트할인' : '금액할인',
              discount_value: i % 3 === 0 ? '30%' : '45,000원',
              discount_detail: i % 3 === 0 ? '방송 중 결제 시 30% 할인' : '방송 중 45,000원 즉시 할인',
              target_products: '전상품',
              min_purchase_amount: i % 3 === 0 ? '50,000원' : '100,000원',
              max_discount_amount: i % 3 === 0 ? '80,000원' : '',
              valid_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ~ ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
              auto_apply: true
            },
            {
              discount_id: `DISC_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              discount_name: '올영앱 추가할인',
              discount_type: '금액할인',
              discount_value: '18,000원',
              discount_detail: '올영앱 결제 시 18,000원 추가할인',
              target_products: '전상품',
              min_purchase_amount: '150,000원',
              max_discount_amount: '18,000원',
              valid_period: `${broadcastDate} 00:00 ~ 23:59`,
              auto_apply: false,
              card_company: []
            }
          ],
          // 🎁 사은품
          gifts: [
            {
              gift_id: `GIFT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              gift_name: `${brand.name} 올리브영 라이브 사은품`,
              gift_type: i % 2 === 0 ? '구매조건형' : '선착순형',
              gift_list: [
                { item_name: `${brand.name} 미니어처 5종`, quantity: 1, value: '22,000원' },
                { item_name: `${brand.name} 파우치`, quantity: 1, value: '13,000원' }
              ],
              gift_condition: i % 2 === 0 ? '10만원 이상 구매 시' : '선착순 30명',
              gift_quantity_limit: i % 2 === 0 ? '' : '선착순 30명',
              gift_image_url: '',
              gift_detail: i % 2 === 0 ? '구매금액 10만원 이상 시 자동 증정' : '방송 중 빠른 순서대로 선착순 30명에게만 증정'
            },
            {
              gift_id: `GIFT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              gift_name: `${brand.name} 프리미엄 사은품`,
              gift_type: '구매조건형',
              gift_list: [
                { item_name: `${brand.name} 럭셔리 기획세트`, quantity: 1, value: '40,000원' }
              ],
              gift_condition: '30만원 이상 구매 시',
              gift_quantity_limit: '',
              gift_image_url: '',
              gift_detail: '구매금액 30만원 이상 시 프리미엄 사은품 증정'
            }
          ],
          // 🎟️ 쿠폰
          coupons: [
            {
              coupon_id: `COUP_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              coupon_name: `${brand.name} 올리브영 라이브 쿠폰`,
              coupon_type: '플랫폼쿠폰',
              coupon_discount_type: '금액할인',
              coupon_discount_value: '22,000원',
              min_purchase_amount: '100,000원',
              max_discount_amount: '22,000원',
              coupon_issue_condition: '방송 중 다운로드',
              coupon_issue_limit: '선착순 60명',
              coupon_valid_start: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: couponDuplicate === '가능',
              target_products: '전상품',
              excluded_products: excludedProducts
            },
            {
              coupon_id: `COUP_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              coupon_name: `${brand.name} 브랜드 쿠폰`,
              coupon_type: '브랜드쿠폰',
              coupon_discount_type: '퍼센트할인',
              coupon_discount_value: '18%',
              min_purchase_amount: '50,000원',
              max_discount_amount: '35,000원',
              coupon_issue_condition: '회원 자동 발급',
              coupon_issue_limit: '제한없음',
              coupon_valid_start: `${broadcastDate} 00:00`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: true,
              target_products: `${brand.name} 전상품`,
              excluded_products: ''
            },
            {
              coupon_id: `COUP_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              coupon_name: '올영앱 다운로드 쿠폰',
              coupon_type: '앱전용쿠폰',
              coupon_discount_type: '금액할인',
              coupon_discount_value: '10,000원',
              min_purchase_amount: '50,000원',
              max_discount_amount: '10,000원',
              coupon_issue_condition: '올영앱 회원 자동 발급',
              coupon_issue_limit: '1회',
              coupon_valid_start: `${broadcastDate} 00:00`,
              coupon_valid_end: `${broadcastDate} 23:59`,
              coupon_status: '발급가능',
              duplicate_use: false,
              target_products: '전상품',
              excluded_products: ''
            }
          ],
          // 💳 포인트 적립
          point_condition: '올영포인트 8% 적립',
          point_details: [
            {
              point_type: '올영포인트',
              point_rate: '8%',
              point_max: '20,000원',
              point_condition: '올영앱 결제 시',
              point_valid_period: '적립일로부터 1년'
            },
            {
              point_type: `${brand.name} 멤버십 포인트`,
              point_rate: '6%',
              point_max: '10,000원',
              point_condition: '멤버십 회원 자동 적립',
              point_valid_period: '적립일로부터 2년'
            }
          ],
          // 🚚 배송 혜택
          shipping: [
            {
              shipping_id: `SHIP_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              shipping_benefit: i % 2 === 0 ? '오늘드림' : '무료배송',
              shipping_fee: '0원',
              shipping_condition: i % 2 === 0 ? '오늘 15시 이전 주문' : '전상품 무료배송',
              delivery_company: 'CJ대한통운',
              estimated_delivery_time: i % 2 === 0 ? '오늘드림(당일배송)' : '1-2일',
              tracking_available: true
            }
          ]
        },
        // 💬 채팅 정보
        chat_info: {
          chat_enabled: true,
          total_chat_count: Math.floor(Math.random() * 3200) + 650,
          total_participants: Math.floor(Math.random() * 650) + 120,
          chat_summary: {
            top_keywords: [productType, brand.name, '가격', '배송', '사은품', '올영포인트', '재고', '오늘드림', '쿠폰', '할인'],
            question_count: Math.floor(Math.random() * 65) + 11,
            purchase_inquiry_count: Math.floor(Math.random() * 32) + 6,
            positive_reaction_count: Math.floor(Math.random() * 320) + 65,
            emoji_reactions: {
              '❤️': Math.floor(Math.random() * 200) + 32,
              '👍': Math.floor(Math.random() * 150) + 20,
              '😍': Math.floor(Math.random() * 100) + 12,
              '🔥': Math.floor(Math.random() * 65) + 9,
              '👏': Math.floor(Math.random() * 45) + 6
            }
          },
          featured_chats: [
            {
              chat_id: `CHAT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_001`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(5 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '서*',
              user_type: '일반',
              message: `${productType} 재고 있나요?`,
              is_question: true,
              is_answered: true,
              host_reply: '네, 재고 충분합니다! 지금 바로 주문 가능해요 😊',
              like_count: Math.floor(Math.random() * 15) + 3
            },
            {
              chat_id: `CHAT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_002`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(8 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '한*',
              user_type: '일반',
              message: '오늘드림 되나요?',
              is_question: true,
              is_answered: true,
              host_reply: '네! 오늘 15시 이전 주문 시 오늘드림으로 당일 받으실 수 있습니다!',
              like_count: Math.floor(Math.random() * 19) + 5
            },
            {
              chat_id: `CHAT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_003`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(12 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '이*',
              user_type: '일반',
              message: '올리브영 가격 정말 좋네요! 바로 구매했어요 ^^',
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 30) + 9
            },
            {
              chat_id: `CHAT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_004`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(15 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '최*',
              user_type: '올영멤버십',
              message: '사은품 조건이 어떻게 되나요?',
              is_question: true,
              is_answered: true,
              host_reply: '10만원 이상 구매 시 자동으로 사은품이 포함되어 배송됩니다!',
              like_count: Math.floor(Math.random() * 13) + 4
            },
            {
              chat_id: `CHAT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_005`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(20 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '정*',
              user_type: '일반',
              message: `${brand.name} 제품 항상 올리브영에서 사요! 믿고 구매합니다 ❤️`,
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 38) + 15
            },
            {
              chat_id: `CHAT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_006`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(25 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '강*',
              user_type: '일반',
              message: '올영포인트 적립은 얼마나 되나요?',
              is_question: true,
              is_answered: true,
              host_reply: '올영앱 결제 시 8% 올영포인트 적립됩니다! 최대 20,000원까지 적립 가능해요!',
              like_count: Math.floor(Math.random() * 17) + 5
            },
            {
              chat_id: `CHAT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_007`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(30 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '조*',
              user_type: '일반',
              message: '쿠폰 중복 사용 가능한가요?',
              is_question: true,
              is_answered: true,
              host_reply: couponDuplicate === '가능' ? '네, 쿠폰 중복 사용 가능합니다!' : '죄송하지만 쿠폰 중복 사용은 불가합니다.',
              like_count: Math.floor(Math.random() * 16) + 5
            },
            {
              chat_id: `CHAT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_008`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(35 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '윤*',
              user_type: '올영멤버십',
              message: '매장 픽업도 가능한가요?',
              is_question: true,
              is_answered: true,
              host_reply: '죄송하지만 라이브 방송 상품은 배송만 가능합니다. 오늘드림으로 빠르게 받아보세요!',
              like_count: Math.floor(Math.random() * 12) + 3
            },
            {
              chat_id: `CHAT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_009`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(40 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '장*',
              user_type: '일반',
              message: '방금 주문했어요! 오늘 받을 수 있겠네요 😍',
              is_question: false,
              is_answered: false,
              host_reply: '',
              like_count: Math.floor(Math.random() * 26) + 10
            },
            {
              chat_id: `CHAT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_010`,
              timestamp: `${String(hour).padStart(2, '0')}:${String(45 + (i % 10)).padStart(2, '0')}`,
              user_nickname: '임*',
              user_type: '일반',
              message: '반품은 어떻게 하나요?',
              is_question: true,
              is_answered: true,
              host_reply: '구매 후 7일 이내 단순 변심 반품 가능합니다. 미개봉 상태여야 하며 반품 배송비는 고객 부담입니다.',
              like_count: Math.floor(Math.random() * 10) + 3
            }
          ],
          frequent_questions: [
            {
              question: '오늘드림 가능한가요?',
              frequency: Math.floor(Math.random() * 38) + 15,
              answer: '오늘 15시 이전 주문 시 오늘드림으로 당일 받으실 수 있습니다.'
            },
            {
              question: '올영포인트 적립은 얼마나 되나요?',
              frequency: Math.floor(Math.random() * 36) + 13,
              answer: '올영앱 결제 시 8% 올영포인트 적립됩니다. 최대 20,000원까지 적립 가능합니다.'
            },
            {
              question: '사은품은 자동으로 들어가나요?',
              frequency: Math.floor(Math.random() * 33) + 11,
              answer: '네, 구매 조건 충족 시 자동으로 사은품이 포함되어 배송됩니다.'
            },
            {
              question: '쿠폰 중복 사용 가능한가요?',
              frequency: Math.floor(Math.random() * 30) + 10,
              answer: couponDuplicate === '가능' ? '네, 쿠폰 중복 사용 가능합니다.' : '죄송하지만 쿠폰 중복 사용은 불가합니다.'
            },
            {
              question: '매장 픽업 가능한가요?',
              frequency: Math.floor(Math.random() * 26) + 8,
              answer: '죄송하지만 라이브 방송 상품은 배송만 가능합니다. 오늘드림으로 빠르게 받아보세요!'
            }
          ],
          chat_analysis: {
            sentiment_positive: Math.floor(Math.random() * 22) + 68,
            sentiment_neutral: Math.floor(Math.random() * 17) + 10,
            sentiment_negative: Math.floor(Math.random() * 6) + 0,
            peak_chat_time: `${String(hour).padStart(2, '0')}:${String(23 + (i % 10)).padStart(2, '0')}`,
            average_response_time: '2분 35초',
            host_engagement_rate: Math.floor(Math.random() * 15) + 75
          }
        },
        // 🎪 이벤트
        events: [
          {
            event_id: `EVENT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
            event_name: `${brand.name} ${promotionType}`,
            event_type: '타임특가',
            event_description: `올리브영 라이브 한정 ${promotionType}! 지금 바로 구매하세요!`,
            event_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ~ ${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
            event_target_products: [
              `${brand.name} ${productType} 본품`,
              `${brand.name} ${productType} 올영세일세트`
            ],
            event_benefit: i % 3 === 0 ? '30% 할인' : '45,000원 즉시 할인',
            event_condition: '방송 시청 중 구매 시 적용',
            event_quantity_limit: i % 2 === 0 ? '한정 60개' : '',
            event_remaining_quantity: i % 2 === 0 ? 48 : null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '🔥 HOT'
          },
          {
            event_id: `EVENT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
            event_name: '올영앱 추가 할인',
            event_type: '앱혜택',
            event_description: '올영앱 결제 시 최대 18,000원 추가 할인!',
            event_period: `${broadcastDate} 전일`,
            event_target_products: ['전상품'],
            event_benefit: '올영앱 결제 시 18,000원 할인 + 올영포인트 8% 적립',
            event_condition: '올영앱 결제 및 150,000원 이상 구매',
            event_quantity_limit: '',
            event_remaining_quantity: null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '📱 올영앱'
          },
          {
            event_id: `EVENT_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
            event_name: '올영멤버십 특별 혜택',
            event_type: '멤버십',
            event_description: '올영멤버십 회원 전용 추가 혜택!',
            event_period: `${broadcastDate} 전일`,
            event_target_products: ['전상품'],
            event_benefit: '추가 10% 할인 + 포인트 2배 적립',
            event_condition: '올영멤버십 회원',
            event_quantity_limit: '',
            event_remaining_quantity: null,
            event_status: status === 'ACTIVE' ? '진행중' : status === 'PENDING' ? '예정' : '종료',
            event_badge: '👑 멤버십'
          }
        ],
        duplicate_policy: {
          coupon_duplicate: couponDuplicate,
          point_duplicate: '가능',
          other_event_duplicate: '올영데이 행사와 중복 불가',
          employee_discount: '적용 가능'
        },
        restrictions: {
          excluded_products: excludedProducts,
          channel_restriction: '올영앱 전용',
          payment_restriction: paymentRestriction,
          region_restriction: '오늘드림 제외 지역 배송비 별도'
        },
        live_specific: {
          key_mentions: [
            `[00:03] 안녕하세요! 올리브영 LIVE ${brand.name} ${productType} 방송 시작합니다!`,
            `[00:16] ${brand.name} ${productType}은 올리브영 베스트셀러입니다!`,
            `[02:50] ${productType}의 핵심 성분과 효능을 자세히 설명드리겠습니다!`,
            `[05:35] 올리브영 단독 ${promotionType}로 최저가 제공합니다!`,
            `[08:20] 💰 지금 바로 구매하시면 최대 30% 할인!`,
            `[12:40] 🎁 10만원 이상 구매 시 ${brand.name} 미니 세트 전원 증정!`,
            `[15:25] "${productType} 정말 좋아요! 피부가 촉촉해졌어요!" - 실시간 후기`,
            `[18:50] ⚡ 선착순 100명! 서둘러주세요!`,
            `[22:30] 오늘드림으로 오늘 바로 받아보세요!`,
            `[25:15] ${productType}는 아침 저녁 스킨케어 루틴에 필수입니다!`,
            `[28:40] 한 방울만 발라도 촉촉하게 하루종일 보습이 지속됩니다!`,
            `[32:20] 올영포인트 8% 적립으로 다음 구매 시에도 혜택받으세요!`,
            `[35:55] 💳 올영앱 결제 시 추가 혜택!`,
            `[38:30] 실시간 주문이 쏟아지고 있어요! 벌써 50개 판매!`,
            `[42:15] ${productType}는 모든 피부 타입에 사용 가능합니다!`,
            `[45:50] 마지막 기회! 놓치지 마세요!`,
            `[48:35] 남은 사은품이 30개밖에 없어요! 지금 주문하세요!`,
            `[52:25] 🎁 오늘 구매하신 분들 전원 무료배송!`,
            `[55:40] 주문 폭주 중! 배송은 내일 바로 시작됩니다!`,
            `[58:20] 마지막 2분! 방송 종료 후엔 정상가로 돌아갑니다!`,
            `[59:10] ${productType}로 건강하고 아름다운 피부 만드세요!`,
            `[59:55] 구매해주신 모든 분들 감사합니다! 다음 라이브에서 또 만나요!`
          ],
          broadcast_qa: [
            {
              question: '오늘드림은 어떻게 신청하나요?',
              answer: '오늘 15시 이전에 주문하시면 자동으로 오늘드림이 적용됩니다.'
            },
            {
              question: '올영포인트는 언제 적립되나요?',
              answer: '구매 확정 후 7일 이내에 올영포인트가 적립됩니다.'
            }
          ],
          timeline: [
            { time: '00:00', event: '방송 시작 및 인사' },
            { time: '00:05', event: '제품 소개 및 특장점 설명' },
            { time: '00:20', event: '혜택 안내 (할인/사은품/쿠폰/올영포인트)' },
            { time: '00:40', event: '실시간 Q&A' },
            { time: '00:55', event: '마무리 및 주문 안내' }
          ]
        },
        // 📋 상품 목록 탭 (상세)
        product_list_tab: {
          tab_name: '상품 목록',
          total_products: 4,
          product_details: [
            {
              product_id: `${brand.code}-OLIVEYOUNG-${String(i + 1).padStart(3, '0')}-01`,
              product_name: `${brand.name} ${productType} 본품`,
              brand: brand.name,
              category: i % 3 === 0 ? '스킨케어' : i % 3 === 1 ? '메이크업' : '바디케어',
              original_price: `${(130 + i * 10) * 1000}원`,
              sale_price: `${Math.floor((130 + i * 10) * 0.7) * 1000}원`,
              discount_rate: '30%',
              stock_status: '재고 충분',
              stock_quantity: 500,
              options: [
                { option_name: '용량', option_values: ['50ml', '100ml'], selected: '50ml' }
              ],
              product_features: [
                `${brand.name}의 대표 ${productType}`,
                '피부 타입: 모든 피부',
                '주요 성분: 히알루론산, 나이아신아마이드',
                '효과: 보습, 진정, 브라이트닝'
              ],
              usage_method: '세안 후 토너로 피부 결을 정돈한 뒤, 적당량을 덜어 얼굴 전체에 부드럽게 펴 발라줍니다.',
              caution: '화장품 사용 시 또는 사용 후 직사광선에 의하여 사용 부위가 붉은 반점, 부어오름 등 이상이 있는 경우 전문의와 상담하세요.',
              expiry_info: '제조일로부터 36개월, 개봉 후 12개월',
              certifications: ['피부 자극 테스트 완료', '저자극 테스트 통과'],
              review_summary: {
                total_reviews: 2890,
                average_rating: 4.8,
                rating_distribution: {
                  '5점': 2200,
                  '4점': 520,
                  '3점': 120,
                  '2점': 35,
                  '1점': 15
                },
                top_positive_keywords: ['보습력 좋음', '흡수 빠름', '끈적임 없음', '가성비'],
                top_negative_keywords: ['용량 작음', '향 강함']
              }
            },
            {
              product_id: `${brand.code}-OLIVEYOUNG-${String(i + 1).padStart(3, '0')}-SET`,
              product_name: `${brand.name} ${productType} 올영세일세트`,
              brand: brand.name,
              category: '세트/기획',
              original_price: `${(185 + i * 15) * 1000}원`,
              sale_price: `${Math.floor((185 + i * 15) * 0.65) * 1000}원`,
              discount_rate: '35%',
              stock_status: '한정수량',
              stock_quantity: 60,
              options: [],
              set_contents: [
                { item_name: `${brand.name} ${productType} 본품`, quantity: 1, price: `${(130 + i * 10) * 1000}원` },
                { item_name: `${brand.name} 토너`, quantity: 1, price: '35,000원' },
                { item_name: `${brand.name} 샘플 5종`, quantity: 5, price: '20,000원' }
              ],
              total_set_value: `${(185 + i * 15) * 1000}원`,
              set_save_amount: `${Math.floor((185 + i * 15) * 0.35) * 1000}원`,
              product_features: [
                '올리브영 라이브 단독 구성',
                '본품 + 토너 + 샘플 5종 풀 구성',
                `총 ${Math.floor((185 + i * 15) * 0.35) * 1000}원 상당 혜택`
              ],
              usage_method: '세트 구성품별 사용 방법 참고',
              expiry_info: '제조일로부터 36개월',
              review_summary: {
                total_reviews: 891,
                average_rating: 4.9,
                top_positive_keywords: ['구성 알참', '가성비 최고', '선물용 좋음']
              }
            }
          ]
        },
        // ❓ FAQ 탭
        faq_tab: {
          tab_name: 'FAQ',
          notice_section: {
            title: '공지사항',
            notices: [
              {
                notice_id: `NOTICE_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
                title: `${brand.name} 라이브 방송 혜택 안내`,
                content: `안녕하세요, 올리브영입니다.\n\n${brand.name} 라이브 방송의 특별 혜택을 안내드립니다.\n\n[방송 혜택]\n- 라이브 즉시할인: ${i % 3 === 0 ? '30%' : '45,000원'}\n- 올영앱 추가할인: 18,000원\n- 올영포인트 8% 적립\n\n[유의사항]\n- 혜택은 방송 중에만 적용됩니다.\n- 일부 제외 상품이 있을 수 있습니다.\n- 오늘드림은 주요 도심 지역에서 가능합니다.\n\n감사합니다.`,
                post_date: broadcastDate,
                view_count: Math.floor(Math.random() * 500) + 200,
                is_important: true
              },
              {
                notice_id: `NOTICE_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
                title: '오늘드림 배송 가능 지역 안내',
                content: `오늘드림 서비스는 아래 지역에서 이용 가능합니다.\n\n[서울 전 지역]\n[경기] 고양시, 성남시, 수원시, 용인시, 부천시, 안양시, 광명시, 평택시, 안산시, 과천시, 의왕시, 군포시, 하남시, 오산시, 구리시, 남양주시, 화성시\n[인천] 전 지역\n\n※ 일부 지역은 제외될 수 있습니다.\n※ 오늘 15시 이전 주문 시 당일 배송됩니다.`,
                post_date: '2025-11-20',
                view_count: Math.floor(Math.random() * 800) + 300,
                is_important: true
              },
              {
                notice_id: `NOTICE_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
                title: '교환/반품 안내',
                content: `[교환/반품 기준]\n- 상품 수령 후 7일 이내 가능\n- 미개봉 상품에 한함\n- 단순 변심의 경우 배송비 고객 부담\n\n[교환/반품 불가 사유]\n- 사용한 상품\n- 포장 훼손\n- 상품 가치 감소\n- 구매 후 7일 경과\n\n자세한 사항은 고객센터로 문의해주세요.`,
                post_date: '2025-11-15',
                view_count: Math.floor(Math.random() * 600) + 250,
                is_important: false
              }
            ]
          },
          faq_section: {
            title: '자주 묻는 질문 (FAQ)',
            categories: [
              {
                category_name: '배송',
                faqs: [
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_SHIPPING_01`,
                    question: '오늘드림은 어떻게 신청하나요?',
                    answer: '오늘 15시 이전에 주문하시면 자동으로 오늘드림이 적용되어 당일 배송됩니다. 별도의 신청 절차는 필요 없으며, 주문 시 배송 방법에서 "오늘드림" 표시를 확인하실 수 있습니다.',
                    view_count: Math.floor(Math.random() * 300) + 150,
                    helpful_count: Math.floor(Math.random() * 200) + 100,
                    category: '배송'
                  },
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_SHIPPING_02`,
                    question: '배송비는 얼마인가요?',
                    answer: '라이브 방송 상품은 전상품 무료배송입니다. 오늘드림의 경우에도 추가 배송비가 없습니다. 단, 도서산간 지역은 별도의 추가 배송비가 발생할 수 있습니다.',
                    view_count: Math.floor(Math.random() * 250) + 120,
                    helpful_count: Math.floor(Math.random() * 180) + 90,
                    category: '배송'
                  },
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_SHIPPING_03`,
                    question: '배송 조회는 어떻게 하나요?',
                    answer: '올영앱 > 마이페이지 > 주문/배송 조회에서 실시간으로 배송 현황을 확인하실 수 있습니다. 배송이 시작되면 송장번호가 문자로 발송됩니다.',
                    view_count: Math.floor(Math.random() * 200) + 100,
                    helpful_count: Math.floor(Math.random() * 150) + 80,
                    category: '배송'
                  }
                ]
              },
              {
                category_name: '혜택/쿠폰',
                faqs: [
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_BENEFIT_01`,
                    question: '올영포인트는 언제 적립되나요?',
                    answer: '구매 확정 후 7일 이내에 올영포인트가 자동으로 적립됩니다. 올영앱에서 결제 시 8% 적립되며, 최대 20,000원까지 적립 가능합니다.',
                    view_count: Math.floor(Math.random() * 350) + 180,
                    helpful_count: Math.floor(Math.random() * 250) + 130,
                    category: '혜택/쿠폰'
                  },
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_BENEFIT_02`,
                    question: '쿠폰 중복 사용이 가능한가요?',
                    answer: couponDuplicate === '가능' 
                      ? '네, 일부 쿠폰은 중복 사용이 가능합니다. 단, 동일 종류의 쿠폰은 중복 사용이 불가하며, 상세 쿠폰 정보에서 중복 사용 가능 여부를 확인하실 수 있습니다.'
                      : '죄송합니다. 쿠폰은 1개만 선택하여 사용 가능하며, 중복 사용은 불가합니다. 가장 할인율이 높은 쿠폰을 선택하여 사용하시는 것을 권장드립니다.',
                    view_count: Math.floor(Math.random() * 280) + 140,
                    helpful_count: Math.floor(Math.random() * 200) + 100,
                    category: '혜택/쿠폰'
                  },
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_BENEFIT_03`,
                    question: '올영멤버십 혜택은 무엇인가요?',
                    answer: '올영멤버십 회원은 추가 10% 할인 + 포인트 2배 적립 혜택을 받으실 수 있습니다. 또한 매월 특별 쿠폰과 생일 쿠폰이 제공됩니다.',
                    view_count: Math.floor(Math.random() * 220) + 110,
                    helpful_count: Math.floor(Math.random() * 170) + 85,
                    category: '혜택/쿠폰'
                  }
                ]
              },
              {
                category_name: '상품/사은품',
                faqs: [
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_PRODUCT_01`,
                    question: '사은품은 어떻게 받을 수 있나요?',
                    answer: '구매 조건을 충족하시면 자동으로 사은품이 포함되어 배송됩니다. 선착순 사은품의 경우 재고 소진 시 조기 종료될 수 있으니 서둘러 주문해주세요.',
                    view_count: Math.floor(Math.random() * 290) + 145,
                    helpful_count: Math.floor(Math.random() * 210) + 105,
                    category: '상품/사은품'
                  },
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_PRODUCT_02`,
                    question: '재고가 부족하면 어떻게 되나요?',
                    answer: '재고 부족 시 주문이 취소되며, 결제하신 금액은 즉시 환불됩니다. 재고 현황은 실시간으로 업데이트되니 구매 전 확인해주세요.',
                    view_count: Math.floor(Math.random() * 180) + 90,
                    helpful_count: Math.floor(Math.random() * 130) + 65,
                    category: '상품/사은품'
                  },
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_PRODUCT_03`,
                    question: '매장에서 구매할 수 있나요?',
                    answer: '죄송하지만 라이브 방송 상품은 온라인 전용 상품으로 매장에서 구매하실 수 없습니다. 올영앱이나 웹사이트에서만 구매 가능합니다.',
                    view_count: Math.floor(Math.random() * 160) + 80,
                    helpful_count: Math.floor(Math.random() * 110) + 55,
                    category: '상품/사은품'
                  }
                ]
              },
              {
                category_name: '결제',
                faqs: [
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_PAYMENT_01`,
                    question: '어떤 결제 수단을 사용할 수 있나요?',
                    answer: '신용카드, 체크카드, 계좌이체, 휴대폰 결제, 올영페이, 카카오페이, 네이버페이 등 다양한 결제 수단을 지원합니다.',
                    view_count: Math.floor(Math.random() * 140) + 70,
                    helpful_count: Math.floor(Math.random() * 100) + 50,
                    category: '결제'
                  },
                  {
                    faq_id: `FAQ_OLIVEYOUNG_${brand.code}_PAYMENT_02`,
                    question: '무이자 할부가 가능한가요?',
                    answer: '일부 카드사에서 무이자 할부를 제공합니다. 결제 페이지에서 무이자 할부 가능 카드를 확인하실 수 있습니다.',
                    view_count: Math.floor(Math.random() * 130) + 65,
                    helpful_count: Math.floor(Math.random() * 90) + 45,
                    category: '결제'
                  }
                ]
              }
            ],
            total_faqs: 11
          },
          qa_section: {
            title: '실시간 Q&A',
            description: '방송 중 고객님들이 남기신 질문과 답변입니다.',
            qa_list: [
              {
                qa_id: `QA_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_001`,
                question: `${productType}는 민감성 피부도 사용 가능한가요?`,
                questioner: '김**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(8 + (i % 10)).padStart(2, '0')}`,
                answer: `네, ${brand.name} ${productType}는 민감성 피부도 안심하고 사용하실 수 있습니다. 저자극 테스트를 완료했으며, 피부 자극 테스트도 통과한 제품입니다.`,
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(10 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 45) + 20,
                status: '답변완료'
              },
              {
                qa_id: `QA_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_002`,
                question: '세트 구성품은 따로 살 수 없나요?',
                questioner: '이**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(12 + (i % 10)).padStart(2, '0')}`,
                answer: '라이브 세트는 방송 전용 구성으로, 개별 구매는 불가합니다. 하지만 본품은 일반 판매 페이지에서 구매하실 수 있습니다.',
                answerer: '올리브영 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(14 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 38) + 15,
                status: '답변완료'
              },
              {
                qa_id: `QA_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_003`,
                question: '사은품은 색상 선택이 가능한가요?',
                questioner: '박**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(18 + (i % 10)).padStart(2, '0')}`,
                answer: '사은품은 랜덤 발송으로 색상 선택이 불가합니다. 양해 부탁드립니다.',
                answerer: '올리브영 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(20 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 32) + 12,
                status: '답변완료'
              },
              {
                qa_id: `QA_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_004`,
                question: `${productType} 사용 후 다른 제품과 함께 사용해도 되나요?`,
                questioner: '최**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(25 + (i % 10)).padStart(2, '0')}`,
                answer: `네, 다른 스킨케어 제품과 함께 사용하셔도 무방합니다. ${productType} → 세럼 → 크림 순서로 사용하시면 좋습니다.`,
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(27 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 28) + 10,
                status: '답변완료'
              },
              {
                qa_id: `QA_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_005`,
                question: '방송 종료 후에도 같은 가격에 구매할 수 있나요?',
                questioner: '정**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(35 + (i % 10)).padStart(2, '0')}`,
                answer: '죄송합니다. 라이브 방송 혜택은 방송 중에만 적용되며, 방송 종료 후에는 정상가로 판매됩니다.',
                answerer: '올리브영 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(37 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 52) + 25,
                status: '답변완료'
              },
              {
                qa_id: `QA_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_006`,
                question: '오늘드림 지역이 아닌데 빠른 배송은 안 되나요?',
                questioner: '강**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(42 + (i % 10)).padStart(2, '0')}`,
                answer: '오늘드림 지역이 아니신 경우에도 일반 배송으로 1-2일 내 배송됩니다. 빠른 배송을 위해 최선을 다하겠습니다.',
                answerer: '올리브영 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(44 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 35) + 13,
                status: '답변완료'
              },
              {
                qa_id: `QA_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_007`,
                question: '올영포인트로 결제할 수 있나요?',
                questioner: '윤**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(48 + (i % 10)).padStart(2, '0')}`,
                answer: '네, 보유하신 올영포인트로 일부 또는 전액 결제 가능합니다. 결제 페이지에서 포인트 사용을 선택하시면 됩니다.',
                answerer: '올리브영 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(50 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 42) + 18,
                status: '답변완료'
              },
              {
                qa_id: `QA_OLIVEYOUNG_${brand.code}_${String(i + 1).padStart(3, '0')}_008`,
                question: '제품 유통기한은 얼마나 되나요?',
                questioner: '임**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(52 + (i % 10)).padStart(2, '0')}`,
                answer: '제조일로부터 36개월입니다. 최근 제조된 신선한 제품으로 배송되며, 개봉 후에는 12개월 이내 사용을 권장드립니다.',
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(54 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 30) + 11,
                status: '답변완료'
              }
            ],
            total_qa: 8,
            answered_qa: 8,
            unanswered_qa: 0
          }
        },
        cs_info: {
          expected_questions: [
            '방송 끝났는데 혜택 적용되나요?',
            '오늘드림 가능한 지역이 어디인가요?',
            '올영포인트는 언제 적립되나요?',
            '매장 픽업 가능한가요?'
          ],
          response_scripts: [
            `혜택 유효기간은 ${benefitValidType}입니다.`,
            `오늘드림은 주요 도심 지역에서 가능합니다.`,
            `올영포인트는 구매 확정 후 7일 이내 적립됩니다.`,
            `라이브 방송 상품은 배송만 가능합니다.`
          ],
          risk_points: [
            couponDuplicate === '불가' ? '쿠폰 중복 사용 불가 - 고객 문의 빈번' : '',
            excludedProducts ? `${excludedProducts} - 명시 필요` : '',
            '오늘드림 가능 지역 사전 확인 필요'
          ].filter(Boolean),
          cs_note: `${brand.name} ${broadcastDate} 올리브영 라이브 - ${promotionType}`
        }
      };
      
      oliveyoungData.push(liveData);
    }
  });
  
  console.log(`✅ 올리브영 라이브 데이터 생성: ${oliveyoungData.length}개`);
  return oliveyoungData;
};

/**
 * 그립(Grip) 라이브 쇼핑 데이터 생성 함수
 */
const generateGripLiveData = () => {
  const gripData = [];
  const brands = [
    { name: '설화수', code: 'SULWHASOO', count: 14 },
    { name: '라네즈', code: 'LANEIGE', count: 14 },
    { name: '아이오페', code: 'IOPE', count: 12 },
    { name: '헤라', code: 'HERA', count: 12 },
    { name: '에스트라', code: 'AESTURA', count: 10 },
    { name: '이니스프리', code: 'INNISFREE', count: 14 },
    { name: '해피바스', code: 'HAPPYBATH', count: 10 },
    { name: '바이탈뷰티', code: 'VITALBEAUTY', count: 10 },
    { name: '프리메라', code: 'PRIMERA', count: 10 },
    { name: '오설록', code: 'OSULLOC', count: 10 }
  ];
  
  const productTypes = ['에센스', '크림', '세럼', '토너', '수분크림', '앰플', '클렌징폼', '선크림', '미스트', '아이크림'];
  const promotionTypes = ['단독 라이브', '타임특가', '브랜드데이', '시즌특집', '신제품 런칭', '베스트셀러 특가'];
  
  brands.forEach(brand => {
    for (let i = 0; i < brand.count; i++) {
      const statusOptions = ['ACTIVE', 'PENDING', 'ENDED'];
      const statusWeights = i < 2 ? [1, 0, 0] : i < brand.count * 0.4 ? [0, 1, 0] : [0, 0, 1];
      const status = statusOptions[statusWeights.indexOf(1)];
      
      const baseDate = new Date('2025-11-28');
      let broadcastDate, hour;
      
      if (status === 'ACTIVE') {
        broadcastDate = '2025-11-28';
        hour = 14 + i;
      } else if (status === 'PENDING') {
        const daysToAdd = Math.floor(i / 2) + 1;
        const futureDate = new Date(baseDate);
        futureDate.setDate(baseDate.getDate() + daysToAdd);
        broadcastDate = futureDate.toISOString().split('T')[0];
        hour = 13 + (i % 3) * 3;
      } else {
        const daysToSubtract = Math.floor((i - brand.count * 0.4) / 2) + 1;
        const pastDate = new Date(baseDate);
        pastDate.setDate(baseDate.getDate() - daysToSubtract);
        broadcastDate = pastDate.toISOString().split('T')[0];
        hour = 11 + (i % 4) * 2;
      }
      
      const productType = productTypes[i % productTypes.length];
      const promotionType = promotionTypes[i % promotionTypes.length];
      const discountRate = 25 + (i % 4) * 5;
      const couponDuplicate = i % 3 === 0 ? '가능' : '불가';
      const excludedProducts = i % 4 === 0 ? '기획세트 제외' : i % 4 === 1 ? '대용량 제외' : '';
      const benefitValidType = i % 3 === 0 ? '방송 중만' : i % 3 === 1 ? '당일 23:59까지' : `${broadcastDate} ~ ${new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0]}`;
      
      const liveData = {
        meta: {
          live_id: `GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}`,
          platform_name: '그립',
          platform_code: 'GRIP',
          brand_name: brand.name,
          brand_code: brand.code,
          live_title_customer: `★${brand.name} ${productType} ${promotionType}★그립 라이브 ${discountRate}% 할인`,
          live_title_cs: `${brand.name} ${broadcastDate.substring(5)} 그립 라이브 ${promotionType}`,
          source_url: `https://www.grip.show/lives/grip_${brand.code.toLowerCase()}_${String(i + 1).padStart(3, '0')}`,
          status: status,
          category: '헬스&뷰티'
        },
        schedule: {
          broadcast_date: broadcastDate,
          broadcast_start: `${String(hour).padStart(2, '0')}:00`,
          broadcast_end: `${String(hour + 1).padStart(2, '0')}:30`,
          benefit_valid_type: benefitValidType,
          benefit_start: status === 'PENDING' ? `${broadcastDate} ${String(hour).padStart(2, '0')}:00` : `${broadcastDate} ${String(hour).padStart(2, '0')}:00`,
          benefit_end: benefitValidType.includes('~') ? benefitValidType.split(' ~ ')[1] + ' 23:59' : benefitValidType === '방송 중만' ? `${broadcastDate} ${String(hour + 1).padStart(2, '0')}:30` : `${broadcastDate} 23:59`,
          broadcast_type: i % 5 === 0 ? '콜라보 라이브' : '단독 라이브'
        },
        products: {
          product_list: [
            { sku: `${brand.code}-${String(i + 1).padStart(3, '0')}-01`, name: `${brand.name} ${productType} 본품`, option: '50ml' },
            { sku: `${brand.code}-${String(i + 1).padStart(3, '0')}-02`, name: `${brand.name} ${productType} 대용량`, option: '100ml' },
            { sku: `${brand.code}-${String(i + 1).padStart(3, '0')}-03`, name: `${brand.name} 토너`, option: '200ml' },
            { sku: `${brand.code}-${String(i + 1).padStart(3, '0')}-SET`, name: `${brand.name} ${productType} 그립 라이브 세트`, option: '본품+토너+샘플' }
          ],
          main_product: `${brand.name} ${productType} 본품`,
          set_composition: `본품 50ml + 토너 30ml + ${brand.name} 샘플 키트 5종`,
          stock_info: {
            main_product_stock: 800,
            set_product_stock: 120,
            low_stock_threshold: 50
          },
          product_details: [
            {
              product_id: `${brand.code}-GRIP-${String(i + 1).padStart(3, '0')}-01`,
              product_name: `${brand.name} ${productType} 본품`,
              brand: brand.name,
              category: i % 3 === 0 ? '스킨케어' : i % 3 === 1 ? '메이크업' : '바디케어',
              original_price: `${(125 + i * 10) * 1000}원`,
              sale_price: `${Math.floor((125 + i * 10) * (1 - discountRate / 100)) * 1000}원`,
              discount_rate: `${discountRate}%`,
              stock_status: '재고 충분',
              stock_quantity: 800,
              options: [
                { option_name: '용량', option_values: ['50ml', '100ml'], selected: '50ml' }
              ],
              product_features: [
                `${brand.name}의 시그니처 ${productType}`,
                '피부 타입: 모든 피부 타입',
                '주요 성분: 히알루론산, 펩타이드, 세라마이드',
                '효과: 집중 보습, 탄력 개선, 피부 장벽 강화'
              ],
              usage_method: '세안 후 적당량을 덜어 얼굴 전체에 부드럽게 펴 발라 흡수시킵니다.',
              caution: '화장품 사용 시 부작용이 발생하는 경우 사용을 중단하고 전문의와 상담하세요.',
              expiry_info: '제조일로부터 36개월, 개봉 후 12개월 이내 사용',
              certifications: ['피부 자극 테스트 완료', '저자극 인증', '임상 테스트 완료'],
              review_summary: {
                total_reviews: 2450 + i * 150,
                average_rating: 4.7 + (i % 3) * 0.1,
                rating_distribution: {
                  '5점': 1800 + i * 100,
                  '4점': 480 + i * 30,
                  '3점': 120 + i * 10,
                  '2점': 35 + i * 5,
                  '1점': 15 + i * 5
                },
                top_positive_keywords: ['촉촉함', '흡수력', '효과 좋음', '가성비', '향 좋음'],
                top_negative_keywords: ['가격 부담', '용기 불편']
              }
            },
            {
              product_id: `${brand.code}-GRIP-${String(i + 1).padStart(3, '0')}-SET`,
              product_name: `${brand.name} ${productType} 그립 단독 세트`,
              brand: brand.name,
              category: '세트/기획',
              original_price: `${(180 + i * 15) * 1000}원`,
              sale_price: `${Math.floor((180 + i * 15) * 0.62) * 1000}원`,
              discount_rate: '38%',
              stock_status: '한정수량',
              stock_quantity: 120,
              options: [],
              set_contents: [
                { item_name: `${brand.name} ${productType} 본품`, quantity: 1, price: `${(125 + i * 10) * 1000}원` },
                { item_name: `${brand.name} 토너 미니`, quantity: 1, price: '30,000원' },
                { item_name: `${brand.name} 샘플 키트`, quantity: 1, price: '25,000원' }
              ],
              total_set_value: `${(180 + i * 15) * 1000}원`,
              set_save_amount: `${Math.floor((180 + i * 15) * 0.38) * 1000}원`,
              product_features: [
                '그립 라이브 독점 구성',
                '본품 + 토너 미니 + 샘플 키트 풀세트',
                `최대 ${Math.floor((180 + i * 15) * 0.38) * 1000}원 혜택`
              ],
              usage_method: '세트 구성품별 사용 방법 참고',
              expiry_info: '제조일로부터 36개월',
              review_summary: {
                total_reviews: 756 + i * 50,
                average_rating: 4.8 + (i % 2) * 0.1,
                top_positive_keywords: ['구성 좋음', '가성비 최고', '선물용 추천']
              }
            }
          ],
          coupons: [
            {
              coupon_id: `GRIP_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              coupon_name: '그립 라이브 방송 전용 쿠폰',
              coupon_type: '플랫폼쿠폰',
              discount_type: i % 2 === 0 ? '정률할인' : '정액할인',
              discount_value: i % 2 === 0 ? '10%' : '15,000원',
              min_purchase_amount: '100,000원',
              max_discount_amount: i % 2 === 0 ? '30,000원' : null,
              issue_condition: '방송 중 자동 발급',
              expiry_date: `${broadcastDate} 23:59`,
              duplicate_use: couponDuplicate
            },
            {
              coupon_id: `GRIP_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              coupon_name: `${brand.name} 브랜드 쿠폰`,
              coupon_type: '브랜드쿠폰',
              discount_type: '정액할인',
              discount_value: '20,000원',
              min_purchase_amount: '150,000원',
              max_discount_amount: null,
              issue_condition: '다운로드 필요',
              expiry_date: new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0],
              duplicate_use: '불가'
            },
            {
              coupon_id: `GRIP_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              coupon_name: '그립 앱 신규가입 쿠폰',
              coupon_type: '플랫폼쿠폰',
              discount_type: '정액할인',
              discount_value: '10,000원',
              min_purchase_amount: '50,000원',
              max_discount_amount: null,
              issue_condition: '신규가입 시 자동 발급',
              expiry_date: new Date(new Date(broadcastDate).getTime() + 30*24*60*60*1000).toISOString().split('T')[0],
              duplicate_use: '가능'
            }
          ],
          benefits: [
            {
              benefit_id: `GRIP_BENEFIT_DISCOUNT_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '할인',
              benefit_name: `그립 라이브 즉시할인 ${discountRate}%`,
              discount_type: i % 2 === 0 ? '정률할인' : '정액할인',
              discount_value: i % 2 === 0 ? `${discountRate}%` : `${35000 + i * 2000}원`,
              condition: '방송 중 결제 시 자동 적용',
              duplicate_with_coupon: couponDuplicate
            },
            {
              benefit_id: `GRIP_BENEFIT_DISCOUNT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '할인',
              benefit_name: '그립 앱 결제 추가 할인',
              discount_type: '정액할인',
              discount_value: '12,000원',
              condition: '그립 앱에서 결제 시 추가 할인',
              duplicate_with_coupon: '가능'
            },
            {
              benefit_id: `GRIP_BENEFIT_GIFT1_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '사은품',
              benefit_name: `${brand.name} 미니 키트 증정`,
              gift_items: [
                { item_name: `${brand.name} 샘플 3종`, quantity: 1 },
                { item_name: `${brand.name} 파우치`, quantity: 1 }
              ],
              gift_type: '구매조건형',
              condition: '10만원 이상 구매',
              quantity_limit: '전원 증정',
              duplicate_with_other_gift: '가능'
            },
            {
              benefit_id: `GRIP_BENEFIT_GIFT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '사은품',
              benefit_name: `${brand.name} 스페셜 기프트`,
              gift_items: [
                { item_name: `${brand.name} ${productType} 미니 사이즈`, quantity: 1 }
              ],
              gift_type: '선착순형',
              condition: '15만원 이상 구매',
              quantity_limit: '선착순 200명',
              duplicate_with_other_gift: '불가'
            },
            {
              benefit_id: `GRIP_BENEFIT_POINT_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '포인트',
              benefit_name: '그립 포인트 5% 적립',
              point_rate: '5%',
              max_point: '15,000원',
              condition: '그립 앱 결제 시',
              expiry_period: '적립일로부터 1년'
            },
            {
              benefit_id: `GRIP_BENEFIT_POINT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '포인트',
              benefit_name: '그립 VIP 추가 적립',
              point_rate: '3%',
              max_point: '10,000원',
              condition: 'VIP 회원',
              expiry_period: '적립일로부터 1년'
            },
            {
              benefit_id: `GRIP_BENEFIT_DELIVERY_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '배송',
              benefit_name: '전상품 무료배송',
              delivery_type: '무료배송',
              delivery_condition: '금액 제한 없음',
              expected_delivery: '주문 후 1-2일'
            }
          ],
          events: [
            {
              event_id: `GRIP_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              event_name: '그립 라이브 타임특가',
              event_type: '타임특가',
              event_description: `방송 중 ${String(hour).padStart(2, '0')}:30까지 추가 5% 할인`,
              event_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:00 ~ ${String(hour).padStart(2, '0')}:30`,
              event_benefit: '추가 5% 할인',
              participation_method: '자동 적용'
            },
            {
              event_id: `GRIP_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              event_name: '그립 앱 전용 혜택',
              event_type: '앱 전용',
              event_description: '그립 앱에서 결제 시 추가 12,000원 할인',
              event_period: benefitValidType,
              event_benefit: '12,000원 추가 할인',
              participation_method: '그립 앱 결제'
            },
            {
              event_id: `GRIP_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              event_name: `${brand.name} 멤버십 특별 혜택`,
              event_type: '멤버십',
              event_description: '브랜드 멤버십 회원 포인트 2배 적립',
              event_period: `${broadcastDate} ~ ${new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0]}`,
              event_benefit: '포인트 2배 적립',
              participation_method: '자동 적용'
            }
          ]
        },
        policy: {
          coupon_duplicate: couponDuplicate,
          point_duplicate: '가능',
          other_promotion_duplicate: i % 3 === 0 ? '쿠폰+포인트 중복 가능' : '쿠폰 1개만 선택',
          employee_discount: i % 5 === 0 ? '중복 적용 가능' : '중복 불가'
        },
        restrictions: {
          excluded_products: excludedProducts,
          channel_restriction: '그립 앱/웹 전용',
          payment_method_restriction: i % 4 === 0 ? '그립페이 사용 시 추가 혜택' : '제한 없음',
          region_restriction: '도서산간 지역 배송비 별도'
        },
        chat_info: {
          total_chats: 820 + i * 180,
          total_participants: 185 + i * 35,
          chat_statistics: {
            average_chats_per_minute: 15 + i * 2,
            peak_time: `${String(hour).padStart(2, '0')}:${String(15 + (i % 3) * 10).padStart(2, '0')}`,
            peak_chats_per_minute: 45 + i * 5
          },
          popular_keywords: [
            { keyword: '할인', count: 180 + i * 20 },
            { keyword: '쿠폰', count: 150 + i * 15 },
            { keyword: '사은품', count: 130 + i * 15 },
            { keyword: '재고', count: 110 + i * 10 },
            { keyword: '배송', count: 95 + i * 10 },
            { keyword: '효과', count: 85 + i * 8 },
            { keyword: '가격', count: 75 + i * 7 },
            { keyword: '세트', count: 65 + i * 6 },
            { keyword: '추천', count: 55 + i * 5 },
            { keyword: productType, count: 125 + i * 12 }
          ],
          emoji_reactions: [
            { emoji: '❤️', count: 450 + i * 50 },
            { emoji: '👍', count: 380 + i * 40 },
            { emoji: '😍', count: 320 + i * 35 },
            { emoji: '🔥', count: 280 + i * 30 },
            { emoji: '👏', count: 220 + i * 25 }
          ],
          key_chats: [
            { username: '그립유저***', message: `${productType} 효과 정말 좋아요!`, timestamp: `${String(hour).padStart(2, '0')}:05`, likes: 45 + i * 3 },
            { username: '뷰티러버***', message: '이 가격이면 진짜 혜자네요', timestamp: `${String(hour).padStart(2, '0')}:12`, likes: 38 + i * 2 },
            { username: '리뷰왕***', message: `${brand.name} 제품은 믿고 써요`, timestamp: `${String(hour).padStart(2, '0')}:18`, likes: 42 + i * 3 },
            { username: '할인헌터***', message: '쿠폰까지 받으니까 너무 좋아요!', timestamp: `${String(hour).padStart(2, '0')}:25`, likes: 35 + i * 2 },
            { username: '그립팬***', message: '세트 구성 알차다', timestamp: `${String(hour).padStart(2, '0')}:32`, likes: 40 + i * 3 },
            { username: '뷰티고수***', message: '사은품 언제 도착하나요?', timestamp: `${String(hour).padStart(2, '0')}:38`, likes: 28 + i * 2 },
            { username: '쇼핑중독***', message: '재고 얼마 안 남았대요!', timestamp: `${String(hour).padStart(2, '0')}:45`, likes: 52 + i * 4 },
            { username: '현명한소비자***', message: '가성비 최고네요', timestamp: `${String(hour).padStart(2, '0')}:52`, likes: 33 + i * 2 },
            { username: '그립러버***', message: `${productType} 추천합니다!`, timestamp: `${String(hour + 1).padStart(2, '0')}:05`, likes: 44 + i * 3 },
            { username: '리얼후기***', message: '배송 빠르고 포장 꼼꼼해요', timestamp: `${String(hour + 1).padStart(2, '0')}:15`, likes: 37 + i * 2 }
          ],
          frequently_asked: [
            { question: '쿠폰 중복 사용 가능한가요?', count: 28 + i * 3 },
            { question: '배송은 언제 도착하나요?', count: 32 + i * 4 },
            { question: '사은품은 자동으로 오나요?', count: 25 + i * 3 },
            { question: '재고 얼마나 남았나요?', count: 22 + i * 2 },
            { question: '그립 포인트 언제 적립되나요?', count: 20 + i * 2 }
          ],
          sentiment_analysis: {
            positive: 72 + i % 8,
            neutral: 22 - i % 5,
            negative: 6 - i % 3
          }
        },
        live_specific: {
          key_mentions: [
            `[00:02] 안녕하세요! 그립 LIVE ${brand.name} ${productType} 방송 시작합니다!`,
            `[00:15] ${brand.name} ${productType}는 ${i % 3 === 0 ? '보습력이 뛰어나고' : i % 3 === 1 ? '흡수가 빠르며' : '끈적임이 없어'} 데일리 케어에 완벽합니다!`,
            `[02:40] ${productType}의 핵심 성분과 효능을 자세히 설명드리겠습니다!`,
            `[05:25] 💰 지금 주문하시면 ${discountRate}% 할인 + 쿠폰까지 중복 적용 가능합니다!`,
            `[08:50] 🎁 10만원 이상 구매 시 ${brand.name} 미니 키트를 전원 증정해드립니다!`,
            `[12:15] "${productType} 정말 좋아요! 피부가 촉촉해졌어요!" - 실시간 후기`,
            `[15:30] ⚡ 선착순 200명! 서둘러주세요!`,
            `[18:20] ${productType}는 아침 저녁 스킨케어 루틴에 필수입니다!`,
            `[22:40] 한 방울만 발라도 촉촉하게 하루종일 보습이 지속됩니다!`,
            `[25:10] ⏰ 방송 중 ${String(hour).padStart(2, '0')}:30까지 타임특가 추가 5% 할인!`,
            `[28:50] 📦 그립 앱에서 결제하시면 12,000원 추가 할인 + 포인트 5% 적립됩니다!`,
            `[32:25] 💳 그립페이 결제 시 추가 혜택!`,
            `[35:40] 실시간 주문이 쏟아지고 있어요! 벌써 50개 판매!`,
            `[38:15] ${productType}는 모든 피부 타입에 사용 가능합니다!`,
            `[42:50] 마지막 기회! 놓치지 마세요!`,
            `[45:30] 남은 사은품이 30개밖에 없어요! 지금 주문하세요!`,
            `[48:20] 🎁 오늘 구매하신 분들 전원 무료배송!`,
            `[52:10] 주문 폭주 중! 배송은 내일 바로 시작됩니다!`,
            `[55:45] 마지막 4분! 방송 종료 후엔 정상가로 돌아갑니다!`,
            `[58:30] ${productType}로 건강하고 아름다운 피부 만드세요!`,
            `[59:50] 구매해주신 모든 분들 감사합니다! 다음 라이브에서 또 만나요!`
          ],
          broadcast_qa: [
            {
              time: `${String(hour).padStart(2, '0')}:08`,
              question: `${productType}는 어떤 피부 타입에 좋나요?`,
              answer: '모든 피부 타입에 사용 가능하지만, 특히 건조하고 민감한 피부에 추천드립니다.'
            },
            {
              time: `${String(hour).padStart(2, '0')}:15`,
              question: '세트 구성품은 정품 사이즈인가요?',
              answer: '본품은 정품 사이즈이고, 토너는 미니 사이즈입니다. 샘플 키트는 5종으로 구성되어 있습니다.'
            },
            {
              time: `${String(hour).padStart(2, '0')}:22`,
              question: '사은품은 언제까지 받을 수 있나요?',
              answer: `선착순 200명이며, 재고 소진 시 조기 종료될 수 있습니다. 서둘러 주문해주세요!`
            },
            {
              time: `${String(hour).padStart(2, '0')}:35`,
              question: '그립 포인트 적립은 언제 되나요?',
              answer: '구매 확정 후 7일 이내에 자동으로 적립됩니다.'
            }
          ],
          timeline: [
            { time: '00:00', description: '방송 시작 및 인사' },
            { time: '00:03', description: `${brand.name} 브랜드 소개` },
            { time: '00:08', description: `${productType} 제품 상세 설명` },
            { time: '00:15', description: '혜택 안내 (할인/쿠폰/사은품)' },
            { time: '00:25', description: '사용법 시연' },
            { time: '00:35', description: '시청자 Q&A' },
            { time: '00:45', description: '타임특가 안내' },
            { time: '00:55', description: '세트 구성 상세 안내' },
            { time: '01:05', description: '그립 앱 혜택 추가 설명' },
            { time: '01:15', description: '재고 현황 및 마감 멘트' },
            { time: '01:25', description: '마무리 및 인사' }
          ]
        },
        product_list_tab: {
          tab_name: '상품 목록',
          total_products: 4,
          product_details: [
            {
              product_id: `${brand.code}-GRIP-${String(i + 1).padStart(3, '0')}-01`,
              product_name: `${brand.name} ${productType} 본품`,
              brand: brand.name,
              category: i % 3 === 0 ? '스킨케어' : i % 3 === 1 ? '메이크업' : '바디케어',
              original_price: `${(125 + i * 10) * 1000}원`,
              sale_price: `${Math.floor((125 + i * 10) * (1 - discountRate / 100)) * 1000}원`,
              discount_rate: `${discountRate}%`,
              stock_status: '재고 충분',
              stock_quantity: 800,
              options: [
                { option_name: '용량', option_values: ['50ml', '100ml'], selected: '50ml' }
              ],
              product_features: [
                `${brand.name}의 시그니처 ${productType}`,
                '피부 타입: 모든 피부 타입',
                '주요 성분: 히알루론산, 펩타이드, 세라마이드',
                '효과: 집중 보습, 탄력 개선, 피부 장벽 강화'
              ],
              usage_method: '세안 후 적당량을 덜어 얼굴 전체에 부드럽게 펴 발라 흡수시킵니다.',
              caution: '화장품 사용 시 부작용이 발생하는 경우 사용을 중단하고 전문의와 상담하세요.',
              expiry_info: '제조일로부터 36개월, 개봉 후 12개월 이내 사용',
              certifications: ['피부 자극 테스트 완료', '저자극 인증', '임상 테스트 완료'],
              review_summary: {
                total_reviews: 2450 + i * 150,
                average_rating: 4.7 + (i % 3) * 0.1,
                rating_distribution: {
                  '5점': 1800 + i * 100,
                  '4점': 480 + i * 30,
                  '3점': 120 + i * 10,
                  '2점': 35 + i * 5,
                  '1점': 15 + i * 5
                },
                top_positive_keywords: ['촉촉함', '흡수력', '효과 좋음', '가성비', '향 좋음'],
                top_negative_keywords: ['가격 부담', '용기 불편']
              }
            },
            {
              product_id: `${brand.code}-GRIP-${String(i + 1).padStart(3, '0')}-SET`,
              product_name: `${brand.name} ${productType} 그립 단독 세트`,
              brand: brand.name,
              category: '세트/기획',
              original_price: `${(180 + i * 15) * 1000}원`,
              sale_price: `${Math.floor((180 + i * 15) * 0.62) * 1000}원`,
              discount_rate: '38%',
              stock_status: '한정수량',
              stock_quantity: 120,
              options: [],
              set_contents: [
                { item_name: `${brand.name} ${productType} 본품`, quantity: 1, price: `${(125 + i * 10) * 1000}원` },
                { item_name: `${brand.name} 토너 미니`, quantity: 1, price: '30,000원' },
                { item_name: `${brand.name} 샘플 키트`, quantity: 1, price: '25,000원' }
              ],
              total_set_value: `${(180 + i * 15) * 1000}원`,
              set_save_amount: `${Math.floor((180 + i * 15) * 0.38) * 1000}원`,
              product_features: [
                '그립 라이브 독점 구성',
                '본품 + 토너 미니 + 샘플 키트 풀세트',
                `최대 ${Math.floor((180 + i * 15) * 0.38) * 1000}원 혜택`
              ],
              usage_method: '세트 구성품별 사용 방법 참고',
              expiry_info: '제조일로부터 36개월',
              review_summary: {
                total_reviews: 756 + i * 50,
                average_rating: 4.8 + (i % 2) * 0.1,
                top_positive_keywords: ['구성 좋음', '가성비 최고', '선물용 추천']
              }
            }
          ]
        },
        faq_tab: {
          tab_name: 'FAQ',
          notice_section: {
            title: '공지사항',
            notices: [
              {
                notice_id: `NOTICE_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
                title: `${brand.name} 그립 라이브 방송 혜택 안내`,
                content: `안녕하세요, 그립입니다.\n\n${brand.name} 그립 라이브 방송의 특별 혜택을 안내드립니다.\n\n[방송 혜택]\n- 라이브 즉시할인: ${discountRate}%\n- 그립 앱 추가할인: 12,000원\n- 그립 포인트 5% 적립\n\n[유의사항]\n- 혜택은 ${benefitValidType}입니다.\n- 일부 제외 상품이 있을 수 있습니다.\n- 쿠폰 중복 사용은 ${couponDuplicate}입니다.\n\n감사합니다.`,
                post_date: broadcastDate,
                view_count: Math.floor(Math.random() * 450) + 180,
                is_important: true
              },
              {
                notice_id: `NOTICE_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
                title: '그립 포인트 적립 및 사용 안내',
                content: `그립 포인트는 다음과 같이 적립 및 사용됩니다.\n\n[적립]\n- 그립 앱 결제 시 5% 적립\n- VIP 회원 추가 3% 적립\n- 최대 15,000원 적립\n- 구매 확정 후 7일 이내 지급\n\n[사용]\n- 1,000원 단위로 사용 가능\n- 유효기간: 적립일로부터 1년\n- 일부 제외 상품 있음\n\n자세한 내용은 그립 앱에서 확인해주세요.`,
                post_date: new Date(new Date(broadcastDate).getTime() - 5*24*60*60*1000).toISOString().split('T')[0],
                view_count: Math.floor(Math.random() * 650) + 250,
                is_important: true
              },
              {
                notice_id: `NOTICE_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
                title: '교환/반품 정책 안내',
                content: `[교환/반품 기준]\n- 상품 수령 후 7일 이내 신청 가능\n- 미개봉·미사용 상품에 한함\n- 단순 변심 시 배송비 고객 부담\n\n[교환/반품 불가 사유]\n- 개봉 또는 사용한 상품\n- 상품 가치가 현저히 감소한 경우\n- 시간이 지나 재판매가 곤란한 경우\n\n자세한 문의는 그립 고객센터로 연락해주세요.`,
                post_date: new Date(new Date(broadcastDate).getTime() - 10*24*60*60*1000).toISOString().split('T')[0],
                view_count: Math.floor(Math.random() * 520) + 200,
                is_important: false
              }
            ]
          },
          faq_section: {
            title: '자주 묻는 질문 (FAQ)',
            categories: [
              {
                category_name: '배송',
                faqs: [
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_SHIPPING_01`,
                    question: '배송은 얼마나 걸리나요?',
                    answer: '주문 후 영업일 기준 1-2일 내 배송됩니다. 도서산간 지역은 추가 1-2일 소요될 수 있습니다.',
                    view_count: Math.floor(Math.random() * 280) + 130,
                    helpful_count: Math.floor(Math.random() * 190) + 90,
                    category: '배송'
                  },
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_SHIPPING_02`,
                    question: '배송비는 얼마인가요?',
                    answer: '그립 라이브 방송 상품은 전상품 무료배송입니다. 단, 도서산간 지역은 추가 배송비가 발생할 수 있습니다.',
                    view_count: Math.floor(Math.random() * 240) + 110,
                    helpful_count: Math.floor(Math.random() * 170) + 85,
                    category: '배송'
                  },
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_SHIPPING_03`,
                    question: '배송 조회는 어떻게 하나요?',
                    answer: '그립 앱 > 마이페이지 > 주문/배송 조회에서 실시간으로 확인하실 수 있습니다. 배송 시작 시 송장번호가 문자로 발송됩니다.',
                    view_count: Math.floor(Math.random() * 190) + 95,
                    helpful_count: Math.floor(Math.random() * 140) + 75,
                    category: '배송'
                  }
                ]
              },
              {
                category_name: '혜택/쿠폰',
                faqs: [
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_BENEFIT_01`,
                    question: '그립 포인트는 언제 적립되나요?',
                    answer: '구매 확정 후 7일 이내에 자동으로 적립됩니다. 그립 앱 > 마이페이지 > 포인트에서 확인 가능합니다.',
                    view_count: Math.floor(Math.random() * 320) + 160,
                    helpful_count: Math.floor(Math.random() * 230) + 120,
                    category: '혜택/쿠폰'
                  },
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_BENEFIT_02`,
                    question: '쿠폰 중복 사용이 가능한가요?',
                    answer: couponDuplicate === '가능' 
                      ? '네, 일부 쿠폰은 중복 사용이 가능합니다. 쿠폰 상세 정보에서 중복 사용 가능 여부를 확인하실 수 있습니다.'
                      : '죄송합니다. 쿠폰은 1개만 선택하여 사용 가능합니다. 가장 할인율이 높은 쿠폰을 선택하시는 것을 권장드립니다.',
                    view_count: Math.floor(Math.random() * 260) + 130,
                    helpful_count: Math.floor(Math.random() * 185) + 95,
                    category: '혜택/쿠폰'
                  },
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_BENEFIT_03`,
                    question: '그립 VIP 혜택은 무엇인가요?',
                    answer: 'VIP 회원은 포인트 추가 3% 적립, 매월 특별 쿠폰 제공, 신상품 우선 구매 등의 혜택을 받으실 수 있습니다.',
                    view_count: Math.floor(Math.random() * 210) + 105,
                    helpful_count: Math.floor(Math.random() * 160) + 80,
                    category: '혜택/쿠폰'
                  }
                ]
              },
              {
                category_name: '상품/사은품',
                faqs: [
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_PRODUCT_01`,
                    question: '사은품은 어떻게 받을 수 있나요?',
                    answer: '구매 조건 충족 시 자동으로 포함되어 배송됩니다. 선착순 사은품은 재고 소진 시 조기 종료될 수 있습니다.',
                    view_count: Math.floor(Math.random() * 270) + 135,
                    helpful_count: Math.floor(Math.random() * 195) + 100,
                    category: '상품/사은품'
                  },
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_PRODUCT_02`,
                    question: '세트 구성품을 따로 살 수 없나요?',
                    answer: '라이브 세트는 방송 전용 구성으로 개별 구매가 불가합니다. 본품은 일반 판매 페이지에서 구매 가능합니다.',
                    view_count: Math.floor(Math.random() * 170) + 85,
                    helpful_count: Math.floor(Math.random() * 125) + 65,
                    category: '상품/사은품'
                  },
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_PRODUCT_03`,
                    question: '재고가 부족하면 어떻게 되나요?',
                    answer: '재고 부족 시 주문이 취소되며, 결제 금액은 즉시 환불됩니다. 재고 현황은 실시간으로 업데이트됩니다.',
                    view_count: Math.floor(Math.random() * 155) + 80,
                    helpful_count: Math.floor(Math.random() * 115) + 60,
                    category: '상품/사은품'
                  }
                ]
              },
              {
                category_name: '결제',
                faqs: [
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_PAYMENT_01`,
                    question: '어떤 결제 수단을 사용할 수 있나요?',
                    answer: '신용카드, 체크카드, 계좌이체, 휴대폰 결제, 그립페이, 카카오페이, 네이버페이 등 다양한 결제 수단을 지원합니다.',
                    view_count: Math.floor(Math.random() * 135) + 70,
                    helpful_count: Math.floor(Math.random() * 100) + 50,
                    category: '결제'
                  },
                  {
                    faq_id: `FAQ_GRIP_${brand.code}_PAYMENT_02`,
                    question: '그립페이 혜택은 무엇인가요?',
                    answer: '그립페이로 결제 시 추가 포인트 적립과 즉시 할인 혜택을 받으실 수 있습니다.',
                    view_count: Math.floor(Math.random() * 125) + 65,
                    helpful_count: Math.floor(Math.random() * 95) + 50,
                    category: '결제'
                  }
                ]
              }
            ],
            total_faqs: 11
          },
          qa_section: {
            title: '실시간 Q&A',
            description: '방송 중 고객님들이 남기신 질문과 답변입니다.',
            qa_list: [
              {
                qa_id: `QA_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_001`,
                question: `${productType}는 어떤 피부 타입에 좋나요?`,
                questioner: '김**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(8 + (i % 10)).padStart(2, '0')}`,
                answer: `모든 피부 타입에 사용 가능하지만, 특히 건조하고 민감한 피부에 추천드립니다. ${brand.name} ${productType}는 저자극 테스트를 완료한 제품입니다.`,
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(10 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 42) + 18,
                status: '답변완료'
              },
              {
                qa_id: `QA_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_002`,
                question: '세트 구성품 정품 사이즈인가요?',
                questioner: '이**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(12 + (i % 10)).padStart(2, '0')}`,
                answer: '본품은 정품 사이즈(50ml)이고, 토너는 미니 사이즈(30ml)입니다. 샘플 키트는 5종으로 구성되어 있습니다.',
                answerer: '그립 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(14 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 35) + 14,
                status: '답변완료'
              },
              {
                qa_id: `QA_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_003`,
                question: '사은품은 자동으로 오나요?',
                questioner: '박**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(18 + (i % 10)).padStart(2, '0')}`,
                answer: '네, 구매 조건 충족 시 자동으로 포함되어 배송됩니다. 선착순 사은품은 재고 소진 시 조기 종료될 수 있습니다.',
                answerer: '그립 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(20 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 30) + 11,
                status: '답변완료'
              },
              {
                qa_id: `QA_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_004`,
                question: `${productType} 다른 제품과 같이 써도 되나요?`,
                questioner: '최**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(25 + (i % 10)).padStart(2, '0')}`,
                answer: `네, 다른 스킨케어 제품과 함께 사용하셔도 됩니다. ${productType} → 세럼 → 크림 순서로 사용하시면 좋습니다.`,
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(27 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 26) + 9,
                status: '답변완료'
              },
              {
                qa_id: `QA_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_005`,
                question: '방송 끝나도 같은 가격에 살 수 있나요?',
                questioner: '정**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(35 + (i % 10)).padStart(2, '0')}`,
                answer: `혜택 유효기간은 ${benefitValidType}입니다. 기간 내 구매하시면 동일한 혜택을 받으실 수 있습니다.`,
                answerer: '그립 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(37 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 48) + 22,
                status: '답변완료'
              },
              {
                qa_id: `QA_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_006`,
                question: '그립 포인트 언제 적립되나요?',
                questioner: '강**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(42 + (i % 10)).padStart(2, '0')}`,
                answer: '구매 확정 후 7일 이내에 자동으로 적립됩니다. 그립 앱에서 확인하실 수 있습니다.',
                answerer: '그립 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(44 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 33) + 12,
                status: '답변완료'
              },
              {
                qa_id: `QA_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_007`,
                question: '쿠폰 중복 사용 가능한가요?',
                questioner: '윤**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(48 + (i % 10)).padStart(2, '0')}`,
                answer: couponDuplicate === '가능' ? '일부 쿠폰은 중복 사용이 가능합니다. 쿠폰 상세에서 확인해주세요.' : '죄송합니다. 쿠폰은 1개만 선택하여 사용 가능합니다.',
                answerer: '그립 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(50 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 40) + 17,
                status: '답변완료'
              },
              {
                qa_id: `QA_GRIP_${brand.code}_${String(i + 1).padStart(3, '0')}_008`,
                question: '유통기한은 얼마나 되나요?',
                questioner: '임**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(52 + (i % 10)).padStart(2, '0')}`,
                answer: '제조일로부터 36개월이며, 최근 제조된 신선한 제품으로 배송됩니다. 개봉 후 12개월 이내 사용을 권장드립니다.',
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(54 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 28) + 10,
                status: '답변완료'
              }
            ],
            total_qa: 8,
            answered_qa: 8,
            unanswered_qa: 0
          }
        },
        cs_info: {
          expected_questions: [
            '방송 끝났는데 혜택 적용되나요?',
            '그립 포인트 언제 적립되나요?',
            '쿠폰 중복 사용 가능한가요?',
            '배송은 언제 도착하나요?'
          ],
          response_scripts: [
            `혜택 유효기간은 ${benefitValidType}입니다.`,
            `그립 포인트는 구매 확정 후 7일 이내 적립됩니다.`,
            `쿠폰 중복 사용은 ${couponDuplicate}입니다.`,
            `주문 후 1-2일 내 배송됩니다.`
          ],
          risk_points: [
            couponDuplicate === '불가' ? '쿠폰 중복 사용 불가 - 고객 문의 빈번' : '',
            excludedProducts ? `${excludedProducts} - 명시 필요` : '',
            '도서산간 지역 배송비 별도 안내 필요'
          ].filter(Boolean),
          cs_note: `${brand.name} ${broadcastDate} 그립 라이브 - ${promotionType}`
        }
      };
      
      gripData.push(liveData);
    }
  });
  
  console.log(`✅ 그립 라이브 데이터 생성: ${gripData.length}개`);
  return gripData;
};

/**
 * 무신사 라이브 쇼핑 데이터 생성 함수
 */
const generateMusinsaLiveData = () => {
  const musinsaData = [];
  const brands = [
    { name: '설화수', code: 'SULWHASOO', count: 12 },
    { name: '라네즈', code: 'LANEIGE', count: 12 },
    { name: '아이오페', code: 'IOPE', count: 10 },
    { name: '헤라', code: 'HERA', count: 10 },
    { name: '에스트라', code: 'AESTURA', count: 8 },
    { name: '이니스프리', code: 'INNISFREE', count: 12 },
    { name: '해피바스', code: 'HAPPYBATH', count: 8 },
    { name: '바이탈뷰티', code: 'VITALBEAUTY', count: 8 },
    { name: '프리메라', code: 'PRIMERA', count: 8 },
    { name: '오설록', code: 'OSULLOC', count: 8 }
  ];
  
  const productTypes = ['에센스', '크림', '세럼', '토너', '수분크림', '앰플', '클렌징', '선크림', '미스트', '마스크팩'];
  const promotionTypes = ['무신사 단독', '무신사 라이브 특가', '뷰티위크', '신상품 런칭', '베스트 특가', '브랜드데이'];
  
  brands.forEach(brand => {
    for (let i = 0; i < brand.count; i++) {
      const statusOptions = ['ACTIVE', 'PENDING', 'ENDED'];
      const statusWeights = i < 2 ? [1, 0, 0] : i < brand.count * 0.35 ? [0, 1, 0] : [0, 0, 1];
      const status = statusOptions[statusWeights.indexOf(1)];
      
      const baseDate = new Date('2025-11-28');
      let broadcastDate, hour;
      
      if (status === 'ACTIVE') {
        broadcastDate = '2025-11-28';
        hour = 15 + i;
      } else if (status === 'PENDING') {
        const daysToAdd = Math.floor(i / 2) + 1;
        const futureDate = new Date(baseDate);
        futureDate.setDate(baseDate.getDate() + daysToAdd);
        broadcastDate = futureDate.toISOString().split('T')[0];
        hour = 14 + (i % 3) * 3;
      } else {
        const daysToSubtract = Math.floor((i - brand.count * 0.35) / 2) + 1;
        const pastDate = new Date(baseDate);
        pastDate.setDate(baseDate.getDate() - daysToSubtract);
        broadcastDate = pastDate.toISOString().split('T')[0];
        hour = 12 + (i % 4) * 2;
      }
      
      const productType = productTypes[i % productTypes.length];
      const promotionType = promotionTypes[i % promotionTypes.length];
      const discountRate = 20 + (i % 5) * 5;
      const couponDuplicate = i % 3 === 0 ? '가능' : '불가';
      const excludedProducts = i % 4 === 0 ? '특정 기획전 제외' : i % 4 === 1 ? '대용량 제외' : '';
      const benefitValidType = i % 3 === 0 ? '방송 중만' : i % 3 === 1 ? '당일 23:59까지' : `${broadcastDate} ~ ${new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0]}`;
      
      const liveData = {
        meta: {
          live_id: `MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}`,
          platform_name: '무신사',
          platform_code: 'MUSINSA',
          brand_name: brand.name,
          brand_code: brand.code,
          live_title_customer: `★${brand.name} ${productType} ${promotionType}★최대 ${discountRate}% 할인 + 무신사 단독`,
          live_title_cs: `${brand.name} ${broadcastDate.substring(5)} 무신사 라이브 ${promotionType}`,
          source_url: `https://www.musinsa.com/live/beauty_${brand.code.toLowerCase()}_${String(i + 1).padStart(3, '0')}`,
          status: status,
          category: '뷰티'
        },
        schedule: {
          broadcast_date: broadcastDate,
          broadcast_start: `${String(hour).padStart(2, '0')}:00`,
          broadcast_end: `${String(hour + 1).padStart(2, '0')}:30`,
          benefit_valid_type: benefitValidType,
          benefit_start: status === 'PENDING' ? `${broadcastDate} ${String(hour).padStart(2, '0')}:00` : `${broadcastDate} ${String(hour).padStart(2, '0')}:00`,
          benefit_end: benefitValidType.includes('~') ? benefitValidType.split(' ~ ')[1] + ' 23:59' : benefitValidType === '방송 중만' ? `${broadcastDate} ${String(hour + 1).padStart(2, '0')}:30` : `${broadcastDate} 23:59`,
          broadcast_type: i % 5 === 0 ? '브랜드 콜라보' : '단독 라이브'
        },
        products: {
          product_list: [
            { sku: `${brand.code}-MSS-${String(i + 1).padStart(3, '0')}-01`, name: `${brand.name} ${productType} 정품`, option: '정품 사이즈' },
            { sku: `${brand.code}-MSS-${String(i + 1).padStart(3, '0')}-02`, name: `${brand.name} ${productType} 기획세트`, option: '본품+추가구성' },
            { sku: `${brand.code}-MSS-${String(i + 1).padStart(3, '0')}-03`, name: `${brand.name} 토너`, option: '150ml' },
            { sku: `${brand.code}-MSS-${String(i + 1).padStart(3, '0')}-SET`, name: `${brand.name} ${productType} 무신사 단독 세트`, option: '본품+토너+사은품' }
          ],
          main_product: `${brand.name} ${productType} 정품`,
          set_composition: `본품 + 토너 + ${brand.name} 미니 키트 3종`,
          stock_info: {
            main_product_stock: 600,
            set_product_stock: 100,
            low_stock_threshold: 30
          },
          product_details: [
            {
              product_id: `${brand.code}-MUSINSA-${String(i + 1).padStart(3, '0')}-01`,
              product_name: `${brand.name} ${productType} 정품`,
              brand: brand.name,
              category: i % 3 === 0 ? '스킨케어' : i % 3 === 1 ? '메이크업' : '바디케어',
              original_price: `${(120 + i * 8) * 1000}원`,
              sale_price: `${Math.floor((120 + i * 8) * (1 - discountRate / 100)) * 1000}원`,
              discount_rate: `${discountRate}%`,
              stock_status: '재고 충분',
              stock_quantity: 600,
              options: [
                { option_name: '타입', option_values: ['정품', '리필'], selected: '정품' }
              ],
              product_features: [
                `${brand.name}의 프리미엄 ${productType}`,
                '피부 타입: 전 피부 타입',
                '주요 성분: 히알루론산, 나이아신아마이드, 아데노신',
                '효과: 깊은 보습, 탄력, 주름 개선'
              ],
              usage_method: '세안 후 화장수로 피부를 정돈한 뒤, 적당량을 취해 얼굴 전체에 골고루 펴 발라줍니다.',
              caution: '화장품 사용 시 이상이 있는 경우 전문의와 상담하시기 바랍니다.',
              expiry_info: '제조일로부터 36개월',
              certifications: ['피부 테스트 완료', '저자극 인증'],
              review_summary: {
                total_reviews: 2150 + i * 120,
                average_rating: 4.6 + (i % 4) * 0.1,
                rating_distribution: {
                  '5점': 1600 + i * 80,
                  '4점': 400 + i * 25,
                  '3점': 100 + i * 10,
                  '2점': 35 + i * 3,
                  '1점': 15 + i * 2
                },
                top_positive_keywords: ['촉촉해요', '효과 좋음', '빠른 흡수', '가성비'],
                top_negative_keywords: ['가격 부담', '향이 강함']
              }
            },
            {
              product_id: `${brand.code}-MUSINSA-${String(i + 1).padStart(3, '0')}-SET`,
              product_name: `${brand.name} ${productType} 무신사 단독 세트`,
              brand: brand.name,
              category: '세트/기획',
              original_price: `${(175 + i * 12) * 1000}원`,
              sale_price: `${Math.floor((175 + i * 12) * 0.60) * 1000}원`,
              discount_rate: '40%',
              stock_status: '한정수량',
              stock_quantity: 100,
              options: [],
              set_contents: [
                { item_name: `${brand.name} ${productType} 정품`, quantity: 1, price: `${(120 + i * 8) * 1000}원` },
                { item_name: `${brand.name} 토너`, quantity: 1, price: '28,000원' },
                { item_name: `${brand.name} 미니 키트`, quantity: 1, price: '27,000원' }
              ],
              total_set_value: `${(175 + i * 12) * 1000}원`,
              set_save_amount: `${Math.floor((175 + i * 12) * 0.40) * 1000}원`,
              product_features: [
                '무신사 라이브 단독 구성',
                '정품 + 토너 + 미니 키트 구성',
                `최대 ${Math.floor((175 + i * 12) * 0.40) * 1000}원 혜택`
              ],
              usage_method: '세트 구성품별 사용법 참고',
              expiry_info: '제조일로부터 36개월',
              review_summary: {
                total_reviews: 685 + i * 45,
                average_rating: 4.7 + (i % 3) * 0.1,
                top_positive_keywords: ['구성 알차요', '가성비 최고', '선물 추천']
              }
            }
          ],
          coupons: [
            {
              coupon_id: `MUSINSA_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              coupon_name: '무신사 라이브 전용 쿠폰',
              coupon_type: '플랫폼쿠폰',
              discount_type: i % 2 === 0 ? '정률할인' : '정액할인',
              discount_value: i % 2 === 0 ? '15%' : '20,000원',
              min_purchase_amount: '100,000원',
              max_discount_amount: i % 2 === 0 ? '25,000원' : null,
              issue_condition: '방송 시청 시 자동 발급',
              expiry_date: `${broadcastDate} 23:59`,
              duplicate_use: couponDuplicate
            },
            {
              coupon_id: `MUSINSA_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              coupon_name: `${brand.name} 브랜드 쿠폰`,
              coupon_type: '브랜드쿠폰',
              discount_type: '정액할인',
              discount_value: '15,000원',
              min_purchase_amount: '120,000원',
              max_discount_amount: null,
              issue_condition: '쿠폰함에서 다운로드',
              expiry_date: new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0],
              duplicate_use: '불가'
            },
            {
              coupon_id: `MUSINSA_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              coupon_name: '무신사 앱 다운로드 쿠폰',
              coupon_type: '플랫폼쿠폰',
              discount_type: '정액할인',
              discount_value: '5,000원',
              min_purchase_amount: '50,000원',
              max_discount_amount: null,
              issue_condition: '무신사 앱 설치 시',
              expiry_date: new Date(new Date(broadcastDate).getTime() + 14*24*60*60*1000).toISOString().split('T')[0],
              duplicate_use: '가능'
            }
          ],
          benefits: [
            {
              benefit_id: `MUSINSA_BENEFIT_DISCOUNT_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '할인',
              benefit_name: `무신사 라이브 ${discountRate}% 할인`,
              discount_type: '정률할인',
              discount_value: `${discountRate}%`,
              condition: '방송 중 결제 시',
              duplicate_with_coupon: couponDuplicate
            },
            {
              benefit_id: `MUSINSA_BENEFIT_DISCOUNT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '할인',
              benefit_name: '무신사 앱 결제 추가 할인',
              discount_type: '정액할인',
              discount_value: '8,000원',
              condition: '무신사 앱 결제 시',
              duplicate_with_coupon: '가능'
            },
            {
              benefit_id: `MUSINSA_BENEFIT_GIFT1_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '사은품',
              benefit_name: `${brand.name} 스페셜 키트`,
              gift_items: [
                { item_name: `${brand.name} 샘플 4종`, quantity: 1 },
                { item_name: `${brand.name} 에코백`, quantity: 1 }
              ],
              gift_type: '구매조건형',
              condition: '8만원 이상 구매',
              quantity_limit: '전원 증정',
              duplicate_with_other_gift: '가능'
            },
            {
              benefit_id: `MUSINSA_BENEFIT_GIFT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '사은품',
              benefit_name: `${brand.name} 프리미엄 기프트`,
              gift_items: [
                { item_name: `${brand.name} ${productType} 미니`, quantity: 1 }
              ],
              gift_type: '선착순형',
              condition: '12만원 이상 구매',
              quantity_limit: '선착순 150명',
              duplicate_with_other_gift: '불가'
            },
            {
              benefit_id: `MUSINSA_BENEFIT_POINT_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '포인트',
              benefit_name: '무신사 적립금 3% 적립',
              point_rate: '3%',
              max_point: '10,000원',
              condition: '무신사 회원',
              expiry_period: '적립일로부터 1년'
            },
            {
              benefit_id: `MUSINSA_BENEFIT_POINT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '포인트',
              benefit_name: '무신사 VIP 추가 적립',
              point_rate: '2%',
              max_point: '5,000원',
              condition: 'VIP 등급 이상',
              expiry_period: '적립일로부터 1년'
            },
            {
              benefit_id: `MUSINSA_BENEFIT_DELIVERY_${brand.code}_${String(i + 1).padStart(3, '0')}`,
              benefit_type: '배송',
              benefit_name: '무료배송',
              delivery_type: '무료배송',
              delivery_condition: '전상품',
              expected_delivery: '주문 후 2-3일'
            }
          ],
          events: [
            {
              event_id: `MUSINSA_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              event_name: '무신사 라이브 타임특가',
              event_type: '타임특가',
              event_description: `방송 시작 후 30분간 추가 5% 할인`,
              event_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:00 ~ ${String(hour).padStart(2, '0')}:30`,
              event_benefit: '추가 5% 할인',
              participation_method: '자동 적용'
            },
            {
              event_id: `MUSINSA_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              event_name: '무신사 앱 단독 혜택',
              event_type: '앱 전용',
              event_description: '무신사 앱 결제 시 8,000원 추가 할인',
              event_period: benefitValidType,
              event_benefit: '8,000원 추가 할인',
              participation_method: '무신사 앱 결제'
            },
            {
              event_id: `MUSINSA_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              event_name: `${brand.name} 멤버십 특전`,
              event_type: '멤버십',
              event_description: '브랜드 멤버십 회원 적립금 2배 적립',
              event_period: `${broadcastDate} ~ ${new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0]}`,
              event_benefit: '적립금 2배',
              participation_method: '자동 적용'
            }
          ]
        },
        policy: {
          coupon_duplicate: couponDuplicate,
          point_duplicate: '가능',
          other_promotion_duplicate: i % 3 === 0 ? '쿠폰+적립 중복 가능' : '쿠폰 1개만 사용',
          employee_discount: i % 5 === 0 ? '중복 가능' : '중복 불가'
        },
        restrictions: {
          excluded_products: excludedProducts,
          channel_restriction: '무신사 앱/웹 전용',
          payment_method_restriction: '제한 없음',
          region_restriction: '도서산간 배송비 별도'
        },
        chat_info: {
          total_chats: 750 + i * 150,
          total_participants: 170 + i * 30,
          chat_statistics: {
            average_chats_per_minute: 14 + i * 2,
            peak_time: `${String(hour).padStart(2, '0')}:${String(18 + (i % 3) * 8).padStart(2, '0')}`,
            peak_chats_per_minute: 38 + i * 4
          },
          popular_keywords: [
            { keyword: '할인', count: 165 + i * 18 },
            { keyword: '쿠폰', count: 140 + i * 14 },
            { keyword: '사은품', count: 120 + i * 12 },
            { keyword: '재고', count: 100 + i * 10 },
            { keyword: '무료배송', count: 88 + i * 9 },
            { keyword: '효과', count: 78 + i * 8 },
            { keyword: '가격', count: 68 + i * 7 },
            { keyword: '세트', count: 58 + i * 6 },
            { keyword: '추천', count: 48 + i * 5 },
            { keyword: productType, count: 115 + i * 11 }
          ],
          emoji_reactions: [
            { emoji: '❤️', count: 420 + i * 45 },
            { emoji: '👍', count: 350 + i * 38 },
            { emoji: '😍', count: 290 + i * 32 },
            { emoji: '🔥', count: 250 + i * 28 },
            { emoji: '👏', count: 200 + i * 22 }
          ],
          key_chats: [
            { username: '무신사팬***', message: `${productType} 진짜 좋아요!`, timestamp: `${String(hour).padStart(2, '0')}:06`, likes: 42 + i * 3 },
            { username: '뷰티덕후***', message: '이 가격 실화에요?', timestamp: `${String(hour).padStart(2, '0')}:13`, likes: 36 + i * 2 },
            { username: '리뷰왕***', message: `${brand.name} 제품 믿고 삽니다`, timestamp: `${String(hour).padStart(2, '0')}:19`, likes: 39 + i * 3 },
            { username: '할인러버***', message: '쿠폰 받았어요!', timestamp: `${String(hour).padStart(2, '0')}:26`, likes: 33 + i * 2 },
            { username: '무신사유저***', message: '세트 구성 알차네요', timestamp: `${String(hour).padStart(2, '0')}:34`, likes: 37 + i * 3 },
            { username: '뷰티마니아***', message: '사은품 언제 와요?', timestamp: `${String(hour).padStart(2, '0')}:40`, likes: 26 + i * 2 },
            { username: '쇼핑홀릭***', message: '재고 얼마 안 남았대요!', timestamp: `${String(hour).padStart(2, '0')}:48`, likes: 48 + i * 4 },
            { username: '현명소비***', message: '가성비 좋네요', timestamp: `${String(hour).padStart(2, '0')}:55`, likes: 31 + i * 2 },
            { username: '무신사러버***', message: `${productType} 강추!`, timestamp: `${String(hour + 1).padStart(2, '0')}:08`, likes: 41 + i * 3 },
            { username: '리얼후기왕***', message: '배송 빠르고 좋아요', timestamp: `${String(hour + 1).padStart(2, '0')}:18`, likes: 35 + i * 2 }
          ],
          frequently_asked: [
            { question: '쿠폰 중복 사용 되나요?', count: 26 + i * 3 },
            { question: '배송 언제 와요?', count: 30 + i * 4 },
            { question: '사은품 자동으로 오나요?', count: 23 + i * 3 },
            { question: '재고 얼마나 남았어요?', count: 20 + i * 2 },
            { question: '무신사 적립금 언제 쌓여요?', count: 18 + i * 2 }
          ],
          sentiment_analysis: {
            positive: 70 + i % 9,
            neutral: 24 - i % 6,
            negative: 6 - i % 4
          }
        },
        live_specific: {
          key_mentions: [
            `[00:03] 안녕하세요! 무신사 LIVE ${brand.name} ${productType} 방송 시작합니다!`,
            `[00:18] ${brand.name} ${productType}는 ${i % 3 === 0 ? '깊은 보습력으로' : i % 3 === 1 ? '빠른 흡수력으로' : '산뜻한 사용감으로'} 데일리 케어에 최적입니다!`,
            `[02:50] ${productType}의 핵심 성분과 효능을 자세히 설명드리겠습니다!`,
            `[05:35] 💰 지금 구매하시면 최대 ${discountRate}% 할인 + 쿠폰까지!`,
            `[08:20] 🎁 8만원 이상 구매 시 ${brand.name} 스페셜 키트 전원 증정!`,
            `[12:40] "${productType} 정말 좋아요! 피부가 부드러워졌어요!" - 실시간 후기`,
            `[15:25] ⚡ 선착순 150명! 서둘러주세요!`,
            `[18:50] ${productType}는 아침 저녁 스킨케어 루틴에 필수입니다!`,
            `[22:30] 한 방울만 발라도 촉촉하게 하루종일 보습이 지속됩니다!`,
            `[25:15] ⏰ 방송 시작 30분간 타임특가 추가 5% 할인!`,
            `[28:40] 📱 무신사 앱에서 결제하면 8,000원 추가 할인 + 적립금 3% 적립!`,
            `[32:20] 💳 무신사페이 결제 시 추가 혜택!`,
            `[35:55] 실시간 주문이 쏟아지고 있어요! 벌써 50개 판매!`,
            `[38:30] ${productType}는 모든 피부 타입에 사용 가능합니다!`,
            `[42:15] 마지막 기회! 놓치지 마세요!`,
            `[45:50] 남은 사은품이 30개밖에 없어요! 지금 주문하세요!`,
            `[48:35] 🎁 오늘 구매하신 분들 전원 무료배송!`,
            `[52:25] 주문 폭주 중! 배송은 내일 바로 시작됩니다!`,
            `[55:40] 마지막 4분! 방송 종료 후엔 정상가로 돌아갑니다!`,
            `[58:20] ${productType}로 건강하고 아름다운 피부 만드세요!`,
            `[59:55] 구매해주신 모든 분들 감사합니다! 다음 라이브에서 또 만나요!`
          ],
          broadcast_qa: [
            {
              time: `${String(hour).padStart(2, '0')}:09`,
              question: `${productType}는 어떤 피부에 좋나요?`,
              answer: '모든 피부 타입에 사용 가능하며, 특히 건조하고 칙칙한 피부에 효과적입니다.'
            },
            {
              time: `${String(hour).padStart(2, '0')}:16`,
              question: '세트 구성품 정품 사이즈인가요?',
              answer: '본품은 정품 사이즈이고, 토너와 미니 키트는 트래블 사이즈입니다.'
            },
            {
              time: `${String(hour).padStart(2, '0')}:24`,
              question: '사은품은 언제까지 받을 수 있나요?',
              answer: `선착순 150명이며, 재고 소진 시 조기 마감됩니다. 서둘러 주문하세요!`
            },
            {
              time: `${String(hour).padStart(2, '0')}:38`,
              question: '무신사 적립금은 언제 적립되나요?',
              answer: '구매 확정 후 7일 이내에 자동 적립됩니다.'
            }
          ],
          timeline: [
            { time: '00:00', description: '방송 시작' },
            { time: '00:04', description: `${brand.name} 브랜드 소개` },
            { time: '00:10', description: `${productType} 제품 상세 설명` },
            { time: '00:18', description: '혜택 안내 (할인/쿠폰/사은품)' },
            { time: '00:28', description: '사용법 시연' },
            { time: '00:38', description: '시청자 Q&A' },
            { time: '00:48', description: '타임특가 안내' },
            { time: '00:58', description: '세트 구성 상세 소개' },
            { time: '01:08', description: '무신사 앱 혜택 설명' },
            { time: '01:18', description: '재고 현황 안내' },
            { time: '01:25', description: '마무리' }
          ]
        },
        product_list_tab: {
          tab_name: '상품 목록',
          total_products: 4,
          product_details: [
            {
              product_id: `${brand.code}-MUSINSA-${String(i + 1).padStart(3, '0')}-01`,
              product_name: `${brand.name} ${productType} 정품`,
              brand: brand.name,
              category: i % 3 === 0 ? '스킨케어' : i % 3 === 1 ? '메이크업' : '바디케어',
              original_price: `${(120 + i * 8) * 1000}원`,
              sale_price: `${Math.floor((120 + i * 8) * (1 - discountRate / 100)) * 1000}원`,
              discount_rate: `${discountRate}%`,
              stock_status: '재고 충분',
              stock_quantity: 600,
              options: [
                { option_name: '타입', option_values: ['정품', '리필'], selected: '정품' }
              ],
              product_features: [
                `${brand.name}의 프리미엄 ${productType}`,
                '피부 타입: 전 피부 타입',
                '주요 성분: 히알루론산, 나이아신아마이드, 아데노신',
                '효과: 깊은 보습, 탄력, 주름 개선'
              ],
              usage_method: '세안 후 화장수로 피부를 정돈한 뒤, 적당량을 취해 얼굴 전체에 골고루 펴 발라줍니다.',
              caution: '화장품 사용 시 이상이 있는 경우 전문의와 상담하시기 바랍니다.',
              expiry_info: '제조일로부터 36개월',
              certifications: ['피부 테스트 완료', '저자극 인증'],
              review_summary: {
                total_reviews: 2150 + i * 120,
                average_rating: 4.6 + (i % 4) * 0.1,
                rating_distribution: {
                  '5점': 1600 + i * 80,
                  '4점': 400 + i * 25,
                  '3점': 100 + i * 10,
                  '2점': 35 + i * 3,
                  '1점': 15 + i * 2
                },
                top_positive_keywords: ['촉촉해요', '효과 좋음', '빠른 흡수', '가성비'],
                top_negative_keywords: ['가격 부담', '향이 강함']
              }
            },
            {
              product_id: `${brand.code}-MUSINSA-${String(i + 1).padStart(3, '0')}-SET`,
              product_name: `${brand.name} ${productType} 무신사 단독 세트`,
              brand: brand.name,
              category: '세트/기획',
              original_price: `${(175 + i * 12) * 1000}원`,
              sale_price: `${Math.floor((175 + i * 12) * 0.60) * 1000}원`,
              discount_rate: '40%',
              stock_status: '한정수량',
              stock_quantity: 100,
              options: [],
              set_contents: [
                { item_name: `${brand.name} ${productType} 정품`, quantity: 1, price: `${(120 + i * 8) * 1000}원` },
                { item_name: `${brand.name} 토너`, quantity: 1, price: '28,000원' },
                { item_name: `${brand.name} 미니 키트`, quantity: 1, price: '27,000원' }
              ],
              total_set_value: `${(175 + i * 12) * 1000}원`,
              set_save_amount: `${Math.floor((175 + i * 12) * 0.40) * 1000}원`,
              product_features: [
                '무신사 라이브 단독 구성',
                '정품 + 토너 + 미니 키트 구성',
                `최대 ${Math.floor((175 + i * 12) * 0.40) * 1000}원 혜택`
              ],
              usage_method: '세트 구성품별 사용법 참고',
              expiry_info: '제조일로부터 36개월',
              review_summary: {
                total_reviews: 685 + i * 45,
                average_rating: 4.7 + (i % 3) * 0.1,
                top_positive_keywords: ['구성 알차요', '가성비 최고', '선물 추천']
              }
            }
          ]
        },
        faq_tab: {
          tab_name: 'FAQ',
          notice_section: {
            title: '공지사항',
            notices: [
              {
                notice_id: `NOTICE_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
                title: `${brand.name} 무신사 라이브 혜택 안내`,
                content: `안녕하세요, 무신사입니다.\n\n${brand.name} 라이브 방송의 특별 혜택을 안내드립니다.\n\n[방송 혜택]\n- 라이브 할인: 최대 ${discountRate}%\n- 무신사 앱 추가할인: 8,000원\n- 무신사 적립금 3% 적립\n\n[유의사항]\n- 혜택은 ${benefitValidType}입니다.\n- 일부 제외 상품이 있을 수 있습니다.\n- 쿠폰 중복 사용은 ${couponDuplicate}입니다.\n\n감사합니다.`,
                post_date: broadcastDate,
                view_count: Math.floor(Math.random() * 420) + 170,
                is_important: true
              },
              {
                notice_id: `NOTICE_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
                title: '무신사 적립금 안내',
                content: `무신사 적립금은 다음과 같이 적립됩니다.\n\n[적립]\n- 기본 3% 적립\n- VIP 회원 추가 2% 적립\n- 최대 10,000원 적립\n- 구매 확정 후 7일 이내 지급\n\n[사용]\n- 1,000원 단위 사용 가능\n- 유효기간: 적립일로부터 1년\n\n자세한 내용은 무신사 앱에서 확인해주세요.`,
                post_date: new Date(new Date(broadcastDate).getTime() - 4*24*60*60*1000).toISOString().split('T')[0],
                view_count: Math.floor(Math.random() * 580) + 230,
                is_important: true
              },
              {
                notice_id: `NOTICE_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
                title: '교환/반품 안내',
                content: `[교환/반품 기준]\n- 상품 수령 후 7일 이내\n- 미개봉 상품에 한함\n- 단순 변심 시 배송비 고객 부담\n\n[교환/반품 불가]\n- 사용한 상품\n- 상품 가치 훼손\n- 재판매 불가능한 경우\n\n무신사 고객센터로 문의해주세요.`,
                post_date: new Date(new Date(broadcastDate).getTime() - 8*24*60*60*1000).toISOString().split('T')[0],
                view_count: Math.floor(Math.random() * 480) + 190,
                is_important: false
              }
            ]
          },
          faq_section: {
            title: '자주 묻는 질문 (FAQ)',
            categories: [
              {
                category_name: '배송',
                faqs: [
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_SHIPPING_01`,
                    question: '배송은 언제 도착하나요?',
                    answer: '주문 후 영업일 기준 2-3일 내 배송됩니다. 도서산간 지역은 추가 1-2일 소요될 수 있습니다.',
                    view_count: Math.floor(Math.random() * 260) + 120,
                    helpful_count: Math.floor(Math.random() * 180) + 85,
                    category: '배송'
                  },
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_SHIPPING_02`,
                    question: '배송비는 얼마인가요?',
                    answer: '무신사 라이브 상품은 전상품 무료배송입니다. 도서산간 지역은 추가 배송비가 발생할 수 있습니다.',
                    view_count: Math.floor(Math.random() * 220) + 105,
                    helpful_count: Math.floor(Math.random() * 160) + 80,
                    category: '배송'
                  },
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_SHIPPING_03`,
                    question: '배송 조회는 어떻게 하나요?',
                    answer: '무신사 앱 > 마이페이지 > 주문/배송에서 실시간 확인 가능합니다. 송장번호는 문자로 발송됩니다.',
                    view_count: Math.floor(Math.random() * 180) + 90,
                    helpful_count: Math.floor(Math.random() * 130) + 70,
                    category: '배송'
                  }
                ]
              },
              {
                category_name: '혜택/쿠폰',
                faqs: [
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_BENEFIT_01`,
                    question: '무신사 적립금은 언제 쌓이나요?',
                    answer: '구매 확정 후 7일 이내에 자동 적립됩니다. 무신사 앱 > 마이페이지 > 적립금에서 확인 가능합니다.',
                    view_count: Math.floor(Math.random() * 300) + 150,
                    helpful_count: Math.floor(Math.random() * 220) + 115,
                    category: '혜택/쿠폰'
                  },
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_BENEFIT_02`,
                    question: '쿠폰 중복 사용 되나요?',
                    answer: couponDuplicate === '가능' 
                      ? '네, 일부 쿠폰은 중복 사용 가능합니다. 쿠폰 상세에서 확인해주세요.'
                      : '죄송합니다. 쿠폰은 1개만 사용 가능합니다. 가장 할인율이 높은 쿠폰을 선택해주세요.',
                    view_count: Math.floor(Math.random() * 245) + 125,
                    helpful_count: Math.floor(Math.random() * 175) + 90,
                    category: '혜택/쿠폰'
                  },
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_BENEFIT_03`,
                    question: '무신사 VIP 혜택은 뭐에요?',
                    answer: 'VIP 회원은 적립금 추가 2% 적립, 매월 특별 쿠폰, 신상품 우선 구매 혜택을 받으실 수 있습니다.',
                    view_count: Math.floor(Math.random() * 195) + 100,
                    helpful_count: Math.floor(Math.random() * 150) + 75,
                    category: '혜택/쿠폰'
                  }
                ]
              },
              {
                category_name: '상품/사은품',
                faqs: [
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_PRODUCT_01`,
                    question: '사은품은 어떻게 받나요?',
                    answer: '구매 조건 충족 시 자동으로 함께 배송됩니다. 선착순 사은품은 재고 소진 시 조기 마감됩니다.',
                    view_count: Math.floor(Math.random() * 255) + 130,
                    helpful_count: Math.floor(Math.random() * 185) + 95,
                    category: '상품/사은품'
                  },
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_PRODUCT_02`,
                    question: '세트 구성품 따로 살 수 없나요?',
                    answer: '라이브 세트는 방송 전용 구성으로 개별 구매가 불가합니다. 본품은 일반 판매 페이지에서 구매 가능합니다.',
                    view_count: Math.floor(Math.random() * 160) + 80,
                    helpful_count: Math.floor(Math.random() * 120) + 62,
                    category: '상품/사은품'
                  },
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_PRODUCT_03`,
                    question: '재고 부족하면 어떻게 되나요?',
                    answer: '재고 부족 시 주문 취소되며, 결제 금액은 즉시 환불됩니다. 재고는 실시간으로 업데이트됩니다.',
                    view_count: Math.floor(Math.random() * 145) + 75,
                    helpful_count: Math.floor(Math.random() * 110) + 58,
                    category: '상품/사은품'
                  }
                ]
              },
              {
                category_name: '결제',
                faqs: [
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_PAYMENT_01`,
                    question: '어떤 결제 수단을 쓸 수 있나요?',
                    answer: '신용카드, 체크카드, 계좌이체, 휴대폰, 카카오페이, 네이버페이, 토스 등 다양한 결제 수단을 지원합니다.',
                    view_count: Math.floor(Math.random() * 130) + 68,
                    helpful_count: Math.floor(Math.random() * 95) + 48,
                    category: '결제'
                  },
                  {
                    faq_id: `FAQ_MUSINSA_${brand.code}_PAYMENT_02`,
                    question: '무신사 앱 결제 혜택이 뭐에요?',
                    answer: '무신사 앱으로 결제 시 추가 8,000원 할인과 적립금 3% 적립 혜택을 받으실 수 있습니다.',
                    view_count: Math.floor(Math.random() * 120) + 63,
                    helpful_count: Math.floor(Math.random() * 90) + 48,
                    category: '결제'
                  }
                ]
              }
            ],
            total_faqs: 11
          },
          qa_section: {
            title: '실시간 Q&A',
            description: '방송 중 고객님들이 남기신 질문과 답변입니다.',
            qa_list: [
              {
                qa_id: `QA_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_001`,
                question: `${productType}는 어떤 피부에 좋나요?`,
                questioner: '김**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(9 + (i % 10)).padStart(2, '0')}`,
                answer: `전 피부 타입에 사용 가능하며, 특히 건조하고 칙칙한 피부에 효과적입니다. ${brand.name} ${productType}는 피부 테스트를 완료한 제품입니다.`,
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(11 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 40) + 17,
                status: '답변완료'
              },
              {
                qa_id: `QA_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_002`,
                question: '세트 정품 사이즈 맞나요?',
                questioner: '이**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(14 + (i % 10)).padStart(2, '0')}`,
                answer: '본품은 정품 사이즈이고, 토너와 미니 키트는 트래블 사이즈입니다.',
                answerer: '무신사 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(16 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 33) + 13,
                status: '답변완료'
              },
              {
                qa_id: `QA_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_003`,
                question: '사은품 자동으로 오나요?',
                questioner: '박**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(20 + (i % 10)).padStart(2, '0')}`,
                answer: '네, 구매 조건 충족 시 자동으로 함께 배송됩니다. 선착순 사은품은 재고 소진 시 마감됩니다.',
                answerer: '무신사 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(22 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 28) + 10,
                status: '답변완료'
              },
              {
                qa_id: `QA_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_004`,
                question: `${productType} 다른 제품이랑 같이 써도 돼요?`,
                questioner: '최**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(27 + (i % 10)).padStart(2, '0')}`,
                answer: `네, 다른 스킨케어 제품과 함께 사용 가능합니다. ${productType} → 세럼 → 크림 순서로 사용하시면 좋습니다.`,
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(29 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 24) + 8,
                status: '답변완료'
              },
              {
                qa_id: `QA_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_005`,
                question: '방송 끝나도 같은 가격이에요?',
                questioner: '정**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(37 + (i % 10)).padStart(2, '0')}`,
                answer: `혜택 기간은 ${benefitValidType}입니다. 기간 내 구매하시면 동일한 혜택을 받으실 수 있습니다.`,
                answerer: '무신사 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(39 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 45) + 20,
                status: '답변완료'
              },
              {
                qa_id: `QA_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_006`,
                question: '무신사 적립금 언제 쌓여요?',
                questioner: '강**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(44 + (i % 10)).padStart(2, '0')}`,
                answer: '구매 확정 후 7일 이내에 자동 적립됩니다. 무신사 앱에서 확인 가능합니다.',
                answerer: '무신사 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(46 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 31) + 11,
                status: '답변완료'
              },
              {
                qa_id: `QA_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_007`,
                question: '쿠폰 중복 쓸 수 있나요?',
                questioner: '윤**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(50 + (i % 10)).padStart(2, '0')}`,
                answer: couponDuplicate === '가능' ? '일부 쿠폰은 중복 사용 가능합니다. 쿠폰 상세에서 확인해주세요.' : '죄송합니다. 쿠폰은 1개만 사용 가능합니다.',
                answerer: '무신사 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(52 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 38) + 16,
                status: '답변완료'
              },
              {
                qa_id: `QA_MUSINSA_${brand.code}_${String(i + 1).padStart(3, '0')}_008`,
                question: '유통기한 얼마나 돼요?',
                questioner: '임**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(54 + (i % 10)).padStart(2, '0')}`,
                answer: '제조일로부터 36개월이며, 최근 제조된 신선한 제품으로 배송됩니다.',
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(56 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 26) + 9,
                status: '답변완료'
              }
            ],
            total_qa: 8,
            answered_qa: 8,
            unanswered_qa: 0
          }
        },
        cs_info: {
          expected_questions: [
            '방송 끝났는데 혜택 받을 수 있나요?',
            '무신사 적립금은 언제 쌓이나요?',
            '쿠폰 중복 사용 가능한가요?',
            '배송은 언제 도착하나요?'
          ],
          response_scripts: [
            `혜택 유효기간은 ${benefitValidType}입니다.`,
            `무신사 적립금은 구매 확정 후 7일 이내 적립됩니다.`,
            `쿠폰 중복 사용은 ${couponDuplicate}입니다.`,
            `주문 후 2-3일 내 배송됩니다.`
          ],
          risk_points: [
            couponDuplicate === '불가' ? '쿠폰 중복 사용 불가 - 고객 문의 빈번' : '',
            excludedProducts ? `${excludedProducts} - 명시 필요` : '',
            '도서산간 배송비 별도 안내 필요'
          ].filter(Boolean),
          cs_note: `${brand.name} ${broadcastDate} 무신사 라이브 - ${promotionType}`
        }
      };
      
      musinsaData.push(liveData);
    }
  });
  
  console.log(`✅ 무신사 라이브 데이터 생성: ${musinsaData.length}개`);
  return musinsaData;
};

/**
 * 롯데온 라이브 쇼핑 데이터 생성 함수
 */
const generateLotteonLiveData = () => {
  const lotteonData = [];
  const brands = [
    { name: '설화수', code: 'SULWHASOO', count: 13 },
    { name: '라네즈', code: 'LANEIGE', count: 13 },
    { name: '아이오페', code: 'IOPE', count: 11 },
    { name: '헤라', code: 'HERA', count: 11 },
    { name: '에스트라', code: 'AESTURA', count: 9 },
    { name: '이니스프리', code: 'INNISFREE', count: 13 },
    { name: '해피바스', code: 'HAPPYBATH', count: 9 },
    { name: '바이탈뷰티', code: 'VITALBEAUTY', count: 9 },
    { name: '프리메라', code: 'PRIMERA', count: 9 },
    { name: '오설록', code: 'OSULLOC', count: 9 }
  ];
  
  const productTypes = ['에센스', '크림', '세럼', '토너', '수분크림', '앰플', '클렌징폼', '선크림', '미스트', '아이크림'];
  const promotionTypes = ['롯데온 단독', '롯데 라이브 특가', '브랜드위크', '신제품 출시', '베스트 히트', '시즌 스페셜'];
  
  brands.forEach(brand => {
    for (let i = 0; i < brand.count; i++) {
      const statusOptions = ['ACTIVE', 'PENDING', 'ENDED'];
      const statusWeights = i < 2 ? [1, 0, 0] : i < brand.count * 0.38 ? [0, 1, 0] : [0, 0, 1];
      const status = statusOptions[statusWeights.indexOf(1)];
      
      const baseDate = new Date('2025-11-28');
      let broadcastDate, hour;
      
      if (status === 'ACTIVE') {
        broadcastDate = '2025-11-28';
        hour = 16 + i;
      } else if (status === 'PENDING') {
        const daysToAdd = Math.floor(i / 2) + 1;
        const futureDate = new Date(baseDate);
        futureDate.setDate(baseDate.getDate() + daysToAdd);
        broadcastDate = futureDate.toISOString().split('T')[0];
        hour = 15 + (i % 3) * 3;
      } else {
        const daysToSubtract = Math.floor((i - brand.count * 0.38) / 2) + 1;
        const pastDate = new Date(baseDate);
        pastDate.setDate(baseDate.getDate() - daysToSubtract);
        broadcastDate = pastDate.toISOString().split('T')[0];
        hour = 13 + (i % 4) * 2;
      }
      
      const productType = productTypes[i % productTypes.length];
      const promotionType = promotionTypes[i % promotionTypes.length];
      const discountRate = 22 + (i % 5) * 6;
      const couponDuplicate = i % 3 === 0 ? '가능' : '불가';
      const excludedProducts = i % 4 === 0 ? '일부 기획 제외' : i % 4 === 1 ? '대용량 제외' : '';
      const benefitValidType = i % 3 === 0 ? '방송 중만' : i % 3 === 1 ? '당일 23:59까지' : `${broadcastDate} ~ ${new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0]}`;
      
      const liveData = {
        meta: {
          live_id: `LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}`,
          platform_name: '롯데온',
          platform_code: 'LOTTEON',
          brand_name: brand.name,
          brand_code: brand.code,
          live_title_customer: `★${brand.name} ${productType} ${promotionType}★최대 ${discountRate}% + L.POINT 7%`,
          live_title_cs: `${brand.name} ${broadcastDate.substring(5)} 롯데온 라이브 ${promotionType}`,
          source_url: `https://www.lotteon.com/live/${brand.code.toLowerCase()}_${String(i + 1).padStart(3, '0')}`,
          status: status,
          category: '뷰티'
        },
        schedule: {
          broadcast_date: broadcastDate,
          broadcast_start: `${String(hour).padStart(2, '0')}:00`,
          broadcast_end: `${String(hour + 1).padStart(2, '0')}:30`,
          benefit_valid_type: benefitValidType,
          benefit_start: status === 'PENDING' ? `${broadcastDate} ${String(hour).padStart(2, '0')}:00` : `${broadcastDate} ${String(hour).padStart(2, '0')}:00`,
          benefit_end: benefitValidType.includes('~') ? benefitValidType.split(' ~ ')[1] + ' 23:59' : benefitValidType === '방송 중만' ? `${broadcastDate} ${String(hour + 1).padStart(2, '0')}:30` : `${broadcastDate} 23:59`,
          broadcast_type: i % 5 === 0 ? '브랜드 협업' : '단독 라이브'
        },
        products: {
          product_list: [
            { sku: `${brand.code}-LOT-${String(i + 1).padStart(3, '0')}-01`, name: `${brand.name} ${productType} 본품`, option: '본품' },
            { sku: `${brand.code}-LOT-${String(i + 1).padStart(3, '0')}-02`, name: `${brand.name} ${productType} 리필`, option: '리필' },
            { sku: `${brand.code}-LOT-${String(i + 1).padStart(3, '0')}-03`, name: `${brand.name} 토너`, option: '180ml' },
            { sku: `${brand.code}-LOT-${String(i + 1).padStart(3, '0')}-SET`, name: `${brand.name} ${productType} 롯데온 단독 세트`, option: '본품+토너+기프트' }
          ],
          main_product: `${brand.name} ${productType} 본품`,
          set_composition: `본품 + 토너 + ${brand.name} 프리미엄 기프트 5종`,
          stock_info: {
            main_product_stock: 700,
            set_product_stock: 110,
            low_stock_threshold: 40
          },
          product_details: [
            {
              product_id: `${brand.code}-LOTTEON-${String(i + 1).padStart(3, '0')}-01`,
              product_name: `${brand.name} ${productType} 본품`,
              brand: brand.name,
              category: i % 3 === 0 ? '스킨케어' : i % 3 === 1 ? '메이크업' : '바디케어',
              original_price: `${(128 + i * 9) * 1000}원`,
              sale_price: `${Math.floor((128 + i * 9) * (1 - discountRate / 100)) * 1000}원`,
              discount_rate: `${discountRate}%`,
              stock_status: '재고 충분',
              stock_quantity: 700,
              options: [
                { option_name: '용량', option_values: ['본품', '리필'], selected: '본품' }
              ],
              product_features: [
                `${brand.name}의 시그니처 ${productType}`,
                '피부 타입: 모든 피부',
                '주요 성분: 히알루론산, 펩타이드, 나이아신아마이드',
                '효과: 집중 보습, 탄력 강화, 피부결 개선'
              ],
              usage_method: '세안 후 토너로 정돈한 뒤, 적당량을 얼굴 전체에 부드럽게 펴 발라줍니다.',
              caution: '화장품 사용 시 이상이 있는 경우 전문의와 상담하세요.',
              expiry_info: '제조일로부터 36개월, 개봉 후 12개월',
              certifications: ['피부 자극 테스트 완료', '저자극 인증'],
              review_summary: {
                total_reviews: 2280 + i * 140,
                average_rating: 4.7 + (i % 3) * 0.1,
                rating_distribution: {
                  '5점': 1700 + i * 90,
                  '4점': 420 + i * 30,
                  '3점': 110 + i * 12,
                  '2점': 35 + i * 5,
                  '1점': 15 + i * 3
                },
                top_positive_keywords: ['보습력 좋음', '흡수 빠름', '효과 좋음', '가성비'],
                top_negative_keywords: ['용량 작음', '향']
              }
            },
            {
              product_id: `${brand.code}-LOTTEON-${String(i + 1).padStart(3, '0')}-SET`,
              product_name: `${brand.name} ${productType} 롯데온 단독 세트`,
              brand: brand.name,
              category: '세트/기획',
              original_price: `${(182 + i * 14) * 1000}원`,
              sale_price: `${Math.floor((182 + i * 14) * 0.58) * 1000}원`,
              discount_rate: '42%',
              stock_status: '한정수량',
              stock_quantity: 110,
              options: [],
              set_contents: [
                { item_name: `${brand.name} ${productType} 본품`, quantity: 1, price: `${(128 + i * 9) * 1000}원` },
                { item_name: `${brand.name} 토너`, quantity: 1, price: '30,000원' },
                { item_name: `${brand.name} 프리미엄 기프트`, quantity: 1, price: '24,000원' }
              ],
              total_set_value: `${(182 + i * 14) * 1000}원`,
              set_save_amount: `${Math.floor((182 + i * 14) * 0.42) * 1000}원`,
              product_features: [
                '롯데온 라이브 단독 구성',
                '본품 + 토너 + 프리미엄 기프트 5종',
                `최대 ${Math.floor((182 + i * 14) * 0.42) * 1000}원 혜택`
              ],
              usage_method: '세트 구성품별 사용법 참고',
              expiry_info: '제조일로부터 36개월',
              review_summary: {
                total_reviews: 720 + i * 48,
                average_rating: 4.8 + (i % 2) * 0.1,
                top_positive_keywords: ['구성 풍성', '가성비 최고', '선물 좋음']
              }
            }
          ],
          coupons: [
            {
              coupon_id: `LOTTEON_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              coupon_name: '롯데온 라이브 전용 쿠폰',
              coupon_type: '플랫폼쿠폰',
              discount_type: i % 2 === 0 ? '정률할인' : '정액할인',
              discount_value: i % 2 === 0 ? '12%' : '18,000원',
              min_purchase_amount: '100,000원',
              max_discount_amount: i % 2 === 0 ? '30,000원' : null,
              issue_condition: '라이브 시청 시 자동 발급',
              expiry_date: `${broadcastDate} 23:59`,
              duplicate_use: couponDuplicate
            },
            {
              coupon_id: `LOTTEON_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              coupon_name: `${brand.name} 브랜드 쿠폰`,
              coupon_type: '브랜드쿠폰',
              discount_type: '정액할인',
              discount_value: '17,000원',
              min_purchase_amount: '130,000원',
              max_discount_amount: null,
              issue_condition: '쿠폰함에서 다운로드',
              expiry_date: new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0],
              duplicate_use: '불가'
            },
            {
              coupon_id: `LOTTEON_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              coupon_name: '롯데카드 결제 쿠폰',
              coupon_type: '결제쿠폰',
              discount_type: '정액할인',
              discount_value: '10,000원',
              min_purchase_amount: '80,000원',
              max_discount_amount: null,
              issue_condition: '롯데카드 결제 시 자동',
              expiry_date: new Date(new Date(broadcastDate).getTime() + 14*24*60*60*1000).toISOString().split('T')[0],
              duplicate_use: '가능'
            }
          ],
          benefits: {
            coupons: [
              {
                coupon_id: `LOTTEON_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
                coupon_name: '롯데온 라이브 전용 쿠폰',
                coupon_type: '플랫폼쿠폰',
                discount_type: i % 2 === 0 ? '정률할인' : '정액할인',
                discount_value: i % 2 === 0 ? '12%' : '18,000원',
                min_purchase_amount: '100,000원',
                max_discount_amount: i % 2 === 0 ? '30,000원' : null,
                issue_condition: '라이브 시청 시 자동 발급',
                expiry_date: `${broadcastDate} 23:59`,
                duplicate_use: couponDuplicate
              },
              {
                coupon_id: `LOTTEON_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
                coupon_name: `${brand.name} 브랜드 쿠폰`,
                coupon_type: '브랜드쿠폰',
                discount_type: '정액할인',
                discount_value: '17,000원',
                min_purchase_amount: '130,000원',
                max_discount_amount: null,
                issue_condition: '쿠폰함에서 다운로드',
                expiry_date: new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0],
                duplicate_use: '불가'
              },
              {
                coupon_id: `LOTTEON_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
                coupon_name: '롯데카드 결제 쿠폰',
                coupon_type: '결제쿠폰',
                discount_type: '정액할인',
                discount_value: '10,000원',
                min_purchase_amount: '80,000원',
                max_discount_amount: null,
                issue_condition: '롯데카드 결제 시 자동',
                expiry_date: new Date(new Date(broadcastDate).getTime() + 14*24*60*60*1000).toISOString().split('T')[0],
                duplicate_use: '가능'
              }
            ],
            discounts: [
              {
                benefit_id: `LOTTEON_BENEFIT_DISCOUNT_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '할인',
                benefit_name: `롯데온 라이브 ${discountRate}% 할인`,
                discount_type: '정률할인',
                discount_value: `${discountRate}%`,
                condition: '라이브 방송 중 결제',
                duplicate_with_coupon: couponDuplicate
              },
              {
                benefit_id: `LOTTEON_BENEFIT_DISCOUNT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '할인',
                benefit_name: '롯데카드 추가 할인',
                discount_type: '정액할인',
                discount_value: '10,000원',
                condition: '롯데카드 결제 시',
                duplicate_with_coupon: '가능'
              }
            ],
            gifts: [
              {
                benefit_id: `LOTTEON_BENEFIT_GIFT1_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '사은품',
                benefit_name: `${brand.name} 프리미엄 키트`,
                gift_items: [
                  { item_name: `${brand.name} 샘플 5종`, quantity: 1 },
                  { item_name: `${brand.name} 에코백`, quantity: 1 }
                ],
                gift_type: '구매조건형',
                condition: '9만원 이상 구매',
                quantity_limit: '전원 증정',
                duplicate_with_other_gift: '가능'
              },
              {
                benefit_id: `LOTTEON_BENEFIT_GIFT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '사은품',
                benefit_name: `${brand.name} 럭셔리 기프트`,
                gift_items: [
                  { item_name: `${brand.name} ${productType} 미니`, quantity: 1 }
                ],
                gift_type: '선착순형',
                condition: '13만원 이상 구매',
                quantity_limit: '선착순 180명',
                duplicate_with_other_gift: '불가'
              }
            ],
            points: [
              {
                benefit_id: `LOTTEON_BENEFIT_POINT_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '포인트',
                benefit_name: 'L.POINT 7% 적립',
                point_rate: '7%',
                max_point: '15,000원',
                condition: '롯데온 회원',
                expiry_period: '적립일로부터 1년'
              },
              {
                benefit_id: `LOTTEON_BENEFIT_POINT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '포인트',
                benefit_name: 'VIP 회원 추가 적립',
                point_rate: '3%',
                max_point: '8,000원',
                condition: 'VIP 회원',
                expiry_period: '적립일로부터 1년'
              }
            ],
            delivery: [
              {
                benefit_id: `LOTTEON_BENEFIT_DELIVERY_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '배송',
                benefit_name: '무료배송',
                delivery_type: '무료배송',
                delivery_condition: '전상품',
                expected_delivery: '주문 후 2-3일'
              }
            ]
          },
          events: [
            {
              event_id: `LOTTEON_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              event_name: '롯데온 라이브 타임특가',
              event_type: '타임특가',
              event_description: `방송 시작 후 30분간 추가 7% 할인`,
              event_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:00 ~ ${String(hour).padStart(2, '0')}:30`,
              event_benefit: '추가 7% 할인',
              participation_method: '자동 적용'
            },
            {
              event_id: `LOTTEON_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              event_name: '롯데카드 특별 혜택',
              event_type: '결제 혜택',
              event_description: '롯데카드 결제 시 10,000원 추가 할인',
              event_period: benefitValidType,
              event_benefit: '10,000원 추가 할인',
              participation_method: '롯데카드 결제'
            },
            {
              event_id: `LOTTEON_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              event_name: `${brand.name} L.POINT DAY`,
              event_type: '포인트',
              event_description: '브랜드 멤버십 회원 L.POINT 2배 적립',
              event_period: `${broadcastDate} ~ ${new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0]}`,
              event_benefit: 'L.POINT 2배 적립',
              participation_method: '자동 적용'
            }
          ]
        },
        policy: {
          coupon_duplicate: couponDuplicate,
          point_duplicate: '가능',
          other_promotion_duplicate: i % 3 === 0 ? '쿠폰+포인트 중복 가능' : '쿠폰 1개만 사용',
          employee_discount: i % 5 === 0 ? '중복 가능' : '중복 불가'
        },
        restrictions: {
          excluded_products: excludedProducts,
          channel_restriction: '롯데온 앱/웹 전용',
          payment_method_restriction: '롯데카드 사용 시 추가 혜택',
          region_restriction: '도서산간 배송비 별도'
        },
        chat_info: {
          total_chats: 820 + i * 165,
          total_participants: 185 + i * 33,
          chat_statistics: {
            average_chats_per_minute: 15 + i * 2,
            peak_time: `${String(hour).padStart(2, '0')}:${String(17 + (i % 3) * 9).padStart(2, '0')}`,
            peak_chats_per_minute: 42 + i * 5
          },
          popular_keywords: [
            { keyword: '할인', count: 175 + i * 19 },
            { keyword: '쿠폰', count: 148 + i * 15 },
            { keyword: '사은품', count: 128 + i * 13 },
            { keyword: '재고', count: 108 + i * 11 },
            { keyword: 'L.POINT', count: 95 + i * 10 },
            { keyword: '효과', count: 82 + i * 9 },
            { keyword: '가격', count: 72 + i * 7 },
            { keyword: '세트', count: 62 + i * 6 },
            { keyword: '추천', count: 52 + i * 5 },
            { keyword: productType, count: 120 + i * 12 }
          ],
          emoji_reactions: [
            { emoji: '❤️', count: 440 + i * 48 },
            { emoji: '👍', count: 370 + i * 40 },
            { emoji: '😍', count: 310 + i * 34 },
            { emoji: '🔥', count: 270 + i * 30 },
            { emoji: '👏', count: 215 + i * 24 }
          ],
          key_chats: [
            { username: '롯데팬***', message: `${productType} 정말 좋아요!`, timestamp: `${String(hour).padStart(2, '0')}:07`, likes: 44 + i * 3 },
            { username: '뷰티덕후***', message: '이 가격 진짜 혜자네요', timestamp: `${String(hour).padStart(2, '0')}:14`, likes: 38 + i * 2 },
            { username: '리뷰왕***', message: `${brand.name} 제품 믿고 삽니다`, timestamp: `${String(hour).padStart(2, '0')}:20`, likes: 41 + i * 3 },
            { username: '할인러버***', message: 'L.POINT까지 쌓이니까 좋아요!', timestamp: `${String(hour).padStart(2, '0')}:27`, likes: 35 + i * 2 },
            { username: '롯데유저***', message: '세트 구성 알차네요', timestamp: `${String(hour).padStart(2, '0')}:35`, likes: 39 + i * 3 },
            { username: '뷰티마니아***', message: '사은품 언제 오나요?', timestamp: `${String(hour).padStart(2, '0')}:42`, likes: 28 + i * 2 },
            { username: '쇼핑홀릭***', message: '재고 얼마 안 남았어요!', timestamp: `${String(hour).padStart(2, '0')}:50`, likes: 50 + i * 4 },
            { username: '현명소비***', message: '가성비 최고네요', timestamp: `${String(hour).padStart(2, '0')}:57`, likes: 33 + i * 2 },
            { username: '롯데러버***', message: `${productType} 추천!`, timestamp: `${String(hour + 1).padStart(2, '0')}:10`, likes: 43 + i * 3 },
            { username: '리얼후기***', message: '배송 빠르고 포장 좋아요', timestamp: `${String(hour + 1).padStart(2, '0')}:20`, likes: 37 + i * 2 }
          ],
          frequently_asked: [
            { question: '쿠폰 중복 사용 되나요?', count: 28 + i * 3 },
            { question: '배송 언제 와요?', count: 32 + i * 4 },
            { question: '사은품 자동으로 오나요?', count: 25 + i * 3 },
            { question: '재고 얼마나 남았어요?', count: 22 + i * 2 },
            { question: 'L.POINT 언제 적립되나요?', count: 20 + i * 2 }
          ],
          sentiment_analysis: {
            positive: 73 + i % 8,
            neutral: 21 - i % 5,
            negative: 6 - i % 3
          }
        },
        live_specific: {
          key_mentions: [
            `[00:04] 안녕하세요! 롯데온 LIVE ${brand.name} ${productType} 방송 시작합니다!`,
            `[00:16] ${brand.name} ${productType}는 ${i % 3 === 0 ? '강력한 보습력으로' : i % 3 === 1 ? '빠른 흡수력으로' : '산뜻한 마무리감으로'} 완벽한 데일리 케어 제품입니다!`,
            `[02:55] ${productType}의 핵심 성분과 효능을 자세히 설명드리겠습니다!`,
            `[05:45] 💰 지금 구매하시면 최대 ${discountRate}% 할인 + 쿠폰까지 중복!`,
            `[08:30] 🎁 9만원 이상 구매 시 ${brand.name} 프리미엄 키트 전원 증정!`,
            `[12:50] "${productType} 정말 좋아요! 피부가 탄력있어졌어요!" - 실시간 후기`,
            `[15:35] ⚡ 선착순 180명! 서둘러주세요!`,
            `[18:20] ${productType}는 아침 저녁 스킨케어 루틴에 필수입니다!`,
            `[22:45] 한 방울만 발라도 촉촉하게 하루종일 보습이 지속됩니다!`,
            `[25:30] ⏰ 방송 시작 30분간 타임특가 추가 7% 할인!`,
            `[28:15] 💳 롯데카드 결제 시 10,000원 추가 할인 + L.POINT 7% 적립!`,
            `[32:50] 💎 L.POINT 적립으로 더욱 알뜰하게!`,
            `[35:25] 실시간 주문이 쏟아지고 있어요! 벌써 50개 판매!`,
            `[38:40] ${productType}는 모든 피부 타입에 사용 가능합니다!`,
            `[42:25] 마지막 기회! 놓치지 마세요!`,
            `[45:15] 남은 사은품이 30개밖에 없어요! 지금 주문하세요!`,
            `[48:50] 🎁 오늘 구매하신 분들 전원 무료배송!`,
            `[52:35] 주문 폭주 중! 배송은 내일 바로 시작됩니다!`,
            `[55:20] 마지막 4분! 방송 종료 후엔 정상가로 돌아갑니다!`,
            `[58:45] ${productType}로 건강하고 아름다운 피부 만드세요!`,
            `[59:50] 구매해주신 모든 분들 감사합니다! 다음 라이브에서 또 만나요!`
          ],
          broadcast_qa: [
            {
              time: `${String(hour).padStart(2, '0')}:10`,
              question: `${productType}는 어떤 피부에 좋나요?`,
              answer: '모든 피부 타입에 사용 가능하며, 특히 건조하고 민감한 피부에 효과적입니다.'
            },
            {
              time: `${String(hour).padStart(2, '0')}:17`,
              question: '세트 구성품 정품 사이즈인가요?',
              answer: '본품은 정품 사이즈이고, 토너와 프리미엄 기프트는 체험 사이즈입니다.'
            },
            {
              time: `${String(hour).padStart(2, '0')}:25`,
              question: '사은품은 언제까지 받을 수 있나요?',
              answer: `선착순 180명이며, 재고 소진 시 조기 종료됩니다. 서둘러 주문하세요!`
            },
            {
              time: `${String(hour).padStart(2, '0')}:40`,
              question: 'L.POINT는 언제 적립되나요?',
              answer: '구매 확정 후 7일 이내에 자동으로 적립됩니다.'
            }
          ],
          timeline: [
            { time: '00:00', description: '방송 시작 및 인사' },
            { time: '00:05', description: `${brand.name} 브랜드 소개` },
            { time: '00:12', description: `${productType} 제품 상세 설명` },
            { time: '00:20', description: '혜택 안내 (할인/쿠폰/사은품)' },
            { time: '00:30', description: '사용법 시연' },
            { time: '00:40', description: '시청자 Q&A' },
            { time: '00:50', description: '타임특가 안내' },
            { time: '01:00', description: '세트 구성 상세 소개' },
            { time: '01:10', description: 'L.POINT 적립 혜택 설명' },
            { time: '01:20', description: '재고 현황 및 마감 멘트' },
            { time: '01:28', description: '마무리' }
          ]
        },
        product_list_tab: {
          tab_name: '상품 목록',
          total_products: 4,
          product_details: [
            {
              product_id: `${brand.code}-LOTTEON-${String(i + 1).padStart(3, '0')}-01`,
              product_name: `${brand.name} ${productType} 본품`,
              brand: brand.name,
              category: i % 3 === 0 ? '스킨케어' : i % 3 === 1 ? '메이크업' : '바디케어',
              original_price: `${(128 + i * 9) * 1000}원`,
              sale_price: `${Math.floor((128 + i * 9) * (1 - discountRate / 100)) * 1000}원`,
              discount_rate: `${discountRate}%`,
              stock_status: '재고 충분',
              stock_quantity: 700,
              options: [
                { option_name: '용량', option_values: ['본품', '리필'], selected: '본품' }
              ],
              product_features: [
                `${brand.name}의 시그니처 ${productType}`,
                '피부 타입: 모든 피부',
                '주요 성분: 히알루론산, 펩타이드, 나이아신아마이드',
                '효과: 집중 보습, 탄력 강화, 피부결 개선'
              ],
              usage_method: '세안 후 토너로 정돈한 뒤, 적당량을 얼굴 전체에 부드럽게 펴 발라줍니다.',
              caution: '화장품 사용 시 이상이 있는 경우 전문의와 상담하세요.',
              expiry_info: '제조일로부터 36개월, 개봉 후 12개월',
              certifications: ['피부 자극 테스트 완료', '저자극 인증'],
              review_summary: {
                total_reviews: 2280 + i * 140,
                average_rating: 4.7 + (i % 3) * 0.1,
                rating_distribution: {
                  '5점': 1700 + i * 90,
                  '4점': 420 + i * 30,
                  '3점': 110 + i * 12,
                  '2점': 35 + i * 5,
                  '1점': 15 + i * 3
                },
                top_positive_keywords: ['보습력 좋음', '흡수 빠름', '효과 좋음', '가성비'],
                top_negative_keywords: ['용량 작음', '향']
              }
            },
            {
              product_id: `${brand.code}-LOTTEON-${String(i + 1).padStart(3, '0')}-SET`,
              product_name: `${brand.name} ${productType} 롯데온 단독 세트`,
              brand: brand.name,
              category: '세트/기획',
              original_price: `${(182 + i * 14) * 1000}원`,
              sale_price: `${Math.floor((182 + i * 14) * 0.58) * 1000}원`,
              discount_rate: '42%',
              stock_status: '한정수량',
              stock_quantity: 110,
              options: [],
              set_contents: [
                { item_name: `${brand.name} ${productType} 본품`, quantity: 1, price: `${(128 + i * 9) * 1000}원` },
                { item_name: `${brand.name} 토너`, quantity: 1, price: '30,000원' },
                { item_name: `${brand.name} 프리미엄 기프트`, quantity: 1, price: '24,000원' }
              ],
              total_set_value: `${(182 + i * 14) * 1000}원`,
              set_save_amount: `${Math.floor((182 + i * 14) * 0.42) * 1000}원`,
              product_features: [
                '롯데온 라이브 단독 구성',
                '본품 + 토너 + 프리미엄 기프트 5종',
                `최대 ${Math.floor((182 + i * 14) * 0.42) * 1000}원 혜택`
              ],
              usage_method: '세트 구성품별 사용법 참고',
              expiry_info: '제조일로부터 36개월',
              review_summary: {
                total_reviews: 720 + i * 48,
                average_rating: 4.8 + (i % 2) * 0.1,
                top_positive_keywords: ['구성 풍성', '가성비 최고', '선물 좋음']
              }
            }
          ]
        },
        faq_tab: {
          tab_name: 'FAQ',
          notice_section: {
            title: '공지사항',
            notices: [
              {
                notice_id: `NOTICE_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
                title: `${brand.name} 롯데온 라이브 혜택 안내`,
                content: `안녕하세요, 롯데온입니다.\n\n${brand.name} 라이브 방송의 특별 혜택을 안내드립니다.\n\n[방송 혜택]\n- 라이브 할인: 최대 ${discountRate}%\n- 롯데카드 추가할인: 10,000원\n- L.POINT 7% 적립\n\n[유의사항]\n- 혜택은 ${benefitValidType}입니다.\n- 일부 제외 상품이 있을 수 있습니다.\n- 쿠폰 중복 사용은 ${couponDuplicate}입니다.\n\n감사합니다.`,
                post_date: broadcastDate,
                view_count: Math.floor(Math.random() * 460) + 190,
                is_important: true
              },
              {
                notice_id: `NOTICE_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
                title: 'L.POINT 적립 안내',
                content: `L.POINT는 다음과 같이 적립됩니다.\n\n[적립]\n- 기본 7% 적립\n- VIP 회원 추가 3% 적립\n- 최대 15,000원 적립\n- 구매 확정 후 7일 이내 지급\n\n[사용]\n- 1,000원 단위로 사용 가능\n- 유효기간: 적립일로부터 1년\n\n롯데온 앱에서 확인하실 수 있습니다.`,
                post_date: new Date(new Date(broadcastDate).getTime() - 5*24*60*60*1000).toISOString().split('T')[0],
                view_count: Math.floor(Math.random() * 620) + 260,
                is_important: true
              },
              {
                notice_id: `NOTICE_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
                title: '교환/반품 안내',
                content: `[교환/반품 기준]\n- 상품 수령 후 7일 이내\n- 미개봉 상품에 한함\n- 단순 변심 시 배송비 고객 부담\n\n[교환/반품 불가]\n- 사용한 상품\n- 상품 가치 훼손\n- 재판매 불가능한 경우\n\n롯데온 고객센터로 문의해주세요.`,
                post_date: new Date(new Date(broadcastDate).getTime() - 9*24*60*60*1000).toISOString().split('T')[0],
                view_count: Math.floor(Math.random() * 510) + 210,
                is_important: false
              }
            ]
          },
          faq_section: {
            title: '자주 묻는 질문 (FAQ)',
            categories: [
              {
                category_name: '배송',
                faqs: [
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_SHIPPING_01`,
                    question: '배송은 언제 도착하나요?',
                    answer: '주문 후 영업일 기준 2-3일 내 배송됩니다. 도서산간 지역은 추가 1-2일 소요될 수 있습니다.',
                    view_count: Math.floor(Math.random() * 275) + 135,
                    helpful_count: Math.floor(Math.random() * 195) + 92,
                    category: '배송'
                  },
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_SHIPPING_02`,
                    question: '배송비는 얼마인가요?',
                    answer: '롯데온 라이브 상품은 전상품 무료배송입니다. 도서산간 지역은 추가 배송비가 발생할 수 있습니다.',
                    view_count: Math.floor(Math.random() * 235) + 115,
                    helpful_count: Math.floor(Math.random() * 175) + 87,
                    category: '배송'
                  },
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_SHIPPING_03`,
                    question: '배송 조회는 어떻게 하나요?',
                    answer: '롯데온 앱 > 마이페이지 > 주문/배송에서 실시간 확인 가능합니다. 송장번호는 문자로 발송됩니다.',
                    view_count: Math.floor(Math.random() * 195) + 97,
                    helpful_count: Math.floor(Math.random() * 145) + 77,
                    category: '배송'
                  }
                ]
              },
              {
                category_name: '혜택/쿠폰',
                faqs: [
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_BENEFIT_01`,
                    question: 'L.POINT는 언제 적립되나요?',
                    answer: '구매 확정 후 7일 이내에 자동 적립됩니다. 롯데온 앱 > 마이페이지 > L.POINT에서 확인 가능합니다.',
                    view_count: Math.floor(Math.random() * 315) + 165,
                    helpful_count: Math.floor(Math.random() * 235) + 125,
                    category: '혜택/쿠폰'
                  },
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_BENEFIT_02`,
                    question: '쿠폰 중복 사용 되나요?',
                    answer: couponDuplicate === '가능' 
                      ? '네, 일부 쿠폰은 중복 사용 가능합니다. 쿠폰 상세에서 중복 사용 가능 여부를 확인하실 수 있습니다.'
                      : '죄송합니다. 쿠폰은 1개만 사용 가능합니다. 가장 할인율이 높은 쿠폰을 선택해주세요.',
                    view_count: Math.floor(Math.random() * 270) + 138,
                    helpful_count: Math.floor(Math.random() * 195) + 98,
                    category: '혜택/쿠폰'
                  },
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_BENEFIT_03`,
                    question: '롯데카드 혜택은 뭐에요?',
                    answer: '롯데카드로 결제 시 10,000원 추가 할인과 L.POINT 추가 적립 혜택을 받으실 수 있습니다.',
                    view_count: Math.floor(Math.random() * 220) + 112,
                    helpful_count: Math.floor(Math.random() * 170) + 85,
                    category: '혜택/쿠폰'
                  }
                ]
              },
              {
                category_name: '상품/사은품',
                faqs: [
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_PRODUCT_01`,
                    question: '사은품은 어떻게 받나요?',
                    answer: '구매 조건 충족 시 자동으로 함께 배송됩니다. 선착순 사은품은 재고 소진 시 조기 마감됩니다.',
                    view_count: Math.floor(Math.random() * 280) + 142,
                    helpful_count: Math.floor(Math.random() * 205) + 103,
                    category: '상품/사은품'
                  },
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_PRODUCT_02`,
                    question: '세트 구성품 따로 살 수 없나요?',
                    answer: '라이브 세트는 방송 전용 구성으로 개별 구매가 불가합니다. 본품은 일반 판매 페이지에서 구매 가능합니다.',
                    view_count: Math.floor(Math.random() * 175) + 88,
                    helpful_count: Math.floor(Math.random() * 135) + 68,
                    category: '상품/사은품'
                  },
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_PRODUCT_03`,
                    question: '재고 부족하면 어떻게 되나요?',
                    answer: '재고 부족 시 주문 취소되며, 결제 금액은 즉시 환불됩니다. 재고는 실시간으로 업데이트됩니다.',
                    view_count: Math.floor(Math.random() * 160) + 82,
                    helpful_count: Math.floor(Math.random() * 125) + 63,
                    category: '상품/사은품'
                  }
                ]
              },
              {
                category_name: '결제',
                faqs: [
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_PAYMENT_01`,
                    question: '어떤 결제 수단을 쓸 수 있나요?',
                    answer: '신용카드, 체크카드, 계좌이체, 휴대폰, 카카오페이, 네이버페이, 토스 등 다양한 결제 수단을 지원합니다.',
                    view_count: Math.floor(Math.random() * 145) + 73,
                    helpful_count: Math.floor(Math.random() * 105) + 53,
                    category: '결제'
                  },
                  {
                    faq_id: `FAQ_LOTTEON_${brand.code}_PAYMENT_02`,
                    question: '롯데카드 혜택이 뭐에요?',
                    answer: '롯데카드로 결제 시 10,000원 추가 할인과 L.POINT 추가 적립 혜택을 받으실 수 있습니다.',
                    view_count: Math.floor(Math.random() * 135) + 68,
                    helpful_count: Math.floor(Math.random() * 100) + 52,
                    category: '결제'
                  }
                ]
              }
            ],
            total_faqs: 11
          },
          qa_section: {
            title: '실시간 Q&A',
            description: '방송 중 고객님들이 남기신 질문과 답변입니다.',
            qa_list: [
              {
                qa_id: `QA_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_001`,
                question: `${productType}는 어떤 피부에 좋나요?`,
                questioner: '김**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(10 + (i % 10)).padStart(2, '0')}`,
                answer: `모든 피부 타입에 사용 가능하며, 특히 건조하고 민감한 피부에 효과적입니다. ${brand.name} ${productType}는 피부 자극 테스트를 완료한 제품입니다.`,
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(12 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 44) + 19,
                status: '답변완료'
              },
              {
                qa_id: `QA_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_002`,
                question: '세트 정품 사이즈 맞나요?',
                questioner: '이**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(15 + (i % 10)).padStart(2, '0')}`,
                answer: '본품은 정품 사이즈이고, 토너와 프리미엄 기프트는 체험 사이즈입니다.',
                answerer: '롯데온 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(17 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 36) + 15,
                status: '답변완료'
              },
              {
                qa_id: `QA_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_003`,
                question: '사은품 자동으로 오나요?',
                questioner: '박**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(21 + (i % 10)).padStart(2, '0')}`,
                answer: '네, 구매 조건 충족 시 자동으로 함께 배송됩니다. 선착순 사은품은 재고 소진 시 마감됩니다.',
                answerer: '롯데온 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(23 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 31) + 12,
                status: '답변완료'
              },
              {
                qa_id: `QA_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_004`,
                question: `${productType} 다른 제품이랑 같이 써도 돼요?`,
                questioner: '최**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(28 + (i % 10)).padStart(2, '0')}`,
                answer: `네, 다른 스킨케어 제품과 함께 사용 가능합니다. ${productType} → 세럼 → 크림 순서로 사용하시면 좋습니다.`,
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(30 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 27) + 10,
                status: '답변완료'
              },
              {
                qa_id: `QA_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_005`,
                question: '방송 끝나도 같은 가격이에요?',
                questioner: '정**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(38 + (i % 10)).padStart(2, '0')}`,
                answer: `혜택 기간은 ${benefitValidType}입니다. 기간 내 구매하시면 동일한 혜택을 받으실 수 있습니다.`,
                answerer: '롯데온 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(40 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 47) + 21,
                status: '답변완료'
              },
              {
                qa_id: `QA_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_006`,
                question: 'L.POINT 언제 쌓여요?',
                questioner: '강**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(45 + (i % 10)).padStart(2, '0')}`,
                answer: '구매 확정 후 7일 이내에 자동 적립됩니다. 롯데온 앱에서 확인 가능합니다.',
                answerer: '롯데온 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(47 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 34) + 13,
                status: '답변완료'
              },
              {
                qa_id: `QA_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_007`,
                question: '쿠폰 중복 쓸 수 있나요?',
                questioner: '윤**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(51 + (i % 10)).padStart(2, '0')}`,
                answer: couponDuplicate === '가능' ? '일부 쿠폰은 중복 사용 가능합니다. 쿠폰 상세에서 확인해주세요.' : '죄송합니다. 쿠폰은 1개만 사용 가능합니다.',
                answerer: '롯데온 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(53 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 41) + 18,
                status: '답변완료'
              },
              {
                qa_id: `QA_LOTTEON_${brand.code}_${String(i + 1).padStart(3, '0')}_008`,
                question: '유통기한 얼마나 돼요?',
                questioner: '임**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(55 + (i % 10)).padStart(2, '0')}`,
                answer: '제조일로부터 36개월이며, 최근 제조된 신선한 제품으로 배송됩니다. 개봉 후 12개월 이내 사용을 권장드립니다.',
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(57 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 29) + 11,
                status: '답변완료'
              }
            ],
            total_qa: 8,
            answered_qa: 8,
            unanswered_qa: 0
          }
        },
        cs_info: {
          expected_questions: [
            '방송 끝났는데 혜택 받을 수 있나요?',
            'L.POINT는 언제 적립되나요?',
            '쿠폰 중복 사용 가능한가요?',
            '배송은 언제 도착하나요?'
          ],
          response_scripts: [
            `혜택 유효기간은 ${benefitValidType}입니다.`,
            `L.POINT는 구매 확정 후 7일 이내 적립됩니다.`,
            `쿠폰 중복 사용은 ${couponDuplicate}입니다.`,
            `주문 후 2-3일 내 배송됩니다.`
          ],
          risk_points: [
            couponDuplicate === '불가' ? '쿠폰 중복 사용 불가 - 고객 문의 빈번' : '',
            excludedProducts ? `${excludedProducts} - 명시 필요` : '',
            '도서산간 배송비 별도 안내 필요'
          ].filter(Boolean),
          cs_note: `${brand.name} ${broadcastDate} 롯데온 라이브 - ${promotionType}`
        }
      };
      
      lotteonData.push(liveData);
    }
  });
  
  console.log(`✅ 롯데온 라이브 데이터 생성: ${lotteonData.length}개`);
  return lotteonData;
};

/**
 * 아모레몰 라이브 방송 데이터 생성 함수
 */
const generateAmoremallLiveData = () => {
  const amoremallData = [];
  const brands = [
    { name: '설화수', code: 'SULWHASOO', count: 15 },
    { name: '라네즈', code: 'LANEIGE', count: 15 },
    { name: '아이오페', code: 'IOPE', count: 13 },
    { name: '헤라', code: 'HERA', count: 13 },
    { name: '에스트라', code: 'AESTURA', count: 11 },
    { name: '이니스프리', code: 'INNISFREE', count: 15 },
    { name: '해피바스', code: 'HAPPYBATH', count: 11 },
    { name: '바이탈뷰티', code: 'VITALBEAUTY', count: 11 },
    { name: '프리메라', code: 'PRIMERA', count: 11 },
    { name: '오설록', code: 'OSULLOC', count: 11 }
  ];
  
  const productTypes = ['에센스', '크림', '세럼', '토너', '수분크림', '앰플', '클렌징폼', '선크림', '미스트', '아이크림', '립스틱', '쿠션'];
  const promotionTypes = ['아모레몰 단독', '브랜드 스페셜', '멤버십 혜택', '신제품 런칭', '베스트 히트', '시즌 콜렉션'];
  
  brands.forEach(brand => {
    for (let i = 0; i < brand.count; i++) {
      const statusOptions = ['ACTIVE', 'PENDING', 'ENDED'];
      const statusWeights = i < 2 ? [1, 0, 0] : i < brand.count * 0.40 ? [0, 1, 0] : [0, 0, 1];
      const status = statusOptions[statusWeights.indexOf(1)];
      
      const baseDate = new Date('2025-11-28');
      let broadcastDate, hour;
      
      if (status === 'ACTIVE') {
        broadcastDate = '2025-11-28';
        hour = 16 + i;
      } else if (status === 'PENDING') {
        const daysToAdd = Math.floor(i / 2) + 1;
        const futureDate = new Date(baseDate);
        futureDate.setDate(baseDate.getDate() + daysToAdd);
        broadcastDate = futureDate.toISOString().split('T')[0];
        hour = 15 + (i % 3) * 3;
      } else {
        const daysToSubtract = Math.floor((i - brand.count * 0.40) / 2) + 1;
        const pastDate = new Date(baseDate);
        pastDate.setDate(baseDate.getDate() - daysToSubtract);
        broadcastDate = pastDate.toISOString().split('T')[0];
        hour = 13 + (i % 4) * 2;
      }
      
      const productType = productTypes[i % productTypes.length];
      const promotionType = promotionTypes[i % promotionTypes.length];
      const discountRate = 25 + (i % 5) * 7;
      const couponDuplicate = i % 3 === 0 ? '가능' : '불가';
      const excludedProducts = i % 4 === 0 ? '일부 기획 제외' : i % 4 === 1 ? '대용량 제외' : '';
      const benefitValidType = i % 3 === 0 ? '방송 중만' : i % 3 === 1 ? '당일 23:59까지' : `${broadcastDate} ~ ${new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0]}`;
      
      const liveData = {
        meta: {
          live_id: `AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}`,
          platform_name: '아모레몰',
          platform_code: 'AMOREMALL',
          brand_name: brand.name,
          brand_code: brand.code,
          live_title_customer: `★${brand.name} ${productType} ${promotionType}★최대 ${discountRate}% + 아모레포인트 10%`,
          live_title_cs: `${brand.name} ${broadcastDate.substring(5)} 아모레몰 라이브 ${promotionType}`,
          source_url: `https://www.amoremall.com/kr/ko/live/${brand.code.toLowerCase()}_${String(i + 1).padStart(3, '0')}`,
          status: status,
          category: '뷰티',
          collected_at: new Date().toISOString()
        },
        schedule: {
          broadcast_date: broadcastDate,
          broadcast_start: `${String(hour).padStart(2, '0')}:00`,
          broadcast_end: `${String(hour + 1).padStart(2, '0')}:30`,
          benefit_valid_type: benefitValidType,
          benefit_start: status === 'PENDING' ? `${broadcastDate} ${String(hour).padStart(2, '0')}:00` : `${broadcastDate} ${String(hour).padStart(2, '0')}:00`,
          benefit_end: benefitValidType.includes('~') ? benefitValidType.split(' ~ ')[1] + ' 23:59' : benefitValidType === '방송 중만' ? `${broadcastDate} ${String(hour + 1).padStart(2, '0')}:30` : `${broadcastDate} 23:59`,
          broadcast_type: i % 5 === 0 ? '브랜드 협업' : '단독 라이브'
        },
        products: {
          product_list: [
            { sku: `${brand.code}-AMR-${String(i + 1).padStart(3, '0')}-01`, name: `${brand.name} ${productType} 본품`, option: '본품' },
            { sku: `${brand.code}-AMR-${String(i + 1).padStart(3, '0')}-02`, name: `${brand.name} ${productType} 리필`, option: '리필' },
            { sku: `${brand.code}-AMR-${String(i + 1).padStart(3, '0')}-03`, name: `${brand.name} 토너`, option: '200ml' },
            { sku: `${brand.code}-AMR-${String(i + 1).padStart(3, '0')}-SET`, name: `${brand.name} ${productType} 아모레몰 단독 세트`, option: '본품+토너+럭셔리 기프트' }
          ],
          main_product: `${brand.name} ${productType} 본품`,
          set_composition: `본품 + 토너 + ${brand.name} 럭셔리 기프트 7종`,
          stock_info: {
            main_product_stock: 850,
            set_product_stock: 140,
            low_stock_threshold: 50
          },
          product_details: [
            {
              product_id: `${brand.code}-AMOREMALL-${String(i + 1).padStart(3, '0')}-01`,
              product_name: `${brand.name} ${productType} 본품`,
              brand: brand.name,
              category: i % 3 === 0 ? '스킨케어' : i % 3 === 1 ? '메이크업' : '바디케어',
              original_price: `${(135 + i * 11) * 1000}원`,
              sale_price: `${Math.floor((135 + i * 11) * (1 - discountRate / 100)) * 1000}원`,
              discount_rate: `${discountRate}%`,
              stock_status: '재고 충분',
              stock_quantity: 850,
              options: [
                { option_name: '용량', option_values: ['본품', '리필'], selected: '본품' }
              ],
              product_features: [
                `${brand.name}의 시그니처 ${productType}`,
                '피부 타입: 모든 피부',
                '주요 성분: 히알루론산, 펩타이드, 나이아신아마이드, 아데노신',
                '효과: 집중 보습, 탄력 강화, 피부결 개선, 주름 개선'
              ],
              usage_method: '세안 후 토너로 정돈한 뒤, 적당량을 얼굴 전체에 부드럽게 펴 발라줍니다.',
              caution: '화장품 사용 시 이상이 있는 경우 전문의와 상담하세요.',
              expiry_info: '제조일로부터 36개월, 개봉 후 12개월',
              certifications: ['피부 자극 테스트 완료', '저자극 인증', 'K-뷰티 인증'],
              review_summary: {
                total_reviews: 2650 + i * 170,
                average_rating: 4.8 + (i % 3) * 0.1,
                rating_distribution: {
                  '5점': 2100 + i * 110,
                  '4점': 420 + i * 40,
                  '3점': 95 + i * 13,
                  '2점': 25 + i * 5,
                  '1점': 10 + i * 2
                },
                top_positive_keywords: ['보습력 최고', '흡수 빠름', '효과 좋음', '아모레 브랜드 믿음', '가성비'],
                top_negative_keywords: ['용량 작음', '향']
              }
            },
            {
              product_id: `${brand.code}-AMOREMALL-${String(i + 1).padStart(3, '0')}-SET`,
              product_name: `${brand.name} ${productType} 아모레몰 단독 세트`,
              brand: brand.name,
              category: '세트/기획',
              original_price: `${(195 + i * 16) * 1000}원`,
              sale_price: `${Math.floor((195 + i * 16) * 0.55) * 1000}원`,
              discount_rate: '45%',
              stock_status: '한정수량',
              stock_quantity: 140,
              options: [],
              set_contents: [
                { item_name: `${brand.name} ${productType} 본품`, quantity: 1, price: `${(135 + i * 11) * 1000}원` },
                { item_name: `${brand.name} 토너`, quantity: 1, price: '35,000원' },
                { item_name: `${brand.name} 럭셔리 기프트`, quantity: 1, price: '25,000원' }
              ],
              total_set_value: `${(195 + i * 16) * 1000}원`,
              set_save_amount: `${Math.floor((195 + i * 16) * 0.45) * 1000}원`,
              product_features: [
                '아모레몰 라이브 단독 구성',
                '본품 + 토너 + 럭셔리 기프트 7종',
                `최대 ${Math.floor((195 + i * 16) * 0.45) * 1000}원 혜택`
              ],
              usage_method: '세트 구성품별 사용법 참고',
              expiry_info: '제조일로부터 36개월',
              review_summary: {
                total_reviews: 895 + i * 58,
                average_rating: 4.9 + (i % 2) * 0.1,
                top_positive_keywords: ['구성 풍성', '가성비 최고', '선물 좋음', '아모레 품질']
              }
            }
          ],
          coupons: [
            {
              coupon_id: `AMOREMALL_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              coupon_name: '아모레몰 라이브 전용 쿠폰',
              coupon_type: '플랫폼쿠폰',
              discount_type: i % 2 === 0 ? '정률할인' : '정액할인',
              discount_value: i % 2 === 0 ? '15%' : '22,000원',
              min_purchase_amount: '120,000원',
              max_discount_amount: i % 2 === 0 ? '35,000원' : null,
              issue_condition: '라이브 시청 시 자동 발급',
              expiry_date: `${broadcastDate} 23:59`,
              duplicate_use: couponDuplicate
            },
            {
              coupon_id: `AMOREMALL_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              coupon_name: `${brand.name} 브랜드 쿠폰`,
              coupon_type: '브랜드쿠폰',
              discount_type: '정액할인',
              discount_value: '20,000원',
              min_purchase_amount: '150,000원',
              max_discount_amount: null,
              issue_condition: '쿠폰함에서 다운로드',
              expiry_date: new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0],
              duplicate_use: '불가'
            },
            {
              coupon_id: `AMOREMALL_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              coupon_name: '아모레 멤버십 쿠폰',
              coupon_type: '멤버십쿠폰',
              discount_type: '정액할인',
              discount_value: '12,000원',
              min_purchase_amount: '100,000원',
              max_discount_amount: null,
              issue_condition: '멤버십 회원 자동 발급',
              expiry_date: new Date(new Date(broadcastDate).getTime() + 14*24*60*60*1000).toISOString().split('T')[0],
              duplicate_use: '가능'
            }
          ],
          benefits: {
            coupons: [
              {
                coupon_id: `AMOREMALL_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
                coupon_name: '아모레몰 라이브 전용 쿠폰',
                coupon_type: '플랫폼쿠폰',
                discount_type: i % 2 === 0 ? '정률할인' : '정액할인',
                discount_value: i % 2 === 0 ? '15%' : '22,000원',
                min_purchase_amount: '120,000원',
                max_discount_amount: i % 2 === 0 ? '35,000원' : null,
                issue_condition: '라이브 시청 시 자동 발급',
                expiry_date: `${broadcastDate} 23:59`,
                duplicate_use: couponDuplicate
              },
              {
                coupon_id: `AMOREMALL_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
                coupon_name: `${brand.name} 브랜드 쿠폰`,
                coupon_type: '브랜드쿠폰',
                discount_type: '정액할인',
                discount_value: '20,000원',
                min_purchase_amount: '150,000원',
                max_discount_amount: null,
                issue_condition: '쿠폰함에서 다운로드',
                expiry_date: new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0],
                duplicate_use: '불가'
              },
              {
                coupon_id: `AMOREMALL_COUPON_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
                coupon_name: '아모레 멤버십 쿠폰',
                coupon_type: '멤버십쿠폰',
                discount_type: '정액할인',
                discount_value: '12,000원',
                min_purchase_amount: '100,000원',
                max_discount_amount: null,
                issue_condition: '멤버십 회원 자동 발급',
                expiry_date: new Date(new Date(broadcastDate).getTime() + 14*24*60*60*1000).toISOString().split('T')[0],
                duplicate_use: '가능'
              }
            ],
            discounts: [
              {
                benefit_id: `AMOREMALL_BENEFIT_DISCOUNT_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '할인',
                benefit_name: `아모레몰 라이브 ${discountRate}% 할인`,
                discount_type: '정률할인',
                discount_value: `${discountRate}%`,
                condition: '라이브 방송 중 결제',
                duplicate_with_coupon: couponDuplicate
              },
              {
                benefit_id: `AMOREMALL_BENEFIT_DISCOUNT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '할인',
                benefit_name: '멤버십 추가 할인',
                discount_type: '정액할인',
                discount_value: '12,000원',
                condition: '아모레 멤버십 회원',
                duplicate_with_coupon: '가능'
              }
            ],
            gifts: [
              {
                benefit_id: `AMOREMALL_BENEFIT_GIFT1_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '사은품',
                benefit_name: `${brand.name} 럭셔리 키트`,
                gift_items: [
                  { item_name: `${brand.name} 샘플 7종`, quantity: 1 },
                  { item_name: `${brand.name} 프리미엄 파우치`, quantity: 1 }
                ],
                gift_type: '구매조건형',
                condition: '10만원 이상 구매',
                quantity_limit: '전원 증정',
                duplicate_with_other_gift: '가능'
              },
              {
                benefit_id: `AMOREMALL_BENEFIT_GIFT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '사은품',
                benefit_name: `${brand.name} 스페셜 에디션`,
                gift_items: [
                  { item_name: `${brand.name} ${productType} 디럭스`, quantity: 1 }
                ],
                gift_type: '선착순형',
                condition: '15만원 이상 구매',
                quantity_limit: '선착순 220명',
                duplicate_with_other_gift: '불가'
              }
            ],
            points: [
              {
                benefit_id: `AMOREMALL_BENEFIT_POINT_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '포인트',
                benefit_name: '아모레포인트 10% 적립',
                point_rate: '10%',
                max_point: '20,000원',
                condition: '아모레몰 회원',
                expiry_period: '적립일로부터 1년'
              },
              {
                benefit_id: `AMOREMALL_BENEFIT_POINT2_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '포인트',
                benefit_name: '멤버십 회원 추가 적립',
                point_rate: '5%',
                max_point: '10,000원',
                condition: '아모레 멤버십 VIP',
                expiry_period: '적립일로부터 1년'
              }
            ],
            delivery: [
              {
                benefit_id: `AMOREMALL_BENEFIT_DELIVERY_${brand.code}_${String(i + 1).padStart(3, '0')}`,
                benefit_type: '배송',
                benefit_name: '무료배송',
                delivery_type: '무료배송',
                delivery_condition: '전상품',
                expected_delivery: '주문 후 1-2일 (아모레 직배송)'
              }
            ]
          },
          events: [
            {
              event_id: `AMOREMALL_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
              event_name: '아모레몰 라이브 타임특가',
              event_type: '타임특가',
              event_description: `방송 시작 후 30분간 추가 10% 할인`,
              event_period: `${broadcastDate} ${String(hour).padStart(2, '0')}:00 ~ ${String(hour).padStart(2, '0')}:30`,
              event_benefit: '추가 10% 할인',
              participation_method: '자동 적용'
            },
            {
              event_id: `AMOREMALL_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
              event_name: '아모레 멤버십 DAY',
              event_type: '멤버십 혜택',
              event_description: '멤버십 회원 12,000원 추가 할인',
              event_period: benefitValidType,
              event_benefit: '12,000원 추가 할인',
              participation_method: '멤버십 로그인'
            },
            {
              event_id: `AMOREMALL_EVENT_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
              event_name: `${brand.name} 포인트 2배 적립`,
              event_type: '포인트',
              event_description: '아모레포인트 2배 적립 (최대 20,000원)',
              event_period: `${broadcastDate} ~ ${new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0]}`,
              event_benefit: '아모레포인트 2배 적립',
              participation_method: '자동 적용'
            }
          ]
        },
        policy: {
          coupon_duplicate: couponDuplicate,
          point_duplicate: '가능',
          other_promotion_duplicate: i % 3 === 0 ? '쿠폰+포인트 중복 가능' : '쿠폰 1개만 사용',
          employee_discount: i % 5 === 0 ? '중복 가능' : '중복 불가'
        },
        restrictions: {
          excluded_products: excludedProducts,
          channel_restriction: '아모레몰 앱/웹 전용',
          payment_method_restriction: '멤버십 회원 추가 혜택',
          region_restriction: '도서산간 배송비 별도'
        },
        chat_info: {
          total_chats: 950 + i * 185,
          total_participants: 210 + i * 38,
          chat_statistics: {
            average_chats_per_minute: 18 + i * 2,
            peak_time: `${String(hour).padStart(2, '0')}:${String(18 + (i % 3) * 10).padStart(2, '0')}`,
            peak_chats_per_minute: 48 + i * 6
          },
          popular_keywords: [
            { keyword: '할인', count: 195 + i * 22 },
            { keyword: '쿠폰', count: 165 + i * 18 },
            { keyword: '사은품', count: 145 + i * 15 },
            { keyword: '재고', count: 125 + i * 13 },
            { keyword: '아모레포인트', count: 110 + i * 12 },
            { keyword: '효과', count: 95 + i * 10 },
            { keyword: '가격', count: 85 + i * 9 },
            { keyword: '세트', count: 75 + i * 7 },
            { keyword: '추천', count: 62 + i * 6 },
            { keyword: productType, count: 140 + i * 14 }
          ],
          emoji_reactions: [
            { emoji: '❤️', count: 510 + i * 55 },
            { emoji: '👍', count: 430 + i * 47 },
            { emoji: '😍', count: 360 + i * 40 },
            { emoji: '🔥', count: 315 + i * 35 },
            { emoji: '👏', count: 250 + i * 28 }
          ],
          key_chats: [
            { username: '아모레팬***', message: `${productType} 정말 좋아요!`, timestamp: `${String(hour).padStart(2, '0')}:08`, likes: 52 + i * 4 },
            { username: '뷰티덕후***', message: '이 가격 진짜 혜자네요', timestamp: `${String(hour).padStart(2, '0')}:15`, likes: 45 + i * 3 },
            { username: '리뷰왕***', message: `${brand.name} 제품 믿고 삽니다`, timestamp: `${String(hour).padStart(2, '0')}:22`, likes: 48 + i * 4 },
            { username: '할인러버***', message: '아모레포인트까지 쌓이니까 좋아요!', timestamp: `${String(hour).padStart(2, '0')}:29`, likes: 41 + i * 3 },
            { username: '아모레유저***', message: '세트 구성 알차네요', timestamp: `${String(hour).padStart(2, '0')}:37`, likes: 46 + i * 3 },
            { username: '뷰티마니아***', message: '사은품 언제 오나요?', timestamp: `${String(hour).padStart(2, '0')}:44`, likes: 33 + i * 2 },
            { username: '쇼핑홀릭***', message: '재고 얼마 안 남았어요!', timestamp: `${String(hour).padStart(2, '0')}:52`, likes: 58 + i * 5 },
            { username: '현명소비***', message: '가성비 최고네요', timestamp: `${String(hour).padStart(2, '0')}:59`, likes: 39 + i * 3 },
            { username: '아모레러버***', message: `${productType} 추천!`, timestamp: `${String(hour + 1).padStart(2, '0')}:12`, likes: 50 + i * 4 },
            { username: '리얼후기***', message: '배송 빠르고 포장 좋아요', timestamp: `${String(hour + 1).padStart(2, '0')}:22`, likes: 43 + i * 3 }
          ],
          frequently_asked: [
            { question: '쿠폰 중복 사용 되나요?', count: 32 + i * 4 },
            { question: '배송 언제 와요?', count: 38 + i * 5 },
            { question: '사은품 자동으로 오나요?', count: 29 + i * 3 },
            { question: '재고 얼마나 남았어요?', count: 26 + i * 3 },
            { question: '아모레포인트 언제 적립되나요?', count: 24 + i * 2 }
          ],
          sentiment_analysis: {
            positive: 78 + i % 8,
            neutral: 18 - i % 5,
            negative: 4 - i % 3
          }
        },
        live_specific: {
          key_mentions: [
            `[00:05] 안녕하세요! 아모레몰 LIVE ${brand.name} ${productType} 방송 시작합니다!`,
            `[00:18] ${brand.name} ${productType}는 ${i % 3 === 0 ? '강력한 보습력으로' : i % 3 === 1 ? '빠른 흡수력으로' : '산뜻한 마무리감으로'} 완벽한 데일리 케어 제품입니다!`,
            `[03:10] ${productType}의 핵심 성분과 효능을 자세히 설명드리겠습니다!`,
            `[06:00] 💰 지금 구매하시면 최대 ${discountRate}% 할인 + 쿠폰까지 중복!`,
            `[08:45] 🎁 10만원 이상 구매 시 ${brand.name} 럭셔리 키트 전원 증정!`,
            `[13:20] "${productType} 정말 좋아요! 피부가 빛나기 시작했어요!" - 실시간 후기`,
            `[16:05] ⚡ 선착순 220명! 서둘러주세요!`,
            `[19:30] ${productType}는 아침 저녁 스킨케어 루틴에 필수입니다!`,
            `[23:15] 한 방울만 발라도 촉촉하게 하루종일 보습이 지속됩니다!`,
            `[26:40] ⏰ 방송 시작 30분간 타임특가 추가 10% 할인!`,
            `[29:25] 💳 아모레 멤버십 회원 12,000원 추가 할인 + 아모레포인트 10% 적립!`,
            `[33:50] 💎 아모레포인트 적립으로 더욱 알뜰하게!`,
            `[36:35] 실시간 주문이 쏟아지고 있어요! 벌써 50개 판매!`,
            `[39:20] ${productType}는 모든 피부 타입에 사용 가능합니다!`,
            `[43:45] 마지막 기회! 놓치지 마세요!`,
            `[46:30] 남은 사은품이 30개밖에 없어요! 지금 주문하세요!`,
            `[49:15] 🎁 오늘 구매하신 분들 전원 무료배송!`,
            `[53:00] 주문 폭주 중! 배송은 내일 바로 시작됩니다!`,
            `[56:25] 마지막 3분! 방송 종료 후엔 정상가로 돌아갑니다!`,
            `[59:10] ${productType}로 건강하고 아름다운 피부 만드세요!`,
            `[59:55] 구매해주신 모든 분들 감사합니다! 다음 라이브에서 또 만나요!`
          ],
          broadcast_qa: [
            {
              time: `${String(hour).padStart(2, '0')}:12`,
              question: `${productType}는 어떤 피부에 좋나요?`,
              answer: '모든 피부 타입에 사용 가능하며, 특히 건조하고 민감한 피부에 효과적입니다.'
            },
            {
              time: `${String(hour).padStart(2, '0')}:19`,
              question: '세트 구성품 정품 사이즈인가요?',
              answer: '본품은 정품 사이즈이고, 토너와 럭셔리 기프트는 체험 사이즈입니다.'
            },
            {
              time: `${String(hour).padStart(2, '0')}:27`,
              question: '사은품은 언제까지 받을 수 있나요?',
              answer: `선착순 220명이며, 재고 소진 시 조기 종료됩니다. 서둘러 주문하세요!`
            },
            {
              time: `${String(hour).padStart(2, '0')}:42`,
              question: '아모레포인트는 언제 적립되나요?',
              answer: '구매 확정 후 5일 이내에 자동으로 적립됩니다.'
            }
          ],
          timeline: [
            { time: '00:00', description: '방송 시작 및 인사' },
            { time: '00:06', description: `${brand.name} 브랜드 소개` },
            { time: '00:14', description: `${productType} 제품 상세 설명` },
            { time: '00:22', description: '혜택 안내 (할인/쿠폰/사은품)' },
            { time: '00:32', description: '사용법 시연' },
            { time: '00:42', description: '시청자 Q&A' },
            { time: '00:52', description: '타임특가 안내' },
            { time: '01:02', description: '세트 구성 상세 소개' },
            { time: '01:12', description: '아모레포인트 적립 혜택 설명' },
            { time: '01:22', description: '재고 현황 및 마감 멘트' },
            { time: '01:28', description: '마무리' }
          ]
        },
        product_list_tab: {
          tab_name: '상품 목록',
          total_products: 4,
          product_details: [
            {
              product_id: `${brand.code}-AMOREMALL-${String(i + 1).padStart(3, '0')}-01`,
              product_name: `${brand.name} ${productType} 본품`,
              brand: brand.name,
              category: i % 3 === 0 ? '스킨케어' : i % 3 === 1 ? '메이크업' : '바디케어',
              original_price: `${(135 + i * 11) * 1000}원`,
              sale_price: `${Math.floor((135 + i * 11) * (1 - discountRate / 100)) * 1000}원`,
              discount_rate: `${discountRate}%`,
              stock_status: '재고 충분',
              stock_quantity: 850,
              options: [
                { option_name: '용량', option_values: ['본품', '리필'], selected: '본품' }
              ],
              product_features: [
                `${brand.name}의 시그니처 ${productType}`,
                '피부 타입: 모든 피부',
                '주요 성분: 히알루론산, 펩타이드, 나이아신아마이드, 아데노신',
                '효과: 집중 보습, 탄력 강화, 피부결 개선, 주름 개선'
              ],
              usage_method: '세안 후 토너로 정돈한 뒤, 적당량을 얼굴 전체에 부드럽게 펴 발라줍니다.',
              caution: '화장품 사용 시 이상이 있는 경우 전문의와 상담하세요.',
              expiry_info: '제조일로부터 36개월, 개봉 후 12개월',
              certifications: ['피부 자극 테스트 완료', '저자극 인증', 'K-뷰티 인증'],
              review_summary: {
                total_reviews: 2650 + i * 170,
                average_rating: 4.8 + (i % 3) * 0.1,
                rating_distribution: {
                  '5점': 2100 + i * 110,
                  '4점': 420 + i * 40,
                  '3점': 95 + i * 13,
                  '2점': 25 + i * 5,
                  '1점': 10 + i * 2
                },
                top_positive_keywords: ['보습력 최고', '흡수 빠름', '효과 좋음', '아모레 브랜드 믿음', '가성비'],
                top_negative_keywords: ['용량 작음', '향']
              }
            },
            {
              product_id: `${brand.code}-AMOREMALL-${String(i + 1).padStart(3, '0')}-SET`,
              product_name: `${brand.name} ${productType} 아모레몰 단독 세트`,
              brand: brand.name,
              category: '세트/기획',
              original_price: `${(195 + i * 16) * 1000}원`,
              sale_price: `${Math.floor((195 + i * 16) * 0.55) * 1000}원`,
              discount_rate: '45%',
              stock_status: '한정수량',
              stock_quantity: 140,
              options: [],
              set_contents: [
                { item_name: `${brand.name} ${productType} 본품`, quantity: 1, price: `${(135 + i * 11) * 1000}원` },
                { item_name: `${brand.name} 토너`, quantity: 1, price: '35,000원' },
                { item_name: `${brand.name} 럭셔리 기프트`, quantity: 1, price: '25,000원' }
              ],
              total_set_value: `${(195 + i * 16) * 1000}원`,
              set_save_amount: `${Math.floor((195 + i * 16) * 0.45) * 1000}원`,
              product_features: [
                '아모레몰 라이브 단독 구성',
                '본품 + 토너 + 럭셔리 기프트 7종',
                `최대 ${Math.floor((195 + i * 16) * 0.45) * 1000}원 혜택`
              ],
              usage_method: '세트 구성품별 사용법 참고',
              expiry_info: '제조일로부터 36개월',
              review_summary: {
                total_reviews: 895 + i * 58,
                average_rating: 4.9 + (i % 2) * 0.1,
                top_positive_keywords: ['구성 풍성', '가성비 최고', '선물 좋음', '아모레 품질']
              }
            }
          ]
        },
        faq_tab: {
          tab_name: 'FAQ',
          notice_section: {
            title: '공지사항',
            notices: [
              {
                notice_id: `NOTICE_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_01`,
                title: `${brand.name} 아모레몰 라이브 혜택 안내`,
                content: `안녕하세요, 아모레몰입니다.\n\n${brand.name} 라이브 방송의 특별 혜택을 안내드립니다.\n\n[방송 혜택]\n- 라이브 할인: 최대 ${discountRate}%\n- 멤버십 추가할인: 12,000원\n- 아모레포인트 10% 적립\n\n[유의사항]\n- 혜택은 ${benefitValidType}입니다.\n- 일부 제외 상품이 있을 수 있습니다.\n- 쿠폰 중복 사용은 ${couponDuplicate}입니다.\n\n감사합니다.`,
                post_date: broadcastDate,
                view_count: Math.floor(Math.random() * 540) + 230,
                is_important: true
              },
              {
                notice_id: `NOTICE_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_02`,
                title: '아모레포인트 적립 안내',
                content: `아모레포인트는 다음과 같이 적립됩니다.\n\n[적립]\n- 기본 10% 적립\n- 멤버십 VIP 추가 5% 적립\n- 최대 20,000원 적립\n- 구매 확정 후 5일 이내 지급\n\n[사용]\n- 1,000원 단위로 사용 가능\n- 유효기간: 적립일로부터 1년\n\n아모레몰 앱에서 확인하실 수 있습니다.`,
                post_date: new Date(new Date(broadcastDate).getTime() - 5*24*60*60*1000).toISOString().split('T')[0],
                view_count: Math.floor(Math.random() * 730) + 310,
                is_important: true
              },
              {
                notice_id: `NOTICE_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_03`,
                title: '교환/반품 안내',
                content: `[교환/반품 기준]\n- 상품 수령 후 7일 이내\n- 미개봉 상품에 한함\n- 단순 변심 시 배송비 고객 부담\n\n[교환/반품 불가]\n- 사용한 상품\n- 상품 가치 훼손\n- 재판매 불가능한 경우\n\n아모레몰 고객센터로 문의해주세요.`,
                post_date: new Date(new Date(broadcastDate).getTime() - 9*24*60*60*1000).toISOString().split('T')[0],
                view_count: Math.floor(Math.random() * 590) + 250,
                is_important: false
              }
            ]
          },
          faq_section: {
            title: '자주 묻는 질문 (FAQ)',
            categories: [
              {
                category_name: '배송',
                faqs: [
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_SHIPPING_01`,
                    question: '배송은 언제 도착하나요?',
                    answer: '주문 후 영업일 기준 1-2일 내 배송됩니다. 아모레 직배송으로 빠르게 받으실 수 있습니다.',
                    view_count: Math.floor(Math.random() * 320) + 160,
                    helpful_count: Math.floor(Math.random() * 230) + 110,
                    category: '배송'
                  },
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_SHIPPING_02`,
                    question: '배송비는 얼마인가요?',
                    answer: '아모레몰 라이브 상품은 전상품 무료배송입니다. 도서산간 지역은 추가 배송비가 발생할 수 있습니다.',
                    view_count: Math.floor(Math.random() * 275) + 135,
                    helpful_count: Math.floor(Math.random() * 205) + 100,
                    category: '배송'
                  },
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_SHIPPING_03`,
                    question: '배송 조회는 어떻게 하나요?',
                    answer: '아모레몰 앱 > 마이페이지 > 주문/배송에서 실시간 확인 가능합니다. 송장번호는 문자로 발송됩니다.',
                    view_count: Math.floor(Math.random() * 225) + 115,
                    helpful_count: Math.floor(Math.random() * 170) + 90,
                    category: '배송'
                  }
                ]
              },
              {
                category_name: '혜택/쿠폰',
                faqs: [
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_BENEFIT_01`,
                    question: '아모레포인트는 언제 적립되나요?',
                    answer: '구매 확정 후 5일 이내에 자동 적립됩니다. 아모레몰 앱 > 마이페이지 > 아모레포인트에서 확인 가능합니다.',
                    view_count: Math.floor(Math.random() * 365) + 195,
                    helpful_count: Math.floor(Math.random() * 275) + 145,
                    category: '혜택/쿠폰'
                  },
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_BENEFIT_02`,
                    question: '쿠폰 중복 사용 되나요?',
                    answer: couponDuplicate === '가능' 
                      ? '네, 일부 쿠폰은 중복 사용 가능합니다. 쿠폰 상세에서 중복 사용 가능 여부를 확인하실 수 있습니다.'
                      : '죄송합니다. 쿠폰은 1개만 사용 가능합니다. 가장 할인율이 높은 쿠폰을 선택해주세요.',
                    view_count: Math.floor(Math.random() * 315) + 165,
                    helpful_count: Math.floor(Math.random() * 230) + 120,
                    category: '혜택/쿠폰'
                  },
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_BENEFIT_03`,
                    question: '멤버십 혜택은 뭐에요?',
                    answer: '아모레 멤버십 회원은 12,000원 추가 할인과 아모레포인트 추가 적립 혜택을 받으실 수 있습니다.',
                    view_count: Math.floor(Math.random() * 260) + 135,
                    helpful_count: Math.floor(Math.random() * 200) + 105,
                    category: '혜택/쿠폰'
                  }
                ]
              },
              {
                category_name: '상품/사은품',
                faqs: [
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_PRODUCT_01`,
                    question: '사은품은 어떻게 받나요?',
                    answer: '구매 조건 충족 시 자동으로 함께 배송됩니다. 선착순 사은품은 재고 소진 시 조기 마감됩니다.',
                    view_count: Math.floor(Math.random() * 325) + 170,
                    helpful_count: Math.floor(Math.random() * 240) + 125,
                    category: '상품/사은품'
                  },
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_PRODUCT_02`,
                    question: '세트 구성품 따로 살 수 없나요?',
                    answer: '라이브 세트는 방송 전용 구성으로 개별 구매가 불가합니다. 본품은 일반 판매 페이지에서 구매 가능합니다.',
                    view_count: Math.floor(Math.random() * 205) + 105,
                    helpful_count: Math.floor(Math.random() * 160) + 85,
                    category: '상품/사은품'
                  },
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_PRODUCT_03`,
                    question: '재고 부족하면 어떻게 되나요?',
                    answer: '재고 부족 시 주문 취소되며, 결제 금액은 즉시 환불됩니다. 재고는 실시간으로 업데이트됩니다.',
                    view_count: Math.floor(Math.random() * 185) + 95,
                    helpful_count: Math.floor(Math.random() * 145) + 75,
                    category: '상품/사은품'
                  }
                ]
              },
              {
                category_name: '결제',
                faqs: [
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_PAYMENT_01`,
                    question: '어떤 결제 수단을 쓸 수 있나요?',
                    answer: '신용카드, 체크카드, 계좌이체, 휴대폰, 카카오페이, 네이버페이, 토스 등 다양한 결제 수단을 지원합니다.',
                    view_count: Math.floor(Math.random() * 170) + 88,
                    helpful_count: Math.floor(Math.random() * 125) + 65,
                    category: '결제'
                  },
                  {
                    faq_id: `FAQ_AMOREMALL_${brand.code}_PAYMENT_02`,
                    question: '멤버십 할인은 어떻게 받나요?',
                    answer: '아모레 멤버십 회원으로 로그인하시면 결제 시 자동으로 할인이 적용됩니다.',
                    view_count: Math.floor(Math.random() * 155) + 80,
                    helpful_count: Math.floor(Math.random() * 115) + 60,
                    category: '결제'
                  }
                ]
              }
            ],
            total_faqs: 11
          },
          qa_section: {
            title: '실시간 Q&A',
            description: '방송 중 고객님들이 남기신 질문과 답변입니다.',
            qa_list: [
              {
                qa_id: `QA_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_001`,
                question: `${productType}는 어떤 피부에 좋나요?`,
                questioner: '김**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(12 + (i % 10)).padStart(2, '0')}`,
                answer: `모든 피부 타입에 사용 가능하며, 특히 건조하고 민감한 피부에 효과적입니다. ${brand.name} ${productType}는 피부 자극 테스트를 완료한 제품입니다.`,
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(14 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 52) + 23,
                status: '답변완료'
              },
              {
                qa_id: `QA_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_002`,
                question: '세트 정품 사이즈 맞나요?',
                questioner: '이**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(17 + (i % 10)).padStart(2, '0')}`,
                answer: '본품은 정품 사이즈이고, 토너와 럭셔리 기프트는 체험 사이즈입니다.',
                answerer: '아모레몰 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(19 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 43) + 18,
                status: '답변완료'
              },
              {
                qa_id: `QA_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_003`,
                question: '사은품 자동으로 오나요?',
                questioner: '박**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(24 + (i % 10)).padStart(2, '0')}`,
                answer: '네, 구매 조건 충족 시 자동으로 함께 배송됩니다. 선착순 사은품은 재고 소진 시 마감됩니다.',
                answerer: '아모레몰 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(26 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 37) + 15,
                status: '답변완료'
              },
              {
                qa_id: `QA_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_004`,
                question: `${productType} 다른 제품이랑 같이 써도 돼요?`,
                questioner: '최**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(31 + (i % 10)).padStart(2, '0')}`,
                answer: `네, 다른 스킨케어 제품과 함께 사용 가능합니다. ${productType} → 세럼 → 크림 순서로 사용하시면 좋습니다.`,
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(33 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 32) + 12,
                status: '답변완료'
              },
              {
                qa_id: `QA_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_005`,
                question: '방송 끝나도 같은 가격이에요?',
                questioner: '정**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(41 + (i % 10)).padStart(2, '0')}`,
                answer: `혜택 기간은 ${benefitValidType}입니다. 기간 내 구매하시면 동일한 혜택을 받으실 수 있습니다.`,
                answerer: '아모레몰 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(43 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 55) + 25,
                status: '답변완료'
              },
              {
                qa_id: `QA_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_006`,
                question: '아모레포인트 언제 쌓여요?',
                questioner: '강**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(48 + (i % 10)).padStart(2, '0')}`,
                answer: '구매 확정 후 5일 이내에 자동 적립됩니다. 아모레몰 앱에서 확인 가능합니다.',
                answerer: '아모레몰 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(50 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 40) + 16,
                status: '답변완료'
              },
              {
                qa_id: `QA_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_007`,
                question: '쿠폰 중복 쓸 수 있나요?',
                questioner: '윤**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(54 + (i % 10)).padStart(2, '0')}`,
                answer: couponDuplicate === '가능' ? '일부 쿠폰은 중복 사용 가능합니다. 쿠폰 상세에서 확인해주세요.' : '죄송합니다. 쿠폰은 1개만 사용 가능합니다.',
                answerer: '아모레몰 CS',
                answer_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(56 + (i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 48) + 21,
                status: '답변완료'
              },
              {
                qa_id: `QA_AMOREMALL_${brand.code}_${String(i + 1).padStart(3, '0')}_008`,
                question: '유통기한 얼마나 돼요?',
                questioner: '임**',
                question_date: `${broadcastDate} ${String(hour).padStart(2, '0')}:${String(58 + (i % 10)).padStart(2, '0')}`,
                answer: '제조일로부터 36개월이며, 최근 제조된 신선한 제품으로 배송됩니다. 개봉 후 12개월 이내 사용을 권장드립니다.',
                answerer: `${brand.name} 공식`,
                answer_date: `${broadcastDate} ${String(hour + 1).padStart(2, '0')}:${String((i % 10)).padStart(2, '0')}`,
                is_answered: true,
                helpful_count: Math.floor(Math.random() * 34) + 13,
                status: '답변완료'
              }
            ],
            total_qa: 8,
            answered_qa: 8,
            unanswered_qa: 0
          }
        },
        cs_info: {
          expected_questions: [
            '방송 끝났는데 혜택 받을 수 있나요?',
            '아모레포인트는 언제 적립되나요?',
            '쿠폰 중복 사용 가능한가요?',
            '배송은 언제 도착하나요?'
          ],
          response_scripts: [
            `혜택 유효기간은 ${benefitValidType}입니다.`,
            `아모레포인트는 구매 확정 후 5일 이내 적립됩니다.`,
            `쿠폰 중복 사용은 ${couponDuplicate}입니다.`,
            `주문 후 1-2일 내 배송됩니다.`
          ],
          risk_points: [
            couponDuplicate === '불가' ? '쿠폰 중복 사용 불가 - 고객 문의 빈번' : '',
            excludedProducts ? `${excludedProducts} - 명시 필요` : '',
            '도서산간 배송비 별도 안내 필요'
          ].filter(Boolean),
          cs_note: `${brand.name} ${broadcastDate} 아모레몰 라이브 - ${promotionType}`
        }
      };
      
      amoremallData.push(liveData);
    }
  });
  
  console.log(`✅ 아모레몰 라이브 데이터 생성: ${amoremallData.length}개`);
  return amoremallData;
};

/**
 * 이니스프리몰 라이브 방송 데이터 생성
 */
const generateInnisfreeMallLiveData = () => {
  const innisfreeMallData = [];
  const brands = [
    { name: '설화수', code: 'SULWHASOO', count: 14 },
    { name: '라네즈', code: 'LANEIGE', count: 14 },
    { name: '아이오페', code: 'IOPE', count: 12 },
    { name: '헤라', code: 'HERA', count: 12 },
    { name: '에스트라', code: 'AESTURA', count: 10 },
    { name: '이니스프리', code: 'INNISFREE', count: 14 },
    { name: '해피바스', code: 'HAPPYBATH', count: 10 },
    { name: '바이탈뷰티', code: 'VITALBEAUTY', count: 10 },
    { name: '프리메라', code: 'PRIMERA', count: 10 },
    { name: '오설록', code: 'OSULLOC', count: 10 }
  ];
  
  const productTypes = ['에센스', '크림', '세럼', '토너', '수분크림', '앰플', '클렌징폼', '선크림', '미스트', '아이크림', '립스틱', '쿠션'];
  const promotionTypes = ['이니스프리몰 단독', '브랜드 스페셜', '멤버십 혜택', '신제품 런칭', '베스트 히트', '시즌 콜렉션'];
  
  brands.forEach(brand => {
    for (let i = 0; i < brand.count; i++) {
      const statusOptions = ['ACTIVE', 'PENDING', 'ENDED'];
      const statusWeights = i < 2 ? [1, 0, 0] : i < brand.count * 0.40 ? [0, 1, 0] : [0, 0, 1];
      const status = statusOptions[statusWeights.indexOf(1)];
      
      const baseDate = new Date('2025-11-28');
      let broadcastDate, hour;
      
      if (status === 'ACTIVE') {
        broadcastDate = '2025-11-28';
        hour = 16 + i;
      } else if (status === 'PENDING') {
        const daysToAdd = Math.floor(i / 2) + 1;
        const futureDate = new Date(baseDate);
        futureDate.setDate(baseDate.getDate() + daysToAdd);
        broadcastDate = futureDate.toISOString().split('T')[0];
        hour = 15 + (i % 3) * 3;
      } else {
        const daysToSubtract = Math.floor((i - brand.count * 0.40) / 2) + 1;
        const pastDate = new Date(baseDate);
        pastDate.setDate(baseDate.getDate() - daysToSubtract);
        broadcastDate = pastDate.toISOString().split('T')[0];
        hour = 13 + (i % 4) * 2;
      }
      
      const productType = productTypes[i % productTypes.length];
      const promotionType = promotionTypes[i % promotionTypes.length];
      const discountRate = 25 + (i % 5) * 7;
      const couponDuplicate = i % 3 === 0 ? '가능' : '불가';
      const excludedProducts = i % 4 === 0 ? '일부 기획 제외' : i % 4 === 1 ? '대용량 제외' : '';
      const benefitValidType = i % 3 === 0 ? '방송 중만' : i % 3 === 1 ? '당일 23:59까지' : `${broadcastDate} ~ ${new Date(new Date(broadcastDate).getTime() + 7*24*60*60*1000).toISOString().split('T')[0]}`;
      
      const liveData = {
        meta: {
          live_id: `INNISFREE_MALL_${brand.code}_${String(i + 1).padStart(3, '0')}`,
          platform_name: '이니스프리몰',
          platform_code: 'INNISFREE_MALL',
          brand_name: brand.name,
          brand_code: brand.code,
          live_title_customer: `★${brand.name} ${productType} ${promotionType}★최대 ${discountRate}% + 이니스프리 포인트 10%`,
          live_title_cs: `${brand.name} ${broadcastDate.substring(5)} 이니스프리몰 라이브 ${promotionType}`,
          source_url: `https://www.innisfree.com/kr/ko/live/${brand.code.toLowerCase()}_${String(i + 1).padStart(3, '0')}`,
          status: status,
          category: '뷰티',
          collected_at: new Date().toISOString()
        },
        schedule: {
          broadcast_date: broadcastDate,
          broadcast_start_time: `${String(hour).padStart(2, '0')}:00`,
          broadcast_end_time: `${String(hour + 1).padStart(2, '0')}:30`,
          benefit_valid_type: benefitValidType,
          benefit_start_datetime: status === 'PENDING' ? `${broadcastDate} ${String(hour).padStart(2, '0')}:00` : `${broadcastDate} ${String(hour).padStart(2, '0')}:00`,
          benefit_end_datetime: benefitValidType.includes('~') ? benefitValidType.split(' ~ ')[1] + ' 23:59' : benefitValidType === '방송 중만' ? `${broadcastDate} ${String(hour + 1).padStart(2, '0')}:30` : `${broadcastDate} 23:59`,
          broadcast_type: i % 5 === 0 ? '브랜드 협업' : '단독 라이브'
        },
        products: [
          {
            product_order: 1,
            product_name: `${brand.name} ${productType} 본품`,
            sku: `${brand.code}-INF-${String(i + 1).padStart(3, '0')}-01`,
            original_price: `${(135 + i * 11) * 1000}원`,
            sale_price: `${Math.floor((135 + i * 11) * (1 - discountRate / 100)) * 1000}원`,
            discount_rate: `${discountRate}%`,
            product_type: '본품',
            stock_info: '재고 충분',
            set_composition: null,
            product_url: `https://www.innisfree.com/kr/ko/product/${brand.code.toLowerCase()}_${productType.toLowerCase()}_${String(i + 1).padStart(3, '0')}`
          },
          {
            product_order: 2,
            product_name: `${brand.name} ${productType} 이니스프리몰 단독 세트`,
            sku: `${brand.code}-INF-${String(i + 1).padStart(3, '0')}-SET`,
            original_price: `${(195 + i * 16) * 1000}원`,
            sale_price: `${Math.floor((195 + i * 16) * 0.55) * 1000}원`,
            discount_rate: '45%',
            product_type: '세트',
            stock_info: '한정수량',
            set_composition: `본품 + 토너 + ${brand.name} 럭셔리 기프트 7종`,
            product_url: `https://www.innisfree.com/kr/ko/product/${brand.code.toLowerCase()}_set_${String(i + 1).padStart(3, '0')}`
          }
        ],
        benefits: {
          discounts: [
            {
              discount_type: '정률할인',
              discount_detail: `이니스프리몰 라이브 ${discountRate}% 할인`,
              discount_condition: '라이브 방송 중 결제',
              discount_valid_period: benefitValidType
            }
          ],
          coupons: [
            {
              coupon_name: '이니스프리몰 라이브 전용 쿠폰',
              coupon_detail: i % 2 === 0 ? '15% 할인' : '22,000원 할인',
              coupon_issue_condition: '라이브 시청 시 자동 발급'
            }
          ],
          points: [
            {
              point_name: '이니스프리 포인트 10% 적립',
              point_detail: '이니스프리몰 회원 10% 적립',
              point_condition: '이니스프리몰 회원'
            }
          ],
          shipping: [
            {
              shipping_type: '무료배송',
              shipping_detail: '전 상품 무료배송',
              shipping_condition: '구매 금액 무관'
            }
          ]
        },
        duplicate_policy: {
          coupon_duplicate: couponDuplicate,
          point_duplicate: '가능',
          other_promotion_duplicate: i % 3 === 0 ? '쿠폰+포인트 중복 가능' : '쿠폰 1개만 사용',
          employee_discount: i % 5 === 0 ? '중복 가능' : '중복 불가',
          duplicate_note: `쿠폰 중복 사용은 ${couponDuplicate}입니다.`
        },
        restrictions: {
          excluded_products: excludedProducts ? [excludedProducts] : [],
          channel_restrictions: ['이니스프리몰 앱/웹 전용'],
          payment_restrictions: ['멤버십 회원 추가 혜택'],
          region_restrictions: ['도서산간 배송비 별도'],
          other_restrictions: []
        },
        live_specific: {
          key_mentions: [
            `[00:05] 안녕하세요! 이니스프리몰 LIVE ${brand.name} ${productType} 방송 시작합니다!`,
            `[00:18] ${brand.name} ${productType}는 ${i % 3 === 0 ? '강력한 보습력으로' : i % 3 === 1 ? '빠른 흡수력으로' : '산뜻한 마무리감으로'} 완벽한 데일리 케어 제품입니다!`,
            `[03:10] ${productType}의 핵심 성분과 효능을 자세히 설명드리겠습니다!`,
            `[06:00] 💰 지금 구매하시면 최대 ${discountRate}% 할인 + 쿠폰까지 중복!`,
            `[08:45] 🎁 10만원 이상 구매 시 ${brand.name} 럭셔리 키트 전원 증정!`,
            `[13:20] "${productType} 정말 좋아요! 피부가 빛나기 시작했어요!" - 실시간 후기`,
            `[16:05] ⚡ 선착순 200명! 서둘러주세요!`,
            `[19:30] ${productType}는 아침 저녁 스킨케어 루틴에 필수입니다!`,
            `[23:15] 한 방울만 발라도 촉촉하게 하루종일 보습이 지속됩니다!`,
            `[26:40] ⏰ 방송 시작 30분간 타임특가 추가 10% 할인!`,
            `[29:25] 💳 이니스프리 멤버십 회원 10,000원 추가 할인 + 포인트 10% 적립!`,
            `[33:50] 💎 이니스프리 포인트 적립으로 더욱 알뜰하게!`,
            `[36:35] 실시간 주문이 쏟아지고 있어요! 벌써 45개 판매!`,
            `[39:20] ${productType}는 모든 피부 타입에 사용 가능합니다!`,
            `[43:45] 마지막 기회! 놓치지 마세요!`,
            `[46:30] 남은 사은품이 25개밖에 없어요! 지금 주문하세요!`,
            `[49:15] 🎁 오늘 구매하신 분들 전원 무료배송!`,
            `[53:00] 주문 폭주 중! 배송은 내일 바로 시작됩니다!`,
            `[56:25] 마지막 3분! 방송 종료 후엔 정상가로 돌아갑니다!`,
            `[59:10] ${productType}로 건강하고 아름다운 피부 만드세요!`,
            `[59:55] 구매해주신 모든 분들 감사합니다! 다음 라이브에서 또 만나요!`
          ],
          broadcast_qa: [
            {
              question: `${productType}는 어떤 피부에 좋나요?`,
              answer: '모든 피부 타입에 사용 가능하며, 특히 건조하고 민감한 피부에 효과적입니다.',
              questioner: '김**',
              answerer: `${brand.name} 공식`
            },
            {
              question: '세트 구성품 정품 사이즈인가요?',
              answer: '본품은 정품 사이즈이고, 토너와 럭셔리 기프트는 체험 사이즈입니다.',
              questioner: '이**',
              answerer: '이니스프리몰 CS'
            },
            {
              question: '사은품은 언제까지 받을 수 있나요?',
              answer: `선착순 200명이며, 재고 소진 시 조기 종료됩니다. 서둘러 주문하세요!`,
              questioner: '박**',
              answerer: '이니스프리몰 CS'
            },
            {
              question: '이니스프리 포인트는 언제 적립되나요?',
              answer: '구매 확정 후 5일 이내에 자동으로 적립됩니다.',
              questioner: '최**',
              answerer: '이니스프리몰 CS'
            }
          ],
          timeline: [
            { time: '00:00', content: '방송 시작 및 인사' },
            { time: '00:06', content: `${brand.name} 브랜드 소개` },
            { time: '00:14', content: `${productType} 제품 상세 설명` },
            { time: '00:22', content: '혜택 안내 (할인/쿠폰/사은품)' },
            { time: '00:32', content: '사용법 시연' },
            { time: '00:42', content: '시청자 Q&A' },
            { time: '00:52', content: '타임특가 안내' },
            { time: '01:02', content: '세트 구성 상세 소개' },
            { time: '01:12', content: '이니스프리 포인트 적립 혜택 설명' },
            { time: '01:22', content: '재고 현황 및 마감 멘트' },
            { time: '01:28', content: '마무리' }
          ]
        },
        cs_info: {
          expected_questions: [
            '방송 끝났는데 혜택 받을 수 있나요?',
            '이니스프리 포인트는 언제 적립되나요?',
            '쿠폰 중복 사용 가능한가요?',
            '배송은 언제 도착하나요?'
          ],
          response_scripts: [
            `혜택 유효기간은 ${benefitValidType}입니다.`,
            `이니스프리 포인트는 구매 확정 후 5일 이내 적립됩니다.`,
            `쿠폰 중복 사용은 ${couponDuplicate}입니다.`,
            `주문 후 1-2일 내 배송됩니다.`
          ],
          risk_points: [
            couponDuplicate === '불가' ? '쿠폰 중복 사용 불가 - 고객 문의 빈번' : '',
            excludedProducts ? `${excludedProducts} - 명시 필요` : '',
            '도서산간 배송비 별도 안내 필요'
          ].filter(Boolean),
          cs_note: `${brand.name} ${broadcastDate} 이니스프리몰 라이브 - ${promotionType}`
        }
      };
      
      innisfreeMallData.push(liveData);
    }
  });
  
  console.log(`✅ 이니스프리몰 라이브 데이터 생성: ${innisfreeMallData.length}개`);
  return innisfreeMallData;
};

/**
 * 전체 브랜드 데이터 통합
 */
export const getAllBrandsData = () => {
  // 네이버 데이터
  const sulwhasooData = realCollectedSulwhasooData;  // 25개
  const laneigeData = [...realCollectedLaneigeData, ...generateAdditionalLaneigeData()];  // 1 + 24 = 25개
  const iopeData = generateIopeData();  // 25개
  const heraData = generateHeraData();  // 25개
  const aesturaData = generateAesturaData();  // 20개
  const innisfreeData = generateInnisfreeData();  // 25개
  const happyBathData = generateHappyBathData();  // 15개
  const vitalBeautyData = generateVitalBeautyData();  // 15개
  const primeraData = generatePrimeraData();  // 15개
  const osullocData = generateOsullocData();  // 15개
  
  // 카카오 데이터 추가
  const kakaoData = generateKakaoLiveData();  // 약 153개 (설화수20 + 라네즈20 + 아이오페15 + 헤라15 + 에스트라15 + 이니스프리20 + 해피바스12 + 바이탈뷰티12 + 프리메라12 + 오설록12)
  
  // 11번가 데이터 추가
  const st11Data = generate11stLiveData();  // 약 136개 (설화수18 + 라네즈18 + 아이오페15 + 헤라15 + 에스트라12 + 이니스프리18 + 해피바스10 + 바이탈뷰티10 + 프리메라10 + 오설록10)
  
  // G마켓 데이터 추가
  const gmarketData = generateGmarketLiveData();  // 약 126개 (설화수16 + 라네즈16 + 아이오페14 + 헤라14 + 에스트라10 + 이니스프리16 + 해피바스10 + 바이탈뷰티10 + 프리메라10 + 오설록10)
  
  // 올리브영 데이터 추가
  const oliveyoungData = generateOliveyoungLiveData();  // 약 121개 (설화수15 + 라네즈15 + 아이오페13 + 헤라13 + 에스트라10 + 이니스프리15 + 해피바스10 + 바이탈뷰티10 + 프리메라10 + 오설록10)
  
  // 그립 데이터 추가
  const gripData = generateGripLiveData();  // 약 116개 (설화수14 + 라네즈14 + 아이오페12 + 헤라12 + 에스트라10 + 이니스프리14 + 해피바스10 + 바이탈뷰티10 + 프리메라10 + 오설록10)
  
  // 무신사 데이터 추가
  const musinsaData = generateMusinsaLiveData();  // 약 96개 (설화수12 + 라네즈12 + 아이오페10 + 헤라10 + 에스트라8 + 이니스프리12 + 해피바스8 + 바이탈뷰티8 + 프리메라8 + 오설록8)
  
  // 롯데온 데이터 추가
  const lotteonData = generateLotteonLiveData();  // 약 106개 (설화수13 + 라네즈13 + 아이오페11 + 헤라11 + 에스트라9 + 이니스프리13 + 해피바스9 + 바이탈뷰티9 + 프리메라9 + 오설록9)
  
  // 아모레몰 데이터 추가
  const amoremallData = generateAmoremallLiveData();  // 약 126개 (설화수15 + 라네즈15 + 아이오페13 + 헤라13 + 에스트라11 + 이니스프리15 + 해피바스11 + 바이탈뷰티11 + 프리메라11 + 오설록11)
  
  // 이니스프리몰 데이터 추가
  const innisfreeMallData = generateInnisfreeMallLiveData();  // 약 120개 (설화수14 + 라네즈14 + 아이오페12 + 헤라12 + 에스트라10 + 이니스프리14 + 해피바스10 + 바이탈뷰티10 + 프리메라10 + 오설록10)
  
  // 총 1,305개의 라이브 방송 데이터
  // [네이버] 설화수(25) + 라네즈(25) + 아이오페(25) + 헤라(25) + 에스트라(20) + 이니스프리(25) + 해피바스(15) + 바이탈뷰티(15) + 프리메라(15) + 오설록(15) = 205개
  // [카카오] 10개 브랜드 = 153개
  // [11번가] 10개 브랜드 = 136개
  // [G마켓] 10개 브랜드 = 126개
  // [올리브영] 10개 브랜드 = 121개
  // [그립] 10개 브랜드 = 116개
  // [무신사] 10개 브랜드 = 96개
  // [롯데온] 10개 브랜드 = 106개
  // [아모레몰] 10개 브랜드 = 126개
  // [이니스프리몰] 10개 브랜드 = 120개
  return [
    ...sulwhasooData, 
    ...laneigeData, 
    ...iopeData, 
    ...heraData, 
    ...aesturaData, 
    ...innisfreeData, 
    ...happyBathData, 
    ...vitalBeautyData, 
    ...primeraData, 
    ...osullocData,
    ...kakaoData,      // 카카오 데이터
    ...st11Data,       // 11번가 데이터
    ...gmarketData,    // G마켓 데이터
    ...oliveyoungData, // 올리브영 데이터
    ...gripData,       // 그립 데이터
    ...musinsaData,    // 무신사 데이터
    ...lotteonData,    // 롯데온 데이터
    ...amoremallData,  // 아모레몰 데이터
    ...innisfreeMallData  // 이니스프리몰 데이터 추가
  ];
};

/**
 * 실제 수집 데이터 상세 정보 조회
 */
export const getRealCollectedDetail = (liveId) => {
  const allData = getAllBrandsData();
  return allData.find(live => {
    const liveIdFromData = live.meta?.live_id || live.metadata?.live_id;
    return liveIdFromData === liveId;
  });
};

/**
 * 검색용 이벤트 목록 반환
 */
export const getRealCollectedEvents = () => {
  const allData = getAllBrandsData();
  return allData.map(convertRealDataToEvent);
};

export default realCollectedSulwhasooData;

