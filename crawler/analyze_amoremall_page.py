#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
아모레몰 페이지 구조 분석 스크립트
"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

def analyze_page():
    """아모레몰 페이지 구조 분석"""
    
    # ChromeDriver 설정
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1920,1080')
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    
    try:
        url = "https://www.amoremall.com/kr/ko/display/live/playerweb?sy_id=678f729865cf422cde50d959&sy_type=broadcast"
        print(f"페이지 로딩: {url}")
        
        driver.get(url)
        time.sleep(10)  # 충분한 로딩 시간
        
        # 페이지 소스 저장
        with open('amoremall_page_source.html', 'w', encoding='utf-8') as f:
            f.write(driver.page_source)
        print("✅ 페이지 소스 저장: amoremall_page_source.html")
        
        # 스크린샷 저장
        driver.save_screenshot('amoremall_screenshot.png')
        print("✅ 스크린샷 저장: amoremall_screenshot.png")
        
        # BeautifulSoup으로 파싱
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        
        print("\n" + "=" * 80)
        print("📋 페이지 구조 분석")
        print("=" * 80)
        
        # 1. 제목 찾기
        print("\n1. 제목 후보:")
        for tag in ['h1', 'h2', 'h3']:
            elements = soup.find_all(tag)
            for elem in elements[:3]:
                text = elem.get_text(strip=True)
                if text:
                    print(f"   - {tag}: {text[:100]}")
        
        # 2. 클래스명 분석
        print("\n2. 주요 클래스명:")
        all_classes = set()
        for elem in soup.find_all(class_=True):
            for cls in elem.get('class', []):
                if any(keyword in cls.lower() for keyword in ['product', 'goods', 'item', 'coupon', 'benefit', 'comment', 'reply', 'faq']):
                    all_classes.add(cls)
        
        for cls in sorted(all_classes)[:20]:
            print(f"   - {cls}")
        
        # 3. 상품 관련 요소
        print("\n3. 상품 관련 요소:")
        product_keywords = ['product', 'goods', 'item']
        for keyword in product_keywords:
            elements = soup.find_all(class_=lambda x: x and keyword in x.lower())
            if elements:
                print(f"   - .{keyword}*: {len(elements)}개 발견")
                if elements:
                    print(f"     예시 클래스: {elements[0].get('class')}")
        
        # 4. 혜택/쿠폰 관련 요소
        print("\n4. 혜택/쿠폰 관련 요소:")
        benefit_keywords = ['coupon', 'benefit', 'promotion']
        for keyword in benefit_keywords:
            elements = soup.find_all(class_=lambda x: x and keyword in x.lower())
            if elements:
                print(f"   - .{keyword}*: {len(elements)}개 발견")
        
        # 5. FAQ 관련 요소
        print("\n5. FAQ 관련 요소:")
        faq_keywords = ['faq', 'qa', 'question']
        for keyword in faq_keywords:
            elements = soup.find_all(class_=lambda x: x and keyword in x.lower())
            if elements:
                print(f"   - .{keyword}*: {len(elements)}개 발견")
        
        # 6. 댓글 관련 요소
        print("\n6. 댓글 관련 요소:")
        comment_keywords = ['comment', 'reply', 'review']
        for keyword in comment_keywords:
            elements = soup.find_all(class_=lambda x: x and keyword in x.lower())
            if elements:
                print(f"   - .{keyword}*: {len(elements)}개 발견")
        
        # 7. 모든 텍스트 추출 (샘플)
        print("\n7. 페이지 주요 텍스트 (처음 20줄):")
        all_text = soup.get_text(separator='\n', strip=True)
        lines = [line for line in all_text.split('\n') if line.strip()]
        for line in lines[:20]:
            if len(line) > 5:  # 짧은 텍스트 제외
                print(f"   {line[:100]}")
        
        # 8. iframe 확인
        print("\n8. iframe 확인:")
        iframes = driver.find_elements(By.TAG_NAME, 'iframe')
        print(f"   - iframe 개수: {len(iframes)}개")
        for idx, iframe in enumerate(iframes, 1):
            src = iframe.get_attribute('src')
            print(f"   - iframe {idx}: {src}")
        
        print("\n" + "=" * 80)
        print("✅ 분석 완료")
        print("=" * 80)
        
    finally:
        driver.quit()


if __name__ == "__main__":
    analyze_page()

