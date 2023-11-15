import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function About() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { lottieURL, description1, description2, skills } = about;
  return (
    <div>
      <SectionTitle title="Sobre mi" />
      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[60vh] w-1/2 sm:w-11/12">
          <dotlottie-player
            src={lottieURL}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className="flex flex-col gap-5 w-1/2 sm:w-11/12">
          <p className="text-white">{description1}</p>
          <p className="text-white">{description2}</p>
        </div>
      </div>

      {/*esta seccion es la de habilidades que pertenece al about me */}
      <div className="py-5">
        <h1 className="text-tertiary text-2xl">
          Estas son las tegnologias con las que he trabajado actualmente
        </h1>
        <div className="flex flex-wrap gap-10 mt-5">
          {skills.map((skill, index) => (
            <div
              key={skill + "Div"}
              className="border border-tertiary py-3 px-5"
            >
              <h1 key={skill} className=" text-tertiary">
                {skill}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
