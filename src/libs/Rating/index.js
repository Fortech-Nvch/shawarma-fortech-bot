const { Vote, Place } = require("./models");
const connection = require("../../database/connection");
const { searchPlacesByQuery } = require("../../libs/PlacesAPI");
const {
  formatPlaceForRating,
  formatRatingButtons,
} = require("../../tpl/buttons");

async function vote(userId, placeId, userVote) {
  const place = await Place.findByPk(placeId);

  const vote = await Vote.findOne({
    where: { userId, placeId },
  });

  if (!vote) {
    await Vote.create({ userId, placeId, vote: userVote });
  } else {
    vote.vote = userVote;

    await vote.save();
  }

  const [stat] = await Vote.findAll({
    where: { placeId },
    attributes: [
      [connection.fn("sum", connection.col("vote")), "totalVote"],
      [connection.fn("count", connection.col("vote")), "totalAmount"],
    ],
  });

  place.ourRating = Math.floor(
    stat.dataValues.totalVote / stat.dataValues.totalAmount
  );

  (await place).save();

  return {};
}

async function getPlaceByID(placeId) {
  const place = await Place.findByPk(placeId);

  const formattedPlace = formatPlaceForRating(place);
  const buttons = formatRatingButtons(place);

  return { formattedPlace, buttons };
}

async function getAllPlaces() {
  let places = [];

  cachedPlaces = await Place.findAll();

  if (cachedPlaces.length) {
    console.info("I used cached results");

    const result = cachedPlaces.map((item) => {
      return {
        id: item.id,
        address: item.address,
        name: item.name,
        googleRating: item.googleRating,
        ourRating: item.ourRating,
      };
    });

    return result;
  }

  console.info("I need to fetch places");

  googlePlaces = await searchPlacesByQuery("Шаурма");

  places = await Place.bulkCreate(googlePlaces);

  return places;
}

module.exports = { vote, getPlaceByID, getAllPlaces };
