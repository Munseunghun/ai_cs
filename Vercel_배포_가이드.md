# Vercel 배포 가이드

**작성일**: 2025년 12월 17일  
**목적**: Netlify 사용량 한도 초과 문제 해결

---

## 🚨 문제 상황

### Netlify 오류
```
Site not available
This site was paused as it reached its usage limits.
```

**원인**:
- Netlify 무료 플랜 월간 한도 초과
- 빌드 시간: 300분/월 초과
- 또는 대역폭: 100GB/월 초과

---

## ✅ 해결 방법: Vercel로 이전

### Vercel 장점
- ✅ 빌드 시간: **6,000분/월** (Netlify의 20배)
- ✅ 대역폭: **100GB/월** (동일)
- ✅ React 앱에 최적화
- ✅ 무료 플랜이 더 관대함
- ✅ GitHub 자동 배포

---

## 📋 배포 단계

### 1단계: Vercel 로그인

#### 방법 A: 웹 브라우저 (권장)
```bash
cd "/Users/amore/ai_cs 시스템"
vercel login
```

**실행 결과**:
```
Vercel CLI 23.x.x
> Log in to Vercel
> Opening https://vercel.com/login in your browser...
✓ Email confirmed
```

브라우저가 자동으로 열리면:
1. 이메일 또는 GitHub 계정으로 로그인
2. "Confirm" 버튼 클릭
3. 터미널로 돌아와서 확인

#### 방법 B: 이메일 인증
```bash
vercel login --email your-email@example.com
```

---

### 2단계: 프로젝트 배포

```bash
cd "/Users/amore/ai_cs 시스템"
vercel --prod
```

**질문에 답변**:
```
? Set up and deploy "~/ai_cs 시스템"? [Y/n] Y
? Which scope do you want to deploy to? [본인 계정 선택]
? Link to existing project? [N]
? What's your project's name? ai-cs
? In which directory is your code located? ./
? Want to override the settings? [N]
```

**배포 완료**:
```
✓ Production: https://ai-cs-xxxx.vercel.app [복사]
```

---

### 3단계: 환경 변수 설정

Vercel 대시보드에서 환경 변수 설정:

```
1. https://vercel.com/dashboard 접속
2. 프로젝트 선택: ai-cs
3. Settings > Environment Variables 클릭
4. 환경 변수 추가:
```

| Name | Value | Environment |
|------|-------|-------------|
| `REACT_APP_API_URL` | `https://ai-cs-backend.onrender.com/api` | Production |
| `NODE_VERSION` | `18.x` | Production |

---

### 4단계: 도메인 확인

배포가 완료되면 Vercel이 자동으로 도메인을 생성합니다:

```
Production URL: https://ai-cs-xxxx.vercel.app
```

이 URL로 접속하여 정상 작동 확인:
- ✅ 대시보드 로딩
- ✅ Live 방송 조회
- ✅ 입점몰 이벤트, 전시 조회
- ✅ 백엔드 API 연결

---

## 🔧 자동 배포 설정

### GitHub 연동 (자동 배포)

Vercel은 GitHub에 푸시할 때마다 자동으로 배포합니다:

```
1. GitHub에 코드 푸시
   git push origin main

2. Vercel이 자동으로 빌드 시작
   ✓ Building...
   ✓ Deploying...
   ✓ Ready!

3. 새 버전 자동 배포 완료
```

---

## 📊 Vercel vs Netlify 비교

| 항목 | Netlify (무료) | Vercel (무료) |
|------|---------------|--------------|
| 빌드 시간 | 300분/월 | **6,000분/월** ✅ |
| 대역폭 | 100GB/월 | 100GB/월 |
| 빌드 동시성 | 1 | 1 |
| 도메인 | ✅ | ✅ |
| HTTPS | ✅ | ✅ |
| GitHub 연동 | ✅ | ✅ |
| 환경 변수 | ✅ | ✅ |

---

## 🚀 배포 명령어 요약

### 초기 배포
```bash
cd "/Users/amore/ai_cs 시스템"
vercel login
vercel --prod
```

### 재배포 (코드 변경 후)
```bash
git add -A
git commit -m "변경 내용"
git push
# Vercel이 자동으로 배포
```

### 수동 재배포
```bash
cd "/Users/amore/ai_cs 시스템"
vercel --prod
```

---

## 🔍 배포 확인

### 1. 로컬 테스트
```bash
cd "/Users/amore/ai_cs 시스템/frontend"
npm install --legacy-peer-deps
npm start
```

### 2. 빌드 테스트
```bash
cd "/Users/amore/ai_cs 시스템/frontend"
npm run build
```

### 3. Vercel 배포 로그 확인
```bash
vercel logs
```

---

## 📝 트러블슈팅

### 문제 1: 빌드 실패
```
Error: Command "npm run build" exited with 1
```

**해결**:
```bash
cd frontend
npm install --legacy-peer-deps
npm run build
# 로컬에서 빌드 성공 확인 후 재배포
```

### 문제 2: 환경 변수 누락
```
Error: REACT_APP_API_URL is not defined
```

**해결**:
```
1. Vercel 대시보드 접속
2. Settings > Environment Variables
3. REACT_APP_API_URL 추가
4. Redeploy
```

### 문제 3: 404 에러 (SPA 라우팅)
```
404 - Page Not Found
```

**해결**:
`vercel.json`에 이미 설정되어 있음:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

---

## 🎯 다음 단계

### 1. Vercel 배포 완료 후
```
✅ 새 URL 확인: https://ai-cs-xxxx.vercel.app
✅ 모든 기능 테스트
✅ 백엔드 API 연결 확인
```

### 2. Netlify 사이트 정리 (선택사항)
```
1. https://app.netlify.com 접속
2. Sites > aics1 선택
3. Site settings > General > Delete site
```

### 3. 도메인 업데이트 (필요시)
```
- 기존 도메인이 있다면 Vercel로 변경
- Vercel 대시보드 > Domains에서 설정
```

---

## 📊 예상 결과

### 배포 성공 시
```
✓ Deployment ready [복사]
   https://ai-cs-xxxx.vercel.app

✓ Inspect: https://vercel.com/...
✓ Preview: https://ai-cs-xxxx.vercel.app
```

### 접속 테스트
```
1. https://ai-cs-xxxx.vercel.app 접속
2. ✅ 대시보드 정상 로딩
3. ✅ Live 방송 조회 정상 작동
4. ✅ 입점몰 이벤트, 전시 조회 정상 작동
5. ✅ 백엔드 API 연결 정상
```

---

## 💡 추가 팁

### 1. 빌드 시간 최적화
```json
// package.json
{
  "scripts": {
    "build": "GENERATE_SOURCEMAP=false react-scripts build"
  }
}
```

### 2. 캐싱 활용
Vercel은 자동으로 빌드 캐시를 활용하여 빌드 시간을 단축합니다.

### 3. 프리뷰 배포
```bash
# 프로덕션 배포 전 미리보기
vercel
# 프로덕션 배포
vercel --prod
```

---

**Vercel 배포를 시작하려면 아래 명령어를 실행하세요:**

```bash
cd "/Users/amore/ai_cs 시스템"
vercel login
vercel --prod
```

**배포가 완료되면 새 URL로 접속하여 확인하세요!** 🚀✨
