/**
 * 관리자 기능 API 라우트
 * 플랫폼 및 브랜드 관리
 */

const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// 플랫폼 설정 파일 경로
const PLATFORMS_FILE = path.join(__dirname, '../../crawler/config/platforms.json');
const BRANDS_FILE = path.join(__dirname, '../../crawler/config/brands.json');

// 설정 디렉토리 생성
const ensureConfigDir = async () => {
  const configDir = path.dirname(PLATFORMS_FILE);
  try {
    await fs.mkdir(configDir, { recursive: true });
  } catch (error) {
    // 디렉토리가 이미 존재하면 무시
  }
};

// 플랫폼 데이터 읽기
const readPlatforms = async () => {
  try {
    await ensureConfigDir();
    const data = await fs.readFile(PLATFORMS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 파일이 없으면 기본값 반환
    return [];
  }
};

// 플랫폼 데이터 저장
const savePlatforms = async (platforms) => {
  await ensureConfigDir();
  await fs.writeFile(PLATFORMS_FILE, JSON.stringify(platforms, null, 2), 'utf-8');
};

// 브랜드 데이터 읽기
const readBrands = async () => {
  try {
    await ensureConfigDir();
    const data = await fs.readFile(BRANDS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// 브랜드 데이터 저장
const saveBrands = async (brands) => {
  await ensureConfigDir();
  await fs.writeFile(BRANDS_FILE, JSON.stringify(brands, null, 2), 'utf-8');
};

// 플랫폼 목록 조회
router.get('/platforms', async (req, res) => {
  try {
    const platforms = await readPlatforms();
    res.json({ success: true, data: platforms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 플랫폼 저장 (추가/수정)
router.post('/platforms', async (req, res) => {
  try {
    const { platforms } = req.body;
    if (!Array.isArray(platforms)) {
      return res.status(400).json({ success: false, error: '플랫폼 배열이 필요합니다.' });
    }
    
    await savePlatforms(platforms);
    res.json({ success: true, message: '플랫폼이 저장되었습니다.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 브랜드 목록 조회
router.get('/brands', async (req, res) => {
  try {
    const brands = await readBrands();
    res.json({ success: true, data: brands });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 브랜드 저장 (추가/수정)
router.post('/brands', async (req, res) => {
  try {
    const { brands } = req.body;
    if (!Array.isArray(brands)) {
      return res.status(400).json({ success: false, error: '브랜드 배열이 필요합니다.' });
    }
    
    await saveBrands(brands);
    res.json({ success: true, message: '브랜드가 저장되었습니다.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

