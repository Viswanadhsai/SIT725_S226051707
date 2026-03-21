const addCards = (items) => {
    items.forEach((item, index) => {
        let card =
            `<div class="col s12 m4 center-align">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="stadium-img" src="${item.image}" alt="${item.title}">
          </div>
          <div class="card-content">
            <span class="card-title grey-text text-darken-4">${item.title}</span>
            <p><a href="#!" class="stadium-link" data-index="${index}">${item.link}</a></p>
          </div>
        </div>
      </div>`;

        $("#card-section").append(card);
    });

    // Open the stadium modal on card link click
    $(".stadium-link").click(function () {
        const idx = $(this).data("index");
        const stadium = items[idx];
        $("#modal-content").html(
            `<h5>${stadium.title}</h5>
       <p><strong>City:</strong> ${stadium.city}</p>
       <p>${stadium.description}</p>`
        );
        const instance = M.Modal.getInstance($("#stadium-modal"));
        instance.open();
    });
};

$(document).ready(function () {
    // Initialize modals
    $('.modal').modal();

    // Open the "Click Me" modal
    $('#clickMeButton').click(function () {
        const welcomeContent = `
      <h5>Welcome!</h5>
      <p>This is a demo modal opened by clicking the button.</p>
    `;
        $("#modal-content").html(welcomeContent);
        const instance = M.Modal.getInstance($("#stadium-modal"));
        instance.open();
    });

    // Fetch stadium data and add cards to the page
    $.getJSON('/api/stadiums', function (stadiums) {
        addCards(stadiums);
    });
});