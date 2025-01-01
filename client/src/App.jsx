import { Routes, Route } from "react-router-dom";
// import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import apiClient from "./api/axios"; // Import the configured axios client
import { UserContextProvider } from "./UserContext.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";

// It sets up the apiClient to correctly point to your backend server running at http://localhost:4000 and ensures that credentials (like cookies) are sent along with requests.
// apiClient.defaults.baseURL = "http://localhost:4000";
apiClient.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
apiClient.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage/>}></Route>
          <Route path="/account/places" element={<PlacesPage/>}></Route>
          <Route path="/account/places/new" element={<PlacesFormPage/>}></Route>
          <Route path="/account/places/:id" element={<PlacesFormPage/>}></Route>   
          {/* :id - param */}
          <Route path="/places/:id" element={<PlacePage/>} />
          <Route path="/account/bookings" element={<BookingsPage />}></Route>
          <Route path="/account/bookings/:id" element={<BookingPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
