const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

const validateRequestStructure = require('../../../middleware/validateRequestStructure');
const { infoLogger } = require('../../../helpers/logger');

router.route("/tweet-message").post(validateRequestStructure, async (req, res, next) => {
    const { message } = req.body.data;

    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://twitter.com/i/flow/login");
    await page.waitForNetworkIdle({ idleTime: 1500 });

    ///////////////////////////////////////////////////////////////////////////////////
    // Select the user input
    await page.waitForSelector("[autocomplete=username]");
    await page.type("input[autocomplete=username]", process.env.TWITTER_USERNAME, { delay: 50 });
    // Press the Next button
    await page.evaluate(() =>
        document.querySelectorAll('div[role="button"]')[2].click()
    );
    await page.waitForNetworkIdle({ idleTime: 1500 });

    ///////////////////////////////////////////////////////////////////////////////////
    // Sometimes twitter suspect suspicious activties, so it ask for your handle/phone Number
    const extractedText = await page.$eval("*", (el) => el.innerText);
    if (extractedText.includes("Enter your phone number or username")) {
        await page.waitForSelector("[autocomplete=on]");
        await page.type("input[autocomplete=on]", process.env.TWITTER_USERNAME, { delay: 50 });
        await page.evaluate(() =>
            document.querySelectorAll('div[role="button"]')[1].click()
        );
        await page.waitForNetworkIdle({ idleTime: 1500 });
    }

    ///////////////////////////////////////////////////////////////////////////////////
    // Select the password input
    await page.waitForSelector('[autocomplete="current-password"]');
    await page.type('[autocomplete="current-password"]', process.env.TWITTER_PASSWORD, { delay: 50 });

    // Press the Login button
    await page.evaluate(() =>
        document.querySelectorAll('div[role="button"]')[2].click()
    );
    await page.waitForNetworkIdle({ idleTime: 2000 });
    
    // Make a post
    await page.waitForSelector('a[href="/compose/tweet"]');
    await page.click('a[href="/compose/tweet"]');

    await page.waitForSelector('div[data-testid="tweetTextarea_0"]');
    await page.type('div[data-testid="tweetTextarea_0"]', message);

    await page.waitForSelector('div[data-testid="tweetButton"]');
    await page.click('div[data-testid="tweetButton"]');

    await browser.close();

    res.send({ message: 'Tweet posted' });
});

module.exports = router;
