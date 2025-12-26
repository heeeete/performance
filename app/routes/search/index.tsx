import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import LazyDotLottie from "~/components/LazyDotLottie";
import PerfInfoCard from "~/components/PerfInfoCard";
import SkeletonPerfInfoCard from "~/components/SkeletonPerfInfoCard";
import { Button } from "~/components/ui/button";
import { fetchJSON } from "~/utils/fetch";

export interface SearchPerformance {
    /** 공연 고유 ID */
    mt20id: string;
    /** 공연 이름 */
    prfnm: string;
    /** 공연 시작일 (YYYY.MM.DD 형식) */
    prfpdfrom: string;
    /** 공연 종료일 (YYYY.MM.DD 형식) */
    prfpdto: string;
    /** 공연 시설명 */
    fcltynm: string;
    /** 포스터 이미지 URL */
    poster: string;
    /** 지역 (예: 서울특별시, 전라북도 등) */
    area: string;
    /** 장르명 (연극, 뮤지컬, 무용 등) */
    genrenm: string;
    /** 오픈런 여부 ("Y" | "N") */
    openrun: "Y" | "N";
    /** 공연 상태 (예: 공연중, 공연완료 등) */
    prfstate: string;
}

interface SearchResponse {
    items: SearchPerformance[];
    currentPage: number;
    hasNextPage: boolean;
}

export default function Search() {
    const { keyword } = useParams();

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            <SearchResult />
        </div>
    );
}

function SearchResult() {
    const { keyword } = useParams();

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
        useInfiniteQuery<SearchResponse>({
            queryKey: ["search", keyword],
            queryFn: ({ pageParam = 1 }) =>
                fetchJSON<SearchResponse>(`/api/search/${keyword}?page=${pageParam}`),
            getNextPageParam: (lastPage) => {
                return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
            },
            initialPageParam: 1,
        });

    if (isError) {
        return <div className="text-center py-10">검색 중 오류가 발생했습니다.</div>;
    }

    const allItems = data?.pages.flatMap((page) => page.items) ?? [];

    if (allItems.length === 0 && !isLoading) {
        return (
            <div className="flex flex-col items-center">
                <LazyDotLottie src="/lottie/sad.lottie" className="w-[300px] h-[300px]" />
                <p className="text-gray-500 text-2xl">검색 결과가 없어요</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-4 w-full">
                {isLoading && <SkeletonPerfInfoCard />}
                {allItems.length > 0 &&
                    allItems.map((item) => (
                        <PerfInfoCard key={`${item.mt20id}-${item.prfpdfrom}`} data={item} />
                    ))}
                {isFetchingNextPage && <SkeletonPerfInfoCard />}
            </div>

            {hasNextPage && (
                <Button
                    disabled={isFetchingNextPage}
                    className="my-4"
                    onClick={() => fetchNextPage()}
                >
                    {isFetchingNextPage ? "더 불러오는 중..." : "더 불러오기"}
                </Button>
            )}
        </div>
    );
}
