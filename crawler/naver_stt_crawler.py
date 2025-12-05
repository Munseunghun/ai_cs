#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
네이버 쇼핑라이브 STT 정보 수집 크롤러
라이브 방송의 특화 정보(타임라인, 주요 멘트, Q&A 등)를 수집
"""

import sys
import time
import json
import logging
import re
from datetime import datetime
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

# 로컬 모듈
sys.path.append('.')
from supabase import create_client
from dotenv import load_dotenv
import os

# 환경변수 로드
load_dotenv()

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class NaverSTTCrawler:
    """네이버 쇼핑라이브 STT 정보 수집 크롤러"""
    
    def __init__(self):
        """크롤러 초기화"""
        self.driver = None
        
        # Supabase 클라이언트 초기화
        supabase_url = os.getenv('SUPABASE_URL')
        supabase_key = os.getenv('SUPABASE_ANON_KEY')
        
        if not supabase_url or not supabase_key:
            logger.error("❌ Supabase 설정이 없습니다. .env 파일을 확인해주세요.")
            raise ValueError("Supabase 설정 필요")
        
        self.supabase = create_client(supabase_url, supabase_key)
        logger.info("✅ Supabase 클라이언트 초기화 완료")
        
        self.stats = {
            'total_processed': 0,
            'total_stt_collected': 0,
            'total_saved': 0,
            'errors': []
        }
    
    def init_driver(self):
        """Selenium 드라이버 초기화"""
        try:
            options = Options()
            # headless 모드 비활성화 (STT 정보 로드를 위해)
            # options.add_argument('--headless')
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            options.add_argument('--disable-gpu')
            options.add_argument('--window-size=1920,1080')
            options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
            
            service = Service(ChromeDriverManager().install())
            self.driver = webdriver.Chrome(service=service, options=options)
            logger.info("✅ ChromeDriver 초기화 완료")
            return True
        except Exception as e:
            logger.error(f"❌ ChromeDriver 초기화 실패: {e}")
            return False
    
    def close_driver(self):
        """드라이버 종료"""
        if self.driver:
            self.driver.quit()
            logger.info("ChromeDriver 종료")
    
    def extract_stt_info(self, p_live_url, p_live_id):
        """
        라이브 방송 페이지에서 STT 기반 정보 추출
        
        Args:
            p_live_url (str): 라이브 방송 URL
            p_live_id (str): 라이브 방송 ID
            
        Returns:
            dict: STT 정보 (타임라인, 주요 멘트, Q&A 등)
        """
        try:
            logger.info(f"   🎤 STT 정보 수집 중: {p_live_id}")
            
            # 페이지 로드
            self.driver.get(p_live_url)
            time.sleep(5)  # 페이지 로드 대기
            
            # 스크롤하여 모든 콘텐츠 로드
            for i in range(3):
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(2)
            
            # HTML 파싱
            html = self.driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            
            stt_info = {
                'live_id': p_live_id,
                'key_message': [],  # 주요 멘트/메시지
                'broadcast_qa': [],  # 방송 중 Q&A
                'timeline_summary': [],  # 타임라인 요약
                'product_mentions': [],  # 제품 언급
                'host_comments': [],  # 진행자 코멘트
                'viewer_reactions': [],  # 시청자 반응
                'collected_at': datetime.now().isoformat()
            }
            
            # 1. 타임라인 정보 수집
            timeline_items = self._extract_timeline(soup)
            if timeline_items:
                stt_info['timeline_summary'] = timeline_items
                logger.info(f"      ✅ 타임라인: {len(timeline_items)}개")
            
            # 2. 주요 멘트/키 메시지 수집
            key_messages = self._extract_key_messages(soup)
            if key_messages:
                stt_info['key_message'] = key_messages
                logger.info(f"      ✅ 주요 멘트: {len(key_messages)}개")
            
            # 3. 제품 언급 수집
            product_mentions = self._extract_product_mentions(soup)
            if product_mentions:
                stt_info['product_mentions'] = product_mentions
                logger.info(f"      ✅ 제품 언급: {len(product_mentions)}개")
            
            # 4. 댓글/채팅 분석 (Q&A 추출)
            qa_items = self._extract_qa_from_comments(soup)
            if qa_items:
                stt_info['broadcast_qa'] = qa_items
                logger.info(f"      ✅ Q&A: {len(qa_items)}개")
            
            # 5. 진행자 코멘트 수집
            host_comments = self._extract_host_comments(soup)
            if host_comments:
                stt_info['host_comments'] = host_comments
                logger.info(f"      ✅ 진행자 코멘트: {len(host_comments)}개")
            
            # 6. 시청자 반응 수집
            viewer_reactions = self._extract_viewer_reactions(soup)
            if viewer_reactions:
                stt_info['viewer_reactions'] = viewer_reactions
                logger.info(f"      ✅ 시청자 반응: {len(viewer_reactions)}개")
            
            return stt_info
            
        except Exception as e:
            logger.error(f"   ❌ STT 정보 수집 실패: {e}")
            return None
    
    def _extract_timeline(self, p_soup):
        """타임라인 정보 추출"""
        timeline_items = []
        
        try:
            # 네이버 쇼핑라이브의 타임라인 선택자
            # (실제 선택자는 페이지 구조에 따라 조정 필요)
            timeline_elements = p_soup.select('[class*="timeline"], [class*="chapter"], [class*="segment"]')
            
            for element in timeline_elements:
                # 시간 정보
                time_elem = element.select_one('[class*="time"], [class*="timestamp"]')
                time_str = time_elem.get_text(strip=True) if time_elem else None
                
                # 내용
                content_elem = element.select_one('[class*="title"], [class*="content"], [class*="description"]')
                content = content_elem.get_text(strip=True) if content_elem else None
                
                if time_str and content:
                    timeline_items.append({
                        'timestamp': time_str,
                        'content': content,
                        'type': 'timeline'
                    })
            
            # 대체 방법: 비디오 챕터 정보
            if not timeline_items:
                chapter_elements = p_soup.select('[data-chapter], [data-timestamp]')
                for element in chapter_elements:
                    timestamp = element.get('data-timestamp') or element.get('data-chapter')
                    content = element.get_text(strip=True)
                    if timestamp and content:
                        timeline_items.append({
                            'timestamp': timestamp,
                            'content': content,
                            'type': 'chapter'
                        })
        
        except Exception as e:
            logger.warning(f"      타임라인 추출 실패: {e}")
        
        return timeline_items
    
    def _extract_key_messages(self, p_soup):
        """주요 멘트/키 메시지 추출"""
        key_messages = []
        
        try:
            # 하이라이트, 주요 멘트 선택자
            highlight_elements = p_soup.select('[class*="highlight"], [class*="key"], [class*="important"]')
            
            for element in highlight_elements:
                message = element.get_text(strip=True)
                if message and len(message) > 10:  # 의미있는 길이의 메시지만
                    key_messages.append({
                        'message': message,
                        'type': 'highlight',
                        'length': len(message)
                    })
            
            # 대체 방법: 강조된 텍스트 (bold, strong 태그)
            if not key_messages:
                emphasized = p_soup.select('strong, b, [class*="emphasis"]')
                for elem in emphasized:
                    message = elem.get_text(strip=True)
                    if message and len(message) > 10 and len(message) < 200:
                        key_messages.append({
                            'message': message,
                            'type': 'emphasized',
                            'length': len(message)
                        })
        
        except Exception as e:
            logger.warning(f"      주요 멘트 추출 실패: {e}")
        
        return key_messages[:20]  # 최대 20개
    
    def _extract_product_mentions(self, p_soup):
        """제품 언급 정보 추출"""
        product_mentions = []
        
        try:
            # 제품 관련 선택자
            product_elements = p_soup.select('[class*="product"], [class*="item"], [data-product-id]')
            
            for element in product_elements:
                # 제품명
                name_elem = element.select_one('[class*="name"], [class*="title"]')
                product_name = name_elem.get_text(strip=True) if name_elem else None
                
                # 가격
                price_elem = element.select_one('[class*="price"]')
                price = price_elem.get_text(strip=True) if price_elem else None
                
                # 제품 ID
                product_id = element.get('data-product-id')
                
                if product_name:
                    product_mentions.append({
                        'product_name': product_name,
                        'price': price,
                        'product_id': product_id,
                        'type': 'product_mention'
                    })
        
        except Exception as e:
            logger.warning(f"      제품 언급 추출 실패: {e}")
        
        return product_mentions[:30]  # 최대 30개
    
    def _extract_qa_from_comments(self, p_soup):
        """댓글/채팅에서 Q&A 추출"""
        qa_items = []
        
        try:
            # 댓글/채팅 선택자
            comment_elements = p_soup.select('[class*="comment"], [class*="chat"], [class*="message"]')
            
            for element in comment_elements:
                text = element.get_text(strip=True)
                
                # 질문 패턴 감지 (?, 어떻게, 언제, 뭐, 어디 등)
                if any(keyword in text for keyword in ['?', '어떻게', '언제', '뭐', '어디', '얼마', '추천']):
                    qa_items.append({
                        'question': text,
                        'type': 'user_question',
                        'detected_pattern': 'question_keyword'
                    })
        
        except Exception as e:
            logger.warning(f"      Q&A 추출 실패: {e}")
        
        return qa_items[:15]  # 최대 15개
    
    def _extract_host_comments(self, p_soup):
        """진행자 코멘트 추출"""
        host_comments = []
        
        try:
            # 진행자 관련 선택자
            host_elements = p_soup.select('[class*="host"], [class*="presenter"], [class*="mc"]')
            
            for element in host_elements:
                comment = element.get_text(strip=True)
                if comment and len(comment) > 10:
                    host_comments.append({
                        'comment': comment,
                        'type': 'host_comment',
                        'length': len(comment)
                    })
        
        except Exception as e:
            logger.warning(f"      진행자 코멘트 추출 실패: {e}")
        
        return host_comments[:20]  # 최대 20개
    
    def _extract_viewer_reactions(self, p_soup):
        """시청자 반응 추출"""
        viewer_reactions = []
        
        try:
            # 좋아요, 하트, 이모지 등
            reaction_elements = p_soup.select('[class*="reaction"], [class*="like"], [class*="heart"]')
            
            for element in reaction_elements:
                reaction_type = element.get('class', [''])[0]
                count_elem = element.select_one('[class*="count"]')
                count = count_elem.get_text(strip=True) if count_elem else '0'
                
                viewer_reactions.append({
                    'reaction_type': reaction_type,
                    'count': count,
                    'type': 'viewer_reaction'
                })
        
        except Exception as e:
            logger.warning(f"      시청자 반응 추출 실패: {e}")
        
        return viewer_reactions
    
    def save_stt_info(self, p_stt_info):
        """
        STT 정보를 Supabase에 저장
        
        Args:
            p_stt_info (dict): STT 정보
            
        Returns:
            bool: 저장 성공 여부
        """
        try:
            if not p_stt_info or not p_stt_info.get('live_id'):
                logger.warning("   ⚠️ STT 정보가 비어있거나 live_id가 없습니다.")
                return False
            
            # JSON 직렬화
            data_to_save = {
                'live_id': p_stt_info['live_id'],
                'key_message': json.dumps(p_stt_info.get('key_message', []), ensure_ascii=False),
                'broadcast_qa': json.dumps(p_stt_info.get('broadcast_qa', []), ensure_ascii=False),
                'timeline_summary': json.dumps(p_stt_info.get('timeline_summary', []), ensure_ascii=False),
                'product_mentions': json.dumps(p_stt_info.get('product_mentions', []), ensure_ascii=False),
                'host_comments': json.dumps(p_stt_info.get('host_comments', []), ensure_ascii=False),
                'viewer_reactions': json.dumps(p_stt_info.get('viewer_reactions', []), ensure_ascii=False),
                'collected_at': p_stt_info.get('collected_at'),
                'updated_at': datetime.now().isoformat()
            }
            
            # UPSERT (중복 시 업데이트)
            response = self.supabase.table('live_stt_info').upsert(
                data_to_save,
                on_conflict='live_id'
            ).execute()
            
            if response.data:
                logger.info(f"   ✅ STT 정보 저장 완료: {p_stt_info['live_id']}")
                return True
            else:
                logger.error(f"   ❌ STT 정보 저장 실패: {response}")
                return False
                
        except Exception as e:
            logger.error(f"   ❌ STT 정보 저장 중 에러: {e}")
            return False
    
    def crawl_existing_lives(self, p_limit=50):
        """
        기존 live_broadcasts에서 STT 정보가 없는 라이브 방송을 찾아 수집
        
        Args:
            p_limit (int): 최대 처리 개수
        """
        try:
            logger.info(f"🎯 STT 정보 수집 시작 (최대 {p_limit}개)")
            
            # STT 정보가 없는 라이브 방송 조회
            response = self.supabase.table('live_broadcasts').select(
                'live_id, source_url, brand_name, live_title_customer'
            ).is_('source_url', 'not.null').limit(p_limit).execute()
            
            if not response.data:
                logger.warning("⚠️ 처리할 라이브 방송이 없습니다.")
                return
            
            lives = response.data
            logger.info(f"📋 총 {len(lives)}개 라이브 방송 발견")
            
            # 이미 STT 정보가 있는 live_id 조회
            existing_stt = self.supabase.table('live_stt_info').select('live_id').execute()
            existing_live_ids = {item['live_id'] for item in existing_stt.data} if existing_stt.data else set()
            
            logger.info(f"📊 이미 STT 정보가 있는 방송: {len(existing_live_ids)}개")
            
            # 드라이버 초기화
            if not self.init_driver():
                logger.error("❌ 드라이버 초기화 실패")
                return
            
            # 각 라이브 방송 처리
            for idx, live in enumerate(lives, 1):
                live_id = live['live_id']
                source_url = live['source_url']
                brand_name = live.get('brand_name', 'Unknown')
                title = live.get('live_title_customer', 'No Title')
                
                # 이미 STT 정보가 있으면 스킵
                if live_id in existing_live_ids:
                    logger.info(f"[{idx}/{len(lives)}] ⏭️ 스킵 (이미 존재): {live_id}")
                    continue
                
                logger.info(f"[{idx}/{len(lives)}] 🎬 처리 중: [{brand_name}] {title[:50]}")
                
                # STT 정보 수집
                stt_info = self.extract_stt_info(source_url, live_id)
                
                if stt_info:
                    # 저장
                    if self.save_stt_info(stt_info):
                        self.stats['total_stt_collected'] += 1
                        self.stats['total_saved'] += 1
                    else:
                        self.stats['errors'].append({
                            'live_id': live_id,
                            'error': 'Save failed'
                        })
                else:
                    logger.warning(f"   ⚠️ STT 정보 수집 실패: {live_id}")
                    self.stats['errors'].append({
                        'live_id': live_id,
                        'error': 'Extraction failed'
                    })
                
                self.stats['total_processed'] += 1
                
                # 요청 간 대기 (서버 부하 방지)
                time.sleep(3)
            
            # 드라이버 종료
            self.close_driver()
            
            # 최종 통계
            logger.info("=" * 80)
            logger.info("🎉 STT 정보 수집 완료!")
            logger.info(f"   - 처리한 방송: {self.stats['total_processed']}개")
            logger.info(f"   - STT 수집 성공: {self.stats['total_stt_collected']}개")
            logger.info(f"   - 저장 성공: {self.stats['total_saved']}개")
            logger.info(f"   - 에러: {len(self.stats['errors'])}개")
            logger.info("=" * 80)
            
        except Exception as e:
            logger.error(f"❌ STT 수집 중 에러: {e}")
            self.close_driver()


def main():
    """메인 함수"""
    try:
        crawler = NaverSTTCrawler()
        
        # 최대 50개 라이브 방송의 STT 정보 수집
        crawler.crawl_existing_lives(p_limit=50)
        
    except Exception as e:
        logger.error(f"❌ 프로그램 실행 실패: {e}")
        return 1
    
    return 0


if __name__ == '__main__':
    sys.exit(main())
