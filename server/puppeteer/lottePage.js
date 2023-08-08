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
                    await page.goto('https://dhlottery.co.kr/user.do?method=login&returnUrl=');   // 로그인 페이지

                    const detailPage = cheerio.load(await page.content());

                    await page.click('#userId');
                    await page.type('#userId', 'kim63826382', {delay:50});
                    await page.click('input[type=password]:nth-child(2)');
                    await page.type('input[type=password]:nth-child(2)', '12ckdgnl17!', {delay:50});
                    await page.click('div.form > a');
                    await page.waitForNavigation();

                    await sleep(2);

                    await page.goto('https://el.dhlottery.co.kr/game/TotalGame.jsp?LottoId=LO40');  // 로또 페이지 이동

                    //TODO 자동번호 클릭부터 이슈
                    await page.click('ul#tabWay2Buy > li > a#num2')         // num2 == 자동구매
                    await page.click('#amoundApply > option:nth-child(5)')  // 적용수량 설정
                    await page.click('#btnSelectNum');                      // 확인
                    await page.click('#btnBuy');                            // 구매하기

                    await sleep(2);

                    await page.click('#popupLayerConfirm > div > div.btns > input:nth-child(1)');   // 팝업 구매버튼



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
