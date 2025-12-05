#!/bin/bash
# 스케줄러 상태 확인 스크립트

echo "================================================================================"
echo "🔍 데이터 수집 스케줄러 상태 확인"
echo "================================================================================"
echo ""

# 1. 스케줄러 프로세스 확인
echo "📊 스케줄러 프로세스 상태:"
if ps aux | grep -E "dynamic_scheduler.py|scheduler.py" | grep -v grep > /dev/null; then
    echo "   ✅ 스케줄러 실행 중"
    ps aux | grep -E "dynamic_scheduler.py|scheduler.py" | grep -v grep | awk '{print "   PID:", $2, "| 시작:", $9, "| CPU:", $3"%", "| MEM:", $4"%"}'
else
    echo "   ❌ 스케줄러가 실행되고 있지 않습니다!"
    echo ""
    echo "   💡 스케줄러 시작 방법:"
    echo "      cd '/Users/amore/ai_cs 시스템/crawler'"
    echo "      nohup python3 dynamic_scheduler.py > logs/scheduler_service.log 2>&1 &"
fi

echo ""

# 2. 설정 파일 확인
echo "📦 설정 파일 확인:"
if [ -f "config/platforms.json" ]; then
    PLATFORM_COUNT=$(cat config/platforms.json | grep -c '"code"')
    echo "   ✅ 플랫폼 설정: ${PLATFORM_COUNT}개"
else
    echo "   ❌ 플랫폼 설정 파일 없음"
fi

if [ -f "config/brands.json" ]; then
    BRAND_COUNT=$(cat config/brands.json | grep -c '"code"')
    echo "   ✅ 브랜드 설정: ${BRAND_COUNT}개"
else
    echo "   ❌ 브랜드 설정 파일 없음"
fi

echo ""

# 3. 최근 수집 통계
echo "📊 최근 수집 통계:"
if [ -f "output/dynamic_scheduler_stats.json" ]; then
    echo "   파일: output/dynamic_scheduler_stats.json"
    python3 -c "
import json
with open('output/dynamic_scheduler_stats.json', 'r') as f:
    stats = json.load(f)
print(f\"   총 실행: {stats.get('total_runs', 0)}회\")
print(f\"   성공: {stats.get('successful_runs', 0)}회\")
print(f\"   실패: {stats.get('failed_runs', 0)}회\")
print(f\"   마지막 실행: {stats.get('last_run', 'N/A')}\")
print(f\"   마지막 성공: {stats.get('last_success', 'N/A')}\")
if stats.get('platforms_processed'):
    print(f\"\\n   플랫폼별 처리 현황:\")
    for code, pstats in stats['platforms_processed'].items():
        status = pstats.get('status', 'unknown')
        icon = '✅' if status == 'success' else '❌'
        print(f\"      {icon} {code}: {status}\")
" 2>/dev/null || echo "   ⚠️  통계 파일 파싱 실패"
else
    echo "   ⚠️  통계 파일 없음 (아직 실행되지 않음)"
fi

echo ""

# 4. 최근 로그 확인
echo "📝 최근 로그 (마지막 20줄):"
TODAY=$(date +%Y%m%d)
if [ -f "logs/dynamic_scheduler_${TODAY}.log" ]; then
    echo "   파일: logs/dynamic_scheduler_${TODAY}.log"
    tail -20 "logs/dynamic_scheduler_${TODAY}.log" | sed 's/^/   /'
elif [ -f "logs/scheduler_service.log" ]; then
    echo "   파일: logs/scheduler_service.log"
    tail -20 "logs/scheduler_service.log" | sed 's/^/   /'
else
    echo "   ⚠️  로그 파일 없음"
fi

echo ""
echo "================================================================================"
echo "✅ 상태 확인 완료"
echo "================================================================================"
