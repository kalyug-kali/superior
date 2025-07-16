const apiKey = '86685de93ee26f7288e7a98fd289c3e';

const features = document.querySelector('.features');

async function fetchMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        const data = await response.json();
        const movies = data.results;

        movies.forEach(movie => {
            const movieEl = document.createElement('div');
            movieEl.classList.add('row');
            movieEl.innerHTML = `
                <div class="text-col">
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                </div>
                <div class="img-col">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                </div>
            `;
            features.appendChild(movieEl);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

fetchMovies();
