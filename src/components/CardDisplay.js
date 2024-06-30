import React from "react";
import AdCard from "./AdCard";

const CardDisplay = () => {
  return (
    <div className="flex flex-col m-5 md:m-8">
      <p className="font-inter font-semibold md:text-xl text-base">
        Branches
      </p>
      <div className="flex flex-wrap -mx-2 overflow-hidden">
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
        <AdCard />
      </div>
    </div>
  );
};

export default CardDisplay;
