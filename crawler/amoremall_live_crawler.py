#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
아모레몰 라이브 쇼핑 크롤러
방송혜택, FAQ, 라이브 답글, 상품 정보, 댓글 수집
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


class AmoremallLiveCrawler:
    """아모레몰 라이브 쇼핑 크롤러"""
    
    def __init__(self):
        """크롤러 초기화"""
        self.driver = None
        
        # Supabase 클라이언트 초기화
        supabase_url = os.getenv('SUPABASE_URL')
        supabase_key = os.getenv('SUPABASE_ANON_KEY')
        
        if not supabase_url or not supabase_key:
            logger.error("❌ Supabase 설정이 없습니다.")
            raise ValueError("Supabase 설정 필요")
        
        self.supabase = create_client(supabase_url, supabase_key)
        logger.info("✅ Supabase 클라이언트 초기화 완료")
        
        self.stats = {
            'total_processed': 0,
            'products_collected': 0,
            'benefits_collected': 0,
            'comments_collected': 0,
            'faqs_collected': 0,
            'errors': []
        }
    
    def init_driver(self):
        """Selenium 드라이버 초기화"""
        try:
            options = Options()
            options.add_argument('--headless')
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            options.add_argument('--disable-gpu')
            options.add_argument('--window-size=1920,1080')
            options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')
            
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
    
    def extract_live_id(self, p_url):
        """
        URL에서 라이브 ID 추출
        
        Args:
            p_url (str): 아모레몰 라이브 URL
            
        Returns:
            str: 라이브 ID
        """
        # URL 파라미터에서 sy_id 추출
        match = re.search(r'sy_id=([^&]+)', p_url)
        if match:
            return match.group(1)
        return None
    
    def crawl_live_data(self, p_live_url):
        """
        아모레몰 라이브 방송 데이터 수집
        
        Args:
            p_live_url (str): 라이브 방송 URL
            
        Returns:
            dict: 수집된 데이터
        """
        logger.info(f"🎬 아모레몰 라이브 크롤링 시작")
        logger.info(f"   URL: {p_live_url}")
        
        # 라이브 ID 추출
        _v_live_id = self.extract_live_id(p_live_url)
        if not _v_live_id:
            logger.error("❌ 라이브 ID를 추출할 수 없습니다.")
            return None
        
        _v_full_live_id = f"REAL_AMOREMALL_{_v_live_id}"
        logger.info(f"   Live ID: {_v_full_live_id}")
        
        # 페이지 로드
        self.driver.get(p_live_url)
        time.sleep(5)  # 페이지 로딩 대기
        
        # 데이터 수집
        _v_data = {
            'live_id': _v_full_live_id,
            'source_url': p_live_url,
            'channel_code': 'AMOREMALL',
            'platform_name': '아모레몰',
            'basic_info': self._collect_basic_info(),
            'products': self._collect_products(),
            'benefits': self._collect_benefits(),
            'faqs': self._collect_faqs(),
            'comments': self._collect_comments(),
            'collected_at': datetime.now().isoformat()
        }
        
        # 통계 업데이트
        self.stats['total_processed'] += 1
        self.stats['products_collected'] += len(_v_data['products'])
        self.stats['benefits_collected'] += len(_v_data['benefits'])
        self.stats['comments_collected'] += len(_v_data['comments'])
        self.stats['faqs_collected'] += len(_v_data['faqs'])
        
        logger.info(f"✅ 데이터 수집 완료:")
        logger.info(f"   - 상품: {len(_v_data['products'])}개")
        logger.info(f"   - 혜택: {len(_v_data['benefits'])}개")
        logger.info(f"   - FAQ: {len(_v_data['faqs'])}개")
        logger.info(f"   - 댓글: {len(_v_data['comments'])}개")
        
        return _v_data
    
    def _collect_basic_info(self):
        """라이브 기본 정보 수집"""
        try:
            _v_info = {}
            
            # 제목 추출
            try:
                _v_title_elem = self.driver.find_element(By.CSS_SELECTOR, 'h1, .live-title, .broadcast-title')
                _v_info['title'] = _v_title_elem.text.strip()
            except:
                _v_info['title'] = '제목 없음'
            
            # 브랜드명 추출
            try:
                _v_brand_elem = self.driver.find_element(By.CSS_SELECTOR, '.brand-name, .brand, [class*="brand"]')
                _v_info['brand_name'] = _v_brand_elem.text.strip()
            except:
                # URL이나 제목에서 브랜드 추출 시도
                if '아이오페' in _v_info.get('title', ''):
                    _v_info['brand_name'] = '아이오페'
                elif '메이크온' in _v_info.get('title', ''):
                    _v_info['brand_name'] = '메이크온'
                else:
                    _v_info['brand_name'] = '아모레퍼시픽'
            
            # 썸네일 이미지
            try:
                _v_thumb_elem = self.driver.find_element(By.CSS_SELECTOR, 'video, .thumbnail, .live-thumbnail')
                _v_info['thumbnail_url'] = _v_thumb_elem.get_attribute('poster') or _v_thumb_elem.get_attribute('src')
            except:
                _v_info['thumbnail_url'] = None
            
            # 방송 상태
            try:
                _v_status_elem = self.driver.find_element(By.CSS_SELECTOR, '.status, .live-status, [class*="status"]')
                _v_status_text = _v_status_elem.text.strip().upper()
                if 'LIVE' in _v_status_text or '진행' in _v_status_text:
                    _v_info['status'] = 'ACTIVE'
                elif '종료' in _v_status_text or 'END' in _v_status_text:
                    _v_info['status'] = 'ENDED'
                else:
                    _v_info['status'] = 'PENDING'
            except:
                _v_info['status'] = 'ACTIVE'  # 기본값
            
            logger.info(f"   ✅ 기본 정보 수집: {_v_info.get('title', 'N/A')}")
            return _v_info
            
        except Exception as e:
            logger.error(f"   ❌ 기본 정보 수집 실패: {e}")
            return {}
    
    def _collect_products(self):
        """상품 정보 수집"""
        _v_products = []
        
        try:
            # 상품 더보기 버튼 클릭 시도
            try:
                _v_more_btn = self.driver.find_element(By.CSS_SELECTOR, '.bp-banner-product-more, button[aria-label*="더보기"]')
                _v_more_btn.click()
                logger.info("   📦 상품 더보기 버튼 클릭")
                time.sleep(2)  # 상품 목록 로딩 대기
            except Exception as e:
                logger.debug(f"   더보기 버튼 클릭 실패 (단일 상품일 수 있음): {e}")
            
            # 아모레몰 전용 선택자 (bp-banner-product)
            _v_product_selectors = [
                '.bp-banner-product',  # 아모레몰 메인 상품 배너
                '[class*="banner-product"]',
                '.product-item',
                '.goods-item'
            ]
            
            _v_product_elements = []
            for selector in _v_product_selectors:
                try:
                    _v_product_elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if _v_product_elements:
                        logger.info(f"   📦 선택자 '{selector}'로 {len(_v_product_elements)}개 발견")
                        break
                except:
                    continue
            
            if not _v_product_elements:
                logger.warning("   ⚠️ 상품 요소를 찾을 수 없습니다.")
                return []
            
            # 페이지 제목에서 브랜드 추출
            _v_default_brand = None
            try:
                _v_page_title = self.driver.title
                if '아이오페' in _v_page_title:
                    _v_default_brand = '아이오페'
                elif '메이크온' in _v_page_title:
                    _v_default_brand = '메이크온'
                elif '설화수' in _v_page_title:
                    _v_default_brand = '설화수'
                elif '라네즈' in _v_page_title:
                    _v_default_brand = '라네즈'
            except:
                pass
            
            for idx, elem in enumerate(_v_product_elements[:50], 1):  # 최대 50개
                try:
                    _v_product = {
                        'product_order': idx,
                        'product_name': None,
                        'brand_name': _v_default_brand,
                        'original_price': None,
                        'sale_price': None,
                        'discount_rate': None,
                        'product_url': None,
                        'image_url': None
                    }
                    
                    # 아모레몰 전용: bp-banner-product-name
                    try:
                        _v_name_elem = elem.find_element(By.CSS_SELECTOR, '.bp-banner-product-name')
                        _v_product['product_name'] = _v_name_elem.text.strip()
                    except:
                        # 일반 선택자
                        try:
                            _v_name_elem = elem.find_element(By.CSS_SELECTOR, '.product-name, .name, .title, h3, h4')
                            _v_product['product_name'] = _v_name_elem.text.strip()
                        except:
                            # 전체 텍스트에서 추출
                            _v_text = elem.text.strip()
                            if _v_text:
                                lines = _v_text.split('\n')
                                # 첫 번째 유효한 라인을 상품명으로
                                for line in lines:
                                    if line and len(line) > 2 and '원' not in line and '더보기' not in line:
                                        _v_product['product_name'] = line[:200]
                                        break
                    
                    # 가격 정보 (텍스트에서 추출)
                    _v_text = elem.text
                    _v_price_matches = re.findall(r'(\d{1,3}(?:,\d{3})*)\s*원', _v_text)
                    if _v_price_matches:
                        # 첫 번째 가격을 판매가로
                        _v_product['sale_price'] = _v_price_matches[0].replace(',', '')
                        # 두 번째 가격이 있으면 정가로 (할인가 표시 시)
                        if len(_v_price_matches) > 1:
                            _v_product['original_price'] = _v_price_matches[1].replace(',', '')
                    
                    # 상품 이미지 (썸네일) - bp-banner-product-image-wrap 내부
                    try:
                        _v_img_elem = elem.find_element(By.CSS_SELECTOR, '.bp-banner-product-image-wrap img, img')
                        _v_img_src = _v_img_elem.get_attribute('src')
                        if _v_img_src and 'http' in _v_img_src:
                            _v_product['image_url'] = _v_img_src
                    except:
                        pass
                    
                    # 상품 URL
                    try:
                        _v_link_elem = elem.find_element(By.CSS_SELECTOR, 'a, [role="link"]')
                        _v_href = _v_link_elem.get_attribute('href')
                        if _v_href:
                            _v_product['product_url'] = _v_href
                    except:
                        pass
                    
                    # 상품명이 있는 경우만 추가
                    if _v_product['product_name'] and len(_v_product['product_name']) > 2:
                        _v_products.append(_v_product)
                        logger.info(f"   상품 {idx}: {_v_product['product_name'][:50]} - {_v_product.get('sale_price', 'N/A')}원")
                    
                except Exception as e:
                    logger.debug(f"   상품 {idx} 파싱 실패: {e}")
                    continue
            
            logger.info(f"   ✅ 상품 수집: {len(_v_products)}개")
            return _v_products
            
        except Exception as e:
            logger.error(f"   ❌ 상품 수집 실패: {e}")
            return []
    
    def _collect_benefits(self):
        """방송 혜택 정보 수집"""
        _v_benefits = []
        
        try:
            # 쿠폰 섹션 찾기
            try:
                _v_coupon_btn = self.driver.find_element(By.XPATH, "//*[contains(text(), '쿠폰')]")
                _v_coupon_btn.click()
                time.sleep(1)
            except:
                pass
            
            # 혜택 요소 찾기
            _v_benefit_selectors = [
                '.coupon-item',
                '.benefit-item',
                '[class*="coupon"]',
                '[class*="benefit"]'
            ]
            
            _v_benefit_elements = []
            for selector in _v_benefit_selectors:
                try:
                    _v_benefit_elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if _v_benefit_elements:
                        break
                except:
                    continue
            
            for idx, elem in enumerate(_v_benefit_elements, 1):
                try:
                    _v_benefit = {
                        'benefit_type': '쿠폰',
                        'benefit_name': None,
                        'benefit_detail': None,
                        'benefit_condition': None
                    }
                    
                    # 혜택명
                    try:
                        _v_name_elem = elem.find_element(By.CSS_SELECTOR, '.name, .title, h3, h4')
                        _v_benefit['benefit_name'] = _v_name_elem.text.strip()
                    except:
                        _v_benefit['benefit_name'] = elem.text.strip()
                    
                    # 혜택 상세
                    try:
                        _v_detail_elem = elem.find_element(By.CSS_SELECTOR, '.detail, .description, .desc')
                        _v_benefit['benefit_detail'] = _v_detail_elem.text.strip()
                    except:
                        pass
                    
                    # 혜택 조건
                    try:
                        _v_condition_elem = elem.find_element(By.CSS_SELECTOR, '.condition, [class*="condition"]')
                        _v_benefit['benefit_condition'] = _v_condition_elem.text.strip()
                    except:
                        pass
                    
                    if _v_benefit['benefit_name']:
                        _v_benefits.append(_v_benefit)
                    
                except Exception as e:
                    logger.debug(f"   혜택 {idx} 파싱 실패: {e}")
                    continue
            
            logger.info(f"   ✅ 혜택 수집: {len(_v_benefits)}개")
            return _v_benefits
            
        except Exception as e:
            logger.error(f"   ❌ 혜택 수집 실패: {e}")
            return []
    
    def _collect_faqs(self):
        """FAQ 수집"""
        _v_faqs = []
        
        try:
            # FAQ 섹션 찾기
            try:
                _v_faq_btn = self.driver.find_element(By.XPATH, "//*[contains(text(), 'FAQ') or contains(text(), '자주')]")
                _v_faq_btn.click()
                time.sleep(1)
            except:
                pass
            
            # FAQ 요소 찾기
            _v_faq_selectors = [
                '.faq-item',
                '.qa-item',
                '[class*="faq"]',
                '.accordion-item'
            ]
            
            _v_faq_elements = []
            for selector in _v_faq_selectors:
                try:
                    _v_faq_elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if _v_faq_elements:
                        break
                except:
                    continue
            
            for idx, elem in enumerate(_v_faq_elements, 1):
                try:
                    _v_faq = {
                        'question': None,
                        'answer': None,
                        'category': None
                    }
                    
                    # 질문
                    try:
                        _v_question_elem = elem.find_element(By.CSS_SELECTOR, '.question, .q, [class*="question"]')
                        _v_faq['question'] = _v_question_elem.text.strip()
                    except:
                        pass
                    
                    # 답변
                    try:
                        _v_answer_elem = elem.find_element(By.CSS_SELECTOR, '.answer, .a, [class*="answer"]')
                        _v_faq['answer'] = _v_answer_elem.text.strip()
                    except:
                        pass
                    
                    if _v_faq['question'] and _v_faq['answer']:
                        _v_faqs.append(_v_faq)
                    
                except Exception as e:
                    logger.debug(f"   FAQ {idx} 파싱 실패: {e}")
                    continue
            
            logger.info(f"   ✅ FAQ 수집: {len(_v_faqs)}개")
            return _v_faqs
            
        except Exception as e:
            logger.error(f"   ❌ FAQ 수집 실패: {e}")
            return []
    
    def _collect_comments(self):
        """댓글 수집"""
        _v_comments = []
        
        try:
            # 댓글 섹션으로 스크롤
            try:
                _v_comment_section = self.driver.find_element(By.CSS_SELECTOR, '.comment-section, .reply-section, [class*="comment"]')
                self.driver.execute_script("arguments[0].scrollIntoView();", _v_comment_section)
                time.sleep(1)
            except:
                pass
            
            # 댓글 요소 찾기
            _v_comment_selectors = [
                '.comment-item',
                '.reply-item',
                '[class*="comment"]',
                '.review-item'
            ]
            
            _v_comment_elements = []
            for selector in _v_comment_selectors:
                try:
                    _v_comment_elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    if _v_comment_elements:
                        break
                except:
                    continue
            
            for idx, elem in enumerate(_v_comment_elements[:100], 1):  # 최대 100개
                try:
                    _v_comment = {
                        'author': None,
                        'content': None,
                        'rating': None,
                        'created_at': None
                    }
                    
                    # 작성자
                    try:
                        _v_author_elem = elem.find_element(By.CSS_SELECTOR, '.author, .user, .name, [class*="author"]')
                        _v_comment['author'] = _v_author_elem.text.strip()
                    except:
                        _v_comment['author'] = 'Anonymous'
                    
                    # 댓글 내용
                    try:
                        _v_content_elem = elem.find_element(By.CSS_SELECTOR, '.content, .text, .message, p')
                        _v_comment['content'] = _v_content_elem.text.strip()
                    except:
                        _v_comment['content'] = elem.text.strip()
                    
                    # 평점
                    try:
                        _v_rating_elem = elem.find_element(By.CSS_SELECTOR, '.rating, .star, [class*="rating"]')
                        _v_rating_text = _v_rating_elem.text.strip()
                        _v_rating_match = re.search(r'(\d+)', _v_rating_text)
                        if _v_rating_match:
                            _v_comment['rating'] = int(_v_rating_match.group(1))
                    except:
                        pass
                    
                    # 작성일
                    try:
                        _v_date_elem = elem.find_element(By.CSS_SELECTOR, '.date, .time, [class*="date"]')
                        _v_comment['created_at'] = _v_date_elem.text.strip()
                    except:
                        pass
                    
                    if _v_comment['content']:
                        _v_comments.append(_v_comment)
                    
                except Exception as e:
                    logger.debug(f"   댓글 {idx} 파싱 실패: {e}")
                    continue
            
            logger.info(f"   ✅ 댓글 수집: {len(_v_comments)}개")
            return _v_comments
            
        except Exception as e:
            logger.error(f"   ❌ 댓글 수집 실패: {e}")
            return []
    
    def save_to_supabase(self, p_data):
        """
        Supabase에 데이터 저장
        
        Args:
            p_data (dict): 수집된 데이터
        """
        try:
            logger.info("💾 Supabase에 데이터 저장 중...")
            
            _v_live_id = p_data['live_id']
            _v_basic_info = p_data['basic_info']
            
            # 1. 라이브 방송 기본 정보 저장
            _v_broadcast_data = {
                'live_id': _v_live_id,
                'channel_code': p_data['channel_code'],
                'platform_name': p_data['platform_name'],
                'brand_name': _v_basic_info.get('brand_name', '아모레퍼시픽'),
                'live_title_customer': _v_basic_info.get('title', '제목 없음'),
                'source_url': p_data['source_url'],
                'thumbnail_url': _v_basic_info.get('thumbnail_url'),
                'broadcast_date': datetime.now().date().isoformat(),
                'status': _v_basic_info.get('status', 'ACTIVE'),
                'collected_at': p_data['collected_at']
            }
            
            # UPSERT (있으면 업데이트, 없으면 삽입)
            self.supabase.table('live_broadcasts').upsert(_v_broadcast_data).execute()
            logger.info(f"   ✅ 라이브 방송 정보 저장: {_v_live_id}")
            
            # 2. 상품 정보 저장 (테이블 스키마에 맞게 변환)
            if p_data['products']:
                for product in p_data['products']:
                    _v_product_data = {
                        'live_id': _v_live_id,
                        'product_order': product.get('product_order', 0),
                        'product_name': product.get('product_name'),
                        'original_price': product.get('original_price'),
                        'sale_price': product.get('sale_price'),
                        'discount_rate': product.get('discount_rate'),
                        'product_url': product.get('product_url')
                    }
                    try:
                        self.supabase.table('live_products').insert(_v_product_data).execute()
                    except Exception as e:
                        logger.debug(f"   상품 저장 실패: {e}")
                logger.info(f"   ✅ 상품 {len(p_data['products'])}개 저장")
            
            # 3. 혜택 정보 저장
            if p_data['benefits']:
                for benefit in p_data['benefits']:
                    benefit['live_id'] = _v_live_id
                    try:
                        self.supabase.table('live_benefits').insert(benefit).execute()
                    except Exception as e:
                        logger.debug(f"   혜택 저장 실패: {e}")
                logger.info(f"   ✅ 혜택 {len(p_data['benefits'])}개 저장")
            
            # 4. FAQ 저장
            if p_data['faqs']:
                for faq in p_data['faqs']:
                    faq['live_id'] = _v_live_id
                    faq['faq_id'] = f"{_v_live_id}_FAQ_{len(p_data['faqs'])}"
                    try:
                        self.supabase.table('live_faqs').insert(faq).execute()
                    except Exception as e:
                        logger.debug(f"   FAQ 저장 실패: {e}")
                logger.info(f"   ✅ FAQ {len(p_data['faqs'])}개 저장")
            
            # 5. 댓글 저장
            if p_data['comments']:
                for comment in p_data['comments']:
                    comment['live_id'] = _v_live_id
                    try:
                        self.supabase.table('live_comments').insert(comment).execute()
                    except Exception as e:
                        logger.debug(f"   댓글 저장 실패: {e}")
                logger.info(f"   ✅ 댓글 {len(p_data['comments'])}개 저장")
            
            logger.info("✅ Supabase 저장 완료")
            
        except Exception as e:
            logger.error(f"❌ Supabase 저장 실패: {e}")
            self.stats['errors'].append(str(e))
    
    def run(self, p_live_url):
        """
        크롤러 실행
        
        Args:
            p_live_url (str): 아모레몰 라이브 URL
        """
        try:
            # 드라이버 초기화
            if not self.init_driver():
                return False
            
            # 데이터 수집
            _v_data = self.crawl_live_data(p_live_url)
            
            if _v_data:
                # Supabase 저장
                self.save_to_supabase(_v_data)
                return True
            else:
                return False
            
        except Exception as e:
            logger.error(f"❌ 크롤러 실행 실패: {e}")
            self.stats['errors'].append(str(e))
            return False
        finally:
            self.close_driver()
    
    def print_stats(self):
        """통계 출력"""
        logger.info("=" * 80)
        logger.info("📊 크롤링 통계")
        logger.info("=" * 80)
        logger.info(f"처리 완료: {self.stats['total_processed']}개")
        logger.info(f"상품 수집: {self.stats['products_collected']}개")
        logger.info(f"혜택 수집: {self.stats['benefits_collected']}개")
        logger.info(f"FAQ 수집: {self.stats['faqs_collected']}개")
        logger.info(f"댓글 수집: {self.stats['comments_collected']}개")
        logger.info(f"에러: {len(self.stats['errors'])}개")
        logger.info("=" * 80)


def main():
    """메인 함수"""
    # 샘플 URL
    sample_url = "https://www.amoremall.com/kr/ko/display/live/playerweb?sy_id=678f729865cf422cde50d959&sy_type=broadcast"
    
    logger.info("=" * 80)
    logger.info("🚀 아모레몰 라이브 크롤러 시작")
    logger.info("=" * 80)
    
    crawler = AmoremallLiveCrawler()
    success = crawler.run(sample_url)
    
    crawler.print_stats()
    
    if success:
        logger.info("✅ 크롤링 성공")
    else:
        logger.info("❌ 크롤링 실패")


if __name__ == "__main__":
    main()

