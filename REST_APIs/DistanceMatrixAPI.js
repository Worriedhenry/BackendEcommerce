const axios = require('axios');
require('dotenv').config()

async function calculateDistanceAndTime(origin, destination) {
  try {
    console.log(process.env.GOOGLE_MAPS_API_KEY)
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    const params = {
      origins: origin,
      destinations: destination,
      key: process.env.GOOGLE_MAPS_API_KEY,
    };
    const response = await axios.get(url, { params });
    const data = response.data;

    if (data.status === 'OK') {
      const distanceText = data.rows[0].elements[0].distance.text;
      const distanceValue = data.rows[0].elements[0].distance.value;
      const durationText = data.rows[0].elements[0].duration.text;
      const durationValue = data.rows[0].elements[0].duration.value;

      return { distanceText, distanceValue, durationText, durationValue };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// Usage example
const origin = 'Mumbai, India';
const destination = 'Delhi, India';

// calculateDistanceAndTime(origin, destination)
//   .then(result => {
//     if (result) {
//       console.log('Distance:', result.distanceText);
//       console.log('Duration:', result.durationText);
//     } else {
//       console.log('Distance and time calculation failed.');
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error.message);
//   });

module.exports=calculateDistanceAndTime