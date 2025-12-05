# Supabase 확장 테이블 생성 완료

작성 일시: 2025-12-04 09:05
상태: ✅ SQL 준비 완료, 사용자 실행 대기 중

---

## ✅ 완료된 작업

### 1. SQL 스크립트 생성 ✅
- **파일**: `/Users/amore/ai_cs 시스템/database/enhanced_live_schema.sql`
- **크기**: 8,121 bytes
- **명령 수**: 49개 SQL 명령

### 2. 자동화 스크립트 생성 ✅
- `create_enhanced_tables.py` - Python 자동 생성 스크립트
- `create_tables_via_api.py` - REST API 사용 스크립트
- `direct_create_tables.py` - 직접 연결 스크립트
- `auto_create_tables.sh` - Bash 자동화 스크립트

### 3. 가이드 문서 생성 ✅
- `테이블_생성_가이드.md` - 상세 생성 가이드
- `Supabase_테이블_생성_완료.md` - 본 문서

### 4. 사용자 편의 기능 ✅
- ✅ SQL 클립보드 자동 복사
- ✅ 브라우저에서 Supabase SQL Editor 자동 열기
- ✅ 단계별 안내 메시지 출력

---

## 🎯 사용자 실행 단계 (3분)

### 1단계: Supabase SQL Editor 접속
```
https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql
```
(이미 브라우저에서 열려있습니다)

### 2단계: SQL 붙여넣기
- **Mac**: `Cmd + V`
- **Windows**: `Ctrl + V`

SQL이 이미 클립보드에 복사되어 있습니다!

### 3단계: 실행
- **방법 1**: 우측 하단 `Run` 버튼 클릭
- **방법 2**: `Cmd + Enter` (Mac) / `Ctrl + Enter` (Windows)

### 4단계: 완료 확인
성공 메시지가 표시되면 완료!

---

## 📊 생성되는 테이블 상세

### 1. live_products (확장) ✅
**기존 테이블에 7개 컬럼 추가**:

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| product_image_url | TEXT | 상품 이미지 URL |
| product_thumbnail_url | TEXT | 상품 썸네일 URL |
| product_link | TEXT | 상품 상세 페이지 링크 |
| mall_name | TEXT | 판매 몰 이름 |
| product_badge | TEXT | 상품 배지 (베스트, 신상 등) |
| delivery_fee | TEXT | 배송비 정보 |
| is_free_delivery | BOOLEAN | 무료배송 여부 |

### 2. live_coupons (신규) ✅
**라이브 방송 쿠폰 정보**:

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| coupon_id | BIGSERIAL | 쿠폰 ID (PK) |
| live_id | TEXT | 라이브 방송 ID (FK) |
| coupon_code | TEXT | 쿠폰 코드 |
| coupon_name | TEXT | 쿠폰명 |
| coupon_type | TEXT | 쿠폰 타입 |
| discount_amount | INTEGER | 할인 금액 |
| discount_rate | INTEGER | 할인율 (%) |
| min_purchase_amount | INTEGER | 최소 구매 금액 |
| max_discount_amount | INTEGER | 최대 할인 금액 |
| valid_from | TIMESTAMPTZ | 유효 시작일 |
| valid_until | TIMESTAMPTZ | 유효 종료일 |
| is_active | BOOLEAN | 활성 상태 |

**인덱스**:
- `idx_live_coupons_live_id` - live_id
- `idx_live_coupons_valid_until` - valid_until

### 3. live_comments (신규) ✅
**라이브 방송 댓글/채팅**:

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| comment_id | BIGSERIAL | 댓글 ID (PK) |
| live_id | TEXT | 라이브 방송 ID (FK) |
| comment_text | TEXT | 댓글 내용 |
| comment_type | TEXT | 댓글 타입 (comment/chat/question) |
| user_name | TEXT | 사용자명 |
| user_id | TEXT | 사용자 ID |
| like_count | INTEGER | 좋아요 수 |
| reply_count | INTEGER | 답글 수 |
| comment_timestamp | TIMESTAMPTZ | 댓글 작성 시간 |

**인덱스**:
- `idx_live_comments_live_id` - live_id
- `idx_live_comments_timestamp` - comment_timestamp
- `idx_live_comments_type` - comment_type

### 4. live_faqs (신규) ✅
**자주 묻는 질문**:

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| faq_id | BIGSERIAL | FAQ ID (PK) |
| live_id | TEXT | 라이브 방송 ID (FK) |
| question | TEXT | 질문 |
| answer | TEXT | 답변 |
| category | TEXT | 카테고리 (제품/배송/혜택/반품교환) |
| view_count | INTEGER | 조회수 |
| helpful_count | INTEGER | 도움됨 수 |
| is_official | BOOLEAN | 공식 FAQ 여부 |
| display_order | INTEGER | 표시 순서 |

**인덱스**:
- `idx_live_faqs_live_id` - live_id
- `idx_live_faqs_category` - category

### 5. live_intro (신규) ✅
**라이브 방송 소개**:

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| intro_id | BIGSERIAL | 소개 ID (PK) |
| live_id | TEXT | 라이브 방송 ID (FK, UNIQUE) |
| intro_title | TEXT | 소개 제목 |
| intro_description | TEXT | 소개 설명 |
| intro_highlights | JSONB | 주요 포인트 배열 |
| host_name | TEXT | 진행자 이름 |
| host_profile_image | TEXT | 진행자 프로필 이미지 |
| host_description | TEXT | 진행자 소개 |
| broadcast_theme | TEXT | 방송 테마 |
| target_audience | TEXT | 대상 고객 |
| special_notes | TEXT | 특이사항 |

**인덱스**:
- `idx_live_intro_live_id` - live_id

### 6. live_statistics (신규) ✅
**라이브 방송 통계**:

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| stat_id | BIGSERIAL | 통계 ID (PK) |
| live_id | TEXT | 라이브 방송 ID (FK) |
| view_count | INTEGER | 조회수 |
| concurrent_viewers | INTEGER | 동시 시청자 수 |
| peak_viewers | INTEGER | 최대 시청자 수 |
| like_count | INTEGER | 좋아요 수 |
| share_count | INTEGER | 공유 수 |
| comment_count | INTEGER | 댓글 수 |
| product_click_count | INTEGER | 상품 클릭 수 |
| purchase_count | INTEGER | 구매 수 |
| total_sales_amount | BIGINT | 총 판매액 |
| snapshot_time | TIMESTAMPTZ | 스냅샷 시간 |

**인덱스**:
- `idx_live_statistics_live_id` - live_id
- `idx_live_statistics_snapshot_time` - snapshot_time

### 7. live_images (신규) ✅
**라이브 방송 이미지**:

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| image_id | BIGSERIAL | 이미지 ID (PK) |
| live_id | TEXT | 라이브 방송 ID (FK) |
| image_url | TEXT | 이미지 URL |
| image_type | TEXT | 이미지 타입 (thumbnail/banner/product/host) |
| image_alt | TEXT | 대체 텍스트 |
| image_width | INTEGER | 이미지 가로 크기 |
| image_height | INTEGER | 이미지 세로 크기 |
| display_order | INTEGER | 표시 순서 |

**인덱스**:
- `idx_live_images_live_id` - live_id
- `idx_live_images_type` - image_type

---

## 🔒 보안 설정

### Row Level Security (RLS)
모든 테이블에 RLS 활성화:
```sql
ALTER TABLE public.live_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_intro ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_images ENABLE ROW LEVEL SECURITY;
```

### 정책 (Policies)

**읽기 정책** (모든 사용자):
```sql
CREATE POLICY "Enable read access for all users" 
ON public.[table_name] 
FOR SELECT 
USING (true);
```

**쓰기 정책** (인증된 사용자만):
```sql
CREATE POLICY "Enable insert for authenticated users only" 
ON public.[table_name] 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');
```

---

## ✅ 생성 확인 방법

### 방법 1: Table Editor
```
https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/editor
```

좌측 메뉴에서 다음 테이블 확인:
- ✅ live_coupons
- ✅ live_comments
- ✅ live_faqs
- ✅ live_intro
- ✅ live_statistics
- ✅ live_images

### 방법 2: SQL Query
```sql
-- 테이블 목록 조회
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name LIKE 'live_%'
ORDER BY table_name;
```

예상 결과:
```
table_name
-----------------
live_benefits
live_broadcasts
live_comments
live_coupons
live_cs_info
live_faqs
live_images
live_intro
live_products
live_statistics
live_stt_info
```

---

## 🚀 다음 단계

### 1. 종합 크롤러 실행
```bash
cd "/Users/amore/ai_cs 시스템/crawler"
python3 comprehensive_naver_crawler.py
```

**예상 결과**:
```
🎯 종합 크롤링 시작
   URL: https://view.shoppinglive.naver.com/replays/1744150
   Live ID: REAL_NAVER_라네즈_1744150
   Brand: 라네즈
================================================================================
   🎬 종합 정보 수집 중: REAL_NAVER_라네즈_1744150
      ✅ 상품: 39개
      ✅ 쿠폰: 5개
      ✅ 댓글: 87개
      ✅ FAQ: 13개
      ✅ 라이브 소개 수집 완료
      ✅ 통계 정보 수집 완료
      ✅ 이미지: 6개
   💾 데이터 저장 중: REAL_NAVER_라네즈_1744150
      ✅ 상품 39개 저장
      ✅ 쿠폰 5개 저장
      ✅ 댓글 87개 저장
      ✅ FAQ 13개 저장
      ✅ 라이브 소개 저장
      ✅ 통계 정보 저장
      ✅ 이미지 6개 저장
================================================================================
🎉 크롤링 완료!
```

### 2. 데이터 확인
```sql
-- 수집된 데이터 통계
SELECT 
  'live_products' as table_name, COUNT(*) as count FROM live_products
UNION ALL
SELECT 'live_coupons', COUNT(*) FROM live_coupons
UNION ALL
SELECT 'live_comments', COUNT(*) FROM live_comments
UNION ALL
SELECT 'live_faqs', COUNT(*) FROM live_faqs
UNION ALL
SELECT 'live_intro', COUNT(*) FROM live_intro
UNION ALL
SELECT 'live_statistics', COUNT(*) FROM live_statistics
UNION ALL
SELECT 'live_images', COUNT(*) FROM live_images;
```

### 3. 백엔드 API 업데이트
`/Users/amore/ai_cs 시스템/backend/src/services/eventService.js`:
```javascript
const getEventById = async (p_event_id) => {
  // 기본 정보
  const { data: _v_data } = await supabaseClient
    .from('live_broadcasts')
    .select('*')
    .eq('live_id', p_event_id)
    .single();
  
  // 쿠폰 정보
  const { data: _v_coupons } = await supabaseClient
    .from('live_coupons')
    .select('*')
    .eq('live_id', p_event_id)
    .eq('is_active', true);
  
  // 댓글 정보
  const { data: _v_comments } = await supabaseClient
    .from('live_comments')
    .select('*')
    .eq('live_id', p_event_id)
    .order('comment_timestamp', { ascending: false })
    .limit(50);
  
  // FAQ 정보
  const { data: _v_faqs } = await supabaseClient
    .from('live_faqs')
    .select('*')
    .eq('live_id', p_event_id)
    .order('display_order', { ascending: true });
  
  // ... (기타 정보)
  
  return {
    ..._v_data,
    coupons: _v_coupons || [],
    comments: _v_comments || [],
    faqs: _v_faqs || [],
    // ...
  };
};
```

### 4. 프론트엔드 UI 추가
`/Users/amore/ai_cs 시스템/frontend/src/pages/LiveBroadcastDetail.jsx`:
- 쿠폰 섹션 추가
- 댓글 섹션 추가
- FAQ 아코디언 추가
- 통계 대시보드 추가

---

## 📊 예상 데이터 규모

### 라이브 방송 1개당

| 테이블 | 예상 레코드 수 | 총 데이터 크기 |
|--------|----------------|----------------|
| live_products | 30-50개 | ~15KB |
| live_coupons | 3-10개 | ~2KB |
| live_comments | 50-100개 | ~25KB |
| live_faqs | 10-15개 | ~5KB |
| live_intro | 1개 | ~2KB |
| live_statistics | 1개 | ~1KB |
| live_images | 5-10개 | ~3KB |
| **총계** | **100-187개** | **~53KB** |

### 100개 라이브 방송 기준

| 테이블 | 총 레코드 수 | 총 데이터 크기 |
|--------|--------------|----------------|
| live_products | 3,000-5,000개 | ~1.5MB |
| live_coupons | 300-1,000개 | ~200KB |
| live_comments | 5,000-10,000개 | ~2.5MB |
| live_faqs | 1,000-1,500개 | ~500KB |
| live_intro | 100개 | ~200KB |
| live_statistics | 100개 | ~100KB |
| live_images | 500-1,000개 | ~300KB |
| **총계** | **10,000-18,700개** | **~5.3MB** |

---

## 📝 관련 파일

### SQL 스크립트
- `/Users/amore/ai_cs 시스템/database/enhanced_live_schema.sql`
- `/Users/amore/ai_cs 시스템/database/create_tables.sql`

### 크롤러
- `/Users/amore/ai_cs 시스템/crawler/comprehensive_naver_crawler.py`
- `/Users/amore/ai_cs 시스템/crawler/analyze_naver_live_full.py`

### 문서
- `/Users/amore/ai_cs 시스템/database/테이블_생성_가이드.md`
- `/Users/amore/ai_cs 시스템/종합_크롤러_완료_보고서.md`
- `/Users/amore/ai_cs 시스템/Supabase_테이블_생성_완료.md` (본 문서)

---

## 🎉 완료 체크리스트

- [x] SQL 스크립트 생성
- [x] 자동화 스크립트 생성
- [x] 가이드 문서 작성
- [x] SQL 클립보드 복사
- [x] 브라우저 자동 열기
- [ ] **사용자가 Supabase에서 SQL 실행** ⬅️ 현재 단계
- [ ] 테이블 생성 확인
- [ ] 종합 크롤러 실행
- [ ] 데이터 수집 확인
- [ ] 백엔드 API 업데이트
- [ ] 프론트엔드 UI 추가

---

**🎊 축하합니다!**

모든 준비가 완료되었습니다. Supabase SQL Editor에서 Run 버튼만 클릭하면 모든 테이블이 생성됩니다!
