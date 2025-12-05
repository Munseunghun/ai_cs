-- live_stt_info 테이블 생성
-- 라이브 방송의 STT 기반 특화 정보 저장

CREATE TABLE IF NOT EXISTS public.live_stt_info (
  id BIGSERIAL PRIMARY KEY,
  live_id TEXT UNIQUE NOT NULL,
  
  -- STT 기반 정보 (JSON 형식)
  key_message JSONB DEFAULT '[]'::jsonb,  -- 주요 멘트/메시지
  broadcast_qa JSONB DEFAULT '[]'::jsonb,  -- 방송 중 Q&A
  timeline_summary JSONB DEFAULT '[]'::jsonb,  -- 타임라인 요약
  product_mentions JSONB DEFAULT '[]'::jsonb,  -- 제품 언급
  host_comments JSONB DEFAULT '[]'::jsonb,  -- 진행자 코멘트
  viewer_reactions JSONB DEFAULT '[]'::jsonb,  -- 시청자 반응
  
  -- 메타 정보
  collected_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 외래키 제약조건
  CONSTRAINT fk_live_broadcasts 
    FOREIGN KEY (live_id) 
    REFERENCES live_broadcasts(live_id) 
    ON DELETE CASCADE
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_live_stt_info_live_id 
  ON public.live_stt_info(live_id);

CREATE INDEX IF NOT EXISTS idx_live_stt_info_collected_at 
  ON public.live_stt_info(collected_at);

-- 코멘트 추가
COMMENT ON TABLE public.live_stt_info IS '라이브 방송 STT 특화 정보';
COMMENT ON COLUMN public.live_stt_info.live_id IS '라이브 방송 ID (FK)';
COMMENT ON COLUMN public.live_stt_info.key_message IS '주요 멘트/메시지 (JSON 배열)';
COMMENT ON COLUMN public.live_stt_info.broadcast_qa IS '방송 중 Q&A (JSON 배열)';
COMMENT ON COLUMN public.live_stt_info.timeline_summary IS '타임라인 요약 (JSON 배열)';
COMMENT ON COLUMN public.live_stt_info.product_mentions IS '제품 언급 정보 (JSON 배열)';
COMMENT ON COLUMN public.live_stt_info.host_comments IS '진행자 코멘트 (JSON 배열)';
COMMENT ON COLUMN public.live_stt_info.viewer_reactions IS '시청자 반응 (JSON 배열)';

-- RLS (Row Level Security) 활성화
ALTER TABLE public.live_stt_info ENABLE ROW LEVEL SECURITY;

-- 정책 생성: 모든 사용자가 읽기 가능
CREATE POLICY "Enable read access for all users" 
  ON public.live_stt_info 
  FOR SELECT 
  USING (true);

-- 정책 생성: 인증된 사용자만 쓰기 가능
CREATE POLICY "Enable insert for authenticated users only" 
  ON public.live_stt_info 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" 
  ON public.live_stt_info 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');
