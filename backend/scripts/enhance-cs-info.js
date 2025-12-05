/**
 * CS 응대용 정보 강화 스크립트
 * 기존 라이브 방송 데이터에 풍부한 CS 정보 추가
 * 
 * 사용법:
 *   node scripts/enhance-cs-info.js
 */

require('dotenv').config();
const { supabase, update, select } = require('../src/config/supabase');
const logger = require('../src/config/logger');

/**
 * 브랜드별 맞춤형 CS 정보 생성
 */
function generateEnhancedCsInfo(liveData) {
  const brandName = liveData.brand_name || '아모레퍼시픽';
  const platformName = liveData.platform_name || '네이버';
  const liveTitle = liveData.live_title_customer || liveData.live_title_cs || '';
  const broadcastDate = liveData.broadcast_date || '';
  const broadcastStartTime = liveData.broadcast_start_time || '';
  const broadcastEndTime = liveData.broadcast_end_time || '';
  
  // 1. 예상 고객 질문 (10-15개)
  const expectedQuestions = [
    {
      category: '방송 일정',
      question: '라이브 방송은 언제 시작하나요?',
      frequency: 'high',
      priority: 1
    },
    {
      category: '방송 일정',
      question: '방송 시간이 몇 시간 동안 진행되나요?',
      frequency: 'high',
      priority: 2
    },
    {
      category: '방송 일정',
      question: '다시보기가 가능한가요?',
      frequency: 'high',
      priority: 3
    },
    {
      category: '혜택',
      question: '라이브 방송에서만 받을 수 있는 특별 혜택이 있나요?',
      frequency: 'high',
      priority: 4
    },
    {
      category: '혜택',
      question: '할인율은 얼마나 되나요?',
      frequency: 'high',
      priority: 5
    },
    {
      category: '혜택',
      question: '쿠폰은 어떻게 받나요?',
      frequency: 'high',
      priority: 6
    },
    {
      category: '혜택',
      question: '사은품은 무엇인가요?',
      frequency: 'medium',
      priority: 7
    },
    {
      category: '혜택',
      question: '적립금이나 포인트 혜택이 있나요?',
      frequency: 'medium',
      priority: 8
    },
    {
      category: '상품',
      question: '어떤 제품이 판매되나요?',
      frequency: 'high',
      priority: 9
    },
    {
      category: '상품',
      question: '세트 구성은 어떻게 되나요?',
      frequency: 'medium',
      priority: 10
    },
    {
      category: '상품',
      question: '품절된 상품은 언제 재입고 되나요?',
      frequency: 'medium',
      priority: 11
    },
    {
      category: '주문/결제',
      question: '주문은 언제까지 가능한가요?',
      frequency: 'high',
      priority: 12
    },
    {
      category: '주문/결제',
      question: '결제 방법은 무엇이 있나요?',
      frequency: 'medium',
      priority: 13
    },
    {
      category: '주문/결제',
      question: '무통장 입금도 가능한가요?',
      frequency: 'low',
      priority: 14
    },
    {
      category: '배송',
      question: '배송비는 얼마인가요?',
      frequency: 'high',
      priority: 15
    },
    {
      category: '배송',
      question: '무료배송 조건이 있나요?',
      frequency: 'high',
      priority: 16
    },
    {
      category: '배송',
      question: '배송은 언제 출발하나요?',
      frequency: 'high',
      priority: 17
    },
    {
      category: '배송',
      question: '배송 기간은 얼마나 걸리나요?',
      frequency: 'medium',
      priority: 18
    },
    {
      category: '교환/환불',
      question: '교환/환불이 가능한가요?',
      frequency: 'high',
      priority: 19
    },
    {
      category: '교환/환불',
      question: '교환/환불 기간은 얼마나 되나요?',
      frequency: 'medium',
      priority: 20
    },
    {
      category: '교환/환불',
      question: '개봉한 제품도 반품이 가능한가요?',
      frequency: 'medium',
      priority: 21
    },
    {
      category: '중복 적용',
      question: '다른 쿠폰과 중복 사용이 가능한가요?',
      frequency: 'high',
      priority: 22
    },
    {
      category: '중복 적용',
      question: '임직원 할인과 중복 적용이 되나요?',
      frequency: 'medium',
      priority: 23
    },
    {
      category: '회원 혜택',
      question: '회원 등급별로 추가 혜택이 있나요?',
      frequency: 'medium',
      priority: 24
    },
    {
      category: '기타',
      question: '재고는 충분한가요?',
      frequency: 'medium',
      priority: 25
    }
  ];
  
  // 2. CS 응답 스크립트 (각 질문에 대한 상세 답변)
  const responseScripts = [
    {
      question_category: '방송 일정',
      question: '라이브 방송은 언제 시작하나요?',
      response_template: `안녕하세요, 고객님.\n\n${brandName} 라이브 방송은 ${broadcastDate} ${broadcastStartTime}에 시작됩니다.\n\n방송 시작 전에 ${platformName} 앱/웹사이트에서 알림 설정을 해두시면 방송 시작 시 알림을 받으실 수 있습니다.\n\n감사합니다.`,
      tone: 'friendly',
      estimated_response_time: '30초',
      keywords: ['방송 시간', '시작 시간', '일정'],
      related_questions: ['방송 시간이 몇 시간 동안 진행되나요?', '다시보기가 가능한가요?']
    },
    {
      question_category: '방송 일정',
      question: '방송 시간이 몇 시간 동안 진행되나요?',
      response_template: `안녕하세요, 고객님.\n\n라이브 방송은 ${broadcastStartTime}부터 ${broadcastEndTime}까지 약 ${calculateDuration(broadcastStartTime, broadcastEndTime)}간 진행됩니다.\n\n방송 중에는 실시간으로 질문하실 수 있으며, 다양한 혜택과 이벤트가 진행됩니다.\n\n감사합니다.`,
      tone: 'informative',
      estimated_response_time: '30초',
      keywords: ['방송 시간', '진행 시간', '소요 시간'],
      related_questions: ['라이브 방송은 언제 시작하나요?', '다시보기가 가능한가요?']
    },
    {
      question_category: '방송 일정',
      question: '다시보기가 가능한가요?',
      response_template: `안녕하세요, 고객님.\n\n라이브 방송 종료 후 다시보기가 가능합니다.\n\n다만, 라이브 방송 중에만 제공되는 특별 혜택(쿠폰, 사은품 등)은 다시보기에서는 제공되지 않을 수 있으니, 가능하시면 실시간 방송 시청을 권장드립니다.\n\n감사합니다.`,
      tone: 'helpful',
      estimated_response_time: '45초',
      keywords: ['다시보기', '재방송', 'VOD'],
      related_questions: ['라이브 방송은 언제 시작하나요?', '라이브 방송에서만 받을 수 있는 특별 혜택이 있나요?']
    },
    {
      question_category: '혜택',
      question: '라이브 방송에서만 받을 수 있는 특별 혜택이 있나요?',
      response_template: `안녕하세요, 고객님.\n\n라이브 방송에서는 다음과 같은 특별 혜택을 제공합니다:\n\n1. 라이브 전용 할인가\n2. 선착순 쿠폰 (방송 중 공개)\n3. 구매 고객 대상 사은품\n4. 추가 적립금 혜택\n\n자세한 혜택 내용은 방송 중에 확인하실 수 있으며, 일부 혜택은 선착순으로 제공되오니 서둘러 참여해주세요.\n\n감사합니다.`,
      tone: 'enthusiastic',
      estimated_response_time: '1분',
      keywords: ['특별 혜택', '라이브 혜택', '독점 혜택'],
      related_questions: ['할인율은 얼마나 되나요?', '쿠폰은 어떻게 받나요?', '사은품은 무엇인가요?']
    },
    {
      question_category: '혜택',
      question: '할인율은 얼마나 되나요?',
      response_template: `안녕하세요, 고객님.\n\n라이브 방송에서는 제품별로 다양한 할인율이 적용됩니다.\n\n일반적으로 정가 대비 20~50% 할인된 가격으로 판매되며, 일부 인기 제품은 더 높은 할인율이 적용될 수 있습니다.\n\n정확한 할인율은 방송 중에 제품별로 안내해드리며, 추가 쿠폰 적용 시 더욱 저렴하게 구매하실 수 있습니다.\n\n감사합니다.`,
      tone: 'informative',
      estimated_response_time: '45초',
      keywords: ['할인율', '할인가', '가격'],
      related_questions: ['라이브 방송에서만 받을 수 있는 특별 혜택이 있나요?', '쿠폰은 어떻게 받나요?']
    },
    {
      question_category: '혜택',
      question: '쿠폰은 어떻게 받나요?',
      response_template: `안녕하세요, 고객님.\n\n라이브 방송 쿠폰은 다음과 같이 받으실 수 있습니다:\n\n1. 방송 화면에 표시되는 쿠폰 번호를 입력\n2. 방송 중 공지되는 링크를 통해 다운로드\n3. 댓글 이벤트 참여 시 자동 지급\n\n쿠폰은 선착순으로 제공되는 경우가 많으니, 방송 시작 시간에 맞춰 참여해주시기 바랍니다.\n\n쿠폰 사용 기한과 조건은 쿠폰별로 다르니 꼭 확인해주세요.\n\n감사합니다.`,
      tone: 'instructive',
      estimated_response_time: '1분',
      keywords: ['쿠폰', '쿠폰 받기', '쿠폰 다운로드'],
      related_questions: ['라이브 방송에서만 받을 수 있는 특별 혜택이 있나요?', '다른 쿠폰과 중복 사용이 가능한가요?']
    },
    {
      question_category: '혜택',
      question: '사은품은 무엇인가요?',
      response_template: `안녕하세요, 고객님.\n\n라이브 방송 구매 고객님께는 특별 사은품을 증정해드립니다.\n\n사은품은 구매 금액 또는 구매 제품에 따라 다르게 제공되며, 방송 중에 상세히 안내해드립니다.\n\n일부 사은품은 수량이 한정되어 있어 조기 품절될 수 있으니 서둘러 주문해주세요.\n\n사은품은 주문하신 제품과 함께 배송됩니다.\n\n감사합니다.`,
      tone: 'friendly',
      estimated_response_time: '45초',
      keywords: ['사은품', '증정품', '무료 증정'],
      related_questions: ['라이브 방송에서만 받을 수 있는 특별 혜택이 있나요?', '재고는 충분한가요?']
    },
    {
      question_category: '혜택',
      question: '적립금이나 포인트 혜택이 있나요?',
      response_template: `안녕하세요, 고객님.\n\n라이브 방송 구매 시 일반 구매보다 더 많은 적립금/포인트를 제공해드립니다.\n\n적립률은 회원 등급 및 결제 금액에 따라 달라지며, 일반적으로 구매 금액의 5~10%가 적립됩니다.\n\n적립된 포인트는 다음 구매 시 현금처럼 사용하실 수 있습니다.\n\n자세한 적립 조건은 ${platformName} 사이트의 회원 혜택 페이지를 참고해주세요.\n\n감사합니다.`,
      tone: 'informative',
      estimated_response_time: '1분',
      keywords: ['적립금', '포인트', '마일리지'],
      related_questions: ['라이브 방송에서만 받을 수 있는 특별 혜택이 있나요?', '회원 등급별로 추가 혜택이 있나요?']
    },
    {
      question_category: '상품',
      question: '어떤 제품이 판매되나요?',
      response_template: `안녕하세요, 고객님.\n\n이번 라이브 방송에서는 ${brandName}의 인기 제품들을 특별가로 만나보실 수 있습니다.\n\n판매 제품 목록은 방송 시작 전 ${platformName} 라이브 페이지에서 미리 확인하실 수 있으며, 방송 중에는 각 제품의 특징과 사용법을 자세히 설명해드립니다.\n\n제품별 재고가 한정되어 있으니 관심 제품이 있으시면 서둘러 주문해주세요.\n\n감사합니다.`,
      tone: 'promotional',
      estimated_response_time: '45초',
      keywords: ['제품', '상품', '판매 품목'],
      related_questions: ['세트 구성은 어떻게 되나요?', '품절된 상품은 언제 재입고 되나요?']
    },
    {
      question_category: '상품',
      question: '세트 구성은 어떻게 되나요?',
      response_template: `안녕하세요, 고객님.\n\n라이브 방송에서는 단품 판매와 함께 특별 구성된 세트 상품도 판매합니다.\n\n세트 구성은 제품별로 다르며, 일반적으로 본품 + 미니어처 또는 본품 여러 개 조합으로 구성됩니다.\n\n세트 구매 시 단품 구매보다 더 저렴한 가격으로 구매하실 수 있으며, 추가 사은품도 제공됩니다.\n\n자세한 세트 구성은 방송 중에 화면으로 보여드립니다.\n\n감사합니다.`,
      tone: 'detailed',
      estimated_response_time: '1분',
      keywords: ['세트', '구성', '패키지'],
      related_questions: ['어떤 제품이 판매되나요?', '할인율은 얼마나 되나요?']
    },
    {
      question_category: '상품',
      question: '품절된 상품은 언제 재입고 되나요?',
      response_template: `안녕하세요, 고객님.\n\n품절된 상품의 재입고 일정은 제품별로 다르며, 정확한 일정은 확정되지 않았습니다.\n\n재입고 알림 서비스를 신청하시면 재입고 시 문자 또는 앱 푸시로 알려드립니다.\n\n라이브 방송 제품은 한정 수량으로 판매되므로, 다음 라이브 방송에서 다시 판매될 수 있으니 다음 방송 일정을 확인해주세요.\n\n불편을 드려 죄송하며, 더 나은 서비스로 보답하겠습니다.\n\n감사합니다.`,
      tone: 'apologetic',
      estimated_response_time: '1분',
      keywords: ['품절', '재입고', '재고'],
      related_questions: ['어떤 제품이 판매되나요?', '재고는 충분한가요?']
    },
    {
      question_category: '주문/결제',
      question: '주문은 언제까지 가능한가요?',
      response_template: `안녕하세요, 고객님.\n\n라이브 방송 제품은 방송 중 및 방송 종료 후에도 주문 가능합니다.\n\n다만, 라이브 방송 중에만 제공되는 특별 혜택(쿠폰, 사은품 등)은 방송 종료 시 함께 종료될 수 있습니다.\n\n또한 인기 제품은 조기 품절될 수 있으니, 가능하시면 방송 중에 주문하시는 것을 권장드립니다.\n\n주문 마감 시간은 방송 중에 별도로 안내해드립니다.\n\n감사합니다.`,
      tone: 'urgent',
      estimated_response_time: '1분',
      keywords: ['주문 기간', '주문 마감', '구매 기한'],
      related_questions: ['라이브 방송에서만 받을 수 있는 특별 혜택이 있나요?', '재고는 충분한가요?']
    },
    {
      question_category: '주문/결제',
      question: '결제 방법은 무엇이 있나요?',
      response_template: `안녕하세요, 고객님.\n\n${platformName}에서 지원하는 모든 결제 수단을 사용하실 수 있습니다:\n\n- 신용카드/체크카드\n- 실시간 계좌이체\n- 무통장 입금\n- 간편결제 (네이버페이, 카카오페이 등)\n- 휴대폰 소액결제\n\n결제 방법에 따라 추가 할인이나 무이자 할부 혜택이 제공될 수 있으니, 결제 시 확인해주세요.\n\n감사합니다.`,
      tone: 'informative',
      estimated_response_time: '45초',
      keywords: ['결제', '결제 방법', '지불 수단'],
      related_questions: ['무통장 입금도 가능한가요?', '주문은 언제까지 가능한가요?']
    },
    {
      question_category: '주문/결제',
      question: '무통장 입금도 가능한가요?',
      response_template: `안녕하세요, 고객님.\n\n네, 무통장 입금도 가능합니다.\n\n주문 시 결제 방법에서 '무통장 입금'을 선택하시면 입금 계좌가 안내됩니다.\n\n무통장 입금의 경우 입금 확인 후 배송이 시작되므로, 다른 결제 방법보다 배송이 1~2일 늦어질 수 있습니다.\n\n또한 입금 기한 내에 입금하지 않으시면 주문이 자동 취소되니 유의해주세요.\n\n감사합니다.`,
      tone: 'cautionary',
      estimated_response_time: '1분',
      keywords: ['무통장 입금', '계좌이체', '현금 결제'],
      related_questions: ['결제 방법은 무엇이 있나요?', '배송은 언제 출발하나요?']
    },
    {
      question_category: '배송',
      question: '배송비는 얼마인가요?',
      response_template: `안녕하세요, 고객님.\n\n배송비는 구매 금액에 따라 다르게 적용됩니다:\n\n- 3만원 이상 구매 시: 무료배송\n- 3만원 미만 구매 시: 2,500원\n\n일부 도서산간 지역은 추가 배송비가 발생할 수 있으며, 제주도 및 도서산간 지역은 주문 시 별도 안내됩니다.\n\n라이브 방송 제품은 무료배송 조건이 더 유리할 수 있으니 방송 중에 확인해주세요.\n\n감사합니다.`,
      tone: 'clear',
      estimated_response_time: '45초',
      keywords: ['배송비', '배송료', '택배비'],
      related_questions: ['무료배송 조건이 있나요?', '배송은 언제 출발하나요?']
    },
    {
      question_category: '배송',
      question: '무료배송 조건이 있나요?',
      response_template: `안녕하세요, 고객님.\n\n네, 무료배송 조건이 있습니다.\n\n일반적으로 3만원 이상 구매 시 무료배송이 제공되며, 라이브 방송 제품은 더 낮은 금액에서도 무료배송이 가능할 수 있습니다.\n\n또한 특정 제품이나 세트 상품은 금액과 관계없이 무료배송이 제공될 수 있으니, 방송 중에 확인해주세요.\n\n무료배송 조건은 주문 시 자동으로 적용됩니다.\n\n감사합니다.`,
      tone: 'helpful',
      estimated_response_time: '45초',
      keywords: ['무료배송', '배송비 무료', '무료 택배'],
      related_questions: ['배송비는 얼마인가요?', '배송은 언제 출발하나요?']
    },
    {
      question_category: '배송',
      question: '배송은 언제 출발하나요?',
      response_template: `안녕하세요, 고객님.\n\n주문하신 제품은 결제 완료 후 1~2 영업일 내에 출고됩니다.\n\n라이브 방송 제품은 주문이 집중되어 출고가 1~2일 늦어질 수 있으니 양해 부탁드립니다.\n\n출고 시 송장번호가 문자 또는 앱 푸시로 발송되며, ${platformName} 마이페이지에서도 확인하실 수 있습니다.\n\n주말 및 공휴일에는 출고가 되지 않습니다.\n\n감사합니다.`,
      tone: 'informative',
      estimated_response_time: '1분',
      keywords: ['배송 출발', '출고', '발송'],
      related_questions: ['배송 기간은 얼마나 걸리나요?', '무통장 입금도 가능한가요?']
    },
    {
      question_category: '배송',
      question: '배송 기간은 얼마나 걸리나요?',
      response_template: `안녕하세요, 고객님.\n\n배송 기간은 출고 후 1~3일 정도 소요됩니다.\n\n지역에 따라 배송 기간이 다를 수 있으며, 도서산간 지역은 2~5일 정도 소요될 수 있습니다.\n\n배송 조회는 송장번호로 택배사 홈페이지에서 확인하실 수 있으며, 배송 관련 문의는 택배사로 직접 연락해주세요.\n\n빠른 배송을 위해 최선을 다하겠습니다.\n\n감사합니다.`,
      tone: 'reassuring',
      estimated_response_time: '45초',
      keywords: ['배송 기간', '배송 소요 시간', '도착 시간'],
      related_questions: ['배송은 언제 출발하나요?', '배송비는 얼마인가요?']
    },
    {
      question_category: '교환/환불',
      question: '교환/환불이 가능한가요?',
      response_template: `안녕하세요, 고객님.\n\n네, 교환/환불이 가능합니다.\n\n제품 수령 후 7일 이내에 교환/환불 신청이 가능하며, 제품이 미개봉 상태여야 합니다.\n\n단, 다음의 경우 교환/환불이 제한될 수 있습니다:\n- 제품 개봉 또는 사용 흔적이 있는 경우\n- 제품 구성품이 누락된 경우\n- 고객님의 단순 변심으로 인한 반품 시 왕복 배송비 부담\n\n교환/환불 신청은 ${platformName} 마이페이지에서 가능합니다.\n\n감사합니다.`,
      tone: 'formal',
      estimated_response_time: '1분 30초',
      keywords: ['교환', '환불', '반품'],
      related_questions: ['교환/환불 기간은 얼마나 되나요?', '개봉한 제품도 반품이 가능한가요?']
    },
    {
      question_category: '교환/환불',
      question: '교환/환불 기간은 얼마나 되나요?',
      response_template: `안녕하세요, 고객님.\n\n교환/환불 기간은 제품 수령일로부터 7일 이내입니다.\n\n단, 제품에 하자가 있는 경우에는 수령일로부터 30일 이내에 교환/환불이 가능합니다.\n\n교환/환불 신청 후 제품을 반송하시면, 반송 확인 후 3~5 영업일 내에 환불 처리됩니다.\n\n환불은 원래 결제 수단으로 진행되며, 카드 결제의 경우 카드사 정책에 따라 환불 기간이 다를 수 있습니다.\n\n감사합니다.`,
      tone: 'precise',
      estimated_response_time: '1분',
      keywords: ['교환 기간', '환불 기간', '반품 기간'],
      related_questions: ['교환/환불이 가능한가요?', '개봉한 제품도 반품이 가능한가요?']
    },
    {
      question_category: '교환/환불',
      question: '개봉한 제품도 반품이 가능한가요?',
      response_template: `안녕하세요, 고객님.\n\n화장품 특성상 개봉 후에는 원칙적으로 반품이 어렵습니다.\n\n다만, 다음의 경우에는 개봉 후에도 반품이 가능합니다:\n- 제품에 하자가 있는 경우\n- 주문한 제품과 다른 제품이 배송된 경우\n- 제품 사용 중 피부 트러블이 발생한 경우 (의사 소견서 필요)\n\n단순 변심으로 인한 개봉 후 반품은 불가하니, 구매 전 제품 정보를 꼼꼼히 확인해주세요.\n\n감사합니다.`,
      tone: 'cautionary',
      estimated_response_time: '1분',
      keywords: ['개봉 반품', '사용 후 반품', '개봉 후 교환'],
      related_questions: ['교환/환불이 가능한가요?', '교환/환불 기간은 얼마나 되나요?']
    },
    {
      question_category: '중복 적용',
      question: '다른 쿠폰과 중복 사용이 가능한가요?',
      response_template: `안녕하세요, 고객님.\n\n쿠폰 중복 사용 가능 여부는 쿠폰 종류에 따라 다릅니다.\n\n일반적으로:\n- 라이브 방송 쿠폰 + 회원 등급 쿠폰: 중복 사용 가능\n- 라이브 방송 쿠폰 + 장바구니 쿠폰: 중복 사용 불가\n- 제품 쿠폰 + 배송비 쿠폰: 중복 사용 가능\n\n정확한 중복 사용 가능 여부는 각 쿠폰의 상세 조건을 확인해주세요.\n\n주문 시 시스템에서 자동으로 최대 할인이 적용되는 쿠폰 조합을 안내해드립니다.\n\n감사합니다.`,
      tone: 'detailed',
      estimated_response_time: '1분 30초',
      keywords: ['쿠폰 중복', '중복 사용', '쿠폰 조합'],
      related_questions: ['쿠폰은 어떻게 받나요?', '임직원 할인과 중복 적용이 되나요?']
    },
    {
      question_category: '중복 적용',
      question: '임직원 할인과 중복 적용이 되나요?',
      response_template: `안녕하세요, 고객님.\n\n임직원 할인과 라이브 방송 혜택의 중복 적용 여부는 방송별로 다를 수 있습니다.\n\n일반적으로 임직원 할인은 다른 프로모션과 중복 적용이 제한되는 경우가 많으나, 일부 라이브 방송에서는 중복 적용이 가능할 수 있습니다.\n\n정확한 중복 적용 가능 여부는 방송 중에 안내해드리거나, 고객센터로 문의해주시면 확인해드리겠습니다.\n\n감사합니다.`,
      tone: 'professional',
      estimated_response_time: '1분',
      keywords: ['임직원 할인', '직원 할인', '중복 할인'],
      related_questions: ['다른 쿠폰과 중복 사용이 가능한가요?', '라이브 방송에서만 받을 수 있는 특별 혜택이 있나요?']
    },
    {
      question_category: '회원 혜택',
      question: '회원 등급별로 추가 혜택이 있나요?',
      response_template: `안녕하세요, 고객님.\n\n네, 회원 등급에 따라 추가 혜택이 제공됩니다.\n\n- VIP 회원: 추가 5% 할인 + 무료배송 + 전용 사은품\n- 골드 회원: 추가 3% 할인 + 무료배송\n- 실버 회원: 추가 2% 할인\n- 일반 회원: 기본 혜택\n\n회원 등급은 최근 1년간 구매 금액에 따라 자동으로 산정되며, 등급별 혜택은 ${platformName} 사이트에서 확인하실 수 있습니다.\n\n라이브 방송에서는 모든 등급의 회원님께 특별 혜택을 제공합니다.\n\n감사합니다.`,
      tone: 'rewarding',
      estimated_response_time: '1분 30초',
      keywords: ['회원 등급', 'VIP', '멤버십'],
      related_questions: ['적립금이나 포인트 혜택이 있나요?', '라이브 방송에서만 받을 수 있는 특별 혜택이 있나요?']
    },
    {
      question_category: '기타',
      question: '재고는 충분한가요?',
      response_template: `안녕하세요, 고객님.\n\n라이브 방송 제품은 한정 수량으로 준비되어 있어, 인기 제품의 경우 조기 품절될 수 있습니다.\n\n재고 현황은 방송 중에 실시간으로 안내해드리며, 품절 임박 시 별도로 공지해드립니다.\n\n원하시는 제품이 있으시면 방송 시작과 동시에 빠르게 주문하시는 것을 권장드립니다.\n\n품절된 제품은 재입고 알림 서비스를 신청하시면 재입고 시 알려드립니다.\n\n감사합니다.`,
      tone: 'urgent',
      estimated_response_time: '1분',
      keywords: ['재고', '수량', '품절'],
      related_questions: ['품절된 상품은 언제 재입고 되나요?', '주문은 언제까지 가능한가요?']
    }
  ];
  
  // 3. 리스크 포인트 (CS 응대 시 주의사항)
  const riskPoints = [
    {
      category: '허위/과장 광고 방지',
      risk_level: 'critical',
      description: '제품 효능이나 할인율을 과장하여 안내하지 않도록 주의',
      prevention: '제품 설명서 및 공식 자료에 명시된 내용만 안내하고, 개인적인 의견이나 추측은 배제',
      example: '❌ "이 제품 쓰면 주름이 완전히 없어져요" → ✅ "이 제품은 주름 개선에 도움을 줄 수 있습니다"',
      related_law: '표시광고법, 화장품법'
    },
    {
      category: '개인정보 보호',
      risk_level: 'critical',
      description: '고객의 개인정보(전화번호, 주소, 결제정보 등)를 부적절하게 요구하거나 노출하지 않도록 주의',
      prevention: '개인정보는 공식 채널(고객센터, 마이페이지)을 통해서만 확인하고, 라이브 방송 채팅창에서는 절대 요구하지 않음',
      example: '❌ "주문번호와 전화번호를 채팅으로 알려주세요" → ✅ "고객센터(1588-xxxx)로 문의해주시면 확인해드리겠습니다"',
      related_law: '개인정보보호법'
    },
    {
      category: '쿠폰/혜택 오안내',
      risk_level: 'high',
      description: '쿠폰 사용 조건, 유효기간, 중복 적용 가능 여부 등을 잘못 안내하여 고객 불만 발생 방지',
      prevention: '쿠폰 안내 전 반드시 쿠폰 상세 조건을 확인하고, 불확실한 경우 "확인 후 안내드리겠습니다"라고 응대',
      example: '❌ "모든 쿠폰이 중복 사용 가능합니다" → ✅ "쿠폰별로 중복 사용 가능 여부가 다르니, 주문 시 시스템에서 확인해주세요"',
      related_law: '전자상거래법'
    },
    {
      category: '재고/배송 오안내',
      risk_level: 'high',
      description: '재고가 없는 제품을 있다고 안내하거나, 배송 기간을 잘못 안내하여 고객 불만 발생 방지',
      prevention: '재고 현황은 실시간 시스템을 확인하고, 배송 기간은 "일반적으로"라는 표현을 사용하여 변동 가능성을 명시',
      example: '❌ "내일 도착합니다" → ✅ "일반적으로 출고 후 1~3일 내 배송되며, 지역에 따라 다를 수 있습니다"',
      related_law: '전자상거래법'
    },
    {
      category: '교환/환불 정책 오안내',
      risk_level: 'high',
      description: '교환/환불 조건을 잘못 안내하여 고객과 분쟁 발생 방지',
      prevention: '교환/환불 정책은 회사 공식 정책을 정확히 숙지하고, 예외 사항은 반드시 고객센터로 안내',
      example: '❌ "개봉해도 반품 가능합니다" → ✅ "미개봉 제품만 반품 가능하며, 제품 하자 시에는 개봉 후에도 가능합니다"',
      related_law: '전자상거래법, 소비자기본법'
    },
    {
      category: '경쟁사 비방',
      risk_level: 'medium',
      description: '경쟁사 제품이나 서비스를 비방하거나 비교하지 않도록 주의',
      prevention: '경쟁사 관련 질문에는 "저희 제품의 장점을 말씀드리면..."으로 전환하여 응대',
      example: '❌ "A사 제품은 별로예요" → ✅ "저희 제품은 이런 장점이 있습니다"',
      related_law: '공정거래법, 부정경쟁방지법'
    },
    {
      category: '의료/약사법 위반',
      risk_level: 'critical',
      description: '화장품을 의약품처럼 표현하거나 질병 치료 효과를 언급하지 않도록 주의',
      prevention: '질병 관련 질문에는 "화장품은 의약품이 아니므로 질병 치료 효과는 없습니다"라고 명확히 안내',
      example: '❌ "이 제품으로 아토피가 치료됩니다" → ✅ "이 제품은 피부 진정에 도움을 줄 수 있으나, 질병 치료는 병원 진료를 권장드립니다"',
      related_law: '화장품법, 약사법, 의료법'
    },
    {
      category: '가격 오안내',
      risk_level: 'high',
      description: '할인 전 가격, 할인 후 가격, 추가 할인 조건 등을 잘못 안내하여 고객 불만 발생 방지',
      prevention: '가격 안내 시 반드시 화면에 표시된 가격을 확인하고, 추가 할인은 조건을 명확히 안내',
      example: '❌ "이 제품은 50% 할인입니다" → ✅ "정가 5만원에서 30% 할인된 35,000원이며, 쿠폰 적용 시 추가 할인 가능합니다"',
      related_law: '표시광고법, 전자상거래법'
    },
    {
      category: '선착순 혜택 관리',
      risk_level: 'medium',
      description: '선착순 쿠폰이나 사은품이 소진된 후에도 제공 가능하다고 안내하지 않도록 주의',
      prevention: '선착순 혜택은 실시간으로 소진 현황을 확인하고, 소진 시 즉시 공지',
      example: '❌ "지금 주문하시면 사은품 드립니다" (소진 후) → ✅ "선착순 사은품은 소진되었습니다. 양해 부탁드립니다"',
      related_law: '전자상거래법'
    },
    {
      category: '미성년자 판매',
      risk_level: 'medium',
      description: '일부 제품은 미성년자 판매가 제한될 수 있으므로 주의',
      prevention: '연령 제한 제품은 주문 시 본인 인증이 필요함을 안내',
      example: '❌ "누구나 구매 가능합니다" → ✅ "일부 제품은 성인 인증이 필요할 수 있습니다"',
      related_law: '청소년보호법'
    },
    {
      category: '부적절한 표현',
      risk_level: 'medium',
      description: '성별, 나이, 외모 등에 대한 차별적이거나 부적절한 표현 사용 금지',
      prevention: '모든 고객을 존중하는 표현을 사용하고, 개인적인 의견이나 판단은 배제',
      example: '❌ "나이 드신 분들한테 좋아요" → ✅ "모든 연령대에서 사용하실 수 있습니다"',
      related_law: '차별금지법'
    },
    {
      category: '클레임 대응',
      risk_level: 'high',
      description: '고객 불만이나 클레임에 대해 즉흥적으로 보상을 약속하지 않도록 주의',
      prevention: '클레임은 공감과 사과를 먼저 하고, 해결 방안은 고객센터로 안내하여 공식 프로세스를 따름',
      example: '❌ "제품 2개 더 보내드리겠습니다" → ✅ "불편을 드려 죄송합니다. 고객센터로 연락주시면 정확히 확인하여 도와드리겠습니다"',
      related_law: '소비자기본법'
    },
    {
      category: '방송 중 돌발 상황',
      risk_level: 'medium',
      description: '시스템 오류, 가격 오표기, 재고 오류 등 돌발 상황 발생 시 신속하고 투명하게 대응',
      prevention: '돌발 상황 발생 시 즉시 관리자에게 보고하고, 고객에게는 "확인 중입니다"라고 안내 후 정확한 정보를 제공',
      example: '❌ "시스템 오류라 모르겠습니다" → ✅ "일시적인 오류로 확인 중입니다. 잠시만 기다려주시면 정확히 안내드리겠습니다"',
      related_law: '전자상거래법'
    },
    {
      category: '타 채널 비교',
      risk_level: 'low',
      description: '같은 제품이 다른 채널에서 더 저렴하다는 질문에 대한 적절한 응대',
      prevention: '다른 채널 가격은 확인할 수 없다고 안내하고, 현재 라이브 방송의 혜택을 강조',
      example: '❌ "다른 곳이 더 싸면 거기서 사세요" → ✅ "채널별로 혜택이 다를 수 있으며, 저희 라이브에서는 이런 특별 혜택을 제공합니다"',
      related_law: '공정거래법'
    },
    {
      category: '반복 질문 대응',
      risk_level: 'low',
      description: '같은 질문이 반복될 때 짜증내지 않고 친절하게 응대',
      prevention: '자주 묻는 질문은 방송 중 주기적으로 안내하고, 개별 질문에도 친절하게 응대',
      example: '❌ "아까 말씀드렸잖아요" → ✅ "다시 한번 안내드리겠습니다. 배송은..."',
      related_law: 'N/A'
    }
  ];
  
  return {
    expected_questions: expectedQuestions,
    response_scripts: responseScripts,
    risk_points: riskPoints
  };
}

/**
 * 시간 차이 계산 (HH:MM 형식)
 */
function calculateDuration(startTime, endTime) {
  if (!startTime || !endTime) return '약 1시간';
  
  try {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const diffMinutes = endMinutes - startMinutes;
    
    if (diffMinutes < 60) {
      return `약 ${diffMinutes}분`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return minutes > 0 ? `약 ${hours}시간 ${minutes}분` : `약 ${hours}시간`;
    }
  } catch (error) {
    return '약 1시간';
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  try {
    logger.info('='.repeat(60));
    logger.info('CS 정보 강화 스크립트 시작');
    logger.info('='.repeat(60));
    
    // 모든 라이브 방송 데이터 조회
    const { data: lives, error } = await supabase
      .from('live_broadcasts')
      .select('*')
      .order('broadcast_date', { ascending: false });
    
    if (error) {
      logger.error('라이브 방송 데이터 조회 실패:', error);
      throw error;
    }
    
    logger.info(`총 ${lives.length}개의 라이브 방송 데이터 조회 완료`);
    
    let successCount = 0;
    let failCount = 0;
    
    // 각 라이브 방송에 대해 CS 정보 생성 및 업데이트
    for (const live of lives) {
      try {
        logger.info(`처리 중: ${live.live_id} - ${live.live_title_customer || live.live_title_cs}`);
        
        // 풍부한 CS 정보 생성
        const enhancedCsInfo = generateEnhancedCsInfo(live);
        
        // 기존 CS 정보 확인
        const { data: existingCsInfo } = await supabase
          .from('live_cs_info')
          .select('live_id')
          .eq('live_id', live.live_id)
          .single();
        
        const csData = {
          live_id: live.live_id,
          expected_questions: enhancedCsInfo.expected_questions,
          response_scripts: enhancedCsInfo.response_scripts,
          risk_points: enhancedCsInfo.risk_points,
          cs_note: `${live.brand_name || '아모레퍼시픽'} ${live.platform_name || '네이버'} 라이브 방송 CS 응대 가이드`
        };
        
        if (existingCsInfo) {
          // 업데이트
          await update('live_cs_info', csData, { live_id: live.live_id });
          logger.info(`✅ 업데이트 완료: ${live.live_id} (예상 질문: ${enhancedCsInfo.expected_questions.length}개, 응답 스크립트: ${enhancedCsInfo.response_scripts.length}개, 리스크 포인트: ${enhancedCsInfo.risk_points.length}개)`);
        } else {
          // 삽입
          const { error: insertError } = await supabase
            .from('live_cs_info')
            .insert(csData);
          
          if (insertError) {
            logger.error(`삽입 실패: ${live.live_id}`, insertError);
            failCount++;
            continue;
          }
          
          logger.info(`✅ 삽입 완료: ${live.live_id} (예상 질문: ${enhancedCsInfo.expected_questions.length}개, 응답 스크립트: ${enhancedCsInfo.response_scripts.length}개, 리스크 포인트: ${enhancedCsInfo.risk_points.length}개)`);
        }
        
        successCount++;
        
        // API 속도 제한 방지를 위한 지연
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (itemError) {
        logger.error(`처리 실패: ${live.live_id}`, itemError);
        failCount++;
      }
    }
    
    logger.info('='.repeat(60));
    logger.info('CS 정보 강화 완료');
    logger.info(`성공: ${successCount}개, 실패: ${failCount}개`);
    logger.info('='.repeat(60));
    
  } catch (error) {
    logger.error('스크립트 실행 실패:', error);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  main()
    .then(() => {
      logger.info('스크립트 종료');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('스크립트 실행 중 오류:', error);
      process.exit(1);
    });
}

module.exports = {
  generateEnhancedCsInfo,
  calculateDuration
};
