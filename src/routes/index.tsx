import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
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

      <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl shadow-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-semibold text-amber-800 mb-4">
              Opdag vores lækre opskrifter
            </h2>
            <p className="text-gray-700 mb-6">
              Led vores nøje udvalgte opskrifter igennem. Der er alt fra lette
              hverdagsretter til blærerøvsretterne for de særlige øjeblikke.
              Hver opskrift kommer med udførlige instruktioner samt
              ingrediensliste.
            </p>
            <Link
              to="/recipes"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Udforsk opskrifterne
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-64 bg-amber-200 rounded-full flex items-center justify-center">
              <span className="text-amber-800 text-6xl">🍽️</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon="⏱️"
          title="Hurtigt & Let"
          description="Find opskrifter der passer ind i dit skema. Alle opskrifter er markeret med forberedelsestid."
        />
        <FeatureCard
          icon="🌱"
          title="Vegetariske muligheder"
          description="Udforsk vores udvalg af lærke vegetariske retter."
        />
        <FeatureCard
          icon="🍳"
          title="Detaljerede instruktioner"
          description="Følg vores instruktioner, og sikre dig det perfekte resultat hver gang."
        />
      </div>
    </div>
  );
}

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
