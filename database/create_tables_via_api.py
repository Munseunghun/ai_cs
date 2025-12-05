#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Supabase 확장 테이블 자동 생성 스크립트 (REST API 사용)
"""

import os
import sys
import requests
from pathlib import Path
from dotenv import load_dotenv

# 환경변수 로드
env_path = Path(__file__).parent.parent / 'crawler' / '.env'
load_dotenv(env_path)

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Supabase 환경변수가 설정되지 않았습니다.")
    sys.exit(1)

print("=" * 80)
print("🗄️  Supabase 확장 테이블 생성")
print("=" * 80)
print(f"URL: {SUPABASE_URL}")
print("=" * 80)

# SQL 파일 읽기
sql_file = Path(__file__).parent / 'enhanced_live_schema.sql'

if not sql_file.exists():
    print(f"❌ SQL 파일을 찾을 수 없습니다: {sql_file}")
    sys.exit(1)

with open(sql_file, 'r', encoding='utf-8') as f:
    full_sql = f.read()

print(f"\n📄 SQL 파일 로드: {sql_file.name}")
print(f"   크기: {len(full_sql)} bytes")

# SQL을 개별 명령으로 분리
sql_commands = []
current_command = []

for line in full_sql.split('\n'):
    # 주석 제거
    if line.strip().startswith('--'):
        continue
    
    current_command.append(line)
    
    # 세미콜론으로 끝나면 명령 완료
    if line.strip().endswith(';'):
        cmd = '\n'.join(current_command).strip()
        if cmd:
            sql_commands.append(cmd)
        current_command = []

print(f"   총 {len(sql_commands)}개 SQL 명령 발견")

# Supabase REST API를 통한 SQL 실행
# 참고: anon key로는 DDL 실행 불가, service_role key 필요
print("\n⚠️  중요: Supabase anon key로는 테이블 생성이 불가능합니다.")
print("   다음 방법 중 하나를 선택하세요:\n")

print("📌 방법 1: Supabase 대시보드 사용 (권장)")
print("   1. 브라우저에서 다음 URL 접속:")
print(f"      https://supabase.com/dashboard/project/{SUPABASE_URL.split('//')[1].split('.')[0]}/sql")
print("   2. SQL Editor에서 다음 파일 내용을 복사하여 실행:")
print(f"      {sql_file}")
print()

print("📌 방법 2: 자동 실행 스크립트 사용")
print("   다음 명령을 실행하면 SQL이 클립보드에 복사됩니다:")
print(f"      cat '{sql_file}' | pbcopy")
print("   그 다음 Supabase SQL Editor에 붙여넣기하세요.")
print()

# SQL을 파일로 저장 (사용자가 복사하기 쉽게)
output_file = Path(__file__).parent / 'create_tables.sql'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(full_sql)

print(f"📄 SQL 파일 저장: {output_file}")
print()

# 클립보드에 복사 시도
try:
    import subprocess
    subprocess.run(['pbcopy'], input=full_sql.encode('utf-8'), check=True)
    print("✅ SQL이 클립보드에 복사되었습니다!")
    print("   Supabase SQL Editor에서 Cmd+V로 붙여넣기하세요.")
except:
    print("ℹ️  클립보드 복사 실패 (수동으로 복사하세요)")

print("\n" + "=" * 80)
print("📊 생성될 테이블:")
print("=" * 80)
print("   1. live_products (7개 컬럼 추가)")
print("   2. live_coupons (쿠폰 정보)")
print("   3. live_comments (댓글/채팅)")
print("   4. live_faqs (자주 묻는 질문)")
print("   5. live_intro (라이브 소개)")
print("   6. live_statistics (통계 정보)")
print("   7. live_images (이미지 정보)")
print("=" * 80)
