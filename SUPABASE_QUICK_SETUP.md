# 🚀 Supabase 스키마 생성 및 데이터 적재 가이드

## 현재 상태

✅ **SQL 스키마 파일 준비 완료**: `database/supabase_schema.sql`  
✅ **데이터 적재 스크립트 준비 완료**: `backend/scripts/import-to-supabase.js`  
⏳ **스키마 생성 필요**: Supabase 대시보드에서 SQL 실행 필요

## 1단계: 스키마 생성

### 방법 1: Supabase SQL Editor 사용 (권장)

1. **Supabase SQL Editor 접속**
   ```
   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new
   ```

2. **SQL 파일 내용 복사**
   - 프로젝트에서 `database/supabase_schema.sql` 파일 열기
   - 전체 내용 선택 (Cmd+A / Ctrl+A)
   - 복사 (Cmd+C / Ctrl+C)
   - 또는 터미널에서: `cat database/supabase_schema.sql | pbcopy` (macOS)

3. **SQL 붙여넣기 및 실행**
   - Supabase SQL Editor에 붙여넣기 (Cmd+V / Ctrl+V)
   - "Run" 버튼 클릭 (또는 Cmd+Enter / Ctrl+Enter)
   - 성공 메시지 확인

### 방법 2: Supabase CLI 사용 (선택사항)

```bash
# Supabase CLI 설치 (없는 경우)
npm install -g supabase

# Supabase 로그인
supabase login

# 프로젝트 링크
supabase link --project-ref uewhvekfjjvxoioklzza

# SQL 실행
supabase db execute -f database/supabase_schema.sql
```

## 2단계: 스키마 생성 확인

```bash
cd backend
node scripts/check-schema.js
```

모든 테이블이 ✅로 표시되면 성공입니다!

## 3단계: 데이터 적재

스키마 생성이 완료되면 다음 명령어로 데이터를 적재합니다:

```bash
cd backend
node scripts/import-to-supabase.js
```

## 생성되는 테이블 목록

1. `channels` - 채널 정보
2. `live_broadcasts` - 라이브 방송 기본 정보
3. `live_products` - 라이브 방송 상품 정보
4. `live_benefits` - 라이브 방송 혜택 정보
5. `live_chat_messages` - 라이브 채팅 메시지
6. `live_qa` - 라이브 Q&A
7. `live_timeline` - 라이브 타임라인
8. `live_duplicate_policy` - 중복 정책
9. `live_restrictions` - 라이브 제한사항
10. `live_cs_info` - CS 정보
11. `live_notices` - 라이브 공지사항
12. `live_faqs` - 라이브 FAQ

## 문제 해결

### SQL 실행 오류 발생 시

1. **오류 메시지 확인**
   - Supabase SQL Editor에서 오류 메시지 확인
   - 일반적인 오류:
     - `syntax error`: SQL 구문 오류
     - `relation already exists`: 테이블이 이미 존재
     - `permission denied`: 권한 문제

2. **테이블이 이미 존재하는 경우**
   - `CREATE TABLE IF NOT EXISTS` 구문 사용 중이므로 안전하게 재실행 가능
   - 또는 기존 테이블 삭제 후 재생성

3. **권한 문제**
   - Supabase 프로젝트 관리자 권한 확인
   - 프로젝트가 활성화되어 있는지 확인

### 데이터 적재 오류 발생 시

1. **스키마 확인**
   ```bash
   cd backend
   node scripts/check-schema.js
   ```

2. **환경변수 확인**
   ```bash
   # 백엔드 .env 파일 확인
   cat backend/.env | grep SUPABASE
   ```

3. **로그 확인**
   - 데이터 적재 스크립트 실행 시 상세한 로그 출력
   - 오류 메시지 확인 및 해결

## 다음 단계

스키마 생성 및 데이터 적재 완료 후:

1. **대시보드에서 데이터 확인**
   - https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/editor
   - 각 테이블의 데이터 확인

2. **프론트엔드 연동**
   - `frontend/src/config/supabase.js` 사용
   - Supabase 클라이언트로 데이터 조회

3. **백엔드 API 연동**
   - `backend/src/config/supabase.js` 사용
   - REST API 엔드포인트에서 Supabase 데이터 사용

## 관련 문서

- [Supabase 환경변수 설정](./SUPABASE_ENV_SETUP.md)
- [Supabase 스키마 상태](./SUPABASE_SCHEMA_STATUS.md)
- [Supabase 설정 가이드](./SUPABASE_SETUP_GUIDE.md)

