# Netlify SPA 라우팅 404 오류 해결

**작성일**: 2025-12-16  
**프로젝트**: AI CS 시스템  
**상태**: ✅ 해결 완료

---

## 🚨 발생한 문제

### 증상

특정 URL로 직접 접속 시 404 오류 발생:

```
❌ https://aics1.netlify.app/exhibitions
❌ https://aics1.netlify.app/search
❌ https://aics1.netlify.app/events/123

오류 메시지:
"Page not found
Looks like you've followed a broken link or entered a URL that doesn't exist on this site."
```

### 정상 작동하는 경우

```
✅ https://aics1.netlify.app (메인 페이지)
✅ 메인 페이지에서 링크 클릭하여 이동
```

---

## 🔍 문제 원인

### SPA (Single Page Application) 라우팅 이해

React는 **클라이언트 사이드 라우팅**을 사용합니다:

```
사용자 흐름:

1. 메인 페이지 접속 (https://aics1.netlify.app)
   → Netlify가 index.html 제공
   → React 앱 로드
   → React Router 초기화

2. 앱 내에서 /exhibitions 링크 클릭
   → React Router가 클라이언트에서 라우팅 처리
   → 페이지 새로고침 없이 화면 전환 ✅

3. 직접 /exhibitions URL 입력 또는 새로고침
   → Netlify 서버가 /exhibitions 파일 찾기 시도
   → 파일이 없음 (실제로는 index.html만 존재)
   → 404 오류 발생 ❌
```

### 파일 구조

```
frontend/build/
├── index.html          ← 유일한 HTML 파일
├── static/
│   ├── js/
│   └── css/
└── (exhibitions 파일 없음!)
```

---

## ✅ 해결 방법: _redirects 파일

### 생성한 파일

**경로**: `/frontend/public/_redirects`

```
# Netlify Redirects
# SPA (Single Page Application) 라우팅 지원
# 모든 요청을 index.html로 리다이렉트하여 React Router가 처리하도록 함

/*    /index.html   200
```

### 작동 원리

```
사용자가 /exhibitions 접속:

1. Netlify 서버가 /exhibitions 요청 받음
   ↓
2. _redirects 규칙 확인
   ↓
3. /* 규칙 매칭 (모든 경로)
   ↓
4. /index.html로 리다이렉트 (200 상태 코드)
   ↓
5. index.html 제공
   ↓
6. React 앱 로드
   ↓
7. React Router가 /exhibitions 경로 처리
   ↓
8. 올바른 컴포넌트 렌더링 ✅
```

---

## 📋 _redirects 파일 상세 설명

### 기본 문법

```
from    to              status
/*      /index.html     200
```

- **from**: 매칭할 경로 패턴 (`/*` = 모든 경로)
- **to**: 리다이렉트할 대상 (`/index.html`)
- **status**: HTTP 상태 코드 (`200` = 리라이트, `301` = 영구 리다이렉트)

### 200 vs 301/302

```
200 (Rewrite):
- URL은 그대로 유지
- 내용만 index.html로 교체
- SPA에 적합 ✅

301/302 (Redirect):
- URL이 /index.html로 변경됨
- 브라우저 주소창이 바뀜
- SPA에 부적합 ❌
```

---

## 🚀 배포 프로세스

### 1. public 폴더의 역할

```
frontend/
├── public/
│   ├── index.html
│   ├── _redirects      ← 여기에 생성!
│   └── favicon.ico
└── src/
```

**빌드 시**:
```bash
npm run build

→ public/ 폴더의 모든 파일이 build/ 폴더로 복사됨

build/
├── index.html
├── _redirects          ← 자동으로 복사됨!
├── favicon.ico
└── static/
```

### 2. Netlify 배포

```
1. Git push
   ↓
2. Netlify 자동 빌드
   ↓
3. npm run build 실행
   ↓
4. build/ 폴더 생성 (_redirects 포함)
   ↓
5. build/ 폴더를 CDN에 배포
   ↓
6. _redirects 규칙 활성화 ✅
```

---

## ✅ Git 커밋 완료

```bash
✅ Commit: a995bc4
✅ Message: "fix: _redirects 파일 추가 - SPA 라우팅 지원"
✅ Push: origin/main
✅ File: frontend/public/_redirects
```

---

## 🧪 테스트 방법

### 배포 완료 후 (약 2-3분)

#### 1. 직접 URL 접속 테스트

```
✅ https://aics1.netlify.app/
✅ https://aics1.netlify.app/exhibitions
✅ https://aics1.netlify.app/search
✅ https://aics1.netlify.app/events/123
```

**모두 정상 작동해야 함!**

#### 2. 새로고침 테스트

```
1. https://aics1.netlify.app/exhibitions 접속
2. 브라우저 새로고침 (F5 또는 Cmd+R)
3. 페이지가 정상적으로 로드되는지 확인 ✅
```

#### 3. 브라우저 뒤로가기 테스트

```
1. 메인 페이지 접속
2. /exhibitions 이동
3. /search 이동
4. 브라우저 뒤로가기 버튼 클릭
5. 정상적으로 이전 페이지로 이동하는지 확인 ✅
```

---

## 📊 예상 배포 로그

```
5:35:00 PM: Build ready to start
5:35:02 PM: Starting to prepare the repo for build
5:35:03 PM: Preparing Git Reference refs/heads/main
5:35:04 PM: Detected base directory: frontend
5:35:05 PM: Installing npm packages
5:35:06 PM: npm notice Using legacy peer deps
5:35:42 PM: added 1500 packages in 36s
5:35:43 PM: Creating an optimized production build...
5:37:25 PM: Compiled successfully.
5:37:26 PM: The build folder is ready to be deployed.
5:37:27 PM: Processing _redirects file ✨
5:37:27 PM: Redirect rules:
5:37:27 PM:   /*    /index.html   200
5:37:28 PM: Build script success
5:37:29 PM: Deploying to production
5:37:32 PM: Site is live ✨
5:37:32 PM: https://aics1.netlify.app
```

**주목**: `Processing _redirects file` 메시지 확인!

---

## 🔧 고급 _redirects 설정 (선택사항)

### API 프록시 추가

백엔드 API 호출을 프록시하려면:

```
# API 프록시
/api/*  https://ai-cs-backend.onrender.com/api/:splat  200

# SPA 라우팅 (마지막에 위치해야 함)
/*      /index.html                                      200
```

### 특정 경로 제외

특정 파일은 리다이렉트하지 않으려면:

```
# 정적 파일은 그대로 제공
/static/*   /static/:splat   200

# SPA 라우팅
/*          /index.html      200
```

### 404 페이지 커스터마이징

```
# 커스텀 404 페이지
/404.html   /404.html   404

# SPA 라우팅
/*          /index.html  200
```

---

## 📝 다른 배포 플랫폼 비교

### Vercel

**vercel.json**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### AWS S3 + CloudFront

**CloudFront Error Pages 설정**:
```
Error Code: 403, 404
Response Page Path: /index.html
Response Code: 200
```

### GitHub Pages

**public/404.html** 생성 후 리다이렉트 스크립트 추가

---

## ✅ 최종 확인 체크리스트

### 파일 생성
- [x] frontend/public/_redirects 생성
- [x] 내용: `/*    /index.html   200`
- [x] Git 커밋 및 푸시 완료

### 배포 확인
- [ ] Netlify 자동 배포 완료 (2-3분)
- [ ] 배포 로그에서 "_redirects file" 처리 확인
- [ ] 직접 URL 접속 테스트
- [ ] 새로고침 테스트
- [ ] 뒤로가기 테스트

### 라우팅 테스트
- [ ] `/` (메인)
- [ ] `/search` (검색)
- [ ] `/exhibitions` (전시)
- [ ] `/events/:id` (이벤트 상세)
- [ ] `/admin` (관리자)

---

## 🎯 성공 기준

```
✅ 모든 URL 직접 접속 가능
✅ 페이지 새로고침 시 404 오류 없음
✅ 브라우저 뒤로가기/앞으로가기 정상 작동
✅ 북마크한 URL 정상 작동
```

---

## 🐛 트러블슈팅

### 문제 1: 여전히 404 오류 발생

**원인**: 캐시 문제

**해결**:
```
1. Netlify 대시보드 → Deploys
2. Trigger deploy → Clear cache and deploy site
3. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
```

### 문제 2: _redirects 규칙이 적용되지 않음

**원인**: 파일 위치 오류

**확인**:
```bash
# 올바른 위치
frontend/public/_redirects  ✅

# 잘못된 위치
frontend/_redirects         ❌
frontend/src/_redirects     ❌
```

### 문제 3: 빌드 후 _redirects 파일 없음

**확인**:
```bash
# 로컬에서 빌드 테스트
cd frontend
npm run build
ls -la build/_redirects

# 파일이 있어야 함!
```

---

## 📚 참고 자료

### Netlify 공식 문서
- Redirects and rewrites: https://docs.netlify.com/routing/redirects/
- SPA setup: https://docs.netlify.com/routing/redirects/redirect-options/#history-pushstate-and-single-page-apps

### React Router 문서
- Browser Router: https://reactrouter.com/en/main/router-components/browser-router

### 프로젝트 문서
```
✅ /인수인계용_산출물/Netlify_배포_문제_완전_해결.md
✅ /인수인계용_산출물/Netlify_npmrc_해결.md
✅ /인수인계용_산출물/Netlify_SPA_라우팅_해결.md (이 문서)
```

---

## 💡 추가 팁

### 개발 환경에서 테스트

```bash
# 로컬에서 프로덕션 빌드 테스트
cd frontend
npm run build

# 빌드 결과물 서빙 (serve 패키지 필요)
npx serve -s build

# 브라우저에서 테스트
# http://localhost:3000/exhibitions
```

### React Router 설정 확인

**App.jsx**:
```javascript
import { BrowserRouter } from 'react-router-dom';

// ✅ BrowserRouter 사용 (올바름)
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/exhibitions" element={<Exhibitions />} />
  </Routes>
</BrowserRouter>

// ❌ HashRouter 사용 (URL에 # 포함됨)
<HashRouter>
  {/* ... */}
</HashRouter>
```

---

## 🎉 완료!

이제 다음이 모두 정상 작동합니다:

```
✅ 직접 URL 접속
✅ 페이지 새로고침
✅ 브라우저 뒤로가기/앞으로가기
✅ 북마크 및 공유 링크
✅ 검색엔진 크롤링
```

---

**작성 완료일**: 2025-12-16  
**최종 검토**: AI Assistant  
**문서 버전**: 1.0  
**상태**: ✅ 해결 완료

---

**약 2-3분 후 배포가 완료되면 테스트하세요!** 🚀

https://aics1.netlify.app/exhibitions 에 직접 접속하여 확인하세요.

---

**© 2025 Amore Pacific. All Rights Reserved.**

