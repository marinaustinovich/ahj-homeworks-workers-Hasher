export default class Widget {
    container: HTMLElement;
    algorithms: HTMLElement | null;
    file: File | null;
    constructor(container: HTMLElement | null);
    drawUi(): void;
    events(): void;
    calculateHash(): void;
}
