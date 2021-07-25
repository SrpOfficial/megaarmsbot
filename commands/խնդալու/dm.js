module.exports = {
    name: "dm",
    description: "DM a user in the guild",
    category: "fun",
    run: async (bot, message, args) => {
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `Դուք չեք նշել օգտագործողին կամ տվել եք անվավեր ID`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("Խնդրում ենք նշել ձեր հաղորդագրությունը");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("ERR :x: - Ես չէի կարող այդ օգտատիրոջը ԴՄ ուղարկել, կարող է լինել այն պատճառով, որ նրանք փակել են իրենց ԴՄ-ները կամ արգելափակել են ինձ :("))
        .then(() => message.channel.send(`Հաղորդագրություն է ուղարկվել է ${user.user.tag}`));
    },
  };