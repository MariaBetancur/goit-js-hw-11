import Notiflix from 'notiflix';

const API_KEY = '37145039-d4ad8d6ab2b85cf5d231e1aa0';
const API_URL = 'https://pixabay.com/api/';

export async function searchImages(page, searchQuery) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'An error occurred while fetching images. Please try again later.'
    );
  }
}
