import { fetchExcel } from '../../scripts/scripts.js';

export default async function decorate(block) {

  block.textContent = '';

  // Fetch items from index
  const excelContent = await fetchExcel('offers');
  const offers = excelContent.data;

  // Show empty message if there are no items
  if (offers.length === 0) {
    const emptyMessage = document.createRange().createContextualFragment(`<div class="offers empty">
      <div class="empty">
        <h2>No offers </h2>
        <p>Sorry, we don't have anything in this section yet. But check back soon – offers are created all the time.</p>
      </div>
    </div>`);
    block.appendChild(emptyMessage);
    return;
  }

  const offersBlock = document.createRange().createContextualFragment('<div class="offers"></div>');

  // Limit to 3 items
  offers.slice(0, 3).forEach((item, key) => {
    const {
      image, title, description, link, cta//,
    } = item;

    const firstSport = sport.length > 0 ? sport[0] : '';

    const thumbnailSrc = new URL(thumbnail, window.location.href).pathname;

//    const card = document.createRange().createContextualFragment(`<div class="grid-item">
//      <article class="blog-post">
//        <a class="blog-teaser-link" href="${path}">
//          <div class="blog-teaser-image">
//            <picture>
//              <source type="image/webp" srcset="${thumbnailSrc}?width=344&format=webply&optimize=medium">
//              <img src="${thumbnailSrc}?width=344&format=png&optimize=medium" alt="wilson-blog-post" loading="lazy">
//            </picture>
//          </div>
//          <div class="blog-category">${firstSport}</div>
//          <div class="blog-teaser-title">${title}</div>
//        </a>
//        <div class="blog-teaser-description">${description}</div>
//      </article>
//    </div>`);

    const card = document.createRange().createContextualFragment(`<div class="span4 feature">
        <a href="${link}" target="_blank">
        <img src="${image}?width=344&format=png&optimize=medium" alt="offer" loading="lazy">
        <h3>${title}</h3>
	    <p class="feature-body">${description}</p>
		<p class="feature-call">${cta}</p>
        </a>
    </div>`);

    offersBlock.firstChild.appendChild(card);
  });

  block.appendChild(offersBlock);
}
