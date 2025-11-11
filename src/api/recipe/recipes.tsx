import * as contentful from "contentful";

export type RecipeType = {
  contentTypeId: string;
  fields: {
    title: contentful.EntryFieldTypes.Text;
    subtitle: contentful.EntryFieldTypes.Text;
    type: contentful.EntryFieldTypes.Text;
    time: contentful.EntryFieldTypes.Text;
    amount: contentful.EntryFieldTypes.Text;

    isVegetarian?: contentful.EntryFieldTypes.Boolean;

    ingredients?: contentful.EntryFieldTypes.RichText;
    instructions?: contentful.EntryFieldTypes.RichText;
    image?: contentful.EntryFieldTypes.AssetLink;
  };
};

export class RecipeNotFoundError extends Error {}

const contentfulConfig = {
  spaceId: "wdg89rpqhpev",
  accessToken: "Z69NaVTN_T9CePrLPnjfefDFcHTA6M-hzXDWlptz0I4",
  environment: "master",
};

const client = contentful.createClient({
  space: contentfulConfig.spaceId,
  accessToken: contentfulConfig.accessToken,
  environment: contentfulConfig.environment,
});

export const fetchRecipe = async (recipeId: string) => {
  try {
    return client.getEntry<RecipeType>(recipeId);
  } catch (error) {
    console.error("Error fetching entry:", error);
    throw new RecipeNotFoundError(`Recipe with id: ${recipeId} not found!`);
  }
};

export const fetchRecipes = async () => {
  try {
    const response = await client.getEntries<RecipeType>({
      content_type: "recipe",
      include: 10, // Get nested fields
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching entries:", error);
    throw new RecipeNotFoundError("Recipes not found!");
  }
};
