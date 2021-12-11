export function _filter(dates, predi) {
    let newarr = [];
    for (let i = 0; i < dates.length; i++) {
        if (predi(dates[i])) {
            newarr.push(dates[i]);
        }
    }
    return newarr;
}
