const url = 'http://localhost:4000/';
const tableBody = document.getElementById('tableBody');

async function getClients() {
    try {
        const response = await fetch(url + 'clients');
        if (!response.ok) {
            throw new Error('Could not fetch resource');
        }
        const clients = await response.json();
        clients.forEach(client => {
            tableBody.innerHTML += `
            <td>${client.id}</td>
            <td>${client.nombre}</td>
            <td>${client.apellido}</td>
            <td>${client.email}</td>
            <td>${client.telefono}</td>
            <td><button class="button is-danger">X</button></td>
            <td><button class="button is-success">Update</button></td>
        `
        });
    } catch (error) {
        console.error('Error when getting clients', error);
    }
}

getClients();

//MODAL
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







