import { useEffect } from "react";

import { useLoaderData } from "react-router";
import { useGetJson } from "~/hooks/useGetJson";
import type { MapData, PerformanceDetail } from "~/types/common";

import type { loader } from "..";

export default function Map() {
    const data: PerformanceDetail = useLoaderData<typeof loader>();
    const { data: mapData } = useGetJson<MapData>({
        url: `/api/map/${data?.mt10id}`,
        queryKey: ["map", data?.mt10id],
        useSuspense: false,
    });

    useEffect(() => {
        if ((window as any).naver && mapData) {
            const map = new (window as any).naver.maps.Map("map", {
                center: new (window as any).naver.maps.LatLng(mapData.la, mapData.lo),
            });
            const marker = new (window as any).naver.maps.Marker({
                position: new (window as any).naver.maps.LatLng(mapData.la, mapData.lo),
                map: map,
            });
        }
    }, [mapData]);

    return (
        <div>
            <p>{mapData?.adres}</p>
            <div id="map" className="w-full h-[400px]"></div>
        </div>
    );
}
