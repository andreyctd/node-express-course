const os = require("os");

console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU count:", os.cpus().length);
console.log("Free memory:", os.freemem());
console.log("Total memory:", os.totalmem());
