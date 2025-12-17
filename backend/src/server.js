/**
 * 메인 서버 파일
 * Express 서버 설정 및 실행
 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const db = require('./config/database');
const redis = require('./config/redis');
const logger = require('./config/logger');
const { generalLimiter } = require('./middleware/rateLimit');

// 라우터 임포트
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Express 앱 생성
const app = express();

// 환경변수
const _v_port = process.env.PORT || 3000;
const _v_host = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost');
const _v_node_env = process.env.NODE_ENV || 'development';

// ============================================================================
// 미들웨어 설정
// ============================================================================

// 보안 헤더 설정 (Helmet)
app.use(helmet({
  contentSecurityPolicy: false, // CSP는 필요에 따라 설정
  crossOriginEmbedderPolicy: false,
}));

// CORS 설정
const _v_cors_options = {
  origin: [
    'http://localhost:3000',  // 로컬 프론트엔드
    'http://localhost:3001',  // 로컬 백엔드
    'https://ai-cs-bf933.web.app',  // Firebase 호스팅
    'https://ai-cs-bf933.firebaseapp.com',  // Firebase 호스팅
    'https://aics1.netlify.app',  // Netlify 호스팅
    'https://693277d3cf8c8519f9294182--aics1.netlify.app'  // Netlify 프리뷰
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(_v_cors_options));

// HTTP 요청 로깅 (Morgan)
if (_v_node_env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: logger.stream }));
}

// Body 파서 (헤더 크기 제한 증가)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 요청 헤더 크기 제한 증가 (기본값보다 크게 설정)
// Node.js 기본 헤더 크기는 8KB이지만, 많은 쿠키나 토큰이 있을 경우 부족할 수 있음

// Gzip 압축
app.use(compression());

// Rate Limiting (일반 API)
// 대시보드는 별도의 rate limiter를 사용하므로 generalLimiter에서 제외
app.use('/api/', (p_req, p_res, p_next) => {
  // 대시보드 API는 generalLimiter 건너뛰기 (별도 dashboardLimiter 적용)
  if (p_req.path.startsWith('/api/dashboard')) {
    return p_next();
  }
  return generalLimiter(p_req, p_res, p_next);
});

// ============================================================================
// 라우트 설정
// ============================================================================

// 루트 경로 라우트
app.get('/', (p_req, p_res) => {
  p_res.json({
    success: true,
    message: 'AI CS 시스템 백엔드 API 서버',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      events: '/api/events/search',
      dashboard: '/api/dashboard',
      admin: '/api/admin',
      favorites: '/api/favorites'
    },
    note: '프론트엔드는 http://localhost:3000 에서 실행됩니다.'
  });
});

// Health Check 엔드포인트
app.get('/health', (p_req, p_res) => {
  p_res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: _v_node_env,
  });
});

// API 라우트
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes);

// 404 핸들러
app.use((p_req, p_res) => {
  p_res.status(404).json({
    success: false,
    message: '요청하신 리소스를 찾을 수 없습니다.',
    path: p_req.path,
  });
});

// 전역 에러 핸들러
app.use((p_error, p_req, p_res, p_next) => {
  logger.error('서버 에러:', {
    error: p_error.message,
    stack: p_error.stack,
    path: p_req.path,
    method: p_req.method,
  });
  
  // 에러 응답
  p_res.status(p_error.status || 500).json({
    success: false,
    message: _v_node_env === 'production' 
      ? '서버 내부 오류가 발생했습니다.' 
      : p_error.message,
    ..._v_node_env === 'development' && { stack: p_error.stack },
  });
});

// ============================================================================
// 서버 시작
// ============================================================================

/**
 * 서버 초기화 및 시작
 */
const startServer = async () => {
  try {
    logger.info('='.repeat(60));
    logger.info('화장품 상담 시스템 백엔드 서버 시작 중...');
    logger.info('='.repeat(60));
    
    // 1. 데이터베이스 연결 테스트 (선택적 - Supabase 사용 시 PostgreSQL 연결 실패는 정상)
    // Supabase를 사용하므로 PostgreSQL 연결은 선택적입니다
    logger.info('데이터베이스 연결 확인 중...');
    try {
      const _v_db_connected = await db.testConnection();
      if (_v_db_connected) {
        logger.info('✓ PostgreSQL 데이터베이스 연결 성공 (선택적)');
      } else {
        logger.debug('⚠ PostgreSQL 연결 실패 (Supabase 사용 중이므로 정상)');
      }
    } catch (p_db_error) {
      // Supabase를 사용하므로 PostgreSQL 연결 실패는 무시
      logger.debug('⚠ PostgreSQL 연결 실패 (Supabase 사용 중이므로 정상):', p_db_error.message);
    }
    
    // Supabase 연결 확인
    try {
      const { supabase } = require('./config/supabase');
      logger.info('✓ Supabase 클라이언트 초기화 완료');
    } catch (p_supabase_error) {
      logger.error('❌ Supabase 초기화 실패:', p_supabase_error.message);
      throw p_supabase_error;
    }
    
    // 2. Redis 연결 (선택적)
    logger.info('Redis 연결 시도 중...');
    try {
      await redis.connectRedis();
      logger.info('✓ Redis 연결 성공');
    } catch (p_redis_error) {
      logger.warn('⚠ Redis 연결 실패 (캐싱 비활성화):', p_redis_error.message);
    }
    
    // 3. HTTP 서버 시작
    const _v_server = app.listen(_v_port, _v_host, () => {
      logger.info('='.repeat(60));
      logger.info(`✓ 서버가 성공적으로 시작되었습니다!`);
      logger.info(`  - 환경: ${_v_node_env}`);
      logger.info(`  - 주소: http://${_v_host}:${_v_port}`);
      logger.info(`  - Health Check: http://${_v_host}:${_v_port}/health`);
      logger.info(`  - API 문서: http://${_v_host}:${_v_port}/api`);
      logger.info('='.repeat(60));
    });
    
    // 4. Graceful Shutdown 설정
    const gracefulShutdown = async (p_signal) => {
      logger.info(`\n${p_signal} 신호를 받았습니다. 서버를 종료합니다...`);
      
      // HTTP 서버 종료
      _v_server.close(async () => {
        logger.info('HTTP 서버가 종료되었습니다.');
        
        // 데이터베이스 연결 종료
        await db.closePool();
        
        // Redis 연결 종료
        await redis.closeRedis();
        
        logger.info('모든 연결이 종료되었습니다. 프로세스를 종료합니다.');
        process.exit(0);
      });
      
      // 강제 종료 타임아웃 (30초)
      setTimeout(() => {
        logger.error('강제 종료 타임아웃. 프로세스를 강제로 종료합니다.');
        process.exit(1);
      }, 30000);
    };
    
    // Shutdown 시그널 핸들러
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
    // 처리되지 않은 Promise rejection 핸들러
    process.on('unhandledRejection', (p_reason, p_promise) => {
      logger.error('처리되지 않은 Promise Rejection:', {
        reason: p_reason,
        promise: p_promise,
      });
    });
    
    // 처리되지 않은 예외 핸들러
    process.on('uncaughtException', (p_error) => {
      logger.error('처리되지 않은 예외:', {
        error: p_error.message,
        stack: p_error.stack,
      });
      
      // 치명적 에러이므로 서버 재시작 필요
      process.exit(1);
    });
    
  } catch (p_error) {
    logger.error('서버 시작 실패:', p_error);
    process.exit(1);
  }
};

// 서버 시작
if (require.main === module) {
  startServer();
}

// 테스트를 위한 export
module.exports = app;


