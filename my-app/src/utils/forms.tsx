export const checkFHFormat = (str = ''): boolean => {
    let count = 0;
    for (let char of str) {
        if (char === ':') count += 1
    }
    if (count !== 1) return false;
    if (str[str.length - 3] !== ':') return false;
    if (str[str.length - 2] > '5') return false;
    if (str.length > 9) return false;
    return true
}