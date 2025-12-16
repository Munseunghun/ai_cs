#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
네이버 스마트스토어 전시 페이지 상품 정보 수집 크롤러

수집 항목:
- 제품 이미지 (썸네일 및 상세 이미지)
- 제품명
- 제품 설명
- 최종혜택가 (원가, 할인가, 할인율)
- 증정품 정보

작성일: 2025-12-16
"""

import os
import sys
import time
import json
import re
from datetime import datetime
from typing import Dict, List, Optional, Any
from urllib.parse import urlparse, parse_qs

# Selenium 관련 임포트
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

# HTML 파싱
from bs4 import BeautifulSoup

# Supabase 클라이언트
from supabase import create_client, Client

# 환경 변수 로드
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# Supabase 설정
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY')

# Supabase 클라이언트 초기화
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


class NaverSmartstoreProductCrawler:
    """
    네이버 스마트스토어 전시 페이지 상품 정보 수집 클래스
    """
    
    def __init__(self, p_headless: bool = False):
        """
        크롤러 초기화
        
        Args:
            p_headless (bool): 헤드리스 모드 사용 여부 (기본값: False)
        """
        self.driver = None
        self.headless = p_headless
        self._init_driver()
    
    def _init_driver(self):
        """
        Selenium WebDriver 초기화
        
        Chrome 옵션 설정:
        - User-Agent 설정 (봇 감지 방지)
        - 이미지 로딩 활성화
        - JavaScript 활성화
        - 헤드리스 모드 옵션
        """
        _v_chrome_options = Options()
        
        # 헤드리스 모드 설정
        if self.headless:
            _v_chrome_options.add_argument('--headless')
        
        # 기본 옵션 설정
        _v_chrome_options.add_argument('--no-sandbox')
        _v_chrome_options.add_argument('--disable-dev-shm-usage')
        _v_chrome_options.add_argument('--disable-gpu')
        _v_chrome_options.add_argument('--window-size=1920,1080')
        
        # User-Agent 설정 (실제 브라우저처럼 보이도록)
        _v_chrome_options.add_argument(
            'user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/120.0.0.0 Safari/537.36'
        )
        
        # 이미지 로딩 활성화 (상품 이미지 수집을 위해 필수)
        _v_prefs = {
            'profile.default_content_setting_values': {
                'images': 1  # 1: 이미지 허용, 2: 이미지 차단
            }
        }
        _v_chrome_options.add_experimental_option('prefs', _v_prefs)
        
        # WebDriver 초기화
        try:
            self.driver = webdriver.Chrome(options=_v_chrome_options)
            print("[INFO] Chrome WebDriver 초기화 완료")
        except Exception as e:
            print(f"[ERROR] WebDriver 초기화 실패: {e}")
            raise
    
    def _scroll_page(self, p_scroll_count: int = 3):
        """
        페이지 스크롤하여 lazy-loaded 이미지 로딩
        
        Args:
            p_scroll_count (int): 스크롤 횟수 (기본값: 3)
        """
        try:
            for i in range(p_scroll_count):
                # 페이지 끝까지 스크롤
                self.driver.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight);"
                )
                time.sleep(1)  # 이미지 로딩 대기
                
                # 중간 지점으로 스크롤
                self.driver.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight / 2);"
                )
                time.sleep(0.5)
            
            # 페이지 상단으로 복귀
            self.driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(1)
            
            print(f"[INFO] 페이지 스크롤 완료 ({p_scroll_count}회)")
        except Exception as e:
            print(f"[WARNING] 페이지 스크롤 중 오류: {e}")
    
    def _extract_product_images(self, p_soup: BeautifulSoup) -> List[str]:
        """
        상품 이미지 URL 추출
        
        Args:
            p_soup (BeautifulSoup): 파싱된 HTML
            
        Returns:
            List[str]: 이미지 URL 리스트
        """
        _v_images = []
        
        try:
            # 1. 메인 상품 이미지 추출 (큰 이미지)
            _v_main_images = p_soup.find_all('img', class_=re.compile(r'.*product.*|.*item.*|.*goods.*', re.I))
            
            for _v_img in _v_main_images:
                _v_img_url = _v_img.get('src') or _v_img.get('data-src')
                if _v_img_url and _v_img_url.startswith('http'):
                    # 중복 제거 및 추가
                    if _v_img_url not in _v_images:
                        _v_images.append(_v_img_url)
            
            # 2. 모든 이미지 태그에서 상품 관련 이미지 추출
            _v_all_images = p_soup.find_all('img')
            
            for _v_img in _v_all_images:
                _v_img_url = _v_img.get('src') or _v_img.get('data-src')
                _v_img_alt = _v_img.get('alt', '')
                
                # 상품 이미지 필터링 (alt 텍스트 또는 URL 패턴 기반)
                if _v_img_url and _v_img_url.startswith('http'):
                    # 광고, 아이콘 등 제외
                    if not any(x in _v_img_url.lower() for x in ['banner', 'logo', 'icon', 'ad']):
                        if _v_img_url not in _v_images:
                            _v_images.append(_v_img_url)
            
            print(f"[INFO] 추출된 이미지 수: {len(_v_images)}개")
            
        except Exception as e:
            print(f"[ERROR] 이미지 추출 중 오류: {e}")
        
        return _v_images
    
    def _extract_product_name(self, p_soup: BeautifulSoup) -> str:
        """
        제품명 추출
        
        Args:
            p_soup (BeautifulSoup): 파싱된 HTML
            
        Returns:
            str: 제품명
        """
        _v_product_name = ""
        
        try:
            # 1. meta 태그에서 추출 (가장 정확)
            _v_meta_title = p_soup.find('meta', property='og:title')
            if _v_meta_title:
                _v_product_name = _v_meta_title.get('content', '')
            
            # 2. h1 태그에서 추출
            if not _v_product_name:
                _v_h1 = p_soup.find('h1')
                if _v_h1:
                    _v_product_name = _v_h1.get_text(strip=True)
            
            # 3. h2 태그에서 추출
            if not _v_product_name:
                _v_h2 = p_soup.find('h2', class_=re.compile(r'.*title.*|.*name.*|.*product.*', re.I))
                if _v_h2:
                    _v_product_name = _v_h2.get_text(strip=True)
            
            # 4. title 태그에서 추출 (최후의 수단)
            if not _v_product_name:
                _v_title = p_soup.find('title')
                if _v_title:
                    _v_product_name = _v_title.get_text(strip=True)
            
            print(f"[INFO] 제품명: {_v_product_name}")
            
        except Exception as e:
            print(f"[ERROR] 제품명 추출 중 오류: {e}")
        
        return _v_product_name
    
    def _extract_product_description(self, p_soup: BeautifulSoup) -> str:
        """
        제품 설명 추출
        
        Args:
            p_soup (BeautifulSoup): 파싱된 HTML
            
        Returns:
            str: 제품 설명
        """
        _v_description = ""
        
        try:
            # 1. meta description에서 추출
            _v_meta_desc = p_soup.find('meta', attrs={'name': 'description'})
            if _v_meta_desc:
                _v_description = _v_meta_desc.get('content', '')
            
            # 2. og:description에서 추출
            if not _v_description:
                _v_og_desc = p_soup.find('meta', property='og:description')
                if _v_og_desc:
                    _v_description = _v_og_desc.get('content', '')
            
            # 3. 상품 설명 영역에서 추출
            if not _v_description:
                _v_desc_div = p_soup.find('div', class_=re.compile(r'.*description.*|.*detail.*|.*info.*', re.I))
                if _v_desc_div:
                    _v_description = _v_desc_div.get_text(strip=True)[:500]  # 최대 500자
            
            print(f"[INFO] 제품 설명: {_v_description[:100]}..." if len(_v_description) > 100 else f"[INFO] 제품 설명: {_v_description}")
            
        except Exception as e:
            print(f"[ERROR] 제품 설명 추출 중 오류: {e}")
        
        return _v_description
    
    def _extract_price_info(self, p_soup: BeautifulSoup) -> Dict[str, Any]:
        """
        가격 정보 추출 (원가, 할인가, 할인율)
        
        Args:
            p_soup (BeautifulSoup): 파싱된 HTML
            
        Returns:
            Dict[str, Any]: 가격 정보 딕셔너리
        """
        _v_price_info = {
            'original_price': None,
            'discount_price': None,
            'discount_rate': None
        }
        
        try:
            # 1. 원가 추출
            _v_original_price_elem = p_soup.find(
                ['span', 'div', 'strong'], 
                class_=re.compile(r'.*original.*|.*regular.*|.*before.*', re.I)
            )
            if _v_original_price_elem:
                _v_original_text = _v_original_price_elem.get_text(strip=True)
                _v_original_price = self._parse_price(_v_original_text)
                _v_price_info['original_price'] = _v_original_price
            
            # 2. 할인가 추출
            _v_discount_price_elem = p_soup.find(
                ['span', 'div', 'strong'], 
                class_=re.compile(r'.*sale.*|.*discount.*|.*price.*', re.I)
            )
            if _v_discount_price_elem:
                _v_discount_text = _v_discount_price_elem.get_text(strip=True)
                _v_discount_price = self._parse_price(_v_discount_text)
                _v_price_info['discount_price'] = _v_discount_price
            
            # 3. 할인율 추출
            _v_discount_rate_elem = p_soup.find(
                ['span', 'div', 'strong'], 
                class_=re.compile(r'.*rate.*|.*percent.*', re.I)
            )
            if _v_discount_rate_elem:
                _v_rate_text = _v_discount_rate_elem.get_text(strip=True)
                _v_discount_rate = self._parse_discount_rate(_v_rate_text)
                _v_price_info['discount_rate'] = _v_discount_rate
            
            # 4. 할인율 계산 (추출 실패 시)
            if not _v_price_info['discount_rate'] and _v_price_info['original_price'] and _v_price_info['discount_price']:
                _v_original = _v_price_info['original_price']
                _v_discount = _v_price_info['discount_price']
                _v_price_info['discount_rate'] = round((_v_original - _v_discount) / _v_original * 100, 1)
            
            print(f"[INFO] 가격 정보: 원가={_v_price_info['original_price']}원, "
                  f"할인가={_v_price_info['discount_price']}원, "
                  f"할인율={_v_price_info['discount_rate']}%")
            
        except Exception as e:
            print(f"[ERROR] 가격 정보 추출 중 오류: {e}")
        
        return _v_price_info
    
    def _parse_price(self, p_price_text: str) -> Optional[int]:
        """
        가격 텍스트를 숫자로 변환
        
        Args:
            p_price_text (str): 가격 텍스트 (예: "95,000원", "80,750원")
            
        Returns:
            Optional[int]: 숫자로 변환된 가격
        """
        try:
            # 숫자만 추출
            _v_numbers = re.findall(r'\d+', p_price_text.replace(',', ''))
            if _v_numbers:
                return int(''.join(_v_numbers))
        except Exception as e:
            print(f"[WARNING] 가격 파싱 실패: {p_price_text}, 오류: {e}")
        
        return None
    
    def _parse_discount_rate(self, p_rate_text: str) -> Optional[float]:
        """
        할인율 텍스트를 숫자로 변환
        
        Args:
            p_rate_text (str): 할인율 텍스트 (예: "15%", "19%")
            
        Returns:
            Optional[float]: 숫자로 변환된 할인율
        """
        try:
            # 숫자만 추출
            _v_match = re.search(r'(\d+(?:\.\d+)?)', p_rate_text)
            if _v_match:
                return float(_v_match.group(1))
        except Exception as e:
            print(f"[WARNING] 할인율 파싱 실패: {p_rate_text}, 오류: {e}")
        
        return None
    
    def _extract_gift_info(self, p_soup: BeautifulSoup) -> List[Dict[str, str]]:
        """
        증정품 정보 추출
        
        Args:
            p_soup (BeautifulSoup): 파싱된 HTML
            
        Returns:
            List[Dict[str, str]]: 증정품 정보 리스트
        """
        _v_gifts = []
        
        try:
            # 1. 증정품 영역 찾기
            _v_gift_sections = p_soup.find_all(
                ['div', 'section', 'ul'], 
                class_=re.compile(r'.*gift.*|.*present.*|.*bonus.*', re.I)
            )
            
            for _v_section in _v_gift_sections:
                # 증정품 아이템 추출
                _v_items = _v_section.find_all(['li', 'div', 'p'])
                
                for _v_item in _v_items:
                    _v_text = _v_item.get_text(strip=True)
                    if _v_text and len(_v_text) > 3:  # 의미 있는 텍스트만
                        _v_gifts.append({
                            'description': _v_text,
                            'type': '증정품'
                        })
            
            # 2. 텍스트에서 증정품 키워드 검색
            _v_all_text = p_soup.get_text()
            _v_gift_patterns = [
                r'증정품[:\s]*([^\n]+)',
                r'사은품[:\s]*([^\n]+)',
                r'무료 증정[:\s]*([^\n]+)',
                r'구매 시[:\s]*([^\n]+증정)',
            ]
            
            for _v_pattern in _v_gift_patterns:
                _v_matches = re.findall(_v_pattern, _v_all_text)
                for _v_match in _v_matches:
                    if _v_match.strip() and len(_v_match.strip()) > 3:
                        _v_gifts.append({
                            'description': _v_match.strip(),
                            'type': '증정품'
                        })
            
            # 중복 제거
            _v_unique_gifts = []
            _v_seen = set()
            for _v_gift in _v_gifts:
                _v_desc = _v_gift['description']
                if _v_desc not in _v_seen:
                    _v_seen.add(_v_desc)
                    _v_unique_gifts.append(_v_gift)
            
            print(f"[INFO] 추출된 증정품 수: {len(_v_unique_gifts)}개")
            
        except Exception as e:
            print(f"[ERROR] 증정품 정보 추출 중 오류: {e}")
        
        return _v_unique_gifts
    
    def collect_product_data(self, p_url: str) -> Optional[Dict[str, Any]]:
        """
        네이버 스마트스토어 상품 정보 수집
        
        Args:
            p_url (str): 네이버 스마트스토어 URL
            
        Returns:
            Optional[Dict[str, Any]]: 수집된 상품 정보 딕셔너리
        """
        print(f"\n{'='*80}")
        print(f"[START] 상품 정보 수집 시작")
        print(f"[URL] {p_url}")
        print(f"{'='*80}\n")
        
        try:
            # 1. 페이지 접속
            print("[STEP 1] 페이지 접속 중...")
            self.driver.get(p_url)
            
            # 2. 페이지 로딩 대기
            print("[STEP 2] 페이지 로딩 대기 중...")
            time.sleep(3)  # 초기 로딩 대기
            
            # 3. 페이지 스크롤 (lazy-loaded 이미지 로딩)
            print("[STEP 3] 페이지 스크롤 중...")
            self._scroll_page(scroll_count=3)
            
            # 4. HTML 파싱
            print("[STEP 4] HTML 파싱 중...")
            _v_page_source = self.driver.page_source
            _v_soup = BeautifulSoup(_v_page_source, 'html.parser')
            
            # 5. 데이터 추출
            print("[STEP 5] 데이터 추출 중...")
            
            # 5-1. 제품 이미지
            print("\n[5-1] 제품 이미지 추출...")
            _v_product_images = self._extract_product_images(_v_soup)
            
            # 5-2. 제품명
            print("\n[5-2] 제품명 추출...")
            _v_product_name = self._extract_product_name(_v_soup)
            
            # 5-3. 제품 설명
            print("\n[5-3] 제품 설명 추출...")
            _v_product_description = self._extract_product_description(_v_soup)
            
            # 5-4. 가격 정보
            print("\n[5-4] 가격 정보 추출...")
            _v_price_info = self._extract_price_info(_v_soup)
            
            # 5-5. 증정품 정보
            print("\n[5-5] 증정품 정보 추출...")
            _v_gift_info = self._extract_gift_info(_v_soup)
            
            # 6. 데이터 구조화
            print("\n[STEP 6] 데이터 구조화 중...")
            _v_collected_data = {
                'platform': '네이버스마트스토어',
                'brand': '아이오페',
                'url': p_url,
                'product_name': _v_product_name,
                'product_description': _v_product_description,
                'original_price': _v_price_info['original_price'],
                'discount_price': _v_price_info['discount_price'],
                'discount_rate': _v_price_info['discount_rate'],
                'product_images': _v_product_images,
                'gift_info': _v_gift_info,
                'collected_at': datetime.now().isoformat(),
                'image_count': len(_v_product_images),
                'gift_count': len(_v_gift_info)
            }
            
            # 7. Supabase 저장
            print("\n[STEP 7] Supabase 저장 중...")
            self._save_to_supabase(_v_collected_data)
            
            # 8. 결과 출력
            print("\n" + "="*80)
            print("[SUCCESS] 상품 정보 수집 완료!")
            print(f"제품명: {_v_product_name}")
            print(f"이미지 수: {len(_v_product_images)}개")
            print(f"증정품 수: {len(_v_gift_info)}개")
            print(f"원가: {_v_price_info['original_price']}원")
            print(f"할인가: {_v_price_info['discount_price']}원")
            print(f"할인율: {_v_price_info['discount_rate']}%")
            print("="*80 + "\n")
            
            return _v_collected_data
            
        except Exception as e:
            print(f"\n[ERROR] 상품 정보 수집 중 오류 발생: {e}")
            import traceback
            traceback.print_exc()
            return None
    
    def _save_to_supabase(self, p_data: Dict[str, Any]):
        """
        수집된 데이터를 Supabase에 저장
        
        Args:
            p_data (Dict[str, Any]): 저장할 데이터
        """
        try:
            # 테이블명: naver_smartstore_products
            _v_response = supabase.table('naver_smartstore_products').insert(p_data).execute()
            
            print(f"[INFO] Supabase 저장 완료: {len(_v_response.data)}개 레코드")
            
        except Exception as e:
            print(f"[ERROR] Supabase 저장 중 오류: {e}")
            # 저장 실패해도 크롤링은 계속 진행
    
    def close(self):
        """
        WebDriver 종료
        """
        if self.driver:
            self.driver.quit()
            print("[INFO] WebDriver 종료 완료")


def main():
    """
    메인 실행 함수
    """
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
    
    # 크롤러 인스턴스 생성
    _v_crawler = NaverSmartstoreProductCrawler(p_headless=False)
    
    try:
        # 상품 정보 수집
        _v_result = _v_crawler.collect_product_data(_v_test_url)
        
        # 결과를 JSON 파일로 저장
        if _v_result:
            _v_output_file = f"naver_smartstore_product_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(_v_output_file, 'w', encoding='utf-8') as f:
                json.dump(_v_result, f, ensure_ascii=False, indent=2)
            print(f"[INFO] 결과 파일 저장: {_v_output_file}")
        
    finally:
        # WebDriver 종료
        _v_crawler.close()


if __name__ == "__main__":
    main()

