import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { Header, Footer } from "../components/layout";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-6xl mb-6">🍳</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Side ikke fundet
        </h1>
        <p className="text-gray-600 mb-8">
          Vi kunne desværre ikke finde den side du ledte efter.
        </p>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />

      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
