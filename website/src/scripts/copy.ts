// Copy buttons: <button data-copy="text"> or <button data-copy-from="#selector">.
const label = (button: HTMLElement, text: string) => {
  const target = button.querySelector('[data-copy-label]') ?? button;
  const previous = target.textContent;
  target.textContent = text;
  button.dataset.copied = '';
  setTimeout(() => {
    target.textContent = previous;
    delete button.dataset.copied;
  }, 1600);
};

document.addEventListener('click', async (event) => {
  const button = (event.target as Element).closest<HTMLElement>('[data-copy], [data-copy-from]');
  if (!button) return;
  const source = button.dataset.copyFrom
    ? (button.closest('[data-copy-scope]') ?? document).querySelector(button.dataset.copyFrom)
    : null;
  const text = button.dataset.copy ?? source?.textContent ?? '';
  try {
    await navigator.clipboard.writeText(text.trim());
    label(button, 'Copied');
  } catch {
    label(button, 'Press Ctrl+C');
  }
});
