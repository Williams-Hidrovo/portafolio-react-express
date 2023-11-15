import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Constact() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;

  return (
    <div>
      <SectionTitle title={"Contactame"} />

      <div className="flex justify-between items-center sm:flex-col sm:px-5">
        <div className="flex flex-col gap-1 text-sm w-1/2 sm:w-full">
          <div className="text-tertiary text-xl">
            {"{"}
            <p className="ml-5">
              Nombre: {contact.name} <br />
              Genero: {contact.gender} <br />
              Edad: {contact.age} <br />
              Correo: {contact.email} <br />
              Telefono: {contact.mobile} <br />
              Direccion: {contact.address} <br />
            </p>

            {"}"}
          </div>
        </div>
        <div className="flex w-1/2 sm:w-full">
          <dotlottie-player
            src="https://lottie.host/5be26911-248b-4e77-bf46-08d12d2ffd67/mmjHmv0trt.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
}

export default Constact;
