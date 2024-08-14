import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu.js";
import Layout from "../../components/layout/Layout.js";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm.js";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      console.log(data);
      if (data?.success) {
        alert(`${name} is created`);
        getAllCategory();
      } else {
        alert(data.message, "is the error");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong in input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`,
        { name: updatedName }
      );
      if (data?.success) {
       alert(`category is deleted`)
        getAllCategory();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:space-x-8 p-6 bg-gray-50 min-h-screen">
        <div className="lg:w-1/4 mb-6 lg:mb-0">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <AdminMenu />
        </div>
        <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-md">
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">
                      Name
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {c.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c)
                            }}
                          >
                            Edit
                          </button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600" onClick={()=>{handleDelete(c._id)}}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => {
                setVisible(false);
              }}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
