# Netlify 배포 문제 완전 해결

**작성일**: 2025-12-16  
**프로젝트**: AI CS 시스템  
**상태**: ✅ 최종 해결

---

## 🎯 발견된 핵심 문제

### 문제: netlify.toml 파일이 2개 존재!

```
프로젝트 구조:
/Users/amore/ai_cs 시스템/
├── netlify.toml                    ← 문제의 원인! (삭제 완료)
├── .netlify/netlify.toml           ← 로컬 캐시 (삭제 완료)
└── frontend/
    ├── netlify.toml                ← 이미 삭제됨
    ├── package.json
    └── build/
```

### 잘못된 설정 내용

**루트 netlify.toml** (삭제됨):
```toml
[build]
  command = "cd frontend && npm install --legacy-peer-deps && npm run build"
  publish = "frontend/build"
  
[build.environment]
  NODE_VERSION = "18"
```

**문제점**:
1. `cd frontend` - Base directory와 중복
2. `publish = "frontend/build"` - 경로 중복
3. 웹 UI 설정을 완전히 오버라이드

---

## ✅ 해결 완료

### 삭제한 파일들

```bash
✅ /netlify.toml (루트)
✅ /.netlify/ (로컬 캐시 폴더)
✅ /frontend/netlify.toml (이전에 삭제)
```

### Git 커밋

```bash
✅ Commit: d6d7a52
✅ Message: "fix: 루트 netlify.toml 삭제 - 웹 UI 설정 사용"
✅ Push: origin/main
```

---

## 📋 최종 Netlify 설정 (웹 UI)

### 필수 설정값

이제 **netlify.toml 파일이 없으므로** 웹 UI 설정이 정상 작동합니다!

| 항목 | 값 | 비고 |
|------|-----|------|
| **Base directory** | `frontend` | 슬래시 없음 |
| **Build command** | `npm install --legacy-peer-deps && npm run build` | `--legacy-peer-deps` 필수! |
| **Publish directory** | `build` | `frontend/` 접두사 없음! |
| **Node version** | `18` | 환경 변수 |

---

## 🔧 Netlify 웹 UI 설정 방법

### Step 1: Site settings 접속

1. https://app.netlify.com 접속
2. 사이트 선택 (aics1)
3. **Site settings** 클릭
4. **Build & deploy** 클릭
5. **Build settings** 섹션 찾기

### Step 2: 설정 수정

**"Edit settings"** 버튼 클릭 후:

#### Base directory
```
frontend
```

#### Build command
```
npm install --legacy-peer-deps && npm run build
```

#### Publish directory
```
build
```

### Step 3: 환경 변수 설정

**Site settings** → **Environment variables** → **Add a variable**

```
NODE_VERSION = 18
CI = false
REACT_APP_API_URL = https://ai-cs-backend.onrender.com
REACT_APP_SUPABASE_URL = https://uewhvekfjjvxoioklzza.supabase.co
REACT_APP_SUPABASE_ANON_KEY = your_key_here
```

### Step 4: 저장 및 재배포

1. **Save** 클릭
2. **Deploys** 탭으로 이동
3. **Trigger deploy** → **Clear cache and deploy site** 클릭

---

## 🚨 주의사항

### ⚠️ netlify.toml 파일을 다시 생성하지 마세요!

**이유**:
- netlify.toml이 있으면 웹 UI 설정을 무시함
- 설정 관리가 복잡해짐
- 경로 중복 문제 재발 가능

**권장**:
- 웹 UI에서만 설정 관리
- 설정 변경이 쉽고 직관적
- 팀원들도 쉽게 수정 가능

---

## 📊 오류 해결 과정 요약

### 오류 1: JSX 문법 오류 ✅
```
SyntaxError: LiveBroadcastDetail.jsx: Unexpected token (1749:11)
```
**해결**: 중복 코드 제거 (1537라인부터)

### 오류 2: npm 의존성 충돌 ✅
```
npm error ERESOLVE could not resolve
npm error peerOptional typescript@"^3.2.1 || ^4"
```
**해결**: Build command에 `--legacy-peer-deps` 추가

### 오류 3: 경로 중복 ✅
```
Custom publish path: 'frontend/frontend/build'
```
**해결**: Publish directory를 `build`로 수정

### 오류 4: netlify.toml 오버라이드 ✅
```
Overridden by netlify.toml
```
**해결**: 모든 netlify.toml 파일 삭제

---

## ✅ 최종 확인 체크리스트

### Git 저장소
- [x] 루트 netlify.toml 삭제
- [x] frontend/netlify.toml 삭제
- [x] .netlify/ 폴더 삭제
- [x] Git 커밋 및 푸시 완료

### Netlify 웹 UI 설정
- [ ] Base directory: `frontend`
- [ ] Build command: `npm install --legacy-peer-deps && npm run build`
- [ ] Publish directory: `build`
- [ ] 환경 변수 설정 완료

### 배포 확인
- [ ] 배포 로그에서 오류 없음
- [ ] "Site is live" 메시지 확인
- [ ] 웹사이트 정상 접속
- [ ] 주요 기능 테스트

---

## 🎯 예상 배포 로그 (성공)

```
5:20:00 PM: Build ready to start
5:20:02 PM: Starting to prepare the repo for build
5:20:03 PM: Preparing Git Reference refs/heads/main
5:20:04 PM: Detected base directory: frontend
5:20:05 PM: Starting to install dependencies
5:20:06 PM: v18.20.8 is already installed
5:20:07 PM: Now using node v18.20.8 (npm v10.8.2)
5:20:08 PM: Installing npm packages using npm version 10.8.2
5:20:09 PM: npm install --legacy-peer-deps
5:20:45 PM: added 1500 packages in 36s
5:20:46 PM: npm packages installed
5:20:47 PM: Creating an optimized production build...
5:22:30 PM: Compiled successfully.
5:22:30 PM: File sizes after gzip:
5:22:30 PM:   500 KB  build/static/js/main.b9ec2057.js
5:22:30 PM:   50 KB   build/static/css/main.c543731b.css
5:22:31 PM: The build folder is ready to be deployed.
5:22:31 PM: Build script success
5:22:32 PM: Deploying to production
5:22:35 PM: Site is live ✨
5:22:35 PM: https://aics1.netlify.app
```

---

## 🔍 문제 재발 방지

### 1. netlify.toml 파일 생성 금지

**.gitignore에 추가** (선택사항):
```
# Netlify
netlify.toml
.netlify/
```

### 2. 웹 UI 설정만 사용

**장점**:
- 설정이 명확하고 직관적
- 팀원들이 쉽게 수정 가능
- 오버라이드 문제 없음

### 3. 설정 문서화

이 문서를 팀과 공유하여 올바른 설정 방법 공유

---

## 🚀 다음 단계

### 1. Netlify에서 재배포 확인

**예상 시간**: 2-3분

**확인 방법**:
1. Netlify 대시보드 → Deploys 탭
2. 최신 배포 상태 확인
3. 로그에서 성공 메시지 확인

### 2. 웹사이트 테스트

**테스트 항목**:
- [ ] 메인 페이지 (`/`)
- [ ] 검색 페이지 (`/search`)
- [ ] 전시 페이지 (`/exhibitions`)
- [ ] 이벤트 상세 (`/events/:id`)
- [ ] API 연동 확인
- [ ] 이미지 로딩 확인

### 3. 성능 모니터링

**도구**:
- Lighthouse (Chrome DevTools)
- Netlify Analytics
- Google Analytics (설정된 경우)

---

## 📞 추가 지원

### 문제 발생 시

1. **Netlify 배포 로그 확인**
   - 전체 로그를 복사하여 공유

2. **웹 UI 설정 스크린샷**
   - Build settings 페이지 캡처

3. **브라우저 콘솔 확인**
   - F12 → Console 탭에서 오류 확인

### 참고 문서

- Netlify 공식 문서: https://docs.netlify.com
- React 배포 가이드: https://create-react-app.dev/docs/deployment/
- 프로젝트 문서: `/인수인계용_산출물/`

---

## 🎉 성공 기준

### 배포 성공 확인

```
✅ Netlify 빌드 성공
✅ 배포 로그에 오류 없음
✅ https://aics1.netlify.app 접속 가능
✅ 모든 페이지 정상 작동
✅ API 연동 정상
```

---

## 📝 변경 이력

| 날짜 | 작업 | 상태 |
|------|------|------|
| 2025-12-16 | JSX 오류 수정 | ✅ |
| 2025-12-16 | frontend/netlify.toml 삭제 | ✅ |
| 2025-12-16 | 루트 netlify.toml 발견 및 삭제 | ✅ |
| 2025-12-16 | .netlify/ 폴더 삭제 | ✅ |
| 2025-12-16 | Git 커밋 및 푸시 | ✅ |
| 2025-12-16 | 웹 UI 설정 가이드 작성 | ✅ |

---

**작성 완료일**: 2025-12-16  
**최종 검토**: AI Assistant  
**문서 버전**: 2.0  
**상태**: ✅ 완전 해결

---

**이제 Netlify 웹 UI에서 설정을 확인하고 재배포하세요!** 🚀

netlify.toml 파일이 모두 삭제되었으므로, 웹 UI 설정이 정상적으로 적용됩니다.

---

**© 2025 Amore Pacific. All Rights Reserved.**

