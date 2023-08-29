import puppeteer, { Page, Browser } from 'puppeteer';
import { BUYMODE } from "../commandVariable";
import { autoBuyMode, manualBuyMode } from './lottoPageToBuy';
import { sleep } from '../../lib/util';

interface UserInfo {
    userId: string;
    userPassword: string;
}

async function pageOpen(getUserInfo: UserInfo, extractNumber: string, buyMode: string): Promise<string> {
    let resultMessage = '';

    await (async () => {
        let chromiumExecutablePath = puppeteer.executablePath();

        const browser: Browser = await puppeteer.launch({
            executablePath: chromiumExecutablePath,
            // headless: true,
            headless: false,
            defaultViewport: {
                width: 1280,
                height: 800
            },
            slowMo: 50,
            ignoreHTTPSErrors: true,
            args: ['--no-sandbox', '--lang=ko', '--disable-features=site-per-process'],
        });

        try {
            const page: Page = await browser.newPage();

            await page.goto('https://dhlottery.co.kr/user.do?method=login&returnUrl='); // 로그인 페이지

            const { userId } = getUserInfo;
            const { userPassword } = getUserInfo;

            await page.click('#userId');
            await page.type('#userId', userId, { delay: 50 });
            await page.click('input[type=password]:nth-child(2)');
            await page.type('input[type=password]:nth-child(2)', userPassword, { delay: 50 });
            await page.click('div.form > a');
            await page.waitForNavigation();

            await sleep(2);

            await page.goto('https://ol.dhlottery.co.kr/olotto/game/game645.do'); // 나눔 로또 direct Page

            if (buyMode === BUYMODE.AUTO) {
                resultMessage = await autoBuyMode(page, extractNumber);
            } else if (buyMode === BUYMODE.MANUAL) {
                resultMessage = await manualBuyMode(page, extractNumber);
            }
        } catch (error) {
            console.error('페이지 오류 발생:', error);
        } finally {
            // 브라우저를 종료합니다.
            await browser.close();
        }
    })();

    return resultMessage;
}

export { pageOpen };
