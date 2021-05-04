// The demo config.json file used is in the Basic_Bots folder

const config = require('./config.json');
client.config = config;

let listOfItems = [], specialItems = [];
const owner = config.owner;


for (const item of config.list) {
  listOfItems.push(owner + item);
  if (item.substring(0,7).toLowerCase() === "special")
    specialItems.push(item);
}
