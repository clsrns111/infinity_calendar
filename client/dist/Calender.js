import { Base } from "./Base.js";
export class Calender extends Base {
    // <img
    //       src="https://cdn.pixabay.com/photo/2017/05/09/03/46/alberta-2297204__480.jpg"
    //       alt=""
    //     />
    constructor(nowYear, nowMonth, today) {
        super(`<div class="calender">
    <div class="calender_img_container">
      <div class="calender_todo">
      </div>
      <h4><span class="img_text"></span>월</h4>
    </div>
    <main class="calender_main">
      <div class="days">
        <div class="day">일</div>
        <div class="day">월</div>
        <div class="day">화</div>
        <div class="day">수</div>
        <div class="day">목</div>
        <div class="day">금</div>
        <div class="day">토</div>
      </div>
      <div class="calender_main_line"></div>
      <div class="dates"></div>
    </main>
  </div>`);
        this.nowMonth = nowMonth;
        this.nowYear = nowYear;
        this.today = today;
        this.Month_day = 0;
        this.dates = [];
        this.sunDay = [];
        this.render();
        const dates = this.element.querySelector(".dates");
        dates.onclick = () => {
            this.clickListener && this.clickListener();
        };
    }
    setClickListener(listener) {
        this.clickListener = listener;
    }
    sunDayCheck(day) {
        if (day === 1)
            return 7;
        if (day === 2)
            return 6;
        if (day === 3)
            return 5;
        if (day === 4)
            return 4;
        if (day === 5)
            return 3;
        if (day === 6)
            return 2;
        return 1;
    }
    get year() {
        return this.nowYear;
    }
    get month() {
        return this.nowMonth;
    }
    render() {
        let firstDay = new Date(this.nowYear, this.nowMonth - 1, 1).getDay();
        let firstSunday = this.sunDayCheck(firstDay);
        switch (this.nowMonth) {
            case 2:
                this.Month_day = 28;
                break;
            case 4:
                this.Month_day = 30;
                break;
            case 6:
                this.Month_day = 30;
                break;
            case 9:
                this.Month_day = 30;
                break;
            case 11:
                this.Month_day = 30;
                break;
            default:
                this.Month_day = 31;
                break;
        }
        const datesEl = this.element.querySelector(".dates");
        const img_text = this.element.querySelector(".img_text");
        img_text.textContent = `${this.nowMonth}`;
        for (let i = 0; i < firstDay; i++) {
            datesEl.innerHTML += `<div class="date"></div>`;
        }
        for (let i = 1; i <= this.Month_day; i++) {
            this.dates.push(`<div class="date">${i}</div>`);
        }
        this.dates.forEach((date) => {
            datesEl.innerHTML += date;
        });
        const dateAll = this.element.querySelectorAll(".date");
        for (let i = 0; i < dateAll.length; i++) {
            if (!this.sunDay.length || this.sunDay[this.sunDay.length - 1] < 32) {
                this.sunDay.push(firstSunday);
                firstSunday += 7;
            }
            const date = new Date();
            if (this.nowMonth === date.getMonth() + 1 &&
                this.nowYear === date.getFullYear()) {
                if (dateAll[i].textContent === String(this.today)) {
                    dateAll[i].classList.add("today");
                }
            }
            if (this.sunDay.includes(Number(dateAll[i].textContent))) {
                dateAll[i].classList.add("sunday");
            }
        }
    }
}
