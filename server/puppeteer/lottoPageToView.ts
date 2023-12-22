import { Page } from 'puppeteer';
import { sleep } from '../../lib/util';
import cheerio from 'cheerio';

async function viewBalance(page: Page): Promise<string> {

    const detailPage = cheerio.load(await page.content());
    let balance = detailPage('li.money > a > strong').text();

    let notiMessage = `잔액은 ${balance} 입니다.`
    return notiMessage;
}


export { viewBalance };
