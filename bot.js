require('dotenv').config();
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client();

const keepAlive = require('./server');
keepAlive();

client.on('ready', () => console.log('Discord Bot is starting!'));

client.on('message', async (message) => {
  if (message.channel.id == process.env.PUBLIC_COC_CHANNEL_ID) {
    const { content, author } = message;
    const { username } = author;
    const avatarUrl = author.avatarURL();
    const cocLogsChannel = message.guild.channels.cache.find((ch) => ch.id == process.env.MOD_COC_LOGS);
    const embed = new MessageEmbed().setColor('#FF6663').setAuthor(username, avatarUrl).setDescription(content);
    await cocLogsChannel.send(embed);
    await message.delete();
  }
});

client.login(process.env.BOT_TOKEN);
