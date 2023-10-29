export default class DropArea {
    private element;
    private onFileDropped;
    constructor(element: HTMLElement, onFileDropped: (file: File) => void);
    private attachEventListeners;
    static handleDragOver(event: DragEvent): void;
    private handleDrop;
}
