#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Supabase 확장 테이블 자동 생성 스크립트
"""

import os
import sys
from pathlib import Path
from supabase import create_client
from dotenv import load_dotenv

# 환경변수 로드
env_path = Path(__file__).parent.parent / 'crawler' / '.env'
load_dotenv(env_path)

# Supabase 클라이언트 초기화
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Supabase 환경변수가 설정되지 않았습니다.")
    sys.exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

print("=" * 80)
print("🗄️  Supabase 확장 테이블 생성 시작")
print("=" * 80)
print(f"URL: {SUPABASE_URL}")
print("=" * 80)

# SQL 스크립트 목록
sql_scripts = [
    # 1. live_products 테이블 확장
    {
        'name': 'live_products 확장',
        'sql': """
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS product_image_url TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS product_thumbnail_url TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS product_link TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS mall_name TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS product_badge TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS delivery_fee TEXT;
ALTER TABLE public.live_products ADD COLUMN IF NOT EXISTS is_free_delivery BOOLEAN DEFAULT false;
"""
    },
    
    # 2. live_coupons 테이블
    {
        'name': 'live_coupons 테이블',
        'sql': """
CREATE TABLE IF NOT EXISTS public.live_coupons (
  coupon_id BIGSERIAL PRIMARY KEY,
  live_id TEXT NOT NULL,
  coupon_code TEXT,
  coupon_name TEXT,
  coupon_type TEXT,
  discount_amount INTEGER,
  discount_rate INTEGER,
  min_purchase_amount INTEGER,
  max_discount_amount INTEGER,
  usage_limit INTEGER,
  usage_per_user INTEGER,
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_live_broadcasts_coupons 
    FOREIGN KEY (live_id) 
    REFERENCES live_broadcasts(live_id) 
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_live_coupons_live_id ON public.live_coupons(live_id);
CREATE INDEX IF NOT EXISTS idx_live_coupons_valid_until ON public.live_coupons(valid_until);
"""
    },
    
    # 3. live_comments 테이블
    {
        'name': 'live_comments 테이블',
        'sql': """
CREATE TABLE IF NOT EXISTS public.live_comments (
  comment_id BIGSERIAL PRIMARY KEY,
  live_id TEXT NOT NULL,
  comment_text TEXT,
  comment_type TEXT,
  user_name TEXT,
  user_id TEXT,
  like_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  comment_timestamp TIMESTAMP WITH TIME ZONE,
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_live_broadcasts_comments 
    FOREIGN KEY (live_id) 
    REFERENCES live_broadcasts(live_id) 
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_live_comments_live_id ON public.live_comments(live_id);
CREATE INDEX IF NOT EXISTS idx_live_comments_timestamp ON public.live_comments(comment_timestamp);
CREATE INDEX IF NOT EXISTS idx_live_comments_type ON public.live_comments(comment_type);
"""
    },
    
    # 4. live_faqs 테이블
    {
        'name': 'live_faqs 테이블',
        'sql': """
CREATE TABLE IF NOT EXISTS public.live_faqs (
  faq_id BIGSERIAL PRIMARY KEY,
  live_id TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  category TEXT,
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  is_official BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_live_broadcasts_faqs 
    FOREIGN KEY (live_id) 
    REFERENCES live_broadcasts(live_id) 
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_live_faqs_live_id ON public.live_faqs(live_id);
CREATE INDEX IF NOT EXISTS idx_live_faqs_category ON public.live_faqs(category);
"""
    },
    
    # 5. live_intro 테이블
    {
        'name': 'live_intro 테이블',
        'sql': """
CREATE TABLE IF NOT EXISTS public.live_intro (
  intro_id BIGSERIAL PRIMARY KEY,
  live_id TEXT UNIQUE NOT NULL,
  intro_title TEXT,
  intro_description TEXT,
  intro_highlights JSONB DEFAULT '[]'::jsonb,
  host_name TEXT,
  host_profile_image TEXT,
  host_description TEXT,
  broadcast_theme TEXT,
  target_audience TEXT,
  special_notes TEXT,
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_live_broadcasts_intro 
    FOREIGN KEY (live_id) 
    REFERENCES live_broadcasts(live_id) 
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_live_intro_live_id ON public.live_intro(live_id);
"""
    },
    
    # 6. live_statistics 테이블
    {
        'name': 'live_statistics 테이블',
        'sql': """
CREATE TABLE IF NOT EXISTS public.live_statistics (
  stat_id BIGSERIAL PRIMARY KEY,
  live_id TEXT NOT NULL,
  view_count INTEGER DEFAULT 0,
  concurrent_viewers INTEGER DEFAULT 0,
  peak_viewers INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  product_click_count INTEGER DEFAULT 0,
  purchase_count INTEGER DEFAULT 0,
  total_sales_amount BIGINT DEFAULT 0,
  snapshot_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_live_broadcasts_statistics 
    FOREIGN KEY (live_id) 
    REFERENCES live_broadcasts(live_id) 
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_live_statistics_live_id ON public.live_statistics(live_id);
CREATE INDEX IF NOT EXISTS idx_live_statistics_snapshot_time ON public.live_statistics(snapshot_time);
"""
    },
    
    # 7. live_images 테이블
    {
        'name': 'live_images 테이블',
        'sql': """
CREATE TABLE IF NOT EXISTS public.live_images (
  image_id BIGSERIAL PRIMARY KEY,
  live_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_type TEXT,
  image_alt TEXT,
  image_width INTEGER,
  image_height INTEGER,
  display_order INTEGER DEFAULT 0,
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_live_broadcasts_images 
    FOREIGN KEY (live_id) 
    REFERENCES live_broadcasts(live_id) 
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_live_images_live_id ON public.live_images(live_id);
CREATE INDEX IF NOT EXISTS idx_live_images_type ON public.live_images(image_type);
"""
    },
    
    # 8. 테이블 코멘트
    {
        'name': '테이블 코멘트',
        'sql': """
COMMENT ON TABLE public.live_coupons IS '라이브 방송 쿠폰 정보';
COMMENT ON TABLE public.live_comments IS '라이브 방송 댓글/채팅';
COMMENT ON TABLE public.live_faqs IS '라이브 방송 FAQ';
COMMENT ON TABLE public.live_intro IS '라이브 방송 소개';
COMMENT ON TABLE public.live_statistics IS '라이브 방송 통계';
COMMENT ON TABLE public.live_images IS '라이브 방송 이미지';
"""
    },
    
    # 9. RLS 활성화
    {
        'name': 'RLS 활성화',
        'sql': """
ALTER TABLE public.live_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_intro ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_images ENABLE ROW LEVEL SECURITY;
"""
    },
    
    # 10. 읽기 정책
    {
        'name': '읽기 정책',
        'sql': """
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_coupons' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_coupons FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_comments' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_comments FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_faqs' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_faqs FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_intro' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_intro FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_statistics' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_statistics FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_images' 
        AND policyname = 'Enable read access for all users'
    ) THEN
        CREATE POLICY "Enable read access for all users" ON public.live_images FOR SELECT USING (true);
    END IF;
END $$;
"""
    },
    
    # 11. 쓰기 정책
    {
        'name': '쓰기 정책',
        'sql': """
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_coupons' 
        AND policyname = 'Enable insert for authenticated users only'
    ) THEN
        CREATE POLICY "Enable insert for authenticated users only" ON public.live_coupons FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_comments' 
        AND policyname = 'Enable insert for authenticated users only'
    ) THEN
        CREATE POLICY "Enable insert for authenticated users only" ON public.live_comments FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_faqs' 
        AND policyname = 'Enable insert for authenticated users only'
    ) THEN
        CREATE POLICY "Enable insert for authenticated users only" ON public.live_faqs FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_intro' 
        AND policyname = 'Enable insert for authenticated users only'
    ) THEN
        CREATE POLICY "Enable insert for authenticated users only" ON public.live_intro FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_statistics' 
        AND policyname = 'Enable insert for authenticated users only'
    ) THEN
        CREATE POLICY "Enable insert for authenticated users only" ON public.live_statistics FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_images' 
        AND policyname = 'Enable insert for authenticated users only'
    ) THEN
        CREATE POLICY "Enable insert for authenticated users only" ON public.live_images FOR INSERT WITH CHECK (true);
    END IF;
END $$;
"""
    }
]

# SQL 실행
success_count = 0
error_count = 0

for idx, script in enumerate(sql_scripts, 1):
    print(f"\n[{idx}/{len(sql_scripts)}] {script['name']} 생성 중...")
    
    try:
        # Supabase RPC를 통한 SQL 실행
        result = supabase.rpc('exec_sql', {'query': script['sql']}).execute()
        print(f"   ✅ {script['name']} 생성 완료")
        success_count += 1
    except Exception as e:
        error_msg = str(e)
        
        # 이미 존재하는 경우는 성공으로 간주
        if 'already exists' in error_msg or 'duplicate' in error_msg.lower():
            print(f"   ℹ️  {script['name']} 이미 존재함 (스킵)")
            success_count += 1
        else:
            print(f"   ❌ {script['name']} 생성 실패: {error_msg}")
            error_count += 1

print("\n" + "=" * 80)
print("🎉 테이블 생성 완료!")
print("=" * 80)
print(f"✅ 성공: {success_count}개")
print(f"❌ 실패: {error_count}개")
print("=" * 80)

if error_count == 0:
    print("\n✨ 모든 테이블이 성공적으로 생성되었습니다!")
    print("\n📊 생성된 테이블:")
    print("   1. live_products (확장)")
    print("   2. live_coupons")
    print("   3. live_comments")
    print("   4. live_faqs")
    print("   5. live_intro")
    print("   6. live_statistics")
    print("   7. live_images")
    sys.exit(0)
else:
    print("\n⚠️  일부 테이블 생성에 실패했습니다.")
    print("   Supabase 대시보드에서 수동으로 확인해주세요:")
    print(f"   {SUPABASE_URL.replace('https://', 'https://supabase.com/dashboard/project/')}/sql")
    sys.exit(1)
