-- 네이버 쇼핑라이브 확장 스키마 (에러 수정 버전)
-- 상품, 쿠폰, 혜택, 댓글, 채팅, FAQ 등 모든 정보 저장

-- 1. live_products 테이블 확장 (기존 테이블 수정)
-- ALTER TABLE로 컬럼 추가 (이미 테이블이 존재하는 경우)
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS product_image_url TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS product_thumbnail_url TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS product_link TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS mall_name TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS product_badge TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS delivery_fee TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS is_free_delivery BOOLEAN DEFAULT false;

-- 2. live_coupons 테이블 (새로 생성)
CREATE TABLE IF NOT EXISTS public.live_coupons (
  coupon_id BIGSERIAL PRIMARY KEY,
  live_id TEXT NOT NULL,
  
  -- 쿠폰 기본 정보
  coupon_code TEXT,
  coupon_name TEXT,
  coupon_type TEXT,  -- '할인쿠폰', '적립쿠폰', '무료배송' 등
  discount_amount INTEGER,
  discount_rate INTEGER,
  
  -- 쿠폰 조건
  min_purchase_amount INTEGER,
  max_discount_amount INTEGER,
  usage_limit INTEGER,
  usage_per_user INTEGER,
  
  -- 유효 기간
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  
  -- 메타 정보
  is_active BOOLEAN DEFAULT true,
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_live_coupons_live_id ON public.live_coupons(live_id);
CREATE INDEX IF NOT EXISTS idx_live_coupons_valid_until ON public.live_coupons(valid_until);

-- 3. live_comments 테이블 (댓글/채팅)
CREATE TABLE IF NOT EXISTS public.live_comments (
  comment_id BIGSERIAL PRIMARY KEY,
  live_id TEXT NOT NULL,
  
  -- 댓글 정보
  comment_text TEXT,
  comment_type TEXT,  -- 'comment', 'chat', 'question' 등
  user_name TEXT,
  user_id TEXT,
  
  -- 반응
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  
  -- 시간 정보
  comment_timestamp TIMESTAMP WITH TIME ZONE,
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_live_comments_live_id ON public.live_comments(live_id);
CREATE INDEX IF NOT EXISTS idx_live_comments_timestamp ON public.live_comments(comment_timestamp);
CREATE INDEX IF NOT EXISTS idx_live_comments_type ON public.live_comments(comment_type);

-- 4. live_faqs 테이블 (자주 묻는 질문)
CREATE TABLE IF NOT EXISTS public.live_faqs (
  faq_id BIGSERIAL PRIMARY KEY,
  live_id TEXT NOT NULL,
  
  -- FAQ 정보
  question TEXT NOT NULL,
  answer TEXT,
  category TEXT,  -- '제품', '배송', '혜택', '반품/교환' 등
  
  -- 통계
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  
  -- 메타 정보
  is_official BOOLEAN DEFAULT false,  -- 공식 FAQ 여부
  display_order INTEGER DEFAULT 0,
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_live_faqs_live_id ON public.live_faqs(live_id);
CREATE INDEX IF NOT EXISTS idx_live_faqs_category ON public.live_faqs(category);

-- 5. live_intro 테이블 (라이브 소개)
CREATE TABLE IF NOT EXISTS public.live_intro (
  intro_id BIGSERIAL PRIMARY KEY,
  live_id TEXT UNIQUE NOT NULL,
  
  -- 소개 정보
  intro_title TEXT,
  intro_description TEXT,
  intro_highlights JSONB DEFAULT '[]'::jsonb,  -- 주요 포인트 배열
  
  -- 진행자 정보
  host_name TEXT,
  host_profile_image TEXT,
  host_description TEXT,
  
  -- 방송 정보
  broadcast_theme TEXT,
  target_audience TEXT,
  special_notes TEXT,
  
  -- 메타 정보
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_live_intro_live_id ON public.live_intro(live_id);

-- 6. live_statistics 테이블 (통계 정보)
CREATE TABLE IF NOT EXISTS public.live_statistics (
  stat_id BIGSERIAL PRIMARY KEY,
  live_id TEXT NOT NULL,
  
  -- 시청 통계
  view_count INTEGER DEFAULT 0,
  concurrent_viewers INTEGER DEFAULT 0,
  peak_viewers INTEGER DEFAULT 0,
  
  -- 참여 통계
  like_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  
  -- 구매 통계
  product_click_count INTEGER DEFAULT 0,
  purchase_count INTEGER DEFAULT 0,
  total_sales_amount BIGINT DEFAULT 0,
  
  -- 시간 정보
  snapshot_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_live_statistics_live_id ON public.live_statistics(live_id);
CREATE INDEX IF NOT EXISTS idx_live_statistics_snapshot_time ON public.live_statistics(snapshot_time);

-- 7. live_images 테이블 (이미지 정보)
CREATE TABLE IF NOT EXISTS public.live_images (
  image_id BIGSERIAL PRIMARY KEY,
  live_id TEXT NOT NULL,
  
  -- 이미지 정보
  image_url TEXT NOT NULL,
  image_type TEXT,  -- 'thumbnail', 'banner', 'product', 'host' 등
  image_alt TEXT,
  image_width INTEGER,
  image_height INTEGER,
  
  -- 메타 정보
  display_order INTEGER DEFAULT 0,
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_live_images_live_id ON public.live_images(live_id);
CREATE INDEX IF NOT EXISTS idx_live_images_type ON public.live_images(image_type);

-- 코멘트 추가
COMMENT ON TABLE public.live_coupons IS '라이브 방송 쿠폰 정보';
COMMENT ON TABLE public.live_comments IS '라이브 방송 댓글/채팅';
COMMENT ON TABLE public.live_faqs IS '라이브 방송 FAQ';
COMMENT ON TABLE public.live_intro IS '라이브 방송 소개';
COMMENT ON TABLE public.live_statistics IS '라이브 방송 통계';
COMMENT ON TABLE public.live_images IS '라이브 방송 이미지';

-- RLS (Row Level Security) 활성화
ALTER TABLE public.live_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_intro ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_images ENABLE ROW LEVEL SECURITY;

-- 읽기 정책 (모든 사용자) - 중복 방지
DO $$ 
BEGIN
    -- live_coupons 읽기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_coupons' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_coupons FOR SELECT USING (true);
    END IF;
    
    -- live_comments 읽기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_comments' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_comments FOR SELECT USING (true);
    END IF;
    
    -- live_faqs 읽기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_faqs' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_faqs FOR SELECT USING (true);
    END IF;
    
    -- live_intro 읽기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_intro' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_intro FOR SELECT USING (true);
    END IF;
    
    -- live_statistics 읽기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_statistics' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_statistics FOR SELECT USING (true);
    END IF;
    
    -- live_images 읽기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_images' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_images FOR SELECT USING (true);
    END IF;
END $$;

-- 쓰기 정책 (모든 사용자 허용 - anon key 사용을 위해) - 중복 방지
DO $$ 
BEGIN
    -- live_coupons 쓰기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_coupons' 
        AND policyname = 'Enable insert for all users'
    ) THEN
        CREATE POLICY "Enable insert for all users" ON public.live_coupons FOR INSERT WITH CHECK (true);
    END IF;
    
    -- live_comments 쓰기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_comments' 
        AND policyname = 'Enable insert for all users'
    ) THEN
        CREATE POLICY "Enable insert for all users" ON public.live_comments FOR INSERT WITH CHECK (true);
    END IF;
    
    -- live_faqs 쓰기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_faqs' 
        AND policyname = 'Enable insert for all users'
    ) THEN
        CREATE POLICY "Enable insert for all users" ON public.live_faqs FOR INSERT WITH CHECK (true);
    END IF;
    
    -- live_intro 쓰기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_intro' 
        AND policyname = 'Enable insert for all users'
    ) THEN
        CREATE POLICY "Enable insert for all users" ON public.live_intro FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_intro' 
        AND policyname = 'Enable update for all users'
    ) THEN
        CREATE POLICY "Enable update for all users" ON public.live_intro FOR UPDATE USING (true);
    END IF;
    
    -- live_statistics 쓰기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_statistics' 
        AND policyname = 'Enable insert for all users'
    ) THEN
        CREATE POLICY "Enable insert for all users" ON public.live_statistics FOR INSERT WITH CHECK (true);
    END IF;
    
    -- live_images 쓰기 정책
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'live_images' 
        AND policyname = 'Enable insert for all users'
    ) THEN
        CREATE POLICY "Enable insert for all users" ON public.live_images FOR INSERT WITH CHECK (true);
    END IF;
END $$;
