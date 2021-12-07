import { Calender } from "./Calender.js";

export class Rendering {
  private prevCalendar;
  private currentCalendar;
  private nextCalendar;

  constructor(
    nowYear: number,
    nowMonth: number,
    today: number,
    root: HTMLElement,
    totalIdx: number
  ) {
    let nextYear = nowYear;
    let nextMonth = nowMonth;
    let prevYear = nowYear;
    let prevMonth = nowMonth;

    if (nowMonth === 12) {
      nextYear = nowYear + 1;
      nextMonth = 0;
    }

    if (nowMonth === 1) {
      prevYear = nowYear - 1;
      prevMonth = 13;
    }

    this.nextCalendar = new Calender(nextYear, nextMonth + 1, today);
    this.nextCalendar.attachTo(root, "afterbegin", totalIdx);

    this.currentCalendar = new Calender(nowYear, nowMonth, today);
    this.currentCalendar.attachTo(root, "afterbegin", totalIdx);

    this.prevCalendar = new Calender(prevYear, prevMonth - 1, today);
    this.prevCalendar.attachTo(root, "afterbegin", totalIdx);
  }
}
