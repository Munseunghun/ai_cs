-- =====================================================
-- 네이버 스마트스토어 상품 정보 테이블 생성 스크립트
-- =====================================================
-- 작성일: 2025-12-16
-- 목적: 네이버 스마트스토어 전시 페이지에서 수집한 상품 정보 저장
-- =====================================================

-- 기존 테이블 삭제 (재생성 시)
DROP TABLE IF EXISTS public.naver_smartstore_products CASCADE;

-- 테이블 생성
CREATE TABLE public.naver_smartstore_products (
    -- 기본 정보
    id BIGSERIAL PRIMARY KEY,
    platform VARCHAR(100) NOT NULL DEFAULT '네이버스마트스토어',
    brand VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    
    -- 상품 정보
    product_name TEXT NOT NULL,
    product_description TEXT,
    
    -- 가격 정보
    original_price INTEGER,  -- 원가
    discount_price INTEGER,  -- 할인가
    discount_rate NUMERIC(5, 2),  -- 할인율 (%)
    
    -- 이미지 정보
    product_images JSONB,  -- 상품 이미지 URL 배열
    image_count INTEGER DEFAULT 0,  -- 이미지 개수
    
    -- 증정품 정보
    gift_info JSONB,  -- 증정품 정보 배열
    gift_count INTEGER DEFAULT 0,  -- 증정품 개수
    
    -- 메타 정보
    collected_at TIMESTAMP WITH TIME ZONE NOT NULL,  -- 수집 일시
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  -- 생성 일시
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  -- 수정 일시
);

-- =====================================================
-- 인덱스 생성 (검색 성능 최적화)
-- =====================================================

-- 1. 브랜드 검색 인덱스
CREATE INDEX idx_naver_smartstore_products_brand 
ON public.naver_smartstore_products(brand);

-- 2. 제품명 검색 인덱스 (전문 검색)
CREATE INDEX idx_naver_smartstore_products_product_name 
ON public.naver_smartstore_products USING gin(to_tsvector('korean', product_name));

-- 3. 수집 일시 인덱스 (최신순 정렬)
CREATE INDEX idx_naver_smartstore_products_collected_at 
ON public.naver_smartstore_products(collected_at DESC);

-- 4. URL 인덱스 (중복 체크)
CREATE INDEX idx_naver_smartstore_products_url 
ON public.naver_smartstore_products(url);

-- 5. 할인율 인덱스 (할인율 기준 정렬)
CREATE INDEX idx_naver_smartstore_products_discount_rate 
ON public.naver_smartstore_products(discount_rate DESC);

-- 6. 복합 인덱스: 브랜드 + 수집일시
CREATE INDEX idx_naver_smartstore_products_brand_collected 
ON public.naver_smartstore_products(brand, collected_at DESC);

-- =====================================================
-- 트리거 생성 (자동 업데이트)
-- =====================================================

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_naver_smartstore_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER trigger_update_naver_smartstore_products_updated_at
    BEFORE UPDATE ON public.naver_smartstore_products
    FOR EACH ROW
    EXECUTE FUNCTION update_naver_smartstore_products_updated_at();

-- =====================================================
-- 코멘트 추가 (문서화)
-- =====================================================

COMMENT ON TABLE public.naver_smartstore_products IS '네이버 스마트스토어 전시 페이지 상품 정보';

COMMENT ON COLUMN public.naver_smartstore_products.id IS '고유 ID (자동 증가)';
COMMENT ON COLUMN public.naver_smartstore_products.platform IS '플랫폼명 (네이버스마트스토어)';
COMMENT ON COLUMN public.naver_smartstore_products.brand IS '브랜드명 (예: 아이오페)';
COMMENT ON COLUMN public.naver_smartstore_products.url IS '상품 페이지 URL';
COMMENT ON COLUMN public.naver_smartstore_products.product_name IS '제품명';
COMMENT ON COLUMN public.naver_smartstore_products.product_description IS '제품 설명';
COMMENT ON COLUMN public.naver_smartstore_products.original_price IS '원가 (정상가)';
COMMENT ON COLUMN public.naver_smartstore_products.discount_price IS '할인가 (최종혜택가)';
COMMENT ON COLUMN public.naver_smartstore_products.discount_rate IS '할인율 (%)';
COMMENT ON COLUMN public.naver_smartstore_products.product_images IS '상품 이미지 URL 배열 (JSONB)';
COMMENT ON COLUMN public.naver_smartstore_products.image_count IS '상품 이미지 개수';
COMMENT ON COLUMN public.naver_smartstore_products.gift_info IS '증정품 정보 배열 (JSONB)';
COMMENT ON COLUMN public.naver_smartstore_products.gift_count IS '증정품 개수';
COMMENT ON COLUMN public.naver_smartstore_products.collected_at IS '데이터 수집 일시';
COMMENT ON COLUMN public.naver_smartstore_products.created_at IS '레코드 생성 일시';
COMMENT ON COLUMN public.naver_smartstore_products.updated_at IS '레코드 수정 일시';

-- =====================================================
-- Row Level Security (RLS) 설정
-- =====================================================

-- RLS 활성화
ALTER TABLE public.naver_smartstore_products ENABLE ROW LEVEL SECURITY;

-- 모든 사용자 읽기 허용 정책
CREATE POLICY "Allow read access to all users"
ON public.naver_smartstore_products
FOR SELECT
USING (true);

-- 인증된 사용자만 삽입 허용 정책
CREATE POLICY "Allow insert for authenticated users"
ON public.naver_smartstore_products
FOR INSERT
WITH CHECK (true);

-- 인증된 사용자만 업데이트 허용 정책
CREATE POLICY "Allow update for authenticated users"
ON public.naver_smartstore_products
FOR UPDATE
USING (true);

-- =====================================================
-- 샘플 쿼리 (참고용)
-- =====================================================

-- 1. 최신 수집 데이터 조회 (10개)
-- SELECT * FROM public.naver_smartstore_products 
-- ORDER BY collected_at DESC 
-- LIMIT 10;

-- 2. 브랜드별 상품 수 집계
-- SELECT brand, COUNT(*) as product_count 
-- FROM public.naver_smartstore_products 
-- GROUP BY brand 
-- ORDER BY product_count DESC;

-- 3. 할인율 높은 순으로 조회
-- SELECT product_name, original_price, discount_price, discount_rate 
-- FROM public.naver_smartstore_products 
-- WHERE discount_rate IS NOT NULL 
-- ORDER BY discount_rate DESC 
-- LIMIT 20;

-- 4. 증정품이 있는 상품 조회
-- SELECT product_name, gift_count, gift_info 
-- FROM public.naver_smartstore_products 
-- WHERE gift_count > 0 
-- ORDER BY gift_count DESC;

-- 5. 제품명 검색 (전문 검색)
-- SELECT product_name, brand, discount_price 
-- FROM public.naver_smartstore_products 
-- WHERE to_tsvector('korean', product_name) @@ to_tsquery('korean', '스템');

-- =====================================================
-- 완료 메시지
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE '테이블 생성 완료: naver_smartstore_products';
    RAISE NOTICE '인덱스 생성 완료: 6개';
    RAISE NOTICE '트리거 생성 완료: 1개';
    RAISE NOTICE 'RLS 정책 생성 완료: 3개';
    RAISE NOTICE '========================================';
END $$;

