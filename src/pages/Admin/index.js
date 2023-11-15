import React from "react";
import { Tabs } from "antd";
import Header from "../../components/Header";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { useSelector } from "react-redux";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminCourses from "./AdminCourses";
import AdminContact from "./AdminContact";

const onChange = (key) => {
  console.log(key);
};

const Admin = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);

  const items = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "Sobre mi",
      children: <AdminAbout />,
    },
    {
      key: "3",
      label: "Experiencias",
      children: <AdminExperiences />,
    },
    {
      key: "4",
      label: "Proyectos",
      children: <AdminProjects />,
    },
    {
      key: "5",
      label: "Cursos",
      children: <AdminCourses />,
    },
    {
      key: "6",
      label: "Contacto",
      children: <AdminContact />,
    },
  ];

  return (
    <>
      <Header />
      <h1 className="text-2xl p-5 py-2 text-primary">Administrar Portafolio</h1>
      {portfolioData && (
        <Tabs className="px-5" defaultActiveKey="1" items={items} />
      )}
    </>
  );
};

export default Admin;
