import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '37145039-d4ad8d6ab2b85cf5d231e1aa0';
const API_URL = 'https://pixabay.com/api/';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let searchQuery = '';

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  searchQuery = e.target.elements.searchQuery.value;
  clearGallery();
  await searchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  await searchImages();
});
export async function fetchLoadmore(searchQuery, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=37145039-d4ad8d6ab2b85cf5d231e1aa0&q=${encodeURIComponent(
        searchQuery
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    if (!response.ok) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return response.json();
  } catch (error) {
    throw new Error('An error occurred while fetching the loadmore data.');
  }
}

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
