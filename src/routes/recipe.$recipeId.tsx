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
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

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
          to="/recipes"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors"
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

  // Custom rendering options for rich text - with proper TypeScript types
  const richTextOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className="font-bold">{text}</span>,
      [MARKS.ITALIC]: (text) => <span className="italic">{text}</span>,
      [MARKS.UNDERLINE]: (text) => <span className="underline">{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-4">{children}</p>
      ),
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
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="mb-1">{children}</li>
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
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      {recipe.fields.image && (
        <div className="h-48 md:h-64 w-full">
          <img
            // @ts-ignore - Fields does exist....
            src={`https:${recipe.fields.image.fields.file.url}`}
            alt={recipe.fields.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {recipe.fields.title}
          </h1>
          <p className="text-gray-600">{recipe.fields.subtitle}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <InfoCard icon="🕒" title="Time" value={recipe.fields.time} />
          <InfoCard icon="🍽️" title="Serves" value={recipe.fields.amount} />
          <InfoCard
            icon={recipe.fields.isVegetarian ? "🌱" : "🥩"}
            title="Diet"
            value={
              recipe.fields.isVegetarian ? "Vegetarian" : recipe.fields.type
            }
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Ingredients in a colored box */}
          {recipe.fields.ingredients && (
            <div className="md:w-1/3">
              <div className="bg-amber-50 rounded-lg p-5 border-l-4 border-amber-500 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-center text-amber-800 border-b border-amber-200 pb-2">
                  Ingredienser
                </h2>
                <div className="rich-text-content text-gray-700">
                  {documentToReactComponents(
                    recipe.fields.ingredients,
                    richTextOptions
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          {recipe.fields.instructions && (
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg p-5">
                <h2 className="text-xl font-semibold mb-4 text-center text-amber-800 border-b border-amber-200 pb-2">
                  Instruktioner
                </h2>
                <div className="rich-text-content text-gray-700 max-w-2xl mx-auto">
                  {documentToReactComponents(
                    recipe.fields.instructions,
                    richTextOptions
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-center">
          <Link
            to="/recipes"
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            ← Tilbage til opskrifterne
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
    <div className="text-center p-3 bg-amber-50 rounded-lg">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs text-gray-500 mb-1">{title}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
