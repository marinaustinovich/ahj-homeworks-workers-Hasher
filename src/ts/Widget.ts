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
      this.hashCalculator.setFile(files[0]);
    }
  }

  events(): void {
    const fileEl = document.querySelector('[data-id=file]') as HTMLInputElement;
    const algorithmsEl = document.querySelector('.algorithms');

    algorithmsEl?.addEventListener('click', this.onAlgorithmClick.bind(this));
    fileEl?.addEventListener('change', this.onFileChange.bind(this));
  }
}
