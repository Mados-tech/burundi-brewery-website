const systemBlogBaseUrl = 'https://blog.burundibrewery.com';
// const systemBlogBaseUrl = 'http://192.168.1.100:3000';

export const NavBar = (locale, homePath) => {
    return `
        <a href='${homePath}' class="logo-named">
            <img alt="" src="https://brewerystorage.s3.af-south-1.amazonaws.com/bbrew_logo.png"/>
            <h1 class="headline1 logoName">BURUNDI BREWERY S.A</h1>
        </a>
        <div class="navbar-actions flex column-gap-middle">
            <a href='${homePath}#about' onclick="handleCloseSideMenu()">${{
            en: 'Who are we ?',
            fr: 'Qui sommes nous ?',
        }[locale]}</a>
            <a href='${homePath}#products'onclick="handleCloseSideMenu()">${{
            en: 'Our products',
            fr: 'Nos produits',
        }[locale]}</a>
        <a href='${homePath}#contact-us' onclick="handleCloseSideMenu()">${{
            en: 'Contact us',
            fr: 'Contactez-nous',
        }[locale]}</a>
        <a href='${systemBlogBaseUrl}' onclick="handleCloseSideMenu()">${{
            en: 'News',
            fr: "Actualités",
        }[locale]}</a>
        <a href='${homePath}jobs' onclick="handleCloseSideMenu()">${{
            en: 'Job offer',
            fr: "Offre d'emploi",
        }[locale]}</a>
        <a href='${homePath}eoi' onclick="handleCloseSideMenu()">${{
            en: 'Expression of interest',
            fr: "Manifestation d'interet",
        }[locale]}</a>
        </div>
        <div id="nav-icon">
            <i id="menu-icon-button" class="fa fa-bars action-icon" onclick="handleBarButton()"></i>
        </div>
    `;
}

export const Cover = (locale) => {
    return `
    <div class="curtain"></div>
    <div class="curtain2"></div>
    <div class="cover-body">
        <div class="since flex column-gap-middle">
            <p>2012</p>
            <div class="range">
                <span class="range-round"></span>
            </div>
            <p>${new Date().getFullYear()}</p>
        </div>
        <h1 class="cover-title">${{
            en: 'Burundi Brewery',
            fr: 'La brasserie Burundi Brewery',
        }[locale]}</h1>
        <p class="cover-subtitle">${{
            en: 'Leader in fruit-based drinks on the Burundi market.',
            fr: 'Leader des boissons à base de fruits sur le marché burundais.',
        }[locale]}</p>
    </div>
    `;
}

export const Footer = (locale, homePath) => {
    return `
    <div class="footer-header">
        <div class="foo-block">
            <a href="${homePath}#about">Historique</a>
            <a href="${homePath}#vision">Vision</a>
            <a href="${homePath}#social-responsibility">Engagement social</a>
            <a href="${homePath}#profile">Missions stratégiques </a>
            <a href="${homePath}#products">Nos produits</a>
            <a href="${homePath}agencies">Nos agences</a>
            <a href='${homePath}#staff'>Notre équipe</a>
        </div>
        <div class="foo-block">
            <a href='${homePath}eoi'>Manifestation d'intérêt</a>
            <a href='${homePath}jobs'>Offre d'emploi</a>
            <a href='${systemBlogBaseUrl}'>Actualités</a>
            <a href="${homePath}#contact-us">Contactez-nous</a>
            <a href="${homePath}#media">Galerie</a>
        </div>
        <div class="foo-block">
            <p>Social</p>
            <div class="social-media">
                <a target="_blank" href="https://facebook.com/profile.php?id=100084507192077"><i
                        class="fa-brands fa-facebook"></i></a>
                <a target="_blank" href="https://twitter.com/burundibrewery"><i
                        class="fa-brands fa-twitter"></i></a>
                <a target="_blank" href="https://instagram.com/burundibrewery"><i
                        class="fa-brands fa-instagram"></i></a>
                <a target="_blank" href="https://youtube.com/@burundibrewery"><i
                        class="fa-brands fa-youtube"></i></a>
            </div>
        </div>
        <div id="newsLetterForm" class="foo-block"></div>
    </div>
    <div class="footer-bottom">
        <p>© Copyright Burundi Brewery. Tous les droits sont réservés</p>
        <p>Réalisation par <a href="https://madosgroup.com/" target="_blank">Mados Group</a></p>
    </div>
    `
}
