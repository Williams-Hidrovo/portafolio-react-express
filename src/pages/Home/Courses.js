import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;

  return (
    <div>
      <SectionTitle title={"Cursos"} />

      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col items-center gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {courses.map((course, index) => (
            <div
              key={course.titulo}
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer sm:py-5"
            >
              <h1
                className={`w-56 text-xl  px-5 py-3 sm:text-base sm:text-center sm:h-[80px]
                ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-1 bg-[#1a7f5a42]"
                    : "text-white"
                }`}
              >
                {course.titulo}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col sm:w-full ">
          <div className="flex flex-col gap-5 sm:w-full">
            <h1 className="text-secondary text-xl">
              {courses[selectedItemIndex].titulo}
            </h1>
            <p className="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium aliquid reprehenderit at aperiam, iure obcaecati
              temporibus! Quae consequatur voluptates vitae soluta ipsam odio
              sint corporis? Illo eos doloremque porro exercitationem?
            </p>
          </div>
          <img
            className="h-60 w-80]"
            src={courses[selectedItemIndex].imagen}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Courses;
