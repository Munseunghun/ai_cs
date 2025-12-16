/**
 * 라이브 방송 상세 조회 페이지
 * 수집정보 문서의 모든 항목 표시
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Button,
  Stack,
  Tabs,
  Tab,
  Badge,
  CircularProgress,
  alpha,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as LocalOfferIcon,
  CardGiftcard as CardGiftcardIcon,
  LocalShipping as LocalShippingIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Schedule as ScheduleIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// API 기본 URL (환경변수 또는 기본값)
const getApiBaseUrl = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  return baseUrl.replace(/\/api\/?$/, '');
};
const API_BASE_URL = getApiBaseUrl();

// 다크 테마 색상 팔레트 (Dashboard와 동일)
const DARK_COLORS = {
  background: '#0F1419',
  cardBg: '#1A1F2E',
  cardHoverBg: '#252B3B',
  primary: '#6366F1',
  secondary: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
  error: '#EF4444',
  text: {
    primary: '#F9FAFB',
    secondary: '#9CA3AF',
    disabled: '#6B7280',
  },
  border: '#2D3748',
};

const LiveBroadcastDetail = () => {
  const { liveId } = useParams();
  const navigate = useNavigate();
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0); // 상품 목록 및 프로모션 탭 관리

  useEffect(() => {
    // ✅ 백엔드 API에서 라이브 방송 상세 데이터 로드
    const loadLiveData = async () => {
      try {
        setLoading(true);
        console.log('🔍 LiveBroadcastDetail - liveId:', liveId);
        console.log('📡 백엔드 API 호출 중...');
        
        // liveId 유효성 검사
        if (!liveId || liveId === 'undefined' || liveId === 'null') {
          console.error('❌ 유효하지 않은 liveId:', liveId);
          setLiveData(null);
          setLoading(false);
          return;
        }
        
        // 백엔드 API 호출
        const apiUrl = `${API_BASE_URL}/api/events/${encodeURIComponent(liveId)}`;
        console.log('📡 API URL:', apiUrl);
        
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
        
        console.log('📡 API 응답 상태:', response.status, response.statusText);
        
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
          
          // 404 에러인 경우 특별 처리
          if (response.status === 404) {
            const errorMessage = errorData?.message || '라이브 방송 정보를 찾을 수 없습니다.';
            console.error('❌ 라이브 방송을 찾을 수 없음:', {
              liveId: liveId,
              message: errorMessage
            });
            setLiveData(null);
            setLoading(false);
            return;
          }
          
          throw new Error(errorData?.message || `API 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('✅ API 응답 성공:', result);
        
        if (!result.success) {
          const errorMessage = result.message || '라이브 방송 정보 조회 실패';
          console.error('❌ API 응답 success가 false:', errorMessage);
          setLiveData(null);
          setLoading(false);
          return;
        }
        
        const apiData = result.data;
        console.log('📦 LiveBroadcastDetail - API 데이터:', apiData);
        
        // STT 정보 및 혜택 정보 디버깅
        if (apiData) {
          console.log('🔍 STT 정보 확인:', {
            has_stt_info: !!apiData.stt_info,
            has_live_specific: !!apiData.live_specific,
            stt_info: apiData.stt_info,
            live_specific: apiData.live_specific,
            stt_info_keys: apiData.stt_info ? Object.keys(apiData.stt_info) : [],
            live_specific_keys: apiData.live_specific ? Object.keys(apiData.live_specific) : []
          });
          
          // 혜택 정보 상세 확인
          console.log('🔍 혜택 정보 확인:', {
            has_benefits: !!apiData.benefits,
            benefits_structure: apiData.benefits,
            benefits_keys: apiData.benefits ? Object.keys(apiData.benefits) : [],
            discounts_count: apiData.benefits?.discounts?.length || 0,
            gifts_count: apiData.benefits?.gifts?.length || 0,
            coupons_count: apiData.benefits?.coupons?.length || 0,
            shipping_count: apiData.benefits?.shipping?.length || 0,
            delivery_count: apiData.benefits?.delivery?.length || 0,
            point_details_count: apiData.benefits?.point_details?.length || 0,
            total_benefits: (apiData.benefits?.discounts?.length || 0) + 
                           (apiData.benefits?.gifts?.length || 0) + 
                           (apiData.benefits?.coupons?.length || 0) + 
                           (apiData.benefits?.shipping?.length || 0) +
                           (apiData.benefits?.delivery?.length || 0) +
                           (apiData.benefits?.point_details?.length || 0),
            // 각 혜택 타입의 첫 번째 아이템 샘플
            discount_sample: apiData.benefits?.discounts?.[0],
            gift_sample: apiData.benefits?.gifts?.[0],
            coupon_sample: apiData.benefits?.coupons?.[0],
            shipping_sample: apiData.benefits?.shipping?.[0]
          });
          
          setLiveData(apiData);
          console.log('✅ LiveBroadcastDetail - 데이터 로드 성공:', {
            live_id: apiData.live_id || apiData.event_id,
            title: apiData.title || apiData.live_title_customer,
            products_count: apiData.products?.length || 0,
            benefits_count: apiData.benefits ? Object.keys(apiData.benefits).length : 0,
            stt_info_available: !!(apiData.stt_info || apiData.live_specific)
          });
        } else {
          console.error('❌ LiveBroadcastDetail - 데이터를 찾을 수 없음 (result.data가 null)');
          setLiveData(null);
        }
      } catch (err) {
        console.error('❌ LiveBroadcastDetail 로드 오류:', {
          error: err,
          message: err.message,
          liveId: liveId
        });
        setLiveData(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (liveId) {
      loadLiveData();
    } else {
      console.error('❌ liveId가 없습니다');
      setLiveData(null);
      setLoading(false);
    }
  }, [liveId]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: DARK_COLORS.background, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ mb: 2, color: DARK_COLORS.primary }} />
          <Typography sx={{ color: DARK_COLORS.text.primary }}>라이브 방송 정보를 불러오는 중...</Typography>
        </Box>
      </Box>
    );
  }

  if (!liveData) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: DARK_COLORS.background, pt: 4 }}>
        <Container maxWidth="lg">
          <Alert 
            severity="error"
            sx={{
              bgcolor: DARK_COLORS.cardBg,
              color: DARK_COLORS.text.primary,
              border: `1px solid ${DARK_COLORS.border}`,
              '& .MuiAlert-icon': { color: DARK_COLORS.error }
            }}
          >
            라이브 방송 정보를 찾을 수 없습니다.
          </Alert>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/search')} 
            sx={{ 
              mt: 2,
              color: DARK_COLORS.text.primary,
              borderColor: DARK_COLORS.border,
              '&:hover': { borderColor: DARK_COLORS.primary, bgcolor: `${DARK_COLORS.primary}20` }
            }}
            variant="outlined"
          >
            목록으로 돌아가기
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: DARK_COLORS.background, pb: 6 }}>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
      {/* 상단 헤더 */}
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/search')}
          variant="outlined"
          sx={{ 
            mb: 3,
            color: DARK_COLORS.text.primary,
            borderColor: DARK_COLORS.border,
            '&:hover': { 
              borderColor: DARK_COLORS.primary, 
              bgcolor: alpha(DARK_COLORS.primary, 0.1)
            }
          }}
        >
          목록으로
        </Button>
        
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 800,
            color: DARK_COLORS.text.primary,
            letterSpacing: '-0.02em',
            mb: 2
          }}
        >
          {liveData.metadata?.live_title_customer || liveData.live_title_customer}
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip 
            label={liveData.metadata?.platform_name || liveData.platform_name} 
            sx={{ 
              bgcolor: alpha(DARK_COLORS.primary, 0.2),
              color: DARK_COLORS.primary,
              fontWeight: 600,
              border: `1px solid ${alpha(DARK_COLORS.primary, 0.3)}`
            }} 
            size="small" 
          />
          <Chip 
            label={liveData.metadata?.brand_name || liveData.brand_name} 
            sx={{ 
              bgcolor: alpha(DARK_COLORS.secondary, 0.2),
              color: DARK_COLORS.secondary,
              fontWeight: 600,
              border: `1px solid ${alpha(DARK_COLORS.secondary, 0.3)}`
            }} 
            size="small" 
          />
          <Chip 
            label={liveData.schedule?.broadcast_type || liveData.broadcast_format || '라이브'} 
            sx={{ 
              bgcolor: DARK_COLORS.cardBg,
              color: DARK_COLORS.text.secondary,
              border: `1px solid ${DARK_COLORS.border}`
            }} 
            size="small" 
          />
        </Stack>
      </Box>

      {/* ========== 1) 기본 정보 ========== */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: DARK_COLORS.cardBg, border: `1px solid ${DARK_COLORS.border}`, borderRadius: 3, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)' }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: DARK_COLORS.text.primary, display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ mr: 1, color: DARK_COLORS.primary }} /> 기본 정보
        </Typography>
        <Divider sx={{ mb: 2, borderColor: DARK_COLORS.border }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary }}>라이브 ID</Typography>
            <Typography variant="body1" sx={{ color: DARK_COLORS.text.primary }}>{liveData.metadata?.live_id || liveData.live_id}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary }}>CS용 방송명</Typography>
            <Typography variant="body1" sx={{ color: DARK_COLORS.text.primary }}>{liveData.metadata?.live_title_cs || liveData.live_title_cs}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary }}>원천 URL</Typography>
            {(() => {
              const _v_source_url = liveData.meta?.source_url || liveData.metadata?.source_url || liveData.source_url || liveData.event_url;
              if (_v_source_url && _v_source_url !== 'about:blank' && _v_source_url.trim() !== '') {
                return (
                  <Typography variant="body1" sx={{ color: DARK_COLORS.text.primary }}>
                    <a 
                      href={_v_source_url} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ 
                        color: '#1976d2', 
                        textDecoration: 'underline',
                        wordBreak: 'break-all'
                      }}
                    >
                      {_v_source_url}
                    </a>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ ml: 1 }}
                      onClick={() => {
                        // Referrer를 유지하면서 새 창 열기
                        const newWindow = window.open('', '_blank');
                        if (newWindow) {
                          newWindow.location.href = _v_source_url;
                        } else {
                          alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
                        }
                      }}
                    >
                      새 창에서 열기
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      sx={{ ml: 1 }}
                      onClick={() => {
                        navigator.clipboard.writeText(_v_source_url);
                        alert('URL이 클립보드에 복사되었습니다.');
                      }}
                    >
                      URL 복사
                    </Button>
                  </Typography>
                );
              } else {
                return (
                  <Alert severity="warning" sx={{ mt: 1 }}>
                    원천 URL 정보가 없습니다.
                  </Alert>
                );
              }
            })()}
          </Grid>
        </Grid>
      </Paper>

      {/* ========== 2) 상품 목록 및 프로모션 (4개 탭) ========== */}
      <Paper sx={{ p: 0, mb: 3, bgcolor: DARK_COLORS.cardBg, border: `1px solid ${DARK_COLORS.border}`, borderRadius: 3, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)' }}>
        {/* 탭 헤더 */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', mb: 2 }}>
            <ShoppingCartIcon sx={{ mr: 1, color: '#FFFFFF' }} /> 상품 목록 및 프로모션
          </Typography>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            aria-label="상품 목록 및 프로모션 탭"
            sx={{
              '& .MuiTab-root': {
                color: DARK_COLORS.text.secondary,
                fontWeight: 600,
                '&.Mui-selected': {
                  color: DARK_COLORS.primary,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: DARK_COLORS.primary,
              },
            }}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '0.95rem'
              }
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  상품
                  <Badge 
                    badgeContent={(() => {
                      // 상품 중복 제거 후 개수 계산
                      const _v_products_raw = Array.isArray(liveData.products) 
                        ? liveData.products 
                        : liveData.products?.product_list || [];
                      
                      const _v_product_keys = new Set();
                      
                      for (const _v_product of _v_products_raw) {
                        const _v_option_name = _v_product.product_options && Array.isArray(_v_product.product_options) && _v_product.product_options.length > 0
                          ? _v_product.product_options.map(opt => `${opt.option_name}:${opt.option_value}`).join(',')
                          : (_v_product.option_name || '');
                        
                        const _v_unique_key = [
                          (_v_product.product_name || '').trim(),
                          _v_option_name.trim(),
                          (_v_product.sale_price || '').toString().trim()
                        ].join('|');
                        
                        _v_product_keys.add(_v_unique_key);
                      }
                      
                      return _v_product_keys.size;
                    })()} 
                    color="primary" 
                    sx={{ ml: 1 }}
                  />
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  쿠폰
                  <Badge 
                    badgeContent={liveData.benefits?.coupons?.length || 0} 
                    color="secondary" 
                    sx={{ ml: 1 }}
                  />
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  혜택
                  <Badge 
                    badgeContent={
                      (liveData.benefits?.discounts?.length || 0) + 
                      (liveData.benefits?.gifts?.length || 0) + 
                      (liveData.benefits?.shipping?.length || 0)
                    } 
                    sx={{ bgcolor: alpha(DARK_COLORS.success, 0.2), color: DARK_COLORS.success, border: `1px solid ${alpha(DARK_COLORS.success, 0.3)}` }} 
                    sx={{ ml: 1 }}
                  />
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  이벤트
                  <Badge 
                    badgeContent={liveData.events?.length || 0} 
                    sx={{ bgcolor: alpha(DARK_COLORS.error, 0.2), color: DARK_COLORS.error, border: `1px solid ${alpha(DARK_COLORS.error, 0.3)}` }} 
                    sx={{ ml: 1 }}
                  />
                </Box>
              } 
            />
          </Tabs>
        </Box>

        {/* 탭 패널 내용 */}
        <Box sx={{ p: 3 }}>
          {/* 🛍️ 상품 탭 */}
          {tabValue === 0 && (
            <Box>
              <TableContainer sx={{ bgcolor: DARK_COLORS.cardBg }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: DARK_COLORS.cardHoverBg }}>
                      <TableCell sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>순서</TableCell>
                      <TableCell sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>상품명</TableCell>
                      <TableCell sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>옵션</TableCell>
                      <TableCell align="right" sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>정가</TableCell>
                      <TableCell align="right" sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>판매가</TableCell>
                      <TableCell align="right" sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>할인율</TableCell>
                      <TableCell sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>재고</TableCell>
                      <TableCell sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>평점</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(() => {
                      // 상품 중복 제거 로직
                      const _v_products_raw = Array.isArray(liveData.products) 
                        ? liveData.products 
                        : liveData.products?.product_list || [];
                      
                      const _v_unique_products = [];
                      const _v_product_keys = new Set();
                      
                      for (const _v_product of _v_products_raw) {
                        // 중복 체크를 위한 고유 키 생성
                        // 상품명, 옵션명, 판매가를 기준으로 중복 판단
                        const _v_option_name = _v_product.product_options && Array.isArray(_v_product.product_options) && _v_product.product_options.length > 0
                          ? _v_product.product_options.map(opt => `${opt.option_name}:${opt.option_value}`).join(',')
                          : (_v_product.option_name || '');
                        
                        const _v_unique_key = [
                          (_v_product.product_name || '').trim(),
                          _v_option_name.trim(),
                          (_v_product.sale_price || '').toString().trim()
                        ].join('|');
                        
                        // 중복되지 않은 경우에만 추가
                        if (!_v_product_keys.has(_v_unique_key)) {
                          _v_product_keys.add(_v_unique_key);
                          _v_unique_products.push(_v_product);
                        }
                      }
                      
                      return _v_unique_products;
                    })().map((product, index) => (
                      <TableRow key={product.product_id || index} hover>
                        <TableCell sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>{product.product_order || index + 1}</TableCell>
                        <TableCell sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>
                          <Box>
                            <Typography variant="body2" fontWeight={(product.product_type === '대표') ? 'bold' : 'normal'}>
                              {product.product_name}
                              {(product.product_type === '대표' || product.is_main_product) && (
                                <Chip label="대표" color="primary" size="small" sx={{ ml: 1 }} />
                              )}
                              {product.product_type === '세트' && (
                                <Chip label="세트" color="secondary" size="small" sx={{ ml: 1 }} />
                              )}
                            </Typography>
                            {product.sku && (
                              <Typography variant="caption" color="text.secondary" display="block">
                                SKU: {product.sku}
                              </Typography>
                            )}
                            {product.product_detail && (
                              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                                {product.product_detail}
                              </Typography>
                            )}
                            {product.set_composition && (
                              <Alert severity="info" sx={{ mt: 1, py: 0.5 }}>
                                <Typography variant="caption">
                                  구성: {product.set_composition}
                                </Typography>
                              </Alert>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>
                          {product.product_options && Array.isArray(product.product_options) && product.product_options.length > 0 ? (
                            <Stack spacing={0.5}>
                              {product.product_options.map((opt, idx) => (
                                <Chip key={idx} label={`${opt.option_name}: ${opt.option_value}`} size="small" variant="outlined" />
                              ))}
                            </Stack>
                          ) : (
                            <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary }}>-</Typography>
                          )}
                        </TableCell>
                        <TableCell align="right" sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>
                          <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                            {product.original_price || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>
                          <Typography variant="body2" fontWeight="bold" sx={{ bgcolor: alpha(DARK_COLORS.error, 0.2), color: DARK_COLORS.error, border: `1px solid ${alpha(DARK_COLORS.error, 0.3)}` }}>
                            {product.sale_price || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>
                          <Chip label={product.discount_rate || '0%'} sx={{ bgcolor: alpha(DARK_COLORS.error, 0.2), color: DARK_COLORS.error, border: `1px solid ${alpha(DARK_COLORS.error, 0.3)}` }} size="small" />
                        </TableCell>
                        <TableCell sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>
                          <Typography variant="body2" fontSize="0.75rem">
                            {product.stock_info || '재고 충분'}
                          </Typography>
                          {product.stock_quantity && (
                            <Typography variant="caption" color="text.secondary" display="block">
                              ({product.stock_quantity}개)
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>
                          {product.rating && (
                            <Box>
                              <Typography variant="body2" fontWeight="bold" sx={{ color: DARK_COLORS.primary }}>
                                ⭐ {product.rating}
                              </Typography>
                              {product.review_count && (
                                <Typography variant="caption" color="text.secondary">
                                  ({product.review_count.toLocaleString()}개)
                                </Typography>
                              )}
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* 🎟️ 쿠폰 탭 */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: DARK_COLORS.text.primary }} sx={{ mb: 2 }}>
                사용 가능한 쿠폰 ({liveData.benefits?.coupons?.length || 0}개)
              </Typography>
              {liveData.benefits?.coupons && liveData.benefits.coupons.length > 0 ? (
                <Stack spacing={2.5}>
                        {liveData.benefits.coupons.map((coupon, index) => (
                          <Card 
                            key={coupon.coupon_id || coupon.benefit_id || index}
                            sx={{ 
                              bgcolor: DARK_COLORS.cardBg,
                              border: `1px solid ${DARK_COLORS.border}`,
                              borderRadius: 2,
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                borderColor: DARK_COLORS.secondary,
                                boxShadow: '0 4px 16px rgba(236, 72, 153, 0.2)',
                              }
                            }}
                          >
                            <CardContent sx={{ p: 2.5 }}>
                              {/* 쿠폰 헤더 */}
                              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                    <Chip 
                                      label={coupon.benefit_type || coupon.coupon_type || '할인쿠폰'} 
                                      size="small" 
                                      sx={{ 
                                        bgcolor: alpha(DARK_COLORS.secondary, 0.2),
                                        color: DARK_COLORS.secondary,
                                        fontWeight: 600,
                                        fontSize: '0.75rem'
                                      }}
                                    />
                                    <Chip 
                                      label="발급가능" 
                                      size="small"
                                      sx={{ 
                                        bgcolor: alpha(DARK_COLORS.success, 0.2),
                                        color: DARK_COLORS.success,
                                        fontWeight: 600,
                                        fontSize: '0.75rem'
                                      }}
                                    />
                                  </Stack>
                                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, color: DARK_COLORS.text.primary }}>
                                    {coupon.benefit_name || coupon.coupon_name || '쿠폰'}
                                  </Typography>
                                  {(coupon.benefit_detail || coupon.coupon_description) && (
                                    <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, fontSize: '0.875rem' }}>
                                      {coupon.benefit_detail || coupon.coupon_description}
                                    </Typography>
                                  )}
                                </Box>
                                <Box sx={{ 
                                  textAlign: 'center', 
                                  minWidth: 100,
                                  p: 1.5,
                                  bgcolor: alpha(DARK_COLORS.secondary, 0.15),
                                  border: `1px solid ${alpha(DARK_COLORS.secondary, 0.3)}`,
                                  borderRadius: 1.5,
                                }}>
                                  <Typography variant="h5" fontWeight="bold" sx={{ color: DARK_COLORS.secondary }} sx={{ color: DARK_COLORS.text.primary }}>
                                    {coupon.benefit_detail || coupon.coupon_discount_value || '-'}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>
                                    {coupon.benefit_type || coupon.coupon_discount_type || '할인'}
                                  </Typography>
                                </Box>
                              </Stack>
                        
                        <Divider sx={{ my: 2, borderColor: DARK_COLORS.border }} />
                        
                        {/* 쿠폰 상세 정보 */}
                        <Grid container spacing={1.5}>
                          {/* 최소 구매금액 */}
                          {(coupon.benefit_condition || coupon.min_purchase_amount) && (
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ 
                                p: 1.5, 
                                bgcolor: alpha(DARK_COLORS.cardHoverBg, 0.5),
                                borderRadius: 1,
                                border: `1px solid ${DARK_COLORS.border}`
                              }}>
                                <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary, display: 'block', mb: 0.5 }}>
                                  최소 구매금액
                                </Typography>
                                <Typography variant="body2" fontWeight="600" sx={{ color: DARK_COLORS.text.primary }}>
                                  {coupon.benefit_condition || coupon.min_purchase_amount || '-'}
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          
                          {/* 최대 할인금액 */}
                          {coupon.max_discount_amount && (
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ 
                                p: 1.5, 
                                bgcolor: alpha(DARK_COLORS.cardHoverBg, 0.5),
                                borderRadius: 1,
                                border: `1px solid ${DARK_COLORS.border}`
                              }}>
                                <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary, display: 'block', mb: 0.5 }}>
                                  최대 할인금액
                                </Typography>
                                <Typography variant="body2" fontWeight="600" sx={{ color: DARK_COLORS.text.primary }}>
                                  {coupon.max_discount_amount}
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          
                          {/* 발급 제한 */}
                          {coupon.coupon_issue_limit && (
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ 
                                p: 1.5, 
                                bgcolor: alpha(DARK_COLORS.cardHoverBg, 0.5),
                                borderRadius: 1,
                                border: `1px solid ${DARK_COLORS.border}`
                              }}>
                                <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary, display: 'block', mb: 0.5 }}>
                                  발급 제한
                                </Typography>
                                <Typography variant="body2" fontWeight="600" sx={{ color: DARK_COLORS.warning }}>
                                  {coupon.coupon_issue_limit}
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          
                          {/* 중복 사용 */}
                          {coupon.duplicate_use !== undefined && (
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ 
                                p: 1.5, 
                                bgcolor: alpha(DARK_COLORS.cardHoverBg, 0.5),
                                borderRadius: 1,
                                border: `1px solid ${DARK_COLORS.border}`
                              }}>
                                <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary, display: 'block', mb: 0.5 }}>
                                  중복 사용
                                </Typography>
                                <Typography variant="body2" fontWeight="600" sx={{ color: coupon.duplicate_use ? DARK_COLORS.success : DARK_COLORS.text.secondary }}>
                                  {coupon.duplicate_use ? '가능' : '불가'}
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                        
                        {/* 유효기간 */}
                        {(coupon.benefit_valid_period || coupon.coupon_valid_start || coupon.coupon_valid_end) && (
                          <Box sx={{ 
                            mt: 2, 
                            p: 1.5, 
                            bgcolor: alpha(DARK_COLORS.cardHoverBg, 0.5),
                            borderRadius: 1,
                            border: `1px solid ${DARK_COLORS.border}`
                          }}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                              <ScheduleIcon sx={{ color: DARK_COLORS.info, fontSize: '1.25rem' }} />
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary, display: 'block' }}>
                                  유효기간
                                </Typography>
                                <Typography variant="body2" fontWeight="600" sx={{ color: DARK_COLORS.text.primary }}>
                                  {coupon.benefit_valid_period || 
                                   `${coupon.coupon_valid_start || '-'} ~ ${coupon.coupon_valid_end || '-'}`}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>
                        )}
                        
                        {/* 발급 조건 */}
                        {coupon.coupon_issue_condition && (
                          <Box sx={{ 
                            mt: 1.5, 
                            p: 1.5, 
                            bgcolor: alpha(DARK_COLORS.info, 0.1),
                            borderRadius: 1,
                            border: `1px solid ${alpha(DARK_COLORS.info, 0.3)}`
                          }}>
                            <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary, fontSize: '0.875rem' }}>
                              <strong>발급 조건:</strong> {coupon.coupon_issue_condition}
                            </Typography>
                          </Box>
                        )}
                        
                        {/* 적용 상품 */}
                        {coupon.target_products && (
                          <Box sx={{ 
                            mt: 1.5, 
                            p: 1.5, 
                            bgcolor: alpha(DARK_COLORS.success, 0.1),
                            borderRadius: 1,
                            border: `1px solid ${alpha(DARK_COLORS.success, 0.3)}`
                          }}>
                            <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary, fontSize: '0.875rem' }}>
                              <strong>✓ 적용 상품:</strong> {coupon.target_products}
                            </Typography>
                          </Box>
                        )}
                        
                        {/* 제외 상품 */}
                        {coupon.excluded_products && (
                          <Box sx={{ 
                            mt: 1.5, 
                            p: 1.5, 
                            bgcolor: alpha(DARK_COLORS.warning, 0.1),
                            borderRadius: 1,
                            border: `1px solid ${alpha(DARK_COLORS.warning, 0.3)}`
                          }}>
                            <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary, fontSize: '0.875rem' }}>
                              <strong>✗ 제외 상품:</strong> {coupon.excluded_products}
                            </Typography>
                          </Box>
                        )}
                        
                        {/* 추가 정보 태그 */}
                        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {coupon.coupon_code && (
                            <Chip 
                              label={`쿠폰코드: ${coupon.coupon_code}`} 
                              size="small"
                              sx={{
                                bgcolor: alpha(DARK_COLORS.primary, 0.2),
                                color: DARK_COLORS.primary,
                                border: `1px solid ${alpha(DARK_COLORS.primary, 0.3)}`,
                                fontSize: '0.75rem'
                              }}
                            />
                          )}
                          {coupon.usage_count !== undefined && (
                            <Chip 
                              label={`사용: ${coupon.usage_count}회`} 
                              size="small"
                              sx={{
                                bgcolor: alpha(DARK_COLORS.info, 0.2),
                                color: DARK_COLORS.info,
                                border: `1px solid ${alpha(DARK_COLORS.info, 0.3)}`,
                                fontSize: '0.75rem'
                              }}
                            />
                          )}
                          {coupon.coupon_status && (
                            <Chip 
                              label={coupon.coupon_status} 
                              size="small"
                              sx={{
                                bgcolor: coupon.coupon_status === '발급가능' 
                                  ? alpha(DARK_COLORS.success, 0.2) 
                                  : alpha(DARK_COLORS.text.secondary, 0.2),
                                color: coupon.coupon_status === '발급가능' 
                                  ? DARK_COLORS.success 
                                  : DARK_COLORS.text.secondary,
                                border: `1px solid ${coupon.coupon_status === '발급가능' 
                                  ? alpha(DARK_COLORS.success, 0.3) 
                                  : alpha(DARK_COLORS.text.secondary, 0.3)}`,
                                fontSize: '0.75rem'
                              }}
                            />
                          )}
                        </Box>
                        
                        {/* 쿠폰 다운로드 버튼 */}
                        <Button 
                          variant="contained" 
                          fullWidth 
                          sx={{ 
                            mt: 2, 
                            py: 1.2, 
                            bgcolor: DARK_COLORS.secondary,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            borderRadius: 1.5,
                            '&:hover': {
                              bgcolor: DARK_COLORS.secondary,
                              opacity: 0.9,
                            }
                          }}
                        >
                          쿠폰 다운로드
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Alert severity="info" sx={{ py: 3 }}>
                  <Typography variant="body1" fontWeight="600">
                    현재 사용 가능한 쿠폰이 없습니다.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    새로운 쿠폰이 발급되면 알려드리겠습니다.
                  </Typography>
                </Alert>
              )}
            </Box>
          )}

          {/* 💰 혜택 탭 */}
          {tabValue === 2 && (
            <Box>
              <Alert severity="info" icon={<LocalOfferIcon />}>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  혜택 정보는 하단의 "혜택 정보" 섹션에서 확인하실 수 있습니다.
                </Typography>
                <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary }}>
                  할인, 사은품, 쿠폰, 배송 혜택 등 모든 혜택 정보를 한눈에 확인하세요.
                </Typography>
              </Alert>
              
              {/* 혜택 요약 */}
              {(() => {
                const _v_total_benefits = (liveData.benefits?.discounts?.length || 0) + 
                                         (liveData.benefits?.gifts?.length || 0) + 
                                         (liveData.benefits?.coupons?.length || 0) + 
                                         (liveData.benefits?.shipping?.length || 0) +
                                         (liveData.benefits?.delivery?.length || 0) +
                                         (liveData.benefits?.point_details?.length || 0);
                
                return (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: DARK_COLORS.text.primary }}>
                      혜택 요약
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={3}>
                        <Card sx={{ 
                          textAlign: 'center', 
                          p: 2, 
                          bgcolor: DARK_COLORS.cardBg,
                          border: `1px solid ${DARK_COLORS.border}`,
                          borderRadius: 2
                        }}>
                          <LocalOfferIcon sx={{ fontSize: 32, color: DARK_COLORS.error, mb: 1 }} />
                          <Typography variant="h4" sx={{ color: DARK_COLORS.error, fontWeight: 700 }}>
                            {liveData.benefits?.discounts?.length || 0}
                          </Typography>
                          <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>할인 혜택</Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Card sx={{ 
                          textAlign: 'center', 
                          p: 2, 
                          bgcolor: DARK_COLORS.cardBg,
                          border: `1px solid ${DARK_COLORS.border}`,
                          borderRadius: 2
                        }}>
                          <CardGiftcardIcon sx={{ fontSize: 32, color: DARK_COLORS.success, mb: 1 }} />
                          <Typography variant="h4" sx={{ color: DARK_COLORS.success, fontWeight: 700 }}>
                            {liveData.benefits?.gifts?.length || 0}
                          </Typography>
                          <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>사은품</Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Card sx={{ 
                          textAlign: 'center', 
                          p: 2, 
                          bgcolor: DARK_COLORS.cardBg,
                          border: `1px solid ${DARK_COLORS.border}`,
                          borderRadius: 2
                        }}>
                          <LocalOfferIcon sx={{ fontSize: 32, color: DARK_COLORS.secondary, mb: 1 }} />
                          <Typography variant="h4" sx={{ color: DARK_COLORS.secondary, fontWeight: 700 }}>
                            {liveData.benefits?.coupons?.length || 0}
                          </Typography>
                          <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>쿠폰</Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Card sx={{ 
                          textAlign: 'center', 
                          p: 2, 
                          bgcolor: DARK_COLORS.cardBg,
                          border: `1px solid ${DARK_COLORS.border}`,
                          borderRadius: 2
                        }}>
                          <LocalShippingIcon sx={{ fontSize: 32, color: DARK_COLORS.info, mb: 1 }} />
                          <Typography variant="h4" sx={{ color: DARK_COLORS.info, fontWeight: 700 }}>
                            {(liveData.benefits?.shipping?.length || 0) + (liveData.benefits?.delivery?.length || 0)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>배송 혜택</Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                );
              })()}
            </Box>
          )}
        </Box>
      </Paper>

      {/* ========== 4) 혜택(Promotion) 구조 ========== */}
      {(() => {
        const _v_total_benefits = (liveData.benefits?.discounts?.length || 0) + 
                                 (liveData.benefits?.gifts?.length || 0) + 
                                 (liveData.benefits?.coupons?.length || 0) + 
                                 (liveData.benefits?.shipping?.length || 0) +
                                 (liveData.benefits?.delivery?.length || 0) +
                                 (liveData.benefits?.point_details?.length || 0);
        
        return (
          <>
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ color: '#FFFFFF', mt: 4, mb: 2 }} sx={{ color: DARK_COLORS.text.primary }}>
              혜택 정보 ({_v_total_benefits}건)
            </Typography>

            {/* 4-a) 할인 관련 */}
      <Paper sx={{ p: 3, mb: 2, bgcolor: DARK_COLORS.cardBg, border: `1px solid ${DARK_COLORS.border}`, borderRadius: 3, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)' }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: '#FFFFFF', display: 'flex', alignItems: 'center' }}>
          <LocalOfferIcon sx={{ mr: 1, color: '#FFFFFF' }} /> 할인 혜택 ({liveData.benefits?.discounts?.length || 0}개)
        </Typography>
        <Divider sx={{ mb: 2, borderColor: DARK_COLORS.border }} />
        
        {liveData.benefits?.discounts && liveData.benefits.discounts.length > 0 ? (
          liveData.benefits.discounts.map((discount, index) => (
            <Card key={index} sx={{ mb: 1.5, bgcolor: alpha(DARK_COLORS.error, 0.1), border: `1px solid ${alpha(DARK_COLORS.error, 0.3)}` }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Chip 
                    label={discount.benefit_name || discount.discount_type || discount.discount_name || '할인'} 
                    size="small"
                    sx={{ bgcolor: alpha(DARK_COLORS.error, 0.2), color: DARK_COLORS.error, border: `1px solid ${alpha(DARK_COLORS.error, 0.3)}` }}
                  />
                  <Typography variant="h6" fontWeight="bold" sx={{ color: DARK_COLORS.error }}>
                    {discount.benefit_detail || discount.discount_value || discount.discount_detail || '-'}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary }}>{discount.benefit_detail || discount.discount_detail || discount.discount_value || discount.conditions || '-'}</Typography>
                {(discount.benefit_condition || discount.conditions) && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    조건: {discount.benefit_condition || discount.conditions}
                  </Typography>
                )}
                {discount.benefit_valid_period && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    유효기간: {discount.benefit_valid_period}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Alert severity="info" sx={{ bgcolor: alpha(DARK_COLORS.info, 0.1), color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>할인 혜택이 없습니다.</Alert>
        )}
      </Paper>

      {/* 4-b) 사은품(GWP) */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: DARK_COLORS.cardBg, border: `1px solid ${DARK_COLORS.border}`, borderRadius: 3, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)' }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', color: '#FFFFFF' }}>
          <CardGiftcardIcon sx={{ mr: 1, color: '#FFFFFF' }} /> 사은품 ({liveData.benefits?.gifts?.length || 0}개)
        </Typography>
        <Divider sx={{ mb: 2, borderColor: DARK_COLORS.border }} />
        
        {liveData.benefits?.gifts && liveData.benefits.gifts.length > 0 ? (
          liveData.benefits.gifts.map((gift, index) => (
            <Card key={index} sx={{ mb: 1.5, bgcolor: alpha(DARK_COLORS.success, 0.1), border: `1px solid ${alpha(DARK_COLORS.success, 0.3)}` }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Chip label={gift.benefit_name || gift.gift_type || gift.gift_name || '사은품'} sx={{ bgcolor: alpha(DARK_COLORS.success, 0.2), color: DARK_COLORS.success, border: `1px solid ${alpha(DARK_COLORS.success, 0.3)}` }} size="small" />
                  {(gift.quantity_limit || gift.quantity_limit_text) && (
                    <Chip label={gift.quantity_limit || gift.quantity_limit_text} sx={{ bgcolor: alpha(DARK_COLORS.warning, 0.2), color: DARK_COLORS.warning, border: `1px solid ${alpha(DARK_COLORS.warning, 0.3)}` }} size="small" />
                  )}
                </Stack>
                <Typography variant="body1" fontWeight="bold" sx={{ color: DARK_COLORS.text.primary }}>
                  {gift.benefit_name || gift.gift_name || '사은품'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: DARK_COLORS.text.primary }}>
                  {gift.benefit_detail || gift.gift_detail || gift.gift_condition || '-'}
                </Typography>
                {(gift.benefit_condition || gift.gift_condition) && (
                  <Typography variant="body2" sx={{ mt: 0.5, color: DARK_COLORS.text.secondary }}>
                    조건: {gift.benefit_condition || gift.gift_condition}
                  </Typography>
                )}
                {gift.gift_quantity && (
                  <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>
                    수량: {gift.gift_quantity}개
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Alert severity="info" sx={{ bgcolor: alpha(DARK_COLORS.info, 0.1), color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>사은품이 없습니다.</Alert>
        )}
      </Paper>

      {/* 4-c) 쿠폰/적립 */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: DARK_COLORS.cardBg, border: `1px solid ${DARK_COLORS.border}`, borderRadius: 3, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)' }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', color: '#FFFFFF' }}>
          🎟️ 쿠폰/적립 ({liveData.benefits?.coupons?.length || 0}개)
        </Typography>
        <Divider sx={{ mb: 2, borderColor: DARK_COLORS.border }} />
        
        {liveData.benefits?.coupons && liveData.benefits.coupons.length > 0 ? (
          liveData.benefits.coupons.map((coupon, index) => (
            <Card key={index} sx={{ mb: 1.5, bgcolor: alpha(DARK_COLORS.secondary, 0.1), border: `1px solid ${alpha(DARK_COLORS.secondary, 0.3)}` }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Chip 
                    label={coupon.benefit_name || coupon.coupon_type || '쿠폰'} 
                    size="small"
                    sx={{
                      bgcolor: alpha(DARK_COLORS.secondary, 0.2),
                      color: DARK_COLORS.secondary,
                      border: `1px solid ${alpha(DARK_COLORS.secondary, 0.3)}`,
                      fontWeight: 600
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold" sx={{ color: DARK_COLORS.secondary }}>
                    {coupon.benefit_detail || coupon.coupon_value || '-'}
                  </Typography>
                </Stack>
                <Typography variant="body1" fontWeight="bold" sx={{ color: DARK_COLORS.text.primary }}>
                  {coupon.benefit_name || coupon.coupon_name || '쿠폰'}
                </Typography>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  {(coupon.benefit_condition || coupon.issue_condition) && (
                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>
                        조건: {coupon.benefit_condition || coupon.issue_condition}
                      </Typography>
                    </Grid>
                  )}
                  {coupon.usage_condition && (
                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary }}>
                        사용: {coupon.usage_condition}
                      </Typography>
                    </Grid>
                  )}
                  {(coupon.benefit_valid_period || coupon.reward_detail) && (
                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: DARK_COLORS.primary, fontWeight: 600 }}>
                        {coupon.benefit_valid_period || coupon.reward_detail}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          ))
        ) : (
          <Alert severity="info" sx={{ bgcolor: alpha(DARK_COLORS.info, 0.1), color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>쿠폰이 없습니다.</Alert>
        )}
      </Paper>

      {/* 4-d) 배송 혜택 */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: DARK_COLORS.cardBg, border: `1px solid ${DARK_COLORS.border}`, borderRadius: 3, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)' }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', color: '#FFFFFF' }}>
          <LocalShippingIcon sx={{ mr: 1, color: '#FFFFFF' }} /> 배송 혜택 ({liveData.benefits?.delivery?.length || liveData.benefits?.shipping?.length || 0}개)
        </Typography>
        <Divider sx={{ mb: 2, borderColor: DARK_COLORS.border }} />
        
        {(liveData.benefits?.delivery && liveData.benefits.delivery.length > 0) || 
         (liveData.benefits?.shipping && liveData.benefits.shipping.length > 0) ? (
          (liveData.benefits?.delivery || liveData.benefits?.shipping || []).map((shipping, index) => (
            <Alert key={index} severity="info" sx={{ mb: 1, bgcolor: alpha(DARK_COLORS.info, 0.1), color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>
              <Typography variant="body1" fontWeight="bold">
                {shipping.benefit_name || shipping.shipping_benefit || '배송 혜택'}
              </Typography>
              <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary }}>
                {shipping.benefit_detail || shipping.shipping_detail || '-'}
              </Typography>
              {(shipping.benefit_condition || shipping.shipping_condition) && (
                <Typography variant="caption">조건: {shipping.benefit_condition || shipping.shipping_condition}</Typography>
              )}
            </Alert>
          ))
        ) : (
          <Alert severity="info" sx={{ bgcolor: alpha(DARK_COLORS.info, 0.1), color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}>배송 혜택이 없습니다.</Alert>
        )}
      </Paper>
          </>
        );
      })()}

      {/* ========== 3) 신규 수집 데이터 ========== */}
      
      {/* 쿠폰 정보 (신규) */}
      {liveData.coupons_new && liveData.coupons_new.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: DARK_COLORS.cardBg, border: `1px solid ${DARK_COLORS.border}`, borderRadius: 3, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', color: DARK_COLORS.text.primary }}>
            <LocalOfferIcon sx={{ mr: 1 }} /> 🎟️ 쿠폰 정보
          </Typography>
          <Divider sx={{ mb: 2, borderColor: DARK_COLORS.border }} />
          
          <Grid container spacing={2}>
            {liveData.coupons_new.map((coupon, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', border: '2px solid #ff9800' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {coupon.discount_rate && `${coupon.discount_rate}% 할인`}
                      {coupon.discount_amount && `${coupon.discount_amount.toLocaleString()}원 할인`}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {coupon.coupon_name}
                    </Typography>
                    <Chip 
                      label={coupon.coupon_type || '할인쿠폰'} 
                      size="small" 
                      sx={{ bgcolor: alpha(DARK_COLORS.warning, 0.2), color: DARK_COLORS.warning, border: `1px solid ${alpha(DARK_COLORS.warning, 0.3)}` }} 
                      sx={{ mt: 1 }}
                    />
                    {coupon.min_purchase_amount && (
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        최소 구매: {coupon.min_purchase_amount.toLocaleString()}원
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* 라이브 소개 (신규) */}
      {liveData.intro && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: DARK_COLORS.cardBg, border: `1px solid ${DARK_COLORS.border}`, borderRadius: 3, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', color: DARK_COLORS.text.primary }}>
            <InfoIcon sx={{ mr: 1 }} /> 📺 라이브 소개
          </Typography>
          <Divider sx={{ mb: 2, borderColor: DARK_COLORS.border }} />
          
          {liveData.intro.intro_title && (
            <Typography variant="h5" sx={{ color: DARK_COLORS.text.primary }} gutterBottom fontWeight="bold" sx={{ color: DARK_COLORS.text.primary }}>
              {liveData.intro.intro_title}
            </Typography>
          )}
          
          {liveData.intro.intro_description && (
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
              {liveData.intro.intro_description}
            </Typography>
          )}
          
          {liveData.intro.intro_highlights && JSON.parse(liveData.intro.intro_highlights || '[]').length > 0 && (
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {JSON.parse(liveData.intro.intro_highlights).map((highlight, idx) => (
                <Chip key={idx} label={highlight} color="primary" />
              ))}
            </Stack>
          )}
          
          {liveData.intro.host_name && (
            <Box sx={{ mt: 2, p: 2, bgcolor: alpha(DARK_COLORS.cardHoverBg, 0.5), border: `1px solid ${DARK_COLORS.border}`, borderRadius: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">진행자</Typography>
              <Typography variant="body1" fontWeight="bold">{liveData.intro.host_name}</Typography>
            </Box>
          )}
        </Paper>
      )}

      {/* 통계 정보 (신규) */}
      {liveData.statistics && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: DARK_COLORS.cardBg, border: `1px solid ${DARK_COLORS.border}`, borderRadius: 3, boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)' }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', color: DARK_COLORS.text.primary }}>
            <EventIcon sx={{ mr: 1 }} /> 📊 통계 정보
          </Typography>
          <Divider sx={{ mb: 2, borderColor: DARK_COLORS.border }} />
          
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" color="primary">
                  {liveData.statistics.view_count?.toLocaleString() || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">조회수</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" sx={{ bgcolor: alpha(DARK_COLORS.error, 0.2), color: DARK_COLORS.error, border: `1px solid ${alpha(DARK_COLORS.error, 0.3)}` }}>
                  {liveData.statistics.like_count?.toLocaleString() || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">좋아요</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" sx={{ bgcolor: alpha(DARK_COLORS.success, 0.2), color: DARK_COLORS.success, border: `1px solid ${alpha(DARK_COLORS.success, 0.3)}` }}>
                  {liveData.statistics.comment_count?.toLocaleString() || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">댓글</Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h4" sx={{ bgcolor: alpha(DARK_COLORS.warning, 0.2), color: DARK_COLORS.warning, border: `1px solid ${alpha(DARK_COLORS.warning, 0.3)}` }}>
                  {liveData.statistics.share_count?.toLocaleString() || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">공유</Typography>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* 실시간 댓글 (신규) */}
      {liveData.comments && liveData.comments.length > 0 && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
              💬 실시간 댓글 ({liveData.comments.length}개)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
              {liveData.comments.map((comment, index) => (
                <Card key={index} sx={{ mb: 2, p: 2 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Chip 
                      label={comment.comment_type || 'comment'} 
                      size="small" 
                      color={comment.comment_type === 'question' ? 'warning' : 'default'}
                    />
                    {comment.user_name && (
                      <Typography variant="caption" fontWeight="bold">
                        {comment.user_name}
                      </Typography>
                    )}
                  </Stack>
                  <Typography variant="body2" sx={{ color: DARK_COLORS.text.primary }}>
                    {comment.comment_text}
                  </Typography>
                  {comment.like_count > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      ❤️ {comment.like_count}
                    </Typography>
                  )}
                </Card>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      {/* FAQ (신규) */}
      {liveData.faqs && liveData.faqs.length > 0 && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
              ❓ 자주 묻는 질문 ({liveData.faqs.length}개)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {liveData.faqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {faq.category && (
                      <Chip label={faq.category} size="small" color="info" />
                    )}
                    <Typography variant="body1" fontWeight="bold">
                      Q: {faq.question}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    A: {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {/* 이미지 갤러리 (신규) */}
      {liveData.images && liveData.images.length > 0 && (
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
              🖼️ 이미지 갤러리 ({liveData.images.length}개)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {liveData.images.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <Box
                      component="img"
                      src={image.image_url}
                      alt={image.image_alt || `이미지 ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <CardContent>
                      <Chip 
                        label={image.image_type || 'image'} 
                        size="small" 
                        color="primary"
                      />
                      {image.image_alt && (
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                          {image.image_alt}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {/* 하단 버튼 */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button 
          variant="outlined" 
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/search')}
        >
          목록으로 돌아가기
        </Button>
      </Box>
    </Container>
    </Box>
  );
};

export default LiveBroadcastDetail;
