const { ratingEmoji } = require("../const/emojies");

function formatPlaceForRating(item) {
  const formattedItem = `<b>Имя:</b> ${item.name}\n<b>Адрес:</b> ${item.address}\n<b>Рейтинг Google:</b>${item.googleRating}\n<b>Наш рейтинг:</b> ${item.ourRating}`;
  const message = "Для задания рейтинга, пожалуйста, выберете оценку ниже";

  return [formattedItem, message].join("\n");
}

function formatRatingButtons(item) {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: ratingEmoji.one,
            callback_data: `vote ${item.id} 1`,
          },
          {
            text: ratingEmoji.two,
            callback_data: `vote ${item.id} 2`,
          },
          {
            text: ratingEmoji.three,
            callback_data: `vote ${item.id} 3`,
          },
          {
            text: ratingEmoji.four,
            callback_data: `vote ${item.id} 4`,
          },
          {
            text: ratingEmoji.five,
            callback_data: `vote ${item.id} 5`,
          },
        ],
      ],
    },
  };
}

module.exports = { formatPlaceForRating, formatRatingButtons };
