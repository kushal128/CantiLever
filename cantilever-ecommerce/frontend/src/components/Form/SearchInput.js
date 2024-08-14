import React from "react";
import { useSearch } from "../../context/Search.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="flex items-center" role="search" onSubmit={handleSubmit}>
        <input
          className="form-input border-gray-300 rounded-lg py-2 px-4 mr-2 w-full"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
