import * as React from "react";
import {
  ErrorComponent,
  createFileRoute,
  useRouter,
} from "@tanstack/react-router";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { RecipeNotFoundError } from "../recipes";
import { recipeQueryOptions } from "../recipeQueryOptions";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const Route = createFileRoute("/recipe/$recipeId")({
  loader: ({ context: { queryClient }, params: { recipeId } }) => {
    return queryClient.ensureQueryData(recipeQueryOptions(recipeId));
  },
  errorComponent: RecipeErrorComponent,
  component: RecipeComponent,
});

export function RecipeErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();
  if (error instanceof RecipeNotFoundError) {
    return <div>{error.message}</div>;
  }
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  React.useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div>
      <button
        onClick={() => {
          router.invalidate();
        }}
      >
        retry
      </button>
      <ErrorComponent error={error} />
    </div>
  );
}

function RecipeComponent() {
  const recipeId = Route.useParams().recipeId;
  const { data: recipe } = useSuspenseQuery(recipeQueryOptions(recipeId));

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{recipe.fields.title}</h4>
      <div className="text-sm">{recipe.fields.subtitle}</div>
      <div className="text-sm">{recipe.fields.amount}</div>
      <div className="text-sm">{recipe.fields.time}</div>
      <div className="text-sm">{recipe.fields.type}</div>
      <div className="text-sm">{recipe.fields.isVegetarian}</div>
      <div className="text-sm">
        {/* @ts-ignore */}
        {documentToReactComponents(recipe.fields.instructions)}
      </div>
      <div className="text-sm">
        {/* @ts-ignore */}
        {documentToReactComponents(recipe.fields.ingredients)}
      </div>
    </div>
  );
}
