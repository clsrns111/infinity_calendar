import { Calender } from "./Calender.js";
import { Rendering } from "./Rendering.js";
import { $, $All } from "./util.js";

const date = new Date();
let nowMonth: number = date.getMonth() + 1;
let nowYear: number = date.getFullYear();
let today: number = date.getDate();
let targetCalendar: HTMLElement;
let posInitial;
let allow = true;

class App {
  private calenders: HTMLElement;
  private totalIdx: number;
  private allDates: NodeListOf<Element>;
  private start: number;
  private end: number;

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

    new Rendering(nowYear, nowMonth, today, appRoot, this.totalIdx);

    this.timeCheck();
    this.arrowFunction(".left");
    this.arrowFunction(".right");

    this.allDates = $All(".dates");
    this.dateClick();
  }

  private timeCheck() {
    $(".month_current")!.textContent = `${nowMonth}`;
    $(".year_current")!.textContent = `${nowYear}`;
  }

  dateClick() {
    this.allDates.forEach((date) =>
      date.addEventListener("click", (e) => {
        console.log(e);
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
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            const form = target.querySelector("form")! as HTMLFormElement;
            const input = target.querySelector(
              ".todo_input"
            )! as HTMLInputElement;

            const input_value = input.value;

            form.remove();

            target.insertAdjacentHTML(
              "beforeend",
              `<small class='todo_text'>${input_value}</small>`
            );
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

  private arrowRender(
    posInitial: number,
    length: number,
    allow: boolean,
    dir: ".left" | ".right"
  ) {
    new Calender(nowYear, nowMonth, today).arrow(
      $(".calenders")! as HTMLElement,
      this.totalIdx,
      length,
      posInitial,
      allow
    );

    // $(".calenders")!.addEventListener("transitionend", () => (allow = true));

    this.allDates = $All(".dates");
    this.dateClick();
  }

  private arrowFunction(dir: string) {
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
        if (this.totalIdx <= -1 && allow) {
          this.arrowRender(posInitial, length, allow, dir);
        }
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
        if (this.totalIdx >= 1 && allow) {
          this.arrowRender(posInitial, length, allow, dir);
        }
      }
      this.timeCheck();
    });
  }
}

new App($(".calenders")! as HTMLElement, nowYear, nowMonth, today);
