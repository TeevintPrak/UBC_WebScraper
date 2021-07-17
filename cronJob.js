const cron = require("node-cron");
let shell = require("shelljs");

cron.schedule("* * * * * *", function() {
    console.log("Scheduler running...");
    if(shell.exec("node scraper.js").code !== 0){
        console.log("There is an Error");
    }
});