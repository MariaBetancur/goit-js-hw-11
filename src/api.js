export async function fetchForm(searchQuery) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=37145039-d4ad8d6ab2b85cf5d231e1aa0&q=${encodeURIComponent(
        searchQuery
      )}&image_type=photo&orientation=horizontal&safesearch=true`,
      {
        headers: {
          'x-api-key': '37145039-d4ad8d6ab2b85cf5d231e1aa0',
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return response.json();
  } catch (error) {
    throw new Error('An error occurred while fetching the form data.');
  }
}

export async function fetchPhotocard(photocardId) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=37145039-d4ad8d6ab2b85cf5d231e1aa0&id=${photocardId}`,
      {
        headers: {
          'x-api-key': '37145039-d4ad8d6ab2b85cf5d231e1aa0',
        },
      }
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

export async function fetchLoadmore(searchQuery, page) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=37145039-d4ad8d6ab2b85cf5d231e1aa0&q=${encodeURIComponent(
        searchQuery
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
      {
        headers: {
          'x-api-key': '37145039-d4ad8d6ab2b85cf5d231e1aa0',
        },
      }
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
