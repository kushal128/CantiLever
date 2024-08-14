import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  // Remove cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Cart</h1>
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-lg text-gray-600">
              {cart?.length > 1
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please log in to checkout"
                  }`
                : `Your cart is empty`}
            </h4>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart?.map((p) => (
                <div
                  key={p._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-6 flex"
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-1/3 h-48 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{p.name}</h4>
                      <p className="text-gray-600 mb-2">
                        {p.description.substring(0, 30)}...
                      </p>
                      <h4 className="text-lg font-semibold text-gray-800">Price: ${p.price}</h4>
                    </div>
                    <button
                      onClick={() => removeCartItem(p._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300 self-start mt-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Summary</h2>
              <p className="text-lg text-gray-600 mb-4">
                Total Items: {cart.length}
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Total Price: ${cart.reduce((total, item) => total + item.price, 0)}
              </p>
              {auth?.token ? (
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 w-full"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300 w-full"
                >
                  Log in to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
