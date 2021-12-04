import { Calender } from "./Calender.js";
import { Rendering } from "./Rendering.js";
import { $, $All } from "./util.js";
const date = new Date();
let nowMonth = date.getMonth() + 1;
let nowYear = date.getFullYear();
let today = date.getDate();
let targetCalendar;
let posInitial;
let allow = true;
class App {
    constructor(appRoot, nowYear, nowMonth, today) {
        this.calenders = appRoot;
        this.totalIdx = 0;
        new Rendering(nowYear, nowMonth, today, appRoot, this.totalIdx);
        this.timeCheck();
        this.arrowFunction(".left");
        this.arrowFunction(".right");
    }
    timeCheck() {
        $(".month_current").textContent = `${nowMonth}`;
        $(".year_current").textContent = `${nowYear}`;
    }
    arrowFunction(dir) {
        const arrow = $(dir);
        arrow.addEventListener("click", (e) => {
            this.calenders.classList.add("shifting");
            posInitial = this.calenders.offsetLeft;
            if (dir == ".left") {
                this.calenders.style.left = posInitial + 500 + "px";
                this.totalIdx--;
                posInitial += 500;
                if (nowMonth > 1)
                    nowMonth--;
                else {
                    nowYear = nowYear - 1;
                    nowMonth = 12;
                }
                const length = $All(".calender").length;
                if (this.totalIdx <= -1 && allow) {
                    new Calender(nowYear, nowMonth, today).leftArrow($(".calenders"), this.totalIdx, length, posInitial, allow);
                    allow = false;
                    $(".calenders").addEventListener("transitionend", () => (allow = true));
                }
            }
            if (dir == ".right") {
                this.calenders.style.left = posInitial - 500 + "px";
                this.totalIdx++;
                posInitial += -500;
                if (nowMonth < 12)
                    nowMonth++;
                else {
                    nowYear = nowYear + 1;
                    nowMonth = 1;
                }
                const length = $All(".calender").length;
                if (this.totalIdx >= 1 && allow) {
                    console.log(nowYear, nowMonth);
                    new Calender(nowYear, nowMonth, today).rightArrow($(".calenders"), length, allow);
                    allow = false;
                    $(".calenders").addEventListener("transitionend", () => (allow = true));
                }
            }
            this.timeCheck();
        });
    }
}
new App($(".calenders"), nowYear, nowMonth, today);
