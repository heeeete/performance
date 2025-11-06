import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "~/components/Footer";

const queryClient = new QueryClient();

export default function MainLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<main className="min-h-screen">
				<Outlet />
			</main>
			<Footer />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
