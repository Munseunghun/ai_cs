# Render.com 백엔드 배포 가이드

작성 일시: 2025-12-04 17:00

---

## ✅ GitHub 푸시 완료

백엔드 배포 설정이 GitHub에 푸시되었습니다.

**GitHub 저장소**: https://github.com/Munseunghun/ai_cs

---

## 🚀 Render.com 배포 방법

### 1단계: Render 계정 생성 및 로그인

1. **Render 웹사이트 접속**
   - https://render.com

2. **GitHub 계정으로 로그인**
   - "Get Started" 또는 "Sign Up" 클릭
   - "Sign up with GitHub" 선택
   - GitHub 권한 승인

---

### 2단계: 새 Web Service 생성

1. **대시보드에서 "New +" 클릭**
   - https://dashboard.render.com

2. **"Web Service" 선택**

3. **GitHub 저장소 연결**
   - "Connect a repository" 섹션에서
   - `Munseunghun/ai_cs` 저장소 선택
   - "Connect" 클릭

---

### 3단계: 서비스 설정

#### 기본 설정

| 설정 항목 | 값 |
|---------|-----|
| **Name** | `ai-cs-backend` (또는 원하는 이름) |
| **Region** | `Oregon (US West)` (무료 티어) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

#### 고급 설정

**Auto-Deploy**: `Yes` (main 브랜치 푸시 시 자동 배포)

---

### 4단계: 환경 변수 설정

**Environment Variables** 섹션에서 다음 변수들을 추가:

```env
# Node.js 환경
NODE_ENV=production

# 서버 포트 (Render 자동 할당)
PORT=10000

# Supabase 설정
SUPABASE_URL=https://uewhvekfjjvxoioklzza.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVld2h2ZWtmamp2eG9pb2tsenphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDI5NDYsImV4cCI6MjA3OTkxODk0Nn0.bMLOKKMLyz7VEr3B8IMo-upyZ4rzvzm3NSZYLfkYU3I

# Redis (선택사항 - 무료 티어에서는 사용 안 함)
REDIS_URL=redis://localhost:6379
```

**⚠️ 중요**: 
- `PORT`는 Render가 자동으로 할당하므로 환경 변수로 설정하지 않아도 됩니다.
- Redis는 무료 티어에서 사용할 수 없으므로, 백엔드 코드에서 Redis 연결 실패 시 graceful하게 처리되도록 설정되어 있습니다.

---

### 5단계: 배포 시작

1. **"Create Web Service" 클릭**

2. **배포 진행 상황 확인**
   - 빌드 로그 실시간 확인
   - 약 3-5분 소요

3. **배포 완료 확인**
   - 상태가 "Live"로 변경
   - URL 자동 생성: `https://ai-cs-backend.onrender.com`

---

## 📋 배포된 백엔드 설정

### render.yaml

```yaml
services:
  - type: web
    name: ai-cs-backend
    runtime: node
    env: node
    region: oregon
    plan: free
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_ANON_KEY
        sync: false
    healthCheckPath: /health
```

### CORS 설정

백엔드 서버에서 다음 도메인들을 허용하도록 설정되었습니다:

```javascript
origin: [
  'http://localhost:3000',  // 로컬 개발
  'https://ai-cs-bf933.web.app',  // Firebase
  'https://aics1.netlify.app',  // Netlify
  'https://693277d3cf8c8519f9294182--aics1.netlify.app'  // Netlify 프리뷰
]
```

---

## 🌐 배포 후 URL

### 백엔드 API URL

**기본 형식**: `https://[your-service-name].onrender.com`

**예시**: `https://ai-cs-backend.onrender.com`

### API 엔드포인트

- **Health Check**: `https://ai-cs-backend.onrender.com/health`
- **Dashboard**: `https://ai-cs-backend.onrender.com/api/dashboard`
- **Events**: `https://ai-cs-backend.onrender.com/api/events/search`
- **Live Detail**: `https://ai-cs-backend.onrender.com/api/events/:id`

---

## 🔄 프론트엔드 환경 변수 업데이트

### Netlify 환경 변수 업데이트

1. **Netlify 대시보드 접속**
   - https://app.netlify.com/sites/aics1/configuration/env

2. **환경 변수 수정**
   - `REACT_APP_API_URL` 찾기
   - 값을 백엔드 URL로 변경:
   ```
   REACT_APP_API_URL=https://ai-cs-backend.onrender.com
   ```

3. **재배포 트리거**
   - "Deploys" 탭으로 이동
   - "Trigger deploy" → "Deploy site" 클릭

### 로컬 프론트엔드 환경 변수

**파일**: `frontend/.env.production`

```env
REACT_APP_API_URL=https://ai-cs-backend.onrender.com
```

---

## 📊 배포 모니터링

### Render 대시보드

**서비스 대시보드**: https://dashboard.render.com/web/[your-service-id]

**주요 메뉴**:
- **Logs**: 실시간 로그 확인
- **Metrics**: CPU, 메모리, 네트워크 사용량
- **Events**: 배포 이력
- **Settings**: 서비스 설정

### Health Check

```bash
# 백엔드 상태 확인
curl https://ai-cs-backend.onrender.com/health

# 응답 예시
{
  "success": true,
  "message": "서버가 정상 작동 중입니다",
  "timestamp": "2025-12-04T08:00:00.000Z",
  "uptime": 3600,
  "database": "connected",
  "redis": "disconnected"
}
```

---

## ⚠️ 무료 티어 제한사항

### Render 무료 티어

1. **자동 슬립 모드**
   - 15분간 요청이 없으면 자동으로 슬립 모드 진입
   - 첫 요청 시 약 30초-1분 소요 (콜드 스타트)

2. **월 750시간 제한**
   - 한 달에 750시간 무료 사용 가능
   - 여러 서비스를 운영하면 시간 분배

3. **성능 제한**
   - 0.5 CPU
   - 512 MB RAM

4. **Redis 미지원**
   - 무료 티어에서는 외부 Redis 연결 필요
   - 현재 백엔드는 Redis 없이도 작동하도록 설정됨

### 해결 방법

**슬립 모드 방지** (선택사항):
- Uptime Robot (https://uptimerobot.com) 사용
- 5분마다 health check 요청 전송
- 무료로 서비스 유지

---

## 🔧 문제 해결

### 배포 실패

**문제**: 빌드 또는 시작 실패

**해결**:
1. Render 로그 확인
2. 로컬에서 테스트:
   ```bash
   cd backend
   npm install
   npm start
   ```
3. 환경 변수 확인

### 데이터베이스 연결 실패

**문제**: Supabase 연결 안 됨

**해결**:
1. `SUPABASE_URL` 환경 변수 확인
2. `SUPABASE_ANON_KEY` 환경 변수 확인
3. Supabase 프로젝트 상태 확인

### CORS 에러

**문제**: 프론트엔드에서 API 호출 시 CORS 에러

**해결**:
1. 백엔드 CORS 설정 확인
2. 프론트엔드 도메인이 허용 목록에 있는지 확인
3. 재배포

### 느린 응답 (콜드 스타트)

**문제**: 첫 요청이 매우 느림

**해결**:
1. 무료 티어의 정상적인 동작
2. Uptime Robot으로 슬립 모드 방지
3. 유료 플랜 고려 (항상 활성 상태)

---

## 🎯 배포 후 테스트

### 1. Health Check

```bash
curl https://ai-cs-backend.onrender.com/health
```

### 2. Dashboard API

```bash
curl https://ai-cs-backend.onrender.com/api/dashboard
```

### 3. Events API

```bash
curl https://ai-cs-backend.onrender.com/api/events/search?platform=NAVER
```

### 4. 프론트엔드 연동 테스트

1. Netlify 사이트 접속: https://aics1.netlify.app
2. 대시보드 데이터 로드 확인
3. 이벤트 검색 기능 테스트
4. 라이브 상세 조회 테스트

---

## 📈 성능 최적화

### 캐싱 전략

백엔드에 Redis 캐싱이 구현되어 있지만, 무료 티어에서는 사용할 수 없습니다.

**대안**:
1. **Upstash Redis** (무료 티어)
   - https://upstash.com
   - 10,000 commands/day 무료
   - Render와 연동 가능

2. **메모리 캐싱**
   - Node.js 내장 캐싱 사용
   - 서버 재시작 시 캐시 초기화

### 데이터베이스 최적화

1. **Supabase 인덱스 확인**
2. **쿼리 최적화**
3. **페이지네이션 적용**

---

## 🔄 자동 배포

### GitHub 연동

Render가 GitHub 저장소와 연결되어 있습니다.

**자동 배포 트리거**:
- `main` 브랜치에 푸시할 때마다 자동 배포
- 배포 상태를 GitHub에 자동 보고

### 수동 배포

Render 대시보드에서:
1. "Manual Deploy" 클릭
2. 브랜치 선택
3. "Deploy" 클릭

---

## 💰 비용 및 업그레이드

### 무료 티어

- **비용**: $0/월
- **제한**: 슬립 모드, 750시간/월
- **적합**: 개발, 테스트, 소규모 프로젝트

### Starter 플랜

- **비용**: $7/월
- **혜택**: 
  - 항상 활성 상태 (슬립 모드 없음)
  - 더 빠른 성능
  - 무제한 시간

### Standard 플랜

- **비용**: $25/월
- **혜택**:
  - 더 많은 리소스
  - 우선 지원
  - 고급 기능

---

## ✅ 배포 체크리스트

### Render 배포

- [ ] Render 계정 생성
- [ ] GitHub 저장소 연결
- [ ] 서비스 설정 (Name, Region, Branch)
- [ ] 빌드/시작 명령어 설정
- [ ] 환경 변수 설정
- [ ] 배포 시작
- [ ] 배포 완료 확인
- [ ] Health Check 테스트

### 프론트엔드 업데이트

- [ ] Netlify 환경 변수 업데이트 (REACT_APP_API_URL)
- [ ] Netlify 재배포
- [ ] 프론트엔드 API 연동 테스트

### 전체 시스템 테스트

- [ ] 대시보드 데이터 로드
- [ ] 이벤트 검색 기능
- [ ] 라이브 상세 조회
- [ ] 다른 PC/모바일에서 접속 테스트

---

## 🎉 다음 단계

### 1. Render에서 백엔드 배포

위의 단계를 따라 Render.com에서 백엔드를 배포하세요.

### 2. 백엔드 URL 획득

배포 완료 후 Render가 제공하는 URL을 복사하세요.

예시: `https://ai-cs-backend.onrender.com`

### 3. Netlify 환경 변수 업데이트

```
REACT_APP_API_URL=https://ai-cs-backend.onrender.com
```

### 4. 전체 시스템 테스트

모든 기능이 정상 작동하는지 확인하세요.

---

## 🔗 유용한 링크

- **Render 대시보드**: https://dashboard.render.com
- **Render 문서**: https://render.com/docs
- **GitHub 저장소**: https://github.com/Munseunghun/ai_cs
- **Netlify 사이트**: https://aics1.netlify.app
- **Upstash Redis**: https://upstash.com (선택사항)
- **Uptime Robot**: https://uptimerobot.com (선택사항)

---

## 📞 참고 문서

- [백엔드_배포_가이드.md](./백엔드_배포_가이드.md) - 일반 백엔드 배포 가이드
- [Netlify_배포_완료.md](./Netlify_배포_완료.md) - 프론트엔드 배포 내역
- [GitHub_배포_완료.md](./GitHub_배포_완료.md) - GitHub 배포 내역
