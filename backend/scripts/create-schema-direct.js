/**
 * Supabase 스키마 직접 생성 스크립트
 * Supabase REST API를 사용하여 SQL 스키마를 실행합니다.
 * 
 * 사용법:
 *   node scripts/create-schema-direct.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const logger = require('../src/config/logger');

// Supabase 설정
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://uewhvekfjjvxoioklzza.supabase.co';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_SECRET_KEY) {
  logger.error('❌ Supabase 키가 설정되지 않았습니다.');
  logger.error('SUPABASE_SECRET_KEY 또는 SUPABASE_PUBLISHABLE_KEY를 .env 파일에 설정해주세요.');
  process.exit(1);
}

/**
 * SQL 스키마 파일 읽기
 */
function readSchemaFile() {
  const schemaPath = path.join(__dirname, '../../database/supabase_schema.sql');
  try {
    const sql = fs.readFileSync(schemaPath, 'utf8');
    return sql;
  } catch (error) {
    logger.error('SQL 스키마 파일을 읽을 수 없습니다:', error.message);
    throw error;
  }
}

/**
 * Supabase REST API를 통해 SQL 실행
 * 참고: Supabase는 직접 SQL 실행을 제한하므로, 
 * 이 스크립트는 SQL을 Supabase SQL Editor에 붙여넣을 수 있도록 준비합니다.
 */
async function createSchemaViaAPI() {
  const sql = readSchemaFile();
  
  logger.info('='.repeat(60));
  logger.info('📋 Supabase 스키마 생성');
  logger.info('='.repeat(60));
  logger.info('');
  
  logger.info('⚠️  참고: Supabase는 보안상의 이유로 REST API를 통한 직접 SQL 실행을 제한합니다.');
  logger.info('따라서 다음 방법 중 하나를 선택하세요:');
  logger.info('');
  logger.info('방법 1: Supabase SQL Editor 사용 (권장)');
  logger.info('  1. 다음 URL로 접속:');
  logger.info('     https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new');
  logger.info('');
  logger.info('  2. 아래 SQL을 복사하여 붙여넣기:');
  logger.info('');
  logger.info('='.repeat(60));
  console.log(sql);
  logger.info('='.repeat(60));
  logger.info('');
  logger.info('  3. "Run" 버튼 클릭');
  logger.info('');
  
  // SQL을 클립보드에 복사 (macOS)
  try {
    const { execSync } = require('child_process');
    execSync(`echo "${sql.replace(/"/g, '\\"')}" | pbcopy`);
    logger.info('✅ SQL이 클립보드에 복사되었습니다! (macOS)');
    logger.info('   이제 Supabase SQL Editor에 Cmd+V로 붙여넣을 수 있습니다.');
  } catch (error) {
    logger.info('⚠️  클립보드 복사 실패. 위의 SQL을 수동으로 복사해주세요.');
  }
  
  logger.info('');
  logger.info('방법 2: Supabase CLI 사용');
  logger.info('  supabase db execute -f database/supabase_schema.sql');
  logger.info('');
  
  logger.info('스키마 생성 완료 후 다음 명령어로 확인:');
  logger.info('  cd backend && node scripts/check-schema.js');
  logger.info('');
}

// 스크립트 실행
if (require.main === module) {
  createSchemaViaAPI().catch(error => {
    logger.error('오류 발생:', error);
    process.exit(1);
  });
}

module.exports = { createSchemaViaAPI };

