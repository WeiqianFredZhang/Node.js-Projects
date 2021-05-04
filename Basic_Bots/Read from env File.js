// This demo uses the .env file in Basic_Bots

require('dotenv').config();
const token = process.env.token;
const password = process.env.password;

const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready',()=>{
    client.user.setActivity("test");
})

client.login(token);
