/**
 * 입력 검증 미들웨어
 * Express-validator를 사용한 요청 데이터 검증
 */

const { validationResult, body, param, query } = require('express-validator');
const logger = require('../config/logger');

/**
 * 검증 결과 처리 미들웨어
 * 검증 에러가 있으면 400 응답 반환
 */
const handleValidationErrors = (p_req, p_res, p_next) => {
  const _v_errors = validationResult(p_req);
  
  if (!_v_errors.isEmpty()) {
    logger.warn('입력 검증 실패:', {
      path: p_req.path,
      errors: _v_errors.array(),
    });
    
    return p_res.status(400).json({
      success: false,
      message: '입력 데이터가 유효하지 않습니다.',
      errors: _v_errors.array().map((_v_err) => ({
        field: _v_err.param,
        message: _v_err.msg,
        value: _v_err.value,
      })),
    });
  }
  
  p_next();
};

/**
 * 이벤트 검색 요청 검증 규칙
 */
const validateEventSearch = [
  query('channel')
    .optional()
    .isString()
    .trim()
    .withMessage('채널은 문자열이어야 합니다.'),
  
  query('status')
    .optional()
    .isIn(['PENDING', 'ACTIVE', 'ENDED', 'CANCELLED'])
    .withMessage('상태는 PENDING, ACTIVE, ENDED, CANCELLED 중 하나여야 합니다.'),
  
  query('keyword')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('키워드는 2-100자 사이여야 합니다.'),
  
  query('start_date')
    .optional()
    .isISO8601()
    .withMessage('시작일은 유효한 날짜 형식이어야 합니다.'),
  
  query('end_date')
    .optional()
    .isISO8601()
    .withMessage('종료일은 유효한 날짜 형식이어야 합니다.'),
  
  query('page')
    .optional()
    .isInt({ min: 0 })
    .withMessage('페이지는 0 이상의 정수여야 합니다.'),
  
  query('page_size')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('페이지 크기는 1-100 사이여야 합니다.'),
  
  query('sort_by')
    .optional()
    .isIn(['start_date', 'end_date', 'broadcast_date', 'created_at', 'discount_rate', 'favorite_count'])
    .withMessage('정렬 기준이 유효하지 않습니다.'),
  
  query('sort_order')
    .optional()
    .isIn(['ASC', 'DESC'])
    .withMessage('정렬 순서는 ASC 또는 DESC여야 합니다.'),
  
  handleValidationErrors,
];

/**
 * 이벤트 ID 검증 규칙
 * live_broadcasts 테이블의 live_id 형식 지원 (예: REAL_NAVER_IOPE_010, NAVER_SULWHASOO_001 등)
 */
const validateEventId = [
  param('event_id')
    .notEmpty()
    .withMessage('이벤트 ID는 필수입니다.')
    .isString()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('이벤트 ID는 1-255자 사이의 문자열이어야 합니다.')
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage('이벤트 ID는 영문, 숫자, 언더스코어만 사용 가능합니다.'),
  
  handleValidationErrors,
];

/**
 * 즐겨찾기 추가 요청 검증 규칙
 */
const validateFavoriteCreate = [
  body('event_id')
    .notEmpty()
    .withMessage('이벤트 ID는 필수입니다.')
    .isUUID()
    .withMessage('이벤트 ID는 UUID 형식이어야 합니다.'),
  
  body('memo')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('메모는 최대 500자까지 입력 가능합니다.'),
  
  handleValidationErrors,
];

/**
 * 로그인 요청 검증 규칙
 */
const validateLogin = [
  body('username')
    .notEmpty()
    .withMessage('사용자명은 필수입니다.')
    .isString()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('사용자명은 3-50자 사이여야 합니다.')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다.'),
  
  body('password')
    .notEmpty()
    .withMessage('비밀번호는 필수입니다.')
    .isString()
    .isLength({ min: 6 })
    .withMessage('비밀번호는 최소 6자 이상이어야 합니다.'),
  
  handleValidationErrors,
];

/**
 * 사용자 생성 요청 검증 규칙
 */
const validateUserCreate = [
  body('username')
    .notEmpty()
    .withMessage('사용자명은 필수입니다.')
    .isString()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('사용자명은 3-50자 사이여야 합니다.')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다.'),
  
  body('password')
    .notEmpty()
    .withMessage('비밀번호는 필수입니다.')
    .isString()
    .isLength({ min: 8 })
    .withMessage('비밀번호는 최소 8자 이상이어야 합니다.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
    .withMessage('비밀번호는 영문과 숫자를 모두 포함해야 합니다.'),
  
  body('full_name')
    .notEmpty()
    .withMessage('실명은 필수입니다.')
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('실명은 2-100자 사이여야 합니다.'),
  
  body('email')
    .notEmpty()
    .withMessage('이메일은 필수입니다.')
    .isEmail()
    .normalizeEmail()
    .withMessage('유효한 이메일 주소를 입력해주세요.'),
  
  body('phone')
    .optional()
    .matches(/^[0-9-]+$/)
    .withMessage('전화번호는 숫자와 하이픈만 사용 가능합니다.'),
  
  body('role')
    .optional()
    .isIn(['ADMIN', 'AGENT', 'VIEWER'])
    .withMessage('역할은 ADMIN, AGENT, VIEWER 중 하나여야 합니다.'),
  
  body('department')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('부서는 최대 100자까지 입력 가능합니다.'),
  
  body('team')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('팀은 최대 100자까지 입력 가능합니다.'),
  
  handleValidationErrors,
];

/**
 * 채널 비교 요청 검증 규칙
 */
const validateChannelCompare = [
  query('keyword')
    .notEmpty()
    .withMessage('검색 키워드는 필수입니다.')
    .isString()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('키워드는 2-100자 사이여야 합니다.'),
  
  handleValidationErrors,
];

/**
 * 날짜 범위 검증 커스텀 미들웨어
 */
const validateDateRange = (p_req, p_res, p_next) => {
  const { start_date, end_date } = p_req.query;
  
  if (start_date && end_date) {
    const _v_start = new Date(start_date);
    const _v_end = new Date(end_date);
    
    if (_v_start > _v_end) {
      return p_res.status(400).json({
        success: false,
        message: '시작일은 종료일보다 이전이어야 합니다.',
      });
    }
    
    // 최대 1년 범위 제한
    const _v_one_year_ms = 365 * 24 * 60 * 60 * 1000;
    if (_v_end - _v_start > _v_one_year_ms) {
      return p_res.status(400).json({
        success: false,
        message: '날짜 범위는 최대 1년까지 선택 가능합니다.',
      });
    }
  }
  
  p_next();
};

module.exports = {
  validateEventSearch,
  validateEventId,
  validateFavoriteCreate,
  validateLogin,
  validateUserCreate,
  validateChannelCompare,
  validateDateRange,
  handleValidationErrors,
};


