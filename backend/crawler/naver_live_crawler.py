#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
네이버 쇼핑라이브 크롤러
- 실시간 라이브 방송 정보 수집
- Supabase 데이터베이스 저장
"""

import os
import sys
import json
import time
import logging
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Optional
import re

# Selenium 관련
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

# Supabase 클라이언트
from supabase import create_client, Client

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class NaverLiveCrawler:
    """네이버 쇼핑라이브 크롤러"""
    
    def __init__(self, p_supabase_url: str, p_supabase_key: str):
        """
        초기화
        
        Args:
            p_supabase_url: Supabase 프로젝트 URL
            p_supabase_key: Supabase API Key (anon key)
        """
        self.p_supabase_url = p_supabase_url
        self.p_supabase_key = p_supabase_key
        self.p_supabase_client: Client = create_client(p_supabase_url, p_supabase_key)
        self.p_driver = None
        
        # 브랜드 목록 (config/brands.json에서 읽어올 수 있음)
        self.p_brands = [
            "라네즈", "설화수", "아이오페", "헤라", "에스트라",
            "이니스프리", "해피바스", "바이탈뷰티", "프리메라", "오설록"
        ]
        
    def _init_driver(self):
        """Selenium WebDriver 초기화"""
        try:
            _v_chrome_options = Options()
            _v_chrome_options.add_argument('--headless')  # 헤드리스 모드
            _v_chrome_options.add_argument('--no-sandbox')
            _v_chrome_options.add_argument('--disable-dev-shm-usage')
            _v_chrome_options.add_argument('--disable-gpu')
            _v_chrome_options.add_argument('--window-size=1920,1080')
            _v_chrome_options.add_argument('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')
            
            self.p_driver = webdriver.Chrome(options=_v_chrome_options)
            logger.info("✅ WebDriver 초기화 완료")
        except Exception as p_error:
            logger.error(f"❌ WebDriver 초기화 실패: {p_error}")
            raise
    
    def _close_driver(self):
        """WebDriver 종료"""
        if self.p_driver:
            self.p_driver.quit()
            logger.info("✅ WebDriver 종료 완료")
    
    def crawl_brand_lives(self, p_brand_name: str, p_max_count: int = 10) -> List[Dict]:
        """
        특정 브랜드의 라이브 방송 목록 크롤링
        
        Args:
            p_brand_name: 브랜드명
            p_max_count: 최대 수집 개수
            
        Returns:
            라이브 방송 정보 리스트
        """
        _v_lives = []
        
        try:
            # 네이버 쇼핑라이브 검색 URL
            _v_search_url = f"https://shoppinglive.naver.com/search/lives?query={p_brand_name}"
            
            logger.info(f"🔍 {p_brand_name} 브랜드 크롤링 시작: {_v_search_url}")
            
            self.p_driver.get(_v_search_url)
            time.sleep(3)  # 페이지 로딩 대기
            
            # 라이브 방송 카드 요소 찾기
            # 실제 네이버 쇼핑라이브 HTML 구조에 맞게 셀렉터 수정 필요
            _v_live_cards = self.p_driver.find_elements(By.CSS_SELECTOR, 'a[href*="/replays/"], a[href*="/lives/"]')
            
            logger.info(f"📦 {len(_v_live_cards)}개의 라이브 방송 발견")
            
            for _v_idx, _v_card in enumerate(_v_live_cards[:p_max_count]):
                try:
                    # 라이브 방송 URL 추출
                    _v_live_url = _v_card.get_attribute('href')
                    
                    if not _v_live_url:
                        continue
                    
                    # live_id 추출 (URL에서 숫자 부분)
                    _v_match = re.search(r'/(replays|lives)/(\d+)', _v_live_url)
                    if not _v_match:
                        continue
                    
                    _v_live_id = f"NAVER_{p_brand_name}_{_v_match.group(2)}"
                    
                    # 썸네일 이미지
                    try:
                        _v_thumbnail = _v_card.find_element(By.TAG_NAME, 'img').get_attribute('src')
                    except:
                        _v_thumbnail = None
                    
                    # 제목
                    try:
                        _v_title = _v_card.get_attribute('aria-label') or _v_card.text
                    except:
                        _v_title = f"{p_brand_name} 라이브 방송"
                    
                    _v_live_info = {
                        'live_id': _v_live_id,
                        'platform_name': '네이버',
                        'channel_code': 'NAVER',
                        'channel_type': 'LIVE',
                        'brand_name': p_brand_name,
                        'live_title_customer': _v_title,
                        'live_title_cs': f"{p_brand_name} {datetime.now().strftime('%m월')} 네이버 라이브",
                        'source_url': _v_live_url,
                        'thumbnail_url': _v_thumbnail,
                        'broadcast_date': datetime.now().strftime('%Y-%m-%d'),
                        'broadcast_start_time': '00:00',
                        'broadcast_end_time': '23:59',
                        'status': 'ACTIVE',
                        'created_at': datetime.now().isoformat(),
                        'updated_at': datetime.now().isoformat()
                    }
                    
                    _v_lives.append(_v_live_info)
                    logger.info(f"  ✅ [{_v_idx+1}] {_v_title[:50]}")
                    
                except Exception as p_card_error:
                    logger.warning(f"  ⚠️ 카드 파싱 실패: {p_card_error}")
                    continue
            
            logger.info(f"✅ {p_brand_name} 브랜드 크롤링 완료: {len(_v_lives)}개 수집")
            
        except Exception as p_error:
            logger.error(f"❌ {p_brand_name} 브랜드 크롤링 실패: {p_error}")
        
        return _v_lives
    
    def save_to_supabase(self, p_lives: List[Dict]) -> int:
        """
        라이브 방송 정보를 Supabase에 저장
        
        Args:
            p_lives: 라이브 방송 정보 리스트
            
        Returns:
            저장 성공 개수
        """
        _v_success_count = 0
        
        for _v_live in p_lives:
            try:
                # 중복 체크 (live_id 기준)
                _v_existing = self.p_supabase_client.table('live_broadcasts') \
                    .select('live_id') \
                    .eq('live_id', _v_live['live_id']) \
                    .execute()
                
                if _v_existing.data and len(_v_existing.data) > 0:
                    # 이미 존재하면 업데이트
                    _v_result = self.p_supabase_client.table('live_broadcasts') \
                        .update(_v_live) \
                        .eq('live_id', _v_live['live_id']) \
                        .execute()
                    logger.info(f"  🔄 업데이트: {_v_live['live_id']}")
                else:
                    # 새로 삽입
                    _v_result = self.p_supabase_client.table('live_broadcasts') \
                        .insert(_v_live) \
                        .execute()
                    logger.info(f"  ➕ 신규 삽입: {_v_live['live_id']}")
                
                _v_success_count += 1
                
            except Exception as p_save_error:
                logger.error(f"  ❌ 저장 실패 ({_v_live.get('live_id')}): {p_save_error}")
                continue
        
        logger.info(f"✅ Supabase 저장 완료: {_v_success_count}/{len(p_lives)}개 성공")
        return _v_success_count
    
    def crawl_all_brands(self, p_max_per_brand: int = 5) -> Dict:
        """
        모든 브랜드의 라이브 방송 크롤링
        
        Args:
            p_max_per_brand: 브랜드당 최대 수집 개수
            
        Returns:
            크롤링 결과 통계
        """
        _v_all_lives = []
        _v_stats = {
            'total_brands': len(self.p_brands),
            'successful_brands': 0,
            'total_lives': 0,
            'saved_lives': 0,
            'start_time': datetime.now().isoformat(),
            'end_time': None,
            'errors': []
        }
        
        try:
            # WebDriver 초기화
            self._init_driver()
            
            # 각 브랜드별 크롤링
            for _v_brand in self.p_brands:
                try:
                    _v_lives = self.crawl_brand_lives(_v_brand, p_max_per_brand)
                    
                    if _v_lives:
                        _v_all_lives.extend(_v_lives)
                        _v_stats['successful_brands'] += 1
                        _v_stats['total_lives'] += len(_v_lives)
                    
                    # 다음 브랜드 크롤링 전 대기 (과부하 방지)
                    time.sleep(2)
                    
                except Exception as p_brand_error:
                    _v_error_msg = f"{_v_brand} 크롤링 실패: {p_brand_error}"
                    logger.error(f"❌ {_v_error_msg}")
                    _v_stats['errors'].append(_v_error_msg)
                    continue
            
            # Supabase에 저장
            if _v_all_lives:
                _v_stats['saved_lives'] = self.save_to_supabase(_v_all_lives)
            
            _v_stats['end_time'] = datetime.now().isoformat()
            
            logger.info(f"""
            ==========================================
            📊 크롤링 완료 통계
            ==========================================
            - 대상 브랜드: {_v_stats['total_brands']}개
            - 성공 브랜드: {_v_stats['successful_brands']}개
            - 수집 라이브: {_v_stats['total_lives']}개
            - 저장 성공: {_v_stats['saved_lives']}개
            - 시작 시간: {_v_stats['start_time']}
            - 종료 시간: {_v_stats['end_time']}
            ==========================================
            """)
            
        except Exception as p_error:
            logger.error(f"❌ 전체 크롤링 실패: {p_error}")
            _v_stats['errors'].append(str(p_error))
        
        finally:
            # WebDriver 종료
            self._close_driver()
        
        return _v_stats


def main():
    """메인 실행 함수"""
    
    # Supabase 환경변수 읽기
    _v_supabase_url = os.getenv('SUPABASE_URL')
    _v_supabase_key = os.getenv('SUPABASE_ANON_KEY')
    
    if not _v_supabase_url or not _v_supabase_key:
        logger.error("❌ Supabase 환경변수가 설정되지 않았습니다.")
        logger.error("   SUPABASE_URL과 SUPABASE_ANON_KEY를 설정해주세요.")
        sys.exit(1)
    
    try:
        # 크롤러 초기화
        _v_crawler = NaverLiveCrawler(_v_supabase_url, _v_supabase_key)
        
        # 전체 브랜드 크롤링 실행
        _v_stats = _v_crawler.crawl_all_brands(p_max_per_brand=5)
        
        # 결과 저장 (로그용)
        _v_output_dir = Path(__file__).parent / 'output'
        _v_output_dir.mkdir(exist_ok=True)
        
        _v_stats_file = _v_output_dir / f'crawl_stats_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
        with open(_v_stats_file, 'w', encoding='utf-8') as f:
            json.dump(_v_stats, f, ensure_ascii=False, indent=2)
        
        logger.info(f"✅ 통계 저장 완료: {_v_stats_file}")
        
        # 성공 여부 반환
        if _v_stats['saved_lives'] > 0:
            logger.info("✅ 크롤링 성공")
            sys.exit(0)
        else:
            logger.warning("⚠️ 저장된 데이터가 없습니다.")
            sys.exit(1)
        
    except Exception as p_error:
        logger.error(f"❌ 크롤러 실행 실패: {p_error}")
        sys.exit(1)


if __name__ == '__main__':
    main()




