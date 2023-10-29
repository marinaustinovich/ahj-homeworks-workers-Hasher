export default class DropArea {
  private element: HTMLElement;

  private onFileDropped: (file: File) => void;

  constructor(element: HTMLElement, onFileDropped: (file: File) => void) {
    this.element = element;
    this.onFileDropped = onFileDropped;
    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    this.element.addEventListener('dragover', DropArea.handleDragOver.bind(this));
    this.element.addEventListener('drop', this.handleDrop.bind(this));
  }

  static handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private handleDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.onFileDropped(files[0]);
    }
  }
}
