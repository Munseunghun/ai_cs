# 네이버 스마트스토어 상품 정보 수집 크롤러

## 📋 개요

네이버 스마트스토어 전시 페이지에서 상품 정보를 자동으로 수집하는 Python 크롤러입니다.

### 수집 정보
- ✅ **제품 이미지**: 썸네일 및 상세 이미지 URL
- ✅ **제품명**: 상품 타이틀
- ✅ **제품 설명**: 상품 상세 설명
- ✅ **최종혜택가**: 원가, 할인가, 할인율
- ✅ **증정품 정보**: 사은품, 증정품 상세 정보

---

## 🛠 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Python | 3.12+ | 프로그래밍 언어 |
| Selenium | 4.33.0 | 브라우저 자동화 |
| BeautifulSoup4 | 4.14.2 | HTML 파싱 |
| Supabase Python | 2.25.0 | 데이터베이스 연동 |
| python-dotenv | 1.1.1 | 환경 변수 관리 |

---

## 📦 설치 방법

### 1. 필수 패키지 설치

```bash
# 프로젝트 루트 디렉토리로 이동
cd "/Users/amore/ai_cs 시스템/crawler"

# 필수 패키지 설치
pip install selenium beautifulsoup4 supabase python-dotenv
```

### 2. Chrome WebDriver 설치

```bash
# Homebrew를 사용한 설치 (macOS)
brew install chromedriver

# 또는 수동 다운로드
# https://chromedriver.chromium.org/downloads
```

### 3. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 입력합니다:

```env
# Supabase 설정
SUPABASE_URL=https://uewhvekfjjvxoioklzza.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## 🗄 데이터베이스 설정

### 1. Supabase 테이블 생성

Supabase SQL Editor에서 다음 스크립트를 실행합니다:

```bash
# SQL 스크립트 위치
/Users/amore/ai_cs 시스템/database/create_naver_smartstore_products_table.sql
```

### 2. 테이블 구조

```sql
CREATE TABLE public.naver_smartstore_products (
    id BIGSERIAL PRIMARY KEY,
    platform VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_description TEXT,
    original_price INTEGER,
    discount_price INTEGER,
    discount_rate NUMERIC(5, 2),
    product_images JSONB,
    image_count INTEGER,
    gift_info JSONB,
    gift_count INTEGER,
    collected_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🚀 사용 방법

### 1. 기본 실행

```bash
# 크롤러 디렉토리로 이동
cd "/Users/amore/ai_cs 시스템/crawler"

# 크롤러 실행
python naver_smartstore_product_crawler.py
```

### 2. 헤드리스 모드 실행

코드 수정:

```python
# naver_smartstore_product_crawler.py의 main() 함수에서
_v_crawler = NaverSmartstoreProductCrawler(p_headless=True)  # False → True
```

### 3. 커스텀 URL 수집

```python
from naver_smartstore_product_crawler import NaverSmartstoreProductCrawler

# 크롤러 인스턴스 생성
crawler = NaverSmartstoreProductCrawler(p_headless=False)

# 커스텀 URL 수집
url = "https://brand.naver.com/iope/shoppingstory/detail?id=5002337684"
result = crawler.collect_product_data(url)

# 결과 출력
print(result)

# WebDriver 종료
crawler.close()
```

---

## 📊 수집 결과 예시

### JSON 출력 형식

```json
{
  "platform": "네이버스마트스토어",
  "brand": "아이오페",
  "url": "https://brand.naver.com/iope/shoppingstory/detail?id=5002337684",
  "product_name": "XMD 스템3 클리니컬 리커버리 세럼 50ML",
  "product_description": "스킨부스팅 물광앰플로 92.3% 함유로 물광플럼핑을 완성시켜주는 최초의 피부과 관리 비교 검증 리커버리 세럼",
  "original_price": 95000,
  "discount_price": 76750,
  "discount_rate": 19.0,
  "product_images": [
    "https://shop-phinf.pstatic.net/...",
    "https://shop-phinf.pstatic.net/..."
  ],
  "gift_info": [
    {
      "description": "전 구매 고객 증정",
      "type": "증정품"
    },
    {
      "description": "9만원 이상 구매시 사은품",
      "type": "증정품"
    }
  ],
  "collected_at": "2025-12-16T10:30:00",
  "image_count": 15,
  "gift_count": 2
}
```

---

## 🔍 주요 기능

### 1. 제품 이미지 수집
- 메인 상품 이미지 자동 추출
- Lazy-loaded 이미지 로딩 지원
- 중복 이미지 자동 제거
- 광고/아이콘 이미지 필터링

### 2. 가격 정보 추출
- 원가 (정상가) 추출
- 할인가 (최종혜택가) 추출
- 할인율 자동 계산
- 다양한 가격 표시 형식 지원

### 3. 증정품 정보 수집
- 증정품 영역 자동 탐지
- 텍스트 패턴 기반 증정품 추출
- 중복 증정품 정보 제거

### 4. 데이터 저장
- Supabase 자동 저장
- JSON 파일 로컬 저장
- 타임스탬프 자동 기록

---

## ⚙️ 설정 옵션

### 크롤러 옵션

```python
class NaverSmartstoreProductCrawler:
    def __init__(self, p_headless: bool = False):
        """
        Args:
            p_headless (bool): 헤드리스 모드 사용 여부
                - True: 백그라운드 실행 (서버 환경)
                - False: 브라우저 표시 (디버깅 용도)
        """
```

### 스크롤 설정

```python
def _scroll_page(self, p_scroll_count: int = 3):
    """
    Args:
        p_scroll_count (int): 스크롤 횟수
            - 기본값: 3회
            - 이미지가 많은 경우 증가 권장
    """
```

---

## 🐛 트러블슈팅

### 1. ChromeDriver 오류

**문제**: `selenium.common.exceptions.WebDriverException: 'chromedriver' executable needs to be in PATH`

**해결**:
```bash
# ChromeDriver 설치
brew install chromedriver

# 권한 부여 (macOS)
xattr -d com.apple.quarantine /usr/local/bin/chromedriver
```

### 2. Supabase 연결 오류

**문제**: `supabase.lib.client_options.ClientOptions: Invalid API key`

**해결**:
- `.env` 파일에 올바른 Supabase URL과 Key 입력
- 환경 변수 로드 확인: `load_dotenv()`

### 3. 이미지 로딩 실패

**문제**: 이미지가 수집되지 않음

**해결**:
- 스크롤 횟수 증가: `_scroll_page(scroll_count=5)`
- 대기 시간 증가: `time.sleep(5)`
- 헤드리스 모드 해제: `p_headless=False`

### 4. 메모리 부족

**문제**: 크롤링 중 메모리 부족 오류

**해결**:
```python
# Chrome 옵션에 메모리 제한 추가
_v_chrome_options.add_argument('--disable-dev-shm-usage')
_v_chrome_options.add_argument('--disable-extensions')
```

---

## 📈 성능 최적화

### 1. 병렬 처리

여러 URL을 동시에 수집:

```python
from concurrent.futures import ThreadPoolExecutor

def collect_multiple_urls(p_urls: List[str]):
    """
    여러 URL을 병렬로 수집
    """
    with ThreadPoolExecutor(max_workers=3) as executor:
        results = executor.map(collect_single_url, p_urls)
    return list(results)

def collect_single_url(p_url: str):
    crawler = NaverSmartstoreProductCrawler(p_headless=True)
    result = crawler.collect_product_data(p_url)
    crawler.close()
    return result
```

### 2. 캐싱

중복 수집 방지:

```python
def is_already_collected(p_url: str) -> bool:
    """
    URL이 이미 수집되었는지 확인
    """
    response = supabase.table('naver_smartstore_products') \
        .select('id') \
        .eq('url', p_url) \
        .execute()
    
    return len(response.data) > 0
```

---

## 📝 로그 관리

### 로그 파일 생성

```python
import logging

# 로거 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('naver_smartstore_crawler.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)
```

---

## 🔐 보안 고려사항

### 1. 환경 변수 보호
- `.env` 파일을 `.gitignore`에 추가
- Supabase Key는 절대 하드코딩하지 않음

### 2. Rate Limiting
- 요청 간 적절한 대기 시간 설정
- 서버 부하 방지

```python
import time

# 요청 간 대기
time.sleep(2)  # 2초 대기
```

### 3. User-Agent 설정
- 실제 브라우저처럼 보이도록 User-Agent 설정
- 봇 감지 방지

---

## 📅 스케줄링

### Cron을 사용한 자동 실행

```bash
# crontab 편집
crontab -e

# 매일 오전 9시 실행
0 9 * * * cd "/Users/amore/ai_cs 시스템/crawler" && python naver_smartstore_product_crawler.py >> /tmp/naver_crawler.log 2>&1
```

---

## 🤝 기여 가이드

### 코드 스타일
- PEP 8 준수
- 변수명: `p_` (파라미터), `_v_` (지역변수)
- 함수/메서드: 상세한 docstring 작성

### 테스트
```bash
# 단위 테스트 실행
pytest tests/test_naver_smartstore_crawler.py
```

---

## 📞 문의

프로젝트 관련 문의사항은 Amore Pacific 개발팀으로 연락 주시기 바랍니다.

---

**© 2025 Amore Pacific. All Rights Reserved.**

