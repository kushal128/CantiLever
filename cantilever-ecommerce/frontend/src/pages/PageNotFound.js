import React from "react";
import Layout from "../components/layout/Layout.js";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl text-gray-600 mb-8">Oops! Something went wrong.</h2>
        <Link
          to="/"
          className="text-lg font-semibold text-blue-500 hover:underline"
        >
          Go back to Home Page
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
    