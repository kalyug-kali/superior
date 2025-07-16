const apiKey = '86685de93ee26f7288e7a98fd289c3e';
const mainContent = document.getElementById('main-content');

const movieCategories = {
    "Popular on Metflix": `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    "Trending Now": `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`,
    "Top Rated": `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`,
    "Upcoming": `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
};

// Function to create a movie carousel
function createCarousel(title, movies) {
    const carouselDiv = document.createElement('div');
    carouselDiv.classList.add('movie-carousel');

    const titleEl = document.createElement('h3');
    titleEl.classList.add('carousel-title');
    titleEl.innerText = title;
    carouselDiv.appendChild(titleEl);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('carousel-content');
    carouselDiv.appendChild(contentDiv);

    movies.forEach(movie => {
        if (movie.poster_path) { // Only add movies with posters
            const posterImg = document.createElement('img');
            posterImg.classList.add('movie-poster');
            posterImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            posterImg.alt = movie.title;
            contentDiv.appendChild(posterImg);
        }
    });

    mainContent.appendChild(carouselDiv);
}

// Fetch movies for all categories and create carousels
async functionfetchAllCategories() {
    for (const category in movieCategories) {
        try {
            const response = await fetch(movieCategories[category]);
            const data = await response.json();
            createCarousel(category, data.results);
        } catch (error) {
            console.error(`Error fetching ${category}:`, error);
        }
    }
}

// Initial fetch
fetchAllCategories();
