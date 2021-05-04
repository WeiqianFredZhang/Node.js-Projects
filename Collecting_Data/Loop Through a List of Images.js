// This demo is based on Poketwo's pokedex, but the logic can apply to elsewhere.

const Discord = require("discord.js");
const fs = require("fs-extra");
const { readdirSync, rename } = require("fs-extra");
const { resolve } = require('path');
const request = require('request');
const poTwoImgPath = 'F:/Poketwo/Pokedex';  // change to your own file path

const client = new Discord.Client();
const token = "";  // your bot token here

client.on("ready", async () => {
    console.clear();
    console.log("\x1b[33m%s\x1b[0m", "Poketwo pokedex downloading has began!");
});

var pokemonName = "null", start = true, count = 0;

client.on("message", async message => {

    if (pokedex.lastMessage != null && pokedex.lastMessage.embeds[0] != null) {

        if (message.author.bot && message.channel.id == pokedex.id && message.embeds[0].title != null) {
            const download = (url, path, callback) => {
                request.head(url, (err, res, body) => {
                    request(url)
                        .pipe(fs.createWriteStream(path))
                        .on('close', callback)
                })
            }

            var temp = message.embeds[0].title.split(" — ");
            pokemonName = temp[1];
            download(message.embeds[0].image.url, poTwoImgPath + "/" + pokemonName + ".jpg", () => {
                console.log("#"+count+" — "+pokemonName)
            });
        }
    }
    if(start && pokedex.lastMessage.content == "y21dnhuiujw"){
        start = false;
        setInterval(() => {
            count++;
            pokedex.send("p!dex #"+count);
            if(count == 810){
                var files = readdirSync(poTwoImgPath);
                if(files < 809){
                    console.log("There was something wrong! Either the bot went offline or you lagged too much!")
                }
                client.destroy();
            }
        }, 10000);
    }
});

client.login(token);
