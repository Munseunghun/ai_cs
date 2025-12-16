# 인수인계용 산출물 03: API 명세서

**문서 버전**: 1.0
**작성일**: 2025-12-08
**프로젝트명**: AI CS 시스템
**API 버전**: v1

---

## 📋 목차

1. [API 개요](#1-api-개요)
2. [인증 API](#2-인증-api)
3. [대시보드 API](#3-대시보드-api)
4. [이벤트 API](#4-이벤트-api)
5. [관리자 API](#5-관리자-api)
6. [즐겨찾기 API](#6-즐겨찾기-api)
7. [에러 코드](#7-에러-코드)
8. [공통 사항](#8-공통-사항)

---

## 1. API 개요

### 1.1 Base URL

**프로덕션**: `https://ai-cs-backend.onrender.com`
**개발**: `http://localhost:3001`

### 1.2 인증 방식

**JWT (JSON Web Token)** 기반 인증

#### 인증 헤더
```
Authorization: Bearer {access_token}
```

#### 토큰 유효기간
- Access Token: 24시간

### 1.3 요청/응답 형식

#### Content-Type
```
Content-Type: application/json
```

#### 공통 응답 구조

**성공 응답**:
```json
{
  "success": true,
  "data": { ... },
  "message": "성공 메시지 (선택)"
}
```

**실패 응답**:
```json
{
  "success": false,
  "message": "에러 메시지",
  "error": {
    "code": "ERROR_CODE",
    "details": "상세 정보 (선택)"
  }
}
```

### 1.4 HTTP 상태 코드

| 코드 | 설명 |
|------|------|
| 200 | OK - 요청 성공 |
| 201 | Created - 리소스 생성 성공 |
| 400 | Bad Request - 잘못된 요청 |
| 401 | Unauthorized - 인증 실패 |
| 403 | Forbidden - 권한 없음 |
| 404 | Not Found - 리소스 없음 |
| 429 | Too Many Requests - 요청 제한 초과 |
| 500 | Internal Server Error - 서버 오류 |

### 1.5 Rate Limiting

#### 일반 API
- **제한**: 100 요청 / 15분
- **헤더**:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1638360000
  ```

#### 대시보드 API
- **제한**: 30 요청 / 15분

---

## 2. 인증 API

### 2.1 로그인

사용자 인증 및 JWT 토큰 발급

#### 요청

**Endpoint**: `POST /api/auth/login`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**예시**:
```json
{
  "username": "agent001",
  "password": "agent001"
}
```

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "user_id": 1,
      "username": "agent001",
      "full_name": "상담원1",
      "email": "agent001@amorepacific.com",
      "role": "AGENT",
      "department": "CS팀",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "로그인 성공"
}
```

**실패 (401 Unauthorized)**:
```json
{
  "success": false,
  "message": "아이디 또는 비밀번호가 올바르지 않습니다.",
  "error": {
    "code": "INVALID_CREDENTIALS"
  }
}
```

#### 에러 코드

| 코드 | 설명 |
|------|------|
| INVALID_CREDENTIALS | 잘못된 인증 정보 |
| ACCOUNT_LOCKED | 계정 잠김 |
| ACCOUNT_INACTIVE | 비활성 계정 |

---

### 2.2 현재 사용자 정보 조회

로그인한 사용자의 정보 조회

#### 요청

**Endpoint**: `GET /api/auth/me`

**Headers**:
```
Authorization: Bearer {access_token}
```

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "username": "agent001",
    "full_name": "상담원1",
    "email": "agent001@amorepacific.com",
    "role": "AGENT",
    "department": "CS팀",
    "last_login": "2025-12-08T08:00:00Z",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

**실패 (401 Unauthorized)**:
```json
{
  "success": false,
  "message": "인증이 필요합니다.",
  "error": {
    "code": "AUTHENTICATION_REQUIRED"
  }
}
```

---

### 2.3 로그아웃

사용자 로그아웃 (토큰 무효화는 클라이언트에서 처리)

#### 요청

**Endpoint**: `POST /api/auth/logout`

**Headers**:
```
Authorization: Bearer {access_token}
```

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "message": "로그아웃 되었습니다."
}
```

---

## 3. 대시보드 API

### 3.1 대시보드 전체 데이터 조회

대시보드에 필요한 모든 통계 및 데이터를 한 번에 조회

#### 요청

**Endpoint**: `GET /api/dashboard`

**Headers**:
```
Authorization: Bearer {access_token}
```

**Query Parameters**: 없음

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": {
    "statistics": {
      "active_events": 42,
      "pending_events": 15,
      "total_channels": 8,
      "avg_discount": "25.50",
      "total_products": 756,
      "total_coupons": 42
    },
    "by_channel": [
      {
        "channel_name": "네이버",
        "channel_code": "NAVER",
        "event_count": 18,
        "active_count": 12,
        "pending_count": 6
      },
      {
        "channel_name": "카카오",
        "channel_code": "KAKAO",
        "event_count": 15,
        "active_count": 10,
        "pending_count": 5
      }
    ],
    "trend": [
      {
        "date": "2025-12-01",
        "count": 5
      },
      {
        "date": "2025-12-02",
        "count": 8
      },
      {
        "date": "2025-12-03",
        "count": 12
      }
    ],
    "urgent_events": [
      {
        "event_id": "uuid-1",
        "title": "라네즈 크림스킨 리필 기획전",
        "channel_name": "네이버",
        "end_date": "2025-12-08T23:59:59Z",
        "hours_left": 2,
        "discount_rate": 30.0
      }
    ],
    "popular_events": [
      {
        "event_id": "uuid-2",
        "title": "설화수 윤조에센스 특가",
        "channel_name": "카카오",
        "view_count": 1250,
        "favorite_count": 45,
        "discount_rate": 25.0
      }
    ]
  },
  "cached": true,
  "cache_expires_in": 285
}
```

#### 응답 필드 설명

**statistics** (통계 요약):
- `active_events`: 현재 진행 중인 이벤트 수
- `pending_events`: 예정된 이벤트 수
- `total_channels`: 활성 채널 수
- `avg_discount`: 평균 할인율 (%)
- `total_products`: 전체 상품 수
- `total_coupons`: 전체 쿠폰 수

**by_channel** (채널별 통계):
- `channel_name`: 채널명
- `channel_code`: 채널 코드
- `event_count`: 전체 이벤트 수
- `active_count`: 진행 중인 이벤트 수
- `pending_count`: 예정된 이벤트 수

**trend** (최근 7일 트렌드):
- `date`: 날짜 (YYYY-MM-DD)
- `count`: 신규 이벤트 수

**urgent_events** (긴급 이벤트):
- `event_id`: 이벤트 ID
- `title`: 이벤트 제목
- `channel_name`: 채널명
- `end_date`: 종료 일시
- `hours_left`: 남은 시간 (시간)
- `discount_rate`: 할인율 (%)

**popular_events** (인기 이벤트):
- `event_id`: 이벤트 ID
- `title`: 이벤트 제목
- `channel_name`: 채널명
- `view_count`: 조회수
- `favorite_count`: 즐겨찾기 수
- `discount_rate`: 할인율 (%)

#### 캐싱

- **캐시 TTL**: 5분 (300초)
- **캐시 키**: `dashboard:all`
- **응답 필드**:
  - `cached`: 캐시 데이터 여부
  - `cache_expires_in`: 캐시 만료까지 남은 시간 (초)

---

## 4. 이벤트 API

### 4.1 이벤트 검색

다양한 조건으로 이벤트 검색 및 필터링

#### 요청

**Endpoint**: `GET /api/events/search`

**Headers**:
```
Authorization: Bearer {access_token} (선택)
```

**Query Parameters**:

| 파라미터 | 타입 | 필수 | 설명 | 기본값 |
|---------|------|------|------|--------|
| keyword | string | N | 검색 키워드 (제목, 브랜드, 상품명) | - |
| channel | string | N | 채널 코드 (NAVER, KAKAO 등) | - |
| platform | string | N | 플랫폼 코드 | - |
| brand | string | N | 브랜드 코드 | - |
| status | string | N | 상태 (ACTIVE, PENDING, ENDED) | - |
| start_date | string | N | 시작일 (YYYY-MM-DD) | - |
| end_date | string | N | 종료일 (YYYY-MM-DD) | - |
| page | integer | N | 페이지 번호 (0부터 시작) | 0 |
| page_size | integer | N | 페이지 크기 (1-100) | 20 |
| sort_by | string | N | 정렬 기준 (latest, popular, ending) | latest |

**예시**:
```
GET /api/events/search?keyword=라네즈&channel=NAVER&status=ACTIVE&page=0&page_size=20
```

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "event_id": "uuid-1",
      "live_id": "REAL_NAVER_라네즈_1744150",
      "title": "라네즈 크림스킨 리필 기획전",
      "brand_name": "라네즈",
      "channel_name": "네이버",
      "platform_name": "네이버 쇼핑라이브",
      "start_date": "2025-12-08T14:00:00Z",
      "end_date": "2025-12-08T15:00:00Z",
      "status": "ACTIVE",
      "thumbnail_url": "https://...",
      "event_url": "https://view.shoppinglive.naver.com/replays/1744150",
      "discount_rate": 30.0,
      "benefit_summary": "신규회원 5,000원 쿠폰, 10만원 이상 사은품",
      "product_count": 18,
      "coupon_count": 1,
      "view_count": 1250,
      "like_count": 45,
      "comment_count": 6,
      "created_at": "2025-12-08T08:36:00Z",
      "updated_at": "2025-12-08T08:36:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 0,
    "page_size": 20,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

#### 응답 필드 설명

**이벤트 객체**:
- `event_id`: 이벤트 고유 ID (UUID)
- `live_id`: 라이브 방송 ID
- `title`: 이벤트 제목
- `brand_name`: 브랜드명
- `channel_name`: 채널명
- `platform_name`: 플랫폼명
- `start_date`: 시작 일시 (ISO 8601)
- `end_date`: 종료 일시 (ISO 8601)
- `status`: 상태 (ACTIVE, PENDING, ENDED)
- `thumbnail_url`: 썸네일 이미지 URL
- `event_url`: 이벤트 페이지 URL
- `discount_rate`: 최대 할인율 (%)
- `benefit_summary`: 혜택 요약
- `product_count`: 상품 수
- `coupon_count`: 쿠폰 수
- `view_count`: 조회수
- `like_count`: 좋아요 수
- `comment_count`: 댓글 수
- `created_at`: 생성 일시
- `updated_at`: 수정 일시

**pagination** (페이지네이션 정보):
- `total`: 전체 결과 수
- `page`: 현재 페이지 (0부터 시작)
- `page_size`: 페이지 크기
- `total_pages`: 전체 페이지 수
- `has_next`: 다음 페이지 존재 여부
- `has_prev`: 이전 페이지 존재 여부

---

### 4.2 이벤트 상세 조회

특정 이벤트의 상세 정보 조회

#### 요청

**Endpoint**: `GET /api/events/:event_id`

**Headers**:
```
Authorization: Bearer {access_token} (선택)
```

**Path Parameters**:
- `event_id`: 이벤트 ID (UUID 또는 live_id)

**예시**:
```
GET /api/events/REAL_NAVER_라네즈_1744150
```

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": {
    "basic_info": {
      "event_id": "uuid-1",
      "live_id": "REAL_NAVER_라네즈_1744150",
      "title": "라네즈 크림스킨 리필 기획전",
      "brand_name": "라네즈",
      "channel_name": "네이버",
      "platform_name": "네이버 쇼핑라이브",
      "start_date": "2025-12-08T14:00:00Z",
      "end_date": "2025-12-08T15:00:00Z",
      "status": "ACTIVE",
      "thumbnail_url": "https://...",
      "event_url": "https://view.shoppinglive.naver.com/replays/1744150"
    },
    "products": [
      {
        "product_id": "uuid-p1",
        "product_name": "크림스킨 리필 세트",
        "original_price": 70000,
        "sale_price": 49000,
        "discount_rate": 30.0,
        "product_url": "https://...",
        "image_url": "https://...",
        "stock_status": "IN_STOCK",
        "display_order": 1
      }
    ],
    "coupons": [
      {
        "coupon_id": "uuid-c1",
        "coupon_name": "신규회원 5,000원 쿠폰",
        "discount_type": "AMOUNT",
        "discount_value": 5000,
        "min_purchase_amount": 30000,
        "valid_from": "2025-12-08T00:00:00Z",
        "valid_until": "2025-12-31T23:59:59Z",
        "usage_limit": 1,
        "coupon_code": "NEW5000"
      }
    ],
    "benefits": [
      {
        "benefit_type": "FREE_GIFT",
        "benefit_description": "10만원 이상 구매 시 사은품 증정",
        "condition": "100000원 이상 구매"
      },
      {
        "benefit_type": "FREE_SHIPPING",
        "benefit_description": "무료배송",
        "condition": "3만원 이상 구매"
      }
    ],
    "cs_info": {
      "expected_questions": [
        {
          "question_id": "uuid-q1",
          "question": "리필 제품은 어떻게 사용하나요?",
          "answer": "본품 용기에 리필 제품을 끼워서 사용하시면 됩니다.",
          "category": "사용법",
          "priority": 1
        }
      ],
      "response_scripts": [
        {
          "script_id": "uuid-s1",
          "scenario": "제품 문의",
          "script": "안녕하세요. 라네즈 크림스킨 리필 세트는...",
          "tone": "FORMAL"
        }
      ],
      "risk_points": [
        {
          "risk_id": "uuid-r1",
          "risk_type": "USAGE",
          "description": "리필 제품은 단독 사용 불가",
          "severity": "MEDIUM",
          "recommended_action": "본품 구매 여부 확인 필요"
        }
      ]
    },
    "comments": [
      {
        "comment_id": "uuid-cm1",
        "author": "user***",
        "content": "제품 정말 좋아요!",
        "rating": 5,
        "created_at": "2025-12-08T14:30:00Z"
      }
    ],
    "statistics": {
      "view_count": 1250,
      "like_count": 45,
      "share_count": 12,
      "purchase_count": 230,
      "viewer_peak": 850
    },
    "images": [
      {
        "image_id": "uuid-i1",
        "image_url": "https://...",
        "image_type": "THUMBNAIL",
        "display_order": 1
      }
    ]
  }
}
```

**실패 (404 Not Found)**:
```json
{
  "success": false,
  "message": "이벤트를 찾을 수 없습니다.",
  "error": {
    "code": "EVENT_NOT_FOUND"
  }
}
```

---

### 4.3 상담용 문구 생성

이벤트 정보를 기반으로 CS 상담용 문구 자동 생성

#### 요청

**Endpoint**: `GET /api/events/:event_id/consultation-text`

**Headers**:
```
Authorization: Bearer {access_token}
```

**Path Parameters**:
- `event_id`: 이벤트 ID

**Query Parameters**:

| 파라미터 | 타입 | 필수 | 설명 | 기본값 |
|---------|------|------|------|--------|
| tone | string | N | 말투 (FORMAL, CASUAL, FRIENDLY) | FORMAL |
| include_products | boolean | N | 상품 정보 포함 여부 | true |
| include_benefits | boolean | N | 혜택 정보 포함 여부 | true |

**예시**:
```
GET /api/events/REAL_NAVER_라네즈_1744150/consultation-text?tone=FORMAL&include_products=true
```

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": {
    "consultation_text": "안녕하세요, 고객님.\n\n현재 네이버 쇼핑라이브에서 '라네즈 크림스킨 리필 기획전'이 진행 중입니다.\n\n[주요 상품]\n- 크림스킨 리필 세트: 49,000원 (30% 할인)\n- 워터뱅크 에센스: 35,000원 (20% 할인)\n\n[혜택]\n- 신규회원 5,000원 쿠폰\n- 10만원 이상 구매 시 사은품 증정\n- 3만원 이상 무료배송\n\n[방송 일시]\n- 2025년 12월 8일 14:00 ~ 15:00\n\n자세한 내용은 아래 링크에서 확인하실 수 있습니다.\nhttps://view.shoppinglive.naver.com/replays/1744150\n\n감사합니다.",
    "metadata": {
      "generated_at": "2025-12-08T09:00:00Z",
      "tone": "FORMAL",
      "character_count": 256
    }
  }
}
```

---

## 5. 관리자 API

### 5.1 플랫폼 목록 조회

등록된 플랫폼 목록 조회

#### 요청

**Endpoint**: `GET /api/admin/platforms`

**Headers**:
```
Authorization: Bearer {access_token}
```

**Query Parameters**:

| 파라미터 | 타입 | 필수 | 설명 | 기본값 |
|---------|------|------|------|--------|
| is_active | boolean | N | 활성 상태 필터 | - |

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "platform_id": "uuid-1",
      "platform_code": "NAVER",
      "platform_name": "네이버 쇼핑라이브",
      "platform_url": "https://shoppinglive.naver.com",
      "is_active": true,
      "crawl_interval": 60,
      "last_crawled_at": "2025-12-08T08:00:00Z",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### 5.2 플랫폼 추가

새로운 플랫폼 등록

#### 요청

**Endpoint**: `POST /api/admin/platforms`

**Headers**:
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body**:
```json
{
  "platform_code": "COUPANG",
  "platform_name": "쿠팡 라이브",
  "platform_url": "https://www.coupang.com/live",
  "is_active": true,
  "crawl_interval": 60
}
```

#### 응답

**성공 (201 Created)**:
```json
{
  "success": true,
  "data": {
    "platform_id": "uuid-new",
    "platform_code": "COUPANG",
    "platform_name": "쿠팡 라이브",
    "platform_url": "https://www.coupang.com/live",
    "is_active": true,
    "crawl_interval": 60,
    "created_at": "2025-12-08T09:00:00Z"
  },
  "message": "플랫폼이 등록되었습니다."
}
```

---

### 5.3 브랜드 목록 조회

등록된 브랜드 목록 조회

#### 요청

**Endpoint**: `GET /api/admin/brands`

**Headers**:
```
Authorization: Bearer {access_token}
```

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "brand_id": "uuid-1",
      "brand_code": "LANEIGE",
      "brand_name": "라네즈",
      "brand_name_en": "LANEIGE",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### 5.4 브랜드 추가

새로운 브랜드 등록

#### 요청

**Endpoint**: `POST /api/admin/brands`

**Headers**:
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body**:
```json
{
  "brand_code": "MAMONDE",
  "brand_name": "마몽드",
  "brand_name_en": "MAMONDE",
  "is_active": true
}
```

#### 응답

**성공 (201 Created)**:
```json
{
  "success": true,
  "data": {
    "brand_id": "uuid-new",
    "brand_code": "MAMONDE",
    "brand_name": "마몽드",
    "brand_name_en": "MAMONDE",
    "is_active": true,
    "created_at": "2025-12-08T09:00:00Z"
  },
  "message": "브랜드가 등록되었습니다."
}
```

---

## 6. 즐겨찾기 API

### 6.1 즐겨찾기 목록 조회

사용자의 즐겨찾기 목록 조회

#### 요청

**Endpoint**: `GET /api/favorites`

**Headers**:
```
Authorization: Bearer {access_token}
```

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "favorite_id": "uuid-f1",
      "event_id": "uuid-1",
      "event_title": "라네즈 크림스킨 리필 기획전",
      "channel_name": "네이버",
      "memo": "자주 문의하는 이벤트",
      "created_at": "2025-12-08T09:00:00Z"
    }
  ]
}
```

---

### 6.2 즐겨찾기 추가

이벤트를 즐겨찾기에 추가

#### 요청

**Endpoint**: `POST /api/favorites`

**Headers**:
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Body**:
```json
{
  "event_id": "uuid-1",
  "memo": "자주 문의하는 이벤트"
}
```

#### 응답

**성공 (201 Created)**:
```json
{
  "success": true,
  "data": {
    "favorite_id": "uuid-f-new",
    "event_id": "uuid-1",
    "user_id": 1,
    "memo": "자주 문의하는 이벤트",
    "created_at": "2025-12-08T09:00:00Z"
  },
  "message": "즐겨찾기에 추가되었습니다."
}
```

---

### 6.3 즐겨찾기 삭제

즐겨찾기에서 제거

#### 요청

**Endpoint**: `DELETE /api/favorites/:favorite_id`

**Headers**:
```
Authorization: Bearer {access_token}
```

**Path Parameters**:
- `favorite_id`: 즐겨찾기 ID

#### 응답

**성공 (200 OK)**:
```json
{
  "success": true,
  "message": "즐겨찾기가 삭제되었습니다."
}
```

---

## 7. 에러 코드

### 7.1 인증 관련

| 코드 | HTTP | 설명 |
|------|------|------|
| AUTHENTICATION_REQUIRED | 401 | 인증이 필요합니다 |
| INVALID_TOKEN | 401 | 유효하지 않은 토큰 |
| TOKEN_EXPIRED | 401 | 토큰이 만료되었습니다 |
| INVALID_CREDENTIALS | 401 | 잘못된 인증 정보 |
| ACCOUNT_LOCKED | 403 | 계정이 잠겼습니다 |
| ACCOUNT_INACTIVE | 403 | 비활성 계정입니다 |
| INSUFFICIENT_PERMISSIONS | 403 | 권한이 부족합니다 |

### 7.2 리소스 관련

| 코드 | HTTP | 설명 |
|------|------|------|
| EVENT_NOT_FOUND | 404 | 이벤트를 찾을 수 없습니다 |
| PLATFORM_NOT_FOUND | 404 | 플랫폼을 찾을 수 없습니다 |
| BRAND_NOT_FOUND | 404 | 브랜드를 찾을 수 없습니다 |
| USER_NOT_FOUND | 404 | 사용자를 찾을 수 없습니다 |

### 7.3 요청 관련

| 코드 | HTTP | 설명 |
|------|------|------|
| INVALID_REQUEST | 400 | 잘못된 요청입니다 |
| MISSING_REQUIRED_FIELD | 400 | 필수 필드가 누락되었습니다 |
| INVALID_FIELD_FORMAT | 400 | 필드 형식이 올바르지 않습니다 |
| DUPLICATE_ENTRY | 409 | 중복된 항목입니다 |

### 7.4 서버 관련

| 코드 | HTTP | 설명 |
|------|------|------|
| INTERNAL_SERVER_ERROR | 500 | 서버 내부 오류 |
| DATABASE_ERROR | 500 | 데이터베이스 오류 |
| EXTERNAL_API_ERROR | 502 | 외부 API 오류 |

### 7.5 Rate Limiting

| 코드 | HTTP | 설명 |
|------|------|------|
| RATE_LIMIT_EXCEEDED | 429 | 요청 제한 초과 |

---

## 8. 공통 사항

### 8.1 날짜/시간 형식

**ISO 8601 형식** 사용
```
YYYY-MM-DDTHH:mm:ssZ
```

**예시**:
```
2025-12-08T14:00:00Z
```

### 8.2 페이지네이션

**파라미터**:
- `page`: 페이지 번호 (0부터 시작)
- `page_size`: 페이지 크기 (1-100, 기본 20)

**응답**:
```json
{
  "pagination": {
    "total": 100,
    "page": 0,
    "page_size": 20,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

### 8.3 정렬

**파라미터**: `sort_by`

**옵션**:
- `latest`: 최신순 (기본값)
- `popular`: 인기순 (조회수 기준)
- `ending`: 종료 임박순

### 8.4 필터링

**다중 값 필터**:
```
?channel=NAVER,KAKAO&brand=LANEIGE,SULWHASOO
```

**날짜 범위**:
```
?start_date=2025-12-01&end_date=2025-12-31
```

### 8.5 캐싱

**캐시 헤더**:
```
Cache-Control: public, max-age=300
X-Cache-Status: HIT
X-Cache-Expires-In: 285
```

**캐시 무효화**:
- 데이터 변경 시 자동 무효화
- 수동 무효화: `Cache-Control: no-cache` 헤더 포함

---

## 부록 A: 테스트 데이터

### A.1 테스트 계정

**CS 상담원**:
```
username: agent001
password: agent001
role: AGENT
```

**관리자**:
```
username: admin
password: admin123
role: ADMIN
```

### A.2 테스트 이벤트 ID

```
REAL_NAVER_라네즈_1744150
```

---

## 부록 B: Postman Collection

Postman Collection 파일은 별도로 제공됩니다.

**파일명**: `AI_CS_System_API.postman_collection.json`

---

**문서 이력**

| 버전 | 날짜 | 작성자 | 변경 내역 |
|------|------|--------|----------|
| 1.0 | 2025-12-08 | AI Assistant | 최초 작성 |

---

**© 2025 Amore Pacific. All Rights Reserved.**

