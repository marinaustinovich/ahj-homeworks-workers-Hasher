export default function createElement(
  tag: string,
  classes: string[] = [],
  content = '',
): HTMLElement {
  const element = document.createElement(tag);
  element.classList.add(...classes);

  if (content) {
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      if (index > 0) {
        element.appendChild(document.createElement('br'));
      }
      element.appendChild(document.createTextNode(line));
    });
  }

  return element;
}
