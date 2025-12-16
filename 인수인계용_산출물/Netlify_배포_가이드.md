# Netlify 배포 가이드

**작성일**: 2025-12-16  
**프로젝트**: AI CS 시스템 프론트엔드  
**담당**: AI Assistant

---

## ✅ 문제 해결 완료

### 발생했던 오류
```
SyntaxError: /opt/build/repo/frontend/src/pages/LiveBroadcastDetail.jsx: 
Unexpected token (1749:11)
```

### 원인
- LiveBroadcastDetail.jsx 파일에 중복 코드가 있었음
- 1536번 줄 이후에 불필요한 코드가 추가되어 있었음

### 해결
- ✅ 1537번 줄 이후의 모든 중복 코드 제거
- ✅ 파일을 1536줄로 정리
- ✅ 빌드 성공 확인

---

## 🚀 Netlify 배포 방법

### 방법 1: Netlify CLI 사용 (권장)

#### 1단계: Netlify CLI 설치
```bash
npm install -g netlify-cli
```

#### 2단계: Netlify 로그인
```bash
netlify login
```

#### 3단계: 프로젝트 디렉토리로 이동
```bash
cd "/Users/amore/ai_cs 시스템"
```

#### 4단계: 배포
```bash
# 빌드 및 배포
netlify deploy --prod --dir=frontend/build

# 또는 자동 빌드 후 배포
cd frontend
npm run build
cd ..
netlify deploy --prod --dir=frontend/build
```

---

### 방법 2: Netlify 웹 UI 사용

#### 1단계: Netlify 사이트 접속
https://app.netlify.com

#### 2단계: 새 사이트 생성
1. "Add new site" 클릭
2. "Deploy manually" 선택

#### 3단계: 빌드 폴더 드래그 앤 드롭
```bash
# 로컬에서 빌드 먼저 실행
cd "/Users/amore/ai_cs 시스템/frontend"
npm run build
```

빌드 완료 후 `frontend/build` 폴더를 Netlify에 드래그 앤 드롭

---

### 방법 3: GitHub 연동 (자동 배포)

#### 1단계: GitHub 저장소 연결
1. Netlify에서 "Add new site" 클릭
2. "Import from Git" 선택
3. GitHub 저장소 선택

#### 2단계: 빌드 설정
```
Build command: cd frontend && npm install --legacy-peer-deps && npm run build
Publish directory: frontend/build
```

#### 3단계: 환경 변수 설정
Netlify 사이트 설정에서 환경 변수 추가:
```
REACT_APP_API_URL=https://ai-cs-backend.onrender.com
REACT_APP_SUPABASE_URL=https://uewhvekfjjvxoioklzza.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_key_here
```

---

## 📁 배포 파일 구조

### 현재 상태
```
/Users/amore/ai_cs 시스템/
├── frontend/
│   ├── build/                    # ✅ 빌드 완료
│   │   ├── index.html
│   │   ├── static/
│   │   │   ├── css/
│   │   │   └── js/
│   │   └── asset-manifest.json
│   ├── netlify.toml              # ✅ 배포 설정
│   ├── package.json
│   └── src/
│       └── pages/
│           ├── EventDetail.jsx   # ✅ 이벤트 상세 페이지
│           └── LiveBroadcastDetail.jsx  # ✅ 수정 완료
```

---

## ⚙️ netlify.toml 설정

### 현재 설정 파일
```toml
[build]
  command = "npm run build"
  publish = "build"
  environment = { NODE_VERSION = "18" }

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

---

## 🔧 빌드 확인

### 로컬 빌드 테스트
```bash
cd "/Users/amore/ai_cs 시스템/frontend"
npm run build
```

### 빌드 결과
```
✅ Compiled with warnings.
✅ Build folder: frontend/build
✅ File sizes after gzip:
   - main.b9ec2057.js: ~500 KB
   - main.c543731b.css: ~50 KB
```

### 경고 사항
- 일부 ESLint 경고가 있지만 빌드는 성공
- 프로덕션 배포에는 영향 없음

---

## 🌐 배포 후 확인 사항

### 1. 페이지 접근 확인
```
https://your-site-name.netlify.app
https://your-site-name.netlify.app/events/1
https://your-site-name.netlify.app/search
```

### 2. 라우팅 확인
- ✅ 홈 페이지 (/)
- ✅ 이벤트 검색 (/search)
- ✅ 이벤트 상세 (/events/:eventId)
- ✅ 라이브 상세 (/live/:liveId)
- ✅ 관리자 (/admin)

### 3. API 연동 확인
- 백엔드 API URL이 올바른지 확인
- CORS 설정 확인
- 환경 변수 확인

---

## 🐛 트러블슈팅

### 문제 1: 빌드 실패 (Syntax Error)
**해결**: ✅ 완료 (LiveBroadcastDetail.jsx 수정)

### 문제 2: 404 에러 (페이지 새로고침 시)
**원인**: SPA 라우팅 설정 누락

**해결**:
```toml
# netlify.toml에 추가
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 문제 3: API 연결 실패
**원인**: 환경 변수 미설정

**해결**:
```bash
# Netlify 환경 변수 설정
REACT_APP_API_URL=https://ai-cs-backend.onrender.com
```

### 문제 4: 빌드 시간 초과
**원인**: node_modules 설치 시간 오래 걸림

**해결**:
```bash
# package.json의 scripts 수정
"build": "CI=false react-scripts build"
```

---

## 📊 배포 상태 확인

### Netlify 대시보드
```
Site name: aics1 (또는 your-site-name)
URL: https://aics1.netlify.app
Status: Published
Last deploy: 2025-12-16
```

### 배포 로그 확인
1. Netlify 대시보드 접속
2. "Deploys" 탭 클릭
3. 최신 배포 로그 확인

---

## 🔄 재배포 방법

### 코드 수정 후 재배포

#### CLI 사용
```bash
cd "/Users/amore/ai_cs 시스템/frontend"
npm run build
cd ..
netlify deploy --prod --dir=frontend/build
```

#### GitHub 연동 시
```bash
git add .
git commit -m "Update: 이벤트 상세 페이지 추가"
git push origin main
# Netlify가 자동으로 재배포
```

---

## 📝 체크리스트

### 배포 전
- [x] LiveBroadcastDetail.jsx 수정 완료
- [x] 로컬 빌드 성공 확인
- [x] netlify.toml 설정 완료
- [x] 환경 변수 준비

### 배포 후
- [ ] 사이트 접속 확인
- [ ] 모든 페이지 라우팅 확인
- [ ] API 연동 확인
- [ ] 모바일 반응형 확인
- [ ] 성능 테스트

---

## 🎯 다음 단계

### 1. 도메인 연결 (선택)
```
Netlify 대시보드 > Domain settings > Add custom domain
```

### 2. HTTPS 설정
```
Netlify가 자동으로 Let's Encrypt SSL 인증서 발급
```

### 3. 성능 최적화
```
- 이미지 최적화
- 코드 스플리팅
- 캐싱 설정
```

---

## 📞 문의

배포 관련 문의사항은 Amore Pacific 개발팀으로 연락 주시기 바랍니다.

---

**작성 완료일**: 2025-12-16  
**최종 검토**: AI Assistant  
**문서 버전**: 1.0

---

**© 2025 Amore Pacific. All Rights Reserved.**

