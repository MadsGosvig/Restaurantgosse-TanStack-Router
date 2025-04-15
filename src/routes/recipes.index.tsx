import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes/")({
  component: RecipesIndexComponent,
});

function RecipesIndexComponent() {
  return <div>Vælg en opskrift</div>;
}
