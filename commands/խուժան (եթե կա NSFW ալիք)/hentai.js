const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
  name: "hentai",
  category: "NSFW",
  description: "Sends random hentai gif",
  usage: "[prefix]hentai",
  run: async (client, message, args) => {

  var errMessage = "Այս ալիքը NSFW ալիք չէ";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.randomHentaiGif());

        const hentaigif = new Discord.MessageEmbed()
        .setTitle("Hentai")
        .setImage(owo.url)
        .setColor(`RANDOM`)
        .setURL(owo.url);
        message.channel.send(hentaigif);

}

      work();
}
                };