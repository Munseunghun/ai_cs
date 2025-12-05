#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
네이버 쇼핑라이브 API 분석 스크립트
네트워크 요청을 캡처하여 STT 정보를 가져오는 API 엔드포인트 찾기
"""

import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from webdriver_manager.chrome import ChromeDriverManager

def analyze_naver_api(p_url):
    """네이버 쇼핑라이브 API 요청 분석"""
    
    # Chrome 옵션 설정
    options = Options()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1920,1080')
    
    # 네트워크 로그 활성화
    capabilities = DesiredCapabilities.CHROME
    capabilities['goog:loggingPrefs'] = {'performance': 'ALL'}
    
    # 드라이버 초기화
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options, desired_capabilities=capabilities)
    
    try:
        print(f"🔍 페이지 로드 중: {p_url}")
        driver.get(p_url)
        time.sleep(10)  # API 요청이 완료될 때까지 대기
        
        # 스크롤하여 추가 API 호출 유도
        print("📜 스크롤하여 추가 API 호출 유도...")
        for i in range(3):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
        
        # 네트워크 로그 수집
        print("\n" + "=" * 80)
        print("📡 네트워크 요청 분석")
        print("=" * 80)
        
        logs = driver.get_log('performance')
        api_requests = []
        
        for log in logs:
            try:
                log_message = json.loads(log['message'])
                message = log_message.get('message', {})
                method = message.get('method', '')
                
                if method == 'Network.responseReceived':
                    response = message.get('params', {}).get('response', {})
                    url = response.get('url', '')
                    mime_type = response.get('mimeType', '')
                    
                    # API 요청 필터링
                    if 'api' in url.lower() or 'json' in mime_type.lower():
                        api_requests.append({
                            'url': url,
                            'mime_type': mime_type,
                            'status': response.get('status', 0)
                        })
            except:
                pass
        
        # API 요청 출력
        print(f"\n📋 총 {len(api_requests)}개 API 요청 발견\n")
        
        # STT 관련 키워드로 필터링
        stt_keywords = ['comment', 'chat', 'timeline', 'highlight', 'product', 'live', 'replay', 'info']
        
        relevant_apis = []
        for req in api_requests:
            url = req['url']
            if any(keyword in url.lower() for keyword in stt_keywords):
                relevant_apis.append(req)
                print(f"✅ {url}")
                print(f"   - MIME: {req['mime_type']}")
                print(f"   - Status: {req['status']}")
                print()
        
        if not relevant_apis:
            print("⚠️ STT 관련 API를 찾지 못했습니다.")
            print("\n모든 API 요청:")
            for req in api_requests[:20]:
                print(f"   - {req['url'][:100]}")
        
        # API 응답 내용 확인 (첫 번째 관련 API)
        if relevant_apis:
            print("\n" + "=" * 80)
            print("📦 API 응답 내용 샘플")
            print("=" * 80)
            
            for api in relevant_apis[:3]:
                try:
                    # JavaScript로 API 재호출하여 응답 확인
                    response = driver.execute_async_script("""
                        var url = arguments[0];
                        var callback = arguments[1];
                        fetch(url)
                            .then(response => response.json())
                            .then(data => callback(JSON.stringify(data, null, 2)))
                            .catch(error => callback('Error: ' + error));
                    """, api['url'])
                    
                    print(f"\n🔗 URL: {api['url']}")
                    print(f"📄 응답:")
                    print(response[:500])
                    print("...")
                except Exception as e:
                    print(f"   ❌ 응답 확인 실패: {e}")
        
        print("\n" + "=" * 80)
        
    finally:
        driver.quit()
        print("✅ 브라우저 종료")


if __name__ == '__main__':
    # 테스트할 URL
    test_url = "https://view.shoppinglive.naver.com/replays/1775352"
    
    print("🎬 네이버 쇼핑라이브 API 분석 시작")
    print("=" * 80)
    
    analyze_naver_api(test_url)
    
    print("\n✅ 분석 완료!")
