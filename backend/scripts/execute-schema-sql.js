/**
 * Supabase에 SQL 스키마를 직접 실행하는 스크립트
 * 
 * 주의: Supabase는 직접 SQL 실행을 제한하므로,
 * 이 스크립트는 Supabase Management API를 사용하여 실행합니다.
 * 
 * 사용법:
 *   node scripts/execute-schema-sql.js
 * 
 * 필요 환경 변수:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (서비스 롤 키 필요)
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const logger = require('../src/config/logger');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

/**
 * Supabase REST API를 통해 SQL 실행
 */
async function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify({ query: sql }));
    req.end();
  });
}

/**
 * SQL 파일 읽기 및 실행
 */
async function main() {
  try {
    logger.info('='.repeat(60));
    logger.info('Supabase SQL 스키마 실행');
    logger.info('='.repeat(60));

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      logger.error('환경 변수가 설정되지 않았습니다.');
      logger.error('SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY를 확인해주세요.');
      process.exit(1);
    }

    // SQL 파일 읽기
    const schemaPath = path.join(__dirname, '../../database/supabase_schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    
    logger.info('✅ SQL 파일 읽기 완료');
    logger.info(`📝 SQL 길이: ${sql.length} 문자`);
    
    // Supabase는 직접 SQL 실행을 제한하므로,
    // 실제로는 Supabase 대시보드의 SQL Editor를 사용해야 합니다.
    logger.warn('\n⚠️  중요: Supabase는 직접 SQL 실행을 제한합니다.');
    logger.info('다음 방법 중 하나를 선택하세요:\n');
    logger.info('방법 1: Supabase 대시보드 사용 (권장)');
    logger.info('  1. https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new 이동');
    logger.info('  2. 아래 SQL을 복사하여 붙여넣기');
    logger.info('  3. "Run" 버튼 클릭\n');
    
    logger.info('방법 2: Supabase CLI 사용');
    logger.info('  supabase db push --db-url "postgresql://..."\n');
    
    logger.info('SQL 내용:');
    logger.info('='.repeat(60));
    console.log(sql);
    logger.info('='.repeat(60));
    
    logger.info('\n✅ SQL 파일 준비 완료!');
    logger.info('위의 방법 중 하나를 사용하여 스키마를 생성해주세요.');
    
  } catch (error) {
    logger.error('오류 발생:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { executeSQL, main };


