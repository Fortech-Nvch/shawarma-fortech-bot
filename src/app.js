const { Telegraf, Markup } = require("telegraf");
const { botApiKey } = require("./const/config");
const { vote, getPlaceByID, getAllPlaces } = require("./libs/Rating");

const bot = new Telegraf(botApiKey);

const EVENT_TYPES = {
  vote: "vote",
  information: "information",
};

bot.command("start", async (ctx) => {
  const places = await getAllPlaces();

  const buttons = Markup.inlineKeyboard(
    places.map((place) =>
      Markup.button.callback(place.name, `information ${place.id}`)
    ),
    { columns: 2 }
  );

  ctx.replyWithMarkdown(
    "Выберите место, чтобы узнать подробную информацию о нем",
    buttons
  );
});

bot.command("bonus", async (ctx) => {
  ctx.reply(
    "Для получения сертификата на шаурму, напишите Саше с кодом 123123"
  );
});

bot.on("callback_query", async (ctx) => {
  const userId = ctx.callbackQuery.from.id;
  const callbackData = ctx.callbackQuery.data;
  const [event, ...args] = callbackData.split(" ");
  ctx.editMessageReplyMarkup({ reply_markup: [] });

  switch (event) {
    case EVENT_TYPES.vote:
      {
        const [placeId, userVote] = args;

        await vote(userId, placeId, userVote);

        ctx.reply("Рейтинг сохранен");
      }
      break;

    case EVENT_TYPES.information:
      {
        const [placeId] = args;

        result = await getPlaceByID(placeId);

        ctx.replyWithHTML(result.formattedPlace, result.buttons);
      }
      break;

    default: {
      ctx.reply("Неизвестная команда");
    }
  }
});

bot.on("text", (ctx) => {
  ctx.reply("Не понимаю");
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
