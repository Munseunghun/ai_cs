"""
크롤러에서 Supabase에 데이터 저장하는 예제
이 파일은 크롤러에 Supabase 저장 기능을 통합하는 방법을 보여줍니다.
"""

import sys
import logging
from datetime import datetime

# 로컬 모듈 임포트
sys.path.append('.')
from supabase_client import save_live_broadcast

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
_v_logger = logging.getLogger(__name__)


def crawl_and_save_to_supabase(p_broadcast_url):
    """
    네이버 쇼핑라이브 방송을 크롤링하고 Supabase에 저장하는 예제
    
    Args:
        p_broadcast_url (str): 크롤링할 방송 URL
        
    Returns:
        str: 저장된 live_id 또는 None
    """
    try:
        _v_logger.info(f"=== 크롤링 및 Supabase 저장 시작 ===")
        _v_logger.info(f"URL: {p_broadcast_url}")
        
        # 1. 크롤링 로직 (기존 크롤러 사용)
        # 예: parse_naver_shopping_live() 또는 NaverLiveDetailParser 사용
        # 여기서는 예제 데이터를 사용합니다.
        
        # 실제 크롤링 코드 예시:
        # from parsers.naver_live_detail_parser import NaverLiveDetailParser
        # parser = NaverLiveDetailParser()
        # live_data = parser.parse(p_broadcast_url)
        
        # 예제 데이터 (실제로는 크롤링 결과)
        live_data = {
            'metadata': {
                'live_id': f'REAL_NAVER_{int(datetime.now().timestamp())}',
                'platform_name': '네이버',
                'brand_name': '설화수',
                'live_title_customer': '🔴 LIVE | 설화수 윤조에센스 특별 방송',
                'live_title_cs': '설화수 네이버 윤조에센스 라이브',
                'source_url': p_broadcast_url,
                'thumbnail_url': '',
                'status': 'ACTIVE',
                'collected_at': datetime.now().isoformat(),
            },
            'schedule': {
                'broadcast_date': datetime.now().strftime('%Y-%m-%d'),
                'broadcast_start_time': '20:00',
                'broadcast_end_time': '21:30',
                'benefit_valid_type': '방송 중만',
                'benefit_start_datetime': f"{datetime.now().strftime('%Y-%m-%d')} 20:00:00",
                'benefit_end_datetime': f"{datetime.now().strftime('%Y-%m-%d')} 21:30:00",
                'broadcast_type': '단독라이브',
            },
            'products': [
                {
                    'product_order': 1,
                    'product_name': '윤조에센스 60ml 본품',
                    'sku': 'SWS-YJE-001',
                    'original_price': '220,000원',
                    'sale_price': '176,000원',
                    'discount_rate': '20%',
                    'product_type': '대표',
                    'stock_info': '재고 충분',
                    'set_composition': '',
                    'product_url': '',
                },
                {
                    'product_order': 2,
                    'product_name': '윤조에센스 기획세트',
                    'sku': 'SWS-YJE-SET',
                    'original_price': '280,000원',
                    'sale_price': '224,000원',
                    'discount_rate': '20%',
                    'product_type': '세트',
                    'stock_info': '재고 충분',
                    'set_composition': '본품 + 미니어처 3종',
                    'product_url': '',
                }
            ],
            'benefits': {
                'discounts': [
                    {
                        'discount_type': '%할인',
                        'discount_detail': '라이브 방송 중 전 상품 20% 할인',
                        'discount_condition': '라이브 방송 중',
                        'discount_valid_period': f"{datetime.now().strftime('%Y-%m-%d')} 20:00 ~ 21:30"
                    }
                ],
                'gifts': [
                    {
                        'gift_type': '구매조건형',
                        'gift_name': '윤조 미니어처 세트',
                        'gift_condition': '10만원 이상 구매 시',
                        'gift_quantity_limit': '선착순 100명'
                    }
                ],
                'coupons': [
                    {
                        'coupon_type': '브랜드쿠폰',
                        'coupon_detail': '설화수 전용 10,000원 쿠폰',
                        'coupon_issue_condition': '라이브 시청 후 다운로드',
                    }
                ],
                'shipping': [
                    {
                        'shipping_type': '무료배송',
                        'shipping_detail': '전 상품 무료배송',
                        'shipping_condition': '구매 금액 무관'
                    }
                ]
            },
            'duplicate_policy': {
                'coupon_duplicate': '불가',
                'point_duplicate': '가능',
                'other_promotion_duplicate': '불가',
                'employee_discount': '불가',
                'duplicate_note': '쿠폰은 1개만 선택 가능합니다.'
            },
            'restrictions': {
                'excluded_products': [],
                'channel_restrictions': ['네이버 앱/웹에서만 구매 가능'],
            },
        }
        
        # 2. Supabase에 저장
        _v_logger.info("Supabase에 데이터 저장 중...")
        live_id = save_live_broadcast(live_data)
        
        if live_id:
            _v_logger.info(f"✅ 저장 완료: {live_id}")
            return live_id
        else:
            _v_logger.error("❌ 저장 실패")
            return None
            
    except Exception as p_error:
        _v_logger.error(f"크롤링 및 저장 실패: {p_error}", exc_info=True)
        return None


def integrate_with_existing_crawler():
    """
    기존 크롤러에 Supabase 저장 기능 통합하는 방법 예제
    
    기존 크롤러 코드 (crawl_naver_shopping_live.py 등)에 다음과 같이 추가:
    
    1. supabase_client 임포트 추가:
       from supabase_client import save_live_broadcast
    
    2. 크롤링 후 데이터 변환:
       # 기존 데이터베이스 저장 로직 대신 또는 추가로
       live_data = {
           'metadata': {
               'live_id': event_data['external_id'],
               'platform_name': '네이버',
               'brand_name': extracted_brand_name,
               'live_title_customer': event_data['title'],
               'live_title_cs': event_data.get('subtitle', ''),
               'source_url': event_data['event_url'],
               'status': 'ACTIVE' if is_active else 'PENDING',
               'collected_at': datetime.now().isoformat(),
           },
           'schedule': {
               'broadcast_date': event_data['start_date'],
               'broadcast_start_time': extracted_start_time,
               'broadcast_end_time': extracted_end_time,
           },
           'products': extracted_products,
           'benefits': extracted_benefits,
       }
    
    3. Supabase에 저장:
       save_live_broadcast(live_data)
    """
    pass


if __name__ == '__main__':
    # 예제 실행
    test_url = 'https://shoppinglive.naver.com/lives/312345'
    result = crawl_and_save_to_supabase(test_url)
    
    if result:
        print(f"\n✅ 성공적으로 저장되었습니다: {result}")
    else:
        print("\n❌ 저장에 실패했습니다.")



