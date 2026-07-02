var busLayout = document.getElementById("bus-layout");
var seatList = document.getElementById("seat-list");
var totalPriceEl = document.getElementById("total-price");
var bookBtn = document.getElementById("book-btn");
var dateInput = document.getElementById("date-input");
var timeInput = document.getElementById("time-input");

var seatPrice = 1500; // ₹1500 per seat
var selectedSeats = [];
var totalSeats = 20;

// Helper to convert numbers 1-20 to Roman numerals
function toRoman(num) {
    var roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", 
                 "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
    return roman[num] || num;
}

// Function to set up the bus seats
function initializeSeats() {
    for (var i = 1; i <= totalSeats; i++) {
        var seat = document.createElement("div");
        seat.innerText = toRoman(i);
        
        // Randomly make some seats occupied (30% chance)
        if (Math.random() < 0.3) {
            seat.className = "seat occupied";
        } else {
            seat.className = "seat";
            // Add click event
            seat.onclick = function() {
                toggleSeat(this);
            };
        }
        
        busLayout.appendChild(seat);
    }
}

// Function to handle clicking on a seat
function toggleSeat(clickedSeat) {
    var seatNumber = clickedSeat.innerText;

    // Check if the seat is already selected
    if (clickedSeat.className === "seat selected") {
        // Deselect it
        clickedSeat.className = "seat";
        
        // Remove from our array
        var index = selectedSeats.indexOf(seatNumber);
        if (index !== -1) {
            selectedSeats.splice(index, 1);
        }
    } else {
        // Select it
        clickedSeat.className = "seat selected";
        selectedSeats.push(seatNumber);
    }
    
    // Update the text and button
    updateDetails();
}

// Function to update the summary section
function updateDetails() {
    if (selectedSeats.length === 0) {
        seatList.innerText = "None";
    } else {
        seatList.innerText = selectedSeats.join(", ");
    }
    
    // Calculate price
    var price = selectedSeats.length * seatPrice;
    totalPriceEl.innerText = price;
    
    // Check if we can enable the book button
    checkForm();
}

// Function to check if button should be enabled
function checkForm() {
    var hasSeats = selectedSeats.length > 0;
    var hasDate = dateInput.value !== "";
    var hasTime = timeInput.value !== "";
    
    if (hasSeats && hasDate && hasTime) {
        bookBtn.disabled = false;
    } else {
        bookBtn.disabled = true;
    }
}

// Listen for date and time changes
dateInput.onchange = checkForm;
timeInput.onchange = checkForm;

// Handle the book button click
bookBtn.onclick = function() {
    alert(
        "Successfully booked!\n\n" +
        "Date: " + dateInput.value + "\n" +
        "Time: " + timeInput.value + "\n" +
        "Seats: " + selectedSeats.join(", ") + "\n" +
        "Total Paid: ₹" + (selectedSeats.length * seatPrice)
    );
};

// Start the setup
initializeSeats();
