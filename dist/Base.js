export class Base {
    constructor(html) {
        const template = document.createElement("template");
        template.innerHTML = html;
        this.element = template.content.firstElementChild;
    }
    attachTo(target, position) {
        target.insertAdjacentElement(position, this.element);
    }
    insertBefore(target, position) {
        target.insertAdjacentElement(position, this.element);
        this.element.style.left = -1500 + "px";
    }
    clear() {
        this.element.remove();
    }
}
