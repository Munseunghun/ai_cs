#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
동적 플랫폼 데이터 수집 스케줄러
관리자 기능에서 추가한 플랫폼을 자동으로 감지하고 크롤링합니다.
"""

import schedule
import time
import logging
import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path

# 로깅 설정
log_dir = Path(__file__).parent / 'logs'
log_dir.mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler(log_dir / f'dynamic_scheduler_{datetime.now().strftime("%Y%m%d")}.log', encoding='utf-8'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# 플랫폼 설정 파일 경로
PLATFORMS_CONFIG_FILE = Path(__file__).parent / 'config' / 'platforms.json'


class DynamicDataCollectionScheduler:
    """동적 데이터 수집 스케줄러"""
    
    def __init__(self):
        """스케줄러 초기화"""
        self.p_crawler_dir = Path(__file__).parent
        self.p_output_dir = self.p_crawler_dir / 'output'
        self.p_output_dir.mkdir(exist_ok=True)
        
        # 플랫폼별 크롤러 매핑
        self.p_platform_crawlers = {
            'NAVER': 'crawl_multi_brands.py',
            'KAKAO': 'kakao_live_crawler.py',
            '11ST': 'crawl_multi_brands.py',
            'GMARKET': 'crawl_multi_brands.py',
            'OLIVEYOUNG': 'crawl_multi_brands.py',
            'GRIP': 'crawl_multi_brands.py',
            'MUSINSA': 'crawl_multi_brands.py',
            'LOTTEON': 'crawl_multi_brands.py',
            'AMOREMALL': 'crawl_multi_brands.py',
            'INNISFREE_MALL': 'parsers/innisfree_live_parser.py',
        }
        
        # 수집 통계
        self.p_stats = {
            'total_runs': 0,
            'successful_runs': 0,
            'failed_runs': 0,
            'last_run': None,
            'last_success': None,
            'last_error': None,
            'platforms_processed': {}
        }
    
    def load_platforms(self):
        """
        플랫폼 설정 파일 로드
        
        Returns:
            list: 활성화된 플랫폼 리스트
        """
        try:
            if not PLATFORMS_CONFIG_FILE.exists():
                logger.warning(f"⚠️ 플랫폼 설정 파일이 없습니다: {PLATFORMS_CONFIG_FILE}")
                logger.info("💡 기본 플랫폼을 사용합니다.")
                return self._get_default_platforms()
            
            with open(PLATFORMS_CONFIG_FILE, 'r', encoding='utf-8') as f:
                platforms = json.load(f)
            
            # 활성화된 플랫폼만 필터링
            active_platforms = [p for p in platforms if p.get('isActive', True)]
            
            logger.info(f"📦 플랫폼 설정 로드 완료: {len(active_platforms)}개 활성 플랫폼")
            return active_platforms
            
        except Exception as e:
            logger.error(f"❌ 플랫폼 설정 로드 실패: {e}")
            return self._get_default_platforms()
    
    def _get_default_platforms(self):
        """기본 플랫폼 리스트 반환"""
        return [
            {'code': 'NAVER', 'name': '네이버', 'url': 'https://shoppinglive.naver.com', 'isActive': True},
            {'code': 'KAKAO', 'name': '카카오', 'url': 'https://shoppinglive.kakao.com', 'isActive': True},
        ]
    
    def collect_platform_data(self, platform):
        """
        특정 플랫폼 데이터 수집
        
        Args:
            platform (dict): 플랫폼 정보
        """
        platform_code = platform.get('code', '')
        platform_name = platform.get('name', 'Unknown')
        platform_url = platform.get('url', '')
        
        logger.info("=" * 80)
        logger.info(f"🔄 {platform_name} ({platform_code}) 데이터 수집 시작")
        logger.info(f"   URL: {platform_url}")
        logger.info("=" * 80)
        
        try:
            # 크롤러 스크립트 결정
            crawler_script = self.p_platform_crawlers.get(platform_code)
            
            if not crawler_script:
                # 기본 크롤러 사용 또는 플랫폼별 파서 사용
                if 'INNISFREE' in platform_code.upper() or 'innisfree' in platform_url.lower():
                    crawler_script = 'parsers/innisfree_live_parser.py'
                else:
                    crawler_script = 'crawl_multi_brands.py'
            
            crawler_path = self.p_crawler_dir / crawler_script
            
            if not crawler_path.exists():
                logger.warning(f"⚠️ 크롤러 스크립트가 없습니다: {crawler_path}")
                logger.info(f"💡 기본 멀티 브랜드 크롤러를 사용합니다.")
                crawler_path = self.p_crawler_dir / 'crawl_multi_brands.py'
            
            if crawler_path.exists():
                logger.info(f"📝 실행: {crawler_path}")
                
                # 크롤러 실행 (플랫폼 URL을 인자로 전달)
                if crawler_script == 'parsers/innisfree_live_parser.py':
                    # 이니스프리 라이브 파서는 URL과 코드를 인자로 받음
                    result = subprocess.run(
                        ['python3', str(crawler_path), platform_url, platform_code],
                        cwd=str(self.p_crawler_dir),
                        capture_output=True,
                        text=True,
                        timeout=600  # 10분 타임아웃
                    )
                else:
                    # 기타 크롤러는 기본 실행
                    result = subprocess.run(
                        ['python3', str(crawler_path)],
                        cwd=str(self.p_crawler_dir),
                        capture_output=True,
                        text=True,
                        timeout=600
                    )
                
                if result.returncode == 0:
                    logger.info(f"✅ {platform_name} 데이터 수집 성공!")
                    logger.info(f"출력:\n{result.stdout[:500]}")  # 처음 500자만 출력
                    self.p_stats['platforms_processed'][platform_code] = {
                        'status': 'success',
                        'last_success': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    }
                else:
                    logger.error(f"❌ {platform_name} 크롤러 실행 실패 (코드: {result.returncode})")
                    logger.error(f"에러:\n{result.stderr[:500]}")
                    self.p_stats['platforms_processed'][platform_code] = {
                        'status': 'failed',
                        'last_error': result.stderr[:200]
                    }
            else:
                logger.error(f"❌ 크롤러 스크립트를 찾을 수 없습니다: {crawler_path}")
                self.p_stats['platforms_processed'][platform_code] = {
                    'status': 'failed',
                    'last_error': '크롤러 스크립트 없음'
                }
                
        except subprocess.TimeoutExpired:
            logger.error(f"❌ {platform_name} 크롤링 타임아웃 (10분 초과)")
            self.p_stats['platforms_processed'][platform_code] = {
                'status': 'failed',
                'last_error': '타임아웃'
            }
        except Exception as e:
            logger.error(f"❌ {platform_name} 예상치 못한 오류: {str(e)}")
            self.p_stats['platforms_processed'][platform_code] = {
                'status': 'failed',
                'last_error': str(e)[:200]
            }
    
    def collect_all_platforms_data(self):
        """모든 활성 플랫폼 데이터 수집"""
        logger.info("=" * 80)
        logger.info("🔄 전체 플랫폼 데이터 수집 시작")
        logger.info("=" * 80)
        
        try:
            self.p_stats['total_runs'] += 1
            self.p_stats['last_run'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            # 플랫폼 설정 로드
            platforms = self.load_platforms()
            
            if not platforms:
                logger.warning("⚠️ 수집할 플랫폼이 없습니다.")
                return
            
            logger.info(f"📦 수집 대상 플랫폼: {len(platforms)}개")
            
            success_count = 0
            fail_count = 0
            
            # 각 플랫폼별로 수집
            for platform in platforms:
                try:
                    self.collect_platform_data(platform)
                    success_count += 1
                except Exception as e:
                    logger.error(f"❌ 플랫폼 수집 중 오류: {e}")
                    fail_count += 1
                
                # 플랫폼 간 딜레이 (서버 부하 방지)
                time.sleep(5)
            
            self.p_stats['successful_runs'] += 1 if success_count > 0 else 0
            self.p_stats['failed_runs'] += fail_count
            
            if success_count > 0:
                self.p_stats['last_success'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
        except Exception as e:
            logger.error(f"❌ 전체 플랫폼 수집 중 오류: {str(e)}")
            self.p_stats['failed_runs'] += 1
            self.p_stats['last_error'] = str(e)[:500]
        finally:
            self._save_stats()
            logger.info("=" * 80)
            logger.info(f"📊 수집 완료 | 성공: {success_count}, 실패: {fail_count}")
            logger.info("=" * 80)
    
    def _save_stats(self):
        """수집 통계 저장"""
        try:
            stats_file = self.p_output_dir / 'dynamic_scheduler_stats.json'
            with open(stats_file, 'w', encoding='utf-8') as f:
                json.dump(self.p_stats, f, ensure_ascii=False, indent=2)
        except Exception as e:
            logger.error(f"통계 저장 실패: {str(e)}")
    
    def get_stats(self):
        """수집 통계 출력"""
        logger.info("=" * 80)
        logger.info("📊 동적 데이터 수집 통계")
        logger.info("=" * 80)
        logger.info(f"총 실행 횟수: {self.p_stats['total_runs']}")
        logger.info(f"성공: {self.p_stats['successful_runs']}")
        logger.info(f"실패: {self.p_stats['failed_runs']}")
        logger.info(f"마지막 실행: {self.p_stats['last_run']}")
        logger.info(f"마지막 성공: {self.p_stats['last_success']}")
        
        if self.p_stats['platforms_processed']:
            logger.info("\n플랫폼별 통계:")
            for code, stats in self.p_stats['platforms_processed'].items():
                logger.info(f"  - {code}: {stats.get('status', 'unknown')}")
        
        if self.p_stats['last_error']:
            logger.info(f"마지막 에러: {self.p_stats['last_error'][:200]}")
        logger.info("=" * 80)


def main():
    """메인 함수"""
    logger.info("=" * 80)
    logger.info("🚀 동적 플랫폼 데이터 수집 스케줄러 시작")
    logger.info("=" * 80)
    logger.info("⏰ 수집 주기: 1시간마다")
    logger.info("📦 수집 대상: 관리자 기능에서 추가한 활성 플랫폼")
    logger.info("=" * 80)
    
    scheduler = DynamicDataCollectionScheduler()
    
    # 시작 시 즉시 1회 실행
    logger.info("🔄 초기 데이터 수집 실행...")
    scheduler.collect_all_platforms_data()
    
    # 매 시간 정각에 실행 (예: 10:00, 11:00, 12:00...)
    schedule.every().hour.at(":00").do(scheduler.collect_all_platforms_data)
    
    # 매일 자정에 통계 출력
    schedule.every().day.at("00:00").do(scheduler.get_stats)
    
    logger.info("✅ 스케줄러 준비 완료")
    logger.info("💡 Ctrl+C를 눌러 종료할 수 있습니다.")
    logger.info("=" * 80)
    
    try:
        while True:
            schedule.run_pending()
            time.sleep(60)  # 1분마다 스케줄 체크
    except KeyboardInterrupt:
        logger.info("\n⏹️  스케줄러 종료")
        scheduler.get_stats()


if __name__ == "__main__":
    main()

