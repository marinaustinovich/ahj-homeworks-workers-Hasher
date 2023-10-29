import DOMService from './DOMService';
import DropArea from './DropArea';
import HashCalculator from './HashCalculator';

export default class Widget {
  private dropArea: DropArea | null;

  private container: HTMLElement;

  private algorithms: HTMLElement | null;

  private file: File | null;

  private hashCalculator: HashCalculator;

  constructor(container: HTMLElement | null) {
    if (!container) {
      throw new Error('Container element must not be null');
    }

    this.container = container;
    this.algorithms = null;
    this.file = null;
    this.dropArea = null;
    this.hashCalculator = new HashCalculator(this.container);
  }

  init(): void {
    this.drawUi();
    this.events();

    const dropEl = this.container.querySelector('.drop-field') as HTMLElement;
    this.dropArea = new DropArea(dropEl, this.handleFileDropped.bind(this));
  }

  drawUi(): void {
    const wrapper = DOMService.createWrapper();
    wrapper.appendChild(DOMService.createTitle());
    wrapper.appendChild(DOMService.createDropField());
    wrapper.appendChild(this.createHashAlgorithms());
    this.container.appendChild(wrapper);
    this.container.appendChild(DOMService.createCalculatedHashContainer());
  }

  createHashAlgorithms(): HTMLElement {
    const hashAlgorithms = DOMService.createHashAlgorithms();
    this.algorithms = hashAlgorithms.querySelector(
      '.algorithms',
    ) as HTMLElement;
    return hashAlgorithms;
  }

  private handleFileDropped(file: File): void {
    this.updateImagePreview(file);
    this.hashCalculator.setFile(file);
  }

  private onAlgorithmClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('algorithm')) {
      this.algorithms
        ?.querySelector('.algorithm-checked')
        ?.classList.remove('algorithm-checked');
      target.classList.add('algorithm-checked');
      const algorithm = target.textContent?.toUpperCase() || '';
      this.hashCalculator.setAlgorithm(algorithm);
    }
  }

  private onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const { files } = input;
    if (files && files.length > 0) {
      this.updateImagePreview(files[0]);
      this.hashCalculator.setFile(files[0]);
    }
  }

  updateImagePreview(file: File): void {
    const existingPreview = this.container.querySelector('.image-preview');
    const existingMessage = this.container.querySelector('.no-preview');

    if (existingPreview) {
      existingPreview.remove();
    }

    if (existingMessage) {
      existingMessage.remove();
    }

    const fileType = file.type.split('/')[0];

    if (fileType === 'image') {
      this.container.appendChild(DOMService.createPreview());
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imagePreview = this.container.querySelector(
          '.image-preview',
        ) as HTMLImageElement;
        imagePreview.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.container.appendChild(DOMService.createNoPreview());
    }
  }

  events(): void {
    const fileEl = document.querySelector('[data-id=file]') as HTMLInputElement;
    const algorithmsEl = document.querySelector('.algorithms');

    algorithmsEl?.addEventListener('click', this.onAlgorithmClick.bind(this));
    fileEl?.addEventListener('change', this.onFileChange.bind(this));
  }
}
