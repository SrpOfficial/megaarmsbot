const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'clear',
    description: "Purge Messages",
    aliases: ['purge'],
    run: async(client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(`Այս հրահանգն օգտագործելու թույլտվություններ չունեք, ${message.author.username}`);

        if (!args[0]) {
            return message.channel.send("Խնդրում ենք մուտքագրել գումարը 1-ից 100-ի սահմաններում")
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;

        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);

        const embed = new MessageEmbed()
            .setDescription(`Հաջողությամբ ջնջված է ${deleteAmount} Հաղորդագրություն`)
            
            .setColor('RANDOM')

        await message.channel.send(embed).then(message => message.delete({timeout: 5000}))

    }
}