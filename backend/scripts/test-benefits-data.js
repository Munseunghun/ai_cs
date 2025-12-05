/**
 * 혜택 데이터 조회 테스트 스크립트
 * Supabase에서 혜택 데이터가 올바르게 저장되어 있는지 확인
 */

const { supabase: supabaseClient } = require('../src/config/supabase');

async function testBenefitsData() {
  try {
    console.log('🔍 혜택 데이터 조회 테스트 시작...\n');
    
    // 1. 라이브 방송 목록 조회 (최근 10개)
    console.log('1️⃣ 최근 라이브 방송 목록 조회...');
    const { data: _v_lives, error: _v_lives_error } = await supabaseClient
      .from('live_broadcasts')
      .select('live_id, live_title_customer, platform_name, brand_name, broadcast_date')
      .order('broadcast_date', { ascending: false })
      .limit(10);
    
    if (_v_lives_error) {
      console.error('❌ 라이브 방송 조회 실패:', _v_lives_error);
      return;
    }
    
    console.log(`✅ 라이브 방송 ${_v_lives.length}개 조회 완료\n`);
    
    if (_v_lives.length === 0) {
      console.log('⚠️ 라이브 방송 데이터가 없습니다.');
      return;
    }
    
    // 첫 번째 라이브 방송의 혜택 데이터 조회
    const _v_test_live_id = _v_lives[0].live_id;
    console.log(`2️⃣ 테스트 대상 라이브 방송: ${_v_test_live_id}`);
    console.log(`   제목: ${_v_lives[0].live_title_customer}`);
    console.log(`   플랫폼: ${_v_lives[0].platform_name}`);
    console.log(`   브랜드: ${_v_lives[0].brand_name}`);
    console.log(`   방송일: ${_v_lives[0].broadcast_date}\n`);
    
    // 2. 할인 혜택 조회
    console.log('3️⃣ 할인 혜택 조회...');
    const { data: _v_discounts, error: _v_discounts_error } = await supabaseClient
      .from('live_discounts')
      .select('*')
      .eq('live_id', _v_test_live_id);
    
    if (_v_discounts_error) {
      console.error('❌ 할인 혜택 조회 실패:', _v_discounts_error);
    } else {
      console.log(`✅ 할인 혜택 ${_v_discounts?.length || 0}개 조회 완료`);
      if (_v_discounts && _v_discounts.length > 0) {
        console.log('   샘플:', {
          discount_id: _v_discounts[0].discount_id,
          discount_type: _v_discounts[0].discount_type,
          discount_detail: _v_discounts[0].discount_detail?.substring(0, 50)
        });
      }
    }
    console.log('');
    
    // 3. 사은품 조회
    console.log('4️⃣ 사은품 조회...');
    const { data: _v_gifts, error: _v_gifts_error } = await supabaseClient
      .from('live_gifts')
      .select('*')
      .eq('live_id', _v_test_live_id);
    
    if (_v_gifts_error) {
      console.error('❌ 사은품 조회 실패:', _v_gifts_error);
    } else {
      console.log(`✅ 사은품 ${_v_gifts?.length || 0}개 조회 완료`);
      if (_v_gifts && _v_gifts.length > 0) {
        console.log('   샘플:', {
          gift_id: _v_gifts[0].gift_id,
          gift_type: _v_gifts[0].gift_type,
          gift_name: _v_gifts[0].gift_name?.substring(0, 50)
        });
      }
    }
    console.log('');
    
    // 4. 쿠폰 조회
    console.log('5️⃣ 쿠폰 조회...');
    const { data: _v_coupons, error: _v_coupons_error } = await supabaseClient
      .from('live_coupons')
      .select('*')
      .eq('live_id', _v_test_live_id);
    
    if (_v_coupons_error) {
      console.error('❌ 쿠폰 조회 실패:', _v_coupons_error);
    } else {
      console.log(`✅ 쿠폰 ${_v_coupons?.length || 0}개 조회 완료`);
      if (_v_coupons && _v_coupons.length > 0) {
        console.log('   샘플:', {
          coupon_id: _v_coupons[0].coupon_id,
          coupon_type: _v_coupons[0].coupon_type,
          coupon_name: _v_coupons[0].coupon_name?.substring(0, 50)
        });
      }
    }
    console.log('');
    
    // 5. 배송 혜택 조회
    console.log('6️⃣ 배송 혜택 조회...');
    const { data: _v_shipping, error: _v_shipping_error } = await supabaseClient
      .from('live_shipping')
      .select('*')
      .eq('live_id', _v_test_live_id);
    
    if (_v_shipping_error) {
      console.error('❌ 배송 혜택 조회 실패:', _v_shipping_error);
    } else {
      console.log(`✅ 배송 혜택 ${_v_shipping?.length || 0}개 조회 완료`);
      if (_v_shipping && _v_shipping.length > 0) {
        console.log('   샘플:', {
          shipping_id: _v_shipping[0].shipping_id,
          shipping_benefit: _v_shipping[0].shipping_benefit,
          shipping_detail: _v_shipping[0].shipping_detail?.substring(0, 50)
        });
      }
    }
    console.log('');
    
    // 6. live_benefits 테이블 조회 (있다면)
    console.log('7️⃣ live_benefits 테이블 조회...');
    const { data: _v_benefits, error: _v_benefits_error } = await supabaseClient
      .from('live_benefits')
      .select('*')
      .eq('live_id', _v_test_live_id);
    
    if (_v_benefits_error) {
      console.log('⚠️ live_benefits 테이블이 없거나 조회 실패:', _v_benefits_error.message);
    } else {
      console.log(`✅ live_benefits ${_v_benefits?.length || 0}개 조회 완료`);
      if (_v_benefits && _v_benefits.length > 0) {
        console.log('   샘플:', {
          benefit_id: _v_benefits[0].benefit_id,
          benefit_type: _v_benefits[0].benefit_type,
          benefit_detail: _v_benefits[0].benefit_detail?.substring(0, 50)
        });
      }
    }
    console.log('');
    
    // 7. 전체 혜택 개수 요약
    const _v_total_benefits = (_v_discounts?.length || 0) + 
                             (_v_gifts?.length || 0) + 
                             (_v_coupons?.length || 0) + 
                             (_v_shipping?.length || 0) +
                             (_v_benefits?.length || 0);
    
    console.log('📊 혜택 데이터 요약:');
    console.log(`   - 할인 혜택: ${_v_discounts?.length || 0}개`);
    console.log(`   - 사은품: ${_v_gifts?.length || 0}개`);
    console.log(`   - 쿠폰: ${_v_coupons?.length || 0}개`);
    console.log(`   - 배송 혜택: ${_v_shipping?.length || 0}개`);
    console.log(`   - live_benefits: ${_v_benefits?.length || 0}개`);
    console.log(`   - 전체: ${_v_total_benefits}개\n`);
    
    if (_v_total_benefits === 0) {
      console.log('⚠️ 혜택 데이터가 없습니다. 크롤러가 혜택 데이터를 수집하지 못했거나, 데이터베이스에 저장되지 않았을 수 있습니다.');
      console.log('   해결 방법:');
      console.log('   1. 크롤러 로그 확인: crawler/logs/');
      console.log('   2. 데이터베이스 스키마 확인: database/schema_live_detail.sql');
      console.log('   3. 크롤러 재실행: cd crawler && python main.py');
    } else {
      console.log('✅ 혜택 데이터가 정상적으로 저장되어 있습니다.');
    }
    
    // 8. 다른 라이브 방송들도 확인
    console.log('\n8️⃣ 다른 라이브 방송들의 혜택 데이터 확인...');
    for (let i = 1; i < Math.min(5, _v_lives.length); i++) {
      const _v_live_id = _v_lives[i].live_id;
      const _v_live_title = _v_lives[i].live_title_customer;
      
      const [
        { data: _v_d },
        { data: _v_g },
        { data: _v_c },
        { data: _v_s }
      ] = await Promise.all([
        supabaseClient.from('live_discounts').select('discount_id').eq('live_id', _v_live_id),
        supabaseClient.from('live_gifts').select('gift_id').eq('live_id', _v_live_id),
        supabaseClient.from('live_coupons').select('coupon_id').eq('live_id', _v_live_id),
        supabaseClient.from('live_shipping').select('shipping_id').eq('live_id', _v_live_id)
      ]);
      
      const _v_total = (_v_d?.length || 0) + (_v_g?.length || 0) + (_v_c?.length || 0) + (_v_s?.length || 0);
      
      console.log(`   ${i + 1}. ${_v_live_title?.substring(0, 40)}...`);
      console.log(`      혜택: ${_v_total}개 (할인:${_v_d?.length || 0}, 사은품:${_v_g?.length || 0}, 쿠폰:${_v_c?.length || 0}, 배송:${_v_s?.length || 0})`);
    }
    
    console.log('\n✅ 테스트 완료');
  } catch (p_error) {
    console.error('❌ 테스트 실패:', {
      error: p_error,
      message: p_error.message,
      stack: p_error.stack
    });
  }
}

// 스크립트 실행
testBenefitsData()
  .then(() => {
    console.log('\n프로그램 종료');
    process.exit(0);
  })
  .catch((p_error) => {
    console.error('프로그램 오류:', p_error);
    process.exit(1);
  });
