#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
네이버 스마트스토어 크롤러 테스트 스크립트

사용법:
    python test_naver_smartstore.py

작성일: 2025-12-16
"""

import sys
import os
from datetime import datetime

# 현재 디렉토리를 Python 경로에 추가
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from naver_smartstore_product_crawler import NaverSmartstoreProductCrawler


def print_separator(p_title: str = ""):
    """
    구분선 출력
    
    Args:
        p_title (str): 구분선 제목
    """
    print("\n" + "="*80)
    if p_title:
        print(f"  {p_title}")
        print("="*80)
    print()


def test_single_url():
    """
    단일 URL 테스트
    """
    print_separator("단일 URL 테스트")
    
    # 테스트 URL
    _v_test_url = (
        "https://brand.naver.com/iope/shoppingstory/detail"
        "?id=5002337684&page=1&n_media=27758"
        "&n_query=%EC%95%84%EC%9D%B4%EC%98%A4%ED%8E%98"
        "&n_rank=1&n_ad_group=grp-a001-01-000000032017087"
        "&n_ad=nad-a001-01-000000449408324"
        "&n_keyword_id=nkw-a001-01-000005137669767"
        "&n_keyword=%EC%95%84%EC%9D%B4%EC%98%A4%ED%8E%98"
        "&n_campaign_type=1&n_ad_group_type=1&n_match=1"
    )
    
    print(f"[테스트 URL]")
    print(f"{_v_test_url}\n")
    
    # 크롤러 인스턴스 생성
    _v_crawler = NaverSmartstoreProductCrawler(p_headless=False)
    
    try:
        # 상품 정보 수집
        _v_result = _v_crawler.collect_product_data(_v_test_url)
        
        # 결과 검증
        if _v_result:
            print_separator("수집 결과 요약")
            print(f"✅ 플랫폼: {_v_result.get('platform')}")
            print(f"✅ 브랜드: {_v_result.get('brand')}")
            print(f"✅ 제품명: {_v_result.get('product_name')}")
            print(f"✅ 원가: {_v_result.get('original_price'):,}원" if _v_result.get('original_price') else "❌ 원가: 수집 실패")
            print(f"✅ 할인가: {_v_result.get('discount_price'):,}원" if _v_result.get('discount_price') else "❌ 할인가: 수집 실패")
            print(f"✅ 할인율: {_v_result.get('discount_rate')}%" if _v_result.get('discount_rate') else "❌ 할인율: 수집 실패")
            print(f"✅ 이미지 수: {_v_result.get('image_count')}개")
            print(f"✅ 증정품 수: {_v_result.get('gift_count')}개")
            print(f"✅ 수집 시간: {_v_result.get('collected_at')}")
            
            # 이미지 URL 출력 (최대 5개)
            if _v_result.get('product_images'):
                print_separator("상품 이미지 URL (최대 5개)")
                for idx, img_url in enumerate(_v_result.get('product_images')[:5], 1):
                    print(f"{idx}. {img_url}")
            
            # 증정품 정보 출력
            if _v_result.get('gift_info'):
                print_separator("증정품 정보")
                for idx, gift in enumerate(_v_result.get('gift_info'), 1):
                    print(f"{idx}. {gift.get('description')} ({gift.get('type')})")
            
            print_separator("테스트 성공!")
            return True
        else:
            print_separator("테스트 실패!")
            print("❌ 데이터 수집에 실패했습니다.")
            return False
            
    except Exception as e:
        print_separator("테스트 실패!")
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return False
        
    finally:
        # WebDriver 종료
        _v_crawler.close()


def test_data_validation():
    """
    데이터 검증 테스트
    """
    print_separator("데이터 검증 테스트")
    
    # 테스트 URL
    _v_test_url = (
        "https://brand.naver.com/iope/shoppingstory/detail"
        "?id=5002337684&page=1"
    )
    
    # 크롤러 인스턴스 생성
    _v_crawler = NaverSmartstoreProductCrawler(p_headless=False)
    
    try:
        # 상품 정보 수집
        _v_result = _v_crawler.collect_product_data(_v_test_url)
        
        if not _v_result:
            print("❌ 데이터 수집 실패")
            return False
        
        # 필수 필드 검증
        _v_required_fields = [
            'platform',
            'brand',
            'url',
            'product_name',
            'collected_at'
        ]
        
        _v_all_valid = True
        
        print("[필수 필드 검증]")
        for _v_field in _v_required_fields:
            if _v_field in _v_result and _v_result[_v_field]:
                print(f"✅ {_v_field}: OK")
            else:
                print(f"❌ {_v_field}: 누락 또는 빈 값")
                _v_all_valid = False
        
        # 선택 필드 검증
        print("\n[선택 필드 검증]")
        _v_optional_fields = [
            'original_price',
            'discount_price',
            'discount_rate',
            'product_images',
            'gift_info'
        ]
        
        for _v_field in _v_optional_fields:
            if _v_field in _v_result and _v_result[_v_field]:
                if isinstance(_v_result[_v_field], list):
                    print(f"✅ {_v_field}: {len(_v_result[_v_field])}개")
                else:
                    print(f"✅ {_v_field}: {_v_result[_v_field]}")
            else:
                print(f"⚠️  {_v_field}: 수집 안됨 (선택 필드)")
        
        if _v_all_valid:
            print_separator("검증 성공!")
            return True
        else:
            print_separator("검증 실패!")
            return False
            
    except Exception as e:
        print_separator("검증 실패!")
        print(f"❌ 오류 발생: {e}")
        return False
        
    finally:
        # WebDriver 종료
        _v_crawler.close()


def main():
    """
    메인 테스트 함수
    """
    print_separator("네이버 스마트스토어 크롤러 테스트")
    print(f"테스트 시작 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # 테스트 실행
    _v_tests = [
        ("단일 URL 수집 테스트", test_single_url),
        ("데이터 검증 테스트", test_data_validation),
    ]
    
    _v_results = []
    
    for _v_test_name, _v_test_func in _v_tests:
        print(f"\n\n{'#'*80}")
        print(f"# {_v_test_name}")
        print(f"{'#'*80}\n")
        
        try:
            _v_result = _v_test_func()
            _v_results.append((_v_test_name, _v_result))
        except Exception as e:
            print(f"❌ 테스트 실행 중 오류: {e}")
            _v_results.append((_v_test_name, False))
    
    # 최종 결과 출력
    print_separator("전체 테스트 결과")
    
    _v_passed = 0
    _v_failed = 0
    
    for _v_test_name, _v_result in _v_results:
        if _v_result:
            print(f"✅ {_v_test_name}: 성공")
            _v_passed += 1
        else:
            print(f"❌ {_v_test_name}: 실패")
            _v_failed += 1
    
    print(f"\n총 {len(_v_results)}개 테스트 중 {_v_passed}개 성공, {_v_failed}개 실패")
    print(f"테스트 종료 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print_separator()
    
    # 종료 코드 반환
    return 0 if _v_failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())

