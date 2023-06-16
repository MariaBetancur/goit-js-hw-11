import Notiflix from 'notiflix';
import { searchImages } from './api';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let searchQuery = '';

const handleLoadImages = imagesData => {
  const images = imagesData.hits;
  if (images.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    displayImages(images);
    const totalpages = Math.ceil(imagesData.totalHits / 40);
    if (page < totalpages) {
      toggleLoadMoreButton(true);
    } else {
      toggleLoadMoreButton(false);
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  }
};

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  searchQuery = e.target.elements.searchQuery.value;
  clearGallery();
  const imagesData = await searchImages(page, searchQuery);
  handleLoadImages(imagesData);
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  const imagesData = await searchImages(page, searchQuery);
  handleLoadImages(imagesData);
});

function displayImages(images) {
  const fragment = document.createDocumentFragment();

  images.forEach(image => {
    const card = createImageCard(image);
    fragment.appendChild(card);
  });

  gallery.appendChild(fragment);
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.className = 'photo-card';

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';
  card.appendChild(img);

  const info = document.createElement('div');
  info.className = 'info';

  const likes = createInfoItem('Likes', image.likes);
  info.appendChild(likes);

  const views = createInfoItem('Views', image.views);
  info.appendChild(views);

  const comments = createInfoItem('Comments', image.comments);
  info.appendChild(comments);

  const downloads = createInfoItem('Downloads', image.downloads);
  info.appendChild(downloads);

  card.appendChild(info);

  return card;
}

function createInfoItem(label, value) {
  const p = document.createElement('p');
  p.className = 'info-item';
  const b = document.createElement('b');
  b.textContent = label;
  p.appendChild(b);
  p.insertAdjacentText('beforeend', `: ${value}`);
  return p;
}

function clearGallery() {
  gallery.innerHTML = '';
}

function toggleLoadMoreButton(show = false) {
  loadMoreBtn.style.display = show ? 'block' : 'none';
}
