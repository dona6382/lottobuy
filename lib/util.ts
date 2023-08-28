

function sleep(sec: number): Promise<void> {
    sec = sec * 1000;
    return new Promise<void>((resolve) => {
        setTimeout(resolve, sec);
    });
}

export { sleep };
