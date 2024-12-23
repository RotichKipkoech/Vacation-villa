import { useContext, useState } from "react";

import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import apiClient from "../api/axios"; // Import the centralized apiClient

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await apiClient.post('/login', { email, password }); // Use apiClient instead of axios
      setUser(response.data);
      alert("Login Successful");
      setRedirect(true);
    } catch (error) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={handleLoginSubmit}>
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
          <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition duration-300">
            LOGIN
          </button>
          <div className="text-center py-2">
            Dont have an account yet?{" "}
            <Link
              to={"/register"}
              className="text-primary underline font-semibold"
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;