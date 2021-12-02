var _a, _b;
export const $ = (element) => document.querySelector(element);
class App {
    constructor(nowMonth, nowYear, today, Month_day, dates, sunDay) {
        this.nowMonth = nowMonth;
        this.nowYear = nowYear;
        this.today = today;
        this.Month_day = Month_day;
        this.dates = dates;
        this.sunDay = sunDay;
    }
}
const date = new Date();
let nowMonth = date.getMonth() + 1;
let nowYear = date.getFullYear();
let today = date.getDate();
let Month_day;
let dates = [];
let sunDay = [];
let dateAll;
let startDay;
let endDay;
function render() {
    let firstDay = new Date(2021, nowMonth - 1, 1).getDay();
    let firstSunday = sunDayCheck(firstDay);
    $(".month_current").textContent = `${nowMonth}`;
    $(".year_current").textContent = `${nowYear}`;
    $(".img_text").textContent = `${nowMonth}`;
    switch (nowMonth) {
        case 2:
            Month_day = 28;
            break;
        case 4:
            Month_day = 30;
            break;
        case 6:
            Month_day = 30;
            break;
        case 9:
            Month_day = 30;
            break;
        case 11:
            Month_day = 30;
            break;
        default:
            Month_day = 31;
            break;
    }
    for (let i = 0; i < firstDay; i++) {
        $(".dates").innerHTML += `<div class="date"></div>`;
    }
    for (let i = 1; i <= Month_day; i++) {
        if (i < 10)
            dates.push(`<div class="date">&nbsp;&nbsp;${i}</div>`);
        else
            dates.push(`<div class="date">${i}</div>`);
    }
    dates.forEach((date) => {
        $(".dates").innerHTML += date;
    });
    dateAll = document.querySelectorAll(".date");
    for (let i = 0; i < dateAll.length; i++) {
        if (!sunDay.length || sunDay[sunDay.length - 1] < 32) {
            sunDay.push(firstSunday);
            firstSunday += 7;
        }
        if (nowMonth === date.getMonth() + 1 && nowYear === date.getFullYear()) {
            if (dateAll[i].textContent === String(today)) {
                dateAll[i].classList.add("today");
            }
        }
        if (sunDay.includes(Number(dateAll[i].textContent))) {
            dateAll[i].classList.add("sunday");
        }
    }
    dateAll.forEach((el) => el.addEventListener("click", (e) => {
        const target = e.target;
        const randomColor = "green";
        target.style.color = randomColor;
        target.style.fontWeight = "600";
    }));
}
/////////////////
let totalIdx = 0;
let posInitial;
const calenders = document.querySelector(".calenders");
(_a = $(".left")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    calenders === null || calenders === void 0 ? void 0 : calenders.classList.add("shifting");
    posInitial = calenders.offsetLeft;
    calenders.style.left = posInitial + 500 + "px";
    totalIdx--;
    if (nowMonth > 1)
        nowMonth--;
    else {
        nowYear = nowYear - 1;
        nowMonth = 12;
    }
    init();
    render();
});
(_b = $(".right")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
    calenders === null || calenders === void 0 ? void 0 : calenders.classList.add("shifting");
    posInitial = calenders.offsetLeft;
    calenders.style.left = posInitial - 500 + "px";
    totalIdx++;
    if (nowMonth < 12)
        nowMonth++;
    else {
        nowYear = nowYear + 1;
        nowMonth = 1;
    }
    init();
    render();
});
calenders.addEventListener("transitionend", (e) => {
    calenders.classList.remove("shifting");
    if (totalIdx == -1) {
    }
});
function init() {
    dates = [];
    sunDay = [];
    $(".dates").innerHTML = "";
}
function sunDayCheck(day) {
    if (day === 1)
        return 7;
    if (day === 2)
        return 6;
    if (day === 3)
        return 5;
    if (day === 4)
        return 4;
    if (day === 5)
        return 3;
    if (day === 6)
        return 2;
    return 1;
}
// function randomColorGenerator(): string {
//   return Math.floor(Math.random() * 16777215).toString(16);
// }
window.onload = () => render();
