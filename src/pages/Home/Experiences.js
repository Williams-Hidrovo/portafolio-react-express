import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;

  return (
    <div>
      <SectionTitle title="Experiencia" />

      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col items-center gap-10 border-l-2 border-[#135e4c82] sm:flex-row sm:overflow-x-scroll sm:w-full">
          {experiences.map((experience, index) => (
            <div
              key={experience.Periodo}
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer sm:py-5"
            >
              <h1
                className={`w-56 text-xl px-5 py-3 sm:text-base sm:text-center sm:h-[80px]
                ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-1 bg-[#1a7f5a42]"
                    : "text-white"
                }`}
              >
                {experience.Periodo}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-2/3 gap-5 sm:w-full">
          <h1 className="text-secondary text-xl">
            {experiences[selectedItemIndex].Cargo}
          </h1>
          <h1 className="text-tertiary text-xl">
            {experiences[selectedItemIndex].Empresa}
          </h1>
          <p className="text-white">
            {experiences[selectedItemIndex].Descripcion || ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
