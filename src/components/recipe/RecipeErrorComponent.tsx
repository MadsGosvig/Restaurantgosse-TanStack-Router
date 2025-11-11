import React, { useEffect } from "react";
import { ErrorComponent, Link, useRouter } from "@tanstack/react-router";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { RecipeNotFoundError } from "../../api/recipe/recipes";

export const RecipeErrorComponent: React.FC<ErrorComponentProps> = ({
  error,
}) => {
  const router = useRouter();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  if (error instanceof RecipeNotFoundError) {
    return (
      <div className="p-8 text-center">
        <div className="text-3xl mb-4">🍽️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {error.message}
        </h2>
        <Link
          to="/recipes"
          className="inline-block bg-[#daa520] hover:bg-[#c89418] text-white font-medium py-2 px-4 rounded-sm transition-colors"
        >
          Tilbage til opskrifterne
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Noget gik galt...
      </h2>
      <button
        onClick={() => {
          router.invalidate();
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-sm transition-colors"
      >
        Prøv igen!
      </button>
      <div className="mt-4">
        <ErrorComponent error={error} />
      </div>
    </div>
  );
};

export default RecipeErrorComponent;
