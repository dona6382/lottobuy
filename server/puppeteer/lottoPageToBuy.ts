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
            const buyResult = detailPage('div#popReceipt > h2').text();

            if(buyResult.includes('구매내역 확인')){
                notiMessage = '구매완료';
            }else{
                notiMessage = notiMessage.includes('구매한도') ? '구매한도 초과' : notiMessage;
            }
        }
        return notiMessage;
    }
    return ''; // selectElement가 없을 경우 빈 문자열 반환
}

function manualBuyMode() {
    // 수동 구매 모드의 구현
}

export { autoBuyMode, manualBuyMode };
