export function fetchForm(searchQuery) {
  return fetch(
    `https://pixabay.com/api/?key=37145039-d4ad8d6ab2b85cf5d231e1aa0&q=${encodeURIComponent(
      searchQuery
    )}&image_type=photo&orientation=horizontal&safesearch=true`,
    {
      headers: {
        'x-api-key': '37145039-d4ad8d6ab2b85cf5d231e1aa0',
      },
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return response.json();
  });
}

export function fetchPhotocard(photocardId) {
  return fetch(
    `https://pixabay.com/api/?key=37145039-d4ad8d6ab2b85cf5d231e1aa0&id=${photocardId}`,
    {
      headers: {
        'x-api-key': '37145039-d4ad8d6ab2b85cf5d231e1aa0',
      },
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      return response.json();
    })
    .then(data => data[0]);
}

export function fetchLoadmore(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?key=37145039-d4ad8d6ab2b85cf5d231e1aa0&q=${encodeURIComponent(
      searchQuery
    )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
    {
      headers: {
        'x-api-key': '37145039-d4ad8d6ab2b85cf5d231e1aa0',
      },
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return response.json();
  });
}
