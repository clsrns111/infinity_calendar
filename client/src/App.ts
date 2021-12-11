import { Calender } from "./Calender.js";
import { _filter } from "./Fn.js";
import { $, $All } from "./util.js";

interface todoList {
  year: number;
  month: number;
  day: number;
  body: string;
}

const date = new Date();
let nowMonth: number = date.getMonth() + 1;
let nowYear: number = date.getFullYear();
let today: number = date.getDate();
let posInitial: number;
let posFinal: number;
let allow = true;
let drag = false;
let empty = 0;

class App {
  private calenders: HTMLElement;
  private totalIdx: number;
  private allDates: NodeListOf<Element>;
  private start: number;
  private end: number;
  private posX1: number;
  private posX2: number;
  private threshold: number;
  private item: HTMLElement;
  private mainCalendar: Calender;
  private todoList: Array<object>;

  constructor(
    appRoot: HTMLElement,
    nowYear: number,
    nowMonth: number,
    today: number
  ) {
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

    this.item = $(".calenders")! as HTMLElement;
    this.item.classList.add("shifting");
    this.item.onmousedown = this.dragStart.bind(this);
    this.item.addEventListener("touchmove", this.dragAction.bind(this));
    this.item.addEventListener("touchend", this.dragEnd.bind(this));
    this.item.addEventListener("touchstart", this.dragStart.bind(this));
    this.dateFetch();
  }

  private dateRender(dates?: Array<object>) {
    const Alldate = $All(".date");

    const filterdDate = _filter(Alldate, (el) => {
      if (!el.dataset.date) return false;
      const dateYearMonth = el.dataset.date!.split("-");
      return nowYear === +dateYearMonth[0] && nowMonth === +dateYearMonth[1];
    });

    console.log(filterdDate);

    for (let i = 0; i < dates!.length; i++) {
      let { year, month, day, body } = dates![i] as any;

      for (let j = 0; j < filterdDate.length; j++) {
        const target = filterdDate[j] as any;

        const n = Number(target!.firstChild?.textContent);
        if (year === nowYear && nowMonth === month && n === day) {
          target.insertAdjacentHTML(
            "beforeend",
            `<small class='todo_text'>${body}</small>`
          );
        }
      }
    }
  }

  private async dateFetch() {
    await fetch("http://localhost:3000", {
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
  }

  private timeCheck() {
    $(".month_current")!.textContent = `${nowMonth}`;
    $(".year_current")!.textContent = `${nowYear}`;
  }

  dateClick() {
    if (drag) return;

    this.allDates.forEach((date) =>
      date.addEventListener("click", (e) => {
        const t = e.target! as HTMLElement;
        const target = t.closest(".date")! as HTMLElement;
        const dates = target.parentElement!.childNodes;
        let num = Number(target.textContent);

        if (!target.querySelector("form")) {
          target.insertAdjacentHTML(
            "beforeend",
            "<form type='submit'><input autofocus='true' max='30' class='todo_input' placeholder='  해야할일을 입력해주세요'/></form>"
          );
        }

        $All("form")?.forEach((form) => {
          form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const targetday = e.target! as HTMLElement;
            const selectedDay =
              targetday.closest(".date")?.firstChild?.textContent;
            const form = target.querySelector("form")! as HTMLFormElement;
            const input = target.querySelector(
              ".todo_input"
            )! as HTMLInputElement;

            const input_value = input.value;

            console.log(input_value);
            console.log(input);

            target.insertAdjacentHTML(
              "beforeend",
              `<small class='todo_text'>${input_value}</small>`
            );

            form.remove();

            const data: todoList = {
              year: nowYear,
              month: nowMonth,
              day: Number(selectedDay),
              body: input_value,
            };

            await fetch("http://localhost:3000", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => console.log(data))
              .catch((err) => console.log(err));
          });
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
      })
    );
  }

  private dragStart(e: any) {
    drag = true;
    posInitial = this.item.offsetLeft;

    if (e.type == "touchstart") {
      this.posX1 = e.touches[0].clientX;
    } else {
      this.posX1 = e.clientX;
      console.log(this.posX1);
      document.onmouseup = this.dragEnd.bind(this);
      document.onmousemove = this.dragAction.bind(this);
    }
  }

  private dragAction(e: any) {
    if (e.type == "touchmove") {
      this.posX2 = this.posX1 - e.touches[0].clientX;
      this.posX1 = e.touches[0].clientX;
    } else {
      this.posX2 = this.posX1 - e.clientX;
      this.posX1 = e.clientX;
    }

    this.item.style.left = this.item.offsetLeft - this.posX2 + "px";
  }

  dragEnd(e: any) {
    posFinal = this.item.offsetLeft;
    this.item.classList.add("shifting");
    const length = $All(".calender").length;

    if (posFinal - posInitial < -20) {
      this.item.style.left = posInitial - 1200 + "px";
      this.totalIdx++;

      posInitial -= 1200;

      if (nowMonth < 12) nowMonth++;
      else {
        nowYear = nowYear + 1;
        nowMonth = 1;
      }

      this.arrowRender(posInitial, length, allow, "right");
    } else if (posFinal - posInitial > 20) {
      this.calenders.style.left = posInitial + 1200 + "px";
      this.totalIdx--;
      posInitial += 1200;

      if (nowMonth > 1) nowMonth--;
      else {
        nowYear = nowYear - 1;
        nowMonth = 12;
      }

      this.arrowRender(posInitial, length, allow, "left");
    } else {
      this.item.style.left = posInitial + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
    drag = false;
  }

  arrowRender(posInitial: number, length: number, allow: boolean, dir: string) {
    console.log("arrowrender");
    if (this.totalIdx == length) {
      new Calender(nowYear, nowMonth, today).rightArrow(
        $(".calenders")! as HTMLElement,
        length,
        allow,
        this.totalIdx,
        empty,
        posInitial
      );

      this.dateRender(this.todoList);
    }

    if (this.totalIdx == -1) {
      new Calender(nowYear, nowMonth, today).leftArrow(
        $(".calenders")! as HTMLElement,
        this.totalIdx,
        length,
        posInitial,
        allow
      );
      this.totalIdx = 0;
      empty++;

      this.dateRender(this.todoList);
    }

    $(".calenders")!.addEventListener("transitionend", () => {
      allow = true;
      this.allDates = $All(".dates");
      this.timeCheck();
      this.dateClick();
    });
  }

  arrowFunction(dir: string) {
    const arrow = $(dir)! as HTMLElement;

    arrow.addEventListener("click", (e) => {
      this.calenders.classList.add("shifting");
      posInitial = this.calenders.offsetLeft;
      const length = $All(".calender").length;

      if (dir == ".left") {
        this.calenders.style.left = posInitial + 1200 + "px";
        this.totalIdx--;

        posInitial += 1200;

        if (nowMonth > 1) nowMonth--;
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

        if (nowMonth < 12) nowMonth++;
        else {
          nowYear = nowYear + 1;
          nowMonth = 1;
        }
        this.arrowRender(posInitial, length, allow, "right");
      }
    });
  }
}

new App($(".calenders")! as HTMLElement, nowYear, nowMonth, today);

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
