const { MessageEmbed } = require('discord.js');
const moment = require('moment');


const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very High'
};

const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};


module.exports = {
    name: 'serverinfo',
    description: 'Տեղեկացեք սերվերի մասին',
    aliases: ['serverinfo', 'info'],
    run: async(client, message, args) => {

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setDescription(`**${message.guild.name} **Սերվերի մասին տեղեկություններ`)
            .setColor('BLUE')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('General', [
                `**Սերվերի Անունը** : ${message.guild.name}`,
                `**Սերվերի տերը** : ${message.guild.owner}  / ID: ${message.guild.ownerID})`,
                `**Ռեգիոն** : ${regions[message.guild.region]}`,
                `**Բուստեր** : ${message.guild.premiumTier ? `${message.guild.premiumTier}` : 'None'}`,
                `**Explicit Filter** : ${filterLevels[message.guild.explicitContentFilter]}`,
                `**Ստուգման մակարդակ** : ${verificationLevels[message.guild.verificationLevel]}`,
                `**Ստեղծման ամսաթիվը** : ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                '\u200b'
            ])
            .addField('Սերվեր հաշվիչ', [
                `**Էմոջիների քանակը:** ${emojis.size}`,
                `**Սովորական Էմոջիների քանակը :** ${emojis.filter(emoji => !emoji.animated).size}`,
                `**Անիմացիան Էմոջիների քանակը:** ${emojis.filter(emoji => emoji.animated).size}`,
                `**Մարդկանց քանակը:** ${message.guild.memberCount}`,
                `**Մարդինք:** ${members.filter(member => !member.user.bot).size}`,
                `**Բոտեր:** ${members.filter(member => member.user.bot).size}`,
                `**Տեքստ ալիքներ:** ${channels.filter(channel => channel.type === 'text').size}`,
                `**բուստերի քանակը:** ${message.guild.premiumSubscriptionCount || '0'}`,
                `**Պաշտոների քանակը:**  ${roles.length}`,
                '\u200b'
            ])    
            .addField('Ներկայություն', [
                `**Առցանց:** ${members.filter(member => member.presence.status === 'online').size}`,
                `**Պարապ:** ${members.filter(member => member.presence.status === 'idle').size}`,
                `**Չխանգարել:** ${members.filter(member => member.presence.status === 'dnd').size}`,
                `**Անցանց:** ${members.filter(member => member.presence.status === 'offline').size}`,
                '\u200b'
            ]) 
            .addField(` Պաշտոներ[${roles.length - 1}]`, roles.join(', '))    
        message.channel.send(embed);
    }
};

