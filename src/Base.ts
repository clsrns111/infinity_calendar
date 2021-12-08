export interface Component {
  attachTo(target: HTMLElement, position: InsertPosition): void;
}

export class Base<T extends HTMLElement> {
  element: T;
  private width: number;
  constructor(html: string) {
    const template = document.createElement("template");
    template.innerHTML = html;
    this.element = template.content.firstElementChild! as T;
    this.width = this.element.clientWidth;
  }

  attachTo(target: HTMLElement, position: InsertPosition, idx: number) {
    target.insertAdjacentElement(position, this.element);
  }

  insertBefore(target: HTMLElement, position: InsertPosition, idx: number) {
    if (idx !== 1) {
      target.insertAdjacentElement(position, this.element);
      this.element.style.left = -1200 + "px";
    }
  }

  rightArrow(
    target: HTMLElement,
    length: number,
    allow: boolean,
    idx: number,
    empty: number,
    posInitial: number
  ) {
    target.appendChild(this.element);
    this.element.style.left = empty * -1200 + "px";
  }

  leftArrow(
    target: HTMLElement,
    idx: number,
    length: number,
    posInitial: number,
    allow: boolean
  ) {
    target.appendChild(this.element);
    this.element.style.left = -(length * 1200 + posInitial) + "px";

    target.addEventListener("transitionend", () => {
      target.classList.remove("shifting");
    });
  }

  checkIdx(target: HTMLElement, idx: number, length: number) {
    target.style.left = -(length * 500) + "px";
    idx = length - 1;
  }
}
