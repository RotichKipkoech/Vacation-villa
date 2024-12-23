// import apiClient from "./api/axios"; // Import the configured axios client
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    apiClient.get('/places') // Use apiClient instead of axios
      .then(response => {
        setPlaces(response.data);
      })
      .catch(error => {
        console.error('Error fetching places:', error);
      });
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {places.length > 0 && places.map((place, index) => (
            <Link
              to={`/places/${place._id}`}
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105"
            >
              <div className="relative">
                {place.photos?.[0] && (
                  <img
                    className="w-full h-48 sm:h-64 object-cover"
                    src={`${apiClient.defaults.baseURL}/uploads/${place.photos?.[0]}`} // Update the image URL to use the correct base URL
                    alt="place"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-bold">{place.address}</h3>
                <p className="text-xs md:text-sm text-gray-400">{place.title}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 font-semibold">${place.price}</span>
                  <span className="text-xs ml-1">per Night</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}