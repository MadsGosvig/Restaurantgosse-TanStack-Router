import React from "react";
import FeatureCard, { FeatureCardProps } from "./FeatureCard";

interface FeatureSectionProps {
  features: FeatureCardProps[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeatureSection;
