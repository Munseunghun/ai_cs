#!/bin/bash
echo "============================================================"
echo "Supabase 스키마 생성 및 데이터 적재"
echo "============================================================"
echo ""
echo "1. Supabase 대시보드에서 스키마 생성:"
echo "   https://supabase.com/dashboard/project/uewhvekfjjvxoioklzza/sql/new"
echo ""
echo "2. SQL 파일 확인:"
echo "   cat database/supabase_schema.sql"
echo ""
read -p "스키마 생성을 완료하셨나요? (y/n): " answer
if [[ ! "$answer" =~ ^[Yy]$ ]]; then
    echo "스키마 생성을 먼저 완료해주세요."
    exit 0
fi
echo ""
echo "데이터 적재 시작..."
cd backend
node scripts/import-to-supabase.js


