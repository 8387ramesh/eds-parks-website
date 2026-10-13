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

  // Move remaining authored content into the content wrapper.
  [...block.querySelectorAll('p, a')].forEach((element) => {
    if (
      element.contains(picture)
      || element.contains(heading)
      || element.closest('.hero-content')
      || element.closest('.hero-image')
    ) {
      return;
    }

    content.append(element);
  });

  block.replaceChildren();

  if (picture) {
    block.append(imageWrapper);
  }

  if (content.children.length) {
    block.append(content);
  }
}
