import { queryOptions } from "@tanstack/react-query";
import { fetchRecipes } from "./recipes";

export const recipesQueryOptions = queryOptions({
  queryKey: ["recipes"],
  queryFn: () => fetchRecipes(),
});
