#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
데이터 수집 스케줄러
- 1시간마다 네이버 쇼핑라이브 데이터 자동 수집
"""

import os
import sys
import json
import time
import logging
import schedule
import subprocess
from datetime import datetime
from pathlib import Path

# 로깅 설정
_v_log_dir = Path(__file__).parent / 'logs'
_v_log_dir.mkdir(exist_ok=True)

_v_log_file = _v_log_dir / f'scheduler_{datetime.now().strftime("%Y%m%d")}.log'

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(_v_log_file, encoding='utf-8'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


class DataCollectionScheduler:
    """데이터 수집 스케줄러"""
    
    def __init__(self):
        """초기화"""
        self.p_crawler_script = Path(__file__).parent / 'naver_live_crawler.py'
        self.p_output_dir = Path(__file__).parent / 'output'
        self.p_output_dir.mkdir(exist_ok=True)
        
        self.p_stats_file = self.p_output_dir / 'scheduler_stats.json'
        self.p_stats = self._load_stats()
    
    def _load_stats(self) -> dict:
        """통계 파일 로드"""
        if self.p_stats_file.exists():
            try:
                with open(self.p_stats_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as p_error:
                logger.warning(f"통계 파일 로드 실패: {p_error}")
        
        return {
            'total_runs': 0,
            'successful_runs': 0,
            'failed_runs': 0,
            'last_run': None,
            'last_success': None,
            'last_error': None
        }
    
    def _save_stats(self):
        """통계 파일 저장"""
        try:
            with open(self.p_stats_file, 'w', encoding='utf-8') as f:
                json.dump(self.p_stats, f, ensure_ascii=False, indent=2)
        except Exception as p_error:
            logger.error(f"통계 파일 저장 실패: {p_error}")
    
    def collect_data(self):
        """데이터 수집 실행"""
        logger.info("=" * 60)
        logger.info(f"🚀 데이터 수집 시작: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        logger.info("=" * 60)
        
        self.p_stats['total_runs'] += 1
        self.p_stats['last_run'] = datetime.now().isoformat()
        
        try:
            # 크롤러 스크립트 실행
            _v_result = subprocess.run(
                ['python3', str(self.p_crawler_script)],
                capture_output=True,
                text=True,
                timeout=600  # 10분 타임아웃
            )
            
            # 표준 출력 로깅
            if _v_result.stdout:
                for _v_line in _v_result.stdout.split('\n'):
                    if _v_line.strip():
                        logger.info(f"  {_v_line}")
            
            # 표준 에러 로깅
            if _v_result.stderr:
                for _v_line in _v_result.stderr.split('\n'):
                    if _v_line.strip():
                        logger.error(f"  {_v_line}")
            
            # 실행 결과 확인
            if _v_result.returncode == 0:
                self.p_stats['successful_runs'] += 1
                self.p_stats['last_success'] = datetime.now().isoformat()
                self.p_stats['last_error'] = None
                logger.info("✅ 데이터 수집 성공")
            else:
                self.p_stats['failed_runs'] += 1
                _v_error_msg = f"크롤러 실행 실패 (exit code: {_v_result.returncode})"
                self.p_stats['last_error'] = _v_error_msg
                logger.error(f"❌ {_v_error_msg}")
        
        except subprocess.TimeoutExpired:
            self.p_stats['failed_runs'] += 1
            _v_error_msg = "크롤러 실행 타임아웃 (10분 초과)"
            self.p_stats['last_error'] = _v_error_msg
            logger.error(f"❌ {_v_error_msg}")
        
        except Exception as p_error:
            self.p_stats['failed_runs'] += 1
            _v_error_msg = f"크롤러 실행 중 예외 발생: {p_error}"
            self.p_stats['last_error'] = _v_error_msg
            logger.error(f"❌ {_v_error_msg}")
        
        finally:
            # 통계 저장
            self._save_stats()
            
            logger.info("=" * 60)
            logger.info(f"📊 통계: 총 {self.p_stats['total_runs']}회 실행 "
                       f"(성공: {self.p_stats['successful_runs']}, "
                       f"실패: {self.p_stats['failed_runs']})")
            logger.info("=" * 60)
    
    def run(self):
        """스케줄러 실행"""
        logger.info("=" * 60)
        logger.info("🎯 데이터 수집 스케줄러 시작")
        logger.info("=" * 60)
        logger.info(f"📅 수집 주기: 1시간마다")
        logger.info(f"📂 로그 파일: {_v_log_file}")
        logger.info(f"📊 통계 파일: {self.p_stats_file}")
        logger.info("=" * 60)
        
        # 즉시 한 번 실행
        logger.info("⏰ 초기 수집 실행...")
        self.collect_data()
        
        # 1시간마다 정각에 실행
        schedule.every().hour.at(":00").do(self.collect_data)
        
        logger.info("⏰ 다음 수집 예정: 매 시간 정각")
        logger.info("⌨️  종료하려면 Ctrl+C를 누르세요.")
        logger.info("=" * 60)
        
        # 스케줄 실행 루프
        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # 1분마다 체크
        
        except KeyboardInterrupt:
            logger.info("\n" + "=" * 60)
            logger.info("🛑 스케줄러 종료 요청")
            logger.info("=" * 60)
            logger.info(f"📊 최종 통계:")
            logger.info(f"  - 총 실행: {self.p_stats['total_runs']}회")
            logger.info(f"  - 성공: {self.p_stats['successful_runs']}회")
            logger.info(f"  - 실패: {self.p_stats['failed_runs']}회")
            logger.info(f"  - 마지막 실행: {self.p_stats['last_run']}")
            logger.info("=" * 60)
            logger.info("✅ 스케줄러 정상 종료")
            logger.info("=" * 60)


def main():
    """메인 실행 함수"""
    
    # 환경변수 확인
    if not os.getenv('SUPABASE_URL') or not os.getenv('SUPABASE_ANON_KEY'):
        logger.error("=" * 60)
        logger.error("❌ Supabase 환경변수가 설정되지 않았습니다.")
        logger.error("=" * 60)
        logger.error("다음 환경변수를 설정해주세요:")
        logger.error("  - SUPABASE_URL")
        logger.error("  - SUPABASE_ANON_KEY")
        logger.error("=" * 60)
        logger.error("예시:")
        logger.error("  export SUPABASE_URL='https://your-project.supabase.co'")
        logger.error("  export SUPABASE_ANON_KEY='your-anon-key'")
        logger.error("=" * 60)
        sys.exit(1)
    
    try:
        _v_scheduler = DataCollectionScheduler()
        _v_scheduler.run()
    
    except Exception as p_error:
        logger.error(f"❌ 스케줄러 실행 실패: {p_error}")
        sys.exit(1)


if __name__ == '__main__':
    main()




