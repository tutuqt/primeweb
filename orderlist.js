document.addEventListener('DOMContentLoaded', () => {
    loadReservations();
});

function loadReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservationsTable = document.getElementById('reservationsTable');

    reservations.forEach(reservation => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${reservation.name}</td><td>${reservation.numberOfSeats}</td><td>${reservation.seats.join(', ')}</td>`;
        reservationsTable.appendChild(newRow);
    });
}
