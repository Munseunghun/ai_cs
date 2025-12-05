#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
네이버 쇼핑라이브 종합 크롤러
상품, 쿠폰, 혜택, 댓글, 채팅, FAQ, 라이브 소개 등 모든 정보 수집
"""

import sys
import time
import json
import logging
import re
from datetime import datetime, timedelta
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


class ComprehensiveNaverCrawler:
    """네이버 쇼핑라이브 종합 크롤러"""
    
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
            'coupons_collected': 0,
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
    
    def crawl_comprehensive_data(self, p_live_url, p_live_id, p_brand_name=''):
        """
        라이브 방송의 모든 정보 수집
        
        Args:
            p_live_url (str): 라이브 방송 URL
            p_live_id (str): 라이브 방송 ID
            p_brand_name (str): 브랜드명
            
        Returns:
            dict: 수집된 모든 정보
        """
        try:
            logger.info(f"   🎬 종합 정보 수집 중: {p_live_id}")
            
            # 페이지 로드
            self.driver.get(p_live_url)
            time.sleep(8)  # 페이지 로드 대기
            
            # 스크롤하여 모든 콘텐츠 로드
            for i in range(5):
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(2)
            
            # 상단으로 스크롤
            self.driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(2)
            
            # HTML 파싱
            html = self.driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            
            comprehensive_data = {
                'live_id': p_live_id,
                'brand_name': p_brand_name,
                'products': [],
                'coupons': [],
                'comments': [],
                'faqs': [],
                'intro': {},
                'statistics': {},
                'images': []
            }
            
            # 1. 상품 정보 수집
            products = self._extract_products(soup, p_live_id)
            if products:
                comprehensive_data['products'] = products
                logger.info(f"      ✅ 상품: {len(products)}개")
            
            # 2. 쿠폰 정보 수집
            coupons = self._extract_coupons(soup, p_live_id)
            if coupons:
                comprehensive_data['coupons'] = coupons
                logger.info(f"      ✅ 쿠폰: {len(coupons)}개")
            
            # 3. 댓글/채팅 수집
            comments = self._extract_comments(soup, p_live_id)
            if comments:
                comprehensive_data['comments'] = comments
                logger.info(f"      ✅ 댓글: {len(comments)}개")
            
            # 4. FAQ 수집 (댓글에서 질문 패턴 추출)
            faqs = self._extract_faqs(comments, p_live_id)
            if faqs:
                comprehensive_data['faqs'] = faqs
                logger.info(f"      ✅ FAQ: {len(faqs)}개")
            
            # 5. 라이브 소개 수집
            intro = self._extract_intro(soup, p_live_id, p_brand_name)
            if intro:
                comprehensive_data['intro'] = intro
                logger.info(f"      ✅ 라이브 소개 수집 완료")
            
            # 6. 통계 정보 수집
            statistics = self._extract_statistics(soup, p_live_id)
            if statistics:
                comprehensive_data['statistics'] = statistics
                logger.info(f"      ✅ 통계 정보 수집 완료")
            
            # 7. 이미지 수집
            images = self._extract_images(soup, p_live_id)
            if images:
                comprehensive_data['images'] = images
                logger.info(f"      ✅ 이미지: {len(images)}개")
            
            return comprehensive_data
            
        except Exception as e:
            logger.error(f"   ❌ 종합 정보 수집 실패: {e}")
            return None
    
    def _extract_products(self, p_soup, p_live_id):
        """상품 정보 추출"""
        products = []
        
        try:
            # 네이버 쇼핑라이브 상품 선택자
            product_elements = p_soup.select('[class*="ProductWrapper"], [class*="ProductCard"]')
            
            for idx, elem in enumerate(product_elements[:50], 1):  # 최대 50개
                try:
                    # 상품명
                    name_elem = elem.select_one('[class*="ProductName"]')
                    product_name = name_elem.get_text(strip=True) if name_elem else None
                    
                    if not product_name:
                        continue
                    
                    # 가격 정보
                    price_elem = elem.select_one('[class*="ProductPrice"]')
                    sale_price = None
                    original_price = None
                    discount_rate = None
                    
                    if price_elem:
                        price_text = price_elem.get_text(strip=True)
                        # 할인율 추출
                        discount_match = re.search(r'(\d+)%', price_text)
                        if discount_match:
                            discount_rate = int(discount_match.group(1))
                        
                        # 가격 추출
                        price_numbers = re.findall(r'([\d,]+)원', price_text)
                        if len(price_numbers) >= 2:
                            sale_price = int(price_numbers[1].replace(',', ''))
                            original_price = int(price_numbers[0].replace(',', ''))
                        elif len(price_numbers) == 1:
                            sale_price = int(price_numbers[0].replace(',', ''))
                    
                    # 이미지
                    img_elem = elem.select_one('img')
                    product_image = img_elem.get('src', '') if img_elem else None
                    
                    # 링크
                    link_elem = elem.select_one('a')
                    product_link = link_elem.get('href', '') if link_elem else None
                    
                    # 몰 이름
                    mall_elem = elem.select_one('[class*="MallName"]')
                    mall_name = mall_elem.get_text(strip=True) if mall_elem else None
                    
                    # 배송비
                    delivery_elem = elem.select_one('[class*="delivery"]')
                    delivery_fee = delivery_elem.get_text(strip=True) if delivery_elem else None
                    is_free_delivery = '무료배송' in (delivery_fee or '')
                    
                    product = {
                        'live_id': p_live_id,
                        'product_name': product_name,
                        'sale_price': sale_price,
                        'original_price': original_price,
                        'discount_rate': discount_rate,
                        'product_image_url': product_image,
                        'product_link': product_link,
                        'mall_name': mall_name,
                        'delivery_fee': delivery_fee,
                        'is_free_delivery': is_free_delivery
                    }
                    
                    products.append(product)
                    
                except Exception as e:
                    logger.warning(f"      상품 {idx} 파싱 실패: {e}")
                    continue
        
        except Exception as e:
            logger.warning(f"      상품 추출 실패: {e}")
        
        return products
    
    def _extract_coupons(self, p_soup, p_live_id):
        """쿠폰 정보 추출"""
        coupons = []
        
        try:
            # 쿠폰 선택자
            coupon_elements = p_soup.select('[class*="Coupon"], [class*="coupon"]')
            
            for idx, elem in enumerate(coupon_elements, 1):
                try:
                    coupon_text = elem.get_text(strip=True)
                    
                    if not coupon_text or len(coupon_text) < 3:
                        continue
                    
                    # 할인율 추출
                    discount_rate = None
                    discount_amount = None
                    discount_match = re.search(r'(\d+)%', coupon_text)
                    if discount_match:
                        discount_rate = int(discount_match.group(1))
                    
                    # 할인 금액 추출
                    amount_match = re.search(r'([\d,]+)원', coupon_text)
                    if amount_match:
                        discount_amount = int(amount_match.group(1).replace(',', ''))
                    
                    # 쿠폰 타입 판단
                    coupon_type = '할인쿠폰'
                    if '무료배송' in coupon_text:
                        coupon_type = '무료배송'
                    elif '적립' in coupon_text:
                        coupon_type = '적립쿠폰'
                    
                    coupon = {
                        'live_id': p_live_id,
                        'coupon_name': coupon_text,
                        'coupon_type': coupon_type,
                        'discount_rate': discount_rate,
                        'discount_amount': discount_amount,
                        'is_active': True
                    }
                    
                    coupons.append(coupon)
                    
                except Exception as e:
                    logger.warning(f"      쿠폰 {idx} 파싱 실패: {e}")
                    continue
        
        except Exception as e:
            logger.warning(f"      쿠폰 추출 실패: {e}")
        
        return coupons
    
    def _extract_comments(self, p_soup, p_live_id):
        """댓글/채팅 추출"""
        comments = []
        
        try:
            # 댓글 선택자
            comment_elements = p_soup.select('[class*="comment"], [class*="Comment"], [class*="chat"]')
            
            for idx, elem in enumerate(comment_elements[:100], 1):  # 최대 100개
                try:
                    comment_text = elem.get_text(strip=True)
                    
                    if not comment_text or len(comment_text) < 3:
                        continue
                    
                    # 댓글 타입 판단
                    comment_type = 'comment'
                    if '?' in comment_text or '어떻게' in comment_text or '언제' in comment_text:
                        comment_type = 'question'
                    
                    comment = {
                        'live_id': p_live_id,
                        'comment_text': comment_text,
                        'comment_type': comment_type,
                        'like_count': 0,
                        'reply_count': 0
                    }
                    
                    comments.append(comment)
                    
                except Exception as e:
                    logger.warning(f"      댓글 {idx} 파싱 실패: {e}")
                    continue
        
        except Exception as e:
            logger.warning(f"      댓글 추출 실패: {e}")
        
        return comments
    
    def _extract_faqs(self, p_comments, p_live_id):
        """FAQ 생성 (댓글에서 질문 추출 + 기본 FAQ)"""
        faqs = []
        
        # 댓글에서 질문 추출
        questions = [c for c in p_comments if c.get('comment_type') == 'question']
        
        for idx, q in enumerate(questions[:10], 1):  # 최대 10개
            faq = {
                'live_id': p_live_id,
                'question': q['comment_text'],
                'answer': '상담원이 답변 드리겠습니다.',
                'category': '고객 질문'
            }
            faqs.append(faq)
        
        # 기본 FAQ 추가
        default_faqs = [
            {
                'live_id': p_live_id,
                'question': '배송은 언제 되나요?',
                'answer': '주문 후 2-3일 내 배송됩니다.',
                'category': '배송'
            },
            {
                'live_id': p_live_id,
                'question': '쿠폰은 어떻게 사용하나요?',
                'answer': '방송 중 제공되는 쿠폰 번호를 입력하시면 자동 적용됩니다.',
                'category': '혜택'
            },
            {
                'live_id': p_live_id,
                'question': '반품/교환은 어떻게 하나요?',
                'answer': '수령 후 7일 이내 반품/교환 가능하며, 고객센터로 문의주시면 안내해드립니다.',
                'category': '반품/교환'
            }
        ]
        
        faqs.extend(default_faqs)
        
        return faqs
    
    def _extract_intro(self, p_soup, p_live_id, p_brand_name):
        """라이브 소개 추출"""
        intro = {
            'live_id': p_live_id
        }
        
        try:
            # 제목
            title = p_soup.find('meta', property='og:title')
            if title:
                intro['intro_title'] = title.get('content', '')
            
            # 설명
            desc = p_soup.find('meta', property='og:description')
            if desc:
                intro['intro_description'] = desc.get('content', '')
            
            # 브랜드명
            intro['host_name'] = p_brand_name
            
            # 하이라이트 (제목에서 추출)
            if intro.get('intro_title'):
                highlights = []
                if '할인' in intro['intro_title']:
                    highlights.append('특별 할인')
                if '신상' in intro['intro_title'] or '론칭' in intro['intro_title']:
                    highlights.append('신상품 출시')
                if '%' in intro['intro_title']:
                    highlights.append('파격 할인')
                
                intro['intro_highlights'] = json.dumps(highlights, ensure_ascii=False)
        
        except Exception as e:
            logger.warning(f"      라이브 소개 추출 실패: {e}")
        
        return intro
    
    def _extract_statistics(self, p_soup, p_live_id):
        """통계 정보 추출"""
        statistics = {
            'live_id': p_live_id,
            'view_count': 0,
            'like_count': 0,
            'comment_count': 0
        }
        
        try:
            # 좋아요 수
            like_elem = p_soup.select_one('[class*="Like"], [class*="like"]')
            if like_elem:
                like_text = like_elem.get_text(strip=True)
                like_match = re.search(r'(\d+)', like_text)
                if like_match:
                    statistics['like_count'] = int(like_match.group(1))
        
        except Exception as e:
            logger.warning(f"      통계 추출 실패: {e}")
        
        return statistics
    
    def _extract_images(self, p_soup, p_live_id):
        """이미지 추출"""
        images = []
        
        try:
            # 썸네일
            og_image = p_soup.find('meta', property='og:image')
            if og_image:
                images.append({
                    'live_id': p_live_id,
                    'image_url': og_image.get('content', ''),
                    'image_type': 'thumbnail'
                })
            
            # 제품 이미지 (상위 5개)
            product_images = p_soup.select('img[src*="phinf"]')
            for idx, img in enumerate(product_images[:5], 2):
                images.append({
                    'live_id': p_live_id,
                    'image_url': img.get('src', ''),
                    'image_type': 'product',
                    'image_alt': img.get('alt', '')
                })
        
        except Exception as e:
            logger.warning(f"      이미지 추출 실패: {e}")
        
        return images
    
    def save_comprehensive_data(self, p_data):
        """
        수집된 모든 데이터를 Supabase에 저장
        
        Args:
            p_data (dict): 수집된 종합 데이터
            
        Returns:
            bool: 저장 성공 여부
        """
        try:
            live_id = p_data['live_id']
            logger.info(f"   💾 데이터 저장 중: {live_id}")
            
            # 1. 상품 저장
            if p_data.get('products'):
                for product in p_data['products']:
                    try:
                        self.supabase.table('live_products').upsert(product).execute()
                    except Exception as e:
                        logger.warning(f"      상품 저장 실패: {e}")
                self.stats['products_collected'] += len(p_data['products'])
                logger.info(f"      ✅ 상품 {len(p_data['products'])}개 저장")
            
            # 2. 쿠폰 저장
            if p_data.get('coupons'):
                for coupon in p_data['coupons']:
                    try:
                        self.supabase.table('live_coupons').insert(coupon).execute()
                    except Exception as e:
                        logger.warning(f"      쿠폰 저장 실패: {e}")
                self.stats['coupons_collected'] += len(p_data['coupons'])
                logger.info(f"      ✅ 쿠폰 {len(p_data['coupons'])}개 저장")
            
            # 3. 댓글 저장
            if p_data.get('comments'):
                for comment in p_data['comments']:
                    try:
                        self.supabase.table('live_comments').insert(comment).execute()
                    except Exception as e:
                        logger.warning(f"      댓글 저장 실패: {e}")
                self.stats['comments_collected'] += len(p_data['comments'])
                logger.info(f"      ✅ 댓글 {len(p_data['comments'])}개 저장")
            
            # 4. FAQ 저장
            if p_data.get('faqs'):
                for faq in p_data['faqs']:
                    try:
                        self.supabase.table('live_faqs').insert(faq).execute()
                    except Exception as e:
                        logger.warning(f"      FAQ 저장 실패: {e}")
                self.stats['faqs_collected'] += len(p_data['faqs'])
                logger.info(f"      ✅ FAQ {len(p_data['faqs'])}개 저장")
            
            # 5. 라이브 소개 저장
            if p_data.get('intro') and p_data['intro'].get('intro_title'):
                try:
                    self.supabase.table('live_intro').upsert(
                        p_data['intro'],
                        on_conflict='live_id'
                    ).execute()
                    logger.info(f"      ✅ 라이브 소개 저장")
                except Exception as e:
                    logger.warning(f"      라이브 소개 저장 실패: {e}")
            
            # 6. 통계 저장
            if p_data.get('statistics'):
                try:
                    self.supabase.table('live_statistics').insert(p_data['statistics']).execute()
                    logger.info(f"      ✅ 통계 정보 저장")
                except Exception as e:
                    logger.warning(f"      통계 저장 실패: {e}")
            
            # 7. 이미지 저장
            if p_data.get('images'):
                for image in p_data['images']:
                    try:
                        self.supabase.table('live_images').insert(image).execute()
                    except Exception as e:
                        logger.warning(f"      이미지 저장 실패: {e}")
                logger.info(f"      ✅ 이미지 {len(p_data['images'])}개 저장")
            
            return True
            
        except Exception as e:
            logger.error(f"   ❌ 데이터 저장 중 에러: {e}")
            return False
    
    def crawl_live(self, p_live_url, p_live_id, p_brand_name=''):
        """라이브 방송 1개 크롤링 및 저장"""
        try:
            # 종합 데이터 수집
            data = self.crawl_comprehensive_data(p_live_url, p_live_id, p_brand_name)
            
            if data:
                # 데이터 저장
                if self.save_comprehensive_data(data):
                    self.stats['total_processed'] += 1
                    return True
            
            return False
            
        except Exception as e:
            logger.error(f"   ❌ 크롤링 실패: {e}")
            self.stats['errors'].append({
                'live_id': p_live_id,
                'error': str(e)
            })
            return False


def main():
    """메인 함수"""
    try:
        crawler = ComprehensiveNaverCrawler()
        
        # 드라이버 초기화
        if not crawler.init_driver():
            logger.error("❌ 드라이버 초기화 실패")
            return 1
        
        # 테스트: 샘플 URL 크롤링
        test_url = "https://view.shoppinglive.naver.com/replays/1744150?fm=shoppinglive&sn=home&tr=lim"
        test_live_id = "REAL_NAVER_라네즈_1744150"
        test_brand = "라네즈"
        
        logger.info("🎯 종합 크롤링 시작")
        logger.info(f"   URL: {test_url}")
        logger.info(f"   Live ID: {test_live_id}")
        logger.info(f"   Brand: {test_brand}")
        logger.info("=" * 80)
        
        # 크롤링 실행
        success = crawler.crawl_live(test_url, test_live_id, test_brand)
        
        # 드라이버 종료
        crawler.close_driver()
        
        # 최종 통계
        logger.info("=" * 80)
        logger.info("🎉 크롤링 완료!")
        logger.info(f"   - 처리 성공: {crawler.stats['total_processed']}개")
        logger.info(f"   - 상품 수집: {crawler.stats['products_collected']}개")
        logger.info(f"   - 쿠폰 수집: {crawler.stats['coupons_collected']}개")
        logger.info(f"   - 댓글 수집: {crawler.stats['comments_collected']}개")
        logger.info(f"   - FAQ 수집: {crawler.stats['faqs_collected']}개")
        logger.info(f"   - 에러: {len(crawler.stats['errors'])}개")
        logger.info("=" * 80)
        
        return 0 if success else 1
        
    except Exception as e:
        logger.error(f"❌ 프로그램 실행 실패: {e}")
        return 1


if __name__ == '__main__':
    sys.exit(main())
