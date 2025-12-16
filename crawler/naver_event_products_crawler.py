#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
네이버 스마트스토어 이벤트 페이지 전체 상품 수집 크롤러

기능:
- 이벤트 페이지의 모든 상품 정보 수집
- 각 상품별 이미지, 제품명, 설명, 가격, 증정품 정보 수집
- HTML 형식으로 시각화 출력

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


class NaverEventProductsCrawler:
    """
    네이버 스마트스토어 이벤트 페이지 전체 상품 수집 클래스
    """
    
    def __init__(self, p_headless: bool = False):
        """
        크롤러 초기화
        
        Args:
            p_headless (bool): 헤드리스 모드 사용 여부
        """
        self.driver = None
        self.headless = p_headless
        self._init_driver()
    
    def _init_driver(self):
        """
        Selenium WebDriver 초기화
        """
        _v_chrome_options = Options()
        
        if self.headless:
            _v_chrome_options.add_argument('--headless')
        
        _v_chrome_options.add_argument('--no-sandbox')
        _v_chrome_options.add_argument('--disable-dev-shm-usage')
        _v_chrome_options.add_argument('--disable-gpu')
        _v_chrome_options.add_argument('--window-size=1920,1080')
        
        _v_chrome_options.add_argument(
            'user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/120.0.0.0 Safari/537.36'
        )
        
        _v_prefs = {
            'profile.default_content_setting_values': {
                'images': 1
            }
        }
        _v_chrome_options.add_experimental_option('prefs', _v_prefs)
        
        try:
            self.driver = webdriver.Chrome(options=_v_chrome_options)
            print("[INFO] Chrome WebDriver 초기화 완료")
        except Exception as e:
            print(f"[ERROR] WebDriver 초기화 실패: {e}")
            raise
    
    def _scroll_page(self, p_scroll_count: int = 5):
        """
        페이지 스크롤하여 모든 상품 로딩
        
        Args:
            p_scroll_count (int): 스크롤 횟수
        """
        try:
            for i in range(p_scroll_count):
                self.driver.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight);"
                )
                time.sleep(1.5)
                
                self.driver.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight / 2);"
                )
                time.sleep(0.5)
            
            self.driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(1)
            
            print(f"[INFO] 페이지 스크롤 완료 ({p_scroll_count}회)")
        except Exception as e:
            print(f"[WARNING] 페이지 스크롤 중 오류: {e}")
    
    def _extract_product_items(self, p_soup: BeautifulSoup) -> List[BeautifulSoup]:
        """
        페이지에서 모든 상품 아이템 추출
        
        Args:
            p_soup (BeautifulSoup): 파싱된 HTML
            
        Returns:
            List[BeautifulSoup]: 상품 아이템 리스트
        """
        _v_product_items = []
        
        try:
            # 다양한 패턴으로 상품 아이템 찾기
            _v_patterns = [
                {'name': 'div', 'class': re.compile(r'.*product.*item.*', re.I)},
                {'name': 'div', 'class': re.compile(r'.*goods.*item.*', re.I)},
                {'name': 'li', 'class': re.compile(r'.*product.*', re.I)},
                {'name': 'article', 'class': re.compile(r'.*product.*', re.I)},
            ]
            
            for _v_pattern in _v_patterns:
                _v_items = p_soup.find_all(_v_pattern['name'], class_=_v_pattern['class'])
                if _v_items:
                    _v_product_items.extend(_v_items)
                    print(f"[INFO] {len(_v_items)}개 상품 아이템 발견 (패턴: {_v_pattern})")
            
            # 중복 제거
            _v_unique_items = []
            _v_seen = set()
            for _v_item in _v_product_items:
                _v_item_html = str(_v_item)[:100]  # 처음 100자로 중복 체크
                if _v_item_html not in _v_seen:
                    _v_seen.add(_v_item_html)
                    _v_unique_items.append(_v_item)
            
            print(f"[INFO] 총 {len(_v_unique_items)}개 고유 상품 아이템 추출")
            
        except Exception as e:
            print(f"[ERROR] 상품 아이템 추출 중 오류: {e}")
        
        return _v_unique_items
    
    def _extract_product_image(self, p_item: BeautifulSoup) -> str:
        """
        상품 이미지 URL 추출
        
        Args:
            p_item (BeautifulSoup): 상품 아이템
            
        Returns:
            str: 이미지 URL
        """
        try:
            _v_img = p_item.find('img')
            if _v_img:
                _v_img_url = _v_img.get('src') or _v_img.get('data-src')
                if _v_img_url:
                    return _v_img_url
        except Exception as e:
            print(f"[WARNING] 이미지 추출 실패: {e}")
        
        return ""
    
    def _extract_product_name(self, p_item: BeautifulSoup) -> str:
        """
        제품명 추출
        
        Args:
            p_item (BeautifulSoup): 상품 아이템
            
        Returns:
            str: 제품명
        """
        try:
            # 다양한 패턴으로 제품명 찾기
            _v_name_elem = p_item.find(['h2', 'h3', 'h4', 'strong', 'span'], 
                                       class_=re.compile(r'.*name.*|.*title.*|.*product.*', re.I))
            if _v_name_elem:
                return _v_name_elem.get_text(strip=True)
            
            # alt 속성에서 찾기
            _v_img = p_item.find('img')
            if _v_img and _v_img.get('alt'):
                return _v_img.get('alt')
            
        except Exception as e:
            print(f"[WARNING] 제품명 추출 실패: {e}")
        
        return "제품명 없음"
    
    def _extract_product_description(self, p_item: BeautifulSoup) -> str:
        """
        제품 설명 추출
        
        Args:
            p_item (BeautifulSoup): 상품 아이템
            
        Returns:
            str: 제품 설명
        """
        try:
            _v_desc_elem = p_item.find(['p', 'div', 'span'], 
                                       class_=re.compile(r'.*desc.*|.*info.*|.*detail.*', re.I))
            if _v_desc_elem:
                _v_desc = _v_desc_elem.get_text(strip=True)
                return _v_desc[:200]  # 최대 200자
        except Exception as e:
            print(f"[WARNING] 제품 설명 추출 실패: {e}")
        
        return ""
    
    def _extract_price_info(self, p_item: BeautifulSoup) -> Dict[str, Any]:
        """
        가격 정보 추출
        
        Args:
            p_item (BeautifulSoup): 상품 아이템
            
        Returns:
            Dict[str, Any]: 가격 정보
        """
        _v_price_info = {
            'original_price': None,
            'discount_price': None,
            'final_price': None,
            'discount_rate': None,
            'final_discount_rate': None
        }
        
        try:
            # 모든 가격 관련 요소 찾기
            _v_price_elements = p_item.find_all(['span', 'strong', 'em'], 
                                                class_=re.compile(r'.*price.*|.*won.*', re.I))
            
            _v_prices = []
            for _v_elem in _v_price_elements:
                _v_text = _v_elem.get_text(strip=True)
                _v_price = self._parse_price(_v_text)
                if _v_price:
                    _v_prices.append(_v_price)
            
            # 가격 정렬 (높은 순)
            _v_prices = sorted(set(_v_prices), reverse=True)
            
            if len(_v_prices) >= 3:
                _v_price_info['original_price'] = _v_prices[0]
                _v_price_info['discount_price'] = _v_prices[1]
                _v_price_info['final_price'] = _v_prices[2]
            elif len(_v_prices) == 2:
                _v_price_info['original_price'] = _v_prices[0]
                _v_price_info['final_price'] = _v_prices[1]
            elif len(_v_prices) == 1:
                _v_price_info['final_price'] = _v_prices[0]
            
            # 할인율 추출
            _v_rate_elements = p_item.find_all(['span', 'em'], 
                                               class_=re.compile(r'.*rate.*|.*percent.*', re.I))
            
            _v_rates = []
            for _v_elem in _v_rate_elements:
                _v_text = _v_elem.get_text(strip=True)
                _v_rate = self._parse_discount_rate(_v_text)
                if _v_rate:
                    _v_rates.append(_v_rate)
            
            if len(_v_rates) >= 2:
                _v_price_info['discount_rate'] = _v_rates[0]
                _v_price_info['final_discount_rate'] = _v_rates[1]
            elif len(_v_rates) == 1:
                _v_price_info['final_discount_rate'] = _v_rates[0]
            
            # 할인율 계산 (추출 실패 시)
            if not _v_price_info['discount_rate'] and _v_price_info['original_price'] and _v_price_info['discount_price']:
                _v_price_info['discount_rate'] = round(
                    (_v_price_info['original_price'] - _v_price_info['discount_price']) / 
                    _v_price_info['original_price'] * 100, 1
                )
            
            if not _v_price_info['final_discount_rate'] and _v_price_info['original_price'] and _v_price_info['final_price']:
                _v_price_info['final_discount_rate'] = round(
                    (_v_price_info['original_price'] - _v_price_info['final_price']) / 
                    _v_price_info['original_price'] * 100, 1
                )
            
        except Exception as e:
            print(f"[WARNING] 가격 정보 추출 실패: {e}")
        
        return _v_price_info
    
    def _parse_price(self, p_price_text: str) -> Optional[int]:
        """
        가격 텍스트를 숫자로 변환
        
        Args:
            p_price_text (str): 가격 텍스트
            
        Returns:
            Optional[int]: 숫자로 변환된 가격
        """
        try:
            _v_numbers = re.findall(r'\d+', p_price_text.replace(',', ''))
            if _v_numbers:
                return int(''.join(_v_numbers))
        except Exception:
            pass
        return None
    
    def _parse_discount_rate(self, p_rate_text: str) -> Optional[float]:
        """
        할인율 텍스트를 숫자로 변환
        
        Args:
            p_rate_text (str): 할인율 텍스트
            
        Returns:
            Optional[float]: 숫자로 변환된 할인율
        """
        try:
            _v_match = re.search(r'(\d+(?:\.\d+)?)', p_rate_text)
            if _v_match:
                return float(_v_match.group(1))
        except Exception:
            pass
        return None
    
    def _extract_gift_info(self, p_item: BeautifulSoup) -> str:
        """
        증정품 정보 추출
        
        Args:
            p_item (BeautifulSoup): 상품 아이템
            
        Returns:
            str: 증정품 정보
        """
        try:
            _v_gift_elem = p_item.find(['span', 'div', 'p'], 
                                       class_=re.compile(r'.*gift.*|.*present.*|.*증정.*', re.I))
            if _v_gift_elem:
                return _v_gift_elem.get_text(strip=True)
            
            # 텍스트에서 증정품 키워드 찾기
            _v_text = p_item.get_text()
            if '증정품' in _v_text or '사은품' in _v_text:
                return "증정품 있음"
            
        except Exception as e:
            print(f"[WARNING] 증정품 정보 추출 실패: {e}")
        
        return ""
    
    def collect_event_products(self, p_url: str) -> List[Dict[str, Any]]:
        """
        이벤트 페이지의 모든 상품 정보 수집
        
        Args:
            p_url (str): 이벤트 페이지 URL
            
        Returns:
            List[Dict[str, Any]]: 수집된 상품 정보 리스트
        """
        print(f"\n{'='*80}")
        print(f"[START] 이벤트 상품 수집 시작")
        print(f"[URL] {p_url}")
        print(f"{'='*80}\n")
        
        _v_products = []
        
        try:
            # 페이지 접속
            print("[STEP 1] 페이지 접속 중...")
            self.driver.get(p_url)
            time.sleep(3)
            
            # 페이지 스크롤
            print("[STEP 2] 페이지 스크롤 중...")
            self._scroll_page(scroll_count=5)
            
            # HTML 파싱
            print("[STEP 3] HTML 파싱 중...")
            _v_page_source = self.driver.page_source
            _v_soup = BeautifulSoup(_v_page_source, 'html.parser')
            
            # 상품 아이템 추출
            print("[STEP 4] 상품 아이템 추출 중...")
            _v_product_items = self._extract_product_items(_v_soup)
            
            if not _v_product_items:
                print("[WARNING] 상품 아이템을 찾을 수 없습니다.")
                return []
            
            # 각 상품 정보 추출
            print(f"[STEP 5] {len(_v_product_items)}개 상품 정보 추출 중...")
            
            for idx, _v_item in enumerate(_v_product_items, 1):
                print(f"\n[상품 {idx}/{len(_v_product_items)}] 추출 중...")
                
                _v_product = {
                    'product_number': idx,
                    'product_image': self._extract_product_image(_v_item),
                    'product_name': self._extract_product_name(_v_item),
                    'product_description': self._extract_product_description(_v_item),
                    'gift_info': self._extract_gift_info(_v_item),
                    'collected_at': datetime.now().isoformat()
                }
                
                # 가격 정보 추가
                _v_price_info = self._extract_price_info(_v_item)
                _v_product.update(_v_price_info)
                
                _v_products.append(_v_product)
                
                print(f"  ✅ 제품명: {_v_product['product_name']}")
                print(f"  ✅ 최종가: {_v_product['final_price']:,}원" if _v_product['final_price'] else "  ❌ 가격 정보 없음")
            
            print(f"\n{'='*80}")
            print(f"[SUCCESS] 총 {len(_v_products)}개 상품 수집 완료!")
            print(f"{'='*80}\n")
            
            return _v_products
            
        except Exception as e:
            print(f"\n[ERROR] 상품 수집 중 오류 발생: {e}")
            import traceback
            traceback.print_exc()
            return []
    
    def generate_html_view(self, p_products: List[Dict[str, Any]], p_output_file: str = None) -> str:
        """
        수집된 상품 정보를 HTML로 시각화
        
        Args:
            p_products (List[Dict[str, Any]]): 상품 정보 리스트
            p_output_file (str): 출력 파일명 (선택)
            
        Returns:
            str: HTML 문자열
        """
        _v_html = """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>네이버 스마트스토어 이벤트 상품</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .header {
            background: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header h1 {
            font-size: 28px;
            color: #333;
            margin-bottom: 10px;
        }
        
        .header p {
            color: #666;
            font-size: 14px;
        }
        
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
            gap: 30px;
        }
        
        .product-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        
        .product-image {
            width: 100%;
            height: 400px;
            object-fit: cover;
            background: #f0f0f0;
        }
        
        .product-info {
            padding: 25px;
        }
        
        .product-name {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
            line-height: 1.4;
        }
        
        .product-description {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .price-section {
            margin-bottom: 15px;
        }
        
        .price-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .price-label {
            font-size: 14px;
            color: #999;
            text-decoration: line-through;
        }
        
        .price-label.discount {
            color: #333;
            text-decoration: none;
        }
        
        .price-label.final {
            color: #ff0000;
            font-weight: bold;
            text-decoration: none;
        }
        
        .price-value {
            font-size: 18px;
            font-weight: bold;
        }
        
        .price-value.original {
            color: #999;
            text-decoration: line-through;
        }
        
        .price-value.discount {
            color: #333;
        }
        
        .price-value.final {
            color: #ff0000;
            font-size: 24px;
        }
        
        .discount-badge {
            display: inline-block;
            background: #666;
            color: white;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin-left: 10px;
        }
        
        .discount-badge.final {
            background: #ff0000;
        }
        
        .gift-info {
            background: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 12px 15px;
            margin-top: 15px;
            border-radius: 4px;
        }
        
        .gift-label {
            font-size: 12px;
            color: #ff9800;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .gift-text {
            font-size: 14px;
            color: #666;
        }
        
        .no-image {
            width: 100%;
            height: 400px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
        }
        
        .footer {
            text-align: center;
            padding: 30px;
            color: #999;
            font-size: 14px;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛍️ 네이버 스마트스토어 이벤트 상품</h1>
            <p>수집 일시: """ + datetime.now().strftime('%Y년 %m월 %d일 %H:%M:%S') + """</p>
            <p>총 상품 수: """ + str(len(p_products)) + """개</p>
        </div>
        
        <div class="products-grid">
"""
        
        # 각 상품 카드 생성
        for _v_product in p_products:
            _v_html += f"""
            <div class="product-card">
"""
            
            # 상품 이미지
            if _v_product.get('product_image'):
                _v_html += f"""
                <img src="{_v_product['product_image']}" alt="{_v_product['product_name']}" class="product-image">
"""
            else:
                _v_html += """
                <div class="no-image">이미지 없음</div>
"""
            
            # 상품 정보
            _v_html += f"""
                <div class="product-info">
                    <h2 class="product-name">{_v_product['product_name']}</h2>
"""
            
            # 상품 설명
            if _v_product.get('product_description'):
                _v_html += f"""
                    <p class="product-description">{_v_product['product_description']}</p>
"""
            
            # 가격 정보
            _v_html += """
                    <div class="price-section">
"""
            
            # 원가
            if _v_product.get('original_price'):
                _v_html += f"""
                        <div class="price-row">
                            <span class="price-label">정상가</span>
                            <span class="price-value original">{_v_product['original_price']:,}원</span>
                        </div>
"""
            
            # 할인가
            if _v_product.get('discount_price'):
                _v_discount_rate = _v_product.get('discount_rate', '')
                _v_rate_badge = f'<span class="discount-badge">{_v_discount_rate}%</span>' if _v_discount_rate else ''
                _v_html += f"""
                        <div class="price-row">
                            <span class="price-label discount">할인가</span>
                            <span class="price-value discount">{_v_product['discount_price']:,}원{_v_rate_badge}</span>
                        </div>
"""
            
            # 최종혜택가
            if _v_product.get('final_price'):
                _v_final_rate = _v_product.get('final_discount_rate', '')
                _v_final_badge = f'<span class="discount-badge final">{_v_final_rate}%</span>' if _v_final_rate else ''
                _v_html += f"""
                        <div class="price-row">
                            <span class="price-label final">최종혜택가</span>
                            <span class="price-value final">{_v_product['final_price']:,}원{_v_final_badge}</span>
                        </div>
"""
            
            _v_html += """
                    </div>
"""
            
            # 증정품 정보
            if _v_product.get('gift_info'):
                _v_html += f"""
                    <div class="gift-info">
                        <div class="gift-label">🎁 증정품</div>
                        <div class="gift-text">{_v_product['gift_info']}</div>
                    </div>
"""
            
            _v_html += """
                </div>
            </div>
"""
        
        # HTML 마무리
        _v_html += """
        </div>
        
        <div class="footer">
            <p>© 2025 Amore Pacific. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
"""
        
        # 파일 저장
        if p_output_file:
            with open(p_output_file, 'w', encoding='utf-8') as f:
                f.write(_v_html)
            print(f"[INFO] HTML 파일 저장: {p_output_file}")
        
        return _v_html
    
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
        "?id=5002337684&page=1"
    )
    
    # 크롤러 인스턴스 생성
    _v_crawler = NaverEventProductsCrawler(p_headless=False)
    
    try:
        # 상품 정보 수집
        _v_products = _v_crawler.collect_event_products(_v_test_url)
        
        if _v_products:
            # JSON 파일 저장
            _v_json_file = f"event_products_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(_v_json_file, 'w', encoding='utf-8') as f:
                json.dump(_v_products, f, ensure_ascii=False, indent=2)
            print(f"[INFO] JSON 파일 저장: {_v_json_file}")
            
            # HTML 파일 생성
            _v_html_file = f"event_products_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"
            _v_crawler.generate_html_view(_v_products, _v_html_file)
            print(f"[INFO] HTML 파일 저장: {_v_html_file}")
            print(f"[INFO] 브라우저에서 열기: open {_v_html_file}")
        
    finally:
        # WebDriver 종료
        _v_crawler.close()


if __name__ == "__main__":
    main()

