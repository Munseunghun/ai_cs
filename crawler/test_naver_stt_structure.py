#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
네이버 쇼핑라이브 페이지 구조 분석 스크립트
실제 페이지에서 STT 관련 정보가 어디에 있는지 확인
"""

import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import json

def analyze_naver_live_page(p_url):
    """네이버 쇼핑라이브 페이지 구조 분석"""
    
    # Chrome 옵션 설정
    options = Options()
    # headless 모드 비활성화 (디버깅용)
    # options.add_argument('--headless')
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
        time.sleep(5)
        
        # 스크롤하여 모든 콘텐츠 로드
        print("📜 스크롤하여 콘텐츠 로드 중...")
        for i in range(5):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
        
        # HTML 파싱
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        
        print("\n" + "=" * 80)
        print("📊 페이지 구조 분석 결과")
        print("=" * 80)
        
        # 1. 모든 클래스명 수집
        print("\n1️⃣ 주요 클래스명:")
        all_classes = set()
        for element in soup.find_all(class_=True):
            classes = element.get('class', [])
            all_classes.update(classes)
        
        # STT 관련 키워드로 필터링
        stt_keywords = ['timeline', 'chapter', 'comment', 'chat', 'message', 'qa', 'question', 
                        'answer', 'highlight', 'key', 'important', 'product', 'item', 'host', 
                        'presenter', 'reaction', 'like', 'heart', 'time', 'stamp']
        
        relevant_classes = [cls for cls in all_classes if any(keyword in cls.lower() for keyword in stt_keywords)]
        for cls in sorted(relevant_classes)[:30]:
            print(f"   - {cls}")
        
        # 2. 데이터 속성 확인
        print("\n2️⃣ 데이터 속성 (data-*):")
        data_attrs = set()
        for element in soup.find_all():
            for attr in element.attrs:
                if attr.startswith('data-'):
                    data_attrs.add(attr)
        
        for attr in sorted(data_attrs)[:20]:
            print(f"   - {attr}")
        
        # 3. 비디오 관련 요소
        print("\n3️⃣ 비디오 관련 요소:")
        video_elements = soup.find_all(['video', 'iframe'])
        print(f"   - 비디오 요소: {len(video_elements)}개")
        for video in video_elements[:3]:
            print(f"     * {video.name}: {video.get('src', 'N/A')[:80]}")
        
        # 4. 스크립트 태그에서 JSON 데이터 찾기
        print("\n4️⃣ 스크립트 내 JSON 데이터:")
        scripts = soup.find_all('script')
        for script in scripts:
            script_text = script.string
            if script_text and ('timeline' in script_text.lower() or 'product' in script_text.lower() or 'chat' in script_text.lower()):
                # JSON 패턴 찾기
                import re
                json_patterns = re.findall(r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', script_text)
                if json_patterns:
                    print(f"   - JSON 데이터 발견: {len(json_patterns)}개")
                    for pattern in json_patterns[:2]:
                        if len(pattern) < 200:
                            print(f"     * {pattern[:100]}...")
        
        # 5. 텍스트 콘텐츠 샘플
        print("\n5️⃣ 텍스트 콘텐츠 샘플:")
        
        # 제목
        title_candidates = soup.select('h1, h2, [class*="title"]')
        if title_candidates:
            print(f"   제목: {title_candidates[0].get_text(strip=True)[:100]}")
        
        # 설명
        desc_candidates = soup.select('[class*="description"], [class*="desc"]')
        if desc_candidates:
            print(f"   설명: {desc_candidates[0].get_text(strip=True)[:100]}")
        
        # 6. 메타 정보
        print("\n6️⃣ 메타 정보:")
        meta_tags = soup.find_all('meta')
        for meta in meta_tags:
            property_name = meta.get('property') or meta.get('name')
            content = meta.get('content')
            if property_name and content and any(keyword in property_name.lower() for keyword in ['title', 'description', 'image']):
                print(f"   - {property_name}: {content[:80]}")
        
        # 7. 구조화된 데이터 (JSON-LD)
        print("\n7️⃣ 구조화된 데이터 (JSON-LD):")
        json_ld_scripts = soup.find_all('script', type='application/ld+json')
        for script in json_ld_scripts:
            try:
                data = json.loads(script.string)
                print(f"   - 타입: {data.get('@type', 'Unknown')}")
                if 'name' in data:
                    print(f"     이름: {data['name'][:80]}")
                if 'description' in data:
                    print(f"     설명: {data['description'][:80]}")
            except:
                pass
        
        # 8. 페이지 전체 HTML 저장 (디버깅용)
        output_file = '/Users/amore/ai_cs 시스템/crawler/logs/naver_live_page_structure.html'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"\n💾 전체 HTML 저장: {output_file}")
        
        print("\n" + "=" * 80)
        
    finally:
        driver.quit()
        print("✅ 브라우저 종료")


if __name__ == '__main__':
    # 테스트할 URL (실제 네이버 쇼핑라이브 URL로 변경)
    test_url = "https://view.shoppinglive.naver.com/replays/1775352"
    
    print("🎬 네이버 쇼핑라이브 페이지 구조 분석 시작")
    print("=" * 80)
    
    analyze_naver_live_page(test_url)
    
    print("\n✅ 분석 완료!")
