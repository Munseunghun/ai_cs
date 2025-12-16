#!/bin/bash

# 데이터 수집 스케줄러 시작 스크립트

echo "=================================================="
echo "⏰ 데이터 수집 스케줄러 시작"
echo "=================================================="

# 현재 디렉토리로 이동
cd "$(dirname "$0")"

# Python 버전 확인
echo "📌 Python 버전 확인..."
python3 --version

# 필요한 패키지 확인
echo ""
echo "📦 필요한 패키지 확인..."

# requirements.txt가 있으면 설치
if [ -f "requirements.txt" ]; then
    echo "📦 requirements.txt 발견, 패키지 설치 중..."
    pip3 install -r requirements.txt
else
    # 개별 패키지 확인
    for package in selenium supabase schedule; do
        if ! python3 -c "import $package" 2>/dev/null; then
            echo "⚠️  $package가 설치되지 않았습니다."
            echo "   설치 중..."
            pip3 install $package
        fi
    done
fi

# 환경변수 확인
echo ""
echo "🔑 환경변수 확인..."

if [ -f "../../.env" ]; then
    echo "✅ .env 파일 발견"
    export $(cat ../../.env | grep -v '^#' | xargs)
else
    echo "⚠️  .env 파일이 없습니다."
fi

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
    echo ""
    echo "❌ Supabase 환경변수가 설정되지 않았습니다."
    echo ""
    echo "다음 환경변수를 설정해주세요:"
    echo "  - SUPABASE_URL"
    echo "  - SUPABASE_ANON_KEY"
    echo ""
    exit 1
fi

echo "✅ 환경변수 설정 완료"

# 로그 디렉토리 생성
mkdir -p logs
mkdir -p output

# 스케줄러 실행
echo ""
echo "=================================================="
echo "⏰ 스케줄러 실행 중... (1시간마다 자동 수집)"
echo "=================================================="
echo "⌨️  종료하려면 Ctrl+C를 누르세요."
echo "=================================================="
python3 scheduler.py




