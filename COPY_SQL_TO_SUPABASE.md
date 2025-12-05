# 📋 Supabase SQL Editor에 SQL 붙여넣기 가이드

## ⚠️ 중요: 올바른 방법

**잘못된 방법:**
```
cat database/supabase_schema.sql  ❌ (이것은 쉘 명령어입니다)
```

**올바른 방법:**
1. SQL 파일의 **내용**을 복사
2. Supabase SQL Editor에 **붙여넣기**
3. 실행

## 📝 단계별 가이드

### 방법 1: 파일 직접 열기 (가장 쉬움)

1. **프로젝트에서 파일 열기**
   - `database/supabase_schema.sql` 파일을 에디터에서 엽니다
   - 전체 내용 선택 (Cmd+A / Ctrl+A)
   - 복사 (Cmd+C / Ctrl+C)

2. **Supabase SQL Editor에 붙여넣기**
   - https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new
   - 붙여넣기 (Cmd+V / Ctrl+V)
   - "Run" 버튼 클릭

### 방법 2: 터미널에서 복사

```bash
# macOS
cat database/supabase_schema.sql | pbcopy

# Linux
cat database/supabase_schema.sql | xclip -selection clipboard

# Windows (PowerShell)
Get-Content database/supabase_schema.sql | Set-Clipboard
```

그 다음 Supabase SQL Editor에 붙여넣기 (Cmd+V / Ctrl+V)

### 방법 3: 파일 내용 직접 확인

터미널에서:
```bash
cat database/supabase_schema.sql
```

출력된 내용을 복사하여 Supabase SQL Editor에 붙여넣기

## ✅ 실행 후 확인

SQL 실행이 성공하면:

1. **스키마 확인**
   ```bash
   cd backend
   node scripts/check-schema.js
   ```
   
   모든 테이블이 ✅로 표시되면 성공!

2. **데이터 적재**
   ```bash
   cd backend
   node scripts/import-to-supabase.js
   ```

## 🔍 SQL 파일 위치

- 파일 경로: `database/supabase_schema.sql`
- 총 라인 수: 287줄
- 생성되는 테이블: 12개

## 📚 참고

- Supabase SQL Editor: https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new
- SQL 파일: `database/supabase_schema.sql`


