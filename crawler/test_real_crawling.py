#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
실제 크롤링 테스트 스크립트
네이버 쇼핑라이브에서 실제 데이터를 수집할 수 있는지 테스트
"""

import sys
import time
import logging
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def test_naver_crawling():
    """네이버 쇼핑라이브 크롤링 테스트"""
    
    logger.info("=" * 80)
    logger.info("🧪 네이버 쇼핑라이브 크롤링 테스트 시작")
    logger.info("=" * 80)
    
    driver = None
    
    try:
        # Chrome 옵션 설정
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-gpu')
        options.add_argument('--window-size=1920,1080')
        options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
        
        # ChromeDriver 자동 설치 및 초기화
        logger.info("ChromeDriver 초기화 중...")
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        logger.info("✅ ChromeDriver 초기화 완료")
        
        # 테스트 1: 네이버 쇼핑라이브 메인 페이지
        logger.info("\n테스트 1: 메인 페이지 접속")
        driver.get("https://shoppinglive.naver.com")
        time.sleep(3)
        
        logger.info(f"   페이지 제목: {driver.title}")
        logger.info(f"   현재 URL: {driver.current_url}")
        
        # 테스트 2: 라네즈 브랜드 검색
        test_brand = "라네즈"
        logger.info(f"\n테스트 2: '{test_brand}' 브랜드 검색")
        
        import urllib.parse
        encoded_brand = urllib.parse.quote(test_brand)
        search_url = f"https://shoppinglive.naver.com/search/lives?query={encoded_brand}"
        
        logger.info(f"   검색 URL: {search_url}")
        driver.get(search_url)
        time.sleep(3)
        
        # 스크롤하여 더 많은 결과 로드
        logger.info("   페이지 스크롤 중...")
        for i in range(3):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1.5)
        
        # HTML 파싱
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        
        # 라이브 방송 링크 찾기
        logger.info("   라이브 방송 링크 검색 중...")
        
        # 여러 선택자 시도
        selectors = [
            'a[href*="/replays/"]',
            'a[href*="/lives/"]',
            'a[href*="view.shoppinglive.naver.com"]',
            '.live-item a',
            '[class*="live"] a[href]',
            'a.link',
        ]
        
        found_links = []
        for selector in selectors:
            links = soup.select(selector)
            logger.info(f"   선택자 '{selector}': {len(links)}개 링크 발견")
            
            for link in links[:5]:  # 처음 5개만 확인
                href = link.get('href')
                if href:
                    logger.info(f"      - {href[:100]}")
                    if '/replays/' in href or '/lives/' in href:
                        if href not in found_links:
                            found_links.append(href)
        
        logger.info(f"\n   ✅ 총 {len(found_links)}개의 유효한 라이브 방송 링크 발견")
        
        # 테스트 3: 첫 번째 라이브 방송 상세 정보 수집
        if found_links:
            test_url = found_links[0]
            if test_url.startswith('/'):
                test_url = f"https://view.shoppinglive.naver.com{test_url}"
            
            logger.info(f"\n테스트 3: 라이브 방송 상세 정보 수집")
            logger.info(f"   URL: {test_url}")
            
            driver.get(test_url)
            time.sleep(3)
            
            # 페이지 정보 추출
            page_html = driver.page_source
            page_soup = BeautifulSoup(page_html, 'html.parser')
            
            # 제목 찾기
            title_selectors = [
                'h1',
                '.title',
                '[class*="title"]',
                'meta[property="og:title"]',
            ]
            
            title = None
            for selector in title_selectors:
                if selector.startswith('meta'):
                    element = page_soup.select_one(selector)
                    if element:
                        title = element.get('content')
                        break
                else:
                    element = page_soup.select_one(selector)
                    if element:
                        title = element.get_text(strip=True)
                        break
            
            logger.info(f"   제목: {title or '찾을 수 없음'}")
            
            # 브랜드 정보 찾기
            brand_selectors = [
                '.brand',
                '[class*="brand"]',
                'meta[property="og:site_name"]',
            ]
            
            brand = None
            for selector in brand_selectors:
                if selector.startswith('meta'):
                    element = page_soup.select_one(selector)
                    if element:
                        brand = element.get('content')
                        break
                else:
                    element = page_soup.select_one(selector)
                    if element:
                        brand = element.get_text(strip=True)
                        break
            
            logger.info(f"   브랜드: {brand or '찾을 수 없음'}")
            
            if title:
                logger.info("   ✅ 상세 정보 수집 성공!")
            else:
                logger.warning("   ⚠️ 상세 정보 수집 실패 (제목을 찾을 수 없음)")
        else:
            logger.warning("\n테스트 3: 건너뜀 (라이브 방송 링크를 찾을 수 없음)")
        
        # 결과 요약
        logger.info("\n" + "=" * 80)
        logger.info("📊 테스트 결과 요약")
        logger.info("=" * 80)
        logger.info(f"✅ ChromeDriver 초기화: 성공")
        logger.info(f"✅ 메인 페이지 접속: 성공")
        logger.info(f"{'✅' if found_links else '❌'} 라이브 방송 검색: {len(found_links)}개 발견")
        logger.info(f"{'✅' if title else '❌'} 상세 정보 수집: {'성공' if title else '실패'}")
        logger.info("=" * 80)
        
        if found_links and title:
            logger.info("\n✅ 실제 크롤링 가능!")
            logger.info("   크롤러를 수정하여 실제 데이터 수집을 시작할 수 있습니다.")
            return True
        else:
            logger.warning("\n⚠️ 크롤링 개선 필요")
            logger.warning("   웹사이트 구조를 분석하고 선택자를 업데이트해야 합니다.")
            return False
        
    except Exception as e:
        logger.error(f"\n❌ 테스트 실패: {e}", exc_info=True)
        return False
    finally:
        if driver:
            driver.quit()
            logger.info("\nChromeDriver 종료")


if __name__ == "__main__":
    logger.info("실제 크롤링 테스트를 시작합니다...")
    logger.info("이 테스트는 약 30초 정도 소요됩니다.\n")
    
    success = test_naver_crawling()
    
    sys.exit(0 if success else 1)
