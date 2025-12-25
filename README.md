# 공연정보사이트

서비스 주소 - https://performance-alpha-dun.vercel.app

다양한 최적화와 기술을 적용해보고 싶어 만든 사이드 프로젝트입니다.

### 기술 스택

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

---

### API 출처

[KOPIS](https://kopis.or.kr/por/cs/openapi/openApiInfo.do?menuId=MNU_00074)

---

### 화면 구성

| 메인 페이지 | 상세 페이지 | 검색 페이지 |
| ----------- | ----------- | ----------- |
| <img width="1321" height="1339" alt="performance-alpha-dun vercel app_" src="https://github.com/user-attachments/assets/fd65d00e-7c28-4077-8b67-e32b48eb73c5" /> | <img width="1315" height="942" alt="image" src="https://github.com/user-attachments/assets/4fb5f3e8-76e0-4eba-b418-76a64fc569e0" />| <img width="1321" height="1076" alt="performance-alpha-dun vercel app_PF282147 (1)" src="https://github.com/user-attachments/assets/075ee410-9eea-40fb-9286-56fea55369fa" /> |

---

### 성능 개선

#### React Query를 사용해 서버측 상태를 캐싱해 사용자 경험 향상
필터(토글) 상태에 따라 데이터가 바뀌는 구조라, 전환 시 지연을 줄이기 위해 캐싱이 필요하다고 판단했다.
아래 이미지에서 선택한 지역과 장르에 해당하는 데이터를 가져온다.

<img width="1332" height="790" alt="image" src="https://github.com/user-attachments/assets/fea77330-8d80-401e-ba14-3f225ebf4627" />

각 지역, 장르 이름을 `queryKey`로 사용

```js
const { data } = useGetJson<PerformanceItem[]>({
	url: `/api/popular-perf?area=${area}&cate=${cate}`,
	queryKey: ["popular-perf", area, cate],
});
```

```
useGetJson?

useGetJson은 React Query의 useQuery / useSuspenseQuery를 감싼(fetch 전용) 추상화 훅
공통으로 반복되는 설정(예: queryKey, staleTime, gcTime, queryFn)을 한 곳에 모아 JSON GET 요청을 간단한 형태로 호출.

- `fetchJSON<T>(url)`을 사용해 JSON을 가져옵니다.
- 기본값은 **Suspense 모드(useSuspense: true)**로 동작합니다.
- useSuspense: false로 두면 일반 useQuery로 동작합니다.
```

#### Vercel CDN으로 React Router 서버 액션 캐싱하기

메인페이지의 스와이퍼 영역은 사용자가 가장 처음 마주하는 곳이기 때문에 아주 빠르게 렌더링이 돼야 한다고 생각했다.

그러려면 API 응답을 캐싱하는 게 가장 확실하다고 판단했다.

캐싱하려면 응답 헤더에 캐시 설정이 돼 있어야 한다.

KOPIS API는 기본적으로 캐시 헤더가 없어 서버 액션으로 한 번 랩핑해서 캐시를 적용하기로 한다.

```js
// routes/apis/popular-perf.ts

export const loader = async ({ request }: { request: Request }) => {
	const now = dayjs().tz();
	const midnight = now.endOf("day").add(1, "second");
	const secondsUntilMidnight = Math.max(0, midnight.diff(now, "second"));

    ...

	return new Response(JSON.stringify(list), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": `public, max-age=${secondsUntilMidnight}, s-maxage=${secondsUntilMidnight}, stale-while-revalidate=60`,
		},
	});
};
```

- secondsUntilMidnight는 지금부터 다음 자정까지 남은 시간(초)이라 캐시 만료를 하루 단위로 맞추는 용도다.

#### 번들 사이즈 최적화

메인페이지 스와이퍼 영역에 `@dotlottie/react-player` 패키지를 사용한다.

해당 패키지의 목적은 데이터가 없을 때 사용자에게 lottie 애니메이션을 보여주기 위해서다.

하지만 첫 페이지 진입 시 데이터는 항상 있기 때문에 초기 렌더링 번들에 포함될 필요가 없다고 판단했다.

그래서 lazy import로 컴포넌트를 지연 로딩하고, 데이터가 비어 있는 케이스에서만 로드되도록 처리한다.

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

- 지연 로딩을 사용해 초기 번들에서 분리
