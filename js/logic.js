

import { NavBar, Cover, Footer } from './components.js';

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
    innerHTML('.cover', Cover(locale));
    innerHTML('#footer', Footer(locale, homePath));
}
insertTemplates({ locale: 'fr' });







