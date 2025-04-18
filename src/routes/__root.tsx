import * as React from "react";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";

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
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center py-4 px-4">
            <div className="flex items-baseline">
              <Link to="/">
                <span className="logo-text">Restaurant</span>
                <span className="mx-1"></span>
                <span className="g-clef">𝄞</span>
                <span className="logo-text">osse</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-[#1A1A1A] text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-baseline">
                <span className="logo-text text-white">Restaurant</span>
                <span className="mx-1"></span>
                {/* G-clef in the footer - still golden */}
                <span className="g-clef">𝄞</span>
                <span className="logo-text text-white">osse</span>
              </div>
              <p className="text-sm text-white mt-2">
                Familien Gosvig's samling af opskrifter
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-white">
                © {new Date().getFullYear()} Restaurant Gosse
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
