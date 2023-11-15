import React, { Profiler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import { Form } from "antd";
import { message } from "antd";

const AdminIntro = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-intro", {
        ...values,
        _id: portfolioData.intro._id,
      });
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
        initialValues={portfolioData.intro}
      >
        <Form.Item name="welcomeText" label="Bienvenida">
          <input placeholder="Bienvenida" />
        </Form.Item>

        <Form.Item name="firsName" label="firsName">
          <input placeholder="Nombre" />
        </Form.Item>

        <Form.Item name="lastName" label="Apellido">
          <input placeholder="Apellido" />
        </Form.Item>
        <Form.Item name="caption" label="Tu Rol">
          <input placeholder="Tu Rol" />
        </Form.Item>
        <Form.Item name="description" label="Descripción">
          <textarea placeholder="Descripción" />
        </Form.Item>
        <div className="flex justify-end w-full">
          <button type="submit" className="px-5 py-2 bg-primary text-white">
            Guardar
          </button>
        </div>
      </Form>
    </>
  );
};

export default AdminIntro;
