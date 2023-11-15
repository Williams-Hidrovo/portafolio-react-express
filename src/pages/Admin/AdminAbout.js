import React, { Profiler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import { Button, Form } from "antd";
import { message } from "antd";

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      //mis datos actualizados
      const url = "/api/portfolio/update-about";
      const datosActualizados = {
        ...values,
        _id: portfolioData.about._id,
        skills: values.skills.split(","),
      };
      dispatch(ShowLoading());
      //enviando los datos actualizados al servidor
      const response = await axios.post(url, datosActualizados);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join(" , "),
        }}
      >
        <Form.Item name="lottieURL" label="lottieURL">
          <input placeholder="lottieURL" />
        </Form.Item>

        <Form.Item name="description1" label="Descripcion 1">
          <input placeholder="Nombre" />
        </Form.Item>

        <Form.Item name="description2" label="Descripcion 2">
          <textarea placeholder="Descripción" />
        </Form.Item>

        <Form.Item name="skills" label="Conocimientos">
          <textarea spellCheck="false" placeholder="Conocimientos" />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end w-full">
            <button type="submit" className="px-5 py-2 bg-primary text-white">
              Guardar
            </button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default AdminAbout;
