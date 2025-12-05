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

// 다크 테마 색상 팔레트
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
  chart: ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#14B8A6', '#F97316', '#06B6D4', '#A855F7']
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
          bgcolor: DARK_COLORS.background, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2
        }}
      >
        <CircularProgress sx={{ color: DARK_COLORS.primary }} />
        <Typography sx={{ color: DARK_COLORS.text.primary }}>실제 수집 데이터를 불러오는 중...</Typography>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          bgcolor: DARK_COLORS.background, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 4
        }}
      >
        <Alert 
          severity="error" 
          sx={{ 
            bgcolor: DARK_COLORS.cardBg,
            color: DARK_COLORS.text.primary,
            maxWidth: 600
          }}
        >
          <Typography variant="h6" gutterBottom>데이터 로드 실패</Typography>
          <Typography>{error}</Typography>
          <Typography variant="body2" sx={{ mt: 2, color: DARK_COLORS.text.secondary }}>
            백엔드 서버가 실행 중인지 확인해주세요.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: DARK_COLORS.text.secondary }}>
            API 주소: {`${API_BASE_URL}/api/dashboard`}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: DARK_COLORS.text.secondary }}>
            Health Check: {`${API_BASE_URL}/health`}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: DARK_COLORS.text.secondary, fontStyle: 'italic' }}>
            백엔드 서버 실행 방법:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ mt: 1, color: DARK_COLORS.text.secondary, fontFamily: 'monospace', fontSize: '0.875rem', bgcolor: alpha(DARK_COLORS.cardBg, 0.5), p: 1, borderRadius: 1 }}>
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
  
  // 커스텀 툴팁
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{
            p: 2,
            bgcolor: alpha(DARK_COLORS.cardBg, 0.95),
            border: `1px solid ${DARK_COLORS.border}`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
          }}
        >
          {payload.map((entry, index) => (
            <Typography 
              key={index} 
              variant="body2" 
              sx={{ color: entry.color, fontWeight: 600 }}
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
    <Box sx={{ minHeight: '100vh', bgcolor: DARK_COLORS.background, pb: 6 }}>
      <Container maxWidth="xl" sx={{ pt: 4 }}>
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
                  color: DARK_COLORS.text.primary,
                  letterSpacing: '-0.02em',
                  background: `linear-gradient(135deg, ${DARK_COLORS.primary} 0%, ${DARK_COLORS.secondary} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                Live Dashboard
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: DARK_COLORS.text.secondary,
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                플랫폼별, 브랜드별 실시간 라이브 방송 현황
              </Typography>
            </Box>
            {dashboardData?.summary?.lastUpdated && (
              <Box 
                sx={{ 
                  bgcolor: alpha(DARK_COLORS.cardBg, 0.6),
                  border: `1px solid ${DARK_COLORS.border}`,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: DARK_COLORS.text.secondary,
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
                    color: DARK_COLORS.text.disabled,
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
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 48px ${alpha(DARK_COLORS.primary, 0.3)}`,
                  border: `1px solid ${alpha(DARK_COLORS.primary, 0.5)}`,
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
                      background: `linear-gradient(135deg, ${alpha(DARK_COLORS.primary, 0.2)} 0%, ${alpha(DARK_COLORS.primary, 0.05)} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <TrendingUpIcon sx={{ fontSize: 28, color: DARK_COLORS.primary }} />
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      color: DARK_COLORS.text.primary, 
                      fontWeight: 800, 
                      mb: 0.5,
                      fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                  >
                    {summary.totalEvents}
                  </Typography>
                  <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, fontWeight: 500 }}>
                    전체 방송
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Card 
              onClick={() => navigate('/search?status=ACTIVE')}
              sx={{ 
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 48px ${alpha(DARK_COLORS.secondary, 0.3)}`,
                  border: `1px solid ${alpha(DARK_COLORS.secondary, 0.5)}`,
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
                      background: `linear-gradient(135deg, ${alpha(DARK_COLORS.secondary, 0.2)} 0%, ${alpha(DARK_COLORS.secondary, 0.05)} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <LiveTvIcon sx={{ fontSize: 28, color: DARK_COLORS.secondary }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: DARK_COLORS.text.primary, fontWeight: 800, mb: 0.5 }}>
                    {summary.activeEvents}
                  </Typography>
                  <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, fontWeight: 500 }}>
                    진행중
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Card 
              onClick={() => navigate('/search?status=PENDING')}
              sx={{ 
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 48px ${alpha(DARK_COLORS.info, 0.3)}`,
                  border: `1px solid ${alpha(DARK_COLORS.info, 0.5)}`,
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
                      background: `linear-gradient(135deg, ${alpha(DARK_COLORS.info, 0.2)} 0%, ${alpha(DARK_COLORS.info, 0.05)} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <ScheduleIcon sx={{ fontSize: 28, color: DARK_COLORS.info }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: DARK_COLORS.text.primary, fontWeight: 800, mb: 0.5 }}>
                    {summary.pendingEvents}
                  </Typography>
                  <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, fontWeight: 500 }}>
                    예정
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Card 
              onClick={() => navigate('/search?status=ENDED')}
              sx={{ 
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 48px ${alpha(DARK_COLORS.success, 0.3)}`,
                  border: `1px solid ${alpha(DARK_COLORS.success, 0.5)}`,
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
                      background: `linear-gradient(135deg, ${alpha(DARK_COLORS.success, 0.2)} 0%, ${alpha(DARK_COLORS.success, 0.05)} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 28, color: DARK_COLORS.success }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: DARK_COLORS.text.primary, fontWeight: 800, mb: 0.5 }}>
                    {summary.endedEvents}
                  </Typography>
                  <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, fontWeight: 500 }}>
                    종료
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Card 
              sx={{ 
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 48px ${alpha(DARK_COLORS.warning, 0.3)}`,
                  border: `1px solid ${alpha(DARK_COLORS.warning, 0.5)}`,
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
                      background: `linear-gradient(135deg, ${alpha(DARK_COLORS.warning, 0.2)} 0%, ${alpha(DARK_COLORS.warning, 0.05)} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <StorefrontIcon sx={{ fontSize: 28, color: DARK_COLORS.warning }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: DARK_COLORS.text.primary, fontWeight: 800, mb: 0.5 }}>
                    {summary.totalPlatforms}
                  </Typography>
                  <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, fontWeight: 500 }}>
                    플랫폼
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Card 
              sx={{ 
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 48px ${alpha('#8B5CF6', 0.3)}`,
                  border: `1px solid ${alpha('#8B5CF6', 0.5)}`,
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
                      background: `linear-gradient(135deg, ${alpha('#8B5CF6', 0.2)} 0%, ${alpha('#8B5CF6', 0.05)} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <BusinessCenterIcon sx={{ fontSize: 28, color: '#8B5CF6' }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: DARK_COLORS.text.primary, fontWeight: 800, mb: 0.5 }}>
                    {summary.totalBrands}
                  </Typography>
                  <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, fontWeight: 500 }}>
                    브랜드
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* 차트 섹션 */}
        <Grid container spacing={3} mb={5}>
          {/* 플랫폼별 차트 */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 4, 
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: DARK_COLORS.text.primary, 
                  mb: 3,
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
                    borderRadius: 2 
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
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(DARK_COLORS.border, 0.3)} vertical={false} />
                  <XAxis 
                    dataKey="platform" 
                    tick={{ fill: DARK_COLORS.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: DARK_COLORS.border }}
                    tickLine={{ stroke: DARK_COLORS.border }}
                  />
                  <YAxis 
                    tick={{ fill: DARK_COLORS.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: DARK_COLORS.border }}
                    tickLine={{ stroke: DARK_COLORS.border }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: alpha(DARK_COLORS.primary, 0.1) }} />
                  <Legend 
                    wrapperStyle={{ color: DARK_COLORS.text.secondary }}
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
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: DARK_COLORS.text.primary, 
                  mb: 3,
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
                    borderRadius: 2 
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
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(DARK_COLORS.border, 0.3)} vertical={false} />
                  <XAxis 
                    dataKey="brand" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fill: DARK_COLORS.text.secondary, fontSize: 11 }}
                    axisLine={{ stroke: DARK_COLORS.border }}
                    tickLine={{ stroke: DARK_COLORS.border }}
                  />
                  <YAxis 
                    tick={{ fill: DARK_COLORS.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: DARK_COLORS.border }}
                    tickLine={{ stroke: DARK_COLORS.border }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: alpha(DARK_COLORS.secondary, 0.1) }} />
                  <Legend 
                    wrapperStyle={{ color: DARK_COLORS.text.secondary }}
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
        
        {/* 테이블 섹션 */}
        <Grid container spacing={3} mb={5}>
          {/* 플랫폼 테이블 */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
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
                    color: DARK_COLORS.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <StorefrontIcon sx={{ color: DARK_COLORS.primary }} />
                  플랫폼 상세 현황
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  onClick={() => setPlatformModalOpen(true)}
                  sx={{
                    color: DARK_COLORS.primary,
                    borderColor: DARK_COLORS.primary,
                    '&:hover': {
                      borderColor: DARK_COLORS.primary,
                      bgcolor: alpha(DARK_COLORS.primary, 0.1),
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
                      <TableCell sx={{ color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                        플랫폼
                      </TableCell>
                      <TableCell align="center" sx={{ color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                        진행중
                      </TableCell>
                      <TableCell align="center" sx={{ color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                        예정
                      </TableCell>
                      <TableCell align="center" sx={{ color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                        종료
                      </TableCell>
                      <TableCell align="center" sx={{ color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
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
                            bgcolor: alpha(DARK_COLORS.primary, 0.08),
                          }
                        }}
                        onClick={() => {
                          // 플랫폼 이름을 코드로 변환
                          const platformObj = getPlatforms().find(p => p.name === platform.platform);
                          const platformCode = platformObj ? platformObj.code : platform.platform;
                          navigate(`/search?channel=${platformCode}`);
                        }}
                      >
                        <TableCell sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar 
                              sx={{ 
                                width: 32, 
                                height: 32, 
                                bgcolor: alpha(DARK_COLORS.chart[index % DARK_COLORS.chart.length], 0.2),
                                color: DARK_COLORS.chart[index % DARK_COLORS.chart.length],
                                fontSize: '0.875rem',
                                fontWeight: 700,
                              }}
                            >
                              {platform.platform.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary, fontWeight: 600 }}>
                              {platform.platform}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                          <Chip 
                            label={platform.active} 
                            size="small" 
                            sx={{ 
                              bgcolor: alpha(DARK_COLORS.secondary, 0.15), 
                              color: DARK_COLORS.secondary, 
                              fontWeight: 700,
                              border: `1px solid ${alpha(DARK_COLORS.secondary, 0.3)}`,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                          <Chip 
                            label={platform.pending} 
                            size="small" 
                            sx={{ 
                              bgcolor: alpha(DARK_COLORS.info, 0.15), 
                              color: DARK_COLORS.info, 
                              fontWeight: 700,
                              border: `1px solid ${alpha(DARK_COLORS.info, 0.3)}`,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                          <Chip 
                            label={platform.ended} 
                            size="small" 
                            sx={{ 
                              bgcolor: alpha(DARK_COLORS.text.disabled, 0.15), 
                              color: DARK_COLORS.text.disabled, 
                              fontWeight: 700,
                              border: `1px solid ${alpha(DARK_COLORS.text.disabled, 0.3)}`,
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                          <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary, fontWeight: 700 }}>
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
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
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
                    color: DARK_COLORS.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <BusinessCenterIcon sx={{ color: DARK_COLORS.secondary }} />
                  브랜드 상세 현황
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  onClick={() => setBrandModalOpen(true)}
                  sx={{
                    color: DARK_COLORS.secondary,
                    borderColor: DARK_COLORS.secondary,
                    '&:hover': {
                      borderColor: DARK_COLORS.secondary,
                      bgcolor: alpha(DARK_COLORS.secondary, 0.1),
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
                      <TableCell sx={{ bgcolor: DARK_COLORS.cardBg, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                        브랜드
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: DARK_COLORS.cardBg, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                        진행중
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: DARK_COLORS.cardBg, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                        예정
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: DARK_COLORS.cardBg, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                        종료
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: DARK_COLORS.cardBg, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
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
                            bgcolor: alpha(DARK_COLORS.secondary, 0.08),
                          }
                        }}
                        onClick={() => navigate(`/search?brand=${brand.brand}`)}
                      >
                        <TableCell sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar 
                              sx={{ 
                                width: 32, 
                                height: 32, 
                                bgcolor: alpha(DARK_COLORS.chart[index % DARK_COLORS.chart.length], 0.2),
                                color: DARK_COLORS.chart[index % DARK_COLORS.chart.length],
                                fontSize: '0.875rem',
                                fontWeight: 700,
                              }}
                            >
                              {brand.brand.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary, fontWeight: 600 }}>
                              {brand.brand}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                          <Chip 
                            label={brand.active} 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation(); // 행 클릭 이벤트 방지
                              navigate(`/search?brand=${brand.brand}&status=ACTIVE`);
                            }}
                            sx={{ 
                              bgcolor: alpha(DARK_COLORS.secondary, 0.15), 
                              color: DARK_COLORS.secondary, 
                              fontWeight: 700,
                              border: `1px solid ${alpha(DARK_COLORS.secondary, 0.3)}`,
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: alpha(DARK_COLORS.secondary, 0.25),
                                border: `1px solid ${alpha(DARK_COLORS.secondary, 0.5)}`,
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                          <Chip 
                            label={brand.pending} 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation(); // 행 클릭 이벤트 방지
                              navigate(`/search?brand=${brand.brand}&status=PENDING`);
                            }}
                            sx={{ 
                              bgcolor: alpha(DARK_COLORS.info, 0.15), 
                              color: DARK_COLORS.info, 
                              fontWeight: 700,
                              border: `1px solid ${alpha(DARK_COLORS.info, 0.3)}`,
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: alpha(DARK_COLORS.info, 0.25),
                                border: `1px solid ${alpha(DARK_COLORS.info, 0.5)}`,
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                          <Chip 
                            label={brand.ended} 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation(); // 행 클릭 이벤트 방지
                              navigate(`/search?brand=${brand.brand}&status=ENDED`);
                            }}
                            sx={{ 
                              bgcolor: alpha(DARK_COLORS.text.disabled, 0.15), 
                              color: DARK_COLORS.text.disabled, 
                              fontWeight: 700,
                              border: `1px solid ${alpha(DARK_COLORS.text.disabled, 0.3)}`,
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: alpha(DARK_COLORS.text.disabled, 0.25),
                                border: `1px solid ${alpha(DARK_COLORS.text.disabled, 0.5)}`,
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                          <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary, fontWeight: 700 }}>
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
        
        {/* 최근 방송 현황 */}
        <Grid container spacing={3}>
          {/* 진행중인 방송 */}
          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Box display="flex" alignItems="center" mb={2.5}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${alpha(DARK_COLORS.secondary, 0.2)} 0%, ${alpha(DARK_COLORS.secondary, 0.05)} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5,
                  }}
                >
                  <LiveTvIcon sx={{ color: DARK_COLORS.secondary }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: DARK_COLORS.text.primary }}>
                  진행중인 라이브 방송
                </Typography>
              </Box>
              <Divider sx={{ borderColor: DARK_COLORS.border, mb: 2.5 }} />
              {recentActiveEvents.length > 0 ? (
                <Stack spacing={2}>
                  {recentActiveEvents.map((event, index) => (
                    <Card 
                      key={index} 
                      sx={{ 
                        p: 2.5, 
                        cursor: 'pointer',
                        bgcolor: alpha(DARK_COLORS.secondary, 0.05),
                        border: `1px solid ${alpha(DARK_COLORS.secondary, 0.2)}`,
                        borderRadius: 2,
                        transition: 'all 0.3s',
                        '&:hover': { 
                          boxShadow: `0 8px 24px ${alpha(DARK_COLORS.secondary, 0.3)}`,
                          transform: 'translateY(-4px)',
                          border: `1px solid ${alpha(DARK_COLORS.secondary, 0.5)}`,
                        }
                      }}
                      onClick={() => navigate(`/live/${event.event_id}`)}
                    >
                      <Typography variant="body1" sx={{ color: DARK_COLORS.text.primary, fontWeight: 600, mb: 0.5 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>
                        {event.channel_name} | {event.subtitle}
                      </Typography>
                      <Box mt={1.5} display="flex" gap={1} flexWrap="wrap">
                        <Chip 
                          label="🔴 LIVE" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(DARK_COLORS.secondary, 0.2), 
                            color: DARK_COLORS.secondary,
                            fontWeight: 700,
                            border: `1px solid ${alpha(DARK_COLORS.secondary, 0.4)}`,
                          }} 
                        />
                        {event.tags && event.tags.slice(0, 2).map((tag, idx) => (
                          <Chip 
                            key={idx} 
                            label={tag} 
                            size="small" 
                            sx={{ 
                              bgcolor: alpha(DARK_COLORS.primary, 0.1),
                              color: DARK_COLORS.text.secondary,
                              border: `1px solid ${DARK_COLORS.border}`,
                            }}
                          />
                        ))}
                      </Box>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, textAlign: 'center', py: 4 }}>
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
                bgcolor: DARK_COLORS.cardBg,
                border: `1px solid ${DARK_COLORS.border}`,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Box display="flex" alignItems="center" mb={2.5}>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${alpha(DARK_COLORS.info, 0.2)} 0%, ${alpha(DARK_COLORS.info, 0.05)} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5,
                  }}
                >
                  <ScheduleIcon sx={{ color: DARK_COLORS.info }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: DARK_COLORS.text.primary }}>
                  예정된 라이브 방송
                </Typography>
              </Box>
              <Divider sx={{ borderColor: DARK_COLORS.border, mb: 2.5 }} />
              {recentPendingEvents.length > 0 ? (
                <Stack spacing={2}>
                  {recentPendingEvents.map((event, index) => (
                    <Card 
                      key={index} 
                      sx={{ 
                        p: 2.5, 
                        cursor: 'pointer',
                        bgcolor: alpha(DARK_COLORS.info, 0.05),
                        border: `1px solid ${alpha(DARK_COLORS.info, 0.2)}`,
                        borderRadius: 2,
                        transition: 'all 0.3s',
                        '&:hover': { 
                          boxShadow: `0 8px 24px ${alpha(DARK_COLORS.info, 0.3)}`,
                          transform: 'translateY(-4px)',
                          border: `1px solid ${alpha(DARK_COLORS.info, 0.5)}`,
                        }
                      }}
                      onClick={() => navigate(`/live/${event.event_id}`)}
                    >
                      <Typography variant="body1" sx={{ color: DARK_COLORS.text.primary, fontWeight: 600, mb: 0.5 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>
                        {event.channel_name} | {event.start_date}
                      </Typography>
                      <Box mt={1.5} display="flex" gap={1} flexWrap="wrap">
                        <Chip 
                          label="📅 예정" 
                          size="small" 
                          sx={{ 
                            bgcolor: alpha(DARK_COLORS.info, 0.2), 
                            color: DARK_COLORS.info,
                            fontWeight: 700,
                            border: `1px solid ${alpha(DARK_COLORS.info, 0.4)}`,
                          }} 
                        />
                        {event.tags && event.tags.slice(0, 2).map((tag, idx) => (
                          <Chip 
                            key={idx} 
                            label={tag} 
                            size="small" 
                            sx={{ 
                              bgcolor: alpha(DARK_COLORS.primary, 0.1),
                              color: DARK_COLORS.text.secondary,
                              border: `1px solid ${DARK_COLORS.border}`,
                            }}
                          />
                        ))}
                      </Box>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, textAlign: 'center', py: 4 }}>
                  예정된 방송이 없습니다.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* 플랫폼 전체 보기 모달 */}
      <Dialog
        open={platformModalOpen}
        onClose={() => setPlatformModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: DARK_COLORS.cardBg,
            backgroundImage: 'none',
            border: `1px solid ${DARK_COLORS.border}`,
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: DARK_COLORS.background,
            color: DARK_COLORS.text.primary,
            borderBottom: `1px solid ${DARK_COLORS.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <StorefrontIcon sx={{ color: DARK_COLORS.primary }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              전체 플랫폼 목록
            </Typography>
          </Box>
          <IconButton
            onClick={() => setPlatformModalOpen(false)}
            sx={{ color: DARK_COLORS.text.secondary }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: DARK_COLORS.background, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                    플랫폼
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: DARK_COLORS.background, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                    진행중
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: DARK_COLORS.background, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                    예정
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: DARK_COLORS.background, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                    종료
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: DARK_COLORS.background, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
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
                        bgcolor: alpha(DARK_COLORS.primary, 0.08),
                      }
                    }}
                    onClick={() => {
                      const platformObj = getPlatforms().find(p => p.name === platform.platform);
                      const platformCode = platformObj ? platformObj.code : platform.platform;
                      navigate(`/search?channel=${platformCode}`);
                      setPlatformModalOpen(false);
                    }}
                  >
                    <TableCell sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            bgcolor: alpha(DARK_COLORS.chart[index % DARK_COLORS.chart.length], 0.2),
                            color: DARK_COLORS.chart[index % DARK_COLORS.chart.length],
                            fontSize: '1rem',
                            fontWeight: 700,
                          }}
                        >
                          {platform.platform.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ color: DARK_COLORS.text.primary, fontWeight: 600 }}>
                            {platform.platform}
                          </Typography>
                          <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>
                            총 {platform.total}개 방송
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
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
                          bgcolor: alpha(DARK_COLORS.secondary, 0.15), 
                          color: DARK_COLORS.secondary, 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid ${alpha(DARK_COLORS.secondary, 0.3)}`,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.secondary, 0.25),
                            border: `1px solid ${alpha(DARK_COLORS.secondary, 0.5)}`,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
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
                          bgcolor: alpha(DARK_COLORS.info, 0.15), 
                          color: DARK_COLORS.info, 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid ${alpha(DARK_COLORS.info, 0.3)}`,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.info, 0.25),
                            border: `1px solid ${alpha(DARK_COLORS.info, 0.5)}`,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
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
                          bgcolor: alpha(DARK_COLORS.text.disabled, 0.15), 
                          color: DARK_COLORS.text.disabled, 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid ${alpha(DARK_COLORS.text.disabled, 0.3)}`,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.text.disabled, 0.25),
                            border: `1px solid ${alpha(DARK_COLORS.text.disabled, 0.5)}`,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                      <Typography variant="h6" sx={{ color: DARK_COLORS.text.primary, fontWeight: 700 }}>
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
      
      {/* 브랜드 전체 보기 모달 */}
      <Dialog
        open={brandModalOpen}
        onClose={() => setBrandModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: DARK_COLORS.cardBg,
            backgroundImage: 'none',
            border: `1px solid ${DARK_COLORS.border}`,
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: DARK_COLORS.background,
            color: DARK_COLORS.text.primary,
            borderBottom: `1px solid ${DARK_COLORS.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <BusinessCenterIcon sx={{ color: DARK_COLORS.secondary }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              전체 브랜드 목록
            </Typography>
          </Box>
          <IconButton
            onClick={() => setBrandModalOpen(false)}
            sx={{ color: DARK_COLORS.text.secondary }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: DARK_COLORS.background, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                    브랜드
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: DARK_COLORS.background, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                    진행중
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: DARK_COLORS.background, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                    예정
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: DARK_COLORS.background, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                    종료
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: DARK_COLORS.background, color: DARK_COLORS.text.secondary, fontWeight: 600, borderBottom: `1px solid ${DARK_COLORS.border}` }}>
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
                        bgcolor: alpha(DARK_COLORS.secondary, 0.08),
                      }
                    }}
                    onClick={() => {
                      navigate(`/search?brand=${brand.brand}`);
                      setBrandModalOpen(false);
                    }}
                  >
                    <TableCell sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            bgcolor: alpha(DARK_COLORS.chart[index % DARK_COLORS.chart.length], 0.2),
                            color: DARK_COLORS.chart[index % DARK_COLORS.chart.length],
                            fontSize: '1rem',
                            fontWeight: 700,
                          }}
                        >
                          {brand.brand.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ color: DARK_COLORS.text.primary, fontWeight: 600 }}>
                            {brand.brand}
                          </Typography>
                          <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>
                            총 {brand.total}개 방송
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                      <Chip 
                        label={brand.active} 
                        size="medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/search?brand=${brand.brand}&status=ACTIVE`);
                          setBrandModalOpen(false);
                        }}
                        sx={{ 
                          bgcolor: alpha(DARK_COLORS.secondary, 0.15), 
                          color: DARK_COLORS.secondary, 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid ${alpha(DARK_COLORS.secondary, 0.3)}`,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.secondary, 0.25),
                            border: `1px solid ${alpha(DARK_COLORS.secondary, 0.5)}`,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                      <Chip 
                        label={brand.pending} 
                        size="medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/search?brand=${brand.brand}&status=PENDING`);
                          setBrandModalOpen(false);
                        }}
                        sx={{ 
                          bgcolor: alpha(DARK_COLORS.info, 0.15), 
                          color: DARK_COLORS.info, 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid ${alpha(DARK_COLORS.info, 0.3)}`,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.info, 0.25),
                            border: `1px solid ${alpha(DARK_COLORS.info, 0.5)}`,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                      <Chip 
                        label={brand.ended} 
                        size="medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/search?brand=${brand.brand}&status=ENDED`);
                          setBrandModalOpen(false);
                        }}
                        sx={{ 
                          bgcolor: alpha(DARK_COLORS.text.disabled, 0.15), 
                          color: DARK_COLORS.text.disabled, 
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          border: `1px solid ${alpha(DARK_COLORS.text.disabled, 0.3)}`,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.text.disabled, 0.25),
                            border: `1px solid ${alpha(DARK_COLORS.text.disabled, 0.5)}`,
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
                      <Typography variant="h6" sx={{ color: DARK_COLORS.text.primary, fontWeight: 700 }}>
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
