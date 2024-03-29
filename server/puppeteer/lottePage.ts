import puppeteer, { Page, Browser } from 'puppeteer';
import {BUYMODE, VIEWMODE} from "../commandVariable";
import { autoBuyMode, manualBuyMode } from './lottoPageToBuy';
import { sleep } from '../../lib/util';
import {viewBalance} from "./lottoPageToView";

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

async function goToLottoBuyPage(page: Page): Promise<void> {
    await page.goto('https://ol.dhlottery.co.kr/olotto/game/game645.do');
}

async function pageOpen(getUserInfo: UserInfo, extractNumber: string, mode:string, detailMode: string): Promise<string> {
    let pageResult = '';

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

        switch (mode) {
            case "buy":
                await goToLottoBuyPage(page);

                if (detailMode === BUYMODE.AUTO) {
                    pageResult = await autoBuyMode(page, extractNumber);
                } else if (detailMode === BUYMODE.MANUAL) {
                    // purchaseResult = await manualBuyMode(page, extractNumber);
                }
                break;
            case "view":
                if(detailMode === VIEWMODE.BALANCE){
                    pageResult = await viewBalance(page);
                }else if(detailMode === VIEWMODE.LIST){

                }else if(detailMode === VIEWMODE.RESULT){

                }
                break;
            default:
               return "존재하지않는 mode";
        }

    } catch (error) {
        console.error('페이지 오류 발생:', error);
    } finally {
        await browser.close();
    }

    return pageResult;
}

export { pageOpen };
