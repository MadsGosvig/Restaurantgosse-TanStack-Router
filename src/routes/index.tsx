import { createFileRoute } from "@tanstack/react-router";
import { HeroSection, FeatureSection } from "../components/home";
import type { FeatureCardProps } from "../components/home";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  // Feature cards data
  const features: FeatureCardProps[] = [
    {
      icon: "⏱️",
      title: "Hurtigt & Let",
      description:
        "Find opskrifter der passer ind i dit skema. Alle opskrifter er markeret med forberedelsestid.",
    },
    {
      icon: "🌱",
      title: "Vegetariske muligheder",
      description: "Udforsk vores udvalg af lærke vegetariske retter.",
    },
    {
      icon: "🍳",
      title: "Detaljerede instruktioner",
      description:
        "Følg vores instruktioner, og sikre dig det perfekte resultat hver gang.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Velkommen til Restaurant Gosse
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Familien Gosvig's samling af opskrifter!
        </p>
      </div>

      <HeroSection
        title="Opdag vores lækre opskrifter"
        description="Led vores nøje udvalgte opskrifter igennem. Der er alt fra lette hverdagsretter til blærerøvsretterne for de særlige øjeblikke. Hver opskrift kommer med udførlige instruktioner samt ingrediensliste."
        ctaText="Udforsk opskrifterne"
        ctaLink="/recipes"
      />

      <FeatureSection features={features} />
    </div>
  );
}
