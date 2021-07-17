process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const nodemailer = require("nodemailer");
const { callbackPromise } = require("nodemailer/lib/shared");

const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

let courseSeats = 0;

async function scrapeAddress(url){
    const browser = await puppeteer.launch({headless: false});
    
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForXPath('/html/body/div[2]/div[4]/table[4]/tbody/tr[3]/td[2]/strong');
    const [el] = await page.$x('/html/body/div[2]/div[4]/table[4]/tbody/tr[3]/td[2]/strong');
    
    const txt = await el.getProperty('textContent');
    courseSeats = await txt.jsonValue();

    console.log(courseSeats);
    browser.close();
}

scrapeAddress('https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=210&section=203');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "teevintnodeprak@outlook.com",
        pass: "Skykarpedon1168$",
    }
});

const mailInfo = {
    from: "teevintnodeprak@outlook.com",
    to: "teevint19@gmail.com",
    subject: "Course Seats Update from ScraperJS",
    text: "The Current Number of Seats is " + courseSeats,
};

if(courseSeats >= 1){
    transporter.sendMail(mailInfo, function (err, info) {
        if(err){
            console.log("There is an Error:" + err);
            return;
        }
        console.log("Sent: " + info.response);
    })
}

