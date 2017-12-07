const weather = require("./weather.js");//require module

const query = process.argv.slice(2);

console.log(query);

weather.get(query);
