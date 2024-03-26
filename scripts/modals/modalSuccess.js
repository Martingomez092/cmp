function modalSuccess(title, description, button, route) {
    const modal = document.createElement('div');
    const modalBody = document.createElement('div');
    const img = document.createElement('img');
    const modalTitle = document.createElement('h2');
    const modalDescription = document.createElement('p');
    const modalButton = document.createElement('a');

    modalTitle.innerHTML = title;
    modalDescription.innerHTML = description;
    modalButton.innerHTML = button;
    modalButton.setAttribute("href", route);

    modalBody.appendChild(img);
    modalBody.appendChild(modalTitle);
    modalBody.appendChild(modalDescription);
    modalBody.appendChild(modalButton);
    modal.appendChild(modalBody);

    modal.classList.add('modal');
    modal.classList.add('success');
    modalBody.classList.add('modal-body');
   
    setTimeout(() => {
        modal.classList.add('show');
        modal.style.opacity = '1';
    }, 10)
  
    document.body.appendChild(modal);

}

