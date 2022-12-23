import { NavBar, Footer } from './components.js';

const homePath = localStorage.getItem('home') ?? '/'

function innerHTML(key, html) {
    if (document.querySelector(key)) {
        document.querySelectorAll(key).forEach((element) => {
            element.innerHTML = html;
        });
    }
}

function insertTemplates({ locale = 'fr' }) {
    innerHTML('.navbar', NavBar(locale, homePath));
    innerHTML('#footer', Footer(locale, homePath));
    innerHTML('#current-year', `${new Date().getFullYear()}`);
}

insertTemplates({ locale: 'fr' });










