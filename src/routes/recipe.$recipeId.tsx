import * as React from "react";
import {
  ErrorComponent,
  Link,
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
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Document } from "@contentful/rich-text-types";

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
    return (
      <div className="p-8 text-center">
        <div className="text-3xl mb-4">🍽️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {error.message}
        </h2>
        <Link
          to="/"
          className="inline-block bg-[#daa520] hover:bg-[#c89418] text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Tilbage til opskrifterne
        </Link>
      </div>
    );
  }
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  React.useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Noget gik galt...
      </h2>
      <button
        onClick={() => {
          router.invalidate();
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Prøv igen!
      </button>
      <div className="mt-4">
        <ErrorComponent error={error} />
      </div>
    </div>
  );
}

function RecipeComponent() {
  const recipeId = Route.useParams().recipeId;
  const { data: recipe } = useSuspenseQuery(recipeQueryOptions(recipeId));

  // Function to render instructions with step numbers
  const renderInstructions = (instructionsDocument: Document) => {
    // Extract paragraphs from the rich text
    const paragraphs: React.ReactNode[] = [];

    // Process rich text content to find paragraphs
    if (instructionsDocument.content) {
      instructionsDocument.content.forEach((node, index) => {
        if (node.nodeType === "paragraph" && node.content) {
          const paragraphText = node.content
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

    return paragraphs;
  };

  // Custom rendering options for ingredients
  const richTextOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className="font-bold">{text}</span>,
      [MARKS.ITALIC]: (text) => <span className="italic">{text}</span>,
      [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-3xl font-bold mb-4 text-center">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-2xl font-bold mb-3 text-center">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-xl font-bold mb-2 text-center">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc pl-6">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal pl-6">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="mb-1 text-gray-800">{children}</li>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

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
          {recipe.fields.ingredients && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-center text-[#daa520]">
                Ingredienser
              </h2>
              <div className="bg-[#daa520]/10 rounded-lg p-6">
                <div className="rich-text-content text-gray-800">
                  {documentToReactComponents(
                    recipe.fields.ingredients,
                    richTextOptions
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Instructions with numbered steps in white boxes */}
          {recipe.fields.instructions && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center text-[#daa520]">
                Fremgangsmåde
              </h2>
              <div className="space-y-4">
                {renderInstructions(recipe.fields.instructions)}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 pt-4 border-t border-gray-200 flex justify-center">
          <Link
            to="/"
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

interface InfoCardProps {
  icon: string;
  title: string;
  value: string;
}

function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <div className="text-center p-3 bg-[#daa520]/10 rounded-lg">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs text-gray-500 mb-1">{title}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
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
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
}
