export class Base {
    constructor(html) {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.element = template.content.firstElementChild;
        this.width = this.element.clientWidth;
    }
    attachTo(target, position) {
        target.insertAdjacentElement(position, this.element);
    }
    rightArrow(target, length, allow, idx, empty, posInitial) {
        target.appendChild(this.element);
        this.element.style.left = empty * -1200 + "px";
    }
    leftArrow(target, idx, length, posInitial, allow) {
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
