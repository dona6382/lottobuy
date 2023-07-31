//https://dhlottery.co.kr/common.do?method=main

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const {sleep} = require('../../lib/util');

async function pageOpen(){
    await (
        async () => {
            let chromiumExecutablePath = puppeteer.executablePath();

            const browser = await puppeteer.launch({
                executablePath: chromiumExecutablePath,
                headless: false,
                defaultViewport: {
                    width: 1280,
                    height: 800
                },
                slowMo: 50,
                ignoreHTTPSErrors: true,
                args: ['--no-sandbox',
                    '--lang=ko',
                    '--disable-features=site-per-process'
                ],
            });

            try {
                const page = await browser.newPage();

                try {
                    await page.goto('https://dhlottery.co.kr/common.do?method=main');
                } catch (e) {
                    console.log('페이지 로딩 실패')
                }

                await sleep(5);

                const detailPage = cheerio.load(await page.content());


            } catch (error) {
                console.error('오류 발생:', error);
            } finally {
                // 브라우저를 종료합니다.
                await browser.close();
            }
        }
    )();
}

const main = async () =>{
    const getOpenPage = pageOpen();

}



main();
