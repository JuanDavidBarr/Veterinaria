const url = 'http://localhost:4000/';
const tableBody = document.getElementById('tableBody');
const createClientBtn = document.getElementById('createClientBtn');
const updateClientBtn = document.getElementById('updateClientBtn');



async function getClients() {
    try {
        const response = await fetch(url + 'clients');
        if (!response.ok) {
            throw new Error('Could not fetch resource');
        }
        const clients = await response.json();
        tableBody.innerHTML = '';
        clients.forEach(client => {
            tableBody.innerHTML += `
            <td>${client.id}</td>
            <td>${client.nombre}</td>
            <td>${client.apellido}</td>
            <td>${client.email}</td>
            <td>${client.telefono}</td>
            <td><button class="button is-danger">X</button></td>
            <td><button class="js-modal-trigger button is-success" data-target="modal-js-example-2" data-id="${client.id}">Update</button></td>
        `
        });
        return clients;
    } catch (error) {
        console.error('Error when getting clients', error);
    }
}

getClients();

//MODAL CREATE
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});

//CREATE CLIENT
createClientBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clients = await getClients();
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    if (!name || !lastname || !email || !phone) {
        alert('Todos los campos deben ser completados');
        return;
    }
    const duplicatedEmail = clients.find(element => element.email === email);
    if (duplicatedEmail) {
        alert('El email ya está registrado, pruebe con otro');
        return;
    }
    const newClient = {
        "name": name,
        "lastname": lastname,
        "email": email,
        "phone": phone
    }
    try {
        const response = await fetch(url + 'clients', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newClient)
        });
        if (!response.ok) {
            throw new Error('Could not create resource');
        }
        const data = await response.json();
        console.log('user has been created');
    } catch (error) {
        console.error('Error when creating client', error);
    }
})

//MODAL UPDATE
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeAllModals();
        }
    });
});

//UPDATE CLIENT
//LINKS UPDATE BUTTONS WITH MODAL
let clientId = null;
tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-modal-trigger')) {
        clientId = parseInt((event.target.dataset.id));
        console.log(clientId);
        document.getElementById('modal-js-example-2').classList.add('is-active');
    }
    updateClientBtn.addEventListener('click', async (event) => {
        event.preventDefault;
        const clients = await getClients();
        const clientInfo = clients.find(element => element.id == clientId);
        const name = document.getElementById("name_update").value;
        const lastname = document.getElementById("lastname_update").value;
        const email = document.getElementById("email_update").value;
        const phone = document.getElementById("phone_update").value;
        console.log(name, lastname, email, phone);
        const duplicatedEmail = clients.find(element => element.email === email);
        if (duplicatedEmail) {
            alert('El email ya está registrado, pruebe con otro');
            return;
        }
        const updatedClient = {
            "name": name || clientInfo.nombre, 
            "lastname": lastname || clientInfo.apellido,
            "email": email || clientInfo.email,
            "phone": phone || clientInfo.telefono
        }
        try {
            const response = await fetch(url + `clients/${clientId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedClient)
            });
            if (!response.ok) {
                throw new Error('Could not create resource');
            }
            const data = await response.json();
            console.log('user has been updated');
        } catch (error) {
            console.error('Error when creating client', error);
        }
    })
});












































