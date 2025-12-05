# 🔐 Supabase 환경변수 설정 가이드

## 개요

프로젝트에서 Supabase를 사용하기 위한 환경변수 설정이 완료되었습니다.

## 환경변수 구조

### 프론트엔드 (`frontend/.env`)

```env
# Supabase 설정
REACT_APP_SUPABASE_URL=https://uewhvekfjjvxoioklzza.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
REACT_APP_SUPABASE_PUBLISHABLE_KEY=sb_publishable_CLrBJ-Hxb7h3sKNUgW08Zg_M6UFo1kN
```

**사용 위치**: `frontend/src/config/supabase.js`

### 백엔드 (`backend/.env`)

```env
# Supabase 설정
SUPABASE_URL=https://uewhvekfjjvxoioklzza.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_PUBLISHABLE_KEY=sb_publishable_CLrBJ-Hxb7h3sKNUgW08Zg_M6UFo1kN
SUPABASE_SECRET_KEY=sb_publishable_CLrBJ-Hxb7h3sKNUgW08Zg_M6UFo1kN
```

**사용 위치**: `backend/src/config/supabase.js`

## 키 우선순위

### 백엔드
1. `SUPABASE_SECRET_KEY` (최우선, 서버 전용)
2. `SUPABASE_PUBLISHABLE_KEY` (차선)
3. `SUPABASE_ANON_KEY` (마지막)

### 프론트엔드
1. `REACT_APP_SUPABASE_PUBLISHABLE_KEY` (최우선)
2. `REACT_APP_SUPABASE_ANON_KEY` (차선)

## 보안 주의사항

### ⚠️ 중요

1. **Secret Key는 절대 노출 금지**
   - Git에 커밋하지 마세요
   - 클라이언트 코드에 포함하지 마세요
   - 환경변수로만 관리하세요

2. **`.env` 파일은 `.gitignore`에 포함되어야 함**
   ```gitignore
   .env
   .env.local
   .env.*.local
   ```

3. **프론트엔드에서는 Publishable Key만 사용**
   - Secret Key는 서버에서만 사용
   - 클라이언트 코드에는 절대 포함하지 않음

## 사용 방법

### 프론트엔드에서 사용

```javascript
import { supabase, select, insert } from './config/supabase';

// 데이터 조회
const { data, error } = await select('live_broadcasts', '*', { status: 'active' });

// 데이터 삽입
const result = await insert('live_broadcasts', {
  title: '라이브 방송',
  // ...
});
```

### 백엔드에서 사용

```javascript
const { supabase, select, insert } = require('./config/supabase');

// 데이터 조회
const { rows, error } = await select('live_broadcasts', '*', { status: 'active' });

// 데이터 삽입
const result = await insert('live_broadcasts', {
  title: '라이브 방송',
  // ...
});
```

## 환경변수 확인

### 프론트엔드 확인
```bash
cd frontend
cat .env | grep SUPABASE
```

### 백엔드 확인
```bash
cd backend
cat .env | grep SUPABASE
```

## 문제 해결

### 환경변수를 읽지 못하는 경우

1. **프론트엔드**
   - `.env` 파일이 `frontend/` 디렉토리에 있는지 확인
   - React 앱 재시작 필요 (`npm start`)

2. **백엔드**
   - `.env` 파일이 `backend/` 디렉토리에 있는지 확인
   - `dotenv` 패키지가 설치되어 있는지 확인
   - Node.js 서버 재시작 필요

### 키가 작동하지 않는 경우

1. **Supabase 대시보드에서 키 확인**
   - https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/settings/api
   - 키가 활성화되어 있는지 확인

2. **키 형식 확인**
   - Publishable Key: `sb_publishable_...` 형식
   - Anon Key: JWT 토큰 형식
   - Secret Key: `sb_...` 또는 JWT 형식

## 관련 문서

- [Supabase 설정 가이드](./SUPABASE_SETUP_GUIDE.md)
- [Supabase 스키마 설정](./SUPABASE_SCHEMA_STATUS.md)
- [Supabase 연결 상태](./SUPABASE_CONNECTION_STATUS.md)

