var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Calender } from "./Calender.js";
import { _filter } from "./Fn.js";
import { $, $All } from "./util.js";
const date = new Date();
let nowMonth = date.getMonth() + 1;
let nowYear = date.getFullYear();
let today = date.getDate();
let posInitial;
let posFinal;
let allow = true;
let drag = false;
let empty = 0;
class App {
    constructor(appRoot, nowYear, nowMonth, today) {
        this.calenders = appRoot;
        this.totalIdx = 0;
        this.start = 0;
        this.end = 0;
        this.posX1 = 0;
        this.posX2 = 0;
        this.threshold = 100;
        this.mainCalendar = new Calender(nowYear, nowMonth, today);
        this.mainCalendar.attachTo(appRoot, "afterbegin");
        this.timeCheck();
        this.arrowFunction(".left");
        this.arrowFunction(".right");
        this.allDates = $All(".dates");
        this.dateClick();
        this.item = $(".calenders");
        this.item.classList.add("shifting");
        this.item.onmousedown = this.dragStart.bind(this);
        this.item.addEventListener("touchmove", this.dragAction.bind(this));
        this.item.addEventListener("touchend", this.dragEnd.bind(this));
        this.item.addEventListener("touchstart", this.dragStart.bind(this));
        this.dateFetch();
    }
    dateRender(dates) {
        var _a;
        const Alldate = $All(".date");
        const filterdDate = _filter(Alldate, (el) => {
            if (!el.dataset.date)
                return false;
            const dateYearMonth = el.dataset.date.split("-");
            return nowYear === +dateYearMonth[0] && nowMonth === +dateYearMonth[1];
        });
        console.log(filterdDate);
        for (let i = 0; i < dates.length; i++) {
            let { year, month, day, body } = dates[i];
            for (let j = 0; j < filterdDate.length; j++) {
                const target = filterdDate[j];
                const n = Number((_a = target.firstChild) === null || _a === void 0 ? void 0 : _a.textContent);
                if (year === nowYear && nowMonth === month && n === day) {
                    target.insertAdjacentHTML("beforeend", `<small class='todo_text'>${body}</small>`);
                }
            }
        }
    }
    dateFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch("http://localhost:3000", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                this.todoList = data;
                this.dateRender(this.todoList);
            });
        });
    }
    timeCheck() {
        $(".month_current").textContent = `${nowMonth}`;
        $(".year_current").textContent = `${nowYear}`;
    }
    dateClick() {
        if (drag)
            return;
        this.allDates.forEach((date) => date.addEventListener("click", (e) => {
            var _a;
            const t = e.target;
            const target = t.closest(".date");
            const dates = target.parentElement.childNodes;
            let num = Number(target.textContent);
            if (!target.querySelector("form")) {
                target.insertAdjacentHTML("beforeend", "<form type='submit'><input autofocus='true' max='30' class='todo_input' placeholder='  해야할일을 입력해주세요'/></form>");
            }
            (_a = $All("form")) === null || _a === void 0 ? void 0 : _a.forEach((form) => {
                form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    e.preventDefault();
                    const targetday = e.target;
                    const selectedDay = (_b = (_a = targetday.closest(".date")) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.textContent;
                    const form = target.querySelector("form");
                    const input = target.querySelector(".todo_input");
                    const input_value = input.value;
                    console.log(input_value);
                    console.log(input);
                    target.insertAdjacentHTML("beforeend", `<small class='todo_text'>${input_value}</small>`);
                    form.remove();
                    const data = {
                        year: nowYear,
                        month: nowMonth,
                        day: Number(selectedDay),
                        body: input_value,
                    };
                    yield fetch("http://localhost:3000", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => console.log(data))
                        .catch((err) => console.log(err));
                }));
            });
            // if (!this.start) {
            //   this.start = num;
            //   target.classList.add("todo");
            // }
            // if (this.start < num) {
            //   this.end = num;
            // }
            // if (this.start > num) {
            //   let tem = this.start;
            //   this.start = num;
            //   this.end = tem;
            // }
            // console.log("start", this.start);
            // console.log("end", this.end);
            // function _filter(
            //   dates: NodeListOf<HTMLElement> | any,
            //   predi: (date: HTMLElement) => string | null
            // ) {
            //   let newarr: NodeListOf<HTMLElement>[] = [];
            //   for (let i = 0; i < dates.length; i++) {
            //     if (predi(dates[i])) {
            //       newarr.push(dates[i]);
            //     }
            //   }
            //   return newarr;
            // }
            // const filtered = _filter(dates, (date) => date.textContent);
            // for (let i = 0; i <= filtered.length; i++) {
            //   const div = document.createElement("div");
            //   div.setAttribute("class", "line");
            //   if (i >= this.start && i <= this.end) {
            //     console.log(filtered[i - 1]);
            //     const target = filtered[i - 1]! as HTMLElement | any;
            //     target.classList.add("todo");
            //   }
            // }
        }));
    }
    dragStart(e) {
        drag = true;
        posInitial = this.item.offsetLeft;
        if (e.type == "touchstart") {
            this.posX1 = e.touches[0].clientX;
        }
        else {
            this.posX1 = e.clientX;
            console.log(this.posX1);
            document.onmouseup = this.dragEnd.bind(this);
            document.onmousemove = this.dragAction.bind(this);
        }
    }
    dragAction(e) {
        if (e.type == "touchmove") {
            this.posX2 = this.posX1 - e.touches[0].clientX;
            this.posX1 = e.touches[0].clientX;
        }
        else {
            this.posX2 = this.posX1 - e.clientX;
            this.posX1 = e.clientX;
        }
        this.item.style.left = this.item.offsetLeft - this.posX2 + "px";
    }
    dragEnd(e) {
        posFinal = this.item.offsetLeft;
        this.item.classList.add("shifting");
        const length = $All(".calender").length;
        if (posFinal - posInitial < -20) {
            this.item.style.left = posInitial - 1200 + "px";
            this.totalIdx++;
            posInitial -= 1200;
            if (nowMonth < 12)
                nowMonth++;
            else {
                nowYear = nowYear + 1;
                nowMonth = 1;
            }
            this.arrowRender(posInitial, length, allow, "right");
        }
        else if (posFinal - posInitial > 20) {
            this.calenders.style.left = posInitial + 1200 + "px";
            this.totalIdx--;
            posInitial += 1200;
            if (nowMonth > 1)
                nowMonth--;
            else {
                nowYear = nowYear - 1;
                nowMonth = 12;
            }
            this.arrowRender(posInitial, length, allow, "left");
        }
        else {
            this.item.style.left = posInitial + "px";
        }
        document.onmouseup = null;
        document.onmousemove = null;
        drag = false;
    }
    arrowRender(posInitial, length, allow, dir) {
        console.log("arrowrender");
        if (this.totalIdx == length) {
            new Calender(nowYear, nowMonth, today).rightArrow($(".calenders"), length, allow, this.totalIdx, empty, posInitial);
            this.dateRender(this.todoList);
        }
        if (this.totalIdx == -1) {
            new Calender(nowYear, nowMonth, today).leftArrow($(".calenders"), this.totalIdx, length, posInitial, allow);
            this.totalIdx = 0;
            empty++;
            this.dateRender(this.todoList);
        }
        $(".calenders").addEventListener("transitionend", () => {
            allow = true;
            this.allDates = $All(".dates");
            this.timeCheck();
            this.dateClick();
        });
    }
    arrowFunction(dir) {
        const arrow = $(dir);
        arrow.addEventListener("click", (e) => {
            this.calenders.classList.add("shifting");
            posInitial = this.calenders.offsetLeft;
            const length = $All(".calender").length;
            if (dir == ".left") {
                this.calenders.style.left = posInitial + 1200 + "px";
                this.totalIdx--;
                posInitial += 1200;
                if (nowMonth > 1)
                    nowMonth--;
                else {
                    nowYear = nowYear - 1;
                    nowMonth = 12;
                }
                this.arrowRender(posInitial, length, allow, "left");
            }
            if (dir == ".right") {
                this.calenders.style.left = posInitial - 1200 + "px";
                this.totalIdx++;
                posInitial -= 1200;
                if (nowMonth < 12)
                    nowMonth++;
                else {
                    nowYear = nowYear + 1;
                    nowMonth = 1;
                }
                this.arrowRender(posInitial, length, allow, "right");
            }
        });
    }
}
new App($(".calenders"), nowYear, nowMonth, today);
// const router = async () => {
//   const routes = [
//     { path: "/", view: () => console.log("Viewing Home") },
//     { path: "/posts", view: () => console.log("Viewing Posts") },
//     { path: "/settings", view: () => console.log("Viewing Settings") },
//   ];
//   const pageMatches = routes.map((route) => {
//     return {
//       route, // route: route
//       isMatch: route.path === location.pathname,
//     };
//   });
//   console.log(pageMatches);
// };
// document.addEventListener("DOMContentLoaded", () => {
//   router();
// });
