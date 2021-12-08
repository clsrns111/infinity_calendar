import { Calender } from "./Calender.js";
import { Rendering } from "./Rendering.js";
import { $, $All } from "./util.js";

const date = new Date();
let nowMonth: number = date.getMonth() + 1;
let nowYear: number = date.getFullYear();
let today: number = date.getDate();
let targetCalendar: HTMLElement;
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

    new Rendering(nowYear, nowMonth, today, appRoot, this.totalIdx);

    this.timeCheck();
    this.arrowFunction(".left");
    this.arrowFunction(".right");
    this.allDates = $All(".dates");
    // this.dateClick();

    this.item = $(".calenders")! as HTMLElement;
    this.item.classList.add("shifting");
    this.item.onmousedown = this.dragStart;
    this.item.addEventListener("touchstart", this.dragStart.bind(this));
    this.item.addEventListener("touchmove", this.dragAction.bind(this));
    this.item.addEventListener("touchend", this.dragEnd.bind(this));
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

  private dragStart(e: any) {
    posInitial = this.item!.offsetLeft;

    drag = true;

    if (e.type == "touchstart") {
      this.posX1 = e.touches[0].clientX;
    } else {
      this.posX1 = e.clientX;
      document.onmouseup = this.dragEnd;
      document.onmousemove = this.dragAction;
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

    if (posFinal - posInitial < -50) {
      this.item.style.left = posInitial - 1200 + "px";
      this.totalIdx++;

      posInitial -= 1200;

      if (nowMonth < 12) nowMonth++;
      else {
        nowYear = nowYear + 1;
        nowMonth = 1;
      }

      this.arrowRender(posInitial, length, allow, "right");
    } else if (posFinal - posInitial > 50) {
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
    if (this.totalIdx == length) {
      new Calender(nowYear, nowMonth, today).rightArrow(
        $(".calenders")! as HTMLElement,
        length,
        allow,
        this.totalIdx,
        empty,
        posInitial
      );
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
      console.log(empty);
    }

    $(".calenders")!.addEventListener("transitionend", () => (allow = true));
    this.allDates = $All(".dates");
    this.dateClick();
    this.timeCheck();
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
