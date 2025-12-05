# Supabase 스키마 생성 및 데이터 적재 가이드

## 🎯 목표
1. Supabase에 데이터베이스 스키마 생성
2. 수집된 라이브 방송 데이터를 Supabase에 적재

## 📋 단계별 가이드

### 1단계: 데이터베이스 스키마 생성

#### 방법 1: Supabase 대시보드 사용 (권장)

1. **Supabase 대시보드 접속**
   - URL: https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new

2. **SQL Editor 열기**
   - 좌측 메뉴에서 "SQL Editor" 클릭
   - "New query" 버튼 클릭

3. **SQL 실행**
   ```bash
   # SQL 파일 내용 확인
   cat database/supabase_schema.sql
   ```
   
   또는 다음 명령어로 SQL 내용을 출력:
   ```bash
   cd backend
   node scripts/create-supabase-schema.js
   ```
   
   출력된 SQL을 복사하여 Supabase SQL Editor에 붙여넣기

4. **실행**
   - "Run" 버튼 클릭 (또는 Cmd/Ctrl + Enter)
   - 성공 메시지 확인

#### 방법 2: Supabase CLI 사용 (선택사항)

```bash
# Supabase CLI 설치 (아직 설치하지 않은 경우)
npm install -g supabase

# Supabase 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref uewhvekfjjvxoioklzza

# SQL 실행
supabase db push --db-url "postgresql://postgres:[YOUR-PASSWORD]@db.uewhvekfjjvxoioklzza.supabase.co:5432/postgres"
```

### 2단계: 데이터 적재

스키마 생성이 완료되면 다음 명령어로 데이터를 적재합니다:

```bash
cd backend
node scripts/import-to-supabase.js
```

이 스크립트는:
- `frontend/src/mockData/realCollectedData.js`의 모든 데이터를 읽어옵니다
- 약 1,185개의 라이브 방송 데이터를 Supabase에 저장합니다
- 배치 처리로 10개씩 나누어 저장합니다 (API Rate Limit 방지)

### 3단계: 데이터 확인

Supabase 대시보드에서 데이터 확인:

1. **Table Editor 접속**
   - URL: https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/editor

2. **테이블 확인**
   - `channels` - 채널 정보 (9개)
   - `live_broadcasts` - 라이브 방송 기본 정보 (약 1,185개)
   - `live_products` - 상품 정보
   - `live_benefits` - 혜택 정보
   - 기타 관련 테이블들

3. **SQL 쿼리로 확인**
   ```sql
   -- 전체 라이브 방송 수 확인
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

## 🚀 빠른 실행 (통합 스크립트)

모든 과정을 자동화하려면:

```bash
cd backend
node scripts/setup-and-import.js
```

이 스크립트는:
1. 스키마 생성 SQL을 출력합니다
2. 사용자가 스키마 생성을 완료할 때까지 대기합니다
3. 데이터 적재를 시작합니다

## ⚠️ 주의사항

1. **스키마 생성은 한 번만 실행**
   - 이미 테이블이 존재하면 `CREATE TABLE IF NOT EXISTS`로 인해 에러 없이 건너뜁니다
   - 채널 데이터는 `ON CONFLICT DO NOTHING`으로 중복 방지됩니다

2. **데이터 적재는 중복 방지**
   - `live_id`를 기준으로 UPSERT를 수행합니다
   - 같은 `live_id`가 있으면 업데이트, 없으면 삽입합니다

3. **API Rate Limit**
   - 배치 처리로 10개씩 나누어 저장합니다
   - 배치 간 1초 대기 시간이 있습니다

## 🔧 문제 해결

### 스키마 생성 실패

**문제**: SQL 실행 시 오류 발생

**해결**:
- SQL 구문 오류 확인
- Supabase 프로젝트 상태 확인 (일시 중지되지 않았는지)
- 권한 확인 (anon key로는 제한적이므로 service role key 필요할 수 있음)

### 데이터 적재 실패

**문제**: `채널을 찾을 수 없습니다` 오류

**해결**:
- 스키마 생성이 완료되었는지 확인
- `channels` 테이블에 데이터가 있는지 확인:
  ```sql
  SELECT * FROM channels;
  ```

**문제**: `foreign key constraint` 오류

**해결**:
- `channels` 테이블에 해당 채널이 존재하는지 확인
- 채널 코드가 올바른지 확인 (NAVER, KAKAO, 11ST 등)

## 📊 예상 결과

스크립트 실행 후:
- ✅ 채널: 9개 (네이버, 카카오, 11번가, G마켓, 올리브영, 그립, 무신사, 롯데온, 아모레몰)
- ✅ 라이브 방송: 약 1,185개
- ✅ 상품 정보: 수천 개
- ✅ 혜택 정보: 수천 개

## 📚 관련 문서

- [Supabase 설정 가이드](./SUPABASE_SETUP_GUIDE.md)
- [Supabase 연결 상태](./SUPABASE_CONNECTION_STATUS.md)


