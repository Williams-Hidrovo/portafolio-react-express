import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, message } from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

const AdminExperiences = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-experience", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-experience", values);
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
      const response = await axios.post("/api/portfolio/delete-experience", {
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
          Agregar Experiencia
        </button>
      </div>
      <div className="mt-2 grid grid-cols-4 gap-5 sm:grid-cols-1">
        {experiences.map((exp) => (
          <div
            key={exp.Periodo}
            className="flex flex-col justify-between shadow border p-5 border-gray-400"
          >
            <h1 className="text-primary text-xl font-bold">{exp.Periodo}</h1>
            <hr />
            <h1>Empresa: {exp.Empresa}</h1>
            <h1>Rol: {exp.Cargo}</h1>
            <h1>{exp.Descripcion}</h1>
            <div className="flex justify-around mt-2">
              <button
                className="bg-primary text-white px-5 py-2 "
                onClick={() => {
                  setSelectedItemForEdit(exp);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2 "
                onClick={() => {
                  onDelete(exp);
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
          title={
            selectedItemForEdit ? "Editar Experiencia" : "Agregar experiencia"
          }
          footer={false}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={selectedItemForEdit || {}}
          >
            <Form.Item name="Periodo" label="Periodo">
              <input type="text" placeholder="Periodo" />
            </Form.Item>
            <Form.Item name="Empresa" label="Empresa">
              <input type="text" placeholder="Empresa" />
            </Form.Item>
            <Form.Item name="Cargo" label="Cargo">
              <input type="text" placeholder="Cargo" />
            </Form.Item>
            <Form.Item name="Descripcion" label="Descripción">
              <input type="text" placeholder="Descripción" />
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

export default AdminExperiences;
