// /* eslint-disable react/prop-types */
// function PlaceImg({place, index=0, className=null}) {
//   if (!place.photos?.length) {
//     return;
//   }

//   if (!className) {
//     className = "object-cover";
//   }

//   return (
//     <div>
//       <img
//         className={className}
//         src={"http://localhost:4000/uploads/" + place.photos[index]}
//         alt="Image"
//       />
//     </div>
//   );
// }

// export default PlaceImg;

import PropTypes from 'prop-types';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

function PlaceImg({ place, index = 0, className = "object-cover" }) {
  if (!place.photos?.length) {
    return null; // Return null instead of nothing
  }

  return (
    <div>
      <img
        className={className}
        src={`${apiUrl}/uploads/${place.photos[index]}`}
        alt="Image"
      />
    </div>
  );
}

// Define prop types for the component
PlaceImg.propTypes = {
  place: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number,
  className: PropTypes.string,
};

export default PlaceImg;
