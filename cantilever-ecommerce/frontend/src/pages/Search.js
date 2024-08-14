import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
const Search = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values] = useSearch(); // No need to destructure setValues if not used

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Search Results
          </h1>
          <h6 className="text-center text-xl text-gray-600 mb-8">
            {values?.results.length < 1
              ? "No products found"
              : `Found ${values?.results.length} product(s)`}
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {values?.results?.map((p) => (
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
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
                      onClick={() => {
                        setCart([...cart, p]);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
