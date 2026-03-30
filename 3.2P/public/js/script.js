const addCards = (items) => {
    $("#card-section").empty();
    items.forEach((item, index) => {
        const card = `
      <div class="col s12 m4 center-align">
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

    $(".stadium-link").off("click").on("click", function () {
        const idx = $(this).data("index");
        const stadium = items[idx];
        $("#modal-content").html(`
      <h5>${stadium.title}</h5>
      <p><strong>City:</strong> ${stadium.city}</p>
      <p>${stadium.description}</p>
    `);
        M.Modal.getInstance($("#stadium-modal")).open();
    });
};

$(document).ready(() => {
    $('.modal').modal();

    const openDetails = () => {
        $("#modal-content").html(`
      <h5>Welcome!</h5>
      <p>This is a demo modal opened by clicking the details button.</p>
    `);
        M.Modal.getInstance($("#stadium-modal")).open();
    };

    const openForm = () => {
        $("#modal-content").html(`
      <h5>Enter your details</h5>
      <div class="row">
        <div class="input-field col s6">
          <input id="firstName" type="text"><label for="firstName">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="lastName" type="text"><label for="lastName">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="userEmail" type="email"><label for="userEmail">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="userPassword" type="password"><label for="userPassword">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12 center-align">
          <button id="saveUserForm" class="btn waves-effect waves-light" type="button">Submit</button>
        </div>
      </div>
    `);
        M.Modal.getInstance($("#stadium-modal")).open();

        $('#saveUserForm').off('click').on('click', (event) => {
            event.preventDefault();
            const firstName = $('#firstName').val().trim();
            const lastName = $('#lastName').val().trim();
            const email = $('#userEmail').val().trim();
            const password = $('#userPassword').val().trim();

            if (!firstName || !lastName || !email || !password) {
                M.toast({ html: 'Please complete all fields.' });
                return;
            }

            console.log('Submitted user details:', { firstName, lastName, email, password });

            $('#modal-content').html(`
        <h5>Submitted Details</h5>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
      `);
        });
    };

    $('#detailsButton, #navDetailsButton').click(openDetails);
    $('#clickMeButton, #navClickMeButton').click(openForm);

    $.getJSON('/api/stadiums', (stadiums) => {
        addCards(stadiums);
    }).fail(() => {
        console.error('Could not fetch /api/stadiums');
    });
});