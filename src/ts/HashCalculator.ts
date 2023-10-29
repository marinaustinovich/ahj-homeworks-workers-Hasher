export default class HashCalculator {
  private file: File | null = null;

  private algorithm = 'MD5';

  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  setFile(file: File): void {
    this.file = file;
    this.calculateHash();
  }

  setAlgorithm(algorithm: string): void {
    this.algorithm = algorithm;
    this.calculateHash();
  }

  private setupWorker(): Worker {
    const worker = new Worker('web.worker.worker.js');

    worker.addEventListener('message', (event: MessageEvent) => {
      const result = event.data as string;
      this.updateCalculatedResult(result);
      worker.terminate();
    });

    worker.addEventListener('error', (event) => {
      console.error(event);
      worker.terminate();
    });

    return worker;
  }

  private calculateHash(): void {
    if (!this.file || !this.algorithm) return;
    const worker = this.setupWorker();
    worker.postMessage({
      selectElText: this.algorithm,
      data: this.file,
    });
  }

  private updateCalculatedResult(hash: string): void {
    const resultElement = this.container.querySelector(
      '.calculated-result',
    ) as HTMLElement;
    if (resultElement) resultElement.textContent = hash;
  }
}
