/**
 * Supabase 스키마 생성 및 데이터 적재 통합 스크립트
 * 
 * 사용법:
 *   node scripts/setup-and-import.js
 * 
 * 이 스크립트는:
 * 1. Supabase 스키마 생성 SQL을 출력
 * 2. 사용자가 스키마를 생성한 후 데이터를 적재
 */

require('dotenv').config();
const { createSchema } = require('./create-supabase-schema');
const { importAllData } = require('./import-to-supabase');
const logger = require('../src/config/logger');
const readline = require('readline');

/**
 * 사용자 입력 대기
 */
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

/**
 * 메인 실행 함수
 */
async function main() {
  try {
    logger.info('='.repeat(60));
    logger.info('Supabase 설정 및 데이터 적재 시작');
    logger.info('='.repeat(60));
    
    // 1. 스키마 생성 SQL 출력
    logger.info('\n📋 1단계: 데이터베이스 스키마 생성');
    logger.info('='.repeat(60));
    
    const { sql } = await createSchema();
    
    logger.info('\n✅ SQL 파일 준비 완료!');
    logger.info('\n다음 단계를 따라주세요:');
    logger.info('1. Supabase 대시보드로 이동:');
    logger.info('   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new');
    logger.info('\n2. 위에 출력된 SQL을 복사하여 SQL Editor에 붙여넣기');
    logger.info('\n3. "Run" 버튼을 클릭하여 실행');
    logger.info('\n4. 스키마 생성이 완료되면 이 스크립트로 돌아와서 계속 진행');
    
    // 사용자 확인 대기
    const answer = await askQuestion('\n스키마 생성을 완료하셨나요? (y/n): ');
    
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      logger.info('스키마 생성을 먼저 완료해주세요. 스크립트를 종료합니다.');
      process.exit(0);
    }
    
    // 2. 데이터 적재
    logger.info('\n📦 2단계: 수집된 데이터 적재');
    logger.info('='.repeat(60));
    
    await importAllData();
    
    logger.info('\n' + '='.repeat(60));
    logger.info('✅ 모든 작업이 완료되었습니다!');
    logger.info('='.repeat(60));
    
  } catch (error) {
    logger.error('작업 실패:', error);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { main };


