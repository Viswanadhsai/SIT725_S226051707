// Creates stadium cards dynamically
const addCards = (items) => {
    $("#card-section").empty();

    items.forEach(item => {
        let card = `
        <div class="col s12 m4">
            <div class="card">
                <div class="card-image">
                    <img src="images/${item.image}">
                </div>
                <div class="card-content">
                    <span class="card-title">${item.stadiumName}</span>
                    <p><strong>City:</strong> ${item.city}</p>
                    <p><strong>Capacity:</strong> ${item.capacity}</p>
                    <p><strong>Opened:</strong> ${item.openedYear}</p>
                    <p><strong>Teams:</strong> ${item.homeTeams.join(", ")}</p>
                </div>
            </div>
        </div>`;
        $("#card-section").append(card);
    });
};

// Fetch stadiums from backend
const getStadiums = () => {
    $.get('/api/stadiums', (response) => {
        if (response.statusCode == 200) {
            addCards(response.data);
        }
    });
};

// Submit form to backend
const submitForm = () => {
    let stadium = {
        stadiumName: $("#stadiumName").val(),
        city: $("#city").val(),
        capacity: $("#capacity").val(),
        openedYear: $("#openedYear").val(),
        homeTeams: $("#homeTeams").val().split(","),
        image: $("#image").val()
    };

    $.post('/api/stadiums', stadium, (response) => {
        alert(response.message);
        getStadiums();
    });
};

// Initialize page
$(document).ready(function () {
    getStadiums();
    $("#formSubmit").click(() => submitForm());
});