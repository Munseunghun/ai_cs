/**
 * Rate Limiting 미들웨어
 * API 요청 속도 제한
 */

const rateLimit = require('express-rate-limit');
const logger = require('../config/logger');

/**
 * 일반 API 요청 제한
 * 15분당 200회 요청 (대시보드 등 자주 조회되는 API 고려)
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 200, // 최대 요청 수 (100 -> 200으로 증가)
  standardHeaders: true, // RateLimit-* 헤더 포함
  legacyHeaders: false, // X-RateLimit-* 헤더 미포함
  message: {
    success: false,
    message: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.',
  },
  handler: (p_req, p_res) => {
    logger.warn('Rate limit 초과:', {
      ip: p_req.ip,
      path: p_req.path,
      user: p_req.user?.username,
    });
    
    p_res.status(429).json({
      success: false,
      message: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.',
    });
  },
});

/**
 * 대시보드 API 전용 Rate Limiter (더 관대한 제한)
 * 1분당 10회 요청
 */
const dashboardLimiter = rateLimit({
  windowMs: 60 * 1000, // 1분
  max: 10, // 최대 요청 수
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: '대시보드 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  },
  handler: (p_req, p_res) => {
    logger.warn('대시보드 rate limit 초과:', {
      ip: p_req.ip,
    });
    
    p_res.status(429).json({
      success: false,
      message: '대시보드 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    });
  },
});

/**
 * 로그인 요청 제한
 * 15분당 5회 요청 (보안 강화)
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true, // 성공한 요청은 카운트하지 않음
  message: {
    success: false,
    message: '로그인 시도 횟수를 초과했습니다. 15분 후 다시 시도해주세요.',
  },
  handler: (p_req, p_res) => {
    logger.warn('로그인 rate limit 초과:', {
      ip: p_req.ip,
      username: p_req.body?.username,
    });
    
    p_res.status(429).json({
      success: false,
      message: '로그인 시도 횟수를 초과했습니다. 15분 후 다시 시도해주세요.',
    });
  },
});

/**
 * 검색 API 요청 제한
 * 1분당 30회 요청
 */
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1분
  max: 30,
  message: {
    success: false,
    message: '검색 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  },
  handler: (p_req, p_res) => {
    logger.warn('검색 rate limit 초과:', {
      ip: p_req.ip,
      user: p_req.user?.username,
    });
    
    p_res.status(429).json({
      success: false,
      message: '검색 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
    });
  },
});

/**
 * 관리자 API 요청 제한
 * 1분당 60회 요청
 */
const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: {
    success: false,
    message: '관리자 API 요청이 너무 많습니다.',
  },
});

module.exports = {
  generalLimiter,
  loginLimiter,
  searchLimiter,
  adminLimiter,
  dashboardLimiter,
};


