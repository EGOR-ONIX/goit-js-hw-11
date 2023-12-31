export function renderGallery(arrImages) {
  const markup = arrImages.reduce(
    (
      acc,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) =>
      acc +
      `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250" heigth="250"/>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
          </div>
        </div>
    `,
    ''
  );

  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
}
