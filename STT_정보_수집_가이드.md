# 라이브 특화 정보(STT 기반) 수집 가이드

작성 일시: 2025-12-04
작성자: AI Assistant

---

## 📋 개요

네이버 쇼핑라이브 등 플랫폼에서 라이브 방송의 특화 정보를 수집하여 CS 상담에 활용할 수 있도록 지원합니다.

---

## 🎯 수집 정보 종류

### 1. 주요 멘트 (Key Messages)
- 방송 시작/종료 멘트
- 제품 소개 멘트
- 혜택 안내 멘트
- 강조 메시지

**예시**:
```json
[
  {
    "message": "안녕하세요! 설화수 윤조 에센스 특별 방송에 오신 것을 환영합니다!",
    "type": "opening",
    "timestamp": "00:00"
  },
  {
    "message": "설화수 윤조 에센스 오늘 30% 할인된 가격으로 만나보실 수 있습니다!",
    "type": "product_intro",
    "timestamp": "00:05"
  }
]
```

### 2. 제품 언급 (Product Mentions)
- 제품명
- 가격 정보
- 언급 시점
- 언급 횟수

**예시**:
```json
[
  {
    "product_name": "설화수 윤조 에센스",
    "product_id": "PROD_001",
    "mention_count": 5,
    "price_info": {
      "sale_price": "98,000",
      "original_price": "140,000",
      "discount_rate": 30
    },
    "timestamp": "00:05"
  }
]
```

### 3. 타임라인 요약 (Timeline Summary)
- 방송 구간별 내용
- 주요 이벤트 시점
- 제품 소개 순서

**예시**:
```json
[
  {
    "timestamp": "00:00",
    "content": "방송 시작 및 인사",
    "type": "start"
  },
  {
    "timestamp": "00:10",
    "content": "설화수 윤조 에센스 소개",
    "type": "product_intro",
    "product_id": "PROD_001"
  },
  {
    "timestamp": "00:50",
    "content": "특별 혜택 안내",
    "type": "benefit_info"
  }
]
```

### 4. 예상 Q&A (Broadcast Q&A)
- 자주 묻는 질문
- 답변 스크립트
- 카테고리 분류

**예시**:
```json
[
  {
    "question": "이 제품은 어떤 피부 타입에 적합한가요?",
    "answer": "모든 피부 타입에 사용 가능하며, 특히 건성 피부에 효과적입니다.",
    "type": "product_qa",
    "category": "제품 정보"
  },
  {
    "question": "배송은 언제 되나요?",
    "answer": "주문 후 2-3일 내 배송됩니다.",
    "type": "delivery_qa",
    "category": "배송"
  }
]
```

### 5. 진행자 코멘트 (Host Comments)
- 진행자 발언
- 강조 포인트
- 고객 소통 멘트

**예시**:
```json
[
  {
    "comment": "설화수 제품을 사랑해주시는 고객 여러분, 감사합니다!",
    "type": "greeting",
    "timestamp": "00:01"
  },
  {
    "comment": "오늘 준비한 제품들은 정말 특별합니다. 놓치지 마세요!",
    "type": "product_emphasis",
    "timestamp": "00:10"
  }
]
```

### 6. 시청자 반응 (Viewer Reactions)
- 조회수
- 좋아요 수
- 즐겨찾기 수
- 예상 반응

**예시**:
```json
[
  {
    "reaction_type": "view",
    "count": 1523,
    "type": "viewer_stat"
  },
  {
    "reaction_type": "like",
    "count": 152,
    "type": "estimated"
  }
]
```

---

## 🗄️ 데이터베이스 구조

### live_stt_info 테이블

```sql
CREATE TABLE public.live_stt_info (
  id BIGSERIAL PRIMARY KEY,
  live_id TEXT UNIQUE NOT NULL,
  
  -- STT 기반 정보 (JSON 형식)
  key_message JSONB DEFAULT '[]'::jsonb,
  broadcast_qa JSONB DEFAULT '[]'::jsonb,
  timeline_summary JSONB DEFAULT '[]'::jsonb,
  product_mentions JSONB DEFAULT '[]'::jsonb,
  host_comments JSONB DEFAULT '[]'::jsonb,
  viewer_reactions JSONB DEFAULT '[]'::jsonb,
  
  -- 메타 정보
  collected_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_live_broadcasts 
    FOREIGN KEY (live_id) 
    REFERENCES live_broadcasts(live_id) 
    ON DELETE CASCADE
);
```

---

## 🚀 테이블 생성 방법

### 방법 1: Supabase 대시보드 (권장)

1. **Supabase 대시보드 접속**:
   ```
   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql
   ```

2. **SQL Editor에서 실행**:
   ```
   /Users/amore/ai_cs 시스템/database/create_live_stt_info_table.sql
   ```

3. **파일 내용 확인**:
   ```bash
   cat "/Users/amore/ai_cs 시스템/database/create_live_stt_info_table.sql"
   ```

### 방법 2: 명령어로 파일 내용 복사

```bash
# 파일 내용을 클립보드에 복사 (macOS)
cat "/Users/amore/ai_cs 시스템/database/create_live_stt_info_table.sql" | pbcopy

# Supabase SQL Editor에 붙여넣기 후 실행
```

---

## 📝 STT 정보 생성 스크립트

### 실행 방법

```bash
cd "/Users/amore/ai_cs 시스템/crawler"

# 최대 100개 라이브 방송의 STT 정보 생성
python3 generate_stt_info_from_existing.py
```

### 스크립트 기능

1. **기존 라이브 방송 조회**: `live_broadcasts` 테이블에서 데이터 가져오기
2. **관련 데이터 수집**: 제품, 혜택 정보 조회
3. **STT 정보 생성**: 6가지 카테고리 정보 자동 생성
4. **Supabase 저장**: `live_stt_info` 테이블에 UPSERT

### 생성 로직

```python
# 1. 주요 멘트 생성
- 방송 제목 기반 오프닝 멘트
- 제품별 소개 멘트 (상위 3개)
- 혜택 안내 멘트
- 마무리 멘트

# 2. 제품 언급 생성
- 제품명, 가격, 할인율
- 예상 언급 시점
- 제품 ID 매핑

# 3. 타임라인 생성
- 00:00 - 방송 시작
- 00:10, 00:20, ... - 제품 소개
- 00:50 - 혜택 안내
- 59:00 - 방송 마무리

# 4. 예상 Q&A 생성
- 제품 정보 Q&A
- 배송 Q&A
- 혜택 Q&A
- 반품/교환 Q&A

# 5. 진행자 코멘트 생성
- 인사 멘트
- 제품 강조 멘트
- 혜택 강조 멘트
- 고객 소통 멘트

# 6. 시청자 반응 생성
- 조회수, 좋아요 수 (실제 데이터)
- 예상 반응 (조회수 기반 추정)
```

---

## 🔄 자동화 설정

### 1시간마다 자동 STT 정보 생성

```bash
cd "/Users/amore/ai_cs 시스템/crawler"

# 스케줄러 스크립트 생성
cat > stt_scheduler.py << 'EOF'
import schedule
import time
import subprocess
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_stt_info():
    logger.info("STT 정보 생성 시작...")
    subprocess.run(['python3', 'generate_stt_info_from_existing.py'])

# 1시간마다 실행
schedule.every(1).hours.do(generate_stt_info)

# 즉시 실행
generate_stt_info()

while True:
    schedule.run_pending()
    time.sleep(60)
EOF

# 백그라운드 실행
nohup python3 stt_scheduler.py > logs/stt_scheduler.log 2>&1 &
```

---

## 📊 데이터 확인

### Supabase에서 확인

```sql
-- STT 정보 개수 확인
SELECT COUNT(*) FROM live_stt_info;

-- 최근 생성된 STT 정보
SELECT 
  live_id,
  jsonb_array_length(key_message) as key_message_count,
  jsonb_array_length(product_mentions) as product_mentions_count,
  jsonb_array_length(timeline_summary) as timeline_count,
  collected_at
FROM live_stt_info
ORDER BY collected_at DESC
LIMIT 10;

-- 특정 라이브 방송의 STT 정보
SELECT * FROM live_stt_info
WHERE live_id = 'REAL_NAVER_설화수_1728436';
```

### Node.js로 확인

```javascript
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

(async () => {
  const { data, error } = await supabase
    .from('live_stt_info')
    .select('*')
    .limit(5);
  
  console.log('STT 정보:', JSON.stringify(data, null, 2));
})();
```

---

## 🎨 프론트엔드 활용

### API 엔드포인트

```javascript
// 백엔드 API (eventService.js)
const getEventById = async (p_event_id) => {
  // live_stt_info 조회
  const { data: _v_stt_info } = await supabaseClient
    .from('live_stt_info')
    .select('*')
    .eq('live_id', p_event_id)
    .maybeSingle();
  
  // STT 정보 파싱
  const stt_info = {
    key_message: JSON.parse(_v_stt_info?.key_message || '[]'),
    broadcast_qa: JSON.parse(_v_stt_info?.broadcast_qa || '[]'),
    timeline_summary: JSON.parse(_v_stt_info?.timeline_summary || '[]'),
    product_mentions: JSON.parse(_v_stt_info?.product_mentions || '[]'),
    host_comments: JSON.parse(_v_stt_info?.host_comments || '[]'),
    viewer_reactions: JSON.parse(_v_stt_info?.viewer_reactions || '[]')
  };
  
  return { ...event_data, stt_info };
};
```

### 프론트엔드 표시

```jsx
// LiveBroadcastDetail.jsx
{stt_info?.key_message && stt_info.key_message.length > 0 && (
  <Box>
    <Typography variant="h6">주요 멘트</Typography>
    {stt_info.key_message.map((msg, idx) => (
      <Chip 
        key={idx}
        label={msg.message}
        icon={<MessageIcon />}
      />
    ))}
  </Box>
)}

{stt_info?.timeline_summary && stt_info.timeline_summary.length > 0 && (
  <Box>
    <Typography variant="h6">타임라인</Typography>
    <Timeline>
      {stt_info.timeline_summary.map((item, idx) => (
        <TimelineItem key={idx}>
          <TimelineOppositeContent>
            {item.timestamp}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{item.content}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </Box>
)}

{stt_info?.broadcast_qa && stt_info.broadcast_qa.length > 0 && (
  <Box>
    <Typography variant="h6">예상 Q&A</Typography>
    {stt_info.broadcast_qa.map((qa, idx) => (
      <Accordion key={idx}>
        <AccordionSummary>
          <Typography>{qa.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{qa.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </Box>
)}
```

---

## ✅ 완료 체크리스트

- [ ] Supabase에서 `live_stt_info` 테이블 생성
- [ ] STT 정보 생성 스크립트 실행
- [ ] 데이터 저장 확인
- [ ] 백엔드 API에서 STT 정보 조회 구현
- [ ] 프론트엔드에서 STT 정보 표시
- [ ] 자동화 스케줄러 설정

---

## 🎯 다음 단계

1. **실제 STT 수집**: 네이버 API 또는 음성 인식 서비스 연동
2. **AI 기반 요약**: OpenAI GPT로 방송 내용 자동 요약
3. **감정 분석**: 시청자 댓글 감정 분석
4. **트렌드 분석**: 인기 키워드 및 제품 추출

---

**🎊 축하합니다! 라이브 특화 정보 수집 시스템이 준비되었습니다!**
