export default class HashCalculator {
    private file;
    private algorithm;
    private container;
    constructor(container: HTMLElement);
    setFile(file: File): void;
    setAlgorithm(algorithm: string): void;
    private setupWorker;
    private calculateHash;
    private updateCalculatedResult;
}
