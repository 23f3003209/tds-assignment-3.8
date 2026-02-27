import { chromium } from "playwright";

const seeds = [58, 59, 60, 61, 62, 63, 64, 65, 66, 67];

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let grandTotal = 0;

    for (const s of seeds) {
        const url = `https://sanand0.github.io/tdsdata/table.html?seed=${s}`;
        await page.goto(url);

        const numbers = await page.$$eval("table td", tds =>
            tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
        );

        grandTotal += numbers.reduce((a, b) => a + b, 0);
    }

    console.log("FINAL TOTAL =", grandTotal);

    await browser.close();
})();