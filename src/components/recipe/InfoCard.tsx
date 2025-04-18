import React from "react";

export interface InfoCardProps {
  icon: string;
  title: string;
  value: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value }) => {
  return (
    <div className="text-center p-3 bg-[#daa520]/10 rounded-lg">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs text-gray-500 mb-1">{title}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
};

export default InfoCard;
