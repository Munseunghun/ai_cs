# ⚠️ 스키마 생성 필요 안내

## 문제 상황

데이터 적재 스크립트 실행 시 다음 오류가 발생했습니다:
```
Could not find the table 'public.channels' in the schema cache
채널을 찾을 수 없습니다: NAVER
```

이는 **Supabase에 데이터베이스 스키마가 아직 생성되지 않았기 때문**입니다.

## 해결 방법

### 1단계: 스키마 확인

먼저 스키마가 생성되었는지 확인하세요:

```bash
cd backend
node scripts/check-schema.js
```

### 2단계: 스키마 생성 (아직 생성하지 않은 경우)

**Supabase 대시보드에서 SQL 실행:**

1. **SQL Editor 접속**
   ```
   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new
   ```

2. **SQL 파일 내용 확인**
   ```bash
   cat database/supabase_schema.sql
   ```
   
   또는 프로젝트 루트에서:
   ```bash
   cat "database/supabase_schema.sql"
   ```

3. **SQL 실행**
   - Supabase SQL Editor에 SQL 전체를 복사하여 붙여넣기
   - "Run" 버튼 클릭 (또는 Cmd/Ctrl + Enter)
   - 성공 메시지 확인

4. **생성 확인**
   ```bash
   cd backend
   node scripts/check-schema.js
   ```
   
   모든 테이블이 ✅로 표시되면 성공입니다.

### 3단계: 데이터 적재

스키마 생성이 완료되면 데이터를 적재하세요:

```bash
cd backend
node scripts/import-to-supabase.js
```

## 개선 사항

다음 개선 사항이 적용되었습니다:

1. ✅ **스키마 확인 스크립트 추가** (`backend/scripts/check-schema.js`)
   - 모든 필수 테이블 존재 여부 확인
   - 테이블별 데이터 개수 표시

2. ✅ **데이터 적재 스크립트 개선** (`backend/scripts/import-to-supabase.js`)
   - 실행 전 스키마 존재 여부 자동 확인
   - 스키마가 없으면 명확한 안내 메시지 출력
   - 채널 조회 시 더 명확한 오류 메시지 제공

3. ✅ **오류 처리 강화**
   - 테이블이 없을 때 명확한 오류 메시지
   - Supabase 대시보드 링크 및 SQL 파일 경로 안내

## 빠른 실행

```bash
# 1. 스키마 확인
cd backend
node scripts/check-schema.js

# 2. 스키마가 없다면 Supabase 대시보드에서 SQL 실행
#    https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new

# 3. 스키마 생성 후 데이터 적재
node scripts/import-to-supabase.js
```

## 참고

- SQL 파일 위치: `database/supabase_schema.sql`
- Supabase 프로젝트: `uewhvekfjjvxoioklzza`
- 생성되는 테이블: 12개 (channels, live_broadcasts, live_products 등)


