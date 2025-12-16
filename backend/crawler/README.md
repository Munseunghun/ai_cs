# 네이버 쇼핑라이브 크롤러

## 📋 개요

네이버 쇼핑라이브의 라이브 방송 정보를 자동으로 수집하여 Supabase 데이터베이스에 저장하는 크롤러입니다.

## 🎯 주요 기능

- **멀티 브랜드 크롤링**: 10개 주요 브랜드 자동 수집
- **실시간 데이터 수집**: 1시간마다 자동 실행
- **Supabase 연동**: 수집된 데이터 자동 저장
- **중복 방지**: 기존 데이터 자동 업데이트
- **로깅 시스템**: 상세한 실행 로그 기록

## 📦 수집 대상 브랜드

1. 라네즈
2. 설화수
3. 아이오페
4. 헤라
5. 에스트라
6. 이니스프리
7. 해피바스
8. 바이탈뷰티
9. 프리메라
10. 오설록

## 🚀 설치 방법

### 1. 필요한 패키지 설치

```bash
cd "/Users/amore/ai_cs 시스템/backend/crawler"

# requirements.txt로 일괄 설치
pip3 install -r requirements.txt

# 또는 개별 설치
pip3 install selenium supabase schedule python-dotenv
```

### 2. ChromeDriver 설치

```bash
# macOS (Homebrew 사용)
brew install chromedriver

# 또는 수동 다운로드
# https://chromedriver.chromium.org/downloads
```

### 3. 환경변수 설정

프로젝트 루트에 `.env` 파일 생성:

```bash
cd "/Users/amore/ai_cs 시스템"

# .env 파일 생성
cat > .env << EOF
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
EOF
```

## ▶️ 실행 방법

### 방법 1: 단일 실행 (테스트용)

```bash
cd "/Users/amore/ai_cs 시스템/backend/crawler"

# 쉘 스크립트 실행
./start_crawler.sh

# 또는 Python 직접 실행
python3 naver_live_crawler.py
```

### 방법 2: 스케줄러 실행 (운영용)

```bash
cd "/Users/amore/ai_cs 시스템/backend/crawler"

# 스케줄러 시작 (1시간마다 자동 실행)
./start_scheduler.sh

# 또는 Python 직접 실행
python3 scheduler.py
```

**특징**:
- ✅ 즉시 한 번 실행 후 1시간마다 자동 실행
- ✅ 실행 통계 자동 기록
- ✅ 에러 발생 시 자동 재시도 (다음 시간)
- ⌨️ Ctrl+C로 종료

### 방법 3: 백그라운드 실행

```bash
cd "/Users/amore/ai_cs 시스템/backend/crawler"

# 백그라운드로 실행
nohup python3 scheduler.py > logs/nohup.log 2>&1 &

# 프로세스 ID 저장
echo $! > scheduler.pid

# 프로세스 확인
ps aux | grep scheduler.py

# 종료
kill $(cat scheduler.pid)
```

## 📊 수집 데이터 구조

### live_broadcasts 테이블

| 필드명 | 타입 | 설명 |
|-------|------|------|
| `live_id` | TEXT | 라이브 방송 고유 ID |
| `platform_name` | TEXT | 플랫폼명 (네이버) |
| `channel_code` | TEXT | 채널 코드 (NAVER) |
| `brand_name` | TEXT | 브랜드명 |
| `live_title_customer` | TEXT | 고객용 제목 |
| `live_title_cs` | TEXT | CS용 제목 |
| `source_url` | TEXT | 원본 URL |
| `thumbnail_url` | TEXT | 썸네일 이미지 URL |
| `broadcast_date` | DATE | 방송 날짜 |
| `broadcast_start_time` | TIME | 방송 시작 시간 |
| `broadcast_end_time` | TIME | 방송 종료 시간 |
| `status` | TEXT | 상태 (ACTIVE/PENDING/ENDED) |
| `created_at` | TIMESTAMP | 생성 시간 |
| `updated_at` | TIMESTAMP | 수정 시간 |

## 📈 모니터링

### 1. 실시간 로그 확인

```bash
cd "/Users/amore/ai_cs 시스템/backend/crawler"

# 오늘 날짜 로그 확인
tail -f logs/scheduler_$(date +%Y%m%d).log
```

### 2. 수집 통계 확인

```bash
cd "/Users/amore/ai_cs 시스템/backend/crawler"

# JSON 형식으로 보기
cat output/scheduler_stats.json

# 보기 좋게 출력
cat output/scheduler_stats.json | python3 -m json.tool
```

**통계 예시**:
```json
{
  "total_runs": 24,
  "successful_runs": 22,
  "failed_runs": 2,
  "last_run": "2025-12-04 15:00:00",
  "last_success": "2025-12-04 15:00:00",
  "last_error": null
}
```

### 3. 수집된 데이터 확인

```bash
cd "/Users/amore/ai_cs 시스템/backend/crawler/output"

# 최근 수집된 파일 목록
ls -lht crawl_stats_*.json | head -5

# 최신 파일 내용 확인
cat $(ls -t crawl_stats_*.json | head -1) | python3 -m json.tool
```

## 🔧 문제 해결

### 1. ChromeDriver 오류

```bash
# ChromeDriver 버전 확인
chromedriver --version

# Chrome 브라우저 버전 확인
google-chrome --version  # Linux
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version  # macOS

# 버전이 맞지 않으면 재설치
brew reinstall chromedriver  # macOS
```

### 2. Selenium 오류

```bash
# Selenium 재설치
pip3 uninstall selenium
pip3 install selenium==4.15.2
```

### 3. Supabase 연결 오류

```bash
# 환경변수 확인
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# .env 파일 확인
cat ../../.env

# Supabase 연결 테스트
python3 -c "
from supabase import create_client
import os
url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_ANON_KEY')
client = create_client(url, key)
print('✅ Supabase 연결 성공')
"
```

### 4. 데이터가 수집되지 않음

```bash
# 크롤러 직접 실행하여 에러 확인
python3 naver_live_crawler.py

# 로그 확인
tail -50 logs/scheduler_$(date +%Y%m%d).log
```

## ⚙️ 설정 변경

### 1. 수집 주기 변경

`scheduler.py` 파일 수정:

```python
# 현재: 매 시간 정각에 실행
schedule.every().hour.at(":00").do(self.collect_data)

# 변경 예시:

# 30분마다 실행
schedule.every(30).minutes.do(self.collect_data)

# 2시간마다 실행
schedule.every(2).hours.do(self.collect_data)

# 매일 특정 시간에 실행
schedule.every().day.at("09:00").do(self.collect_data)
schedule.every().day.at("14:00").do(self.collect_data)
```

### 2. 브랜드당 수집 개수 변경

`naver_live_crawler.py` 파일의 `main()` 함수 수정:

```python
# 현재: 브랜드당 5개
_v_stats = _v_crawler.crawl_all_brands(p_max_per_brand=5)

# 변경: 브랜드당 10개
_v_stats = _v_crawler.crawl_all_brands(p_max_per_brand=10)
```

### 3. 대상 브랜드 변경

`naver_live_crawler.py` 파일의 `__init__()` 메서드 수정:

```python
# 브랜드 목록 수정
self.p_brands = [
    "라네즈", "설화수", "아이오페", "헤라", "에스트라",
    "이니스프리", "해피바스", "바이탈뷰티", "프리메라", "오설록",
    # 새로운 브랜드 추가
    "마몽드", "려"
]
```

## 📁 파일 구조

```
backend/crawler/
├── naver_live_crawler.py      # 크롤러 메인 스크립트
├── scheduler.py                # 스케줄러 스크립트
├── start_crawler.sh            # 크롤러 실행 스크립트
├── start_scheduler.sh          # 스케줄러 실행 스크립트
├── requirements.txt            # 필요한 패키지 목록
├── README.md                   # 이 파일
├── logs/                       # 로그 디렉토리
│   └── scheduler_YYYYMMDD.log # 실행 로그
├── output/                     # 출력 디렉토리
│   ├── scheduler_stats.json   # 수집 통계
│   └── crawl_stats_*.json     # 크롤링 결과
└── config/                     # 설정 파일
    ├── brands.json            # 브랜드 목록
    └── platforms.json         # 플랫폼 목록
```

## ✨ 완성!

이제 **1시간마다 자동으로** 네이버 쇼핑라이브 데이터가 수집됩니다! 🎉

### 빠른 시작

```bash
cd "/Users/amore/ai_cs 시스템/backend/crawler"

# 1. 패키지 설치
pip3 install -r requirements.txt

# 2. 환경변수 설정 (.env 파일)
# SUPABASE_URL과 SUPABASE_ANON_KEY 설정

# 3. 크롤러 테스트 실행
./start_crawler.sh

# 4. 스케줄러 시작 (1시간마다 자동 실행)
./start_scheduler.sh
```

## 📞 문의

문제가 발생하면 로그 파일을 확인하거나 개발팀에 문의해주세요.

- 로그 위치: `logs/scheduler_YYYYMMDD.log`
- 통계 위치: `output/scheduler_stats.json`




