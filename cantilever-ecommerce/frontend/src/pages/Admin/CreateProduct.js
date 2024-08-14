import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu.js";
import Layout from "../../components/layout/Layout.js";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        alert("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:space-x-8 p-6 bg-gray-50 min-h-screen">
        <div className="lg:w-1/4 mb-6 lg:mb-0">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <AdminMenu />
        </div>
        <div className="lg:w-3/4 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Create Product</h2>
          <form className="space-y-6" onSubmit={handleCreate}>
            <Select
              placeholder="Select a category"
              size="large"
              showSearch
              className="w-full"
              onChange={(value) => setCategory(value)}
              style={{ borderRadius: '0.375rem', borderColor: '#d1d5db' }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <label className="block bg-blue-500 text-white py-2 px-4 rounded cursor-pointer flex items-center justify-center hover:bg-blue-600 transition">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
            {photo && (
              <div className="text-center mt-4">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product-photo"
                  height="200px"
                  className="mx-auto border border-gray-300 rounded-md"
                />
              </div>
            )}
            <div className="space-y-4">
              <input
                type="text"
                value={name}
                placeholder="Product Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                value={description}
                placeholder="Product Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
              <input
                type="number"
                value={price}
                placeholder="Product Price"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                value={quantity}
                placeholder="Product Quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Select
                placeholder="Select Shipping"
                size="large"
                className="w-full"
                onChange={(value) => setShipping(value)}
                style={{ borderRadius: '0.375rem', borderColor: '#d1d5db' }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-green-600 transition"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
