export default class Widget {
    private dropArea;
    private container;
    private algorithms;
    private file;
    private hashCalculator;
    constructor(container: HTMLElement | null);
    init(): void;
    drawUi(): void;
    createHashAlgorithms(): HTMLElement;
    private handleFileDropped;
    private onAlgorithmClick;
    private onFileChange;
    updateImagePreview(file: File): void;
    events(): void;
}
