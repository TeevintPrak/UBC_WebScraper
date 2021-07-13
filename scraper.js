const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

async function scrapeAddress(url){
    const browser = await puppeteer.launch({headless: false});
    
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForXPath('/html/body/div[2]/div[4]/table[4]/tbody/tr[3]/td[2]/strong');
    const [el] = await page.$x('/html/body/div[2]/div[4]/table[4]/tbody/tr[3]/td[2]/strong');
    
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();

    console.log(rawTxt);
    browser.close();
}
scrapeAddress('https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=CPSC&course=210&section=203');