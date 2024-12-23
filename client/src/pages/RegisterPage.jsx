// import axios from "axios";
import apiClient from "../api/axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      const response = await apiClient.post('/register', { name, email, password });
      alert("Registration Successful");
      setRedirect(true);
    } catch (error) {
      alert("Registration failed");
    }
  }

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form onSubmit={registerUser} className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Rohan Garad"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="block w-full px-4 py-3 rounded-lg bg-gray-700 mb-4 focus:outline-none focus:bg-gray-600 focus:border-primary border border-gray-600"
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="block w-full px-4 py-3 rounded-lg bg-gray-700 mb-4 focus:outline-none focus:bg-gray-600 focus:border-primary border border-gray-600"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="block w-full px-4 py-3 rounded-lg bg-gray-700 mb-4 focus:outline-none focus:bg-gray-600 focus:border-primary border border-gray-600"
          />
          <input
            type="number"
            placeholder="Enter Number"
            className="block w-full px-4 py-3 rounded-lg bg-gray-700 mb-4 focus:outline-none focus:bg-gray-600 focus:border-primary border border-gray-600"
          />
          <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition duration-300">
            REGISTER
          </button>
          <div className="text-center py-2">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-primary underline font-semibold"
            >
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
