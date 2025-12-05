/**
 * Supabase 스키마 생성 및 데이터 적재 통합 스크립트
 * 
 * 사용법:
 *   node scripts/setup-supabase-complete.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
// check-schema.js를 직접 실행하여 결과 확인
async function checkSchemaExists() {
  return new Promise((resolve) => {
    try {
      const result = execSync('node scripts/check-schema.js', {
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });
      // check-schema.js는 스키마가 없으면 exit(1)을 반환
      resolve(false);
    } catch (error) {
      // exit code 1이면 스키마가 없음
      if (error.status === 1) {
        resolve(false);
      } else {
        resolve(true);
      }
    }
  });
}
const logger = require('../src/config/logger');

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
 * 메인 함수
 */
async function main() {
  try {
    logger.info('='.repeat(60));
    logger.info('🚀 Supabase 스키마 생성 및 데이터 적재');
    logger.info('='.repeat(60));
    logger.info('');

    // 1단계: 스키마 확인
    logger.info('📋 1단계: 스키마 상태 확인');
    logger.info('-'.repeat(60));
    
    // 스키마 존재 여부 확인을 위해 check-schema.js 실행
    let schemaExists = false;
    try {
      execSync('node scripts/check-schema.js', {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });
      schemaExists = true;
    } catch (error) {
      // exit code 1이면 스키마가 없음
      schemaExists = false;
    }
    
    if (!schemaExists) {
      logger.info('');
      logger.info('⚠️  스키마가 생성되지 않았습니다.');
      logger.info('');
      logger.info('다음 단계를 따라주세요:');
      logger.info('');
      logger.info('1. Supabase SQL Editor 접속:');
      logger.info('   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new');
      logger.info('');
      logger.info('2. SQL 스키마 파일 내용 확인:');
      logger.info('   파일 위치: database/supabase_schema.sql');
      logger.info('');
      
      // SQL 내용 출력
      const sql = readSchemaFile();
      logger.info('3. 아래 SQL을 복사하여 Supabase SQL Editor에 붙여넣기:');
      logger.info('');
      logger.info('='.repeat(60));
      console.log(sql);
      logger.info('='.repeat(60));
      logger.info('');
      logger.info('4. "Run" 버튼을 클릭하여 실행');
      logger.info('');
      logger.info('5. 스키마 생성 완료 후 이 스크립트를 다시 실행하세요.');
      logger.info('');
      logger.info('   또는 다음 명령어로 데이터만 적재:');
      logger.info('   node scripts/import-to-supabase.js');
      logger.info('');
      process.exit(0);
    }

    logger.info('');
    logger.info('✅ 스키마 확인 완료!');
    logger.info('');

    // 2단계: 데이터 적재
    logger.info('📦 2단계: 수집된 데이터 적재');
    logger.info('-'.repeat(60));
    logger.info('');

    // import-to-supabase.js 실행
    const importScriptPath = path.join(__dirname, 'import-to-supabase.js');
    logger.info('데이터 적재 스크립트 실행 중...');
    logger.info('');

    try {
      execSync(`node "${importScriptPath}"`, {
        stdio: 'inherit',
        cwd: path.dirname(importScriptPath)
      });
    } catch (error) {
      logger.error('데이터 적재 중 오류가 발생했습니다:', error.message);
      process.exit(1);
    }

    logger.info('');
    logger.info('='.repeat(60));
    logger.info('✅ 모든 작업이 완료되었습니다!');
    logger.info('='.repeat(60));
    logger.info('');
    logger.info('다음 단계:');
    logger.info('1. Supabase 대시보드에서 데이터 확인:');
    logger.info('   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/editor');
    logger.info('');
    logger.info('2. 프론트엔드에서 Supabase 데이터 사용:');
    logger.info('   import { select } from "./config/supabase";');
    logger.info('');

  } catch (error) {
    logger.error('오류 발생:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시
if (require.main === module) {
  main();
}

module.exports = { main };

