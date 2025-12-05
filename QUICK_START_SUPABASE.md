# 🚀 Supabase 스키마 생성 및 데이터 적재 빠른 시작 가이드

## ✅ 준비 완료 사항

- ✅ Supabase 프로젝트 연결 완료 (`uewhvekfjjvxoioklzza`)
- ✅ 환경 변수 설정 완료 (backend, frontend, crawler)
- ✅ 수집된 데이터 확인 완료 (1,185개의 라이브 방송 데이터)
- ✅ 데이터 적재 스크립트 준비 완료

## 📋 실행 단계

### 1단계: 데이터베이스 스키마 생성

**Supabase 대시보드에서 SQL 실행:**

1. **SQL Editor 접속**
   ```
   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new
   ```

2. **SQL 파일 내용 확인 및 복사**
   ```bash
   # 방법 1: 파일 직접 확인
   cat database/supabase_schema.sql
   
   # 방법 2: 스크립트로 출력
   cd backend
   node scripts/create-supabase-schema.js
   ```

3. **SQL 실행**
   - Supabase SQL Editor에 SQL 붙여넣기
   - "Run" 버튼 클릭 (또는 Cmd/Ctrl + Enter)
   - 성공 메시지 확인

**생성되는 테이블:**
- `channels` - 채널 정보 (9개 플랫폼)
- `live_broadcasts` - 라이브 방송 기본 정보
- `live_products` - 상품 정보
- `live_benefits` - 혜택 정보
- `live_chat_messages` - 키 멘션/채팅
- `live_qa` - Q&A
- `live_timeline` - 타임라인
- `live_duplicate_policy` - 중복 정책
- `live_restrictions` - 제한사항
- `live_cs_info` - CS 정보
- `live_notices` - 공지사항
- `live_faqs` - FAQ

### 2단계: 데이터 적재

**스키마 생성 완료 후 실행:**

```bash
cd backend
node scripts/import-to-supabase.js
```

**예상 결과:**
- ✅ 채널: 9개
- ✅ 라이브 방송: 약 1,185개
- ✅ 상품 정보: 수천 개
- ✅ 혜택 정보: 수천 개

**처리 과정:**
- 배치 처리로 10개씩 나누어 저장
- 배치 간 1초 대기 (API Rate Limit 방지)
- 진행 상황 실시간 출력

### 3단계: 데이터 확인

**Supabase 대시보드에서 확인:**

1. **Table Editor 접속**
   ```
   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/editor
   ```

2. **테이블 확인**
   - `live_broadcasts` 테이블 선택
   - 데이터 확인

3. **SQL 쿼리로 통계 확인**
   ```sql
   -- 전체 라이브 방송 수
   SELECT COUNT(*) FROM live_broadcasts;
   
   -- 플랫폼별 통계
   SELECT platform_name, COUNT(*) as count 
   FROM live_broadcasts 
   GROUP BY platform_name 
   ORDER BY count DESC;
   
   -- 브랜드별 통계
   SELECT brand_name, COUNT(*) as count 
   FROM live_broadcasts 
   GROUP BY brand_name 
   ORDER BY count DESC;
   ```

## 🎯 통합 실행 (자동화)

모든 과정을 한 번에 실행:

```bash
bash RUN_SUPABASE_SETUP.sh
```

또는:

```bash
cd backend
node scripts/setup-and-import.js
```

## ⚠️ 주의사항

1. **스키마는 한 번만 실행**
   - 이미 테이블이 있으면 에러 없이 건너뜀
   - 채널 데이터는 중복 방지됨

2. **데이터 적재는 중복 방지**
   - `live_id` 기준으로 UPSERT 수행
   - 같은 ID가 있으면 업데이트, 없으면 삽입

3. **API Rate Limit**
   - 배치 처리로 자동 제어
   - 대량 데이터는 시간이 걸릴 수 있음

## 🔧 문제 해결

### 스키마 생성 실패
- SQL 구문 오류 확인
- Supabase 프로젝트 상태 확인
- 권한 확인

### 데이터 적재 실패
- 스키마 생성 완료 확인
- `channels` 테이블 데이터 확인
- 채널 코드 확인 (NAVER, KAKAO 등)

## 📊 예상 소요 시간

- 스키마 생성: 약 10-30초
- 데이터 적재: 약 5-10분 (1,185개 데이터 기준)

## 📚 관련 문서

- [상세 설정 가이드](./SUPABASE_SCHEMA_AND_DATA_SETUP.md)
- [Supabase 설정 가이드](./SUPABASE_SETUP_GUIDE.md)
- [연결 상태 확인](./SUPABASE_CONNECTION_STATUS.md)


