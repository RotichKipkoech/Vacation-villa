import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import apiClient from "../api/axios";
// import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

function ProfilePage() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  // console.log(subpage);
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await apiClient.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <AccountNav />

      {subpage === "profile" && (
        <div className="max-w-2xl mx-auto mt-8">
          <h1 className="text-center text-3xl font-semibold mb-4">
            Welcome, {user.name}!
          </h1>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-center text-xl mb-4">Email: {user.email}</p>
            <button
              onClick={logout}
              type="button"
              className="block w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
            >
              LOGOUT
            </button>
          </div>
        </div>
      )}

      {subpage === "places" && (
        <PlacesPage />
      )}
    </div>
  );
}

export default ProfilePage;