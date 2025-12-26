import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

const queryClient = new QueryClient();

export default function MainLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Header />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
