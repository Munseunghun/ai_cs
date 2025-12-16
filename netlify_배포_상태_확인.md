# Netlify 배포 상태 확인 및 수동 배포

**작성일**: 2025-12-16
**사이트**: https://aics1.netlify.app

---

## ✅ 현재 상태

### 최근 커밋 (자동 배포 트리거됨)
```
c22da2b - fix: Close unclosed Grid container tag in Dashboard (방금 전)
31b316a - fix: Add NAVER_SHOPPING platform to frontend (11:22)
474a0cf - feat: Add Naver Shopping exhibition page crawler (11:10)
```

### GitHub → Netlify 자동 배포
- ✅ GitHub에 푸시 완료
- ✅ Netlify가 자동으로 감지
- ⏳ 빌드 및 배포 진행 중
- ⏱️ 예상 완료 시간: 약 5분

---

## 🔍 배포 상태 확인 방법

### 방법 1: Netlify 대시보드 (웹)

**URL**: https://app.netlify.com/sites/aics1/deploys

**확인 사항**:
1. 최신 배포 상태 (Building / Published)
2. 배포 로그 확인
3. 에러 메시지 확인

**배포 단계**:
```
1. Building ⏳ (빌드 중)
   └─ npm install
   └─ npm run build
   
2. Deploying ⏳ (배포 중)
   └─ Uploading files
   └─ Processing
   
3. Published ✅ (완료)
   └─ Live at https://aics1.netlify.app
```

---

### 방법 2: Netlify CLI (터미널)

**설치** (아직 설치 안 된 경우):
```bash
npm install -g netlify-cli
```

**로그인**:
```bash
netlify login
```

**배포 상태 확인**:
```bash
cd "/Users/amore/ai_cs 시스템"
netlify status
```

**최근 배포 목록**:
```bash
netlify deploys:list
```

**특정 배포 상세 정보**:
```bash
netlify deploys:get <deploy-id>
```

---

### 방법 3: 사이트 직접 확인

**현재 배포 버전 확인**:
```bash
# 사이트 응답 확인
curl -I https://aics1.netlify.app

# ETag 확인 (변경되면 새 배포)
curl -I https://aics1.netlify.app | grep etag
```

**현재 ETag**: `"faa13cc1f835497ea4c2f4227731d994-ssl"`

**새 배포 후**: ETag가 변경됨

---

## 🚀 수동 배포 (필요한 경우)

### Netlify CLI로 수동 배포

**프로덕션 배포**:
```bash
cd "/Users/amore/ai_cs 시스템"
netlify deploy --prod
```

**배포 과정**:
1. 빌드 디렉토리 선택: `frontend/build`
2. 배포 확인
3. Live URL 확인

---

### GitHub Actions로 수동 트리거

**방법 1: GitHub 웹에서**
1. https://github.com/Munseunghun/ai_cs/actions
2. "Deploy to Netlify" 워크플로우 선택 (있는 경우)
3. "Run workflow" 클릭

**방법 2: 빈 커밋으로 트리거**
```bash
cd "/Users/amore/ai_cs 시스템"
git commit --allow-empty -m "chore: Trigger Netlify rebuild"
git push origin main
```

---

## 📊 배포 로그 확인

### Netlify 대시보드에서 로그 보기

**URL**: https://app.netlify.com/sites/aics1/deploys/[deploy-id]

**로그 섹션**:
1. **Build logs**: 빌드 과정 로그
2. **Deploy logs**: 배포 과정 로그
3. **Function logs**: 서버리스 함수 로그 (해당시)

---

### 빌드 성공 확인

**성공 메시지**:
```
✔ Build succeeded
✔ Deploy succeeded
✔ Site is live
```

**실패 메시지**:
```
✖ Build failed
✖ Error: ...
```

---

## 🔧 배포 실패 시 대응

### 1. 빌드 로그 확인

**Netlify 대시보드**:
- Deploy log에서 에러 메시지 확인
- 에러 라인 번호 확인

**일반적인 에러**:
- Syntax Error (문법 오류)
- Module not found (패키지 누락)
- Build script failed (빌드 스크립트 실패)

---

### 2. 로컬에서 빌드 테스트

```bash
cd "/Users/amore/ai_cs 시스템/frontend"

# 의존성 설치
npm install --legacy-peer-deps

# 빌드 테스트
npm run build

# 빌드 성공 확인
ls -la build/
```

**성공 시**:
```
build/
  ├── index.html
  ├── static/
  │   ├── css/
  │   └── js/
  └── ...
```

---

### 3. 에러 수정 후 재배포

```bash
# 에러 수정
# ... 코드 수정 ...

# Git 커밋
git add .
git commit -m "fix: Resolve build error"
git push origin main

# Netlify 자동 재배포 시작
```

---

## ✅ 배포 완료 확인

### 체크리스트

**1. Netlify 대시보드**:
- [ ] 배포 상태: Published
- [ ] 빌드 로그: 에러 없음
- [ ] Live URL: 정상 응답

**2. 사이트 접속**:
- [ ] https://aics1.netlify.app 접속
- [ ] 페이지 로드 정상
- [ ] Console 에러 없음

**3. 기능 테스트**:
- [ ] 대시보드 로드
- [ ] Live 방송 조회 페이지
- [ ] 플랫폼 드롭다운에 "네이버스마트스토어" 표시
- [ ] 검색 기능 동작

---

## 🎯 배포 후 작업

### 1. 캐시 초기화

**사용자에게 안내**:
```
브라우저 캐시를 초기화해주세요:
- Windows/Linux: Ctrl + Shift + R
- Mac: Cmd + Shift + R
```

**또는**:
```javascript
// 브라우저 Console에서 실행
localStorage.clear();
sessionStorage.clear();
location.reload();
```

---

### 2. 플랫폼 설정 확인

**Console에서 확인**:
```javascript
// 플랫폼 목록 확인
const platforms = JSON.parse(localStorage.getItem('admin_platforms') || '[]');
console.log('플랫폼 수:', platforms.length);

// NAVER_SHOPPING 확인
const naverShopping = platforms.find(p => p.code === 'NAVER_SHOPPING');
console.log('네이버스마트스토어:', naverShopping);
```

**예상 결과**:
```javascript
{
  id: 'NAVER_SHOPPING',
  code: 'NAVER_SHOPPING',
  name: '네이버스마트스토어',
  url: 'https://brand.naver.com',
  isActive: true
}
```

---

### 3. 검색 테스트

**테스트 시나리오**:
1. Live 방송 조회 페이지 이동
2. 플랫폼: "네이버스마트스토어" 선택
3. 브랜드: "아이오페" 선택
4. 검색 버튼 클릭

**예상 결과**:
```
┌─────────────────────────────────────────┐
│ 아이오페 XMD스템                         │
│ 네이버스마트스토어 | 아이오페             │
│ 2025-12-16                              │
│ [상세보기] 버튼                          │
└─────────────────────────────────────────┘
```

---

## 📈 배포 히스토리

### 최근 배포 (2025-12-16)

**1. 11:10** - 네이버 쇼핑 크롤러 추가
- 커밋: `474a0cf`
- 상태: ✅ 성공

**2. 11:22** - 프론트엔드 플랫폼 추가
- 커밋: `31b316a`
- 상태: ❌ 실패 (JSX 문법 오류)

**3. 11:30** - JSX 문법 오류 수정
- 커밋: `c22da2b`
- 상태: ⏳ 진행 중

---

## 🔗 유용한 링크

**Netlify**:
- 대시보드: https://app.netlify.com/sites/aics1
- 배포 목록: https://app.netlify.com/sites/aics1/deploys
- 설정: https://app.netlify.com/sites/aics1/settings

**GitHub**:
- 리포지토리: https://github.com/Munseunghun/ai_cs
- 커밋 히스토리: https://github.com/Munseunghun/ai_cs/commits/main

**사이트**:
- Live URL: https://aics1.netlify.app
- 대시보드: https://aics1.netlify.app/dashboard
- 검색: https://aics1.netlify.app/search

---

## 💡 팁

### 빠른 배포 확인
```bash
# 배포 상태 확인 (30초마다)
watch -n 30 'curl -I https://aics1.netlify.app | grep etag'
```

### 배포 알림 설정
- Netlify 대시보드 > Settings > Build & deploy > Deploy notifications
- Slack, Email, Webhook 등 설정 가능

### 배포 속도 향상
- Build 캐시 활성화 (이미 활성화됨)
- 불필요한 파일 제외 (`.gitignore` 활용)
- 의존성 최적화

---

**© 2025 Amore Pacific. All Rights Reserved.**
