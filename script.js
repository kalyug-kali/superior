const apiKey = '86685de93ee26f7288e7a98fd289c3e';
const mainContent = document.getElementById('main-content');

const movieCategories = {
    "Critically-acclaimed TV": `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`,
    "Crowd Pleasers": `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    "Trending Now": `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`,
    "Upcoming Movies": `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
};

// Function to create a movie carousel
function createCarousel(title, items) {
    const carouselDiv = document.createElement('div');
    carouselDiv.classList.add('movie-carousel');

    const titleEl = document.createElement('h3');
    titleEl.classList.add('carousel-title');
    titleEl.innerText = title;
    carouselDiv.appendChild(titleEl);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('carousel-content');
    carouselDiv.appendChild(contentDiv);

    items.forEach(item => {
        // Use movie's 'poster_path' or tv's 'poster_path'
        if (item.poster_path) {
            const posterContainer = document.createElement('div');
            posterContainer.classList.add('poster-container');

            const posterImg = document.createElement('img');
            posterImg.classList.add('movie-poster');
            posterImg.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
            posterImg.alt = item.title || item.name; // Use title for movie, name for TV
            
            const overlayDiv = document.createElement('div');
            overlayDiv.classList.add('poster-overlay');

            // --- DEMO LOGIC for overlays ---
            // Add "M" for Metflix to highly-rated items
            if (item.vote_average > 7.5) {
                const metflixLogo = document.createElement('div');
                metflixLogo.classList.add('metflix-logo');
                metflixLogo.innerText = 'M';
                overlayDiv.appendChild(metflixLogo);
            }
            // Add "Recently Added" to popular items
            if (title === "Crowd Pleasers" && Math.random() > 0.6) {
                 const status = document.createElement('div');
                 status.classList.add('poster-status');
                 status.innerText = 'Recently Added';
                 overlayDiv.appendChild(status);
            }
            
            posterContainer.appendChild(posterImg);
            posterContainer.appendChild(overlayDiv);
            contentDiv.appendChild(posterContainer);
        }
    });

    mainContent.appendChild(carouselDiv);
}

// Fetch movies and TV shows for all categories and create carousels
async function fetchAllCategories() {
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
