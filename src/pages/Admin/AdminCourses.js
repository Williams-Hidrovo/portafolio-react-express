import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, message } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

const AdminCourses = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-course", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-course", values);
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-course", {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
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
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setType("add");
            setShowAddEditModal(true);
          }}
        >
          Agregar Curso
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-5 sm:grid-cols-1">
        {courses.map((course) => (
          <div
            key={course.titulo}
            className="flex flex-col justify-between shadow border p-5 border-gray-400"
          >
            <h1 className="text-primary text-xl font-bold">{course.title}</h1>
            <hr />
            <img src={course.imagen} alt="" className="h-60 w-80 rounded" />
            <h1>Titulo: {course.titulo}</h1>
            <h1>{course.description}</h1>
            <div className="flex justify-around mt-2">
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemForEdit(course);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2 "
                onClick={() => {
                  onDelete(course);
                }}
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Editar Curso" : "Agregar Curso"}
          footer={false}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={
              {
                ...selectedItemForEdit,
                tegnologias: selectedItemForEdit?.tegnologias?.join(" , "),
              } || {}
            }
          >
            <Form.Item name="titulo" label="Titulo">
              <input type="text" placeholder="Titulo" />
            </Form.Item>

            <Form.Item name="imagen" label="Url Imagen">
              <input type="text" placeholder="Url Imagen" />
            </Form.Item>

            <Form.Item name="description" label="Descripción">
              <textarea type="text" placeholder="descripción" />
            </Form.Item>

            <Form.Item name="link" label="Link">
              <textarea type="text" placeholder="Link" />
            </Form.Item>

            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => {
                  setShowAddEditModal(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancelar
              </button>

              <button className="bg-primary text-white px-5 py-2">
                {selectedItemForEdit ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AdminCourses;
