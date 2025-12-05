#!/bin/bash
# Supabase 테이블 자동 생성 스크립트

echo "================================================================================"
echo "🗄️  Supabase 테이블 자동 생성"
echo "================================================================================"

# 환경변수 로드
source "/Users/amore/ai_cs 시스템/crawler/.env"

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
    echo "❌ Supabase 환경변수가 설정되지 않았습니다."
    exit 1
fi

echo "URL: $SUPABASE_URL"
echo ""

# SQL 파일 경로
SQL_FILE="/Users/amore/ai_cs 시스템/database/enhanced_live_schema.sql"

if [ ! -f "$SQL_FILE" ]; then
    echo "❌ SQL 파일을 찾을 수 없습니다: $SQL_FILE"
    exit 1
fi

echo "📄 SQL 파일: $SQL_FILE"
echo ""

# Supabase CLI 설치 확인
if ! command -v supabase &> /dev/null; then
    echo "⚠️  Supabase CLI가 설치되지 않았습니다."
    echo ""
    echo "📌 설치 방법:"
    echo "   brew install supabase/tap/supabase"
    echo ""
    echo "또는 Supabase 대시보드를 사용하세요:"
    echo "   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql"
    echo ""
    
    # 클립보드에 SQL 복사
    cat "$SQL_FILE" | pbcopy
    echo "✅ SQL이 클립보드에 복사되었습니다!"
    echo "   Supabase SQL Editor에서 Cmd+V로 붙여넣기하세요."
    
    # 브라우저 자동 열기
    open "https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql"
    echo ""
    echo "🌐 브라우저에서 Supabase SQL Editor가 열립니다..."
    
    exit 0
fi

echo "✅ Supabase CLI 발견"
echo ""

# SQL 실행
echo "🚀 SQL 실행 중..."
supabase db execute --file "$SQL_FILE" --project-ref uewhvekfjjvxoioklzza

if [ $? -eq 0 ]; then
    echo ""
    echo "================================================================================"
    echo "🎉 테이블 생성 완료!"
    echo "================================================================================"
    echo "   1. live_products (7개 컬럼 추가)"
    echo "   2. live_coupons"
    echo "   3. live_comments"
    echo "   4. live_faqs"
    echo "   5. live_intro"
    echo "   6. live_statistics"
    echo "   7. live_images"
    echo "================================================================================"
else
    echo ""
    echo "❌ SQL 실행 실패"
    echo "   Supabase 대시보드에서 수동으로 실행해주세요:"
    echo "   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql"
    
    # 클립보드에 SQL 복사
    cat "$SQL_FILE" | pbcopy
    echo ""
    echo "✅ SQL이 클립보드에 복사되었습니다!"
    
    exit 1
fi
