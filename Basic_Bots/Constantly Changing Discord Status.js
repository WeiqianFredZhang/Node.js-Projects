const Discord = require("discord.js");
const client = new Discord.Client;

const token = "";  // Discord bot token goes in between the quotation marks
const display = ["ORZ Charles", "USCAO Platinum!"];
console.clear();
var order = 0, max = display.length;

client.on("ready", () => {
    setInterval(() => {
        console.log(display[order]);
        client.user.setActivity(display[order], {
            type: "WATCHING"
        })
        order++;
        if (order == max) {
            order = 0;
        }
    }, 12000);
})

client.on("error", (err) => {
    console.log(`Discord client error '${err.code}' (${err.message}). Attempting to reconnect in 6s...`);

    client.destroy();
    setTimeout(() => { client.login(token); }, 6000);
});

client.login(token);
