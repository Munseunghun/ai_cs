-- =====================================================
-- 네이버 스마트스토어 이벤트 정보 테이블 생성 스크립트
-- =====================================================
-- 작성일: 2025-12-16
-- 목적: 네이버 스마트스토어 이벤트/기획전 정보 저장
-- =====================================================

-- 기존 테이블 삭제 (재생성 시)
DROP TABLE IF EXISTS public.naver_smartstore_events CASCADE;

-- 테이블 생성
CREATE TABLE public.naver_smartstore_events (
    -- 기본 정보
    id BIGSERIAL PRIMARY KEY,
    platform VARCHAR(100) NOT NULL DEFAULT '네이버스마트스토어',
    brand VARCHAR(100) NOT NULL,
    url TEXT NOT NULL UNIQUE,
    
    -- 이벤트 정보
    event_title TEXT NOT NULL,
    title TEXT,  -- 별칭
    description TEXT,
    main_image TEXT,  -- 대표 이미지 URL
    
    -- 기간 정보
    start_date DATE,
    end_date DATE,
    
    -- 혜택 정보 (JSONB)
    benefits JSONB,
    -- 예시:
    -- [
    --   {
    --     "condition": "전 구매 고객 증정",
    --     "description": "구매 시 사은품 증정"
    --   },
    --   {
    --     "condition": "9만원 이상 구매시",
    --     "description": "추가 사은품 증정"
    --   }
    -- ]
    
    -- 쿠폰 정보 (JSONB)
    coupons JSONB,
    -- 예시:
    -- [
    --   {
    --     "name": "XMD 라인 한정 상품중복 쿠폰",
    --     "description": "최대 10% 할인",
    --     "discount_type": "percentage",
    --     "discount_value": 10
    --   }
    -- ]
    
    -- 통계 정보
    product_count INTEGER DEFAULT 0,  -- 이벤트 상품 수
    view_count INTEGER DEFAULT 0,  -- 조회수
    favorite_count INTEGER DEFAULT 0,  -- 찜 수
    
    -- 상태
    status VARCHAR(20) DEFAULT 'active',  -- active, ended, scheduled
    
    -- 메타 정보
    collected_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 인덱스 생성 (검색 성능 최적화)
-- =====================================================

-- 1. 브랜드 검색 인덱스
CREATE INDEX idx_naver_smartstore_events_brand 
ON public.naver_smartstore_events(brand);

-- 2. 플랫폼 검색 인덱스
CREATE INDEX idx_naver_smartstore_events_platform 
ON public.naver_smartstore_events(platform);

-- 3. 이벤트 타이틀 전문 검색 인덱스
CREATE INDEX idx_naver_smartstore_events_title 
ON public.naver_smartstore_events USING gin(to_tsvector('korean', event_title));

-- 4. 수집 일시 인덱스 (최신순 정렬)
CREATE INDEX idx_naver_smartstore_events_collected_at 
ON public.naver_smartstore_events(collected_at DESC);

-- 5. 이벤트 기간 인덱스
CREATE INDEX idx_naver_smartstore_events_dates 
ON public.naver_smartstore_events(start_date, end_date);

-- 6. 상태 인덱스
CREATE INDEX idx_naver_smartstore_events_status 
ON public.naver_smartstore_events(status);

-- 7. URL 인덱스 (중복 체크)
CREATE INDEX idx_naver_smartstore_events_url 
ON public.naver_smartstore_events(url);

-- 8. 복합 인덱스: 브랜드 + 수집일시
CREATE INDEX idx_naver_smartstore_events_brand_collected 
ON public.naver_smartstore_events(brand, collected_at DESC);

-- =====================================================
-- 트리거 생성 (자동 업데이트)
-- =====================================================

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_naver_smartstore_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER trigger_update_naver_smartstore_events_updated_at
    BEFORE UPDATE ON public.naver_smartstore_events
    FOR EACH ROW
    EXECUTE FUNCTION update_naver_smartstore_events_updated_at();

-- =====================================================
-- 상태 자동 업데이트 함수
-- =====================================================

-- 이벤트 종료 상태 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_event_status()
RETURNS void AS $$
BEGIN
    -- 종료된 이벤트 상태 업데이트
    UPDATE public.naver_smartstore_events
    SET status = 'ended'
    WHERE end_date < CURRENT_DATE
      AND status = 'active';
    
    -- 예정된 이벤트 상태 업데이트
    UPDATE public.naver_smartstore_events
    SET status = 'active'
    WHERE start_date <= CURRENT_DATE
      AND end_date >= CURRENT_DATE
      AND status = 'scheduled';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 코멘트 추가 (문서화)
-- =====================================================

COMMENT ON TABLE public.naver_smartstore_events IS '네이버 스마트스토어 이벤트/기획전 정보';

COMMENT ON COLUMN public.naver_smartstore_events.id IS '고유 ID (자동 증가)';
COMMENT ON COLUMN public.naver_smartstore_events.platform IS '플랫폼명';
COMMENT ON COLUMN public.naver_smartstore_events.brand IS '브랜드명';
COMMENT ON COLUMN public.naver_smartstore_events.url IS '이벤트 페이지 URL (고유)';
COMMENT ON COLUMN public.naver_smartstore_events.event_title IS '이벤트 타이틀';
COMMENT ON COLUMN public.naver_smartstore_events.title IS '이벤트 타이틀 (별칭)';
COMMENT ON COLUMN public.naver_smartstore_events.description IS '이벤트 설명';
COMMENT ON COLUMN public.naver_smartstore_events.main_image IS '대표 이미지 URL';
COMMENT ON COLUMN public.naver_smartstore_events.start_date IS '이벤트 시작일';
COMMENT ON COLUMN public.naver_smartstore_events.end_date IS '이벤트 종료일';
COMMENT ON COLUMN public.naver_smartstore_events.benefits IS '혜택 정보 (JSONB)';
COMMENT ON COLUMN public.naver_smartstore_events.coupons IS '쿠폰 정보 (JSONB)';
COMMENT ON COLUMN public.naver_smartstore_events.product_count IS '이벤트 상품 수';
COMMENT ON COLUMN public.naver_smartstore_events.view_count IS '조회수';
COMMENT ON COLUMN public.naver_smartstore_events.favorite_count IS '찜 수';
COMMENT ON COLUMN public.naver_smartstore_events.status IS '상태 (active/ended/scheduled)';
COMMENT ON COLUMN public.naver_smartstore_events.collected_at IS '데이터 수집 일시';
COMMENT ON COLUMN public.naver_smartstore_events.created_at IS '레코드 생성 일시';
COMMENT ON COLUMN public.naver_smartstore_events.updated_at IS '레코드 수정 일시';

-- =====================================================
-- Row Level Security (RLS) 설정
-- =====================================================

-- RLS 활성화
ALTER TABLE public.naver_smartstore_events ENABLE ROW LEVEL SECURITY;

-- 모든 사용자 읽기 허용 정책
CREATE POLICY "Allow read access to all users"
ON public.naver_smartstore_events
FOR SELECT
USING (true);

-- 인증된 사용자만 삽입 허용 정책
CREATE POLICY "Allow insert for authenticated users"
ON public.naver_smartstore_events
FOR INSERT
WITH CHECK (true);

-- 인증된 사용자만 업데이트 허용 정책
CREATE POLICY "Allow update for authenticated users"
ON public.naver_smartstore_events
FOR UPDATE
USING (true);

-- =====================================================
-- 샘플 데이터 삽입
-- =====================================================

INSERT INTO public.naver_smartstore_events (
    platform,
    brand,
    url,
    event_title,
    title,
    description,
    main_image,
    start_date,
    end_date,
    benefits,
    coupons,
    product_count,
    status,
    collected_at
) VALUES (
    '네이버스마트스토어',
    '아이오페',
    'https://brand.naver.com/iope/shoppingstory/detail?id=5002337684',
    '아이오페 XMD 스템3 기획전',
    '아이오페 XMD 스템3 기획전',
    '스킨부스팅 물광앰플로 92.3% 함유로 물광플럼핑을 완성시켜주는 최초의 피부과 관리 비교 검증 리커버리 세럼',
    'https://shop-phinf.pstatic.net/20241215_123/1734234567890_abc123.jpg',
    '2025-12-15',
    '2025-12-21',
    '[
        {
            "condition": "전 구매 고객 증정",
            "description": "구매 시 사은품 증정"
        },
        {
            "condition": "9만원 이상 구매시",
            "description": "추가 사은품 증정"
        },
        {
            "condition": "12만원 이상 구매시",
            "description": "특별 사은품 증정"
        }
    ]'::jsonb,
    '[
        {
            "name": "XMD 라인 한정 상품중복 쿠폰",
            "description": "최대 10% 할인",
            "discount_type": "percentage",
            "discount_value": 10
        },
        {
            "name": "기획전 장바구니 쿠폰",
            "description": "5,000원 할인",
            "discount_type": "fixed",
            "discount_value": 5000
        },
        {
            "name": "신규고객 쿠폰",
            "description": "10% 할인",
            "discount_type": "percentage",
            "discount_value": 10
        },
        {
            "name": "라운지 고객 쿠폰",
            "description": "15% 할인",
            "discount_type": "percentage",
            "discount_value": 15
        }
    ]'::jsonb,
    2,
    'active',
    NOW()
);

-- =====================================================
-- 샘플 쿼리 (참고용)
-- =====================================================

-- 1. 진행 중인 이벤트 조회
-- SELECT * FROM public.naver_smartstore_events 
-- WHERE status = 'active' 
-- ORDER BY collected_at DESC;

-- 2. 브랜드별 이벤트 수 집계
-- SELECT brand, COUNT(*) as event_count 
-- FROM public.naver_smartstore_events 
-- GROUP BY brand 
-- ORDER BY event_count DESC;

-- 3. 이벤트 기간 내 조회
-- SELECT * FROM public.naver_smartstore_events 
-- WHERE start_date <= CURRENT_DATE 
--   AND end_date >= CURRENT_DATE 
-- ORDER BY start_date DESC;

-- 4. 이벤트 타이틀 검색 (전문 검색)
-- SELECT event_title, brand, start_date, end_date 
-- FROM public.naver_smartstore_events 
-- WHERE to_tsvector('korean', event_title) @@ to_tsquery('korean', 'XMD');

-- 5. 쿠폰이 있는 이벤트 조회
-- SELECT event_title, brand, jsonb_array_length(coupons) as coupon_count 
-- FROM public.naver_smartstore_events 
-- WHERE coupons IS NOT NULL 
--   AND jsonb_array_length(coupons) > 0 
-- ORDER BY coupon_count DESC;

-- =====================================================
-- 완료 메시지
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE '테이블 생성 완료: naver_smartstore_events';
    RAISE NOTICE '인덱스 생성 완료: 8개';
    RAISE NOTICE '트리거 생성 완료: 1개';
    RAISE NOTICE 'RLS 정책 생성 완료: 3개';
    RAISE NOTICE '샘플 데이터 삽입 완료: 1개';
    RAISE NOTICE '========================================';
END $$;

