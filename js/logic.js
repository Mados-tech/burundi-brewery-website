import { NavBar, Cover, Products } from './components.js';


function innerHTML(key, html) {
    if (document.querySelector(key)) {
        document.querySelector(key).innerHTML = html;
    }
}

function handleLanguageChange({ locale = 'fr' }) {
    innerHTML('.navbar', NavBar(locale));
    innerHTML('.cover', Cover(locale));
    // innerHTML('#products', Products(locale));
}

handleLanguageChange({ locale: 'fr' });

