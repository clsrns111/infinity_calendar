import { Calender } from "./Calender.js";
import { Rendering } from "./Rendering.js";
import { $ } from "./util.js";

const date = new Date();
let nowMonth: number = date.getMonth() + 1;
let nowYear: number = date.getFullYear();
let today: number = date.getDate();
let targetCalendar: HTMLElement;
let totalIdx = 0;
let posInitial;

class App {
  private calenders: HTMLElement;

  constructor(
    appRoot: HTMLElement,
    nowYear: number,
    nowMonth: number,
    today: number,
    dir?: -1
  ) {
    this.calenders = appRoot;

    new Rendering(nowYear, nowMonth, today, appRoot);
    this.timeCheck();

    this.arrowFunction(".left");
    this.arrowFunction(".right");
  }
  timeCheck() {
    $(".month_current")!.textContent = `${nowMonth}`;
    $(".year_current")!.textContent = `${nowYear}`;
  }

  private arrowFunction(dir: string) {
    const arrow = $(dir)! as HTMLElement;

    arrow.addEventListener("click", (e) => {
      this.calenders.classList.add("shifting");
      posInitial = this.calenders.offsetLeft;

      if (dir == ".left") {
        this.calenders.style.left = posInitial + 500 + "px";
        totalIdx = -1;

        if (nowMonth > 1) nowMonth--;
        else {
          nowYear = nowYear - 1;
          nowMonth = 12;
        }
      }

      if (dir == ".right") {
        this.calenders.style.left = posInitial - 500 + "px";
        totalIdx = 1;

        if (nowMonth < 12) nowMonth++;
        else {
          nowYear = nowYear + 1;
          nowMonth = 1;
        }
      }
      this.timeCheck();
    });
  }
}

new App($(".calenders")! as HTMLElement, nowYear, nowMonth, today);
