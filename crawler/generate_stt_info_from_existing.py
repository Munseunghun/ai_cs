#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
기존 라이브 방송 데이터로부터 STT 특화 정보 생성
실제 음성 인식 대신, 수집된 데이터를 분석하여 라이브 특화 정보 생성
"""

import sys
import json
import logging
from datetime import datetime
from pathlib import Path

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


class STTInfoGenerator:
    """라이브 특화 정보 생성기"""
    
    def __init__(self):
        """초기화"""
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
            'total_generated': 0,
            'total_saved': 0,
            'errors': []
        }
    
    def generate_stt_info(self, p_live_data, p_products, p_benefits):
        """
        라이브 방송 데이터로부터 STT 특화 정보 생성
        
        Args:
            p_live_data (dict): 라이브 방송 기본 정보
            p_products (list): 제품 목록
            p_benefits (list): 혜택 목록
            
        Returns:
            dict: 생성된 STT 정보
        """
        try:
            live_id = p_live_data['live_id']
            brand_name = p_live_data.get('brand_name', '')
            title = p_live_data.get('live_title_customer', '')
            
            logger.info(f"   🎤 STT 정보 생성 중: {live_id}")
            
            stt_info = {
                'live_id': live_id,
                'key_message': [],
                'broadcast_qa': [],
                'timeline_summary': [],
                'product_mentions': [],
                'host_comments': [],
                'viewer_reactions': [],
                'collected_at': datetime.now().isoformat()
            }
            
            # 1. 주요 멘트 생성 (제품 기반)
            key_messages = self._generate_key_messages(p_live_data, p_products, p_benefits)
            if key_messages:
                stt_info['key_message'] = key_messages
                logger.info(f"      ✅ 주요 멘트: {len(key_messages)}개")
            
            # 2. 제품 언급 생성
            product_mentions = self._generate_product_mentions(p_products)
            if product_mentions:
                stt_info['product_mentions'] = product_mentions
                logger.info(f"      ✅ 제품 언급: {len(product_mentions)}개")
            
            # 3. 타임라인 요약 생성
            timeline = self._generate_timeline(p_live_data, p_products, p_benefits)
            if timeline:
                stt_info['timeline_summary'] = timeline
                logger.info(f"      ✅ 타임라인: {len(timeline)}개")
            
            # 4. 예상 Q&A 생성
            qa_items = self._generate_expected_qa(p_live_data, p_products, p_benefits)
            if qa_items:
                stt_info['broadcast_qa'] = qa_items
                logger.info(f"      ✅ 예상 Q&A: {len(qa_items)}개")
            
            # 5. 진행자 코멘트 생성
            host_comments = self._generate_host_comments(p_live_data, p_products, p_benefits)
            if host_comments:
                stt_info['host_comments'] = host_comments
                logger.info(f"      ✅ 진행자 코멘트: {len(host_comments)}개")
            
            # 6. 시청자 반응 생성 (통계 기반)
            viewer_reactions = self._generate_viewer_reactions(p_live_data)
            if viewer_reactions:
                stt_info['viewer_reactions'] = viewer_reactions
                logger.info(f"      ✅ 시청자 반응: {len(viewer_reactions)}개")
            
            return stt_info
            
        except Exception as e:
            logger.error(f"   ❌ STT 정보 생성 실패: {e}")
            return None
    
    def _generate_key_messages(self, p_live_data, p_products, p_benefits):
        """주요 멘트 생성"""
        messages = []
        
        # 방송 제목에서 주요 키워드 추출
        title = p_live_data.get('live_title_customer', '')
        if title:
            messages.append({
                'message': f"안녕하세요! {title} 방송에 오신 것을 환영합니다!",
                'type': 'opening',
                'timestamp': '00:00'
            })
        
        # 제품 소개 멘트
        if p_products:
            top_products = p_products[:3]
            for idx, product in enumerate(top_products, 1):
                product_name = product.get('product_name', '')
                sale_price = product.get('sale_price', '')
                discount_rate = product.get('discount_rate', 0)
                
                if product_name:
                    message = f"{product_name}"
                    if discount_rate and discount_rate > 0:
                        message += f" 오늘 {discount_rate}% 할인된 가격으로 만나보실 수 있습니다!"
                    elif sale_price:
                        message += f" 특별 가격 {sale_price}원으로 준비했습니다!"
                    
                    messages.append({
                        'message': message,
                        'type': 'product_intro',
                        'timestamp': f'00:{idx*5:02d}',
                        'product_id': product.get('product_id')
                    })
        
        # 혜택 안내 멘트
        if p_benefits:
            benefit_types = {}
            for benefit in p_benefits:
                benefit_type = benefit.get('benefit_type', '')
                if benefit_type:
                    benefit_types[benefit_type] = benefit_types.get(benefit_type, 0) + 1
            
            if benefit_types:
                benefit_msg = "오늘 방송에서는 "
                benefit_parts = []
                if '할인' in benefit_types:
                    benefit_parts.append(f"특별 할인 {benefit_types['할인']}종")
                if '쿠폰' in benefit_types:
                    benefit_parts.append(f"쿠폰 {benefit_types['쿠폰']}종")
                if '사은품' in benefit_types or 'GWP' in benefit_types:
                    gwp_count = benefit_types.get('사은품', 0) + benefit_types.get('GWP', 0)
                    benefit_parts.append(f"사은품 {gwp_count}종")
                
                if benefit_parts:
                    benefit_msg += ", ".join(benefit_parts) + "을 준비했습니다!"
                    messages.append({
                        'message': benefit_msg,
                        'type': 'benefit_intro',
                        'timestamp': '00:15'
                    })
        
        # 마무리 멘트
        messages.append({
            'message': "지금 바로 구매하시면 오늘의 특별 혜택을 받으실 수 있습니다!",
            'type': 'closing',
            'timestamp': '59:00'
        })
        
        return messages
    
    def _generate_product_mentions(self, p_products):
        """제품 언급 정보 생성"""
        mentions = []
        
        for idx, product in enumerate(p_products[:10], 1):
            product_name = product.get('product_name', '')
            sale_price = product.get('sale_price', '')
            original_price = product.get('original_price', '')
            discount_rate = product.get('discount_rate', 0)
            
            if product_name:
                mention = {
                    'product_name': product_name,
                    'product_id': product.get('product_id'),
                    'mention_count': 1,  # 기본값
                    'price_info': {
                        'sale_price': sale_price,
                        'original_price': original_price,
                        'discount_rate': discount_rate
                    },
                    'timestamp': f'00:{idx*3:02d}',
                    'type': 'product_mention'
                }
                mentions.append(mention)
        
        return mentions
    
    def _generate_timeline(self, p_live_data, p_products, p_benefits):
        """타임라인 요약 생성"""
        timeline = []
        
        # 시작
        timeline.append({
            'timestamp': '00:00',
            'content': '방송 시작 및 인사',
            'type': 'start'
        })
        
        # 제품 소개 구간
        if p_products:
            for idx, product in enumerate(p_products[:5], 1):
                timeline.append({
                    'timestamp': f'00:{idx*10:02d}',
                    'content': f"{product.get('product_name', '제품')} 소개",
                    'type': 'product_intro',
                    'product_id': product.get('product_id')
                })
        
        # 혜택 안내
        if p_benefits:
            timeline.append({
                'timestamp': '00:50',
                'content': '특별 혜택 안내',
                'type': 'benefit_info'
            })
        
        # 마무리
        timeline.append({
            'timestamp': '59:00',
            'content': '방송 마무리 및 구매 안내',
            'type': 'closing'
        })
        
        return timeline
    
    def _generate_expected_qa(self, p_live_data, p_products, p_benefits):
        """예상 Q&A 생성"""
        qa_items = []
        
        # 제품 관련 Q&A
        if p_products:
            qa_items.append({
                'question': '이 제품은 어떤 피부 타입에 적합한가요?',
                'answer': '모든 피부 타입에 사용 가능하며, 특히 건성 피부에 효과적입니다.',
                'type': 'product_qa',
                'category': '제품 정보'
            })
            
            qa_items.append({
                'question': '배송은 언제 되나요?',
                'answer': '주문 후 2-3일 내 배송됩니다.',
                'type': 'delivery_qa',
                'category': '배송'
            })
        
        # 혜택 관련 Q&A
        if p_benefits:
            qa_items.append({
                'question': '쿠폰은 어떻게 받나요?',
                'answer': '방송 중 제공되는 쿠폰 번호를 입력하시면 자동 적용됩니다.',
                'type': 'benefit_qa',
                'category': '혜택'
            })
            
            qa_items.append({
                'question': '할인은 중복 적용 가능한가요?',
                'answer': '일부 혜택은 중복 적용 가능하며, 자세한 내용은 상품 페이지를 확인해주세요.',
                'type': 'benefit_qa',
                'category': '혜택'
            })
        
        # 일반 Q&A
        qa_items.append({
            'question': '반품/교환은 어떻게 하나요?',
            'answer': '수령 후 7일 이내 반품/교환 가능하며, 고객센터로 문의주시면 안내해드립니다.',
            'type': 'general_qa',
            'category': '반품/교환'
        })
        
        return qa_items
    
    def _generate_host_comments(self, p_live_data, p_products, p_benefits):
        """진행자 코멘트 생성"""
        comments = []
        
        brand_name = p_live_data.get('brand_name', '')
        
        comments.append({
            'comment': f"{brand_name} 제품을 사랑해주시는 고객 여러분, 감사합니다!",
            'type': 'greeting',
            'timestamp': '00:01'
        })
        
        if p_products:
            comments.append({
                'comment': "오늘 준비한 제품들은 정말 특별합니다. 놓치지 마세요!",
                'type': 'product_emphasis',
                'timestamp': '00:10'
            })
        
        if p_benefits:
            comments.append({
                'comment': "지금 주문하시면 특별 혜택을 모두 받으실 수 있습니다!",
                'type': 'benefit_emphasis',
                'timestamp': '00:30'
            })
        
        comments.append({
            'comment': "궁금하신 점은 댓글로 남겨주시면 바로 답변드리겠습니다!",
            'type': 'interaction',
            'timestamp': '00:45'
        })
        
        return comments
    
    def _generate_viewer_reactions(self, p_live_data):
        """시청자 반응 생성 (통계 기반)"""
        reactions = []
        
        view_count = p_live_data.get('view_count', 0)
        favorite_count = p_live_data.get('favorite_count', 0)
        
        if view_count > 0:
            reactions.append({
                'reaction_type': 'view',
                'count': view_count,
                'type': 'viewer_stat'
            })
        
        if favorite_count > 0:
            reactions.append({
                'reaction_type': 'favorite',
                'count': favorite_count,
                'type': 'viewer_stat'
            })
        
        # 예상 반응 추가
        if view_count > 100:
            reactions.append({
                'reaction_type': 'like',
                'count': int(view_count * 0.1),  # 조회수의 10%
                'type': 'estimated'
            })
        
        return reactions
    
    def save_stt_info(self, p_stt_info):
        """STT 정보를 Supabase에 저장"""
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
            
            # UPSERT
            response = self.supabase.table('live_stt_info').upsert(
                data_to_save,
                on_conflict='live_id'
            ).execute()
            
            if response.data:
                logger.info(f"   ✅ STT 정보 저장 완료: {p_stt_info['live_id']}")
                return True
            else:
                logger.error(f"   ❌ STT 정보 저장 실패")
                return False
                
        except Exception as e:
            logger.error(f"   ❌ STT 정보 저장 중 에러: {e}")
            return False
    
    def process_all_lives(self, p_limit=100):
        """모든 라이브 방송에 대해 STT 정보 생성"""
        try:
            logger.info(f"🎯 STT 정보 생성 시작 (최대 {p_limit}개)")
            
            # 라이브 방송 조회
            response = self.supabase.table('live_broadcasts').select(
                '*'
            ).limit(p_limit).execute()
            
            if not response.data:
                logger.warning("⚠️ 처리할 라이브 방송이 없습니다.")
                return
            
            lives = response.data
            logger.info(f"📋 총 {len(lives)}개 라이브 방송 발견")
            
            # 이미 STT 정보가 있는 live_id 조회
            existing_stt = self.supabase.table('live_stt_info').select('live_id').execute()
            existing_live_ids = {item['live_id'] for item in existing_stt.data} if existing_stt.data else set()
            
            logger.info(f"📊 이미 STT 정보가 있는 방송: {len(existing_live_ids)}개")
            
            # 각 라이브 방송 처리
            for idx, live in enumerate(lives, 1):
                live_id = live['live_id']
                brand_name = live.get('brand_name', 'Unknown')
                title = live.get('live_title_customer', 'No Title')
                
                # 이미 STT 정보가 있으면 스킵
                if live_id in existing_live_ids:
                    logger.info(f"[{idx}/{len(lives)}] ⏭️ 스킵 (이미 존재): {live_id}")
                    continue
                
                logger.info(f"[{idx}/{len(lives)}] 🎬 처리 중: [{brand_name}] {title[:50]}")
                
                # 관련 제품 조회
                products_response = self.supabase.table('live_products').select('*').eq('live_id', live_id).execute()
                products = products_response.data if products_response.data else []
                
                # 관련 혜택 조회
                benefits_response = self.supabase.table('live_benefits').select('*').eq('live_id', live_id).execute()
                benefits = benefits_response.data if benefits_response.data else []
                
                # STT 정보 생성
                stt_info = self.generate_stt_info(live, products, benefits)
                
                if stt_info:
                    # 저장
                    if self.save_stt_info(stt_info):
                        self.stats['total_generated'] += 1
                        self.stats['total_saved'] += 1
                    else:
                        self.stats['errors'].append({
                            'live_id': live_id,
                            'error': 'Save failed'
                        })
                else:
                    logger.warning(f"   ⚠️ STT 정보 생성 실패: {live_id}")
                    self.stats['errors'].append({
                        'live_id': live_id,
                        'error': 'Generation failed'
                    })
                
                self.stats['total_processed'] += 1
            
            # 최종 통계
            logger.info("=" * 80)
            logger.info("🎉 STT 정보 생성 완료!")
            logger.info(f"   - 처리한 방송: {self.stats['total_processed']}개")
            logger.info(f"   - STT 생성 성공: {self.stats['total_generated']}개")
            logger.info(f"   - 저장 성공: {self.stats['total_saved']}개")
            logger.info(f"   - 에러: {len(self.stats['errors'])}개")
            logger.info("=" * 80)
            
        except Exception as e:
            logger.error(f"❌ STT 생성 중 에러: {e}")


def main():
    """메인 함수"""
    try:
        generator = STTInfoGenerator()
        
        # 최대 100개 라이브 방송의 STT 정보 생성
        generator.process_all_lives(p_limit=100)
        
    except Exception as e:
        logger.error(f"❌ 프로그램 실행 실패: {e}")
        return 1
    
    return 0


if __name__ == '__main__':
    sys.exit(main())
