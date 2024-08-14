import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout.js";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name, email, password, phone, address,answer});
        //console.log(res.data);
        if (res.data.success) {
            alert(res.data.message);
            console.log("sucessfulll registration");
            navigate("/login");
        } else{
            alert(res.data.message)
        }
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <Layout>
      <div className="register">
        <form
          className="max-w-lg mx-auto bg-slate-100 p-8 rounded-lg shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Sign Up
          </h2>

          <div className="mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="answer"
              placeholder="Your favourite sports"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              required
            />
          </div>
    
          <div className="mb-4">
            <input
              type="tel"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="phone"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>

          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-xl hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
