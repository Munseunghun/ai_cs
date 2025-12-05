/**
 * Supabase 데이터베이스 스키마 생성 스크립트
 * 
 * 사용법:
 *   node scripts/create-supabase-schema.js
 * 
 * 주의: Supabase는 직접 SQL 실행을 제한하므로,
 * 이 스크립트는 SQL 파일을 출력하고 Supabase 대시보드에서 실행하도록 안내합니다.
 * 또는 Supabase Management API를 사용하여 실행할 수 있습니다.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { supabase } = require('../src/config/supabase');
const logger = require('../src/config/logger');

/**
 * SQL 파일 읽기
 */
function readSchemaFile() {
  const schemaPath = path.join(__dirname, '../../database/supabase_schema.sql');
  return fs.readFileSync(schemaPath, 'utf8');
}

/**
 * SQL을 개별 명령어로 분리
 */
function splitSQL(sql) {
  // 세미콜론으로 분리하되, 함수나 트리거 내부의 세미콜론은 제외
  const statements = [];
  let current = '';
  let inFunction = false;
  let inTrigger = false;
  let depth = 0;
  
  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    const nextChars = sql.substring(i, Math.min(i + 10, sql.length));
    
    if (nextChars.startsWith('CREATE FUNCTION') || nextChars.startsWith('CREATE OR REPLACE FUNCTION')) {
      inFunction = true;
      depth = 0;
    }
    
    if (nextChars.startsWith('CREATE TRIGGER')) {
      inTrigger = true;
    }
    
    if (char === '{') depth++;
    if (char === '}') depth--;
    
    if (char === ';' && !inFunction && !inTrigger && depth === 0) {
      const statement = current.trim();
      if (statement && !statement.startsWith('--')) {
        statements.push(statement);
      }
      current = '';
      inFunction = false;
      inTrigger = false;
    } else {
      current += char;
    }
  }
  
  if (current.trim()) {
    statements.push(current.trim());
  }
  
  return statements;
}

/**
 * Supabase에 스키마 생성 (RPC를 통한 실행)
 * 
 * 참고: Supabase는 직접 SQL 실행을 제한하므로,
 * 이 함수는 SQL을 Supabase의 SQL Editor에서 실행할 수 있도록 포맷팅만 합니다.
 */
async function createSchema() {
  try {
    logger.info('='.repeat(60));
    logger.info('Supabase 스키마 생성 시작');
    logger.info('='.repeat(60));
    
    // SQL 파일 읽기
    const sql = readSchemaFile();
    logger.info('✅ SQL 파일 읽기 완료');
    
    // SQL을 개별 명령어로 분리
    const statements = splitSQL(sql);
    logger.info(`✅ SQL 명령어 ${statements.length}개 분리 완료`);
    
    // Supabase Management API를 사용하여 실행
    // 참고: Supabase는 직접 SQL 실행을 제한하므로,
    // 실제로는 Supabase 대시보드의 SQL Editor에서 실행해야 합니다.
    
    logger.info('\n⚠️  중요: Supabase는 직접 SQL 실행을 제한합니다.');
    logger.info('다음 단계를 따라주세요:\n');
    logger.info('1. Supabase 대시보드로 이동:');
    logger.info('   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new');
    logger.info('\n2. 아래 SQL을 복사하여 SQL Editor에 붙여넣기:');
    logger.info('\n' + '='.repeat(60));
    console.log(sql);
    logger.info('='.repeat(60));
    
    // 또는 Supabase REST API를 통해 실행 시도 (제한적)
    logger.info('\n📝 참고: Supabase Management API를 사용하려면 서비스 키가 필요합니다.');
    logger.info('일반적으로는 대시보드의 SQL Editor를 사용하는 것이 권장됩니다.\n');
    
    return { success: true, sql };
    
  } catch (error) {
    logger.error('스키마 생성 중 오류 발생:', error);
    throw error;
  }
}

// 스크립트 실행
if (require.main === module) {
  createSchema()
    .then(() => {
      logger.info('\n✅ 스키마 생성 준비 완료!');
      logger.info('위의 SQL을 Supabase 대시보드에서 실행해주세요.');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('작업 실패:', error);
      process.exit(1);
    });
}

module.exports = { createSchema, readSchemaFile };


