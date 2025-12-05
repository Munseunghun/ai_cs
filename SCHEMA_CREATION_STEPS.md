# 📋 Supabase 스키마 생성 단계별 가이드

## ✅ 준비 완료

SQL 스키마가 **클립보드에 복사**되었습니다! (macOS)

## 🚀 스키마 생성 단계

### 1단계: Supabase SQL Editor 접속

브라우저에서 다음 URL을 열어주세요:

```
https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new
```

**참고**: 로그인이 필요할 수 있습니다.

### 2단계: SQL 붙여넣기

1. Supabase SQL Editor의 텍스트 영역 클릭
2. **Cmd+V** (Mac) 또는 **Ctrl+V** (Windows/Linux)로 붙여넣기
   - SQL 전체 내용이 자동으로 붙여넣어집니다

### 3단계: SQL 실행

1. **"Run"** 버튼 클릭
   - 또는 **Cmd+Enter** (Mac) / **Ctrl+Enter** (Windows/Linux)
2. 실행 결과 확인
   - 성공 메시지가 표시되어야 합니다
   - 오류가 있다면 오류 메시지를 확인하세요

### 4단계: 스키마 생성 확인

터미널에서 다음 명령어를 실행하세요:

```bash
cd backend
node scripts/check-schema.js
```

**예상 결과**: 모든 테이블이 ✅로 표시되어야 합니다.

```
✅ channels
✅ live_broadcasts
✅ live_products
✅ live_benefits
✅ live_chat_messages
✅ live_qa
✅ live_notices
✅ live_faqs
✅ live_timeline
✅ live_duplicate_policy
✅ live_restrictions
✅ live_cs_info
```

### 5단계: 데이터 적재

스키마 생성이 확인되면 다음 명령어로 데이터를 적재합니다:

```bash
cd backend
node scripts/import-to-supabase.js
```

## 📊 생성되는 테이블 (12개)

1. **channels** - 채널 정보 (네이버, 카카오, 11번가 등)
2. **live_broadcasts** - 라이브 방송 기본 정보
3. **live_products** - 라이브 방송 상품 정보
4. **live_benefits** - 라이브 방송 혜택 정보
5. **live_chat_messages** - 라이브 채팅 메시지
6. **live_qa** - 라이브 Q&A
7. **live_notices** - 라이브 공지사항
8. **live_faqs** - 라이브 FAQ
9. **live_timeline** - 라이브 타임라인
10. **live_duplicate_policy** - 중복 정책
11. **live_restrictions** - 라이브 제한사항
12. **live_cs_info** - CS 정보

## ⚠️ 문제 해결

### SQL 실행 오류 발생 시

1. **오류 메시지 확인**
   - Supabase SQL Editor에서 상세한 오류 메시지 확인
   - 일반적인 오류:
     - `syntax error`: SQL 구문 오류
     - `relation already exists`: 테이블이 이미 존재 (무시 가능)
     - `permission denied`: 권한 문제

2. **테이블이 이미 존재하는 경우**
   - `CREATE TABLE IF NOT EXISTS` 구문 사용 중이므로 안전하게 재실행 가능
   - 기존 테이블을 유지하면서 스키마 업데이트 가능

3. **클립보드에 SQL이 없는 경우**

   **방법 1: 파일에서 직접 복사**
   ```bash
   # 파일 열기
   open database/supabase_schema.sql
   # 또는
   cat database/supabase_schema.sql
   ```
   
   **방법 2: 터미널에서 클립보드로 복사 (macOS)**
   ```bash
   cat database/supabase_schema.sql | pbcopy
   ```

### 스키마 확인 실패 시

```bash
cd backend
node scripts/check-schema.js
```

- 일부 테이블이 ❌로 표시되면 SQL 실행이 완료되지 않은 것입니다
- Supabase SQL Editor에서 다시 실행해주세요

## 📚 관련 문서

- [빠른 시작 가이드](./SUPABASE_QUICK_SETUP.md)
- [환경변수 설정](./SUPABASE_ENV_SETUP.md)
- [스키마 상태 확인](./SUPABASE_SCHEMA_STATUS.md)

## 🎯 다음 단계

스키마 생성이 완료되면:

1. **데이터 적재**
   ```bash
   cd backend
   node scripts/import-to-supabase.js
   ```

2. **Supabase 대시보드에서 데이터 확인**
   - https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/editor

3. **프론트엔드에서 Supabase 데이터 사용**
   ```javascript
   import { select } from './config/supabase';
   const { data } = await select('live_broadcasts', '*');
   ```

