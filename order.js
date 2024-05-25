document.addEventListener('DOMContentLoaded', () => {
    generateSeats();
    loadReservations();
});

const seats = document.getElementById('seats');
let selectedSeats = [];
let numberOfSeats = 0;

function generateSeats() {
    const rows = 'ABCDEFGHIJ'.split('');
    const cols = Array.from({ length: 12 }, (_, i) => i + 1);

    rows.forEach(row => {
        cols.forEach(col => {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.dataset.seat = `${row}${col}`;
            seat.onclick = () => toggleSeatSelection(seat);
            seats.appendChild(seat);
        });
    });
    markReservedSeats();
}

function markReservedSeats() {
    const reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    reservedSeats.forEach(seat => {
        const seatElement = document.querySelector(`.seat[data-seat="${seat}"]`);
        if (seatElement) {
            seatElement.classList.add('reserved');
        }
    });
}

function startSelecting() {
    const name = document.getElementById('name').value;
    numberOfSeats = parseInt(document.getElementById('numSeats').value);

    if (!name || numberOfSeats < 1) {
        alert('Суудлын тоог зөв оруул');
        return;
    }

    selectedSeats = [];
    document.querySelectorAll('.seat.selected').forEach(seat => seat.classList.remove('selected'));
    document.querySelector('.seat-selection').style.display = 'block';  // Ensure this line makes the seat-selection section visible
}

function toggleSeatSelection(seat) {
    if (seat.classList.contains('reserved') || (selectedSeats.length >= numberOfSeats && !seat.classList.contains('selected'))) {
        return;
    }

    seat.classList.toggle('selected');
    const seatData = seat.dataset.seat;

    if (seat.classList.contains('selected')) {
        selectedSeats.push(seatData);
    } else {
        selectedSeats = selectedSeats.filter(s => s !== seatData);
    }
}

function confirmSelection() {
    const name = document.getElementById('name').value;

    if (selectedSeats.length !== numberOfSeats) {
        alert(`Та зөвхөн ${numberOfSeats} суудал сонгоно уу.`);
        return;
    }

    const reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    selectedSeats.forEach(seat => reservedSeats.push(seat));
    localStorage.setItem('reservedSeats', JSON.stringify(reservedSeats));

    reservations.push({ name, numberOfSeats, seats: selectedSeats });
    localStorage.setItem('reservations', JSON.stringify(reservations));

    selectedSeats.forEach(seat => {
        const seatElement = document.querySelector(`.seat[data-seat="${seat}"]`);
        if (seatElement) {
            seatElement.classList.add('reserved');
            seatElement.classList.remove('selected');
        }
    });

    selectedSeats = [];
    numberOfSeats = 0;
    document.getElementById('confirmSelection').style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('numSeats').value = '';
}

function loadReservations() {
    const reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    reservedSeats.forEach(seat => {
        const seatElement = document.querySelector(`.seat[data-seat="${seat}"]`);
        if (seatElement) {
            seatElement.classList.add('reserved');
        }
    });
}
