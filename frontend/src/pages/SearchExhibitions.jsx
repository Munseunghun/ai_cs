/**
 * 입점몰 이벤트, 전시 조회 페이지
 * 입점몰 이벤트 및 전시 검색, 필터링, 상세 보기 기능 (Dark Modern Theme)
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Pagination,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ContentCopy as ContentCopyIcon,
  OpenInNew as OpenInNewIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import moment from 'moment';
import { searchEvents as searchEventsAPI, getEventById, generateConsultationText, addFavorite } from '../api/services';
import { getPlatforms, getPlatformFilterOptions, normalizePlatformCode } from '../utils/platformUtils';

// API 기본 URL (환경변수 또는 기본값)
const getApiBaseUrl = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  return baseUrl.replace(/\/api\/?$/, '');
};
const API_BASE_URL = getApiBaseUrl();

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
  chart: ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#14B8A6', '#F97316', '#06B6D4', '#A855F7']
};

const SearchExhibitions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // URL 파라미터 읽기
  const urlStatus = searchParams.get('status') || '';
  const urlBrand = searchParams.get('brand') || '';
  const urlChannel = searchParams.get('channel') || '';
  
  // 저장된 상태 복원 (sessionStorage)
  const getSavedState = () => {
    try {
      const saved = sessionStorage.getItem('searchState');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  };
  
  const savedState = getSavedState();
  
  // 상태 관리
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState(savedState?.events || []);
  const [totalPages, setTotalPages] = useState(savedState?.totalPages || 0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [platformOptions, setPlatformOptions] = useState([]);
  
  // 필터 상태 (URL 파라미터가 있으면 우선, 없으면 저장된 상태 또는 기본값)
  const [filters, setFilters] = useState(() => {
    // URL 파라미터가 있으면 우선 사용
    if (urlStatus || urlBrand || urlChannel) {
      return {
        channel: urlChannel || '',
        brand: urlBrand || '',
        status: urlStatus || '',  // URL에서 받은 status 사용
        keyword: '',
        start_date: '',
        end_date: '',
        page: 0,
        page_size: 12,
        sort_by: 'start_date',
        sort_order: 'DESC',
      };
    }
    // 저장된 상태가 있으면 복원
    if (savedState?.filters) {
      return savedState.filters;
    }
    // 기본값
    return {
      channel: '',
      brand: '',
      status: '',
      keyword: '',
      start_date: '',
      end_date: '',
      page: 0,
      page_size: 12,
      sort_by: 'start_date',
      sort_order: 'DESC',
    };
  });
  
  // 검색 상태를 sessionStorage에 저장
  const saveSearchState = (filters, events, totalPages) => {
    try {
      sessionStorage.setItem('searchState', JSON.stringify({
        filters,
        events,
        totalPages,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.error('검색 상태 저장 실패:', e);
    }
  };
  
  // 플랫폼 목록 로드 (네이버 스마트스토어만 표시)
  useEffect(() => {
    // 입점몰 이벤트, 전시 조회에서는 네이버 스마트스토어만 표시
    const options = [
      { value: '', label: '전체' },
      { value: 'NAVER_SHOPPING', label: '네이버스마트스토어' }
    ];
    setPlatformOptions(options);
  }, []);
  
  // URL 파라미터가 변경될 때 필터 상태 업데이트 및 자동 검색 실행
  useEffect(() => {
    if (urlStatus || urlBrand || urlChannel) {
      // URL 파라미터로 필터 상태 업데이트
      setFilters(prevFilters => ({
        ...prevFilters,
        channel: urlChannel || prevFilters.channel,
        brand: urlBrand || prevFilters.brand,
        status: urlStatus || prevFilters.status,
        page: 0, // URL 파라미터로 이동할 때는 첫 페이지로 리셋
      }));
      
      console.log('🔗 URL 파라미터 감지 - 필터 업데이트 및 자동 검색 실행:', { 
        urlStatus, 
        urlBrand, 
        urlChannel 
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlStatus, urlBrand, urlChannel]); // URL 파라미터 변경 시마다 실행

  // 컴포넌트 마운트 시 또는 필터 변경 시 자동 검색 실행
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  
  // 초기 마운트 시 자동 검색 실행
  useEffect(() => {
    if (isInitialMount) {
      const _v_has_url_params = !!(urlStatus || urlBrand || urlChannel);
      const _v_has_saved_state = !!(savedState?.events && savedState.events.length > 0);
      
      // URL 파라미터가 있거나, 저장된 상태가 없으면 자동 검색 실행
      // (저장된 상태가 있으면 상세보기에서 돌아온 경우이므로 그대로 사용)
      if (_v_has_url_params || !_v_has_saved_state) {
        const timer = setTimeout(() => {
          console.log('🔍 초기 마운트 - 자동 검색 실행:', {
            hasUrlParams: _v_has_url_params,
            hasSavedState: _v_has_saved_state,
            filters: filters
          });
          handleSearch();
          setHasSearched(true);
          setIsInitialMount(false);
        }, 100);

        return () => clearTimeout(timer);
      } else {
        // 저장된 상태가 있으면 검색하지 않고 그대로 사용
        setHasSearched(true);
        setIsInitialMount(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 초기 마운트 시 한 번만 실행
  
  // 필터 변경 시 자동 검색 실행 (초기 마운트 이후)
  useEffect(() => {
    // 초기 마운트가 완료된 후에만 필터 변경 시 검색 실행
    if (!isInitialMount && hasSearched) {
      const timer = setTimeout(() => {
        console.log('🔍 필터 변경 - 자동 검색 실행:', {
          filters: filters
        });
        handleSearch();
      }, 300); // debounce: 300ms 대기

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.channel, filters.brand, filters.status, filters.keyword, filters.start_date, filters.end_date]); // 필터 변경 시 검색 실행 (page 제외)

  // 페이지 변경 시에도 검색 실행
  useEffect(() => {
    // 초기 마운트가 완료되고 검색이 한 번 이상 실행된 후에만 페이지 변경 시 재검색
    if (!isInitialMount && hasSearched) {
      const timer = setTimeout(() => {
        console.log('🔍 페이지 변경으로 인한 재검색 실행');
        handleSearch();
      }, 100);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page]);
  
  // 검색 실행 (백엔드 API 호출)
  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 SearchEvents - 백엔드 API 호출');
      console.log('   - 키워드:', filters.keyword || '(없음)');
      console.log('   - 플랫폼:', filters.channel || '(전체)');
      console.log('   - 브랜드:', filters.brand || '(전체)');
      console.log('   - 상태:', filters.status || '(전체)');
      console.log('   - 페이지:', filters.page);
      
      // 백엔드 API 호출
      const apiUrl = `${API_BASE_URL}/api/events/search`;
      const queryParams = new URLSearchParams();
      
      // 입점몰 이벤트, 전시 조회에서는 broadcast_type = 'EXHIBITION'만 조회
      queryParams.append('broadcast_type', 'EXHIBITION');
      
      // 필터 파라미터 추가 (빈 문자열이나 "전체"는 제외)
      if (filters.channel && filters.channel.trim() !== '' && filters.channel !== '전체') {
        queryParams.append('channel', filters.channel);
      }
      if (filters.brand && filters.brand.trim() !== '' && filters.brand !== '전체') {
        queryParams.append('brand', filters.brand);
      }
      if (filters.status && filters.status.trim() !== '' && filters.status !== '전체') {
        // status는 대문자로 정규화하여 전송 (ACTIVE, PENDING, ENDED)
        const _v_status_normalized = filters.status.trim().toUpperCase();
        queryParams.append('status', _v_status_normalized);
      }
      if (filters.keyword && filters.keyword.trim() !== '') {
        queryParams.append('keyword', filters.keyword);
      }
      if (filters.start_date && filters.start_date.trim() !== '') {
        queryParams.append('start_date', filters.start_date);
      }
      if (filters.end_date && filters.end_date.trim() !== '') {
        queryParams.append('end_date', filters.end_date);
      }
      queryParams.append('page', filters.page);
      queryParams.append('page_size', filters.page_size);
      queryParams.append('sort_by', filters.sort_by || 'broadcast_date');
      queryParams.append('sort_order', filters.sort_order || 'DESC');
      
      const fullUrl = `${apiUrl}?${queryParams.toString()}`;
      console.log('📡 API 호출:', fullUrl);
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }).catch((fetchError) => {
        console.error('❌ Fetch 에러:', fetchError);
        throw new Error(`백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요. (${fetchError.message})`);
      });
      
      if (!response.ok) {
        let errorText = '';
        let errorData = null;
        try {
          errorText = await response.text();
          // JSON 형식인지 확인
          try {
            errorData = JSON.parse(errorText);
          } catch {
            // JSON이 아니면 텍스트 그대로 사용
          }
        } catch (parseError) {
          console.error('❌ 에러 응답 파싱 실패:', parseError);
        }
        
        console.error('❌ API 응답 에러:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText,
          errorData: errorData
        });
        
        // 에러 메시지 구성
        const errorMessage = errorData?.message || errorText || `API 요청 실패: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      console.log('✅ API 응답 성공:', {
        success: result.success,
        dataCount: result.data?.length || 0,
        pagination: result.pagination,
        filters: {
          channel: filters.channel,
          brand: filters.brand,
          status: filters.status,
          keyword: filters.keyword
        }
      });
      
      if (!result.success) {
        throw new Error(result.message || '이벤트 검색 실패');
      }
      
      // API 응답 데이터 설정
      const apiEvents = result.data || [];
      const pagination = result.pagination || {
        total: apiEvents.length,
        page: filters.page,
        page_size: filters.page_size,
        total_pages: Math.ceil(apiEvents.length / filters.page_size),
      };
      
      console.log(`✅ 검색 결과: ${apiEvents.length}개 (전체 ${pagination.total}개)`, {
        page: pagination.page,
        pageSize: pagination.page_size,
        totalPages: pagination.total_pages,
        hasData: apiEvents.length > 0
      });
      
      setEvents(apiEvents);
      setTotalPages(pagination.total_pages || 1);
      setError(null);
      
      // 검색 상태 저장 (상세보기 후 돌아올 때 복원용)
      saveSearchState(filters, apiEvents, pagination.total_pages || 1);
      
    } catch (err) {
      console.error('❌ 검색 오류:', err);
      setError(err.message || '검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  // 필터 변경 핸들러
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      page: 0, // 필터 변경 시 첫 페이지로
    }));
  };
  
  // 페이지 변경
  const handlePageChange = (event, value) => {
    setFilters(prev => ({ ...prev, page: value - 1 }));
  };
  
  // 이벤트 상세보기
  const handleEventDetail = async (eventId) => {
    try {
      console.log('🔍 handleEventDetail - eventId:', eventId);
      console.log('🔍 handleEventDetail - eventId 타입:', typeof eventId);
      console.log('🔍 handleEventDetail - eventId 값:', JSON.stringify(eventId));
      
      // eventId 유효성 검사
      if (!eventId || 
          eventId === 'undefined' || 
          eventId === 'null' || 
          eventId === 'unknown' ||
          typeof eventId !== 'string' ||
          eventId.trim() === '' ||
          eventId.startsWith('unknown_') ||
          eventId.startsWith('error_')) {
        console.error('❌ 유효하지 않은 eventId:', {
          eventId: eventId,
          type: typeof eventId,
          trimmed: eventId?.trim()
        });
        showSnackbar('유효하지 않은 이벤트 ID입니다.');
        return;
      }
      
      // eventId 정규화 (공백 제거)
      const _v_normalized_event_id = String(eventId).trim();
      
      // 라이브 상세 페이지로 이동 (모든 이벤트는 live_broadcasts 테이블에서 조회)
      const _v_detail_url = `/live/${encodeURIComponent(_v_normalized_event_id)}`;
      console.log('✅ 라이브 상세 페이지로 이동:', {
        original: eventId,
        normalized: _v_normalized_event_id,
        url: _v_detail_url
      });
      navigate(_v_detail_url);
      
    } catch (err) {
      console.error('❌ handleEventDetail 오류:', {
        error: err,
        message: err.message,
        eventId: eventId
      });
      showSnackbar('이벤트 정보를 불러올 수 없습니다.');
    }
  };
  
  // 상담 문구 생성 및 복사
  const handleGenerateText = async (eventId) => {
    try {
      // eventId 유효성 검사
      if (!eventId || 
          eventId === 'undefined' || 
          eventId === 'null' || 
          eventId === 'unknown' ||
          typeof eventId !== 'string' ||
          eventId.trim() === '' ||
          eventId.startsWith('unknown_') ||
          eventId.startsWith('error_')) {
        console.error('❌ 유효하지 않은 eventId:', {
          eventId: eventId,
          type: typeof eventId
        });
        showSnackbar('유효하지 않은 이벤트 ID입니다.');
        return;
      }
      
      // eventId 정규화 (공백 제거)
      const _v_normalized_event_id = String(eventId).trim();
      
      // 백엔드 API를 통해 상담 문구 생성
      const apiUrl = `${API_BASE_URL}/api/events/${encodeURIComponent(_v_normalized_event_id)}/consultation-text`;
      
      console.log('📋 상담 문구 생성 요청:', {
        eventId: _v_normalized_event_id,
        apiUrl: apiUrl
      });
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }).catch((fetchError) => {
        console.error('❌ Fetch 에러:', fetchError);
        throw new Error(`백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요. (${fetchError.message})`);
      });
      
      console.log('📋 API 응답 상태:', response.status, response.statusText);
      
      if (!response.ok) {
        let errorText = '';
        let errorData = null;
        try {
          errorText = await response.text();
          try {
            errorData = JSON.parse(errorText);
          } catch {
            // JSON이 아니면 텍스트 그대로 사용
          }
        } catch (parseError) {
          console.error('❌ 에러 응답 파싱 실패:', parseError);
        }
        
        console.error('❌ API 응답 에러:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText,
          errorData: errorData
        });
        
        const errorMessage = errorData?.message || errorText || `상담 문구 생성 실패: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      console.log('✅ 상담 문구 생성 성공:', {
        success: result.success,
        hasText: !!result.data?.text,
        textLength: result.data?.text?.length || 0
      });
      
      if (!result.success) {
        throw new Error(result.message || '상담 문구 생성 실패');
      }
      
      const consultationText = result.data?.text || '';
      
      if (!consultationText || consultationText.trim() === '') {
        throw new Error('생성된 상담 문구가 비어있습니다.');
      }
      
      // 클립보드에 복사
      try {
        await navigator.clipboard.writeText(consultationText);
        console.log('✅ 클립보드 복사 성공');
        showSnackbar('상담 문구가 클립보드에 복사되었습니다!');
      } catch (clipboardError) {
        console.error('❌ 클립보드 복사 실패:', clipboardError);
        // 클립보드 API가 실패한 경우 대체 방법 시도
        const textArea = document.createElement('textarea');
        textArea.value = consultationText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          document.body.removeChild(textArea);
          showSnackbar('상담 문구가 클립보드에 복사되었습니다!');
        } catch (fallbackError) {
          document.body.removeChild(textArea);
          throw new Error('클립보드 복사에 실패했습니다. 브라우저 권한을 확인해주세요.');
        }
      }
      
    } catch (err) {
      console.error('❌ 상담 문구 복사 오류:', {
        error: err,
        message: err.message,
        eventId: eventId
      });
      showSnackbar(err.message || '상담 문구 복사에 실패했습니다.');
    }
  };
  
  // 즐겨찾기 추가 (Mock)
  const handleAddFavorite = async (eventId, eventTitle) => {
    try {
      // Mock: 로컬 스토리지에 저장
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      // 이미 즐겨찾기에 있는지 확인
      if (favorites.includes(eventId)) {
        showSnackbar('이미 즐겨찾기에 추가된 이벤트입니다.');
        return;
      }
      
      // 즐겨찾기 추가
      favorites.push(eventId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      
      showSnackbar(`"${eventTitle}"이(가) 즐겨찾기에 추가되었습니다!`);
      console.log('✅ 즐겨찾기 추가:', eventId);
      
    } catch (err) {
      console.error('❌ 즐겨찾기 추가 오류:', err);
      showSnackbar('즐겨찾기 추가에 실패했습니다.');
    }
  };
  
  // 스낵바 표시
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  
  // 상태 색상 매핑
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'PENDING': return 'info';
      case 'ENDED': return 'default';
      default: return 'default';
    }
  };
  
  // 상태 라벨 매핑
  const getStatusLabel = (status) => {
    switch (status) {
      case 'ACTIVE': return '진행중';
      case 'PENDING': return '예정';
      case 'ENDED': return '종료';
      default: return status;
    }
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
            입점몰 이벤트, 전시 조회
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: DARK_COLORS.text.secondary,
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            입점몰 이벤트와 전시를 검색하고 상담 문구를 생성하세요
          </Typography>
        </Box>
      
      {/* 검색 필터 */}
      <Paper 
        sx={{ 
          p: 4, 
          mb: 4,
          bgcolor: DARK_COLORS.cardBg,
          border: `1px solid ${DARK_COLORS.border}`,
          borderRadius: 3,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {/* 플랫폼 선택 (첫 번째) */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: DARK_COLORS.text.secondary }}>플랫폼</InputLabel>
              <Select
                value={filters.channel}
                label="플랫폼"
                onChange={(e) => handleFilterChange('channel', e.target.value)}
                sx={{
                  color: DARK_COLORS.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.border,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.primary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.primary,
                  },
                  '& .MuiSvgIcon-root': {
                    color: DARK_COLORS.text.secondary,
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: DARK_COLORS.cardBg,
                      border: `1px solid ${DARK_COLORS.border}`,
                      '& .MuiMenuItem-root': {
                        color: DARK_COLORS.text.primary,
                        '&:hover': {
                          bgcolor: alpha(DARK_COLORS.primary, 0.1),
                        },
                        '&.Mui-selected': {
                          bgcolor: alpha(DARK_COLORS.primary, 0.2),
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.primary, 0.3),
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">전체</MenuItem>
                <MenuItem value="NAVER">네이버</MenuItem>
                <MenuItem value="NAVER_SHOPPING">네이버스마트스토어</MenuItem>
                <MenuItem value="KAKAO">카카오</MenuItem>
                <MenuItem value="11ST">11번가</MenuItem>
                <MenuItem value="GMARKET">G마켓</MenuItem>
                <MenuItem value="OLIVEYOUNG">올리브영</MenuItem>
                <MenuItem value="GRIP">그립</MenuItem>
                <MenuItem value="MUSINSA">무신사</MenuItem>
                <MenuItem value="LOTTEON">롯데온</MenuItem>
                <MenuItem value="AMOREMALL">아모레몰</MenuItem>
                <MenuItem value="INNISFREE_MALL">이니스프리몰</MenuItem>
                {platformOptions.filter(opt => 
                  !['NAVER', 'NAVER_SHOPPING', 'KAKAO', '11ST', 'GMARKET', 'OLIVEYOUNG', 'GRIP', 'MUSINSA', 'LOTTEON', 'AMOREMALL', 'INNISFREE_MALL'].includes(opt.value)
                ).map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* 브랜드 선택 (두 번째) */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: DARK_COLORS.text.secondary }}>브랜드</InputLabel>
              <Select
                value={filters.brand}
                label="브랜드"
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                sx={{
                  color: DARK_COLORS.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.border,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.primary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.primary,
                  },
                  '& .MuiSvgIcon-root': {
                    color: DARK_COLORS.text.secondary,
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: DARK_COLORS.cardBg,
                      border: `1px solid ${DARK_COLORS.border}`,
                      '& .MuiMenuItem-root': {
                        color: DARK_COLORS.text.primary,
                        '&:hover': {
                          bgcolor: alpha(DARK_COLORS.primary, 0.1),
                        },
                        '&.Mui-selected': {
                          bgcolor: alpha(DARK_COLORS.primary, 0.2),
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.primary, 0.3),
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">전체</MenuItem>
                <MenuItem value="설화수">설화수</MenuItem>
                <MenuItem value="라네즈">라네즈</MenuItem>
                <MenuItem value="아이오페">아이오페</MenuItem>
                <MenuItem value="헤라">헤라</MenuItem>
                <MenuItem value="에스트라">에스트라</MenuItem>
                <MenuItem value="이니스프리">이니스프리</MenuItem>
                <MenuItem value="해피바스">해피바스</MenuItem>
                <MenuItem value="바이탈뷰티">바이탈뷰티</MenuItem>
                <MenuItem value="프리메라">프리메라</MenuItem>
                <MenuItem value="오설록">오설록</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* 키워드 검색 (세 번째) */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="키워드 검색"
              placeholder="이벤트명, 제품명 등"
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
          
          {/* 상태 선택 (세 번째) */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: DARK_COLORS.text.secondary }}>상태</InputLabel>
              <Select
                value={filters.status}
                label="상태"
                onChange={(e) => handleFilterChange('status', e.target.value)}
                sx={{
                  color: DARK_COLORS.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.border,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.primary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.primary,
                  },
                  '& .MuiSvgIcon-root': {
                    color: DARK_COLORS.text.secondary,
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: DARK_COLORS.cardBg,
                      border: `1px solid ${DARK_COLORS.border}`,
                      '& .MuiMenuItem-root': {
                        color: DARK_COLORS.text.primary,
                        '&:hover': {
                          bgcolor: alpha(DARK_COLORS.primary, 0.1),
                        },
                        '&.Mui-selected': {
                          bgcolor: alpha(DARK_COLORS.primary, 0.2),
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.primary, 0.3),
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">전체</MenuItem>
                <MenuItem value="ACTIVE">진행중</MenuItem>
                <MenuItem value="PENDING">예정</MenuItem>
                <MenuItem value="ENDED">종료</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* 정렬 선택 (네 번째) */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: DARK_COLORS.text.secondary }}>정렬</InputLabel>
              <Select
                value={filters.sort_by}
                label="정렬"
                onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                sx={{
                  color: DARK_COLORS.text.primary,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.border,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.primary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: DARK_COLORS.primary,
                  },
                  '& .MuiSvgIcon-root': {
                    color: DARK_COLORS.text.secondary,
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: DARK_COLORS.cardBg,
                      border: `1px solid ${DARK_COLORS.border}`,
                      '& .MuiMenuItem-root': {
                        color: DARK_COLORS.text.primary,
                        '&:hover': {
                          bgcolor: alpha(DARK_COLORS.primary, 0.1),
                        },
                        '&.Mui-selected': {
                          bgcolor: alpha(DARK_COLORS.primary, 0.2),
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.primary, 0.3),
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="start_date">시작일</MenuItem>
                <MenuItem value="end_date">종료일</MenuItem>
                <MenuItem value="created_at">등록일</MenuItem>
                <MenuItem value="discount_rate">할인율</MenuItem>
                <MenuItem value="favorite_count">인기도</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* 검색 버튼 (다섯 번째) */}
          <Grid item xs={12} sm={12} md={2}>
            <Box display="flex" gap={1}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  bgcolor: DARK_COLORS.primary,
                  color: DARK_COLORS.text.primary,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: alpha(DARK_COLORS.primary, 0.8),
                    boxShadow: `0 8px 24px ${alpha(DARK_COLORS.primary, 0.4)}`,
                  },
                  '&:disabled': {
                    bgcolor: DARK_COLORS.text.disabled,
                    color: DARK_COLORS.text.secondary,
                  },
                }}
              >
                검색
              </Button>
              <IconButton 
                onClick={handleSearch} 
                disabled={loading}
                sx={{
                  color: DARK_COLORS.text.secondary,
                  border: `1px solid ${DARK_COLORS.border}`,
                  '&:hover': {
                    bgcolor: alpha(DARK_COLORS.primary, 0.1),
                    borderColor: DARK_COLORS.primary,
                    color: DARK_COLORS.primary,
                  },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* 에러 메시지 */}
      {error && (
        <Alert 
          severity="error" 
          onClose={() => setError(null)} 
          sx={{ 
            mb: 3,
            bgcolor: alpha('#EF4444', 0.1),
            border: `1px solid ${alpha('#EF4444', 0.3)}`,
            color: '#FCA5A5',
            '& .MuiAlert-icon': {
              color: '#EF4444',
            },
          }}
        >
          {error}
        </Alert>
      )}
      
      {/* 로딩 상태 */}
      {loading && (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress sx={{ color: DARK_COLORS.primary }} />
        </Box>
      )}
      
      {/* 이벤트 목록 */}
      {!loading && events.length > 0 && (
        <>
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.event_id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    bgcolor: DARK_COLORS.cardBg,
                    border: `1px solid ${DARK_COLORS.border}`,
                    borderRadius: 3,
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 48px ${alpha(DARK_COLORS.primary, 0.3)}`,
                      border: `1px solid ${alpha(DARK_COLORS.primary, 0.5)}`,
                    },
                  }}
                >
                  {event.thumbnail_url && (
                    <Box
                      component="img"
                      src={event.thumbnail_url}
                      alt={event.title}
                      sx={{
                        height: 180,
                        objectFit: 'cover',
                        backgroundColor: DARK_COLORS.cardHoverBg,
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box display="flex" alignItems="center" gap={1} mb={2} flexWrap="wrap">
                      <Chip
                        label={event.channel_name}
                        size="small"
                        sx={{
                          bgcolor: alpha(DARK_COLORS.primary, 0.15),
                          color: DARK_COLORS.primary,
                          border: `1px solid ${alpha(DARK_COLORS.primary, 0.3)}`,
                          fontWeight: 600,
                        }}
                      />
                      <Chip
                        label={getStatusLabel(event.status)}
                        size="small"
                        sx={{
                          bgcolor: 
                            event.status === 'ACTIVE' ? alpha(DARK_COLORS.success, 0.15) :
                            event.status === 'PENDING' ? alpha(DARK_COLORS.info, 0.15) :
                            alpha(DARK_COLORS.text.disabled, 0.15),
                          color: 
                            event.status === 'ACTIVE' ? DARK_COLORS.success :
                            event.status === 'PENDING' ? DARK_COLORS.info :
                            DARK_COLORS.text.disabled,
                          border: `1px solid ${
                            event.status === 'ACTIVE' ? alpha(DARK_COLORS.success, 0.3) :
                            event.status === 'PENDING' ? alpha(DARK_COLORS.info, 0.3) :
                            alpha(DARK_COLORS.text.disabled, 0.3)
                          }`,
                          fontWeight: 600,
                        }}
                      />
                      {event.discount_rate && (
                        <Chip
                          label={`${event.discount_rate}% 할인`}
                          size="small"
                          sx={{
                            bgcolor: alpha(DARK_COLORS.secondary, 0.15),
                            color: DARK_COLORS.secondary,
                            border: `1px solid ${alpha(DARK_COLORS.secondary, 0.3)}`,
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>
                    
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      noWrap
                      sx={{
                        color: DARK_COLORS.text.primary,
                        fontWeight: 700,
                        mb: 1.5,
                      }}
                    >
                      {event.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: DARK_COLORS.text.secondary,
                        mb: 2,
                        minHeight: 40,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {event.benefit_summary}
                    </Typography>
                    
                    <Box mt={2}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: DARK_COLORS.text.disabled,
                        }}
                      >
                        기간: {moment(event.start_date).format('YYYY-MM-DD')} ~ {moment(event.end_date).format('YYYY-MM-DD')}
                      </Typography>
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                    <Button
                      size="small"
                      onClick={() => handleEventDetail(event.event_id)}
                      sx={{
                        color: DARK_COLORS.primary,
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: alpha(DARK_COLORS.primary, 0.1),
                        },
                      }}
                    >
                      상세보기
                    </Button>
                    <Tooltip title="상담 문구 복사">
                      <IconButton
                        size="small"
                        onClick={() => handleGenerateText(event.event_id)}
                        sx={{
                          color: DARK_COLORS.text.secondary,
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.primary, 0.1),
                            color: DARK_COLORS.primary,
                          },
                        }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="즐겨찾기 추가">
                      <IconButton
                        size="small"
                        onClick={() => handleAddFavorite(event.event_id, event.title)}
                        sx={{
                          color: DARK_COLORS.text.secondary,
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.secondary, 0.1),
                            color: DARK_COLORS.secondary,
                          },
                        }}
                      >
                        <FavoriteBorderIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="이벤트 페이지 열기">
                      <IconButton
                        size="small"
                        component="a"
                        href={event.event_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: DARK_COLORS.text.secondary,
                          '&:hover': {
                            bgcolor: alpha(DARK_COLORS.info, 0.1),
                            color: DARK_COLORS.info,
                          },
                        }}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* 페이지네이션 */}
          <Box display="flex" justifyContent="center" mt={5}>
            <Pagination
              count={totalPages}
              page={filters.page + 1}
              onChange={handlePageChange}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: DARK_COLORS.text.secondary,
                  '&.Mui-selected': {
                    bgcolor: DARK_COLORS.primary,
                    color: DARK_COLORS.text.primary,
                    '&:hover': {
                      bgcolor: alpha(DARK_COLORS.primary, 0.8),
                    },
                  },
                  '&:hover': {
                    bgcolor: alpha(DARK_COLORS.primary, 0.1),
                  },
                },
              }}
              size="large"
            />
          </Box>
        </>
      )}
      
      {/* 결과 없음 */}
      {!loading && events.length === 0 && (
        <Box textAlign="center" py={10}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: DARK_COLORS.text.secondary,
              fontWeight: 600,
              mb: 1,
            }}
          >
            검색 결과가 없습니다.
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: DARK_COLORS.text.disabled,
            }}
          >
            다른 검색 조건을 시도해보세요.
          </Typography>
        </Box>
      )}
      
      {/* 이벤트 상세 다이얼로그 */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: DARK_COLORS.cardBg,
            border: `1px solid ${DARK_COLORS.border}`,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        {selectedEvent && (
          <>
            <DialogTitle sx={{ borderBottom: `1px solid ${DARK_COLORS.border}` }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: DARK_COLORS.text.primary,
                    fontWeight: 700,
                  }}
                >
                  {selectedEvent.title}
                </Typography>
                <Chip 
                  label={selectedEvent.channel_name} 
                  sx={{
                    bgcolor: alpha(DARK_COLORS.primary, 0.15),
                    color: DARK_COLORS.primary,
                    border: `1px solid ${alpha(DARK_COLORS.primary, 0.3)}`,
                    fontWeight: 600,
                  }}
                />
              </Box>
            </DialogTitle>
            <DialogContent dividers sx={{ borderColor: DARK_COLORS.border }}>
              {selectedEvent.image_url && (
                <Box
                  component="img"
                  src={selectedEvent.image_url}
                  alt={selectedEvent.title}
                  sx={{
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'contain',
                    mb: 3,
                    borderRadius: 2,
                    bgcolor: DARK_COLORS.cardHoverBg,
                  }}
                />
              )}
              
              <Typography 
                variant="subtitle1" 
                gutterBottom 
                fontWeight="bold"
                sx={{
                  color: DARK_COLORS.text.primary,
                  mb: 1.5,
                }}
              >
                혜택 내용
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{
                  color: DARK_COLORS.text.secondary,
                  mb: 3,
                }}
              >
                {selectedEvent.benefit_detail || selectedEvent.benefit_summary}
              </Typography>
              
              {selectedEvent.target_products && (
                <>
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom 
                    fontWeight="bold"
                    sx={{
                      color: DARK_COLORS.text.primary,
                      mb: 1.5,
                    }}
                  >
                    대상 제품
                  </Typography>
                  <Typography 
                    variant="body2" 
                    paragraph
                    sx={{
                      color: DARK_COLORS.text.secondary,
                      mb: 3,
                    }}
                  >
                    {selectedEvent.target_products}
                  </Typography>
                </>
              )}
              
              {selectedEvent.conditions && (
                <>
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom 
                    fontWeight="bold"
                    sx={{
                      color: DARK_COLORS.text.primary,
                      mb: 1.5,
                    }}
                  >
                    유의사항
                  </Typography>
                  <Typography 
                    variant="body2" 
                    paragraph
                    sx={{
                      color: DARK_COLORS.text.secondary,
                      mb: 3,
                    }}
                  >
                    {selectedEvent.conditions}
                  </Typography>
                </>
              )}
              
              <Box mt={2}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: DARK_COLORS.text.disabled,
                  }}
                >
                  기간: {moment(selectedEvent.start_date).format('YYYY-MM-DD HH:mm')} ~ {moment(selectedEvent.end_date).format('YYYY-MM-DD HH:mm')}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ borderTop: `1px solid ${DARK_COLORS.border}`, p: 2 }}>
              <Button
                startIcon={<ContentCopyIcon />}
                onClick={() => handleGenerateText(selectedEvent.event_id)}
                sx={{
                  color: DARK_COLORS.text.secondary,
                  '&:hover': {
                    bgcolor: alpha(DARK_COLORS.primary, 0.1),
                    color: DARK_COLORS.primary,
                  },
                }}
              >
                상담 문구 복사
              </Button>
              <Button
                startIcon={<FavoriteIcon />}
                onClick={() => handleAddFavorite(selectedEvent.event_id, selectedEvent.title)}
                sx={{
                  color: DARK_COLORS.text.secondary,
                  '&:hover': {
                    bgcolor: alpha(DARK_COLORS.secondary, 0.1),
                    color: DARK_COLORS.secondary,
                  },
                }}
              >
                즐겨찾기
              </Button>
              <Button
                variant="contained"
                startIcon={<OpenInNewIcon />}
                component="a"
                href={selectedEvent.event_url}
                target="_blank"
                rel="noopener noreferrer"
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
                이벤트 페이지 보기
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* 스낵바 알림 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        ContentProps={{
          sx: {
            bgcolor: DARK_COLORS.cardBg,
            color: DARK_COLORS.text.primary,
            border: `1px solid ${DARK_COLORS.border}`,
          },
        }}
      />
      </Container>
    </Box>
  );
};

export default SearchExhibitions;


