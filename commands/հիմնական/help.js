const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../..");

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "ցուցադրում է բոտի բոլոր հասանելի հրամանները.",
  run: async (client, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Հրամանի անուն չկա.";

          let name = file.name.replace(".js", "");

          return `\`${name},\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "Ընթացքում." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Օգնության կարիք ունես? Ահա իմ բոլոր հրամանները:")
        .addFields(categories)
        .setDescription(
          `Օգտագործեք \`${prefix}help\` հրամանի մասին ավելի շատ տեղեկություններ ստանալու համար: Օրինակ:: \`${prefix}help ban\`.`
        )
        .setFooter(
          `Հայցում է ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Անվավեր հրաման. Օգտագործեք: \`${prefix}help\` բոլոր հրամանների համար!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Հրամանի մանրամասները:")
        .addField("Պրեֆիքս:", `\`${prefix}\``)
        .addField(
          "Հրաման:",
          command.name ? `\`${command.name}\`` : "Այս հրամանի անուն չկա."
        )
        .addField(
          "ԱԼԻԱՍՆԵՐ:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Այս հրամանի կեղծանուններ չկան."
        )
        .addField(
          "ՕԳՏԱԳՈՐՈՒՄ:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "ՆԿԱՐԱԳՐՈՒԹՅՈՒՆ:",
          command.description
            ? command.description
            : "Այս հրամանի նկարագրություն չկա."
        )
        .setFooter(
          `Հայցում է ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};