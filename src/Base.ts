export interface Component {
  attachTo(target: HTMLElement, position: InsertPosition): void;
}

export class Base<T extends HTMLElement> {
  element: T;

  constructor(html: string) {
    const template = document.createElement("template");
    template.innerHTML = html;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(target: HTMLElement, position: InsertPosition, idx: number) {
    target.insertAdjacentElement(position, this.element);
    this.element.style.left = -500 + "px";
  }

  insertBefore(target: HTMLElement, position: InsertPosition, idx: number) {
    if (idx !== 1) {
      console.log(idx);
      target.insertAdjacentElement(position, this.element);
      this.element.style.left = -500 + "px";
    }
  }

  rightArrow(target: HTMLElement, length: number, allow: boolean) {
    this.element.style.left = -1000 + "px";
    target.appendChild(this.element);
    target.addEventListener("transitionend", () => {
      target.classList.remove("shifting");
    });
  }

  leftArrow(
    target: HTMLElement,
    idx: number,
    length: number,
    posInitial: number,
    allow: boolean
  ) {
    if (allow) {
      console.log(posInitial);
      this.element.style.left = -(length * 500 + posInitial) + "px";
      target.appendChild(this.element);
      // target.insertAdjacentElement("afterbegin", this.element);
      target.addEventListener("transitionend", () => {
        target.classList.remove("shifting");
        // this.checkIdx(target, idx, length);
      });
      // this.element.style.left = -((length + 3) * 500) + "px";
    }
  }

  checkIdx(target: HTMLElement, idx: number, length: number) {
    target.style.left = -(length * 500) + "px";
    idx = length - 1;
  }
}
