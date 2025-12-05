"""
Supabase 클라이언트 모듈
크롤러에서 수집한 데이터를 Supabase에 저장하는 기능 제공
"""

import os
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

# 환경변수 로드
load_dotenv()

# 로거 설정
_v_logger = logging.getLogger(__name__)

# Supabase 설정
SUPABASE_URL = os.getenv('SUPABASE_URL', '')
SUPABASE_ANON_KEY = os.getenv('SUPABASE_ANON_KEY', '')

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    _v_logger.error('Supabase 설정이 누락되었습니다. SUPABASE_URL과 SUPABASE_ANON_KEY를 확인해주세요.')
    raise ValueError('Supabase 설정이 필요합니다.')

# Supabase 클라이언트 생성
_v_supabase_client: Optional[Client] = None

def get_supabase_client() -> Client:
    """
    Supabase 클라이언트 인스턴스 반환 (싱글톤 패턴)
    
    Returns:
        Client: Supabase 클라이언트 인스턴스
    """
    global _v_supabase_client
    
    if _v_supabase_client is None:
        _v_supabase_client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
        _v_logger.info('Supabase 클라이언트가 생성되었습니다.')
    
    return _v_supabase_client


def get_channel_id_by_code(p_channel_code: str) -> Optional[int]:
    """
    채널 코드로 채널 ID 조회
    
    Args:
        p_channel_code (str): 채널 코드 (예: 'NAVER', 'KAKAO')
        
    Returns:
        Optional[int]: 채널 ID 또는 None
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('channels').select('channel_id').eq('channel_code', p_channel_code).execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]['channel_id']
        
        return None
    except Exception as p_error:
        _v_logger.error(f'채널 ID 조회 실패 ({p_channel_code}): {p_error}')
        return None


def save_live_broadcast(p_live_data: Dict[str, Any]) -> Optional[str]:
    """
    라이브 방송 데이터를 Supabase에 저장
    
    Args:
        p_live_data (dict): 라이브 방송 데이터 (metadata, schedule, products, benefits 등 포함)
        
    Returns:
        Optional[str]: 저장된 live_id 또는 None (실패 시)
    """
    try:
        supabase = get_supabase_client()
        
        # meta와 metadata 둘 다 지원
        meta = p_live_data.get('meta') or p_live_data.get('metadata', {})
        schedule = p_live_data.get('schedule', {})
        
        if not meta or not meta.get('live_id'):
            _v_logger.warn('라이브 ID가 없습니다.')
            return None
        
        # 채널 코드 결정
        platform_name = meta.get('platform_name', '네이버')
        channel_code_map = {
            '네이버': 'NAVER',
            '카카오': 'KAKAO',
            '11번가': '11ST',
            'G마켓': 'GMARKET',
            '올리브영': 'OLIVEYOUNG',
            '그립': 'GRIP',
            '무신사': 'MUSINSA',
            '롯데온': 'LOTTEON',
            '아모레몰': 'AMOREMALL',
            '100라이브': '100LIVE',
        }
        
        channel_code = channel_code_map.get(platform_name, 'NAVER')
        
        # 채널 ID 조회
        channel_id = get_channel_id_by_code(channel_code)
        if not channel_id:
            _v_logger.warn(f'채널을 찾을 수 없습니다: {channel_code}')
            return None
        
        # 날짜 파싱
        broadcast_date = schedule.get('broadcast_date') or meta.get('collected_at', '').split('T')[0] if meta.get('collected_at') else datetime.now().strftime('%Y-%m-%d')
        benefit_start = schedule.get('benefit_start_datetime') or None
        benefit_end = schedule.get('benefit_end_datetime') or None
        
        # 라이브 방송 기본 정보 저장
        broadcast_data = {
            'live_id': meta['live_id'],
            'channel_id': channel_id,
            'channel_code': channel_code,
            'platform_name': platform_name,
            'brand_name': meta.get('brand_name', ''),
            'live_title_customer': meta.get('live_title_customer') or meta.get('live_title_cs', ''),
            'live_title_cs': meta.get('live_title_cs', ''),
            'source_url': meta.get('source_url', ''),
            'thumbnail_url': meta.get('thumbnail_url', ''),
            'broadcast_date': broadcast_date,
            'broadcast_start_time': schedule.get('broadcast_start_time') or None,
            'broadcast_end_time': schedule.get('broadcast_end_time') or None,
            'benefit_valid_type': schedule.get('benefit_valid_type') or None,
            'benefit_start_datetime': benefit_start,
            'benefit_end_datetime': benefit_end,
            'broadcast_type': schedule.get('broadcast_type') or schedule.get('broadcast_format') or None,
            'status': meta.get('status', 'PENDING'),
            'collected_at': meta.get('collected_at') or datetime.now().isoformat(),
        }
        
        # UPSERT (기존 데이터가 있으면 업데이트, 없으면 삽입)
        response = supabase.table('live_broadcasts').upsert(broadcast_data, on_conflict='live_id').execute()
        
        if response.data:
            _v_logger.info(f'✅ 라이브 방송 저장 완료: {meta["live_id"]} - {meta.get("live_title_customer", "")}')
        else:
            _v_logger.warn(f'⚠️ 라이브 방송 저장 실패: {meta["live_id"]}')
            return None
        
        live_id = meta['live_id']
        
        # 기존 관련 데이터 삭제 (상품, 혜택 등)
        # Supabase는 CASCADE DELETE를 지원하지만, 명시적으로 삭제하는 것이 안전함
        _delete_related_data(supabase, live_id)
        
        # 상품 정보 저장
        if p_live_data.get('products'):
            products = p_live_data['products']
            if isinstance(products, list):
                _save_products(supabase, live_id, products)
            elif isinstance(products, dict):
                product_list = products.get('product_list') or products.get('product_details') or []
                _save_products(supabase, live_id, product_list)
        
        # 혜택 정보 저장
        if p_live_data.get('benefits'):
            _save_benefits(supabase, live_id, p_live_data['benefits'])
        
        # STT 기반 정보 처리 (크롤러에서 수집한 stt_info)
        # stt_info는 live_specific과 동일한 구조이거나 별도로 제공될 수 있음
        stt_info = p_live_data.get('stt_info') or p_live_data.get('live_specific', {})
        
        # 키 멘션 저장 (STT 기반 key_message 또는 live_specific에서)
        key_mentions = []
        if stt_info.get('key_message'):
            key_message = stt_info['key_message']
            # JSON 문자열인 경우 파싱
            if isinstance(key_message, str):
                try:
                    import json
                    key_mentions = json.loads(key_message)
                except (json.JSONDecodeError, ValueError):
                    # JSON이 아닌 경우 문자열 배열로 처리
                    key_mentions = [m.strip() for m in key_message.split('\n') if m.strip()]
            elif isinstance(key_message, list):
                key_mentions = key_message
        elif p_live_data.get('live_specific', {}).get('key_mentions'):
            key_mentions = p_live_data['live_specific']['key_mentions']
        
        if key_mentions:
            _save_key_mentions(supabase, live_id, key_mentions)
        
        # Q&A 저장 (STT 기반 broadcast_qa 또는 live_specific에서)
        broadcast_qa = []
        if stt_info.get('broadcast_qa'):
            broadcast_qa_raw = stt_info['broadcast_qa']
            # JSON 문자열인 경우 파싱
            if isinstance(broadcast_qa_raw, str):
                try:
                    import json
                    broadcast_qa = json.loads(broadcast_qa_raw)
                except (json.JSONDecodeError, ValueError):
                    _v_logger.warning(f'   broadcast_qa 파싱 실패')
                    broadcast_qa = []
            elif isinstance(broadcast_qa_raw, list):
                broadcast_qa = broadcast_qa_raw
        elif p_live_data.get('live_specific', {}).get('broadcast_qa'):
            broadcast_qa = p_live_data['live_specific']['broadcast_qa']
        
        if broadcast_qa:
            _save_qa(supabase, live_id, broadcast_qa)
        
        # 타임라인 저장 (STT 기반 timeline_summary 또는 live_specific에서)
        timeline_data = []
        if stt_info.get('timeline_summary'):
            timeline_summary_raw = stt_info['timeline_summary']
            # JSON 문자열인 경우 파싱
            if isinstance(timeline_summary_raw, str):
                try:
                    import json
                    timeline_data = json.loads(timeline_summary_raw)
                except (json.JSONDecodeError, ValueError):
                    _v_logger.warning(f'   timeline_summary 파싱 실패')
                    timeline_data = []
            elif isinstance(timeline_summary_raw, list):
                timeline_data = timeline_summary_raw
        elif p_live_data.get('live_specific', {}).get('timeline'):
            timeline_data = p_live_data['live_specific']['timeline']
        elif p_live_data.get('live_specific', {}).get('timeline_summary'):
            timeline_data = p_live_data['live_specific']['timeline_summary']
        
        if timeline_data:
            _save_timeline(supabase, live_id, timeline_data)
        
        # 중복 정책 저장
        if p_live_data.get('duplicate_policy'):
            _save_duplicate_policy(supabase, live_id, p_live_data['duplicate_policy'])
        
        # 제한사항 저장
        if p_live_data.get('restrictions'):
            _save_restrictions(supabase, live_id, p_live_data['restrictions'])
        
        # CS 정보 저장
        if p_live_data.get('cs_info'):
            _save_cs_info(supabase, live_id, p_live_data['cs_info'])
        
        # 공지사항 저장
        if p_live_data.get('notice_section', {}).get('notices'):
            _save_notices(supabase, live_id, p_live_data['notice_section']['notices'])
        
        # FAQ 저장
        if p_live_data.get('faq_section', {}).get('categories'):
            _save_faqs(supabase, live_id, p_live_data['faq_section']['categories'])
        
        return live_id
        
    except Exception as p_error:
        _v_logger.error(f'라이브 방송 저장 실패 ({meta.get("live_id", "unknown")}): {p_error}', exc_info=True)
        return None


def _delete_related_data(supabase: Client, live_id: str):
    """관련 데이터 삭제 (상품, 혜택 등)"""
    try:
        # 상품 삭제
        supabase.table('live_products').delete().eq('live_id', live_id).execute()
        # 혜택 삭제
        supabase.table('live_benefits').delete().eq('live_id', live_id).execute()
        # 키 멘션 삭제
        supabase.table('live_chat_messages').delete().eq('live_id', live_id).execute()
        # Q&A 삭제
        supabase.table('live_qa').delete().eq('live_id', live_id).execute()
        # 타임라인 삭제
        supabase.table('live_timeline').delete().eq('live_id', live_id).execute()
        # 중복 정책 삭제
        supabase.table('live_duplicate_policy').delete().eq('live_id', live_id).execute()
        # 제한사항 삭제
        supabase.table('live_restrictions').delete().eq('live_id', live_id).execute()
        # CS 정보 삭제
        supabase.table('live_cs_info').delete().eq('live_id', live_id).execute()
        # 공지사항 삭제
        supabase.table('live_notices').delete().eq('live_id', live_id).execute()
        # FAQ 삭제
        supabase.table('live_faqs').delete().eq('live_id', live_id).execute()
    except Exception as p_error:
        _v_logger.warn(f'관련 데이터 삭제 중 오류 발생 (무시): {p_error}')


def _save_products(supabase: Client, live_id: str, products: List[Dict[str, Any]]):
    """상품 정보 저장"""
    try:
        product_data_list = []
        for product in products:
            product_data = {
                'live_id': live_id,
                'product_order': product.get('product_order', 0),
                'product_name': product.get('product_name', ''),
                'sku': product.get('sku') or None,
                'original_price': product.get('original_price') or None,
                'sale_price': product.get('sale_price') or None,
                'discount_rate': product.get('discount_rate') or None,
                'product_type': product.get('product_type') or None,
                'stock_info': product.get('stock_info') or None,
                'set_composition': product.get('set_composition') or None,
                'product_url': product.get('product_url') or None,
            }
            product_data_list.append(product_data)
        
        if product_data_list:
            supabase.table('live_products').insert(product_data_list).execute()
            _v_logger.info(f'   상품 {len(product_data_list)}개 저장 완료')
    except Exception as p_error:
        _v_logger.error(f'상품 저장 실패: {p_error}')


def _save_benefits(supabase: Client, live_id: str, benefits: Dict[str, Any]):
    """혜택 정보 저장"""
    try:
        benefit_data_list = []
        
        # 할인 정보
        if benefits.get('discounts') and isinstance(benefits['discounts'], list):
            for discount in benefits['discounts']:
                benefit_data_list.append({
                    'live_id': live_id,
                    'benefit_type': '할인',
                    'benefit_name': discount.get('discount_type') or discount.get('benefit_name', ''),
                    'benefit_detail': discount.get('discount_detail') or discount.get('benefit_detail', ''),
                    'benefit_condition': discount.get('discount_condition') or discount.get('benefit_condition') or None,
                    'benefit_valid_period': discount.get('discount_valid_period') or discount.get('benefit_valid_period') or None,
                    'quantity_limit': discount.get('quantity_limit') or None,
                })
        
        # 사은품 정보
        if benefits.get('gifts') and isinstance(benefits['gifts'], list):
            for gift in benefits['gifts']:
                benefit_data_list.append({
                    'live_id': live_id,
                    'benefit_type': '사은품',
                    'benefit_name': gift.get('gift_name') or gift.get('benefit_name', ''),
                    'benefit_detail': gift.get('gift_detail') or gift.get('benefit_detail', ''),
                    'benefit_condition': gift.get('gift_condition') or gift.get('benefit_condition') or None,
                    'quantity_limit': gift.get('gift_quantity_limit') or gift.get('quantity_limit') or None,
                })
        
        # 쿠폰 정보
        if benefits.get('coupons') and isinstance(benefits['coupons'], list):
            for coupon in benefits['coupons']:
                benefit_data_list.append({
                    'live_id': live_id,
                    'benefit_type': '쿠폰',
                    'benefit_name': coupon.get('coupon_name') or coupon.get('coupon_detail', ''),
                    'benefit_detail': coupon.get('coupon_detail') or coupon.get('benefit_detail', ''),
                    'benefit_condition': coupon.get('coupon_issue_condition') or coupon.get('benefit_condition') or None,
                })
        
        # 포인트 정보
        if benefits.get('points') and isinstance(benefits['points'], list):
            for point in benefits['points']:
                benefit_data_list.append({
                    'live_id': live_id,
                    'benefit_type': '포인트',
                    'benefit_name': point.get('point_name') or point.get('benefit_name', ''),
                    'benefit_detail': point.get('point_detail') or point.get('benefit_detail', ''),
                    'benefit_condition': point.get('point_condition') or point.get('benefit_condition') or None,
                })
        
        # 배송 정보
        if benefits.get('shipping') and isinstance(benefits['shipping'], list):
            for shipping in benefits['shipping']:
                benefit_data_list.append({
                    'live_id': live_id,
                    'benefit_type': '배송',
                    'benefit_name': shipping.get('shipping_type') or shipping.get('benefit_name', ''),
                    'benefit_detail': shipping.get('shipping_detail') or shipping.get('benefit_detail', ''),
                    'benefit_condition': shipping.get('shipping_condition') or shipping.get('benefit_condition') or None,
                })
        
        if benefit_data_list:
            supabase.table('live_benefits').insert(benefit_data_list).execute()
            _v_logger.info(f'   혜택 {len(benefit_data_list)}개 저장 완료')
    except Exception as p_error:
        _v_logger.error(f'혜택 저장 실패: {p_error}')


def _save_key_mentions(supabase: Client, live_id: str, mentions: List[str]):
    """키 멘션 저장"""
    try:
        mention_data_list = []
        for mention in mentions:
            # "[시간] 내용" 형식 파싱
            if '] ' in mention:
                time_part = mention.split('] ')[0].replace('[', '')
                content = mention.split('] ', 1)[1]
            else:
                time_part = ''
                content = mention
            
            mention_data_list.append({
                'live_id': live_id,
                'message_time': time_part,
                'message_content': content,
                'message_type': 'MENTION',
            })
        
        if mention_data_list:
            supabase.table('live_chat_messages').insert(mention_data_list).execute()
            _v_logger.info(f'   키 멘션 {len(mention_data_list)}개 저장 완료')
    except Exception as p_error:
        _v_logger.error(f'키 멘션 저장 실패: {p_error}')


def _save_qa(supabase: Client, live_id: str, qa_list: List[Dict[str, Any]]):
    """Q&A 저장"""
    try:
        qa_data_list = []
        for qa in qa_list:
            qa_data_list.append({
                'live_id': live_id,
                'question': qa.get('question', ''),
                'answer': qa.get('answer', ''),
                'questioner': qa.get('questioner') or None,
                'answerer': qa.get('answerer') or None,
                'question_date': qa.get('question_date') or None,
                'answer_date': qa.get('answer_date') or None,
                'is_answered': bool(qa.get('answer')),
                'helpful_count': qa.get('helpful_count', 0),
                'status': '답변완료' if qa.get('answer') else '답변대기',
            })
        
        if qa_data_list:
            supabase.table('live_qa').insert(qa_data_list).execute()
            _v_logger.info(f'   Q&A {len(qa_data_list)}개 저장 완료')
    except Exception as p_error:
        _v_logger.error(f'Q&A 저장 실패: {p_error}')


def _save_timeline(supabase: Client, live_id: str, timeline: List[Dict[str, Any]]):
    """타임라인 저장"""
    try:
        timeline_data_list = []
        for item in timeline:
            timeline_data_list.append({
                'live_id': live_id,
                'time': item.get('time', ''),
                'content': item.get('content', ''),
            })
        
        if timeline_data_list:
            supabase.table('live_timeline').insert(timeline_data_list).execute()
            _v_logger.info(f'   타임라인 {len(timeline_data_list)}개 저장 완료')
    except Exception as p_error:
        _v_logger.error(f'타임라인 저장 실패: {p_error}')


def _save_duplicate_policy(supabase: Client, live_id: str, policy: Dict[str, Any]):
    """중복 정책 저장"""
    try:
        policy_data = {
            'live_id': live_id,
            'coupon_duplicate': policy.get('coupon_duplicate') or None,
            'point_duplicate': policy.get('point_duplicate') or None,
            'other_promotion_duplicate': policy.get('other_promotion_duplicate') or None,
            'employee_discount': policy.get('employee_discount') or None,
            'duplicate_note': policy.get('duplicate_note') or None,
        }
        
        supabase.table('live_duplicate_policy').upsert(policy_data, on_conflict='live_id').execute()
        _v_logger.info('   중복 정책 저장 완료')
    except Exception as p_error:
        _v_logger.error(f'중복 정책 저장 실패: {p_error}')


def _save_restrictions(supabase: Client, live_id: str, restrictions: Dict[str, Any]):
    """제한사항 저장"""
    try:
        restriction_data_list = []
        
        restriction_type_map = {
            'excluded_products': '제외상품',
            'channel_restrictions': '채널제한',
            'payment_restrictions': '결제제한',
            'region_restrictions': '지역제한',
            'other_restrictions': '기타제한',
        }
        
        for key, restriction_type in restriction_type_map.items():
            if restrictions.get(key) and isinstance(restrictions[key], list):
                for detail in restrictions[key]:
                    restriction_data_list.append({
                        'live_id': live_id,
                        'restriction_type': restriction_type,
                        'restriction_detail': detail if isinstance(detail, str) else str(detail),
                    })
        
        if restriction_data_list:
            supabase.table('live_restrictions').insert(restriction_data_list).execute()
            _v_logger.info(f'   제한사항 {len(restriction_data_list)}개 저장 완료')
    except Exception as p_error:
        _v_logger.error(f'제한사항 저장 실패: {p_error}')


def _save_cs_info(supabase: Client, live_id: str, cs_info: Dict[str, Any]):
    """CS 정보 저장 (예상 고객 질문, CS 응답 스크립트 등)"""
    try:
        import json
        
        # expected_questions 파싱 (JSON 문자열 또는 배열)
        expected_questions = []
        if cs_info.get('expected_questions'):
            expected_questions_raw = cs_info['expected_questions']
            if isinstance(expected_questions_raw, str):
                try:
                    expected_questions = json.loads(expected_questions_raw)
                except (json.JSONDecodeError, ValueError):
                    # JSON이 아닌 경우 문자열 배열로 처리
                    expected_questions = [q.strip() for q in expected_questions_raw.split('\n') if q.strip()]
            elif isinstance(expected_questions_raw, list):
                expected_questions = expected_questions_raw
        
        # response_scripts 파싱 (JSON 문자열 또는 배열)
        response_scripts = []
        if cs_info.get('response_scripts'):
            response_scripts_raw = cs_info['response_scripts']
            if isinstance(response_scripts_raw, str):
                try:
                    response_scripts = json.loads(response_scripts_raw)
                except (json.JSONDecodeError, ValueError):
                    _v_logger.warning(f'   response_scripts 파싱 실패')
                    response_scripts = []
            elif isinstance(response_scripts_raw, list):
                response_scripts = response_scripts_raw
        
        # risk_points 파싱 (JSON 문자열 또는 배열)
        risk_points = []
        if cs_info.get('risk_points'):
            risk_points_raw = cs_info['risk_points']
            if isinstance(risk_points_raw, str):
                try:
                    risk_points = json.loads(risk_points_raw)
                except (json.JSONDecodeError, ValueError):
                    # JSON이 아닌 경우 문자열 배열로 처리
                    risk_points = [r.strip() for r in risk_points_raw.split('\n') if r.strip()]
            elif isinstance(risk_points_raw, list):
                risk_points = risk_points_raw
        
        cs_data = {
            'live_id': live_id,
            'expected_questions': expected_questions if expected_questions else [],
            'response_scripts': response_scripts if response_scripts else [],
            'risk_points': risk_points if risk_points else [],
            'cs_note': cs_info.get('cs_note') or cs_info.get('cs_notes') or None,
        }
        
        supabase.table('live_cs_info').upsert(cs_data, on_conflict='live_id').execute()
        _v_logger.info(f'   CS 정보 저장 완료 (예상 질문: {len(expected_questions)}개, 응답 스크립트: {len(response_scripts)}개)')
    except Exception as p_error:
        _v_logger.error(f'CS 정보 저장 실패: {p_error}')


def _save_notices(supabase: Client, live_id: str, notices: List[Dict[str, Any]]):
    """공지사항 저장"""
    try:
        notice_data_list = []
        for notice in notices:
            notice_data_list.append({
                'notice_id': notice.get('notice_id') or f'NOTICE_{live_id}_{int(datetime.now().timestamp())}',
                'live_id': live_id,
                'title': notice.get('title', ''),
                'content': notice.get('content', ''),
                'post_date': notice.get('post_date') or None,
                'view_count': notice.get('view_count', 0),
                'is_important': notice.get('is_important', False),
            })
        
        if notice_data_list:
            supabase.table('live_notices').insert(notice_data_list).execute()
            _v_logger.info(f'   공지사항 {len(notice_data_list)}개 저장 완료')
    except Exception as p_error:
        _v_logger.error(f'공지사항 저장 실패: {p_error}')


def _save_faqs(supabase: Client, live_id: str, categories: List[Dict[str, Any]]):
    """FAQ 저장"""
    try:
        faq_data_list = []
        for category in categories:
            category_name = category.get('category_name') or category.get('category', '')
            faqs = category.get('faqs', [])
            
            for faq in faqs:
                faq_data_list.append({
                    'faq_id': faq.get('faq_id') or f'FAQ_{live_id}_{int(datetime.now().timestamp())}',
                    'live_id': live_id,
                    'category': category_name,
                    'question': faq.get('question', ''),
                    'answer': faq.get('answer', ''),
                    'view_count': faq.get('view_count', 0),
                    'helpful_count': faq.get('helpful_count', 0),
                })
        
        if faq_data_list:
            supabase.table('live_faqs').insert(faq_data_list).execute()
            _v_logger.info(f'   FAQ {len(faq_data_list)}개 저장 완료')
    except Exception as p_error:
        _v_logger.error(f'FAQ 저장 실패: {p_error}')



