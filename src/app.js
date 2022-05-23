const { Telegraf, Markup } = require("telegraf");
const { botApiKey } = require("./const/config");
const { vote, getPlaceByID, getAllPlaces, addUserIfNotExists, findFirstTenUsers } = require("./libs/Rating");

const bot = new Telegraf(botApiKey);

const EVENT_TYPES = {
  vote: "vote",
  information: "information",
  user: "user"
};

bot.command("start", async (ctx) => {
  const places = await getAllPlaces();

  await addUserIfNotExists(ctx.message.from);

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

bot.command("users", async (ctx) => {
  const users = await findFirstTenUsers();

  const userButtons = Markup.inlineKeyboard(
    users.map((user) =>
      Markup.button.callback(user.username, `user ${user.id}`)
    ),
    { columns: 1 }
  );

  ctx.replyWithMarkdown(
    "Список пользователей",
    userButtons
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

  switch (event) {
    case EVENT_TYPES.vote:
      {
        ctx.editMessageReplyMarkup({ reply_markup: [] });

        const [placeId, userVote] = args;

        await vote(userId, placeId, userVote);

        ctx.reply("Рейтинг сохранен");
      }
      break;

    case EVENT_TYPES.information:
      {
        ctx.editMessageReplyMarkup({ reply_markup: [] });

        const [placeId] = args;

        result = await getPlaceByID(placeId);

        ctx.replyWithHTML(result.formattedPlace, result.buttons);
      }
      break;

    case EVENT_TYPES.user:
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
