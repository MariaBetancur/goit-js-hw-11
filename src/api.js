export async function fetchForm(searchQuery) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=37145039-d4ad8d6ab2b85cf5d231e1aa0&q=${encodeURIComponent(
        searchQuery
      )}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    console.log(response);
    // if (!response.ok) {
    //  throw new Error(
    //    'Sorry, there are no images matching your search query. Please try again.'
    //  );
    // }
    return response.json();
  } catch (error) {
    throw new Error('An error occurred while fetching the form data.');
  }
}

export async function fetchPhotocard(photocardId) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=37145039-d4ad8d6ab2b85cf5d231e1aa0&id=${photocardId}`
    );
    if (!response.ok) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw new Error('An error occurred while fetching the photocard data.');
  }
}
async function searchImages() {
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

    const images = response.data.hits;
    if (images.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      displayImages(images);
      const totalpages = Math.ceil(response.data.totalHits / 40);
      if (page < totalpages) {
        toggleLoadMoreButton(true);
      } else {
        toggleLoadMoreButton(false);
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'An error occurred while fetching images. Please try again later.'
    );
  }
}
