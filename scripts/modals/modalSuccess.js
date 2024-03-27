function modalSuccess(title, description, button, route) {
    const modal = document.createElement('div');
    const modalBody = document.createElement('main');
    const modalContent = document.createElement('section');
    const modalActions = document.createElement('div'); 
    const img = document.createElement('img');
    const modalTitle = document.createElement('h2');
    const modalDescription = document.createElement('p');
    const modalButton = document.createElement('a');

    img.setAttribute("src", "img/modalSuccess.svg");
    modalTitle.innerHTML = title;
    modalDescription.innerHTML = description;
    modalButton.innerHTML = button;
    modalButton.setAttribute("href", route);

    modalBody.appendChild(img);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalDescription);
    modalBody.appendChild(modalContent);
    modalBody.appendChild(modalActions);
    modalActions.appendChild(modalButton);
    modal.appendChild(modalBody);

    modal.classList.add('modal', 'success');;
    modalBody.classList.add('modal-body');
    modalButton.classList.add('btn', 'btn-primary' );

   
    setTimeout(() => {
        modal.classList.add('show');
        modal.style.opacity = '1';
    }, 10)
  
    document.body.appendChild(modal);

}

