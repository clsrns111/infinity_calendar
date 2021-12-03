import { Calender } from "./Calender.js";
export class Rendering {
    constructor(nowYear, nowMonth, today, root) {
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
        this.prevCalendar = new Calender(prevYear, prevMonth - 1, today);
        this.prevCalendar.insertBefore(root, "afterbegin");
        this.nextCalendar = new Calender(nextYear, nextMonth + 1, today);
        this.nextCalendar.attachTo(root, "afterbegin");
        this.currentCalendar = new Calender(nowYear, nowMonth, today);
        this.currentCalendar.attachTo(root, "afterbegin");
    }
}
