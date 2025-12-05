/**
 * 관리자 기능 페이지
 * 플랫폼 및 브랜드 관리 기능 (Dark Modern Theme)
 */

import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  alpha,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Settings as SettingsIcon,
  Storefront as StorefrontIcon,
  BusinessCenter as BusinessCenterIcon,
} from '@mui/icons-material';

// 다크 테마 색상 팔레트 (대시보드와 동일)
const DARK_COLORS = {
  background: '#0F1419',
  cardBg: '#1A1F2E',
  cardHoverBg: '#252B3B',
  primary: '#6366F1',
  secondary: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  text: {
    primary: '#F9FAFB',
    secondary: '#9CA3AF',
    disabled: '#6B7280',
  },
  border: '#2D3748',
};

// 로컬 스토리지 키
const STORAGE_KEYS = {
  PLATFORMS: 'admin_platforms',
  BRANDS: 'admin_brands',
};

// 기본 플랫폼 데이터
const DEFAULT_PLATFORMS = [
  { id: 'NAVER', code: 'NAVER', name: '네이버', url: 'https://shoppinglive.naver.com', isActive: true },
  { id: 'KAKAO', code: 'KAKAO', name: '카카오', url: 'https://shoppinglive.kakao.com', isActive: true },
  { id: '11ST', code: '11ST', name: '11번가', url: 'https://m.11st.co.kr/page/main/live11', isActive: true },
  { id: 'GMARKET', code: 'GMARKET', name: 'G마켓', url: 'https://m.gmarket.co.kr/n/live/schedule', isActive: true },
  { id: 'OLIVEYOUNG', code: 'OLIVEYOUNG', name: '올리브영', url: 'https://m.oliveyoung.co.kr/m/mtn/explorer?menu=live', isActive: true },
  { id: 'GRIP', code: 'GRIP', name: '그립', url: 'https://www.grip.show/discover/category', isActive: true },
  { id: 'MUSINSA', code: 'MUSINSA', name: '무신사', url: 'https://www.musinsa.com/campaign/musinsa_live/0', isActive: true },
  { id: 'LOTTEON', code: 'LOTTEON', name: '롯데온', url: 'https://www.lotteon.com/display/planV2/planDetail', isActive: true },
  { id: 'AMOREMALL', code: 'AMOREMALL', name: '아모레몰', url: 'https://www.amoremall.com/kr/ko/display/live', isActive: true },
  { id: 'INNISFREE_MALL', code: 'INNISFREE_MALL', name: '이니스프리몰', url: 'https://www.innisfree.com/kr/ko/display/live', isActive: true },
];

// 기본 브랜드 데이터
const DEFAULT_BRANDS = [
  { id: 'SULWHASOO', code: 'SULWHASOO', name: '설화수' },
  { id: 'LANEIGE', code: 'LANEIGE', name: '라네즈' },
  { id: 'IOPE', code: 'IOPE', name: '아이오페' },
  { id: 'HERA', code: 'HERA', name: '헤라' },
  { id: 'ESTEE', code: 'ESTEE', name: '에스트라' },
  { id: 'INNISFREE', code: 'INNISFREE', name: '이니스프리' },
  { id: 'HAPPYBATH', code: 'HAPPYBATH', name: '해피바스' },
  { id: 'VITALBEAUTY', code: 'VITALBEAUTY', name: '바이탈뷰티' },
  { id: 'PRIMERA', code: 'PRIMERA', name: '프리메라' },
  { id: 'OSULLOC', code: 'OSULLOC', name: '오설록' },
];

const AdminPanel = () => {
  const [tabValue, setTabValue] = useState(0);
  const [platforms, setPlatforms] = useState([]);
  const [brands, setBrands] = useState([]);
  const [editingPlatform, setEditingPlatform] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [platformDialogOpen, setPlatformDialogOpen] = useState(false);
  const [brandDialogOpen, setBrandDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // 플랫폼 폼 상태
  const [platformForm, setPlatformForm] = useState({
    code: '',
    name: '',
    url: '',
    isActive: true,
  });

  // 브랜드 폼 상태
  const [brandForm, setBrandForm] = useState({
    code: '',
    name: '',
  });

  // 데이터 로드
  useEffect(() => {
    loadPlatforms();
    loadBrands();
  }, []);

  // 플랫폼 데이터 로드
  const loadPlatforms = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLATFORMS);
      if (saved) {
        setPlatforms(JSON.parse(saved));
      } else {
        setPlatforms(DEFAULT_PLATFORMS);
        savePlatforms(DEFAULT_PLATFORMS);
      }
    } catch (e) {
      console.error('플랫폼 데이터 로드 실패:', e);
      setPlatforms(DEFAULT_PLATFORMS);
    }
  };

  // 브랜드 데이터 로드
  const loadBrands = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BRANDS);
      if (saved) {
        setBrands(JSON.parse(saved));
      } else {
        setBrands(DEFAULT_BRANDS);
        saveBrands(DEFAULT_BRANDS);
      }
    } catch (e) {
      console.error('브랜드 데이터 로드 실패:', e);
      setBrands(DEFAULT_BRANDS);
    }
  };

  // 플랫폼 데이터 저장 (로컬 스토리지 + 백엔드 API)
  const savePlatforms = async (data) => {
    try {
      // 로컬 스토리지에 저장
      localStorage.setItem(STORAGE_KEYS.PLATFORMS, JSON.stringify(data));
      
      // 백엔드 API에 저장 (크롤러가 읽을 수 있도록)
      try {
        // 환경 변수에서 API URL 가져오기 (프로덕션/개발 환경 대응)
        const _v_api_base_url = process.env.REACT_APP_API_URL || 'http://localhost:3001';
        const response = await fetch(`${_v_api_base_url}/api/admin/platforms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ platforms: data }),
        });
        
        if (!response.ok) {
          console.warn('백엔드 플랫폼 저장 실패:', response.statusText);
        } else {
          console.log('✅ 백엔드 플랫폼 저장 성공');
        }
      } catch (apiError) {
        console.warn('백엔드 API 호출 실패 (크롤러는 로컬 스토리지에서 읽을 수 없습니다):', apiError);
      }
    } catch (e) {
      console.error('플랫폼 데이터 저장 실패:', e);
    }
  };

  // 브랜드 데이터 저장 (로컬 스토리지 + 백엔드 API)
  const saveBrands = async (data) => {
    try {
      // 로컬 스토리지에 저장
      localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(data));
      
      // 백엔드 API에 저장
      try {
        // 환경 변수에서 API URL 가져오기 (프로덕션/개발 환경 대응)
        const _v_api_base_url = process.env.REACT_APP_API_URL || 'http://localhost:3001';
        const response = await fetch(`${_v_api_base_url}/api/admin/brands`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ brands: data }),
        });
        
        if (!response.ok) {
          console.warn('백엔드 브랜드 저장 실패:', response.statusText);
        } else {
          console.log('✅ 백엔드 브랜드 저장 성공');
        }
      } catch (apiError) {
        console.warn('백엔드 API 호출 실패:', apiError);
      }
    } catch (e) {
      console.error('브랜드 데이터 저장 실패:', e);
    }
  };

  // 플랫폼 추가/수정 다이얼로그 열기
  const handlePlatformDialogOpen = (platform = null) => {
    if (platform) {
      setEditingPlatform(platform);
      setPlatformForm({
        code: platform.code,
        name: platform.name,
        url: platform.url,
        isActive: platform.isActive,
      });
    } else {
      setEditingPlatform(null);
      setPlatformForm({
        code: '',
        name: '',
        url: '',
        isActive: true,
      });
    }
    setPlatformDialogOpen(true);
  };

  // 브랜드 추가/수정 다이얼로그 열기
  const handleBrandDialogOpen = (brand = null) => {
    if (brand) {
      setEditingBrand(brand);
      setBrandForm({
        code: brand.code,
        name: brand.name,
      });
    } else {
      setEditingBrand(null);
      setBrandForm({
        code: '',
        name: '',
      });
    }
    setBrandDialogOpen(true);
  };

  // 플랫폼 저장
  const handlePlatformSave = async () => {
    if (!platformForm.code || !platformForm.name || !platformForm.url) {
      showSnackbar('모든 필드를 입력해주세요.', 'error');
      return;
    }

    const updatedPlatforms = editingPlatform
      ? platforms.map((p) =>
          p.id === editingPlatform.id
            ? { ...p, ...platformForm }
            : p
        )
      : [...platforms, { ...platformForm, id: platformForm.code }];

    setPlatforms(updatedPlatforms);
    await savePlatforms(updatedPlatforms);
    setPlatformDialogOpen(false);
    showSnackbar(
      editingPlatform ? '플랫폼이 수정되었습니다.' : '플랫폼이 추가되었습니다.',
      'success'
    );
  };

  // 브랜드 저장
  const handleBrandSave = async () => {
    if (!brandForm.code || !brandForm.name) {
      showSnackbar('모든 필드를 입력해주세요.', 'error');
      return;
    }

    // 브랜드 코드 중복 체크 (수정 시에는 현재 브랜드 제외)
    const isDuplicate = brands.some(
      (b) => b.code === brandForm.code && (!editingBrand || b.id !== editingBrand.id)
    );
    if (isDuplicate) {
      showSnackbar('이미 존재하는 브랜드 코드입니다.', 'error');
      return;
    }

    const updatedBrands = editingBrand
      ? brands.map((b) =>
          b.id === editingBrand.id
            ? { ...b, ...brandForm, id: brandForm.code } // id도 새로운 코드로 업데이트
            : b
        )
      : [...brands, { ...brandForm, id: brandForm.code }];

    setBrands(updatedBrands);
    await saveBrands(updatedBrands);
    setBrandDialogOpen(false);
    showSnackbar(
      editingBrand ? '브랜드가 수정되었습니다.' : '브랜드가 추가되었습니다.',
      'success'
    );
  };

  // 플랫폼 삭제
  const handlePlatformDelete = (platformId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedPlatforms = platforms.filter((p) => p.id !== platformId);
      setPlatforms(updatedPlatforms);
      savePlatforms(updatedPlatforms);
      showSnackbar('플랫폼이 삭제되었습니다.', 'success');
    }
  };

  // 브랜드 삭제
  const handleBrandDelete = (brandId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const updatedBrands = brands.filter((b) => b.id !== brandId);
      setBrands(updatedBrands);
      saveBrands(updatedBrands);
      showSnackbar('브랜드가 삭제되었습니다.', 'success');
    }
  };

  // 플랫폼 활성화/비활성화 토글
  const handlePlatformToggle = (platformId) => {
    const updatedPlatforms = platforms.map((p) =>
      p.id === platformId ? { ...p, isActive: !p.isActive } : p
    );
    setPlatforms(updatedPlatforms);
    savePlatforms(updatedPlatforms);
    showSnackbar('플랫폼 상태가 변경되었습니다.', 'success');
  };

  // 스낵바 표시
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: DARK_COLORS.background, pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: 4 }}>
        {/* 페이지 헤더 */}
        <Box mb={5}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: DARK_COLORS.text.primary,
              letterSpacing: '-0.02em',
              background: `linear-gradient(135deg, ${DARK_COLORS.primary} 0%, ${DARK_COLORS.secondary} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            관리자 기능
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: DARK_COLORS.text.secondary,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            Live 방송 플랫폼 및 브랜드 관리
          </Typography>
        </Box>

        {/* 탭 */}
        <Paper
          sx={{
            bgcolor: DARK_COLORS.cardBg,
            border: `1px solid ${DARK_COLORS.border}`,
            borderRadius: 3,
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
            mb: 4,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: `1px solid ${DARK_COLORS.border}`,
              '& .MuiTab-root': {
                color: DARK_COLORS.text.secondary,
                fontWeight: 600,
                '&.Mui-selected': {
                  color: DARK_COLORS.primary,
                },
              },
              '& .MuiTabs-indicator': {
                bgcolor: DARK_COLORS.primary,
              },
            }}
          >
            <Tab
              icon={<StorefrontIcon sx={{ mr: 1 }} />}
              iconPosition="start"
              label="플랫폼 관리"
            />
            <Tab
              icon={<BusinessCenterIcon sx={{ mr: 1 }} />}
              iconPosition="start"
              label="브랜드 관리"
            />
          </Tabs>
        </Paper>

        {/* 플랫폼 관리 탭 */}
        {tabValue === 0 && (
          <Paper
            sx={{
              p: 4,
              bgcolor: DARK_COLORS.cardBg,
              border: `1px solid ${DARK_COLORS.border}`,
              borderRadius: 3,
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography
                variant="h5"
                sx={{
                  color: DARK_COLORS.text.primary,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 4,
                    height: 28,
                    bgcolor: DARK_COLORS.primary,
                    borderRadius: 2,
                  }}
                />
                Live 방송 플랫폼 목록
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handlePlatformDialogOpen()}
                sx={{
                  bgcolor: DARK_COLORS.primary,
                  color: DARK_COLORS.text.primary,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: alpha(DARK_COLORS.primary, 0.8),
                    boxShadow: `0 8px 24px ${alpha(DARK_COLORS.primary, 0.4)}`,
                  },
                }}
              >
                플랫폼 추가
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: DARK_COLORS.text.secondary,
                        fontWeight: 600,
                        borderBottom: `1px solid ${DARK_COLORS.border}`,
                      }}
                    >
                      플랫폼 코드
                    </TableCell>
                    <TableCell
                      sx={{
                        color: DARK_COLORS.text.secondary,
                        fontWeight: 600,
                        borderBottom: `1px solid ${DARK_COLORS.border}`,
                      }}
                    >
                      플랫폼명
                    </TableCell>
                    <TableCell
                      sx={{
                        color: DARK_COLORS.text.secondary,
                        fontWeight: 600,
                        borderBottom: `1px solid ${DARK_COLORS.border}`,
                      }}
                    >
                      방송 URL
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: DARK_COLORS.text.secondary,
                        fontWeight: 600,
                        borderBottom: `1px solid ${DARK_COLORS.border}`,
                      }}
                    >
                      상태
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: DARK_COLORS.text.secondary,
                        fontWeight: 600,
                        borderBottom: `1px solid ${DARK_COLORS.border}`,
                      }}
                    >
                      작업
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {platforms.map((platform) => (
                    <TableRow
                      key={platform.id}
                      sx={{
                        '&:hover': {
                          bgcolor: alpha(DARK_COLORS.primary, 0.05),
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          color: DARK_COLORS.text.primary,
                          borderBottom: `1px solid ${DARK_COLORS.border}`,
                        }}
                      >
                        {platform.code}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: DARK_COLORS.text.primary,
                          borderBottom: `1px solid ${DARK_COLORS.border}`,
                          fontWeight: 600,
                        }}
                      >
                        {platform.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: DARK_COLORS.text.secondary,
                          borderBottom: `1px solid ${DARK_COLORS.border}`,
                          maxWidth: 400,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {platform.url}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: `1px solid ${DARK_COLORS.border}`,
                        }}
                      >
                        <Chip
                          label={platform.isActive ? '활성' : '비활성'}
                          size="small"
                          sx={{
                            bgcolor: platform.isActive
                              ? alpha(DARK_COLORS.success, 0.15)
                              : alpha(DARK_COLORS.text.disabled, 0.15),
                            color: platform.isActive
                              ? DARK_COLORS.success
                              : DARK_COLORS.text.disabled,
                            border: `1px solid ${
                              platform.isActive
                                ? alpha(DARK_COLORS.success, 0.3)
                                : alpha(DARK_COLORS.text.disabled, 0.3)
                            }`,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: `1px solid ${DARK_COLORS.border}`,
                        }}
                      >
                        <Box display="flex" gap={1} justifyContent="center">
                          <IconButton
                            size="small"
                            onClick={() => handlePlatformToggle(platform.id)}
                            sx={{
                              color: DARK_COLORS.text.secondary,
                              '&:hover': {
                                bgcolor: alpha(DARK_COLORS.info, 0.1),
                                color: DARK_COLORS.info,
                              },
                            }}
                          >
                            <SettingsIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handlePlatformDialogOpen(platform)}
                            sx={{
                              color: DARK_COLORS.text.secondary,
                              '&:hover': {
                                bgcolor: alpha(DARK_COLORS.primary, 0.1),
                                color: DARK_COLORS.primary,
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handlePlatformDelete(platform.id)}
                            sx={{
                              color: DARK_COLORS.text.secondary,
                              '&:hover': {
                                bgcolor: alpha(DARK_COLORS.secondary, 0.1),
                                color: DARK_COLORS.secondary,
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* 브랜드 관리 탭 */}
        {tabValue === 1 && (
          <Paper
            sx={{
              p: 4,
              bgcolor: DARK_COLORS.cardBg,
              border: `1px solid ${DARK_COLORS.border}`,
              borderRadius: 3,
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography
                variant="h5"
                sx={{
                  color: DARK_COLORS.text.primary,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 4,
                    height: 28,
                    bgcolor: DARK_COLORS.secondary,
                    borderRadius: 2,
                  }}
                />
                브랜드 목록
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleBrandDialogOpen()}
                sx={{
                  bgcolor: DARK_COLORS.secondary,
                  color: DARK_COLORS.text.primary,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: alpha(DARK_COLORS.secondary, 0.8),
                    boxShadow: `0 8px 24px ${alpha(DARK_COLORS.secondary, 0.4)}`,
                  },
                }}
              >
                브랜드 추가
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: DARK_COLORS.text.secondary,
                        fontWeight: 600,
                        borderBottom: `1px solid ${DARK_COLORS.border}`,
                      }}
                    >
                      브랜드 코드
                    </TableCell>
                    <TableCell
                      sx={{
                        color: DARK_COLORS.text.secondary,
                        fontWeight: 600,
                        borderBottom: `1px solid ${DARK_COLORS.border}`,
                      }}
                    >
                      브랜드명
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: DARK_COLORS.text.secondary,
                        fontWeight: 600,
                        borderBottom: `1px solid ${DARK_COLORS.border}`,
                      }}
                    >
                      작업
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {brands.map((brand) => (
                    <TableRow
                      key={brand.id}
                      sx={{
                        '&:hover': {
                          bgcolor: alpha(DARK_COLORS.secondary, 0.05),
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          color: DARK_COLORS.text.primary,
                          borderBottom: `1px solid ${DARK_COLORS.border}`,
                        }}
                      >
                        {brand.code}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: DARK_COLORS.text.primary,
                          borderBottom: `1px solid ${DARK_COLORS.border}`,
                          fontWeight: 600,
                        }}
                      >
                        {brand.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: `1px solid ${DARK_COLORS.border}`,
                        }}
                      >
                        <Box display="flex" gap={1} justifyContent="center">
                          <IconButton
                            size="small"
                            onClick={() => handleBrandDialogOpen(brand)}
                            sx={{
                              color: DARK_COLORS.text.secondary,
                              '&:hover': {
                                bgcolor: alpha(DARK_COLORS.primary, 0.1),
                                color: DARK_COLORS.primary,
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleBrandDelete(brand.id)}
                            sx={{
                              color: DARK_COLORS.text.secondary,
                              '&:hover': {
                                bgcolor: alpha(DARK_COLORS.secondary, 0.1),
                                color: DARK_COLORS.secondary,
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* 플랫폼 추가/수정 다이얼로그 */}
        <Dialog
          open={platformDialogOpen}
          onClose={() => setPlatformDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: DARK_COLORS.cardBg,
              border: `1px solid ${DARK_COLORS.border}`,
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle
            sx={{
              color: DARK_COLORS.text.primary,
              fontWeight: 700,
              borderBottom: `1px solid ${DARK_COLORS.border}`,
            }}
          >
            {editingPlatform ? '플랫폼 수정' : '플랫폼 추가'}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="플랫폼 코드"
                  value={platformForm.code}
                  onChange={(e) =>
                    setPlatformForm({ ...platformForm, code: e.target.value.toUpperCase() })
                  }
                  disabled={!!editingPlatform}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: DARK_COLORS.text.primary,
                      '& fieldset': {
                        borderColor: DARK_COLORS.border,
                      },
                      '&:hover fieldset': {
                        borderColor: DARK_COLORS.primary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: DARK_COLORS.primary,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: DARK_COLORS.text.secondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: DARK_COLORS.primary,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="플랫폼명"
                  value={platformForm.name}
                  onChange={(e) =>
                    setPlatformForm({ ...platformForm, name: e.target.value })
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: DARK_COLORS.text.primary,
                      '& fieldset': {
                        borderColor: DARK_COLORS.border,
                      },
                      '&:hover fieldset': {
                        borderColor: DARK_COLORS.primary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: DARK_COLORS.primary,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: DARK_COLORS.text.secondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: DARK_COLORS.primary,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="방송 URL"
                  value={platformForm.url}
                  onChange={(e) =>
                    setPlatformForm({ ...platformForm, url: e.target.value })
                  }
                  placeholder="https://example.com/live"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: DARK_COLORS.text.primary,
                      '& fieldset': {
                        borderColor: DARK_COLORS.border,
                      },
                      '&:hover fieldset': {
                        borderColor: DARK_COLORS.primary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: DARK_COLORS.primary,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: DARK_COLORS.text.secondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: DARK_COLORS.primary,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={platformForm.isActive}
                      onChange={(e) =>
                        setPlatformForm({
                          ...platformForm,
                          isActive: e.target.checked,
                        })
                      }
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: DARK_COLORS.primary,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          bgcolor: DARK_COLORS.primary,
                        },
                      }}
                    />
                  }
                  label="활성화"
                  sx={{
                    color: DARK_COLORS.text.primary,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ borderTop: `1px solid ${DARK_COLORS.border}`, p: 2 }}>
            <Button
              onClick={() => setPlatformDialogOpen(false)}
              sx={{
                color: DARK_COLORS.text.secondary,
                '&:hover': {
                  bgcolor: alpha(DARK_COLORS.text.disabled, 0.1),
                },
              }}
            >
              취소
            </Button>
            <Button
              onClick={handlePlatformSave}
              variant="contained"
              sx={{
                bgcolor: DARK_COLORS.primary,
                color: DARK_COLORS.text.primary,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: alpha(DARK_COLORS.primary, 0.8),
                },
              }}
            >
              저장
            </Button>
          </DialogActions>
        </Dialog>

        {/* 브랜드 추가/수정 다이얼로그 */}
        <Dialog
          open={brandDialogOpen}
          onClose={() => setBrandDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: DARK_COLORS.cardBg,
              border: `1px solid ${DARK_COLORS.border}`,
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle
            sx={{
              color: DARK_COLORS.text.primary,
              fontWeight: 700,
              borderBottom: `1px solid ${DARK_COLORS.border}`,
            }}
          >
            {editingBrand ? '브랜드 수정' : '브랜드 추가'}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="브랜드 코드"
                  value={brandForm.code}
                  onChange={(e) =>
                    setBrandForm({ ...brandForm, code: e.target.value.toUpperCase() })
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: DARK_COLORS.text.primary,
                      '& fieldset': {
                        borderColor: DARK_COLORS.border,
                      },
                      '&:hover fieldset': {
                        borderColor: DARK_COLORS.primary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: DARK_COLORS.primary,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: DARK_COLORS.text.secondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: DARK_COLORS.primary,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="브랜드명"
                  value={brandForm.name}
                  onChange={(e) =>
                    setBrandForm({ ...brandForm, name: e.target.value })
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: DARK_COLORS.text.primary,
                      '& fieldset': {
                        borderColor: DARK_COLORS.border,
                      },
                      '&:hover fieldset': {
                        borderColor: DARK_COLORS.primary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: DARK_COLORS.primary,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: DARK_COLORS.text.secondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: DARK_COLORS.primary,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ borderTop: `1px solid ${DARK_COLORS.border}`, p: 2 }}>
            <Button
              onClick={() => setBrandDialogOpen(false)}
              sx={{
                color: DARK_COLORS.text.secondary,
                '&:hover': {
                  bgcolor: alpha(DARK_COLORS.text.disabled, 0.1),
                },
              }}
            >
              취소
            </Button>
            <Button
              onClick={handleBrandSave}
              variant="contained"
              sx={{
                bgcolor: DARK_COLORS.secondary,
                color: DARK_COLORS.text.primary,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: alpha(DARK_COLORS.secondary, 0.8),
                },
              }}
            >
              저장
            </Button>
          </DialogActions>
        </Dialog>

        {/* 스낵바 알림 */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{
              bgcolor: DARK_COLORS.cardBg,
              color: DARK_COLORS.text.primary,
              border: `1px solid ${DARK_COLORS.border}`,
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default AdminPanel;

