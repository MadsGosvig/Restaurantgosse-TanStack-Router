import React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  InfoCard,
  RecipeIngredients,
  RecipeInstructions,
  RecipeErrorComponent,
} from "../components/recipe";
import { ArrowLeftIcon } from "../components/icons";
import { recipeQueryOptions } from "../api/recipe/recipeQueryOptions";

export const Route = createFileRoute("/recipe/$recipeId")({
  loader: ({ context: { queryClient }, params: { recipeId } }) => {
    return queryClient.ensureQueryData(recipeQueryOptions(recipeId));
  },
  errorComponent: RecipeErrorComponent,
  component: RecipeComponent,
});

function RecipeComponent() {
  const recipeId = Route.useParams().recipeId;
  const { data: recipe } = useSuspenseQuery(recipeQueryOptions(recipeId));

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-8">
      {recipe.fields.image && (
        <div className="h-64 md:h-96 w-full">
          <img
            // @ts-ignore - Fields does exist....
            src={`https:${recipe.fields.image.fields.file.url}`}
            alt={recipe.fields.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 md:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#daa520] mb-2">
            {recipe.fields.title}
          </h1>
          <p className="text-gray-600 text-lg">{recipe.fields.subtitle}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <InfoCard icon="🕒" title="Tid" value={recipe.fields.time} />
          <InfoCard icon="🍽️" title="Portioner" value={recipe.fields.amount} />
          <InfoCard
            icon={recipe.fields.isVegetarian ? "🌱" : "🥩"}
            title="Type"
            value={
              recipe.fields.isVegetarian ? "Vegetarisk" : recipe.fields.type
            }
          />
        </div>

        <div className="mb-10">
          {/* Ingredients section */}
          {recipe.fields.ingredients && (
            <RecipeIngredients ingredients={recipe.fields.ingredients} />
          )}

          {/* Instructions section */}
          {recipe.fields.instructions && (
            <RecipeInstructions instructions={recipe.fields.instructions} />
          )}
        </div>

        <div className="mt-10 pt-4 border-t border-gray-200 flex justify-center">
          <Link
            to="/recipes"
            className="text-[#daa520] hover:text-[#c89418] font-medium flex items-center"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Tilbage til opskrifterne
          </Link>
        </div>
      </div>
    </div>
  );
}
