/**
 * 메인 App 컴포넌트
 * 라우팅 및 전역 레이아웃 설정
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';

import Dashboard from './pages/Dashboard';
import SearchEvents from './pages/SearchEvents';
import LiveBroadcastDetail from './pages/LiveBroadcastDetail';
import AdminPanel from './pages/AdminPanel';

// Material-UI 테마 설정 - 다우오피스 스타일 참고
const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2', // 밝고 신뢰감 있는 블루
      light: '#6BA5E7',
      dark: '#357ABD',
    },
    secondary: {
      main: '#5B6EE1', // 포인트 컬러
      light: '#7B8AE8',
      dark: '#4355C9',
    },
    background: {
      default: '#F8F9FC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#5A6C7D',
    },
  },
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Apple SD Gothic Neo"',
      '"Noto Sans KR"',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0,0,0,0.04)',
    '0 4px 12px rgba(0,0,0,0.06)',
    '0 6px 16px rgba(0,0,0,0.08)',
    '0 8px 20px rgba(0,0,0,0.10)',
    '0 12px 28px rgba(0,0,0,0.12)',
    '0 16px 32px rgba(0,0,0,0.14)',
    ...Array(18).fill('0 20px 40px rgba(0,0,0,0.16)'),
  ],
});

// 네비게이션 바 컴포넌트 - 다크 그레이 디자인
const NavigationBar = () => {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 0, 
            mr: 6,
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '-0.02em',
          }}
        >
          온라인 캠페인, 프로모션 조회
        </Typography>
        
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<DashboardIcon />}
            href="/"
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-1px)',
                transition: 'all 0.2s ease',
              },
            }}
          >
            대시보드
          </Button>
          <Button
            color="inherit"
            startIcon={<SearchIcon />}
            href="/search"
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-1px)',
                transition: 'all 0.2s ease',
              },
            }}
          >
            Live 방송 조회
          </Button>
          <Button
            color="inherit"
            startIcon={<AdminPanelSettingsIcon />}
            href="/admin"
            sx={{
              px: 2.5,
              py: 1,
              borderRadius: 2,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-1px)',
                transition: 'all 0.2s ease',
              },
            }}
          >
            관리자 기능
          </Button>
        </Box>
        
        <Box 
          display="flex" 
          alignItems="center" 
          gap={1}
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            조회 시스템
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// 메인 App 컴포넌트
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavigationBar />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              bgcolor: '#F8F9FC', 
              py: 4,
              minHeight: 'calc(100vh - 200px)',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/search" element={<SearchEvents />} />
              <Route path="/live/:liveId" element={<LiveBroadcastDetail />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          
          {/* 푸터 - 현대적 디자인 */}
          <Box
            component="footer"
            sx={{
              py: 4,
              px: 2,
              mt: 'auto',
              background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Container maxWidth="xl">
              <Typography 
                variant="body2" 
                align="center"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                }}
              >
                © 2024 온라인 캠페인, 프로모션 조회 시스템. All rights reserved.
              </Typography>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;


