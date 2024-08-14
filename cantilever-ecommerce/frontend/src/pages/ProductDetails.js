import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
              <p className="text-2xl text-gray-600 mb-6">{product.description}</p>
              
              <h2 className="text-lg font-bold mb-4 text-gray-800">Price: ${product.price}</h2>
              <h2 className="text-lg font-bold mb-4 text-gray-600">Category: {product.category.name}</h2>
            </div>
            <div className="flex gap-4">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
