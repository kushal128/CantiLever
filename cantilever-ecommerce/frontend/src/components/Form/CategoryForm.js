import React from "react";

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Create Category</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter new category"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Category
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
