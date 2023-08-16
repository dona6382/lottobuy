//https://dhlottery.co.kr/common.do?method=main

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const user = require('../user/user');

const {sleep} = require('../../lib/util');


async function pageOpen(){
    await (
        async () => {
            let chromiumExecutablePath = puppeteer.executablePath();

            const browser = await puppeteer.launch({
                executablePath: chromiumExecutablePath,
                // headless: true,
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
                    await page.goto('https://dhlottery.co.kr/user.do?method=login&returnUrl=');   // 로그인 페이지



                    const userInfo = await user.getUser();
                    const {userId} = userInfo;
                    const {userPassword} = userInfo;

                    await page.click('#userId');
                    await page.type('#userId', userId, {delay:50});
                    await page.click('input[type=password]:nth-child(2)');
                    await page.type('input[type=password]:nth-child(2)', userPassword, {delay:50});
                    await page.click('div.form > a');
                    await page.waitForNavigation();

                    await sleep(2);

                    await page.goto('https://ol.dhlottery.co.kr/olotto/game/game645.do');  // 나눔 로또 direct Page

                    const detailPage = cheerio.load(await page.content());


                    await page.click('ul#tabWay2Buy > li > a#num2')         // num2 == 자동구매


                    // const selectElement = await page.$('select#amoundApply');
                    //TODO 입력받은 수량 만큼 values 변경 가능
                    const selectElement = await page.select('select#amoundApply', '5');


                    if(selectElement){
                        await page.click('#btnSelectNum');                      // 확인
                        await page.click('#btnBuy');                            // 구매하기

                        await sleep(2);

                        await page.click('#popupLayerConfirm > div > div.btns > input:nth-child(1)');   // 팝업 구매버튼

                        const detailPage = cheerio.load(await page.content());
                        const notiMessage = await detailPage('#popupLayerAlert > div > div.noti > span').text();

                    }

                } catch (e) {
                    console.log('페이지 로딩 실패')
                }

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

module.exports = {pageOpen};
