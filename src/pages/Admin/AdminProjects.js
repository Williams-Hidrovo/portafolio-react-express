import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, message } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");

  const onFinish = async (values) => {
    try {
      const tempTech = values.tegnologias.split(",") || [];
      values.tegnologias = tempTech;
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-project", {
          ...values,
          link: values.link || "",
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-project", values);
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
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

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-project", {
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
            setSelectedItemForEdit(null);
            setType("add");
            setShowAddEditModal(true);
          }}
        >
          Agregar Proyecto
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-5 sm:grid-cols-1">
        {projects.map((project) => (
          <div
            key={project.titulo}
            className="flex flex-col justify-between shadow border p-5 border-gray-400"
          >
            <h1 className="text-primary text-xl font-bold">{project.title}</h1>
            <hr />
            <img src={project.imagen} alt="" className="h-60 w-80" />
            <h1>Titulo: {project.titulo}</h1>
            <h1>{project.descripcion}</h1>
            <div className="flex justify-around mt-2">
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemForEdit(project);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2 "
                onClick={() => {
                  onDelete(project);
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
          title={selectedItemForEdit ? "Editar Proyecto" : "Agregar Proyecto"}
          footer={false}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
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

            <Form.Item name="descripcion" label="Descripción">
              <textarea type="text" placeholder="descripción" />
            </Form.Item>

            <Form.Item name="tegnologias" label="Tegnologias">
              <textarea
                spellCheck="false"
                type="text"
                placeholder="Tegnologias"
              />
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

export default AdminProjects;
