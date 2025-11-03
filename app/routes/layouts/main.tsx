import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function MainLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<main>
				<Outlet />
			</main>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
