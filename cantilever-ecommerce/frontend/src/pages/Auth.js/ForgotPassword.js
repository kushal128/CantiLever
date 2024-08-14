import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import Layout from "../../components/layout/Layout.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
 

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      console.log(res.data.success);
      if (res.data.success) {
        //alert(res.data.message);
        alert("Password Successfully Reset");
        console.log("sucessfulll reset password");
       
        navigate("/login");
      } else {
        alert("invalid");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };
  return (
    <Layout>
      <div className="register">
        <form
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-2xl mt-10"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Reset Password
          </h2>

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
              type="text"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="answer"
              placeholder="Enter your favourite Sports"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="newPassword"
              placeholder="Enter your New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              required
            />
          </div>

          <div className="flex flex-col items-center justify-between">
            
            <button
              type="submit"
              className="bg-blue-500 text-xl my-3 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
