# 🚀 Supabase 스키마 자동 생성 가이드

## 현재 상황

Supabase는 보안상의 이유로 REST API를 통한 직접 SQL 실행을 제한합니다. 따라서 **수동으로 Supabase 대시보드에서 SQL을 실행**해야 합니다.

## 빠른 실행 방법

### 방법 1: 자동화 스크립트 사용 (권장)

```bash
cd backend
node scripts/create-schema-direct.js
```

이 스크립트는:
- SQL 스키마 파일을 읽어서 출력
- macOS에서 클립보드에 자동 복사
- Supabase SQL Editor URL 제공
- 단계별 안내 제공

### 방법 2: 수동 실행

1. **SQL 파일 확인**
   ```bash
   cat database/supabase_schema.sql
   ```

2. **Supabase SQL Editor 접속**
   - https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new

3. **SQL 복사 및 붙여넣기**
   - SQL 파일 전체 내용 복사
   - Supabase SQL Editor에 붙여넣기
   - "Run" 버튼 클릭

4. **스키마 생성 확인**
   ```bash
   cd backend
   node scripts/check-schema.js
   ```

## 스키마 생성 후

스키마 생성이 완료되면 다음 명령어로 데이터를 적재합니다:

```bash
cd backend
node scripts/import-to-supabase.js
```

또는 통합 스크립트 사용:

```bash
cd backend
node scripts/setup-supabase-complete.js
```

## 생성되는 테이블

1. `channels` - 채널 정보
2. `live_broadcasts` - 라이브 방송 기본 정보
3. `live_products` - 라이브 방송 상품 정보
4. `live_benefits` - 라이브 방송 혜택 정보
5. `live_chat_messages` - 라이브 채팅 메시지
6. `live_qa` - 라이브 Q&A
7. `live_notices` - 라이브 공지사항
8. `live_faqs` - 라이브 FAQ
9. `live_timeline` - 라이브 타임라인
10. `live_duplicate_policy` - 중복 정책
11. `live_restrictions` - 라이브 제한사항
12. `live_cs_info` - CS 정보

## 문제 해결

### SQL 실행 오류

- **오류 메시지 확인**: Supabase SQL Editor에서 상세한 오류 메시지 확인
- **테이블이 이미 존재**: `CREATE TABLE IF NOT EXISTS` 구문 사용 중이므로 안전하게 재실행 가능
- **권한 문제**: Supabase 프로젝트 관리자 권한 확인

### 스키마 확인 실패

```bash
cd backend
node scripts/check-schema.js
```

모든 테이블이 ✅로 표시되어야 합니다.

## 관련 문서

- [빠른 시작 가이드](./SUPABASE_QUICK_SETUP.md)
- [환경변수 설정](./SUPABASE_ENV_SETUP.md)
- [스키마 상태 확인](./SUPABASE_SCHEMA_STATUS.md)

