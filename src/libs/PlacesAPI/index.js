const axios = require("axios");
const { googlePlacesApiKey } = require("../../const/config");

const apiUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";

async function searchPlacesByQuery(
  query,
  params = {
    language: "ru",
    lat: 47.421,
    lng: 40.0919,
    radius: 15000,
  }
) {
  try {
    const response = await axios.get(
      encodeURI(
        `${apiUrl}?query=${query}&key=${googlePlacesApiKey}&language=${params.language}&lat=${params.lat}&lng=${params.lng}&radius${params.radius}`
      )
    );

    const result = response.data.results.map((item) => ({
      placeId: item.place_id,
      name: item.name,
      address: item.formatted_address,
      googleRating: item.rating,
    }));

    return result;
  } catch (err) {
    console.error("PlacesAPI Error:", err);
    return [];
  }
}

module.exports = {
  searchPlacesByQuery,
};
