import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Button,
  Divider,
  Paper,
  IconButton,
  Breadcrumbs,
  Link,
  Stack,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  ArrowBack,
  Share,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  LocalOffer,
  CardGiftcard,
  NavigateNext,
  Home,
} from '@mui/icons-material';
import axios from 'axios';

/**
 * 입점몰 이벤트 상세 보기 페이지
 * 
 * 네이버 스마트스토어 형식과 동일한 레이아웃:
 * - 상단: 브레드크럼, 뒤로가기
 * - 좌측: 이벤트 대표 이미지
 * - 우측: 이벤트 정보, 혜택, 쿠폰
 * - 하단: 상품 목록 (그리드)
 */
const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  // 상태 관리
  const [eventData, setEventData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // 데이터 로드
  useEffect(() => {
    fetchEventDetail();
  }, [eventId]);

  /**
   * 이벤트 상세 정보 조회
   */
  const fetchEventDetail = async () => {
    try {
      setLoading(true);
      
      // API 호출 (실제 구현 시 백엔드 API 연동)
      const response = await axios.get(`/api/events/${eventId}`);
      
      setEventData(response.data.event);
      setProducts(response.data.products || []);
      setError(null);
    } catch (err) {
      console.error('이벤트 정보 조회 실패:', err);
      setError('이벤트 정보를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 뒤로가기
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  /**
   * 공유하기
   */
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData?.title,
        text: eventData?.description,
        url: window.location.href,
      });
    } else {
      // 클립보드 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  /**
   * 찜하기 토글
   */
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: 백엔드 API 호출
  };

  /**
   * 가격 포맷팅
   */
  const formatPrice = (price) => {
    return price?.toLocaleString('ko-KR') || '0';
  };

  /**
   * 할인율 계산
   */
  const calculateDiscountRate = (original, discount) => {
    if (!original || !discount) return 0;
    return Math.round(((original - discount) / original) * 100);
  };

  // 로딩 중
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={600} />
      </Container>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // 데이터 없음
  if (!eventData) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="warning">이벤트 정보를 찾을 수 없습니다.</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pb: 4 }}>
      {/* 상단 네비게이션 */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {/* 브레드크럼 */}
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            sx={{ mb: 2 }}
          >
            <Link
              color="inherit"
              href="/"
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            >
              <Home sx={{ mr: 0.5 }} fontSize="small" />
              홈
            </Link>
            <Link color="inherit" href="/events" sx={{ textDecoration: 'none' }}>
              이벤트
            </Link>
            <Typography color="text.primary">{eventData.brand}</Typography>
          </Breadcrumbs>

          {/* 뒤로가기 & 액션 버튼 */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Button
              startIcon={<ArrowBack />}
              onClick={handleGoBack}
              sx={{ color: 'text.secondary' }}
            >
              목록으로
            </Button>
            
            <Stack direction="row" spacing={1}>
              <IconButton onClick={handleShare} size="small">
                <Share />
              </IconButton>
              <IconButton onClick={handleToggleFavorite} size="small">
                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {/* 좌측: 이벤트 대표 이미지 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ position: 'sticky', top: 80 }}>
              <Card>
                <CardMedia
                  component="img"
                  image={eventData.mainImage || '/placeholder-image.jpg'}
                  alt={eventData.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 700,
                    objectFit: 'cover',
                  }}
                />
              </Card>
            </Paper>
          </Grid>

          {/* 우측: 이벤트 정보 */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              {/* 브랜드 */}
              <Typography
                variant="overline"
                color="primary"
                sx={{ fontWeight: 600, fontSize: '0.9rem' }}
              >
                {eventData.brand}
              </Typography>

              {/* 이벤트 타이틀 */}
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mt: 1, mb: 2, lineHeight: 1.3 }}
              >
                {eventData.title}
              </Typography>

              {/* 이벤트 설명 */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.8 }}
              >
                {eventData.description}
              </Typography>

              {/* 이벤트 기간 */}
              <Box sx={{ mb: 3 }}>
                <Chip
                  label={`${eventData.startDate} ~ ${eventData.endDate}`}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* 혜택 정보 */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}
                >
                  <LocalOffer sx={{ mr: 1, color: 'primary.main' }} />
                  혜택 정보
                </Typography>

                {/* 금액대별 혜택 */}
                {eventData.benefits?.map((benefit, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      bgcolor: '#f8f9fa',
                      borderRadius: 2,
                      border: '1px solid #e9ecef',
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {benefit.condition}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* 쿠폰 정보 */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}
                >
                  <CardGiftcard sx={{ mr: 1, color: 'error.main' }} />
                  쿠폰 혜택
                </Typography>

                <Stack spacing={1.5}>
                  {eventData.coupons?.map((coupon, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        bgcolor: '#fff3e0',
                        borderRadius: 2,
                        border: '2px dashed #ff9800',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {coupon.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {coupon.description}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: '#ff9800',
                          '&:hover': { bgcolor: '#f57c00' },
                        }}
                      >
                        받기
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* 이벤트 URL */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  이벤트 페이지
                </Typography>
                <Link
                  href={eventData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'block',
                    p: 2,
                    bgcolor: '#f8f9fa',
                    borderRadius: 1,
                    textDecoration: 'none',
                    color: 'primary.main',
                    fontSize: '0.875rem',
                    wordBreak: 'break-all',
                    '&:hover': { bgcolor: '#e9ecef' },
                  }}
                >
                  {eventData.url}
                </Link>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* 상품 목록 섹션 */}
        {products.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Paper sx={{ p: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center' }}
              >
                <ShoppingCart sx={{ mr: 1, color: 'primary.main' }} />
                이벤트 상품 ({products.length}개)
              </Typography>

              <Grid container spacing={3}>
                {products.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 6,
                        },
                      }}
                    >
                      {/* 상품 이미지 */}
                      <CardMedia
                        component="img"
                        height="300"
                        image={product.product_image || '/placeholder-product.jpg'}
                        alt={product.product_name}
                        sx={{ objectFit: 'cover' }}
                      />

                      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                        {/* 상품명 */}
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: 1.4,
                            minHeight: '2.8em',
                          }}
                        >
                          {product.product_name}
                        </Typography>

                        {/* 상품 설명 */}
                        {product.product_description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              fontSize: '0.813rem',
                            }}
                          >
                            {product.product_description}
                          </Typography>
                        )}

                        {/* 가격 정보 */}
                        <Box sx={{ mt: 'auto' }}>
                          {/* 원가 */}
                          {product.original_price && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                textDecoration: 'line-through',
                                fontSize: '0.875rem',
                              }}
                            >
                              {formatPrice(product.original_price)}원
                            </Typography>
                          )}

                          {/* 할인가 */}
                          {product.discount_price && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: 700, mr: 1 }}
                              >
                                {formatPrice(product.discount_price)}원
                              </Typography>
                              {product.discount_rate && (
                                <Chip
                                  label={`${product.discount_rate}%`}
                                  size="small"
                                  sx={{
                                    bgcolor: '#666',
                                    color: 'white',
                                    fontWeight: 700,
                                    height: 24,
                                  }}
                                />
                              )}
                            </Box>
                          )}

                          {/* 최종혜택가 */}
                          {product.final_price && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography
                                variant="body2"
                                color="error"
                                sx={{ fontWeight: 600, mr: 0.5 }}
                              >
                                최종혜택가
                              </Typography>
                              <Typography
                                variant="h5"
                                color="error"
                                sx={{ fontWeight: 700, mr: 1 }}
                              >
                                {formatPrice(product.final_price)}원
                              </Typography>
                              {product.final_discount_rate && (
                                <Chip
                                  label={`${product.final_discount_rate}%`}
                                  size="small"
                                  color="error"
                                  sx={{
                                    fontWeight: 700,
                                    height: 24,
                                  }}
                                />
                              )}
                            </Box>
                          )}

                          {/* 증정품 정보 */}
                          {product.gift_info && (
                            <Box
                              sx={{
                                mt: 1.5,
                                p: 1,
                                bgcolor: '#fff3e0',
                                borderRadius: 1,
                                borderLeft: '3px solid #ff9800',
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color: '#ff9800',
                                  fontWeight: 600,
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                🎁 {product.gift_info}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default EventDetail;

