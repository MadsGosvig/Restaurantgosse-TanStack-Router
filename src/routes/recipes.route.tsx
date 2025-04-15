import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { recipesQueryOptions } from "../recipesQueryOptions";

export const Route = createFileRoute("/recipes")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(recipesQueryOptions),
  component: RecipesLayoutComponent,
});

function RecipesLayoutComponent() {
  const recipeQuery = useSuspenseQuery(recipesQueryOptions);
  const recipes = recipeQuery.data;

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {recipes.map((recipe) => {
          return (
            <li key={recipe.fields.title} className="whitespace-nowrap">
              <Link
                to="/recipe/$recipeId"
                params={{
                  recipeId: recipe.sys.id,
                }}
                className="block py-1 text-blue-600 hover:opacity-75"
                activeProps={{ className: "font-bold underline" }}
              >
                <div>{recipe.fields.title.substring(0, 20)}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
