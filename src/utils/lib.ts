import Cookies from "js-cookie";
import moment from "moment";

export function waitForElementToExistByClassName(selector: string) {
    return new Promise(resolve => {
        if (document.getElementsByClassName(selector).length) {
            return resolve(document.getElementsByClassName(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.getElementsByClassName(selector).length) {
                resolve(document.getElementsByClassName(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            subtree: true,
            childList: true,
        });
    });
}

export function isLogged() {
    const jwt = Cookies.get('jwt');
    if (jwt) return true;
    else return false;
}

export const convertNumberToMoney = (n: number) => {
    return n.toLocaleString('vi-VN');
}

export const convertToDate = (str: string | undefined) => {
    return moment(str).format('DD/MM/YYYY').toString();
}

export const convertToDateLL = (str: string | undefined) => {
    return moment(str).format('LL').toString();
}

export const compareTwoDate = (date1: string | undefined, date2: string | undefined) => {
    const tmp1 = moment(date1);
    const tmp2 = moment(date2);

    const diff = tmp1.diff(tmp2);

    if (diff === 0) return 0;
    else if (diff > 0) return 1;
    else return -1;
}

export const generateRandomCode = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters[randomIndex];
    }

    return randomCode;
}

export const generateKey = () => {
    const randomCode1 = generateRandomCode(8);
    const randomCode2 = generateRandomCode(8);
    return `${randomCode1 + randomCode2}_${new Date().getTime().toString()}`;
}
