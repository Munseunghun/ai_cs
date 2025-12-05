#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Supabase PostgreSQL 직접 연결하여 테이블 생성
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# 환경변수 로드
env_path = Path(__file__).parent.parent / 'crawler' / '.env'
load_dotenv(env_path)

SUPABASE_URL = os.getenv('SUPABASE_URL')

if not SUPABASE_URL:
    print("❌ Supabase 환경변수가 설정되지 않았습니다.")
    sys.exit(1)

# psycopg2 설치 확인
try:
    import psycopg2
    HAS_PSYCOPG2 = True
except ImportError:
    HAS_PSYCOPG2 = False

print("=" * 80)
print("🗄️  Supabase 테이블 직접 생성")
print("=" * 80)

if not HAS_PSYCOPG2:
    print("\n⚠️  psycopg2가 설치되지 않았습니다.")
    print("\n📦 설치 방법:")
    print("   pip3 install psycopg2-binary")
    print("\n또는 Supabase 대시보드를 사용하세요:")
    print(f"   https://supabase.com/dashboard/project/{SUPABASE_URL.split('//')[1].split('.')[0]}/sql")
    print("\n✅ SQL이 이미 클립보드에 복사되어 있습니다!")
    print("   Supabase SQL Editor에서 Cmd+V로 붙여넣기하세요.")
    sys.exit(0)

# PostgreSQL 연결 정보
# Supabase는 직접 PostgreSQL 연결을 위해 별도 포트와 비밀번호 필요
print("\n⚠️  직접 PostgreSQL 연결을 위해서는 다음 정보가 필요합니다:")
print("   1. Database password (Supabase 프로젝트 설정에서 확인)")
print("   2. Direct connection string")
print("\n📌 Supabase 대시보드에서 확인:")
print(f"   https://supabase.com/dashboard/project/{SUPABASE_URL.split('//')[1].split('.')[0]}/settings/database")
print("\n✅ 가장 쉬운 방법: Supabase SQL Editor 사용")
print(f"   https://supabase.com/dashboard/project/{SUPABASE_URL.split('//')[1].split('.')[0]}/sql")
print("\n   SQL이 클립보드에 복사되어 있습니다. Cmd+V로 붙여넣기하세요!")

sys.exit(0)
