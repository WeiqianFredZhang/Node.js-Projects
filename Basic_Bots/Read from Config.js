// The Demo config.json file used is in the Basic_Bots folder

const config = require('./config.json');

let listOfItems = [], specialItems = [];

for (const item of config.list) {
  listOfItems.push(item);
  if (item.substring(0,7).toLowerCase() === "special")
    specialItems.push(item);
}
