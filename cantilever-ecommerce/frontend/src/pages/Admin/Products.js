import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row p-6 bg-gray-100 min-h-screen">
        <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-lg mb-6 lg:mb-0">
          <AdminMenu />
        </div>
        <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Products List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products && products.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out max-w-xs w-full"
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h5 className="text-xl font-semibold mb-2 text-gray-900 truncate">{p.name}</h5>
                  <p className="text-gray-600 truncate">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
