/**
 * 대시보드 페이지
 * 플랫폼별, 브랜드별 라이브 방송 현황 표시 (Dark Modern Theme)
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Stack,
  Divider,
  alpha,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from '@mui/material';
import {
  LiveTv as LiveTvIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Storefront as StorefrontIcon,
  BusinessCenter as BusinessCenterIcon,
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPlatforms } from '../utils/platformUtils';

// API 기본 URL (환경변수 또는 기본값)
// 환경변수에 /api가 포함되어 있지 않도록 주의 (끝에 /api가 있으면 제거)
const getApiBaseUrl = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  // 끝에 /api가 있으면 제거
  return baseUrl.replace(/\/api\/?$/, '');
};
const API_BASE_URL = getApiBaseUrl();

// 글래스모피즘 색상 팔레트
const GLASS_COLORS = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // 그라데이션 배경
  cardBg: 'rgba(255, 255, 255, 0.1)', // 반투명 흰색
  cardHoverBg: 'rgba(255, 255, 255, 0.15)', // 호버 시 더 밝게
  primary: '#667eea',
  secondary: '#f093fb',
  success: '#4ade80',
  warning: '#fbbf24',
  info: '#60a5fa',
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.8)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  border: 'rgba(255, 255, 255, 0.18)',
  chart: ['#667eea', '#f093fb', '#4ade80', '#fbbf24', '#60a5fa', '#a78bfa', '#2dd4bf', '#fb923c', '#22d3ee', '#c084fc']
};

// 글래스모피즘 스타일
const glassStyle = {
  background: GLASS_COLORS.cardBg,
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: `1px solid ${GLASS_COLORS.border}`,
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 중복 요청 방지용
  
  // 모달 상태 관리
  const [platformModalOpen, setPlatformModalOpen] = useState(false);
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  
  // 데이터 로드 및 분석
  useEffect(() => {
    // 컴포넌트 마운트 시 한 번만 실행 (React StrictMode 대응)
    let _v_mounted = true;
    
    const _v_loadData = async () => {
      if (!isLoading) {
        await loadDashboardData();
      }
    };
    
    _v_loadData();
    
    // 1시간마다 데이터 갱신 (스케줄러와 동기화)
    const interval = setInterval(() => {
      if (_v_mounted && !isLoading) {
        _v_loadData();
      }
    }, 60 * 60 * 1000); // 1시간 = 60분 * 60초 * 1000ms
    
    return () => {
      _v_mounted = false;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열로 마운트 시 한 번만 실행
  
  /**
   * 백엔드 API에서 대시보드 데이터 로드
   */
  const loadDashboardData = async () => {
    // 이미 로딩 중이면 중복 요청 방지
    if (isLoading) {
      console.log('⏸️ 이미 로딩 중이므로 요청을 건너뜁니다.');
      return;
    }
    
    try {
      setIsLoading(true);
      setLoading(true);
      setError(null);
      
      // 백엔드 API 호출
      const apiUrl = `${API_BASE_URL}/api/dashboard`;
      console.log('🔍 대시보드 API 호출:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // CORS 및 네트워크 에러 처리
        mode: 'cors',
      }).catch((fetchError) => {
        // 네트워크 에러 (서버가 실행되지 않음, CORS 문제 등)
        console.error('❌ Fetch 에러:', fetchError);
        throw new Error(`백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요. (${fetchError.message})`);
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API 응답 에러:', response.status, errorText);
        throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ API 응답 성공:', result);
      
      if (!result.success) {
        throw new Error(result.message || '대시보드 데이터 조회 실패');
      }
      
      // API 응답 데이터 변환
      const apiData = result.data;
      
      // 데이터베이스에 데이터가 없으면 빈 데이터 반환
      if (apiData.summary.totalEvents === 0) {
        console.log('⚠️ 데이터베이스에 데이터가 없습니다.');
        // 빈 데이터 구조 반환
        setDashboardData({
          summary: {
            totalEvents: 0,
            activeEvents: 0,
            pendingEvents: 0,
            endedEvents: 0,
            totalPlatforms: 0,
            totalBrands: 0,
            lastUpdated: new Date().toISOString()
          },
          platformStats: [],
          brandStats: [],
          recentActiveEvents: [],
          recentPendingEvents: []
        });
        return;
      }
      
      // 관리자에서 추가한 플랫폼도 통계에 포함 (데이터가 없어도 플랫폼 목록에 표시)
      const adminPlatforms = getPlatforms();
      const platformStatsMap = {};
      
      // API에서 받은 플랫폼 통계를 맵으로 변환
      apiData.platformStats.forEach(platform => {
        platformStatsMap[platform.platform] = platform;
      });
      
      // 관리자 플랫폼 추가
      adminPlatforms.forEach(adminPlatform => {
        const platformName = adminPlatform.name;
        if (!platformStatsMap[platformName]) {
          platformStatsMap[platformName] = { 
            platform: platformName, 
            active: 0, 
            pending: 0, 
            ended: 0, 
            total: 0 
          };
        }
      });
      
      // 마지막 업데이트 시간 포맷팅
      const lastUpdated = apiData.summary.lastUpdated 
        ? new Date(apiData.summary.lastUpdated).toLocaleString('ko-KR', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        : new Date().toLocaleString('ko-KR', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit' 
          });
      
      // 대시보드 데이터 설정
      // totalPlatforms는 관리자 플랫폼을 포함한 실제 플랫폼 수로 재계산
      const actualTotalPlatforms = Object.keys(platformStatsMap).length;
      
      setDashboardData({
        summary: {
          ...apiData.summary,
          totalPlatforms: actualTotalPlatforms, // 관리자 플랫폼 포함하여 재계산
          lastUpdated
        },
        platformStats: Object.values(platformStatsMap),
        brandStats: apiData.brandStats || [],
        recentActiveEvents: apiData.recentActiveEvents || [],
        recentPendingEvents: apiData.recentPendingEvents || []
      });
      
    } catch (err) {
      console.error('대시보드 데이터 로드 오류:', err);
      setError(err.message || '대시보드 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          background: GLASS_COLORS.background,
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2
        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
        <Typography sx={{ color: 'white', fontWeight: 600 }}>실제 수집 데이터를 불러오는 중...</Typography>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          background: GLASS_COLORS.background,
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 4
        }}
      >
        <Alert 
          severity="error" 
          sx={{ 
            ...glassStyle,
            color: 'white',
            maxWidth: 600
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>데이터 로드 실패</Typography>
          <Typography sx={{ color: 'white' }}>{error}</Typography>
          <Typography variant="body2" sx={{ mt: 2, color: GLASS_COLORS.text.secondary }}>
            백엔드 서버가 실행 중인지 확인해주세요.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: GLASS_COLORS.text.secondary }}>
            API 주소: {`${API_BASE_URL}/api/dashboard`}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: GLASS_COLORS.text.secondary }}>
            Health Check: {`${API_BASE_URL}/health`}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: GLASS_COLORS.text.secondary, fontStyle: 'italic' }}>
            백엔드 서버 실행 방법:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ mt: 1, color: 'white', fontFamily: 'monospace', fontSize: '0.875rem', bgcolor: 'rgba(0,0,0,0.2)', p: 1, borderRadius: 1 }}>
{`cd backend
npm start`}
          </Typography>
        </Alert>
      </Box>
    );
  }
  
  if (!dashboardData) {
    return null;
  }
  
  const { summary, platformStats, brandStats, recentActiveEvents, recentPendingEvents } = dashboardData;
  
  // 커스텀 툴팁 - 글래스모피즘
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{
            p: 2,
            ...glassStyle,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {payload.map((entry, index) => (
            <Typography 
              key={index} 
              variant="body2" 
              sx={{ color: 'white', fontWeight: 600 }}
            >
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: GLASS_COLORS.background,
      pb: 6,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(240, 147, 251, 0.3), transparent 50%)',
        pointerEvents: 'none',
      }
    }}>
      <Container maxWidth="xl" sx={{ pt: 4, position: 'relative', zIndex: 1 }}>
        {/* 페이지 헤더 */}
        <Box mb={5}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                  mb: 1,
                }}
              >
                Live Dashboard
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  textShadow: '0 1px 10px rgba(0,0,0,0.2)',
                }}
              >
                플랫폼별, 브랜드별 실시간 라이브 방송 현황
              </Typography>
            </Box>
            {dashboardData?.summary?.lastUpdated && (
              <Box 
                sx={{ 
                  ...glassStyle,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'white',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <ScheduleIcon sx={{ fontSize: '0.875rem' }} />
                  마지막 업데이트: {dashboardData.summary.lastUpdated}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: GLASS_COLORS.text.secondary,
                    fontSize: '0.7rem',
                    display: 'block',
                    mt: 0.5,
                  }}
                >
                  (1시간마다 자동 갱신)
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        
        {/* 통계 카드 */}
        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} sm={6} md={2}>
            <Card 
              sx={{ 
                ...glassStyle,
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  background: GLASS_COLORS.cardHoverBg,
                  boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.5)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <TrendingUpIcon sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 800, 
                      mb: 0.5,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    }}
                  >
                    {summary.totalEvents}
                  </Typography>
                  <Typography variant="body2" sx={{ color: GLASS_COLORS.text.secondary, fontWeight: 500 }}>
                    전체 방송
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
        {/* 통계 카드 - 글래스모피즘 */}
        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card 
              sx={{ 
                ...glassStyle,
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  background: GLASS_COLORS.cardHoverBg,
                  boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.5)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    }}
                  >
                    <TrendingUpIcon sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 800, 
                      mb: 0.5,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    }}
                  >
                    {summary.totalEvents}
                  </Typography>
                  <Typography variant="body2" sx={{ color: GLASS_COLORS.text.secondary, fontWeight: 500 }}>
                    전체 방송
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2.4}>
            <Card 
              onClick={() => navigate('/search?status=ACTIVE')}
              sx={{ 
                ...glassStyle,
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  background: GLASS_COLORS.cardHoverBg,
                  boxShadow: '0 12px 48px 0 rgba(236, 72, 153, 0.4)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: '16px',
                      background: 'rgba(236, 72, 153, 0.3)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      boxShadow: '0 4px 15px rgba(236, 72, 153, 0.2)',
                    }}
                  >
                    <LiveTvIcon sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 0.5, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    {summary.activeEvents}
                  </Typography>
                  <Typography variant="body2" sx={{ color: GLASS_COLORS.text.secondary, fontWeight: 500 }}>
                    진행중
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2.4}>
            <Card 
              onClick={() => navigate('/search?status=PENDING')}
              sx={{ 
                ...glassStyle,
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  background: GLASS_COLORS.cardHoverBg,
                  boxShadow: '0 12px 48px 0 rgba(59, 130, 246, 0.4)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: '16px',
                      background: 'rgba(59, 130, 246, 0.3)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
                    }}
                  >
                    <ScheduleIcon sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 0.5, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    {summary.pendingEvents}
                  </Typography>
                  <Typography variant="body2" sx={{ color: GLASS_COLORS.text.secondary, fontWeight: 500 }}>
                    예정
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2.4}>
            <Card 
              onClick={() => navigate('/search?status=ENDED')}
              sx={{ 
                ...glassStyle,
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  background: GLASS_COLORS.cardHoverBg,
                  boxShadow: '0 12px 48px 0 rgba(74, 222, 128, 0.4)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: '16px',
                      background: 'rgba(74, 222, 128, 0.3)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      boxShadow: '0 4px 15px rgba(74, 222, 128, 0.2)',
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 0.5, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    {summary.endedEvents}
                  </Typography>
                  <Typography variant="body2" sx={{ color: GLASS_COLORS.text.secondary, fontWeight: 500 }}>
                    종료
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2.4}>
            <Card 
              sx={{ 
                ...glassStyle,
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  background: GLASS_COLORS.cardHoverBg,
                  boxShadow: '0 12px 48px 0 rgba(251, 191, 36, 0.4)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      borderRadius: '16px',
                      background: 'rgba(251, 191, 36, 0.3)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      boxShadow: '0 4px 15px rgba(251, 191, 36, 0.2)',
                    }}
                  >
                    <BusinessCenterIcon sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 0.5, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                    {summary.totalBrands}
                  </Typography>
                  <Typography variant="body2" sx={{ color: GLASS_COLORS.text.secondary, fontWeight: 500 }}>
                    브랜드
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* 차트 섹션 - 글래스모피즘 */}
        <Grid container spacing={3} mb={5}>
          {/* 플랫폼별 차트 */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 4, 
                ...glassStyle,
                borderRadius: 3,
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: 'white', 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 28, 
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(255,255,255,0.3)',
                  }} 
                />
                플랫폼별 라이브 방송
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={platformStats} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={DARK_COLORS.secondary} stopOpacity={0.9}/>
                      <stop offset="100%" stopColor={DARK_COLORS.secondary} stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={DARK_COLORS.info} stopOpacity={0.9}/>
                      <stop offset="100%" stopColor={DARK_COLORS.info} stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="colorEnded" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={DARK_COLORS.text.disabled} stopOpacity={0.5}/>
                      <stop offset="100%" stopColor={DARK_COLORS.text.disabled} stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" vertical={false} />
                  <XAxis 
                    dataKey="platform" 
                    tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                  <Legend 
                    wrapperStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    iconType="circle"
                  />
                  <Bar dataKey="active" fill="url(#colorActive)" name="진행중" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="pending" fill="url(#colorPending)" name="예정" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="ended" fill="url(#colorEnded)" name="종료" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          {/* 브랜드별 차트 */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 4, 
                ...glassStyle,
                borderRadius: 3,
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: 'white', 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 28, 
                    background: 'linear-gradient(180deg, rgba(240, 147, 251, 0.8) 0%, rgba(240, 147, 251, 0.4) 100%)',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(240, 147, 251, 0.3)',
                  }} 
                />
                브랜드별 라이브 방송
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={brandStats} margin={{ top: 20, right: 20, left: 0, bottom: 60 }}>
                  <defs>
                    <linearGradient id="colorActive2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={DARK_COLORS.secondary} stopOpacity={0.9}/>
                      <stop offset="100%" stopColor={DARK_COLORS.secondary} stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="colorPending2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={DARK_COLORS.info} stopOpacity={0.9}/>
                      <stop offset="100%" stopColor={DARK_COLORS.info} stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="colorEnded2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={DARK_COLORS.text.disabled} stopOpacity={0.5}/>
                      <stop offset="100%" stopColor={DARK_COLORS.text.disabled} stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" vertical={false} />
                  <XAxis 
                    dataKey="brand" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                    tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                  <Legend 
                    wrapperStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    iconType="circle"
                  />
                  <Bar dataKey="active" fill="url(#colorActive2)" name="진행중" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="pending" fill="url(#colorPending2)" name="예정" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="ended" fill="url(#colorEnded2)" name="종료" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        
        {/* 테이블 섹션 - 글래스모피즘 */}
        <Grid container spacing={3} mb={5}>
          {/* 플랫폼 테이블 */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                ...glassStyle,
                borderRadius: 3,
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 3
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  <StorefrontIcon sx={{ color: 'white' }} />
                  플랫폼 상세 현황
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  onClick={() => setPlatformModalOpen(true)}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.6)',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  전체 보기
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                        플랫폼
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                        진행중
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                        예정
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                        종료
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                        전체
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {platformStats.map((platform, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': { 
                            bgcolor: 'rgba(255, 255, 255, 0.08)',
                          }
                        }}
                        onClick={() => {
                          // 플랫폼 이름을 코드로 변환
                          const platformObj = getPlatforms().find(p => p.name === platform.platform);
                          const platformCode = platformObj ? platformObj.code : platform.platform;
                          navigate(`/search?channel=${platformCode}`);
                        }}
                      >
                        <TableCell sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar 
                              sx={{ 
                                width: 32, 
                                height: 32, 
                                background: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              {platform.platform.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                              {platform.platform}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                          <Chip 
                            label={platform.active} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(236, 72, 153, 0.3)', 
                              color: 'white', 
                              fontWeight: 700,
                              border: `1px solid rgba(236, 72, 153, 0.5)`,
                              backdropFilter: 'blur(10px)',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                          <Chip 
                            label={platform.pending} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(59, 130, 246, 0.3)', 
                              color: 'white', 
                              fontWeight: 700,
                              border: `1px solid rgba(59, 130, 246, 0.5)`,
                              backdropFilter: 'blur(10px)',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                          <Chip 
                            label={platform.ended} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(255, 255, 255, 0.15)', 
                              color: GLASS_COLORS.text.secondary, 
                              fontWeight: 700,
                              border: `1px solid rgba(255, 255, 255, 0.2)`,
                              backdropFilter: 'blur(10px)',
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 700 }}>
                            {platform.total}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          
          {/* 브랜드 테이블 */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                ...glassStyle,
                borderRadius: 3,
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 3
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  <BusinessCenterIcon sx={{ color: 'white' }} />
                  브랜드 상세 현황
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  onClick={() => setBrandModalOpen(true)}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.6)',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  전체 보기
                </Button>
              </Box>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                        브랜드
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                        진행중
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                        예정
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                        종료
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                        전체
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brandStats.map((brand, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': { 
                            bgcolor: 'rgba(255, 255, 255, 0.08)',
                          }
                        }}
                        onClick={() => navigate(`/search?brand=${brand.brand}`)}
                      >
                        <TableCell sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar 
                              sx={{ 
                                width: 32, 
                                height: 32, 
                                background: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              {brand.brand.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                              {brand.brand}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                          <Chip 
                            label={brand.active} 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/search?brand=${brand.brand}&status=ACTIVE`);
                            }}
                            sx={{ 
                              bgcolor: 'rgba(236, 72, 153, 0.3)', 
                              color: 'white', 
                              fontWeight: 700,
                              border: `1px solid rgba(236, 72, 153, 0.5)`,
                              backdropFilter: 'blur(10px)',
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: 'rgba(236, 72, 153, 0.5)',
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                          <Chip 
                            label={brand.pending} 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/search?brand=${brand.brand}&status=PENDING`);
                            }}
                            sx={{ 
                              bgcolor: 'rgba(59, 130, 246, 0.3)', 
                              color: 'white', 
                              fontWeight: 700,
                              border: `1px solid rgba(59, 130, 246, 0.5)`,
                              backdropFilter: 'blur(10px)',
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: 'rgba(59, 130, 246, 0.5)',
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                          <Chip 
                            label={brand.ended} 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/search?brand=${brand.brand}&status=ENDED`);
                            }}
                            sx={{ 
                              bgcolor: 'rgba(255, 255, 255, 0.15)', 
                              color: GLASS_COLORS.text.secondary, 
                              fontWeight: 700,
                              border: `1px solid rgba(255, 255, 255, 0.2)`,
                              backdropFilter: 'blur(10px)',
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.25)',
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 700 }}>
                            {brand.total}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
        
        {/* 최근 방송 현황 - 글래스모피즘 */}
        <Grid container spacing={3}>
          {/* 진행중인 방송 */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                ...glassStyle,
                borderRadius: 3,
              }}
            >
              <Box display="flex" alignItems="center" mb={2.5}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 2,
                    background: 'rgba(236, 72, 153, 0.3)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5,
                    boxShadow: '0 4px 15px rgba(236, 72, 153, 0.2)',
                  }}
                >
                  <LiveTvIcon sx={{ color: 'white' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  진행중인 라이브 방송
                </Typography>
              </Box>
              <Divider sx={{ borderColor: GLASS_COLORS.border, mb: 2.5 }} />
              {recentActiveEvents.length > 0 ? (
                <Stack spacing={2}>
                  {recentActiveEvents.map((event, index) => (
                    <Card 
                      key={index} 
                      sx={{ 
                        p: 2.5, 
                        cursor: 'pointer',
                        background: 'rgba(236, 72, 153, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid rgba(236, 72, 153, 0.3)`,
                        borderRadius: 2,
                        transition: 'all 0.3s',
                        '&:hover': { 
                          boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4)',
                          transform: 'translateY(-4px)',
                          border: `1px solid rgba(236, 72, 153, 0.6)`,
                          background: 'rgba(236, 72, 153, 0.2)',
                        }
                      }}
                      onClick={() => navigate(`/live/${event.event_id}`)}
                    >
                      <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: GLASS_COLORS.text.secondary }}>
                        {event.channel_name} | {event.subtitle}
                      </Typography>
                      <Box mt={1.5} display="flex" gap={1} flexWrap="wrap">
                        <Chip 
                          label="🔴 LIVE" 
                          size="small" 
                          sx={{ 
                            bgcolor: 'rgba(239, 68, 68, 0.3)', 
                            color: 'white',
                            fontWeight: 700,
                            border: `1px solid rgba(239, 68, 68, 0.5)`,
                            backdropFilter: 'blur(10px)',
                          }} 
                        />
                        {event.tags && event.tags.slice(0, 2).map((tag, idx) => (
                          <Chip 
                            key={idx} 
                            label={tag} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(255, 255, 255, 0.15)',
                              color: 'white',
                              border: `1px solid rgba(255, 255, 255, 0.2)`,
                              backdropFilter: 'blur(10px)',
                            }}
                          />
                        ))}
                      </Box>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" sx={{ color: GLASS_COLORS.text.secondary, textAlign: 'center', py: 4 }}>
                  진행중인 방송이 없습니다.
                </Typography>
              )}
            </Paper>
          </Grid>
          
          {/* 예정된 방송 */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                ...glassStyle,
                borderRadius: 3,
              }}
            >
              <Box display="flex" alignItems="center" mb={2.5}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 2,
                    background: 'rgba(59, 130, 246, 0.3)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5,
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)',
                  }}
                >
                  <ScheduleIcon sx={{ color: 'white' }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  예정된 라이브 방송
                </Typography>
              </Box>
              <Divider sx={{ borderColor: GLASS_COLORS.border, mb: 2.5 }} />
              {recentPendingEvents.length > 0 ? (
                <Stack spacing={2}>
                  {recentPendingEvents.map((event, index) => (
                    <Card 
                      key={index} 
                      sx={{ 
                        p: 2.5, 
                        cursor: 'pointer',
                        background: 'rgba(59, 130, 246, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid rgba(59, 130, 246, 0.3)`,
                        borderRadius: 2,
                        transition: 'all 0.3s',
                        '&:hover': { 
                          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
                          transform: 'translateY(-4px)',
                          border: `1px solid rgba(59, 130, 246, 0.6)`,
                          background: 'rgba(59, 130, 246, 0.2)',
                        }
                      }}
                      onClick={() => navigate(`/live/${event.event_id}`)}
                    >
                      <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: GLASS_COLORS.text.secondary }}>
                        {event.channel_name} | {event.start_date}
                      </Typography>
                      <Box mt={1.5} display="flex" gap={1} flexWrap="wrap">
                        <Chip 
                          label="📅 예정" 
                          size="small" 
                          sx={{ 
                            bgcolor: 'rgba(59, 130, 246, 0.3)', 
                            color: 'white',
                            fontWeight: 700,
                            border: `1px solid rgba(59, 130, 246, 0.5)`,
                            backdropFilter: 'blur(10px)',
                          }} 
                        />
                        {event.tags && event.tags.slice(0, 2).map((tag, idx) => (
                          <Chip 
                            key={idx} 
                            label={tag} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(255, 255, 255, 0.15)',
                              color: 'white',
                              border: `1px solid rgba(255, 255, 255, 0.2)`,
                              backdropFilter: 'blur(10px)',
                            }}
                          />
                        ))}
                      </Box>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" sx={{ color: GLASS_COLORS.text.secondary, textAlign: 'center', py: 4 }}>
                  예정된 방송이 없습니다.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* 플랫폼 전체 보기 모달 - 글래스모피즘 */}
      <Dialog
        open={platformModalOpen}
        onClose={() => setPlatformModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            ...glassStyle,
            backgroundImage: 'none',
          }
        }}
      >
        <DialogTitle
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            borderBottom: `1px solid ${GLASS_COLORS.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <StorefrontIcon sx={{ color: 'white' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              전체 플랫폼 목록
            </Typography>
          </Box>
          <IconButton
            onClick={() => setPlatformModalOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                    플랫폼
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                    진행중
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                    예정
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                    종료
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                    전체
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {platformStats.map((platform, index) => (
                  <TableRow 
                    key={index}
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                      }
                    }}
                    onClick={() => {
                      const platformObj = getPlatforms().find(p => p.name === platform.platform);
                      const platformCode = platformObj ? platformObj.code : platform.platform;
                      navigate(`/search?channel=${platformCode}`);
                      setPlatformModalOpen(false);
                    }}
                  >
                    <TableCell sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 700,
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          {platform.platform.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                            {platform.platform}
                          </Typography>
                          <Typography variant="caption" sx={{ color: GLASS_COLORS.text.secondary }}>
                            총 {platform.total}개 방송
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                      <Chip 
                        label={platform.active} 
                        size="medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          const platformObj = getPlatforms().find(p => p.name === platform.platform);
                          const platformCode = platformObj ? platformObj.code : platform.platform;
                          navigate(`/search?channel=${platformCode}&status=ACTIVE`);
                          setPlatformModalOpen(false);
                        }}
                        sx={{ 
                          bgcolor: 'rgba(236, 72, 153, 0.3)', 
                          color: 'white', 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid rgba(236, 72, 153, 0.5)`,
                          backdropFilter: 'blur(10px)',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(236, 72, 153, 0.5)',
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                      <Chip 
                        label={platform.pending} 
                        size="medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          const platformObj = getPlatforms().find(p => p.name === platform.platform);
                          const platformCode = platformObj ? platformObj.code : platform.platform;
                          navigate(`/search?channel=${platformCode}&status=PENDING`);
                          setPlatformModalOpen(false);
                        }}
                        sx={{ 
                          bgcolor: 'rgba(59, 130, 246, 0.3)', 
                          color: 'white', 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid rgba(59, 130, 246, 0.5)`,
                          backdropFilter: 'blur(10px)',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(59, 130, 246, 0.5)',
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                      <Chip 
                        label={platform.ended} 
                        size="medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          const platformObj = getPlatforms().find(p => p.name === platform.platform);
                          const platformCode = platformObj ? platformObj.code : platform.platform;
                          navigate(`/search?channel=${platformCode}&status=ENDED`);
                          setPlatformModalOpen(false);
                        }}
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.15)', 
                          color: GLASS_COLORS.text.secondary, 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid rgba(255, 255, 255, 0.2)`,
                          backdropFilter: 'blur(10px)',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.25)',
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        {platform.total}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      
      {/* 브랜드 전체 보기 모달 - 글래스모피즘 */}
      <Dialog
        open={brandModalOpen}
        onClose={() => setBrandModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            ...glassStyle,
            backgroundImage: 'none',
          }
        }}
      >
        <DialogTitle
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            borderBottom: `1px solid ${GLASS_COLORS.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <BusinessCenterIcon sx={{ color: 'white' }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              전체 브랜드 목록
            </Typography>
          </Box>
          <IconButton
            onClick={() => setBrandModalOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                    브랜드
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                    진행중
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                    예정
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                    종료
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', color: 'white', fontWeight: 600, borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                    전체
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brandStats.map((brand, index) => (
                  <TableRow 
                    key={index}
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': { 
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                      }
                    }}
                    onClick={() => {
                      navigate(`/search?brand=${brand.brand}`);
                      setBrandModalOpen(false);
                    }}
                  >
                    <TableCell sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 700,
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          {brand.brand.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                            {brand.brand}
                          </Typography>
                          <Typography variant="caption" sx={{ color: GLASS_COLORS.text.secondary }}>
                            총 {brand.total}개 방송
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                      <Chip 
                        label={brand.active} 
                        size="medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/search?brand=${brand.brand}&status=ACTIVE`);
                          setBrandModalOpen(false);
                        }}
                        sx={{ 
                          bgcolor: 'rgba(236, 72, 153, 0.3)', 
                          color: 'white', 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid rgba(236, 72, 153, 0.5)`,
                          backdropFilter: 'blur(10px)',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(236, 72, 153, 0.5)',
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                      <Chip 
                        label={brand.pending} 
                        size="medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/search?brand=${brand.brand}&status=PENDING`);
                          setBrandModalOpen(false);
                        }}
                        sx={{ 
                          bgcolor: 'rgba(59, 130, 246, 0.3)', 
                          color: 'white', 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid rgba(59, 130, 246, 0.5)`,
                          backdropFilter: 'blur(10px)',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(59, 130, 246, 0.5)',
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                      <Chip 
                        label={brand.ended} 
                        size="medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/search?brand=${brand.brand}&status=ENDED`);
                          setBrandModalOpen(false);
                        }}
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.15)', 
                          color: GLASS_COLORS.text.secondary, 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid rgba(255, 255, 255, 0.2)`,
                          backdropFilter: 'blur(10px)',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.25)',
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${GLASS_COLORS.border}` }}>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        {brand.total}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
