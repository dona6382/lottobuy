import { Page } from 'puppeteer';
import { sleep } from '../../lib/util';
import cheerio from 'cheerio';

async function autoBuyMode(page: Page, extractNumber: string): Promise<string> {
    await page.click('ul#tabWay2Buy > li > a#num2'); // num2 == 자동구매

    const buyAmount = extractNumber + '';
    const selectElement = await page.select('select#amoundApply', buyAmount);

    if (selectElement) {
        await page.click('#btnSelectNum'); // 확인
        await page.click('#btnBuy'); // 구매하기

        await sleep(2);

        await page.click('#popupLayerConfirm > div > div.btns > input:nth-child(1)'); // 팝업 구매버튼

        const detailPage = cheerio.load(await page.content());
        let notiMessage = detailPage('#popupLayerAlert > div > div.noti > span').text();

        if(!notiMessage || notiMessage.length === 0){    // 구매제한 추가
            notiMessage = detailPage('div.box > div.head').text();
            if(notiMessage.includes('구매한도')){
                notiMessage = '구매한도 초과'
            }
            // 구매한도 초과로 나오는데 구매됨
        }else{
            notiMessage = '구매완료';
        }
        return notiMessage;
    }
    return ''; // selectElement가 없을 경우 빈 문자열 반환
}

function manualBuyMode() {
    // 수동 구매 모드의 구현
}

export { autoBuyMode, manualBuyMode };
