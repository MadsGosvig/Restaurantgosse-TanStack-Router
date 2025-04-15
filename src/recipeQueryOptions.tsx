import { queryOptions } from "@tanstack/react-query";
import { fetchRecipe } from "./recipes";

export const recipeQueryOptions = (recipeId: string) =>
  queryOptions({
    queryKey: ["recipes", { recipeId }],
    queryFn: () => fetchRecipe(recipeId),
  });
