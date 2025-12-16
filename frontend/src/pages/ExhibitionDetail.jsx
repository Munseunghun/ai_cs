/**
 * 입점몰 이벤트, 전시 상세 페이지
 * 네이버 스마트스토어 전시 페이지 구조 참고
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
  CardMedia,
  Button,
  Stack,
  CircularProgress,
  alpha,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as LocalOfferIcon,
  CardGiftcard as CardGiftcardIcon,
  OpenInNew as OpenInNewIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

// API 기본 URL
const getApiBaseUrl = () => {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
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
  error: '#EF4444',
  text: {
    primary: '#F9FAFB',
    secondary: '#9CA3AF',
    disabled: '#6B7280',
  },
  border: '#2D3748',
};

const ExhibitionDetail = () => {
  const { liveId } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEventData = async () => {
      try {
        setLoading(true);
        console.log('🔍 ExhibitionDetail - liveId:', liveId);
        
        if (!liveId || liveId === 'undefined' || liveId === 'null') {
          console.error('❌ 유효하지 않은 liveId:', liveId);
          setEventData(null);
          setLoading(false);
          return;
        }
        
        const apiUrl = `${API_BASE_URL}/api/events/${encodeURIComponent(liveId)}`;
        console.log('📡 API 호출:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ 이벤트 데이터 로드 성공:', data);
        setEventData(data);
      } catch (error) {
        console.error('❌ 이벤트 데이터 로드 실패:', error);
        setEventData(null);
      } finally {
        setLoading(false);
      }
    };

    loadEventData();
  }, [liveId]);

  // 로딩 중
  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: DARK_COLORS.background, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <CircularProgress sx={{ color: DARK_COLORS.primary }} />
      </Box>
    );
  }

  // 데이터 없음
  if (!eventData) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: DARK_COLORS.background, p: 3 }}>
        <Container maxWidth="lg">
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: DARK_COLORS.cardBg }}>
            <Typography variant="h5" gutterBottom sx={{ color: DARK_COLORS.text.primary }}>
              이벤트를 찾을 수 없습니다
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/exhibitions')}
              sx={{ mt: 2 }}
            >
              목록으로 돌아가기
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  // 데이터 추출
  const _v_platform_name = eventData.platform_name || '알 수 없음';
  const _v_brand_name = eventData.brand_name || '알 수 없음';
  const _v_event_title = eventData.event_title || eventData.title || '제목 없음';
  const _v_source_url = eventData.meta?.source_url || eventData.metadata?.source_url || eventData.source_url || eventData.event_url;
  const _v_collected_at = eventData.collected_at || eventData.created_at;
  
  // 상품 목록
  const _v_products = eventData.products || [];
  
  // 혜택 목록
  const _v_benefits = eventData.benefits || [];
  
  // 쿠폰 목록
  const _v_coupons = eventData.coupons_new || eventData.coupons || [];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: DARK_COLORS.background, pb: 6 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* 상단 네비게이션 */}
        <Box sx={{ mb: 3 }}>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/exhibitions')}
            sx={{ color: DARK_COLORS.text.secondary }}
          >
            목록으로
          </Button>
        </Box>

        {/* ========== 1. 이벤트 헤더 ========== */}
        <Paper sx={{ 
          p: 3, 
          mb: 3, 
          bgcolor: DARK_COLORS.cardBg, 
          border: `1px solid ${DARK_COLORS.border}`,
          borderRadius: 2
        }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Chip 
              label={_v_platform_name} 
              color="primary" 
              size="small"
            />
            <Chip 
              label={_v_brand_name} 
              variant="outlined"
              size="small"
              sx={{ color: DARK_COLORS.text.primary, borderColor: DARK_COLORS.border }}
            />
          </Stack>

          <Typography 
            variant="h4" 
            gutterBottom 
            fontWeight="bold"
            sx={{ color: DARK_COLORS.text.primary, mb: 2 }}
          >
            {_v_event_title}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<OpenInNewIcon />}
              onClick={() => {
                if (_v_source_url && _v_source_url !== 'about:blank' && _v_source_url.trim() !== '') {
                  const newWindow = window.open('', '_blank');
                  if (newWindow) {
                    newWindow.location.href = _v_source_url;
                  } else {
                    alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
                  }
                } else {
                  alert('이벤트 페이지 URL을 찾을 수 없습니다.');
                }
              }}
              sx={{ 
                bgcolor: DARK_COLORS.primary,
                '&:hover': { bgcolor: alpha(DARK_COLORS.primary, 0.8) }
              }}
            >
              이벤트 페이지 보기
            </Button>
            <IconButton sx={{ color: DARK_COLORS.text.secondary }}>
              <FavoriteIcon />
            </IconButton>
            <IconButton sx={{ color: DARK_COLORS.text.secondary }}>
              <ShareIcon />
            </IconButton>
          </Stack>
        </Paper>

        {/* ========== 2. 혜택 정보 ========== */}
        {_v_benefits.length > 0 && (
          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            bgcolor: alpha(DARK_COLORS.warning, 0.1),
            border: `2px solid ${DARK_COLORS.warning}`,
            borderRadius: 2
          }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <CardGiftcardIcon sx={{ color: DARK_COLORS.warning }} />
              <Typography variant="h6" fontWeight="bold" sx={{ color: DARK_COLORS.text.primary }}>
                구매 금액대별 혜택
              </Typography>
            </Stack>
            
            <Grid container spacing={2}>
              {_v_benefits.map((benefit, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ 
                    height: '100%',
                    bgcolor: DARK_COLORS.cardBg,
                    border: `1px solid ${DARK_COLORS.border}`,
                    '&:hover': {
                      bgcolor: DARK_COLORS.cardHoverBg,
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s'
                    }
                  }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
                        {benefit.benefit_name || benefit.benefit_title || '혜택'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, mb: 1 }}>
                        {benefit.benefit_description || benefit.description || ''}
                      </Typography>
                      {benefit.benefit_condition && (
                        <Chip 
                          label={benefit.benefit_condition}
                          size="small"
                          sx={{ 
                            mt: 1,
                            bgcolor: alpha(DARK_COLORS.success, 0.2),
                            color: DARK_COLORS.success
                          }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* ========== 3. 쿠폰 정보 ========== */}
        {_v_coupons.length > 0 && (
          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            bgcolor: DARK_COLORS.cardBg,
            border: `1px solid ${DARK_COLORS.border}`,
            borderRadius: 2
          }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <LocalOfferIcon sx={{ color: DARK_COLORS.info }} />
              <Typography variant="h6" fontWeight="bold" sx={{ color: DARK_COLORS.text.primary }}>
                쿠폰 혜택
              </Typography>
            </Stack>
            
            <Grid container spacing={2}>
              {_v_coupons.map((coupon, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ 
                    height: '100%',
                    bgcolor: alpha(DARK_COLORS.info, 0.05),
                    border: `2px dashed ${DARK_COLORS.info}`,
                    '&:hover': {
                      bgcolor: alpha(DARK_COLORS.info, 0.1),
                      transform: 'scale(1.02)',
                      transition: 'all 0.3s'
                    }
                  }}>
                    <CardContent>
                      <Typography variant="h5" color="primary" gutterBottom fontWeight="bold">
                        {coupon.discount_rate && `${coupon.discount_rate}% 할인`}
                        {coupon.discount_amount && `${coupon.discount_amount.toLocaleString()}원 할인`}
                      </Typography>
                      <Typography variant="body2" gutterBottom sx={{ color: DARK_COLORS.text.primary }}>
                        {coupon.coupon_name}
                      </Typography>
                      <Chip 
                        label={coupon.coupon_type || '할인쿠폰'} 
                        size="small" 
                        sx={{ 
                          mt: 1,
                          bgcolor: alpha(DARK_COLORS.warning, 0.2), 
                          color: DARK_COLORS.warning 
                        }} 
                      />
                      {coupon.min_purchase_amount && (
                        <Typography variant="caption" display="block" sx={{ mt: 1, color: DARK_COLORS.text.secondary }}>
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

        {/* ========== 4. 상품 목록 ========== */}
        <Paper sx={{ 
          p: 3, 
          mb: 3, 
          bgcolor: DARK_COLORS.cardBg,
          border: `1px solid ${DARK_COLORS.border}`,
          borderRadius: 2
        }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <ShoppingCartIcon sx={{ color: DARK_COLORS.success }} />
            <Typography variant="h6" fontWeight="bold" sx={{ color: DARK_COLORS.text.primary }}>
              행사 상품 ({_v_products.length}개)
            </Typography>
          </Stack>
          
          {_v_products.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ color: DARK_COLORS.text.secondary }}>
                등록된 상품이 없습니다
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {_v_products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ 
                    height: '100%',
                    bgcolor: DARK_COLORS.cardBg,
                    border: `1px solid ${DARK_COLORS.border}`,
                    '&:hover': {
                      bgcolor: DARK_COLORS.cardHoverBg,
                      transform: 'translateY(-8px)',
                      boxShadow: `0 8px 24px ${alpha(DARK_COLORS.primary, 0.3)}`,
                      transition: 'all 0.3s'
                    }
                  }}>
                    {/* 상품 이미지 */}
                    {(product.product_image_url || product.product_image) && (
                      <CardMedia
                        component="img"
                        height="240"
                        image={product.product_image_url || product.product_image}
                        alt={product.product_name || '상품 이미지'}
                        sx={{ 
                          objectFit: 'cover',
                          bgcolor: DARK_COLORS.cardHoverBg
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    
                    <CardContent>
                      {/* 브랜드명 */}
                      {product.brand_name && (
                        <Typography variant="caption" sx={{ color: DARK_COLORS.text.secondary, mb: 0.5, display: 'block' }}>
                          {product.brand_name}
                        </Typography>
                      )}
                      
                      {/* 상품명 */}
                      <Typography 
                        variant="body1" 
                        fontWeight="bold" 
                        gutterBottom
                        sx={{ 
                          color: DARK_COLORS.text.primary,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          minHeight: '48px'
                        }}
                      >
                        {product.product_name || '상품명 없음'}
                      </Typography>
                      
                      {/* 가격 정보 */}
                      <Box sx={{ mt: 2 }}>
                        {product.discount_rate && product.discount_rate > 0 && (
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                            <Chip 
                              label={`${product.discount_rate}%`}
                              size="small"
                              sx={{ 
                                bgcolor: alpha(DARK_COLORS.error, 0.2),
                                color: DARK_COLORS.error,
                                fontWeight: 'bold'
                              }}
                            />
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: DARK_COLORS.text.secondary,
                                textDecoration: 'line-through'
                              }}
                            >
                              {product.original_price?.toLocaleString()}원
                            </Typography>
                          </Stack>
                        )}
                        
                        <Typography 
                          variant="h6" 
                          fontWeight="bold"
                          sx={{ color: DARK_COLORS.text.primary }}
                        >
                          {product.price?.toLocaleString() || product.original_price?.toLocaleString()}원
                        </Typography>
                      </Box>
                      
                      {/* 상품 URL */}
                      {product.product_url && (
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => {
                            const newWindow = window.open('', '_blank');
                            if (newWindow) {
                              newWindow.location.href = product.product_url;
                            }
                          }}
                          sx={{ 
                            mt: 2,
                            color: DARK_COLORS.primary,
                            borderColor: DARK_COLORS.primary,
                            '&:hover': {
                              bgcolor: alpha(DARK_COLORS.primary, 0.1),
                              borderColor: DARK_COLORS.primary
                            }
                          }}
                        >
                          상품 보기
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

        {/* ========== 5. 이벤트 정보 ========== */}
        <Paper sx={{ 
          p: 3, 
          bgcolor: DARK_COLORS.cardBg,
          border: `1px solid ${DARK_COLORS.border}`,
          borderRadius: 2
        }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: DARK_COLORS.text.primary }}>
            이벤트 정보
          </Typography>
          <Divider sx={{ mb: 2, borderColor: DARK_COLORS.border }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary }}>
                플랫폼
              </Typography>
              <Typography variant="body1" sx={{ color: DARK_COLORS.text.primary, fontWeight: 'bold' }}>
                {_v_platform_name}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary }}>
                브랜드
              </Typography>
              <Typography variant="body1" sx={{ color: DARK_COLORS.text.primary, fontWeight: 'bold' }}>
                {_v_brand_name}
              </Typography>
            </Grid>
            
            {_v_collected_at && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary }}>
                  수집 일시
                </Typography>
                <Typography variant="body1" sx={{ color: DARK_COLORS.text.primary }}>
                  {new Date(_v_collected_at).toLocaleString('ko-KR')}
                </Typography>
              </Grid>
            )}
            
            {_v_source_url && (
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: DARK_COLORS.text.secondary, mb: 1 }}>
                  원천 URL
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: DARK_COLORS.info,
                    wordBreak: 'break-all',
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                  onClick={() => {
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      newWindow.location.href = _v_source_url;
                    }
                  }}
                >
                  {_v_source_url}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default ExhibitionDetail;
