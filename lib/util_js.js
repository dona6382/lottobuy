


function sleep(sec){
    sec = sec*1000
    return new Promise((resolve)=>{
        setTimeout(resolve, sec);
    });
};



module.exports = {sleep};