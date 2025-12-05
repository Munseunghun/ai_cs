/**
 * Supabase 클라이언트 설정
 * Supabase 데이터베이스 연결 및 CRUD 작업 헬퍼 함수 제공
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const logger = require('./logger');

// Supabase 설정
const SUPABASE_URL = process.env.SUPABASE_URL;
// Secret key 우선 사용 (서버 전용), 없으면 publishable key, 마지막으로 anon key 사용
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  logger.error('Supabase 설정이 누락되었습니다. SUPABASE_URL과 SUPABASE_SECRET_KEY, SUPABASE_PUBLISHABLE_KEY 또는 SUPABASE_ANON_KEY를 확인해주세요.');
  throw new Error('Supabase 설정이 필요합니다.');
}

// Supabase 클라이언트 생성
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * 데이터 삽입
 * @param {string} table - 테이블 이름
 * @param {object} data - 삽입할 데이터
 * @returns {Promise<{success: boolean, data: any, error: any}>}
 */
async function insert(table, data) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select();
    
    if (error) {
      logger.error(`Supabase 삽입 실패 (${table}):`, error);
      throw error;
    }
    
    return { success: true, data: result, error: null };
  } catch (error) {
    logger.error(`Supabase 삽입 오류 (${table}):`, error);
    return { success: false, data: null, error };
  }
}

/**
 * 데이터 조회
 * @param {string} table - 테이블 이름
 * @param {string|array} columns - 조회할 컬럼 (선택, '*' 또는 배열)
 * @param {object} filters - 필터 조건 (선택)
 * @param {object} options - 추가 옵션 (limit, order, 등)
 * @returns {Promise<{success: boolean, rows: array, error: any}>}
 */
async function select(table, columns = '*', filters = {}, options = {}) {
  try {
    let query = supabase.from(table).select(columns);
    
    // 필터 적용
    Object.keys(filters).forEach(key => {
      query = query.eq(key, filters[key]);
    });
    
    // 옵션 적용
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending !== false });
    }
    
    const { data, error } = await query;
    
    if (error) {
      logger.error(`Supabase 조회 실패 (${table}):`, error);
      throw error;
    }
    
    return { success: true, rows: data || [], error: null };
  } catch (error) {
    logger.error(`Supabase 조회 오류 (${table}):`, error);
    return { success: false, rows: [], error };
  }
}

/**
 * 데이터 업데이트
 * @param {string} table - 테이블 이름
 * @param {object} data - 업데이트할 데이터
 * @param {object} filters - 필터 조건
 * @returns {Promise<{success: boolean, data: any, error: any}>}
 */
async function update(table, data, filters) {
  try {
    let query = supabase.from(table).update(data);
    
    // 필터 적용
    Object.keys(filters).forEach(key => {
      query = query.eq(key, filters[key]);
    });
    
    const { data: result, error } = await query.select();
    
    if (error) {
      logger.error(`Supabase 업데이트 실패 (${table}):`, error);
      throw error;
    }
    
    return { success: true, data: result, error: null };
  } catch (error) {
    logger.error(`Supabase 업데이트 오류 (${table}):`, error);
    return { success: false, data: null, error };
  }
}

/**
 * 데이터 삭제
 * @param {string} table - 테이블 이름
 * @param {object} filters - 필터 조건
 * @returns {Promise<{success: boolean, data: any, error: any}>}
 */
async function remove(table, filters) {
  try {
    let query = supabase.from(table).delete();
    
    // 필터 적용
    Object.keys(filters).forEach(key => {
      query = query.eq(key, filters[key]);
    });
    
    const { data: result, error } = await query.select();
    
    if (error) {
      logger.error(`Supabase 삭제 실패 (${table}):`, error);
      throw error;
    }
    
    return { success: true, data: result, error: null };
  } catch (error) {
    logger.error(`Supabase 삭제 오류 (${table}):`, error);
    return { success: false, data: null, error };
  }
}

/**
 * UPSERT (INSERT 또는 UPDATE)
 * @param {string} table - 테이블 이름
 * @param {object} data - 데이터
 * @param {string} onConflict - 충돌 시 처리할 컬럼 (선택)
 * @returns {Promise<{success: boolean, data: any, error: any}>}
 */
async function upsert(table, data, onConflict = null) {
  try {
    let query = supabase.from(table).upsert(data);
    
    if (onConflict) {
      query = query.onConflict(onConflict);
    }
    
    const { data: result, error } = await query.select();
    
    if (error) {
      logger.error(`Supabase UPSERT 실패 (${table}):`, error);
      throw error;
    }
    
    return { success: true, data: result, error: null };
  } catch (error) {
    logger.error(`Supabase UPSERT 오류 (${table}):`, error);
    return { success: false, data: null, error };
  }
}

module.exports = {
  supabase,
  insert,
  select,
  update,
  remove,
  upsert,
};



