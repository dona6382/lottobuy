const {sleep} = require("../../lib/util");
const cheerio = require("cheerio");


async function autoBuyMode(page, extractNumber){
    await page.click('ul#tabWay2Buy > li > a#num2')         // num2 == 자동구매

    const buyAmount = extractNumber + '';
    const selectElement = await page.select('select#amoundApply', buyAmount);

    if(selectElement){
        await page.click('#btnSelectNum');                      // 확인
        await page.click('#btnBuy');                            // 구매하기

        await sleep(2);

        await page.click('#popupLayerConfirm > div > div.btns > input:nth-child(1)');   // 팝업 구매버튼

        const detailPage = cheerio.load(await page.content());
        const notiMessage =  detailPage('#popupLayerAlert > div > div.noti > span').text();
        return notiMessage;
    }
}

function manualBuyMode(){

}

module.exports = {autoBuyMode, manualBuyMode};