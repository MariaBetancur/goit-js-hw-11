import * as Notiflix from 'notiflix';
import { fetchForm, fetchPhotocard, fetchLoadmore } from './api';

const searchForm = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const fetchLoadMoreBtn = document.querySelector('.load-more');
let page = 1;
const perPage = 40;

(async () => {
  try {
    loader.classList.add('hidden');
    const form = await fetchForm();
    console.log(form);
    const options = [];
    form.forEach(form => {});
    const breedSelect = document.querySelector('.breed-select');
    breedSelect.append(...options);
  } catch (error) {
    console.error('Error:', error);
    errorElement.classList.remove('hidden');
  }
})();

searchForm.addEventListener('change', async e => {
  const selectedOption = e.target.value;
  if (selectedOption) {
    loader.classList.remove('hidden');
    try {
      const photoCardData = await fetchPhotocard(selectedOption);
      loader.classList.add('hidden');
      console.log(photoCardData);
      const galleryData = photoCardData.gallery[0];
      galleryEl.innerHTML = `
        <div class="photo-card">
          <img src="${photoCardData.largeImageURL}" alt="${photoCardData.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes:</b> ${photoCardData.likes}
            </p>
            <p class="info-item">
              <b>Views:</b> ${photoCardData.views}
            </p>
            <p class="info-item">
              <b>Comments:</b> ${photoCardData.comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b> ${photoCardData.downloads}
            </p>
          </div>
        </div>`;
      loader.classList.add('hidden');
      galleryEl.classList.remove('hidden');
    } catch (error) {
      console.error('Error:', error);
      Notiflix.Notify.failure('An error occurred. Please try again later.');
      errorElement.classList.remove('hidden');
    }
  }
});

fetchLoadMoreBtn.addEventListener('click', async () => {
  loader.classList.add('hidden');
  if (page > totalHits) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    fetchLoadMoreBtn.style.display = 'none';
    return;
  }

  try {
    const loadMore = await fetchLoadmore();
    renderLoadMore(loadMore);
    page++;

    if (page > 1) {
      fetchLoadMoreBtn.style.display = 'block';
      fetchLoadMoreBtn.textContent = 'Load more';
    }
  } catch (error) {
    console.error('Error:', error);
    Notiflix.Notify.failure('An error occurred while loading more images.');
  }
});
