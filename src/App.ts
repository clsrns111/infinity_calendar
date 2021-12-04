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

  constructor(
    appRoot: HTMLElement,
    nowYear: number,
    nowMonth: number,
    today: number
  ) {
    this.calenders = appRoot;
    this.totalIdx = 0;

    new Rendering(nowYear, nowMonth, today, appRoot, this.totalIdx);

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
        this.totalIdx--;
        posInitial += 500;
        if (nowMonth > 1) nowMonth--;
        else {
          nowYear = nowYear - 1;
          nowMonth = 12;
        }

        const length = $All(".calender").length;
        if (this.totalIdx <= -1 && allow) {
          new Calender(nowYear, nowMonth, today).leftArrow(
            $(".calenders")! as HTMLElement,
            this.totalIdx,
            length,
            posInitial,
            allow
          );
          allow = false;
          $(".calenders")!.addEventListener(
            "transitionend",
            () => (allow = true)
          );
        }
      }

      if (dir == ".right") {
        this.calenders.style.left = posInitial - 500 + "px";
        this.totalIdx++;
        posInitial += -500;
        if (nowMonth < 12) nowMonth++;
        else {
          nowYear = nowYear + 1;
          nowMonth = 1;
        }

        const length = $All(".calender").length;
        if (this.totalIdx >= 1 && allow) {
          console.log(nowYear, nowMonth);
          new Calender(nowYear, nowMonth, today).rightArrow(
            $(".calenders")! as HTMLElement,
            length,
            allow
          );
          allow = false;
          $(".calenders")!.addEventListener(
            "transitionend",
            () => (allow = true)
          );
        }
      }
      this.timeCheck();
    });
  }
}

new App($(".calenders")! as HTMLElement, nowYear, nowMonth, today);
