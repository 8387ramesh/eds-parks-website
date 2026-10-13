export default function decorate(block) {
  const picture = block.querySelector('picture');
  const heading = block.querySelector('h1, h2, h3');

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'hero-image';

  const content = document.createElement('div');
  content.className = 'hero-content';

  if (picture) {
    imageWrapper.append(picture);
  }

  if (heading) {
    heading.classList.add('hero-heading');
    content.append(heading);
  }

  // Move remaining authored content, including description and CTA wrappers.
  [...block.children].forEach((child) => {
    if (child.contains(heading) || child.contains(picture)) {
      // Preserve any text or CTA content alongside the image/heading.
      [...child.childNodes].forEach((node) => {
        if (
          node !== heading
          && node !== picture
          && !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim())
        ) {
          content.append(node);
        }
      });
      return;
    }

    content.append(child);
  });

  block.replaceChildren();

  if (picture) block.append(imageWrapper);
  if (content.children.length) block.append(content);
}
