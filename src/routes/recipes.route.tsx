import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { recipesQueryOptions } from "../recipesQueryOptions";
import { RecipeType } from "../recipes";
import { Entry } from "contentful";
import { useState } from "react";

export const Route = createFileRoute("/recipes")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(recipesQueryOptions),
  component: RecipesLayoutComponent,
});

const allCategoryName = "Alle";

function RecipesLayoutComponent() {
  const recipeQuery = useSuspenseQuery(recipesQueryOptions);
  const recipes = recipeQuery.data;
  const [selectedType, setSelectedType] = useState(allCategoryName);

  // Extract unique recipe types for filtering
  const recipeTypes = [
    allCategoryName,
    ...new Set(recipes.map((recipe) => recipe.fields.type)),
  ];

  // Filter recipes based on selected type
  const filteredRecipes =
    selectedType === allCategoryName
      ? recipes
      : recipes.filter((recipe) => recipe.fields.type === selectedType);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Vores opskriftsamling
        </h1>
        <p className="text-gray-600">
          Se om du kan finde din yndlings opskrift...
        </p>
      </div>

      {/* Category filters */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Filtrer på hvilken type opskrift du leder efter
        </h2>
        <div className="flex flex-wrap gap-2">
          {recipeTypes.map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedType === type
                  ? "bg-amber-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe cards grid */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:w-full">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.sys.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

type RecipeCardProps = {
  recipe: Entry<RecipeType, undefined, string>;
};

function RecipeCard({ recipe }: RecipeCardProps) {
  const isVegetarian = recipe.fields.isVegetarian;

  return (
    <Link
      to="/recipe/$recipeId"
      params={{
        recipeId: recipe.sys.id,
      }}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      activeProps={{
        className:
          "block bg-white rounded-lg shadow-md overflow-hidden ring-2 ring-amber-500",
      }}
    >
      <div className="h-40 bg-amber-100 flex items-center justify-center">
        {recipe.fields.image ? (
          <img
            // @ts-ignore - Fields does exist....
            src={`https:${recipe.fields.image.fields.file.url}`}
            alt={recipe.fields.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl">🍽️</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 text-lg line-clamp-2">
            {recipe.fields.title}
          </h3>
          {isVegetarian && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Veg
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {recipe.fields.subtitle}
        </p>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{recipe.fields.type}</span>
          <span>{recipe.fields.time}</span>
        </div>
      </div>
    </Link>
  );
}
