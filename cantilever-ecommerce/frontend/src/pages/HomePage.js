import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import {useNavigate} from "react-router-dom";
import { useCart } from "../context/cart.js";
const HomePage = () => {
  const navigate = useNavigate()
  const [cart,setCart]=useCart()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState(null); // Use `null` to signify no radio selection

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

  // Get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    setChecked((prevChecked) =>
      value ? [...prevChecked, id] : prevChecked.filter((c) => c !== id)
    );
  };

  // Fetch filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen flex">
        <div className="w-1/5 p-4 bg-white rounded-lg shadow-lg mr-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Filters
          </h2>
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-2 text-gray-600">
              Category
            </h3>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-2 text-gray-600">
              Price
            </h3>
            <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
            onClick={() => {
              setChecked([]);
              setRadio(null);
              getAllProducts();
            }}
          >
            Reset Filters
          </button>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Home Page
          </h1>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              All Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {products &&
                products.map((p) => (
                  <div
                    key={p._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105"
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xl font-semibold mb-2 text-gray-900 truncate">
                          {p.name}
                        </h5>
                        <p className="text-gray-600 truncate">{p.description}</p>
                        <p className="text-gray-600 truncate">${p.price}</p>
                      </div>
                      <div className="flex gap-4 mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300" onClick={()=>navigate(`/product/${p.slug}`)}>
                          More Details
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300" onClick={()=>{setCart([...cart,p])}}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
