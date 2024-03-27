const currentURL = window.location.href;
const indexSlash = currentURL.lastIndexOf('/');
const pageNameWithExtension = currentURL.substring(indexSlash + 1);
const pageName = pageNameWithExtension.replace('.html','')

const options = ["Consultas","Grupos","Bailarinas","Pagos","Asistencias"]

const nav = document.createElement('nav');
const logo = document.createElement('a');
const toggler = document.createElement('button');
const togglerIcon = document.createElement('span');
const offcanvas = document.createElement('div');
const ul = document.createElement('ul');

const li = options.forEach((option, index)=> {
    const li = document.createElement('li');
    const button = document.createElement('a');
    button.setAttribute("href", `${option}.html`);
    li.classList.add('nav-item'); 
    options[index] == pageName ? button.classList.add('nav-link','active'): button.classList.add('nav-link');
    button.innerText = option;
    li.appendChild(button);
    ul.appendChild(li);
})

nav.classList.add('navbar', 'navbar-expand-xxl');
logo.classList.add('navbar-brand');
toggler.classList.add('navbar-toggler');
togglerIcon.classList.add('navbar-toggler-icon');
offcanvas.classList.add('offcanvas', 'offcanvas-start');
ul.classList.add('navbar-nav');

toggler.setAttribute("type","button");
toggler.setAttribute("data-bs-toggle","offcanvas");
toggler.setAttribute("data-bs-target","#offcanvasExample");
offcanvas.setAttribute("id","offcanvasExample");
offcanvas.setAttribute("tabindex","-1");

logo.innerText = 'CMP';


nav.appendChild(logo);
nav.appendChild(toggler);
toggler.appendChild(togglerIcon);
nav.appendChild(offcanvas);
offcanvas.appendChild(ul);












document.body.insertBefore(nav , document.body.firstChild);