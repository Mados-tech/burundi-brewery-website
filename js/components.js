const systemBlogBaseUrl = 'https://blog.burundibrewery.com';
// const systemBlogBaseUrl = 'http://192.168.1.100:3000';

export const NavBar = (locale, homePath) => {
    return `
        <a href='${homePath}' class="logo-named">
            <img alt="" src="https://brewerystorage.s3.af-south-1.amazonaws.com/bbrew_logo.png"/>
            <h1 class="headline1 logoName">BURUNDI BREWERY S.A</h1>
        </a>
        <div class="navbar-actions flex column-gap-middle">
            <div class="contextual-arrow" id="c-m-about">
                <a>Qui sommes nous ?
                <i class="fa fa-caret-down"></i>
                </a>
                <div class="contextual-menu">
                    <a href="${homePath}#about" onclick="handleCloseSideMenu()">Historique</a>
                    <a href="${homePath}#profile" onclick="handleCloseSideMenu()">Profile</a>
                    <a href="${homePath}#vision" onclick="handleCloseSideMenu()">Vision</a>
                    <a href="${homePath}#social-responsibility" onclick="handleCloseSideMenu()">Responsabilité</a>
                    <a href="${homePath}team" onclick="handleCloseSideMenu()">Notre équipe</a>
                    <a href="${homePath}agencies" onclick="handleCloseSideMenu()">Nos agences</a>
                </div>
            </div>
            <div id="products-alizer"></div>
            <div class="contextual-arrow">
                <a>Publications
                <i class="fa fa-caret-down"></i>
                </a>
                <div class="contextual-menu">
                    <a href="${homePath}eoi" onclick="handleCloseSideMenu()">Appels d'offre</a>
                    <a href="${homePath}jobs" onclick="handleCloseSideMenu()">Recrutments</a>
                    <a href="${homePath}news" onclick="handleCloseSideMenu()">Actualités</a>
                </div>
            </div>
            <a href='${homePath}#media' onclick="handleCloseSideMenu()">Media</a>
            <a href='${homePath}contact-us' onclick="handleCloseSideMenu()">Contactez-nous</a>
        </div>
        <div id="nav-icon">
            <i id="menu-icon-button" class="fa fa-bars action-icon" onclick="handleBarButton()"></i>
        </div>
    `;
}

export const Footer = (locale, homePath) => {
    return `
    <div class="footer-header">
        <div class="foo-block">
        <a href="${homePath}#about" onclick="handleCloseSideMenu()">Historique</a>
        <a href="${homePath}#profile" onclick="handleCloseSideMenu()">Profile</a>
        <a href="${homePath}#vision" onclick="handleCloseSideMenu()">Vision</a>
        <a href="${homePath}#social-responsibility" onclick="handleCloseSideMenu()">Responsabilité</a>
        <a href="${homePath}team" onclick="handleCloseSideMenu()">Notre équipe</a>
        <a href="${homePath}agencies" onclick="handleCloseSideMenu()">Nos agences</a>
        </div>
        <div id="products-footer"></div>
        <div class="foo-block">
        <a href="${homePath}eoi" onclick="handleCloseSideMenu()">Appels d'offre</a>
        <a href="${homePath}jobs" onclick="handleCloseSideMenu()">Recrutments</a>
        <a href="${homePath}news" onclick="handleCloseSideMenu()">Actualités</a>
        </div>
        <div class="foo-block">
            <a href="${homePath}#media">Media</a>
            <a href="${homePath}contact-us">Contactez-nous</a>
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
