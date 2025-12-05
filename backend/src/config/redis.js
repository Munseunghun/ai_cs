/**
 * Redis 캐시 설정
 * API 응답 캐싱 및 세션 관리
 */

const redis = require('redis');
const logger = require('./logger');

// Redis 클라이언트 설정
const _v_redis_config = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryStrategy: (p_times) => {
    // 재연결 지연 시간 (최대 30초)
    const _v_delay = Math.min(p_times * 50, 30000);
    logger.warn(`Redis 재연결 시도 ${p_times}회 (${_v_delay}ms 후)`);
    return _v_delay;
  },
};

// Redis 클라이언트 생성
let redisClient = null;

/**
 * Redis 연결 초기화
 * @returns {Promise<RedisClient>} - Redis 클라이언트
 */
const connectRedis = async () => {
  try {
    // Redis 클라이언트 생성
    redisClient = redis.createClient({
      socket: {
        host: _v_redis_config.host,
        port: _v_redis_config.port,
        connectTimeout: 5000, // 5초 타임아웃
        reconnectStrategy: (p_times) => {
          // 재연결 시도 제한 (최대 3회)
          if (p_times > 3) {
            logger.warn('Redis 재연결 시도 횟수 초과 - Redis 캐싱 비활성화');
            return false; // 재연결 중단
          }
          const _v_delay = Math.min(p_times * 1000, 3000);
          logger.warn(`Redis 재연결 시도 ${p_times}회 (${_v_delay}ms 후)`);
          return _v_delay;
        },
      },
      password: _v_redis_config.password,
      database: _v_redis_config.db,
    });

    // 에러 핸들러
    redisClient.on('error', (p_error) => {
      logger.error('Redis 에러:', p_error.message);
    });

    // 연결 이벤트 핸들러
    redisClient.on('connect', () => {
      logger.info('Redis에 연결되었습니다.');
    });

    // 재연결 이벤트 핸들러
    redisClient.on('reconnecting', () => {
      logger.warn('Redis 재연결 중...');
    });

    // 연결 (타임아웃 설정)
    await Promise.race([
      redisClient.connect(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Redis 연결 타임아웃 (5초)')), 5000)
      )
    ]);
    
    logger.info('✓ Redis 연결 성공');
    return redisClient;
  } catch (p_error) {
    logger.warn('⚠ Redis 연결 실패 - 캐싱 기능이 비활성화됩니다:', p_error.message);
    
    // Redis 클라이언트 정리
    if (redisClient) {
      try {
        await redisClient.disconnect();
      } catch (disconnectError) {
        // 무시
      }
    }
    
    redisClient = null;
    // Redis 연결 실패해도 서버는 계속 실행 (선택적 기능)
    return null;
  }
};

/**
 * 캐시 데이터 저장
 * @param {string} p_key - 캐시 키
 * @param {any} p_value - 저장할 값
 * @param {number} p_ttl - 만료 시간 (초), 기본값 300초 (5분)
 * @returns {Promise<boolean>} - 저장 성공 여부
 */
const setCache = async (p_key, p_value, p_ttl = 300) => {
  if (!redisClient || !redisClient.isOpen) {
    logger.warn('Redis 클라이언트가 연결되지 않아 캐싱을 건너뜁니다.');
    return false;
  }

  try {
    // 객체는 JSON 문자열로 변환
    const _v_value = typeof p_value === 'object' 
      ? JSON.stringify(p_value) 
      : p_value;
    
    // 캐시 저장
    await redisClient.setEx(p_key, p_ttl, _v_value);
    
    logger.debug(`캐시 저장: ${p_key} (TTL: ${p_ttl}초)`);
    return true;
  } catch (p_error) {
    logger.error('캐시 저장 실패:', {
      key: p_key,
      error: p_error.message,
    });
    return false;
  }
};

/**
 * 캐시 데이터 조회
 * @param {string} p_key - 캐시 키
 * @returns {Promise<any|null>} - 캐시된 값 또는 null
 */
const getCache = async (p_key) => {
  if (!redisClient || !redisClient.isOpen) {
    logger.warn('Redis 클라이언트가 연결되지 않아 캐시 조회를 건너뜁니다.');
    return null;
  }

  try {
    const _v_value = await redisClient.get(p_key);
    
    if (_v_value === null) {
      logger.debug(`캐시 미스: ${p_key}`);
      return null;
    }
    
    logger.debug(`캐시 히트: ${p_key}`);
    
    // JSON 파싱 시도
    try {
      return JSON.parse(_v_value);
    } catch {
      return _v_value;
    }
  } catch (p_error) {
    logger.error('캐시 조회 실패:', {
      key: p_key,
      error: p_error.message,
    });
    return null;
  }
};

/**
 * 캐시 삭제
 * @param {string} p_key - 캐시 키
 * @returns {Promise<boolean>} - 삭제 성공 여부
 */
const deleteCache = async (p_key) => {
  if (!redisClient || !redisClient.isOpen) {
    return false;
  }

  try {
    await redisClient.del(p_key);
    logger.debug(`캐시 삭제: ${p_key}`);
    return true;
  } catch (p_error) {
    logger.error('캐시 삭제 실패:', {
      key: p_key,
      error: p_error.message,
    });
    return false;
  }
};

/**
 * 패턴 매칭 캐시 삭제
 * @param {string} p_pattern - 삭제할 키 패턴 (예: 'events:*')
 * @returns {Promise<number>} - 삭제된 키 개수
 */
const deleteCacheByPattern = async (p_pattern) => {
  if (!redisClient || !redisClient.isOpen) {
    return 0;
  }

  try {
    const _v_keys = await redisClient.keys(p_pattern);
    
    if (_v_keys.length === 0) {
      return 0;
    }
    
    await redisClient.del(_v_keys);
    logger.debug(`캐시 패턴 삭제: ${p_pattern} (${_v_keys.length}개)`);
    
    return _v_keys.length;
  } catch (p_error) {
    logger.error('캐시 패턴 삭제 실패:', {
      pattern: p_pattern,
      error: p_error.message,
    });
    return 0;
  }
};

/**
 * Redis 연결 종료
 */
const closeRedis = async () => {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
    logger.info('Redis 연결이 종료되었습니다.');
  }
};

module.exports = {
  connectRedis,
  setCache,
  getCache,
  deleteCache,
  deleteCacheByPattern,
  closeRedis,
  getClient: () => redisClient,
};


