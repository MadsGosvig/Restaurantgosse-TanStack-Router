import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { richTextOptions } from "../../utils";

export interface RecipeIngredientsProps {
  ingredients: Document;
}

export const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
}) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-[#daa520]">
        Ingredienser
      </h2>
      <div className="bg-[#daa520]/10 rounded-lg p-6">
        <div className="rich-text-content text-gray-800">
          {documentToReactComponents(ingredients, richTextOptions)}
        </div>
      </div>
    </div>
  );
};

export default RecipeIngredients;
