// This demo is used on Poketwo Discord bot for simplicity

const Discord = require("discord.js");
const fs = require("fs-extra");
const { readdirSync, rename } = require("fs-extra");
const { resolve } = require('path');
const request = require('request');


const client = new Discord.Client();
const token = "";  // your Discord bot token here
const poTwoImgPath = 'F:/Poketwo/Pokemon_Images'; 


let pokeTwoList = ["null"];

client.on("ready", async () => {
    console.clear();
    console.log("\x1b[33m%s\x1b[0m", "Poketwo file downloading has began!");
});

var tempImageURL = "null", start = true, count = 0, pokemonName = "null", urlSplit;

client.on("message", async message => {
  const appeared = message.embeds[0].title.includes("has appeared!");
  const notDuplicated = tempImageURL != message.embeds[0].image.url && !pokeTwoList.includes(message.embeds[0].image.url);
  
    if (message != null && message != undefined && message.embeds[0] != null && message.embeds[0] != undefined) {
        var files = readdirSync(poTwoImgPath);
        if (message.author.bot && message.embeds[0].title != null && appeared) {
            const download = (url, path, callback) => {
                request.head(url, (err, res, body) => {
                    request(url)
                        .pipe(fs.createWriteStream(path))
                        .on('close', callback)
                })
            }

            if (start == true && appeared && notDuplicated) {
                start = false;
                pokeTwoList.push(message.embeds[0].image.url);

                urlSplit = message.embeds[0].image.url.replace(/[^0-9]/g, "");

                download(message.embeds[0].image.url, poTwoImgPath + "/" + urlSplit + ".jpg", () => {
                    console.log("This msg should only output once")
                });

            } else if (appeared && notDuplicated) {
                var title = catchChannel.lastMessage.embeds[0].title;
                var trimWild = title.split("Wild ");
                var trimFled = trimWild[1].split(" fled");
                pokemonName = trimFled[0].replace(/[:]/g, "");

                if (!pokeTwoList.includes(pokemonName) && !files.includes(pokemonName + ".jpg")) {
                    renameFile(pokemonName);

                    pokeTwoList.push(pokemonName);
                    pokeTwoList.push(message.channel.lastMessage.embeds[0].image.url);
                    urlSplit = message.channel.lastMessage.embeds[0].image.url.replace(/[^0-9]/g, "");
                    count++;

                    download(message.channel.lastMessage.embeds[0].image.url, poTwoImgPath + "/" + urlSplit + ".jpg", () => {
                        console.log(count + ". " + pokemonName);
                    });

                } else if (files.includes(pokemonName + ".jpg")) {
                    fs.unlinkSync(poTwoImgPath + "/" + urlSplit + ".jpg");
                    pokeTwoList.push(message.channel.lastMessage.embeds[0].image.url);
                    urlSplit = message.channel.lastMessage.embeds[0].image.url.replace(/[^0-9]/g, "");
                    download(message.channel.lastMessage.embeds[0].image.url, poTwoImgPath + "/" + urlSplit + ".jpg", () => {
                        console.log("Deleted one file because the pokemon's name was " + pokemonName);
                    });
                }
            }
        }
    }

    function renameFile(pokemonName) {
        let files = readdirSync(poTwoImgPath);
        files.filter(f => (hasNumber(f) && f.length > 20)).forEach(file => rename(poTwoImgPath + `/${file}`, poTwoImgPath + `/${pokemonName + ".jpg"}`, err => console.log(err)));
    }

    function hasNumber(fileName) {
        return /\d/.test(fileName);
    }
});

client.login(token);
