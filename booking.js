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
            const urlParams = new URLSearchParams(window.location.search);
            const movieTitle = urlParams.get('title');
            const movie = movies.find(m => m.title === movieTitle);

            if (movie) {
                document.getElementById('movie-title').textContent = movie.title;
                document.getElementById('movie-image').src = movie.imageContinuing;


                document.getElementById('movie-title').textContent = movie.title;
                document.getElementById('movie-image').src = movie.image;

                const timeSelect = document.getElementById('time-select');
                movie.times.forEach(time => {
                    const option = document.createElement('option');
                    option.value = time;
                    option.textContent = time;
                    timeSelect.appendChild(option);
                });

                const bookingForm = document.getElementById('booking-form');
                bookingForm.addEventListener('submit', function(event) {
                    event.preventDefault();

                    const selectedTime = timeSelect.value;
                    const selectedLocation = document.getElementById('location-select').value;

                    window.location.href = `order.html?title=${encodeURIComponent(movie.title)}&time=${encodeURIComponent(selectedTime)}&location=${encodeURIComponent(selectedLocation)}&image=${encodeURIComponent(movie.image)}`;
                });
            } else {
                alert('Movie not found!');
            }
        })
        .catch(error => {
            console.error('Error loading the movies:', error);
            alert('Failed to load movies. Please check the console for more information.');
        });
});

