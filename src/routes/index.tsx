import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { recipesQueryOptions } from "../recipesQueryOptions";
import { RecipeType } from "../recipes";
import { Entry } from "contentful";
import { useState } from "react";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(recipesQueryOptions),
  component: RecipesLayoutComponent,
});

const allCategoryName = "Alle";

function RecipesLayoutComponent() {
  const recipeQuery = useSuspenseQuery(recipesQueryOptions);
  const recipes = recipeQuery.data;
  const [selectedType, setSelectedType] = useState(allCategoryName);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique recipe types for filtering
  const recipeTypes = [
    allCategoryName,
    ...new Set(recipes.map((recipe) => recipe.fields.type)),
  ];

  // Filter recipes based on selected type
  const filteredRecipes = recipes
    .filter(
      (recipe) =>
        selectedType === allCategoryName || recipe.fields.type === selectedType
    )
    .filter(
      (recipe) =>
        searchQuery === "" ||
        recipe.fields.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType(allCategoryName);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#daa520] mb-2">
          Vores opskriftsamling
        </h1>
        <p className="text-gray-600">
          Se om du kan finde din yndlings opskrift...
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Søg efter en opskrift..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#daa520] focus:border-[#daa520]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <XIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
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
                  ? "bg-[#daa520] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Search results count */}
      <div className="mb-4 text-sm text-gray-600">
        {filteredRecipes.length === 0 ? (
          <p>
            Ingen opskrifter fundet. Prøv at justere din søgning eller filtre.
          </p>
        ) : searchQuery || selectedType !== allCategoryName ? (
          <p>
            Fandt {filteredRecipes.length}{" "}
            {filteredRecipes.length === 1 ? "opskrift" : "opskrifter"}
          </p>
        ) : null}
      </div>

      {/* Recipe cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.sys.id} recipe={recipe} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Ingen opskrifter fundet
            </h3>
            <p className="text-gray-600 mb-4">
              Juster enten typen af opskrift, eller søg på en anden opskrift
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-[#daa520] text-white rounded-md hover:bg-[#c89418]"
            >
              Nustil søgning
            </button>
          </div>
        )}
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
          "block bg-white rounded-lg shadow-md overflow-hidden ring-2 ring-[#daa520]",
      }}
    >
      <div className="h-56 bg-gray-100 flex items-center justify-center">
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

type SearchIconProps = {
  className: string | undefined;
};

// Simple icon components
function SearchIcon({ className }: SearchIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

type XIconProps = {
  className: string | undefined;
};

function XIcon({ className }: XIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
