import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { projects } from "../../resources/projects";
import { useSelector } from "react-redux";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  return (
    <div>
      <SectionTitle title={"Proyectos"} />

      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col items-center gap-10 border-l-2 border-[#135e4c82] sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
            <div
              key={project.titulo}
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
                {project.titulo}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img
            className="h-60 w-72 sm:w-full"
            src={projects[selectedItemIndex].imagen}
            alt=""
          />

          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {projects[selectedItemIndex].titulo}
            </h1>
            <p className="text-white">
              {projects[selectedItemIndex].tegnologias}
            </p>
            <p className="text-white">
              {projects[selectedItemIndex].descripcion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
