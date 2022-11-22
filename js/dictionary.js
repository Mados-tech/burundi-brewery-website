const NavBarDic = (code) => {
    return {
        whoAreWe: {
            en: 'Who are we ?',
            fr: 'Qui sommes nous ?',
        }[code],
        ourProducts: {
            en: 'Our products',
            fr: 'Nos produits',
        }[code],
        ourPartners: {
            en: 'Our partners',
            fr: 'Nos partenaires',
        }[code],
        posts: {
            en: 'Publications',
            fr: 'Publications',
        }[code],
        socialResponsibility: {
            en: 'Social responsibility',
            fr: 'Responsabilité sociale',
        }[code],
        media: {
            en: 'Media',
            fr: 'Médias',
        }[code],
    }
};

export const dictionnary = (code) => {
    return {
        ...NavBarDic(code),
    }
}