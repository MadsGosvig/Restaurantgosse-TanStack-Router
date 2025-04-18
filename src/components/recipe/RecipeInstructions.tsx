import React from "react";
import { BLOCKS, Document } from "@contentful/rich-text-types";

export interface RecipeInstructionsProps {
  instructions: Document;
}

export const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({
  instructions,
}) => {
  const paragraphs: React.ReactNode[] = [];

  if (instructions.content) {
    instructions.content.forEach((node, index) => {
      if (node.nodeType === BLOCKS.PARAGRAPH && node.content) {
        const paragraphText = node.content
          // @ts-ignore - Seems to work...
          .map((content) => content.value || "")
          .join("");

        if (paragraphText.trim()) {
          paragraphs.push(
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 mb-4 shadow-sm"
            >
              <div className="flex items-center">
                {/* Fixed width container with centered number */}
                <div className="flex-shrink-0 w-10 flex justify-center items-start">
                  <div className="w-8 h-8 rounded-full bg-[#daa520] text-white font-bold flex items-center justify-center text-lg">
                    {index + 1}
                  </div>
                </div>
                {/* Small gap */}
                <div className="w-4"></div>
                {/* Content area */}
                <div className="flex-grow">{paragraphText}</div>
              </div>
            </div>
          );
        }
      }
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-[#daa520]">
        Fremgangsmåde
      </h2>
      <div className="space-y-4">{paragraphs}</div>
    </div>
  );
};

export default RecipeInstructions;
