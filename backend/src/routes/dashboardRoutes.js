/**
 * 대시보드 라우터
 * 대시보드 통계 및 요약 정보 API 엔드포인트
 */

const express = require('express');
const router = express.Router();

const eventService = require('../services/eventService');
const { authenticate } = require('../middleware/auth');
const { dashboardLimiter } = require('../middleware/rateLimit');
const logger = require('../config/logger');

/**
 * GET /api/dashboard
 * 대시보드 전체 데이터 조회 (인증 불필요)
 */
router.get('/', dashboardLimiter, async (p_req, p_res) => {
  try {
    const _v_result = await eventService.getDashboardData();
    
    p_res.json(_v_result);
  } catch (p_error) {
    logger.error('대시보드 데이터 조회 API 에러:', p_error);
    p_res.status(500).json({
      success: false,
      message: p_error.message || '대시보드 데이터 조회 중 오류가 발생했습니다.',
    });
  }
});

/**
 * GET /api/dashboard/stats
 * 통계 요약 정보만 조회
 */
router.get('/stats', authenticate, async (p_req, p_res) => {
  try {
    const _v_result = await eventService.getDashboardData();
    
    p_res.json({
      success: true,
      data: _v_result.data.statistics,
    });
  } catch (p_error) {
    logger.error('대시보드 통계 조회 API 에러:', p_error);
    p_res.status(500).json({
      success: false,
      message: '통계 데이터 조회 중 오류가 발생했습니다.',
    });
  }
});

/**
 * GET /api/dashboard/urgent
 * 긴급 이벤트 목록 (곧 종료되는 이벤트)
 */
router.get('/urgent', authenticate, async (p_req, p_res) => {
  try {
    const _v_result = await eventService.getDashboardData();
    
    p_res.json({
      success: true,
      data: _v_result.data.urgent_events,
    });
  } catch (p_error) {
    logger.error('긴급 이벤트 조회 API 에러:', p_error);
    p_res.status(500).json({
      success: false,
      message: '긴급 이벤트 조회 중 오류가 발생했습니다.',
    });
  }
});

/**
 * GET /api/dashboard/popular
 * 인기 이벤트 목록
 */
router.get('/popular', authenticate, async (p_req, p_res) => {
  try {
    const _v_result = await eventService.getDashboardData();
    
    p_res.json({
      success: true,
      data: _v_result.data.popular_events,
    });
  } catch (p_error) {
    logger.error('인기 이벤트 조회 API 에러:', p_error);
    p_res.status(500).json({
      success: false,
      message: '인기 이벤트 조회 중 오류가 발생했습니다.',
    });
  }
});

module.exports = router;


