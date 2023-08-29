import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './servicePixabay.js';
import { renderGallery } from './createGallery.js';

const refs = {
  form: document.getElementById('search-form'),
  btnSearch: document.getElementById('search-form').lastElementChild,
  galleryBox: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.load-more'),
};

let query = '';
let page = 0;
const PER_PAGE = 40;
let totalPages = 0;

refs.form.addEventListener('submit', onSearch);
refs.btnLoad.addEventListener('click', onloadMore);

function onSearch(event) {
  event.preventDefault();

  page = 1;
  query = event.currentTarget.elements.searchQuery.value.trim();

  if (query === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }

  fetchImages(query, page, PER_PAGE)
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.galleryBox.innerHTML = '';
        refs.btnLoad.classList.add('visually-hidden');
        return;
      }

      refs.galleryBox.innerHTML = '';
      renderGallery(data.hits);

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      totalPages = Math.ceil(data.totalHits / PER_PAGE);

      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      refs.btnLoad.classList.remove('visually-hidden');
      if (data.totalHits <= PER_PAGE) {
        refs.btnLoad.classList.add('visually-hidden');
      }
    })
    .catch(error => console.error(error))
    .finally(() => {
      refs.form.reset();
    });
}

function onloadMore() {
  if (page >= totalPages) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }

  page += 1;

  fetchImages(query, page, PER_PAGE)
    .then(data => {
      renderGallery(data.hits);
      if (page >= totalPages) refs.btnLoad.classList.add('visually-hidden');
    })
    .catch(error => console.log(error));
}
