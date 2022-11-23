export const NavBar = (locale) => {
    return `
        
        <div class="logo-named">
            <img alt="" src="https://dpictures.s3.amazonaws.com/pv-d/20221119_072215.png"/>
            <h1 class="headline1 logoName">BURUNDI BREWERY</h1>
        </div>
        <div class="navbar-actions flex column-gap-middle">
            <a href='#about'>${{
            en: 'Who are we ?',
            fr: 'Qui sommes nous ?',
        }[locale]}</a>
            <a href='#products'>${{
            en: 'Our products',
            fr: 'Nos produits',
        }[locale]}</a>
        <a href='#contact-us'>${{
            en: 'Contact us',
            fr: 'Contactez-nous',
        }[locale]}</a>
        <a href=''>${{
            en: 'Job offer and news',
            fr: "Offre d'emploi et actualités",
        }[locale]}</a>
        <a href=''>${{
            en: 'Expression of interest',
            fr: "Manifestation d'interet",
        }[locale]}</a>
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

export const Products = (locale) => {
    const products = [
        {
            name: 'Soma Burundi',
            description: {
                fr: "Notre bière Soma Burundi a la spécificité de ne pas contenir de sucre ajouté et le taux d’alcool est de 6%. La matière première, à savoir la banane et l’eau sont disponibles sur place sauf le malt qui est importé. Burundi Brewery utilise deux sortes de bananes à savoir la banane FIA 17 et la banane FIA 25.",
                en: "Our Soma Burundi beer has the specificity of not containing added sugar and the alcohol content is 6%. The raw material, namely bananas and water are available on site except for the malt which is imported. Burundi Brewery uses two kinds of bananas namely the FIA ​​17 banana and the FIA ​​25 banana.",
            },
            image: 'https://www.heineken.com/media-us/01pfxdqq/heineken-original-bottle.png?quality=85',
        },
        {
            name: 'Sangwe',
            description: {
                en: "Another essential ingredient for the production of Soma Burundi beer is water. The Burundi Brewery found some in the Mwumba commune, 4 km from the town of Ngozi where this company is based. We found good quality thermal water there and decided to produce mineral water called Sangwe.",
                fr: "Un autre ingrédient indispensable à la production de la bière Soma Burundi est l’eau. La brasserie Burundi Brewery en a trouvé dans la commune Mwumba à 4 km de la ville de Ngozi où est basée cette entreprise. Nous avons trouvé une bonne qualité d’eau thermique à cet endroit et nous avons décidé de produire de l’eau minérale baptisée Sangwe.",
            },
            image: 'https://pngimg.com/uploads/water_bottle/water_bottle_PNG98959.png',
        },
        {
            name: 'Jus Ok & One Burundi',
            description: {
                fr: "Le projet de production du jus d’ananas n’est pas abandonné pour autant. Neuf (9) cuves pouvant contenir 800 hectolitres ont été achetés pour appuyer les quatres (4) autres cuves de Septante (70) hectolitres existant. Nous projetons d’augmenter la production, de signer des contrats avec d’autres brasseries et de produire un jus d’ananas mais aussi un jus de banane.",
                en: "The pineapple juice production project has not been abandoned, however. Nine (9) tanks that can contain 800 hectoliters have been purchased to support the four (4) other existing tanks of seventy (70) hectoliters. We plan to increase production, sign contracts with other breweries and produce pineapple juice but also banana juice.",
            },
            image: 'https://www.freeiconspng.com/thumbs/pepsi-png/pepsi-png-image-22.png',
        },
    ];
    return `
        ${products.map((e, i) => {
        return `
        <div class="single-product flex column-gap-middle">
        <div class="product-info">
            <h1 class="headline1">${e.name}</h1>
            <p>${e.description[locale]}</p>
            <a class="slide__prev" href="#slides__4" title="Next"></a>
        </div>
        <div class="product-image">
            <img class="section-img"
                src=${e.image} alt="" />
        </div>
    </div>
        `
    })}
    
    `
}