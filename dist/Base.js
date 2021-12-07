export class Base {
    constructor(html) {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.element = template.content.firstElementChild;
        this.width = this.element.clientWidth;
    }
    attachTo(target, position, idx) {
        target.insertAdjacentElement(position, this.element);
        this.element.style.left = -1200 + "px";
    }
    arrow(target, idx, length, posInitial, allow) {
        target.appendChild(this.element);
        this.element.style.left = -(length * 1200 + posInitial) + "px";
        target.addEventListener("transitionend", () => {
            target.classList.remove("shifting");
        });
    }
    checkIdx(target, idx, length) {
        target.style.left = -(length * 500) + "px";
        idx = length - 1;
    }
}
