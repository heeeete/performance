import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetchJSON } from "~/utils/fetch";

export function useGetJson<T>({
	url,
	queryKey,
	staleTime = 5 * 60 * 1000,
	gcTime = 10 * 60 * 1000,
	useSuspense = true,
}: {
	url: string;
	queryKey: string[];
	staleTime?: number;
	gcTime?: number;
	useSuspense?: boolean;
}) {
	if (typeof window === "undefined") {
		return { data: undefined, isLoading: false, isSuccess: false };
	}

	const result = useSuspense
		? useSuspenseQuery({
				queryKey: queryKey,
				queryFn: () => fetchJSON<T>(url),
				staleTime,
				gcTime,
			})
		: useQuery({
				queryKey: queryKey,
				queryFn: () => fetchJSON<T>(url),
				staleTime,
				gcTime,
			});

	return {
		data: result.data,
		isLoading: result.isLoading,
		isSuccess: result.isSuccess,
	};
}
