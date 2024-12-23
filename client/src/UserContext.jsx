// It provides a way for components throughout your app to access and potentially update user information retrieved from an API endpoint.
// axios: A popular library for making HTTP requests (API calls) in React applications.

// import apiClient from "./api/axios";
// // import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);
//   useEffect(() => {
//     if (!user) {
//       const { data } = apiClient.get('/profile').then(({ data }) => {
//         setUser(data);
//         setReady(true);
//       });
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, ready }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

import PropTypes from 'prop-types';
import apiClient from "./api/axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

    if (token) {
      // Include the token in the Authorization header for all requests
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      apiClient.get('/profile')
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setReady(true); // Set ready to true even if there's an error, to prevent loading issues
          if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., token expired or invalid)
            setUser(null);
            localStorage.removeItem("token"); // Clear the token if it's invalid
          }
        });
    } else {
      setReady(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

// Define the prop types
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};