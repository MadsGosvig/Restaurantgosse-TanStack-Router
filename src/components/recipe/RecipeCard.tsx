import React from "react";
import { Link } from "@tanstack/react-router";
import { Entry } from "contentful";
import { RecipeType } from "../../recipes";

export interface RecipeCardProps {
  recipe: Entry<RecipeType, undefined, string>;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
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
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {recipe.fields.subtitle}
        </p>
        <div className="flex justify-between text-xs text-gray-700  ">
          <span>{recipe.fields.type}</span>
          <span>{recipe.fields.time}</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
