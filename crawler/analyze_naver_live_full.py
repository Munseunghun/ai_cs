#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
네이버 쇼핑라이브 전체 정보 분석 스크립트
상품, 쿠폰, 혜택, 댓글, 채팅, FAQ 등 모든 정보 수집
"""

import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

def analyze_full_page(p_url):
    """네이버 쇼핑라이브 전체 정보 분석"""
    
    # Chrome 옵션 설정
    options = Options()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1920,1080')
    options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')
    
    # 드라이버 초기화
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    try:
        print(f"🔍 페이지 로드 중: {p_url}")
        driver.get(p_url)
        time.sleep(8)
        
        # 스크롤하여 모든 콘텐츠 로드
        print("📜 스크롤하여 콘텐츠 로드 중...")
        for i in range(5):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
        
        # 상단으로 스크롤
        driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(2)
        
        # HTML 파싱
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        
        print("\n" + "=" * 80)
        print("📊 전체 정보 분석 결과")
        print("=" * 80)
        
        # 1. 상품 정보
        print("\n1️⃣ 상품 정보:")
        products = soup.select('[class*="product"], [class*="Product"], [class*="item"], [class*="Item"]')
        print(f"   - 상품 관련 요소: {len(products)}개")
        
        # 상품 가격 정보
        prices = soup.select('[class*="price"], [class*="Price"]')
        print(f"   - 가격 정보: {len(prices)}개")
        for price in prices[:5]:
            print(f"     * {price.get_text(strip=True)[:50]}")
        
        # 2. 쿠폰 정보
        print("\n2️⃣ 쿠폰 정보:")
        coupons = soup.select('[class*="coupon"], [class*="Coupon"], [class*="benefit"], [class*="Benefit"]')
        print(f"   - 쿠폰/혜택 요소: {len(coupons)}개")
        for coupon in coupons[:5]:
            text = coupon.get_text(strip=True)
            if text and len(text) > 5:
                print(f"     * {text[:80]}")
        
        # 3. 라이브 소개
        print("\n3️⃣ 라이브 소개:")
        descriptions = soup.select('[class*="description"], [class*="Description"], [class*="intro"], [class*="Intro"]')
        print(f"   - 소개 요소: {len(descriptions)}개")
        for desc in descriptions[:3]:
            text = desc.get_text(strip=True)
            if text and len(text) > 10:
                print(f"     * {text[:100]}")
        
        # 4. 댓글/채팅
        print("\n4️⃣ 댓글/채팅:")
        comments = soup.select('[class*="comment"], [class*="Comment"], [class*="chat"], [class*="Chat"], [class*="message"], [class*="Message"]')
        print(f"   - 댓글/채팅 요소: {len(comments)}개")
        for comment in comments[:5]:
            text = comment.get_text(strip=True)
            if text and len(text) > 3:
                print(f"     * {text[:80]}")
        
        # 5. 버튼 및 액션
        print("\n5️⃣ 버튼 및 액션:")
        buttons = soup.select('button, [role="button"]')
        print(f"   - 버튼: {len(buttons)}개")
        button_texts = set()
        for btn in buttons:
            text = btn.get_text(strip=True)
            if text and len(text) < 30:
                button_texts.add(text)
        for text in sorted(button_texts)[:20]:
            print(f"     * {text}")
        
        # 6. 이미지
        print("\n6️⃣ 이미지:")
        images = soup.select('img')
        print(f"   - 이미지: {len(images)}개")
        for img in images[:5]:
            src = img.get('src', '')
            alt = img.get('alt', '')
            if src:
                print(f"     * {alt[:30] if alt else 'No alt'}: {src[:80]}")
        
        # 7. 데이터 속성
        print("\n7️⃣ 데이터 속성:")
        data_elements = soup.select('[data-product-id], [data-product-no], [data-item-id]')
        print(f"   - 제품 ID 속성: {len(data_elements)}개")
        for elem in data_elements[:5]:
            attrs = {k: v for k, v in elem.attrs.items() if k.startswith('data-')}
            print(f"     * {attrs}")
        
        # 8. JSON 데이터 추출 시도
        print("\n8️⃣ 페이지 내 JSON 데이터:")
        scripts = soup.find_all('script', type='application/json')
        print(f"   - JSON 스크립트: {len(scripts)}개")
        
        for idx, script in enumerate(scripts[:3], 1):
            try:
                data = json.loads(script.string)
                print(f"   JSON {idx}:")
                if isinstance(data, dict):
                    print(f"     키: {list(data.keys())[:10]}")
                elif isinstance(data, list):
                    print(f"     배열 길이: {len(data)}")
            except:
                pass
        
        # 9. 특정 클래스 패턴 검색
        print("\n9️⃣ 주요 클래스 패턴:")
        important_patterns = ['product', 'coupon', 'benefit', 'comment', 'chat', 'faq', 'question']
        for pattern in important_patterns:
            elements = soup.select(f'[class*="{pattern}"], [class*="{pattern.capitalize()}"]')
            if elements:
                print(f"   - {pattern}: {len(elements)}개")
        
        # 10. 메타 정보
        print("\n🔟 메타 정보:")
        title = soup.find('meta', property='og:title')
        desc = soup.find('meta', property='og:description')
        image = soup.find('meta', property='og:image')
        
        if title:
            print(f"   - 제목: {title.get('content', '')[:80]}")
        if desc:
            print(f"   - 설명: {desc.get('content', '')[:80]}")
        if image:
            print(f"   - 이미지: {image.get('content', '')[:80]}")
        
        # HTML 저장
        output_file = '/Users/amore/ai_cs 시스템/crawler/logs/naver_live_full_analysis.html'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"\n💾 전체 HTML 저장: {output_file}")
        
        # 스크린샷
        screenshot_file = '/Users/amore/ai_cs 시스템/crawler/logs/naver_live_screenshot.png'
        driver.save_screenshot(screenshot_file)
        print(f"📸 스크린샷 저장: {screenshot_file}")
        
        print("\n" + "=" * 80)
        
    finally:
        driver.quit()
        print("✅ 브라우저 종료")


if __name__ == '__main__':
    # 샘플 URL
    test_url = "https://view.shoppinglive.naver.com/replays/1744150?fm=shoppinglive&sn=home&tr=lim"
    
    print("🎬 네이버 쇼핑라이브 전체 정보 분석 시작")
    print("=" * 80)
    
    analyze_full_page(test_url)
    
    print("\n✅ 분석 완료!")
