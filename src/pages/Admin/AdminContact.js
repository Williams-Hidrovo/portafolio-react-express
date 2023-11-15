import React, { Profiler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import { Form } from "antd";
import { message } from "antd";

const AdminContact = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contact._id,
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
        initialValues={portfolioData.contact}
      >
        <Form.Item name="name" label="Nombre">
          <input placeholder="Nombre" />
        </Form.Item>

        <Form.Item name="gender" label="Genero">
          <input placeholder="gender" />
        </Form.Item>

        <Form.Item name="age" label="Edad">
          <input placeholder="Edad" />
        </Form.Item>

        <Form.Item name="email" label="Correo">
          <input placeholder="Correo" />
        </Form.Item>

        <Form.Item name="mobile" label="Telefono">
          <input placeholder="Telefono" />
        </Form.Item>
        <Form.Item name="address" label="Direccion">
          <input placeholder="Direccion" />
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

export default AdminContact;
