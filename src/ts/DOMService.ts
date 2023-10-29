import createElement from './utils';

export default class DOMService {
  static createTitle(): HTMLElement {
    return createElement('h2', [], 'Hasher');
  }

  static createDropField(): HTMLElement {
    const dropField = createElement('div', ['drop-field']);
    const inputFile = createElement('input', ['overlapped'], '');
    inputFile.setAttribute('type', 'file');
    inputFile.dataset.id = 'file';
    const overlapSpan = createElement(
      'span',
      ['title', 'overlap'],
      'Drop files here \nor \nClick to select',
    );
    overlapSpan.dataset.id = 'overlap';
    dropField.appendChild(inputFile);
    dropField.appendChild(overlapSpan);
    return dropField;
  }

  static createHashAlgorithms(): HTMLElement {
    const hashAlgorithms = createElement('div', ['hash-algorithms']);
    hashAlgorithms.appendChild(createElement('p', [], 'Hash Algorithm: '));
    const algorithmsList = createElement('ul', ['algorithms']);
    const algorithms = ['MD5', 'sha1', 'sha256', 'sha512'];
    algorithms.forEach((algorithm, index) => {
      const algorithmLi = createElement('li', ['algorithm'], algorithm);
      if (index === 0) algorithmLi.classList.add('algorithm-checked');
      algorithmsList.appendChild(algorithmLi);
    });
    hashAlgorithms.appendChild(algorithmsList);
    return hashAlgorithms;
  }

  static createCalculatedHashContainer(): HTMLElement {
    const calculatedHashContainer = createElement('div', ['calculater-hash']);
    calculatedHashContainer.appendChild(
      createElement('h2', [], 'Calculated Hash:'),
    );
    calculatedHashContainer.appendChild(
      createElement('span', ['calculated-result'], '*************'),
    );
    return calculatedHashContainer;
  }

  static createWrapper(): HTMLElement {
    return createElement('div', ['wrapper-hasher']);
  }

  static createPreview(): HTMLElement {
    return createElement('img', ['image-preview']);
  }

  static createNoPreview(): HTMLElement {
    return createElement('div', ['no-preview'], 'Предварительный просмотр недоступен');
  }
}
