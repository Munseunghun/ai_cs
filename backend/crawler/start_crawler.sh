#!/bin/bash

# 네이버 쇼핑라이브 크롤러 시작 스크립트

echo "=================================================="
echo "🚀 네이버 쇼핑라이브 크롤러 시작"
echo "=================================================="

# 현재 디렉토리로 이동
cd "$(dirname "$0")"

# Python 버전 확인
echo "📌 Python 버전 확인..."
python3 --version

# 필요한 패키지 확인
echo ""
echo "📦 필요한 패키지 확인..."

# selenium 확인
if ! python3 -c "import selenium" 2>/dev/null; then
    echo "⚠️  selenium이 설치되지 않았습니다."
    echo "   설치 중..."
    pip3 install selenium
fi

# supabase 확인
if ! python3 -c "import supabase" 2>/dev/null; then
    echo "⚠️  supabase가 설치되지 않았습니다."
    echo "   설치 중..."
    pip3 install supabase
fi

# schedule 확인
if ! python3 -c "import schedule" 2>/dev/null; then
    echo "⚠️  schedule이 설치되지 않았습니다."
    echo "   설치 중..."
    pip3 install schedule
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
    echo "방법 1: .env 파일 생성 (프로젝트 루트)"
    echo "  SUPABASE_URL=https://your-project.supabase.co"
    echo "  SUPABASE_ANON_KEY=your-anon-key"
    echo ""
    echo "방법 2: 환경변수 직접 설정"
    echo "  export SUPABASE_URL='https://your-project.supabase.co'"
    echo "  export SUPABASE_ANON_KEY='your-anon-key'"
    echo ""
    exit 1
fi

echo "✅ 환경변수 설정 완료"

# 로그 디렉토리 생성
mkdir -p logs
mkdir -p output

# 크롤러 실행 (단일 실행)
echo ""
echo "=================================================="
echo "🔍 크롤러 실행 중..."
echo "=================================================="
python3 naver_live_crawler.py

# 실행 결과 확인
if [ $? -eq 0 ]; then
    echo ""
    echo "=================================================="
    echo "✅ 크롤러 실행 완료"
    echo "=================================================="
    exit 0
else
    echo ""
    echo "=================================================="
    echo "❌ 크롤러 실행 실패"
    echo "=================================================="
    exit 1
fi




