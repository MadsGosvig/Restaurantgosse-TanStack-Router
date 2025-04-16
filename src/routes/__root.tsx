import * as React from "react";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
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
        <Link
          to="/"
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Vend tilbage i sikkerhed
        </Link>
      </div>
    );
  },
});

function RootComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center py-4 px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img className="w-[5em]" src="/favicon.svg" />
              <span className="text-xl font-bold text-yellow-500 pt-3.5">
                Restaurant Gosse
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 pt-3.5">
              <NavLink to="/" label="Forside" />
              <NavLink to="/recipes" label="Opskrifter" />
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-3 px-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-3">
                <MobileNavLink
                  to="/"
                  label="Forside"
                  onClick={() => setIsMenuOpen(false)}
                />
                <MobileNavLink
                  to="/recipes"
                  label="Opskrifter"
                  onClick={() => setIsMenuOpen(false)}
                />
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-yellow-500">
                  Restaurant Gosse
                </span>
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

type NavLinkProps = {
  to: string;
  label: string;
};

function NavLink({ to, label }: NavLinkProps) {
  return (
    <Link
      to={to}
      activeProps={{
        className: "font-medium text-amber-600",
      }}
      activeOptions={{ exact: to === "/" }}
      className="text-gray-700 hover:text-amber-600 transition-colors"
    >
      {label}
    </Link>
  );
}

type MobileNavLinkProps = {
  to: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};

function MobileNavLink({ to, label, onClick }: MobileNavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeProps={{
        className: "font-medium text-amber-600",
      }}
      activeOptions={{ exact: to === "/" }}
      className="text-gray-700 hover:text-amber-600 transition-colors block py-2"
    >
      {label}
    </Link>
  );
}
