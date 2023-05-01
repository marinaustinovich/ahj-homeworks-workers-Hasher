export default class Widget {
  container: HTMLElement;

  algorithms: HTMLElement | null;

  file: File | null;

  constructor(container: HTMLElement | null) {
    if (!container) {
      throw new Error('Container element must not be null');
    }

    this.container = container;
    this.algorithms = null;
    this.file = null;
    this.drawUi();
    this.events();
  }

  drawUi() {
    this.container.innerHTML = `
      <div class="wrapper-hasher">
        <h2>Hasher</h2>
        <div class="drop-field">
          <input data-id="file" class="overlapped" type="file">
          <span data-id="overlap" class="title overlap">Drop files here <br> or <br> Click to select</span>
        </div>
        <div class="hash-algorithms">
          <p>Hash Algorithm: </p>
          <ul class="algorithms">
            <li class="algorithm algorithm-checked">MD5</li>
            <li class="algorithm">sha1</li>
            <li class="algorithm">sha256</li>
            <li class="algorithm">sha512</li>
          </ul>
        </div>
      </div>
      <div class="calculater-hash">
        <h2>Calculated Hash:</h2>
        <span class="calculated-result">*************</span>
      </div>
    `;

    this.algorithms = document.querySelector('.algorithms');
  }

  events() {
    const fileEl = document.querySelector('[data-id=file]');
    const algorithmElements = document.querySelectorAll('.algorithm');
    const dropEl = document.querySelector('.drop-field');

    dropEl?.addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });

    dropEl?.addEventListener('drop', async (evt: Event) => {
      evt.preventDefault();
      const inputElement = evt.currentTarget as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        this.file = inputElement.files[0];
        this.calculateHash();
      }
    });

    algorithmElements.forEach((el) => {
      el.addEventListener('click', () => {
        const checkedAlgorithm = document.querySelector('.algorithm-checked');
        checkedAlgorithm?.classList.remove('algorithm-checked');
        el.classList.toggle('algorithm-checked');
        this.calculateHash();
      });
    });

    fileEl?.addEventListener('change', async () => {
      const inputElement = fileEl as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        this.file = inputElement.files[0];
        this.calculateHash();
      }
    });
  }

  calculateHash() {
    const selectedAlgorithm = this.algorithms?.querySelector('.algorithm-checked') as HTMLElement;
    const selectedAlgorithmText = selectedAlgorithm.textContent as string;
    const calculatedResult = this.container.querySelector('.calculated-result') as HTMLSpanElement;

    const worker = new Worker('web.worker.bundle.worker.js');
    worker.addEventListener('message', (event: MessageEvent) => {
      const result = event.data as string;
      calculatedResult.textContent = result;
      worker.terminate();
    });

    worker.addEventListener('error', (event) => {
      console.error(event);
    });

    worker.postMessage({ selectElText: selectedAlgorithmText.toUpperCase(), data: this.file });
  }
}
