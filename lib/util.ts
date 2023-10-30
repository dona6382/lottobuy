

function sleep(sec: number): Promise<void> {
    sec = sec * 1000;
    return new Promise<void>((resolve) => {
        setTimeout(resolve, sec);
    });
}


function textSplit(text: string): string[] {
    const outPutText = text.split(' ');

    return outPutText;
}

export { sleep, textSplit };
