
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
        if (movieContainer) { 
            movies.forEach(movie => {
                const card = document.createElement('div');
                card.classList.add('movie-card');

                card.innerHTML = `
                    <img src="${movie.image}" alt="${movie.title}" class="movie-image">
                `;

                movieContainer.appendChild(card);
            });
        }
    })
    .catch(error => {
        console.error('Error loading the movies:', error);
        alert('Failed to load movies. Please check the console for more information.');
    });

    fetchUpcomingMovies();
});
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const times = params.get('times').split(',');
    const imageUrl = params.get('image'); // Assuming image URL is passed as a parameter

    document.getElementById('movie-title').textContent = title;
    document.getElementById('movie-image').style.backgroundImage = `url(${imageUrl})`;

    const timeButtonsContainer = document.getElementById('time-buttons');
    times.forEach(time => {
        const button = document.createElement('button');
        button.textContent = time;
        button.dataset.time = time;
        button.addEventListener('click', function() {
            document.querySelectorAll('.time-buttons button').forEach(btn => btn.style.backgroundColor = 'var(--color-blue-3)');
            this.style.backgroundColor = 'var(--color-blue-0)';
            document.getElementById('movie-time').value = this.dataset.time;
        });
        timeButtonsContainer.appendChild(button);
    });

    const locationButtons = document.querySelectorAll('.location-buttons button');
    locationButtons.forEach(button => {
        button.addEventListener('click', function() {
            locationButtons.forEach(btn => btn.style.backgroundColor = 'black');
            this.style.backgroundColor = 'black';
            document.getElementById('location').value = this.dataset.location;
        });
    });

    document.getElementById('order-form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (!document.getElementById('location').value || !document.getElementById('movie-time').value) {
            alert('Байршил болон цаг сонгоно уу');
            return;
        }
        alert('Тасалбар амжилттай захиалагдлаа!');
        // Add additional logic to handle form submission, e.g., sending data to a server
    });
});

