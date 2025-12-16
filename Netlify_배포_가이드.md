# Netlify 배포 가이드

작성 일시: 2025-12-04 16:30

---

## ✅ GitHub 푸시 완료

Netlify 배포 설정 파일이 GitHub에 푸시되었습니다.

**GitHub 저장소**: https://github.com/Munseunghun/ai_cs

---

## 🚀 Netlify 배포 방법

### 방법 1: Netlify 웹 인터페이스에서 배포 (권장)

#### 1단계: Netlify에서 GitHub 연결

1. **Netlify 대시보드 접속**
   - 현재 프로젝트: https://app.netlify.com/sites/aics1/overview
   - 또는 새 사이트 생성: https://app.netlify.com

2. **Site settings → Build & deploy → Configure**
   - "Link site to Git" 클릭
   - GitHub 선택
   - 저장소 선택: `Munseunghun/ai_cs`
   - 브랜치 선택: `main`

3. **빌드 설정 확인**
   
   Netlify가 `netlify.toml` 파일을 자동으로 감지합니다:
   
   ```toml
   Build command: cd frontend && npm install && npm run build
   Publish directory: frontend/build
   ```
   
   **수동 설정이 필요한 경우**:
   - Base directory: (비워두기)
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/build`

#### 2단계: 환경 변수 설정

**Site settings → Environment variables** 에서 다음 변수들을 추가:

```env
REACT_APP_SUPABASE_URL=https://uewhvekfjjvxoioklzza.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVld2h2ZWtmamp2eG9pb2tsenphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDI5NDYsImV4cCI6MjA3OTkxODk0Nn0.bMLOKKMLyz7VEr3B8IMo-upyZ4rzvzm3NSZYLfkYU3I
REACT_APP_API_URL=http://localhost:3001
REACT_APP_FIREBASE_API_KEY=AIzaSyDq11o7vR0PNiMm7gutKPQGlmFOCvcNtis
REACT_APP_FIREBASE_AUTH_DOMAIN=ai-cs-bf933.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=ai-cs-bf933
REACT_APP_FIREBASE_STORAGE_BUCKET=ai-cs-bf933.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=209696960764
REACT_APP_FIREBASE_APP_ID=1:209696960764:web:cbdb5dbb11bf3da4cd6779
REACT_APP_SUPABASE_PUBLISHABLE_KEY=sb_publishable_CLrBJ-Hxb7h3sKNUgW08Zg_M6UFo1kN
```

**⚠️ 중요**: 백엔드 배포 후 `REACT_APP_API_URL`을 업데이트해야 합니다!

#### 3단계: 배포 트리거

1. **"Deploy site"** 또는 **"Trigger deploy"** 클릭
2. 빌드 로그 확인
3. 배포 완료 대기 (약 3-5분)

#### 4단계: 배포 확인

- **배포 URL**: `https://aics1.netlify.app` (또는 자동 생성된 URL)
- **커스텀 도메인 설정 가능**: Site settings → Domain management

---

### 방법 2: Netlify CLI로 배포

#### 설치

```bash
npm install -g netlify-cli
```

#### 로그인

```bash
netlify login
```

#### 사이트 연결

```bash
cd "/Users/amore/ai_cs 시스템"
netlify link
```

프롬프트에서 기존 사이트 `aics1` 선택

#### 배포

```bash
# 프로덕션 배포
netlify deploy --prod

# 또는 빌드 후 배포
cd frontend
npm run build
cd ..
netlify deploy --prod --dir=frontend/build
```

---

## 📋 netlify.toml 설정 상세

생성된 `netlify.toml` 파일:

```toml
# Netlify 배포 설정
[build]
  # 빌드 명령어
  command = "cd frontend && npm install && npm run build"
  
  # 배포할 디렉토리
  publish = "frontend/build"
  
  # Node.js 버전
  [build.environment]
    NODE_VERSION = "18"

# SPA 라우팅 설정 (React Router 지원)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# 헤더 설정 (캐싱 최적화)
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "no-cache"
```

### 주요 설정 설명

1. **빌드 설정**
   - `command`: 프론트엔드 빌드 명령어
   - `publish`: 빌드 결과물 디렉토리
   - `NODE_VERSION`: Node.js 18 사용

2. **리다이렉트**
   - SPA 라우팅 지원 (모든 경로를 index.html로)
   - React Router가 정상 작동

3. **캐싱 헤더**
   - 정적 파일: 1년 캐싱
   - index.html: 캐싱 없음 (항상 최신 버전)

---

## 🔄 자동 배포 설정

### GitHub 연동 후 자동 배포

Netlify가 GitHub과 연동되면:

1. **main 브랜치에 푸시**할 때마다 자동 배포
2. **Pull Request**마다 프리뷰 배포 생성
3. **빌드 상태**를 GitHub에 자동 보고

### 배포 트리거

```bash
# 코드 변경 후
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main

# Netlify가 자동으로 감지하고 배포 시작
```

---

## 🌐 배포 URL

### 기본 URL

- **Netlify 기본 도메인**: `https://aics1.netlify.app`
- **자동 생성 도메인**: `https://[random-name].netlify.app`

### 커스텀 도메인 설정

1. **Site settings → Domain management**
2. **"Add custom domain"** 클릭
3. 도메인 입력 및 DNS 설정
4. SSL 인증서 자동 발급

---

## 🔧 환경별 배포

### 프로덕션 배포

```bash
git push origin main
# 자동으로 https://aics1.netlify.app 에 배포
```

### 프리뷰 배포 (Pull Request)

```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
# GitHub에서 PR 생성
# Netlify가 자동으로 프리뷰 URL 생성
```

### 브랜치 배포

**Site settings → Build & deploy → Deploy contexts**에서 설정:
- Production branch: `main`
- Branch deploys: `develop`, `staging` 등

---

## 📊 빌드 로그 확인

### Netlify 대시보드

1. **Deploys** 탭 클릭
2. 최신 배포 선택
3. **Deploy log** 확인

### 일반적인 빌드 단계

```
1. Cloning repository
2. Installing dependencies (npm install)
3. Building site (npm run build)
4. Optimizing files
5. Deploying to CDN
6. Site is live!
```

---

## ⚠️ 주의사항

### 1. 백엔드 API URL 업데이트 필요

현재 `REACT_APP_API_URL=http://localhost:3001`로 설정되어 있습니다.

**백엔드 배포 후 업데이트**:

1. 백엔드를 Render/Railway/Heroku 등에 배포
2. 백엔드 URL 획득 (예: `https://your-backend.onrender.com`)
3. Netlify 환경 변수 업데이트:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com
   ```
4. 재배포 트리거

### 2. CORS 설정

백엔드에서 Netlify 도메인 허용 필요:

```javascript
// backend/src/server.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://aics1.netlify.app',
    'https://ai-cs-bf933.web.app'
  ],
  credentials: true
}));
```

### 3. 빌드 시간

- 첫 배포: 5-10분
- 이후 배포: 3-5분
- 캐시 활용으로 점점 빨라짐

---

## 🐛 트러블슈팅

### 빌드 실패

**문제**: `npm install` 또는 `npm run build` 실패

**해결**:
1. 로컬에서 빌드 테스트: `cd frontend && npm run build`
2. `package.json` 의존성 확인
3. Node.js 버전 확인 (netlify.toml에서 18 설정됨)

### 404 에러 (페이지를 찾을 수 없음)

**문제**: 라우팅이 작동하지 않음

**해결**:
- `netlify.toml`의 리다이렉트 설정 확인
- 이미 설정되어 있음: `/* → /index.html`

### 환경 변수 적용 안 됨

**문제**: `process.env.REACT_APP_*` 값이 undefined

**해결**:
1. Netlify 대시보드에서 환경 변수 확인
2. 변수명이 `REACT_APP_`로 시작하는지 확인
3. 재배포 트리거

### API 호출 실패

**문제**: 백엔드 연결 안 됨

**해결**:
1. 백엔드가 배포되어 있는지 확인
2. `REACT_APP_API_URL` 환경 변수 확인
3. 백엔드 CORS 설정 확인

---

## 📈 배포 후 모니터링

### Netlify Analytics (유료)

- 페이지뷰 추적
- 대역폭 사용량
- 성능 메트릭

### 무료 대안

- Google Analytics 통합
- Sentry 에러 추적
- LogRocket 세션 리플레이

---

## ✅ 배포 체크리스트

### 배포 전

- [x] `netlify.toml` 파일 생성
- [x] `.env.production` 파일 생성
- [x] GitHub에 푸시 완료
- [ ] Netlify에서 GitHub 저장소 연결
- [ ] 환경 변수 설정
- [ ] 배포 트리거

### 배포 후

- [ ] 배포 URL 접속 확인
- [ ] 모든 페이지 라우팅 테스트
- [ ] API 호출 테스트 (백엔드 배포 후)
- [ ] 반응형 디자인 확인
- [ ] 성능 테스트

---

## 🎯 다음 단계

### 1. Netlify에서 배포 완료

위의 **방법 1**을 따라 Netlify 웹 인터페이스에서 배포

### 2. 백엔드 배포

[백엔드_배포_가이드.md](./백엔드_배포_가이드.md) 참고

### 3. 환경 변수 업데이트

백엔드 URL로 `REACT_APP_API_URL` 업데이트

### 4. 재배포

환경 변수 변경 후 자동 재배포 또는 수동 트리거

---

## 🔗 유용한 링크

- **Netlify 대시보드**: https://app.netlify.com/sites/aics1/overview
- **배포 URL**: https://aics1.netlify.app (배포 후 확인)
- **GitHub 저장소**: https://github.com/Munseunghun/ai_cs
- **Netlify 문서**: https://docs.netlify.com

---

## 🎉 준비 완료!

GitHub에 Netlify 설정이 푸시되었습니다.

이제 Netlify 웹 인터페이스에서 GitHub 저장소를 연결하고 배포하세요!

**배포 URL**: https://aics1.netlify.app (배포 완료 후 접속 가능)
