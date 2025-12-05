# Supabase 연결 상태 확인

## ✅ 연결 완료

Supabase 프로젝트 `uewhvekfjjvxoioklzza`가 ai_cs 프로젝트와 성공적으로 연결되었습니다.

## 📋 설정 확인

### 1. 백엔드 설정 (`backend/.env`)
```env
SUPABASE_URL=https://uewhvekfjjvxoioklzza.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
✅ **설정 완료**

### 2. 프론트엔드 설정 (`frontend/.env`)
```env
REACT_APP_SUPABASE_URL=https://uewhvekfjjvxoioklzza.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
✅ **설정 완료**

### 3. 크롤러 설정 (`crawler/.env`)
```env
SUPABASE_URL=https://uewhvekfjjvxoioklzza.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
✅ **설정 완료** (방금 생성됨)

## 🔗 Supabase 프로젝트 정보

- **프로젝트 ID**: `uewhvekfjjvxoioklzza`
- **프로젝트 URL**: `https://uewhvekfjjvxoioklzza.supabase.co`
- **대시보드 URL**: `https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza`

## 📊 다음 단계

### 1. 데이터베이스 스키마 생성

Supabase 대시보드에서 SQL Editor를 열고 `database/supabase_schema.sql` 파일의 내용을 실행하세요.

```bash
# SQL 파일 확인
cat database/supabase_schema.sql
```

### 2. 연결 테스트

#### 백엔드에서 테스트:
```bash
cd backend
node -e "require('dotenv').config(); const {supabase} = require('./src/config/supabase'); supabase.from('channels').select('*').limit(1).then(r => console.log('✅ 연결 성공:', r.data.length, '개 채널'));"
```

#### 크롤러에서 테스트:
```bash
cd crawler
pip install supabase python-dotenv
python3 -c "from supabase_client import get_supabase_client; client = get_supabase_client(); result = client.table('channels').select('*').limit(1).execute(); print('✅ 연결 성공:', len(result.data), '개 채널')"
```

### 3. 데이터 저장 테스트

크롤러에서 데이터를 Supabase에 저장:

```python
from supabase_client import save_live_broadcast

live_data = {
    'metadata': {
        'live_id': 'TEST_001',
        'platform_name': '네이버',
        'brand_name': '설화수',
        'live_title_customer': '테스트 방송',
        'source_url': 'https://test.com',
        'status': 'PENDING',
        'collected_at': '2025-01-01T00:00:00',
    },
    'schedule': {
        'broadcast_date': '2025-01-01',
    },
}

save_live_broadcast(live_data)
```

## 🛠 문제 해결

### 연결 오류가 발생하는 경우:

1. **환경 변수 확인**:
   ```bash
   # 백엔드
   cd backend && cat .env | grep SUPABASE
   
   # 크롤러
   cd crawler && cat .env | grep SUPABASE
   ```

2. **Supabase 프로젝트 상태 확인**:
   - 대시보드에서 프로젝트가 활성화되어 있는지 확인
   - API 키가 올바른지 확인 (Settings > API)

3. **네트워크 확인**:
   - Supabase URL에 접근 가능한지 확인
   - 방화벽이나 프록시 설정 확인

## 📚 관련 문서

- [Supabase 설정 가이드](./SUPABASE_SETUP_GUIDE.md)
- [Supabase 공식 문서](https://supabase.com/docs)


