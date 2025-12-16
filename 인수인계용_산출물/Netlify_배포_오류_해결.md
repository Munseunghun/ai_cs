# Netlify 배포 오류 해결 가이드

**작성일**: 2025-12-16  
**프로젝트**: AI CS 시스템  
**담당**: AI Assistant

---

## ❌ 발생한 오류

```
Error message:
Command failed with exit code 1: 
cd frontend && npm install --legacy-peer-deps && npm run build

Error location:
In build.command from netlify.toml:
cd frontend && npm install --legacy-peer-deps && npm run build
```

---

## 🔍 문제 원인

### 1. 잘못된 빌드 명령어
Netlify 웹 UI에서 설정된 빌드 명령어가 잘못되었습니다:
```bash
# ❌ 잘못된 명령어 (Netlify UI에 설정됨)
cd frontend && npm install --legacy-peer-deps && npm run build
```

### 2. 프로젝트 구조
```
/Users/amore/ai_cs 시스템/
├── frontend/              # ← 이 폴더가 Base directory
│   ├── netlify.toml      # ← 설정 파일 위치
│   ├── package.json
│   ├── build/
│   └── src/
└── backend/
```

---

## ✅ 해결 방법

### 방법 1: Netlify 웹 UI에서 설정 수정 (권장)

#### 1단계: Netlify 대시보드 접속
```
https://app.netlify.com
```

#### 2단계: 사이트 선택
- 배포 중인 사이트 클릭

#### 3단계: Site settings 이동
- "Site settings" 클릭
- "Build & deploy" 메뉴 클릭
- "Build settings" 섹션 찾기

#### 4단계: 빌드 설정 수정
**Base directory**:
```
frontend
```

**Build command**:
```
npm install --legacy-peer-deps && npm run build
```

**Publish directory**:
```
build
```

**Environment variables** (선택):
```
NODE_VERSION=18
CI=false
```

#### 5단계: 저장 및 재배포
- "Save" 클릭
- "Deploys" 탭으로 이동
- "Trigger deploy" → "Deploy site" 클릭

---

### 방법 2: netlify.toml 파일 수정

현재 `frontend/netlify.toml` 파일에 Base directory 설정이 없습니다. 추가하겠습니다:

```toml
[build]
  # Base directory (프로젝트 루트 기준)
  base = "frontend"
  
  # 빌드 명령어
  command = "npm install --legacy-peer-deps && npm run build"
  
  # 배포할 디렉토리
  publish = "build"
  
  # Node.js 버전
  environment = { NODE_VERSION = "18", CI = "false" }
```

---

### 방법 3: 프로젝트 구조 변경 (비권장)

만약 위 방법들이 작동하지 않으면, 저장소 루트를 `frontend` 폴더로 변경:

```bash
# GitHub 저장소 설정에서
# Repository root: /frontend
```

---

## 🔧 올바른 설정

### Netlify 사이트 설정 (최종)

| 항목 | 값 |
|------|-----|
| **Base directory** | `frontend` |
| **Build command** | `npm install --legacy-peer-deps && npm run build` |
| **Publish directory** | `build` |
| **Node version** | `18` |

### 환경 변수 (Environment variables)

| 키 | 값 |
|----|-----|
| `NODE_VERSION` | `18` |
| `CI` | `false` |
| `REACT_APP_API_URL` | `https://ai-cs-backend.onrender.com` |
| `REACT_APP_SUPABASE_URL` | `https://uewhvekfjjvxoioklzza.supabase.co` |
| `REACT_APP_SUPABASE_ANON_KEY` | `your_key_here` |

---

## 📝 단계별 해결 가이드

### Step 1: Netlify 설정 확인

1. Netlify 대시보드 접속
2. 사이트 선택
3. "Site settings" 클릭
4. "Build & deploy" 클릭
5. 현재 설정 확인:
   ```
   Base directory: ___________
   Build command: ___________
   Publish directory: ___________
   ```

### Step 2: 설정 수정

**올바른 설정으로 변경**:
```
Base directory: frontend
Build command: npm install --legacy-peer-deps && npm run build
Publish directory: build
```

### Step 3: 재배포

1. "Deploys" 탭 이동
2. "Trigger deploy" 클릭
3. "Deploy site" 선택
4. 배포 로그 확인

### Step 4: 배포 성공 확인

배포 로그에서 다음 메시지 확인:
```
✅ Build succeeded
✅ Site is live
✅ https://your-site.netlify.app
```

---

## 🐛 추가 트러블슈팅

### 문제 1: npm install 실패

**증상**:
```
npm ERR! peer dependency conflict
```

**해결**:
```bash
# Build command에 --legacy-peer-deps 추가
npm install --legacy-peer-deps && npm run build
```

### 문제 2: 빌드 시간 초과

**증상**:
```
Build exceeded maximum allowed runtime
```

**해결**:
```bash
# CI=false 추가하여 경고를 오류로 처리하지 않음
CI=false npm run build
```

또는 환경 변수에 추가:
```
CI=false
```

### 문제 3: 메모리 부족

**증상**:
```
JavaScript heap out of memory
```

**해결**:
```bash
# Build command 수정
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### 문제 4: Base directory 오류

**증상**:
```
Could not find package.json
```

**해결**:
- Base directory를 `frontend`로 설정
- 또는 netlify.toml에 `base = "frontend"` 추가

---

## ✅ 최종 확인 체크리스트

### Netlify 설정
- [ ] Base directory: `frontend`
- [ ] Build command: `npm install --legacy-peer-deps && npm run build`
- [ ] Publish directory: `build`
- [ ] Node version: `18`

### 환경 변수
- [ ] `NODE_VERSION=18`
- [ ] `CI=false`
- [ ] `REACT_APP_API_URL` 설정
- [ ] `REACT_APP_SUPABASE_URL` 설정
- [ ] `REACT_APP_SUPABASE_ANON_KEY` 설정

### 파일 확인
- [ ] `frontend/netlify.toml` 존재
- [ ] `frontend/package.json` 존재
- [ ] `frontend/build/` 폴더 생성 가능

---

## 🚀 성공적인 배포 로그 예시

```
3:20:15 PM: Build ready to start
3:20:17 PM: build-image version: 12345
3:20:17 PM: buildbot version: abcdef
3:20:17 PM: Building without cache
3:20:17 PM: Starting to prepare the repo for build
3:20:18 PM: Detected base directory: frontend
3:20:18 PM: Starting build script
3:20:19 PM: Installing dependencies
3:20:19 PM: Python version set to 3.8
3:20:20 PM: Started restoring cached Node.js version
3:20:22 PM: Finished restoring cached Node.js version
3:20:23 PM: v18.0.0 is already installed
3:20:24 PM: Now using node v18.0.0
3:20:24 PM: Started restoring cached build plugins
3:20:24 PM: Finished restoring cached build plugins
3:20:25 PM: Installing npm packages using npm version 8.6.0
3:20:45 PM: npm WARN using --force Recommended protections disabled
3:21:30 PM: added 1500 packages in 45s
3:21:30 PM: npm packages installed
3:21:31 PM: Creating an optimized production build...
3:23:45 PM: Compiled with warnings.
3:23:45 PM: File sizes after gzip:
3:23:45 PM:   500 KB  build/static/js/main.b9ec2057.js
3:23:45 PM:   50 KB   build/static/css/main.c543731b.css
3:23:46 PM: The build folder is ready to be deployed.
3:23:46 PM: Build script success
3:23:47 PM: Deploying to production
3:23:50 PM: Site is live ✨
3:23:50 PM: https://aics1.netlify.app
```

---

## 📞 추가 지원

### Netlify 공식 문서
- https://docs.netlify.com/configure-builds/overview/

### 문의
- Netlify Support: https://www.netlify.com/support/
- 프로젝트 담당자: Amore Pacific 개발팀

---

**작성 완료일**: 2025-12-16  
**최종 검토**: AI Assistant  
**문서 버전**: 1.0

---

**© 2025 Amore Pacific. All Rights Reserved.**

