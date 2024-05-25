document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://api.jsonbin.io/v3/b/6641a122e41b4d34e4f2f3af';

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const movies = data.record;
        const movieContainer = document.querySelector('.movie-container');
        const categoryButtonsContainer = document.querySelector('.category-buttons');

        const categories = [...new Set(movies.map(movie => movie.category))];
        categories.unshift('All'); 

        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.dataset.category = category;
            button.addEventListener('click', () => {
                filterMovies(category, movies);
                updateURLWithCategory(category);
            });
            categoryButtonsContainer.appendChild(button);
        });

        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get('category');
        if (categoryParam && categories.includes(categoryParam)) {
            filterMovies(categoryParam, movies);
        } else {
            displayMovies(movies);
        }

        function filterMovies(category, movies) {
            if (category === 'All') {
                displayMovies(movies);
            } else {
                const filteredMovies = movies.filter(movie => movie.category === category);
                displayMovies(filteredMovies);
            }
        }

        function displayMovies(movies) {
            movieContainer.innerHTML = '';
            movies.forEach(movie => {
                const card = document.createElement('div');
                card.classList.add('movie-card');

                const timesButtons = movie.times.map(time => `<button class="time-button">${time}</button>`).join(' ');

                card.innerHTML = `
                    <img src="${movie.image}" alt="${movie.title}" class="movie-image">
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <div class="movie-times">${timesButtons}</div>
                        <a href="booking.html?title=${encodeURIComponent(movie.title)}&times=${encodeURIComponent(movie.times.join(','))}" class="book-button">Тасалбар захиалах</a>
                    </div>
                `;

                movieContainer.appendChild(card);
            });
        }

        function updateURLWithCategory(category) {
            const params = new URLSearchParams(window.location.search);
            if (category === 'All') {
                params.delete('category');
            } else {
                params.set('category', category);
            }
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            history.pushState(null, '', newUrl);
        }
    })
});
