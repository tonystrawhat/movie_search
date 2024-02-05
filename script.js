async function searchMovies() {
    const query = document.getElementById('searchInput').value;
  
    if (!query) {
      alert('Please enter a search query.');
      return;
    }
  
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=d0cee6ae`);
      const data = await response.json();
  
      if (data.Response === 'True') {
        displayMovies(data.Search);
      } else {
        alert('No movies found. Try a different search term.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data.');
    }
  }
  
async function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    
    moviesContainer.innerHTML = '';
  
    movies.forEach(async (movie) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        // Fetch more details using IMDb ID
        const detailedInfoResponse = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=d0cee6ae`);
        const detailedInfo = await detailedInfoResponse.json();
        
        card.innerHTML = `
        <div class="card-content front">
    <img style="height:320px;margin-top:10px" src="${movie.Poster}" alt="${movie.Title}">
    <h3>${movie.Year}</h3>
    <p style="font-weight: bold; margin-bottom: 10px;">${movie.Title}</p>
</div>
<div class="card-content back" style="padding: 20px;">
    <p style="font-weight: bold; padding: 10px; margin-bottom: 10px;">IMDb Rating: ${detailedInfo.imdbRating || 'N/A'}</p>
    <p style="font-weight: bold; margin-bottom: 10px;">Plot</p>
    <p style="font-weight: 400; margin-bottom: 10px;"> ${detailedInfo.Plot || 'N/A'}</p>
    <p style="margin-bottom: 10px; padding: 20px;"><span style="font-weight: bold;">Director:</span> ${detailedInfo.Director || 'N/A'}</p>
    <p style="margin-bottom: 10px;"><span style="font-weight: bold;">Actors:</span> ${detailedInfo.Actors || 'N/A'}</p>
</div>

    
        `;
        
        card.addEventListener('click', () => card.classList.toggle('flip'));
        moviesContainer.appendChild(card);
    });
}
