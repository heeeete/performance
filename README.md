# 🎭 공연 정보 사이트

<div align="center">

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### 🔗 [서비스 바로가기](https://performance-alpha-dun.vercel.app)

**최신 React 생태계 기술과 다양한 성능 최적화 기법을 실험하는 사이드 프로젝트**

공연예술통합전산망(KOPIS) API를 활용한 공연 정보 검색 및 조회 서비스

</div>

---

## 🎯 프로젝트 소개

**공연 정보 사이트**는 다양한 프론트엔드 최적화 기법과 최신 React 기술을 실험하고 적용하기 위해 시작한 프로젝트입니다.

### 프로젝트 목표

- ✅ **React Compiler** 도입으로 수동 메모이제이션 최소화
- ✅ **번들 사이즈 최적화**로 초기 로딩 성능 개선
- ✅ **서버 사이드 캐싱** 전략으로 API 응답 속도 향상
- ✅ **React Query** 기반 효율적인 데이터 페칭 및 캐싱
- ✅ **Vercel CDN**을 활용한 엣지 캐싱

### 데이터 출처

[KOPIS](https://kopis.or.kr/por/cs/openapi/openApiInfo.do?menuId=MNU_00074)

---

## ✨ 주요 기능

### 🔍 공연 검색
- 공연명 기반 검색
- React Query 기반 즉시 응답 캐싱

### 📊 인기 공연 추천
- 지역 및 장르별 인기 공연 조회
- Vercel CDN 캐싱으로 빠른 응답 속도

### 🎫 공연 상세 정보
- 공연장 장소, 지도, 공연 시간, 판매처 등 상세 정보 제공

---

## ⚡ 성능 최적화

### 1. React Compiler 도입 🚀

**기존 React:**
```jsx
// ❌ 수동 메모이제이션 필요
const MemoizedComponent = memo(({ data }) => {
  const processed = useMemo(() => expensiveCalc(data), [data]);
  const handler = useCallback(() => doSomething(), []);
  // ...
});
```

**React Compiler 적용 후:**
```jsx
// ✅ 컴파일러가 자동으로 최적화
function Component({ data }) {
  const processed = expensiveCalc(data); // 자동 메모이제이션
  const handler = () => doSomething();   // 자동 메모이제이션
  // ...
}
```

**성과:**
- 개발 환경 기준 **리렌더링 횟수 259회 → 195회** (25% 감소)
- `useMemo`, `useCallback` 수동 작성 제거로 **코드 가독성 향상**
- React DevTools로 자동 메모이제이션 확인 가능

> **React Compiler란?**
>
> React 19에서 도입된 새로운 컴파일러로, 빌드 타임에 컴포넌트를 분석해 자동으로 최적화 코드를 생성합니다.
> `useMemo`, `useCallback` 같은 수동 최적화를 컴파일러가 대신 처리하여 개발자 경험(DX)을 크게 개선합니다.

---

### 2. React Query 기반 스마트 캐싱 💾

**문제 상황:**

메인 페이지에서 **지역/장르 필터를 전환할 때마다 API 호출**이 발생하여 사용자 경험이 저하되는 문제

<img width="1332" alt="필터 UI" src="https://github.com/user-attachments/assets/fea77330-8d80-401e-ba14-3f225ebf4627" />

**해결 방법:**

각 지역/장르 조합을 **고유한 `queryKey`로 관리**하여 한 번 조회한 데이터를 자동으로 캐싱
```tsx
// 커스텀 훅:  useGetJson
const { data } = useGetJson<PerformanceItem[]>({
  url: `/api/popular-perf?area=${area}&cate=${cate}`,
  queryKey: ["popular-perf", area, cate], // 지역/장르 조합을 키로 사용
  staleTime: 1000 * 60 * 5, // 5분간 신선한 데이터로 간주
  gcTime: 1000 * 60 * 10,   // 10분간 캐시 유지
});
```

**useGetJson이란?**

`useQuery` / `useSuspenseQuery`를 감싼 추상화 훅으로, 반복되는 설정을 한 곳에 모았습니다:

```tsx
export function useGetJson<T>({
  url,
  queryKey,
  useSuspense = true, // 기본값은 Suspense 모드
  ... options
}) {
  const queryFn = () => fetchJSON<T>(url);

  return useSuspense
    ? useSuspenseQuery({ queryKey, queryFn, ... options })
    : useQuery({ queryKey, queryFn, ...options });
}
```

**효과:**
- ✅ 필터 전환 시 **즉시 캐시된 데이터 표시** (0ms 응답)
- ✅ 불필요한 네트워크 요청 제거
- ✅ **사용자 경험 크게 개선**

---

### 3. Vercel CDN 엣지 캐싱 🌐

**문제 상황:**

메인 페이지 스와이퍼 영역은 사용자가 **가장 먼저 보는 콘텐츠**이므로, 초기 로딩 속도가 매우 중요

하지만 KOPIS API는 **캐시 헤더가 없어** 매번 원본 서버로 요청이 발생

**해결 방법:**

React Router의 **서버 액션(loader)** 으로 API를 래핑하고, Vercel CDN이 캐싱할 수 있도록 **Cache-Control 헤더**를 추가

```tsx
// routes/apis/popular-perf.ts
export const loader = async ({ request }: { request: Request }) => {
  const now = dayjs().tz();
  const midnight = now. endOf("day").add(1, "second");
  const secondsUntilMidnight = Math.max(0, midnight. diff(now, "second"));

  // KOPIS API 호출
  const list = await fetchPerformanceList();

  return new Response(JSON.stringify(list), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // 자정까지 캐시 유지, 이후 갱신
      "Cache-Control": `public, max-age=${secondsUntilMidnight}, s-maxage=${secondsUntilMidnight}, stale-while-revalidate=60`,
    },
  });
};
```

**캐시 전략 설명:**
- `public`: CDN이 캐시 가능하도록 설정
- `max-age`: 브라우저 캐시 유효 시간 (자정까지)
- `s-maxage`: CDN 캐시 유효 시간 (자정까지)
- `stale-while-revalidate=60`: 캐시 만료 후 60초간은 기존 캐시를 보여주면서 백그라운드에서 갱신

**효과:**
- ✅ **첫 로딩 이후 엣지 서버에서 즉시 응답** (< 20ms)
- ✅ 원본 서버 부하 감소

**캐시 흐름:**
```
사용자 → Vercel Edge CDN (캐시 히트) → 즉시 응답
                ↓ (캐시 미스)
        원본 서버 → KOPIS API → 캐시 저장 → 응답
```

---

### 4. 초기 번들 사이즈 최적화 📦

**문제 분석:**

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FwkJ7Y%2FdJMcae64HIb%2FAAAAAAAAAAAAAAAAAAAAAL9MQn1OUt-vENsSDHukpbpKuoZEqKLjdFvPv3nYE79i%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1769871599%26allow_ip%3D%26allow_referer%3D%26signature%3DSJqtOFtGoKe7C5hmKd9YwCgVBPI%253D" alt="번들 분석" />

번들 분석 결과, 초기 로딩에 불필요한 라이브러리가 포함

- **Swiper** - 메인 페이지 슬라이더
- **@dotlottie/react-player** - 빈 데이터 시 애니메이션

**최적화 전략:**

#### Lottie 조건부 로딩

Lottie 애니메이션은 **데이터가 없는 경우에만** 필요하므로, 초기 번들에서 완전히 제외했습니다.

```js
const LazyDotLottie = lazy(() => import("~/components/LazyDotLottie"));

return (
	...
    {data && data.length === 0 && (
		<LazyDotLottie src="/lottie/sad.lottie" className="w-[300px] h-[300px]" />
    )}
	...
)
```

**성과:**

| 항목 | 최적화 전 | 최적화 후 | 개선율 |
|------|----------|----------|--------|
| Rendered | 420KB | 348KB | **17% 감소** |
| Gzip | 140KB | 112KB | **20% 감소** |
| Brotli | 110KB | 87KB | **21% 감소** |

---

### 5. 이미지 최적화 🖼️

```tsx
// Lazy loading + 디코딩 비동기 처리
<img
  src={performance.poster}
  loading="lazy"
  decoding="async"
  alt={performance.title}
/>
```

---

## 📱 화면 구성

| 메인 페이지 | 상세 페이지 | 검색 페이지 |
| ----------- | ----------- | ----------- |
| <img width="400" alt="메인 페이지" src="https://github.com/user-attachments/assets/fd65d00e-7c28-4077-8b67-e32b48eb73c5" /> | <img width="400" alt="상세 페이지" src="https://github.com/user-attachments/assets/4fb5f3e8-76e0-4eba-b418-76a64fc569e0" />| <img width="400" alt="검색 페이지" src="https://github.com/user-attachments/assets/075ee410-9eea-40fb-9286-56fea55369fa" /> |

### 메인 페이지
- 지역/장르별 인기 공연 스와이퍼
- React Query 캐싱으로 즉각적인 필터 전환
- Vercel CDN 캐싱으로 빠른 초기 로딩

### 상세 페이지
- 공연 정보 상세 조회

### 검색 페이지
- 검색 결과
- 무한 스크롤 페이지네이션
