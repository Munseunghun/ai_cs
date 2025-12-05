# Supabase 데이터베이스 설정 가이드

이 가이드는 라이브 방송 수집 정보를 Supabase에 저장하는 방법을 설명합니다.

## 📋 목차

1. [Supabase 프로젝트 설정](#supabase-프로젝트-설정)
2. [데이터베이스 스키마 생성](#데이터베이스-스키마-생성)
3. [환경 변수 설정](#환경-변수-설정)
4. [크롤러 설정](#크롤러-설정)
5. [데이터 저장 방법](#데이터-저장-방법)

---

## 1. Supabase 프로젝트 설정

### 1.1 Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 로그인
2. 새 프로젝트 생성
3. 프로젝트 이름과 데이터베이스 비밀번호 설정
4. 프로젝트 생성 완료 후 대기 (약 2분)

### 1.2 프로젝트 정보 확인

프로젝트 설정 > API에서 다음 정보를 확인:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 2. 데이터베이스 스키마 생성

### 2.1 SQL 에디터에서 스키마 실행

1. Supabase 대시보드 > SQL Editor 이동
2. `database/supabase_schema.sql` 파일의 내용을 복사
3. SQL 에디터에 붙여넣기
4. 실행 (Run) 버튼 클릭

### 2.2 스키마 확인

다음 테이블들이 생성되었는지 확인:
- `channels` - 채널 정보
- `live_broadcasts` - 라이브 방송 기본 정보
- `live_products` - 라이브 방송 상품 정보
- `live_benefits` - 라이브 방송 혜택 정보
- `live_chat_messages` - 키 멘션/채팅
- `live_qa` - Q&A
- `live_timeline` - 타임라인
- `live_duplicate_policy` - 중복 정책
- `live_restrictions` - 제한사항
- `live_cs_info` - CS 정보
- `live_notices` - 공지사항
- `live_faqs` - FAQ

---

## 3. 환경 변수 설정

### 3.1 백엔드 환경 변수

`backend/.env` 파일에 다음 내용 추가:

```env
# Supabase 설정
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3.2 크롤러 환경 변수

`crawler/.env` 파일 생성 (또는 기존 파일에 추가):

```env
# Supabase 설정
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 기존 데이터베이스 설정 (선택사항)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cosmetic_consultation_system
DB_USER=postgres
DB_PASSWORD=your_password
```

---

## 4. 크롤러 설정

### 4.1 Python 패키지 설치

```bash
cd crawler
pip install -r requirements.txt
```

### 4.2 Supabase 클라이언트 사용

크롤러에서 Supabase에 데이터를 저장하려면 `supabase_client.py` 모듈을 사용합니다:

```python
from supabase_client import save_live_broadcast

# 크롤링한 라이브 방송 데이터
live_data = {
    'metadata': {
        'live_id': 'REAL_NAVER_SULWHASOO_001',
        'platform_name': '네이버',
        'brand_name': '설화수',
        'live_title_customer': '🔴 LIVE | 설화수 윤조에센스 특별 방송',
        'live_title_cs': '설화수 11월 28일 네이버 윤조에센스 라이브',
        'source_url': 'https://shoppinglive.naver.com/lives/312345',
        'status': 'ACTIVE',
        'collected_at': '2025-11-28T18:30:00',
    },
    'schedule': {
        'broadcast_date': '2025-11-28',
        'broadcast_start_time': '20:00',
        'broadcast_end_time': '21:30',
        'benefit_valid_type': '방송 중만',
    },
    'products': [
        {
            'product_order': 1,
            'product_name': '윤조에센스 60ml 본품',
            'sku': 'SWS-YJE-001',
            'original_price': '220,000원',
            'sale_price': '176,000원',
            'discount_rate': '20%',
        }
    ],
    'benefits': {
        'discounts': [
            {
                'discount_type': '%할인',
                'discount_detail': '라이브 방송 중 전 상품 20% 할인',
            }
        ],
        'gifts': [],
        'coupons': [],
    },
}

# Supabase에 저장
live_id = save_live_broadcast(live_data)
if live_id:
    print(f'✅ 저장 완료: {live_id}')
else:
    print('❌ 저장 실패')
```

---

## 5. 데이터 저장 방법

### 5.1 크롤러에서 직접 저장

크롤러의 메인 로직에서 수집한 데이터를 Supabase에 저장:

```python
# crawl_naver_shopping_live.py 예시
from supabase_client import save_live_broadcast

def crawl_naver_live():
    # 크롤링 로직...
    live_data = {
        'metadata': {...},
        'schedule': {...},
        'products': [...],
        'benefits': {...},
    }
    
    # Supabase에 저장
    save_live_broadcast(live_data)
```

### 5.2 백엔드 스크립트로 일괄 저장

기존 Mock 데이터를 Supabase에 일괄 저장:

```bash
cd backend
node scripts/import-to-supabase.js
```

이 스크립트는 `frontend/src/mockData/realCollectedData.js`의 모든 데이터를 Supabase에 저장합니다.

### 5.3 백엔드 API를 통한 저장

백엔드 API 엔드포인트를 통해 데이터 저장 (향후 구현):

```javascript
// 백엔드 API 예시
POST /api/live-broadcasts
{
  "metadata": {...},
  "schedule": {...},
  "products": [...],
  "benefits": {...}
}
```

---

## 6. 데이터 확인

### 6.1 Supabase 대시보드에서 확인

1. Supabase 대시보드 > Table Editor 이동
2. `live_broadcasts` 테이블 선택
3. 저장된 데이터 확인

### 6.2 SQL 쿼리로 확인

```sql
-- 전체 라이브 방송 조회
SELECT * FROM live_broadcasts ORDER BY created_at DESC;

-- 특정 플랫폼의 라이브 방송 조회
SELECT * FROM live_broadcasts WHERE platform_name = '네이버';

-- 진행중인 라이브 방송 조회
SELECT * FROM live_broadcasts WHERE status = 'ACTIVE';

-- 상품 정보와 함께 조회
SELECT 
    lb.*,
    lp.product_name,
    lp.sale_price
FROM live_broadcasts lb
LEFT JOIN live_products lp ON lb.live_id = lp.live_id
WHERE lb.status = 'ACTIVE';
```

---

## 7. 문제 해결

### 7.1 연결 오류

**문제**: `Supabase 설정이 누락되었습니다` 오류

**해결**:
- `.env` 파일에 `SUPABASE_URL`과 `SUPABASE_ANON_KEY`가 올바르게 설정되었는지 확인
- 환경 변수가 로드되는지 확인 (`python -c "from dotenv import load_dotenv; load_dotenv(); import os; print(os.getenv('SUPABASE_URL'))"`)

### 7.2 채널을 찾을 수 없음

**문제**: `채널을 찾을 수 없습니다: NAVER` 오류

**해결**:
- Supabase SQL Editor에서 `channels` 테이블에 채널 데이터가 있는지 확인
- `database/supabase_schema.sql`의 채널 초기 데이터 INSERT 문이 실행되었는지 확인

### 7.3 외래키 제약 조건 오류

**문제**: `foreign key constraint` 오류

**해결**:
- `live_broadcasts` 테이블에 저장하기 전에 `channels` 테이블에 해당 채널이 존재하는지 확인
- 채널 코드가 올바른지 확인 (NAVER, KAKAO, 11ST 등)

---

## 8. 다음 단계

1. ✅ Supabase 프로젝트 생성 및 스키마 설정 완료
2. ✅ 환경 변수 설정 완료
3. ✅ 크롤러에 Supabase 저장 기능 통합
4. 🔄 크롤러 실행 및 데이터 수집 테스트
5. 🔄 백엔드 API에서 Supabase 데이터 조회 구현
6. 🔄 프론트엔드에서 Supabase 데이터 표시

---

## 9. 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase Python 클라이언트](https://github.com/supabase/supabase-py)
- [Supabase JavaScript 클라이언트](https://github.com/supabase/supabase-js)



