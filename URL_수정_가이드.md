# 원천 URL 수정 가이드

작성 일시: 2025-12-04 10:00

---

## ❌ 문제점

### 현재 상황
- **Live ID**: `INNISFREE_MALL_INNISFREE_006`
- **현재 URL**: `https://www.innisfree.com/kr/ko/live/innisfree_006`
- **문제**: 브랜드몰 URL로 저장되어 있어 "잘못된 접근입니다" 페이지로 이동

### 원인
- 브랜드몰 URL은 직접 접근이 차단되어 있음
- 실제 라이브 방송은 카카오/네이버 쇼핑라이브 플랫폼에서 진행됨
- 올바른 쇼핑라이브 플랫폼 URL로 저장되어야 함

---

## ✅ 해결 방법

### 1. 올바른 URL 형식

**카카오 쇼핑라이브**:
```
https://shoppinglive.kakao.com/lives/{live_id}
```
예시: `https://shoppinglive.kakao.com/lives/805761`

**네이버 쇼핑라이브**:
```
https://shoppinglive.naver.com/lives/{live_id}
```
예시: `https://shoppinglive.naver.com/lives/312360`

### 2. Supabase에서 URL 수정

#### 방법 1: SQL Editor 사용
```sql
-- Supabase SQL Editor에서 실행
UPDATE live_broadcasts
SET source_url = 'https://shoppinglive.kakao.com/lives/805761'
WHERE live_id = 'INNISFREE_MALL_INNISFREE_006';
```

#### 방법 2: Python 스크립트 사용
```python
from supabase import create_client

SUPABASE_URL = "https://uewhvekfjjvxoioklzza.supabase.co"
SUPABASE_KEY = "your_anon_key"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# URL 업데이트
result = supabase.table('live_broadcasts').update({
    'source_url': 'https://shoppinglive.kakao.com/lives/805761',
    'platform_name': '카카오'  # 플랫폼명도 함께 수정
}).eq('live_id', 'INNISFREE_MALL_INNISFREE_006').execute()

print(f"✅ URL 업데이트 완료: {result.data}")
```

### 3. 프론트엔드 수정 (이미 완료)

프론트엔드에서는 다음과 같이 수정되었습니다:

**변경 전**:
```javascript
window.open(_v_source_url, '_blank', 'noopener,noreferrer');
```

**변경 후**:
```javascript
// Referrer를 유지하면서 새 창 열기
const newWindow = window.open('', '_blank');
if (newWindow) {
  newWindow.location.href = _v_source_url;
} else {
  alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
}
```

**추가 기능**:
- ✅ URL 복사 버튼 추가
- ✅ `rel="noreferrer"` 대신 `rel="noreferrer"` 사용 (Referrer 유지)

---

## 🔧 일괄 수정 스크립트

모든 브랜드몰 URL을 찾아서 수정하는 스크립트:

```python
from supabase import create_client

SUPABASE_URL = "https://uewhvekfjjvxoioklzza.supabase.co"
SUPABASE_KEY = "your_anon_key"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# 브랜드몰 URL 찾기
result = supabase.table('live_broadcasts').select('*').execute()

print("=== 브랜드몰 URL 찾기 ===\n")
for item in result.data:
    url = item['source_url']
    live_id = item['live_id']
    
    # 브랜드몰 URL 체크
    if any(domain in url for domain in ['innisfree.com', 'laneige.com', 'sulwhasoo.com', 'etude.com']):
        print(f"❌ {live_id}")
        print(f"   현재 URL: {url}")
        print(f"   → 수정 필요: 카카오/네이버 쇼핑라이브 URL로 변경")
        print()
```

---

## 📊 URL 매핑 예시

| Live ID | 브랜드 | 잘못된 URL | 올바른 URL |
|---------|--------|-----------|-----------|
| INNISFREE_MALL_INNISFREE_006 | 이니스프리 | https://www.innisfree.com/kr/ko/live/innisfree_006 | https://shoppinglive.kakao.com/lives/805761 |
| LANEIGE_MALL_LANEIGE_001 | 라네즈 | https://www.laneige.com/kr/ko/live/laneige_001 | https://shoppinglive.naver.com/lives/312360 |

---

## 🧪 테스트 방법

### 1. URL 수정 후 확인
```bash
# API 호출
curl http://localhost:3001/api/events/INNISFREE_MALL_INNISFREE_006 | jq '.data.source_url'

# 예상 결과
"https://shoppinglive.kakao.com/lives/805761"
```

### 2. 프론트엔드 테스트
1. http://localhost:3000 접속
2. 라이브 조회 > "INNISFREE_MALL_INNISFREE_006" 검색
3. 상세 보기 클릭
4. "새 창에서 열기" 버튼 클릭
5. ✅ 카카오 쇼핑라이브 페이지로 정상 이동 확인

---

## 📝 크롤러 수정

향후 크롤링 시 올바른 URL을 저장하도록 크롤러를 수정해야 합니다:

```python
# comprehensive_naver_crawler.py 또는 kakao_crawler.py

def crawl_live(self, p_url):
    """
    라이브 방송 크롤링
    
    Args:
        p_url: 쇼핑라이브 플랫폼 URL (카카오/네이버)
    """
    # ✅ 올바른 URL 저장
    live_data = {
        'live_id': self._generate_live_id(),
        'source_url': p_url,  # 플랫폼 URL 저장
        'platform_name': self._extract_platform(p_url),
        # ...
    }
    
    # ❌ 브랜드몰 URL 저장하지 않기
    # live_data['source_url'] = 'https://www.innisfree.com/...'
    
    return live_data

def _extract_platform(self, p_url):
    """URL에서 플랫폼 추출"""
    if 'kakao' in p_url:
        return '카카오'
    elif 'naver' in p_url:
        return '네이버'
    else:
        return '기타'
```

---

## ✅ 완료 체크리스트

- [x] 문제 원인 파악 (브랜드몰 URL)
- [x] 프론트엔드 수정 (Referrer 유지, URL 복사 버튼)
- [ ] Supabase에서 URL 수정
- [ ] 수정된 URL 테스트
- [ ] 크롤러 수정 (향후)

---

## 🎯 다음 단계

1. **즉시 수정**: Supabase SQL Editor에서 `INNISFREE_MALL_INNISFREE_006`의 URL을 올바른 카카오/네이버 쇼핑라이브 URL로 수정
2. **일괄 수정**: 다른 브랜드몰 URL도 찾아서 수정
3. **크롤러 개선**: 향후 크롤링 시 올바른 URL을 저장하도록 수정

---

## 📞 문의

URL을 찾을 수 없는 경우:
1. 브랜드 공식 SNS 확인
2. 쇼핑라이브 플랫폼에서 검색
3. 고객센터 문의

