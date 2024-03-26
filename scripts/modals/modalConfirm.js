function modalConfirm(question, btnLink, btnPrimary, routeBtnLink, routeBtnPrimary) {
    const modal = document.createElement('div');
    const modalBody = document.createElement('div');
    const modalTitle = document.createElement('h2');
    const btnPrimaryElement = document.createElement('a');
    const btnLinkElement = document.createElement('a');

    modalTitle.innerHTML = question;
    btnLinkElement.innerHTML = btnLink;
    btnPrimaryElement.innerHTML = btnPrimary;
    btnLinkElement.setAttribute("href", routeBtnLink);
    btnPrimaryElement.setAttribute("href", routeBtnPrimary);

    modalBody.appendChild(modalTitle);
    modalBody.appendChild(btnPrimaryElement);
    modalBody.appendChild(btnLinkElement);
    modal.appendChild(modalBody);

    modal.classList.add('modal');
    modal.classList.add('confirm');
    modalBody.classList.add('modal-body');

    setTimeout(() => {
        modal.classList.add('show');
        modal.style.opacity = '1';
    }, 10)
  
    document.body.appendChild(modal);

}

