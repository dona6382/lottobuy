import puppeteer, { Page, Browser } from 'puppeteer';
import { BUYMODE } from "../commandVariable";
import { autoBuyMode, manualBuyMode } from './lottoPageToBuy';
import { sleep } from '../../lib/util';

interface UserInfo {
    userId: string;
    userPassword?: string | undefined;
}

async function login(page: Page, getUserInfo: UserInfo): Promise<void> {
    const { userId } = getUserInfo;
    const { userPassword } = getUserInfo;

    await page.goto('https://dhlottery.co.kr/user.do?method=login&returnUrl=');
    await page.click('#userId');
    await page.type('#userId', userId, { delay: 50 });
    await page.click('input[type=password]:nth-child(2)');

    if (userPassword !== undefined) {
        await page.type('input[type=password]:nth-child(2)', userPassword, { delay: 50 });
    }
    await page.click('div.form > a');
    await page.waitForNavigation();
    await sleep(2);
}

async function goToLottoPage(page: Page): Promise<void> {
    await page.goto('https://ol.dhlottery.co.kr/olotto/game/game645.do');
}

async function pageOpen(getUserInfo: UserInfo, extractNumber: string, buyMode: string): Promise<string> {
    let purchaseResult = '';

    const chromiumExecutablePath = puppeteer.executablePath();
    const browser: Browser = await puppeteer.launch({
        executablePath: chromiumExecutablePath,
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
        await login(page, getUserInfo);
        await goToLottoPage(page);

        if (buyMode === BUYMODE.AUTO) {
            purchaseResult = await autoBuyMode(page, extractNumber);
        } else if (buyMode === BUYMODE.MANUAL) {
            // purchaseResult = await manualBuyMode(page, extractNumber);
        }
    } catch (error) {
        console.error('페이지 오류 발생:', error);
    } finally {
        await browser.close();
    }

    return purchaseResult;
}

export { pageOpen };
