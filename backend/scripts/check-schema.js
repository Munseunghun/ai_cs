/**
 * Supabase 스키마 존재 여부 확인 스크립트
 * 
 * 사용법:
 *   node scripts/check-schema.js
 */

require('dotenv').config();
const { supabase } = require('../src/config/supabase');
const logger = require('../src/config/logger');

/**
 * 스키마 확인
 */
async function checkSchema() {
  try {
    logger.info('='.repeat(60));
    logger.info('Supabase 스키마 확인');
    logger.info('='.repeat(60));
    
    // 필수 테이블 목록
    const requiredTables = [
      'channels',
      'live_broadcasts',
      'live_products',
      'live_benefits',
      'live_chat_messages',
      'live_qa',
      'live_timeline',
      'live_duplicate_policy',
      'live_restrictions',
      'live_cs_info',
      'live_notices',
      'live_faqs'
    ];
    
    const results = {};
    
    for (const table of requiredTables) {
      try {
        // 테이블 존재 확인 (LIMIT 0으로 빠르게 확인)
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(0);
        
        if (error) {
          if (error.code === '42P01' || error.message.includes('does not exist')) {
            results[table] = { exists: false, error: '테이블이 존재하지 않습니다' };
          } else {
            results[table] = { exists: false, error: error.message };
          }
        } else {
          // 데이터 개수 확인
          const { count } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });
          
          results[table] = { 
            exists: true, 
            count: count || 0 
          };
        }
      } catch (err) {
        results[table] = { exists: false, error: err.message };
      }
    }
    
    // 결과 출력
    logger.info('\n📊 테이블 상태:');
    logger.info('='.repeat(60));
    
    let allExists = true;
    for (const [table, result] of Object.entries(results)) {
      if (result.exists) {
        logger.info(`✅ ${table.padEnd(25)} 존재 (데이터: ${result.count}개)`);
      } else {
        logger.error(`❌ ${table.padEnd(25)} 없음 - ${result.error}`);
        allExists = false;
      }
    }
    
    logger.info('='.repeat(60));
    
    if (!allExists) {
      logger.warn('\n⚠️  일부 테이블이 존재하지 않습니다.');
      logger.info('다음 단계를 따라주세요:');
      logger.info('');
      logger.info('1. Supabase 대시보드 접속:');
      logger.info('   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new');
      logger.info('');
      logger.info('2. SQL 파일 내용 확인 (터미널에서):');
      logger.info('   cat database/supabase_schema.sql');
      logger.info('   또는 프로젝트 루트에서 파일을 직접 열어서 내용 확인');
      logger.info('');
      logger.info('3. SQL 파일의 전체 내용을 복사하여 Supabase SQL Editor에 붙여넣기');
      logger.info('   ⚠️  중요: "cat" 명령어가 아닌 SQL 내용 자체를 복사해야 합니다!');
      logger.info('');
      logger.info('4. "Run" 버튼을 클릭하여 실행');
      logger.info('');
      process.exit(1);
    } else {
      logger.info('\n✅ 모든 테이블이 존재합니다!');
      logger.info('데이터 적재를 진행할 수 있습니다.');
      process.exit(0);
    }
    
  } catch (error) {
    logger.error('스키마 확인 중 오류 발생:', error);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  checkSchema();
}

module.exports = { checkSchema };


