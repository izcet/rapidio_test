const rapid = require("rapid-io");
const api = require("api.key.json");
const rapidClient = rapid.createClient(api.key);
console.log(api.key);
