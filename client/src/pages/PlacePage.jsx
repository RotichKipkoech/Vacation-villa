// dark theme + responsive for mobiles
// import axios from "axios";
import apiClient from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../PlaceGallery";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    apiClient.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return null;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">{place.title}</h1>

      <PlaceGallery place={place} />

      <div className="grid grid-cols-1 gap-4 mt-6 sm:gap-6 md:grid-cols-2 md:gap-8">
        <div>
          <div className="my-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300">Description</h2>
            <p className="text-gray-300">{place.description}</p>
          </div>
          <p className="text-gray-300">
            Check-In: {place.checkIn} <br />
            Check-Out: {place.checkOut} <br />
            Max Number of Guests: {place.maxGuests}
          </p>
        </div>

        <BookingWidget place={place} />
      </div>

      <div className="bg-gray-800 mt-8 p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300">Extra Info:</h2>
        <p className="text-gray-300">{place.extraInfo}</p>
      </div>
    </div>
  );
}
