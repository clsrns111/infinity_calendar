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

  attachTo(target: HTMLElement, position: InsertPosition) {
    target.insertAdjacentElement(position, this.element);
  }

  insertBefore(target: HTMLElement, position: InsertPosition) {
    target.insertAdjacentElement(position, this.element);
    this.element.style.left = -1500 + "px";
  }

  clear() {
    this.element.remove();
  }
}
