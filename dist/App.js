import { Rendering } from "./Rendering.js";
import { $ } from "./util.js";
const date = new Date();
let nowMonth = date.getMonth() + 1;
let nowYear = date.getFullYear();
let today = date.getDate();
let targetCalendar;
let totalIdx = 0;
let posInitial;
class App {
    constructor(appRoot, nowYear, nowMonth, today, dir) {
        this.calenders = appRoot;
        new Rendering(nowYear, nowMonth, today, appRoot);
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
                totalIdx = -1;
                if (nowMonth > 1)
                    nowMonth--;
                else {
                    nowYear = nowYear - 1;
                    nowMonth = 12;
                }
            }
            if (dir == ".right") {
                this.calenders.style.left = posInitial - 500 + "px";
                totalIdx = 1;
                if (nowMonth < 12)
                    nowMonth++;
                else {
                    nowYear = nowYear + 1;
                    nowMonth = 1;
                }
            }
            this.timeCheck();
        });
    }
}
new App($(".calenders"), nowYear, nowMonth, today);
