export default function random(len) {
    let key = '';
    for (let i = 0; i < len; i++) {
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        str = str.split('').sort(() => Math.random() - 0.5).join('').slice(0, 1);
        key += str;
    }
    return key;
}