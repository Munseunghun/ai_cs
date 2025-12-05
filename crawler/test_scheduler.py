#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
스케줄러 설정 검증 스크립트
10개 플랫폼과 10개 브랜드가 올바르게 설정되었는지 확인합니다.
"""

import json
import sys
from pathlib import Path

def test_scheduler_config():
    """스케줄러 설정 검증"""
    
    print("=" * 80)
    print("🔍 스케줄러 설정 검증 시작")
    print("=" * 80)
    
    crawler_dir = Path(__file__).parent
    
    # 1. 플랫폼 설정 확인
    platforms_file = crawler_dir / 'config' / 'platforms.json'
    
    if not platforms_file.exists():
        print(f"❌ 플랫폼 설정 파일이 없습니다: {platforms_file}")
        return False
    
    try:
        with open(platforms_file, 'r', encoding='utf-8') as f:
            platforms = json.load(f)
        
        active_platforms = [p for p in platforms if p.get('isActive', True)]
        
        print(f"\n📦 플랫폼 설정 파일: {platforms_file}")
        print(f"   전체 플랫폼: {len(platforms)}개")
        print(f"   활성 플랫폼: {len(active_platforms)}개")
        print(f"\n활성 플랫폼 목록:")
        for idx, platform in enumerate(active_platforms, 1):
            print(f"   {idx}. {platform['name']} ({platform['code']}) - {platform['url']}")
        
        if len(active_platforms) != 10:
            print(f"\n⚠️  경고: 활성 플랫폼이 10개가 아닙니다! (현재: {len(active_platforms)}개)")
        else:
            print(f"\n✅ 플랫폼 설정 정상: 10개 플랫폼 활성화됨")
            
    except Exception as e:
        print(f"❌ 플랫폼 설정 로드 실패: {e}")
        return False
    
    # 2. 브랜드 설정 확인
    brands_file = crawler_dir / 'config' / 'brands.json'
    
    if not brands_file.exists():
        print(f"\n❌ 브랜드 설정 파일이 없습니다: {brands_file}")
        return False
    
    try:
        with open(brands_file, 'r', encoding='utf-8') as f:
            brands = json.load(f)
        
        print(f"\n📦 브랜드 설정 파일: {brands_file}")
        print(f"   전체 브랜드: {len(brands)}개")
        print(f"\n브랜드 목록:")
        for idx, brand in enumerate(brands, 1):
            print(f"   {idx}. {brand['name']} ({brand['code']})")
        
        if len(brands) != 10:
            print(f"\n⚠️  경고: 브랜드가 10개가 아닙니다! (현재: {len(brands)}개)")
        else:
            print(f"\n✅ 브랜드 설정 정상: 10개 브랜드 설정됨")
            
    except Exception as e:
        print(f"❌ 브랜드 설정 로드 실패: {e}")
        return False
    
    # 3. crawl_multi_brands.py의 브랜드 목록 확인
    multi_brands_file = crawler_dir / 'crawl_multi_brands.py'
    
    if multi_brands_file.exists():
        try:
            with open(multi_brands_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # BRANDS 배열 찾기
            if 'BRANDS = [' in content:
                start_idx = content.find('BRANDS = [')
                end_idx = content.find(']', start_idx)
                brands_section = content[start_idx:end_idx+1]
                
                # 브랜드 개수 세기 (간단한 방법)
                brand_count = brands_section.count("'")
                brand_count = brand_count // 2  # 시작과 끝 따옴표
                
                print(f"\n📦 crawl_multi_brands.py 브랜드 설정:")
                print(f"   하드코딩된 브랜드: {brand_count}개")
                
                if brand_count == 10:
                    print(f"   ✅ 10개 브랜드 설정 확인됨")
                else:
                    print(f"   ⚠️  경고: 브랜드가 10개가 아닙니다! (현재: {brand_count}개)")
        except Exception as e:
            print(f"\n⚠️  crawl_multi_brands.py 확인 실패: {e}")
    
    # 4. 스케줄러 실행 상태 확인
    print(f"\n" + "=" * 80)
    print("📊 스케줄러 실행 상태")
    print("=" * 80)
    
    import subprocess
    result = subprocess.run(
        ['ps', 'aux'],
        capture_output=True,
        text=True
    )
    
    scheduler_processes = [
        line for line in result.stdout.split('\n') 
        if 'scheduler.py' in line or 'dynamic_scheduler.py' in line
    ]
    
    if scheduler_processes:
        print("✅ 스케줄러 실행 중:")
        for proc in scheduler_processes:
            print(f"   {proc}")
    else:
        print("❌ 스케줄러가 실행되고 있지 않습니다!")
        print("\n💡 스케줄러 시작 방법:")
        print("   cd '/Users/amore/ai_cs 시스템/crawler'")
        print("   python3 dynamic_scheduler.py")
    
    # 5. 최근 수집 통계 확인
    stats_file = crawler_dir / 'output' / 'dynamic_scheduler_stats.json'
    
    if stats_file.exists():
        try:
            with open(stats_file, 'r', encoding='utf-8') as f:
                stats = json.load(f)
            
            print(f"\n" + "=" * 80)
            print("📊 최근 수집 통계")
            print("=" * 80)
            print(f"총 실행 횟수: {stats.get('total_runs', 0)}")
            print(f"성공: {stats.get('successful_runs', 0)}")
            print(f"실패: {stats.get('failed_runs', 0)}")
            print(f"마지막 실행: {stats.get('last_run', 'N/A')}")
            print(f"마지막 성공: {stats.get('last_success', 'N/A')}")
            
            if stats.get('platforms_processed'):
                print(f"\n플랫폼별 처리 현황:")
                for code, platform_stats in stats['platforms_processed'].items():
                    status = platform_stats.get('status', 'unknown')
                    status_icon = '✅' if status == 'success' else '❌'
                    print(f"   {status_icon} {code}: {status}")
                    if status == 'failed' and platform_stats.get('last_error'):
                        print(f"      에러: {platform_stats['last_error'][:100]}")
        except Exception as e:
            print(f"\n⚠️  통계 파일 읽기 실패: {e}")
    else:
        print(f"\n⚠️  통계 파일이 없습니다: {stats_file}")
        print("   (스케줄러가 한 번도 실행되지 않았을 수 있습니다)")
    
    print("\n" + "=" * 80)
    print("✅ 검증 완료")
    print("=" * 80)
    
    return True


if __name__ == "__main__":
    success = test_scheduler_config()
    sys.exit(0 if success else 1)
