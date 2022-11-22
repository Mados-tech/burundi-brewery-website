async function postData(url = '', data = {}) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
}

function SubscribeToNewsLetter() {
    const [email, setEmail] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
    const [errorMessage, setError] = React.useState('');
    const [successMessage, setSuccess] = React.useState('');

    const formRef = React.useRef();

    function sendMail() {
        setLoading(true);
        setSuccess('');
        setError('');
        postData('http://18.234.207.10:8000/api/subscribe-newsletter', { Email: email }).then((response) => {
            setLoading(false);
            if (response.id && response.email) {
                setSuccess('Votre e-mail a été enregistré avec succès');
                formRef.current.reset();
            } else {
                console.log('Failure', response);
                setError("Une erreur s'est produite, soit l'e-mail existe déjà dans notre liste de diffusion, soit vérifiez votre connexion Internet.")
            }
        })
    }

    return (
        <>
            <p>Abonnez-vous à notre newsletter</p>
            <div className='flex-row column-gap-middle text-close'>
                {errorMessage.length ? <p className='p-error'>{errorMessage}</p> : <></>}
                {successMessage.length ? <p className='p-success'>{successMessage}</p> : <></>}
                {errorMessage.length || successMessage.length ? <p className='close' onClick={(event) => {
                    event.stopPropagation();
                    setSuccess('');
                    setError('');
                }}>Fermer</p> : <></>}
            </div>
            <form ref={formRef} className='form-row-s-button'
                onChange={(event) => {
                    event.stopPropagation();
                    setEmail(event.target.value);
                }}
                onSubmit={(event) => {
                    event.preventDefault();
                    sendMail();
                }}
            >
                <input required type='email' placeholder="Votre adresse e-mail" name='Email' />
                <button className='comments_articles_input_button' type='submit'>{isLoading ? <i className='fa fa-spinner fa-spin' /> : <i className='fa fa-paper-plane' />}</button>
            </form>
        </>
    )
}


function Gallery() {

    const [index, setIndex] = React.useState(0);
    const [playing, setPlay] = React.useState(false);
    var interval = null;
    const dummy2 = [
        "https://www.burundi-forum.org/wp-content/uploads/2020/07/bdi_burundi_brewery_01_2020_akezanet.jpeg",
        "https://akeza.net/wp-content/uploads/2020/07/Ngozieco1.jpg.png",
        "https://en.investburundi.bi/images/helix/gallerie/DSC_0461.jpg",
        "https://burundi-agnews.org/wp-content/uploads/2012/12/BurundiBrewery.jpg",
        "https://www.burundibrewery.com/wp-content/uploads/elementor/thumbs/N-p8gmzyq8wkwah55qamqc8xd8u4o6tshtk14vg8crug.jpg",
    ];

    function handleActions({ isNext = true }) {
        if (isNext && index < (dummy2.length - 1)) {
            setIndex(index + 1);
        }
        if (!isNext && index > 0) {
            setIndex(index - 1);
        }
    }

    function automaticDisplay({ isPlay = true }) {
        if (isPlay) {
            interval = setInterval(() => {
                if (index < (dummy2.length - 1)) {
                    setIndex(index + 1);
                } else {
                    setIndex(0);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
    }

    return <div className='duo'>
        <div className="duo-left duo-yellow">
            <p className="rounded-card-p">Media</p>
            <h1 className="large-title">Notre galerie</h1>
            <p className="p-medium">Burundi Brewery est la première brasserie créée par des Burundais depuis que le Burundi existe. L’entreprise Burundi Brewery produit de l’eau minérale des boissons à base de banane et des jus de fruits.</p>
        </div>
        <div className="duo-right gallery-holder">
            <div className='galley'>
                <img key={Math.random()} src={dummy2[index]} alt='' />
                <div className='gallery-actions'>
                    {index > 0 ? <i className='fa fa-arrow-left' onClick={(event) => {
                        event.stopPropagation();
                        handleActions({ isNext: false });
                    }} /> : <></>}
                    {/* <i className='fa fa-play' /> */}
                    {index < (dummy2.length - 1) ? <i className='fa fa-arrow-right' onClick={(event) => {
                        event.stopPropagation();
                        handleActions({ isNext: true });
                    }} /> : <></>}

                    {/* <div/>
                    <div className='gallery-acions-arrows flex-row column-gap-middle'>
                        
                    </div> */}
                </div>
            </div>
        </div>
    </div>
}


function ContactUsForm() {

    const [form, setForm] = React.useState({});
    const [isAsync, setAsync] = React.useState(false);
    const [errorMessage, setError] = React.useState('');
    const [successMessage, setSuccess] = React.useState('');
    const formRef = React.useRef();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setAsync(true);
        setSuccess('');
        setError('');
        console.log(form);
        postData('https://server.cluster.madosgroup.com/automator/api/mailer/sendmail/', {
            subject: 'Contact from Website',
            email: ['nbkassumanidieudonne@gmail.com', 'atibudan2@gmail.com'],
            template: 'mados-home-email-checker',
            variables: {
                code: form.message,
                email: form.email,
            }
        }).then((response) => {
            setAsync(false);
            if (response.task) {
                setSuccess('Votre message a été envoyé avec succès');
                formRef.current.reset();
            } else {
                console.log('Failure', response);
                setError("Une erreur s'est produite, vérifiez votre connexion Internet, puis réessayez.")
            }
        })
    }

    return <form ref={formRef} className="contact-form" onChange={handleChange} onSubmit={handleSubmit}>
        <div className="input-labeled">
            <label>Votre nom</label>
            <input placeholder="Noms" name="name" />
        </div>
        <div className="input-labeled">
            <label>Adresse e-mail</label>
            <input placeholder="Adresse e-mail" name="email" />
        </div>
        <div className="input-labeled">
            <label>Message</label>
            <textarea placeholder="Message" name="message"></textarea>
        </div>
        <div className='flex-row column-gap-middle text-close'>
            {errorMessage.length ? <p className='p-error'>{errorMessage}</p> : <></>}
            {successMessage.length ? <p className='p-success'>{successMessage}</p> : <></>}
            {errorMessage.length || successMessage.length ? <p className='close' onClick={(event) => {
                event.stopPropagation();
                setSuccess('');
                setError('');
            }}>Fermer</p> : <></>}
        </div>
        <button type='submit'>{isAsync ? "S'il vous plaît, attendez..." : 'Envoyer le message'}</button>
    </form>
}



function Products() {


    const products = [
        {
            name: 'Soma Burundi',
            description: "Notre bière Soma Burundi a la spécificité de ne pas contenir de sucre ajouté et le taux d’alcool est de 6%. La matière première, à savoir la banane et l’eau sont disponibles sur place sauf le malt qui est importé. Burundi Brewery utilise deux sortes de bananes à savoir la banane FIA 17 et la banane FIA 25.",
            image: 'https://www.heineken.com/media-us/01pfxdqq/heineken-original-bottle.png?quality=85',
        },
        {
            name: 'Sangwe Burundi',
            description: "Un autre ingrédient indispensable à la production de la bière Soma Burundi est l’eau. La brasserie Burundi Brewery en a trouvé dans la commune Mwumba à 4 km de la ville de Ngozi où est basée cette entreprise. Nous avons trouvé une bonne qualité d’eau thermique à cet endroit et nous avons décidé de produire de l’eau minérale baptisée Sangwe.",
            image: 'https://pngimg.com/uploads/water_bottle/water_bottle_PNG98959.png',
        },
        {
            name: 'Jus Ok & One Burundi',
            description: "Le projet de production du jus d’ananas n’est pas abandonné pour autant. Neuf (9) cuves pouvant contenir 800 hectolitres ont été achetés pour appuyer les quatres (4) autres cuves de Septante (70) hectolitres existant. Nous projetons d’augmenter la production, de signer des contrats avec d’autres brasseries et de produire un jus d’ananas mais aussi un jus de banane.",
            image: 'https://www.freeiconspng.com/thumbs/pepsi-png/pepsi-png-image-22.png',
        },
    ];

    function handleActions({ isNext = true }) {
        if (isNext && index < (products.length - 1)) {
            setIndex(index + 1);
        }
        if (!isNext && index > 0) {
            setIndex(index - 1);
        }
    }

    const [index, setIndex] = React.useState(0);
    const currentProduct = products[index];
    return <div key={Math.random()} className="products-displayer">
        {/* <h1 className="large-title colored">Nos produits</h1> */}
        <div className="products-displayer-details">
            <h1 className="headline1">{currentProduct.name}</h1>
            <img src={currentProduct.image} />
            <p className="p-medium">{currentProduct.description}</p>
        </div>
        <div className="products-displayer-actions">
            <i className='fa fa-arrow-left' onClick={(event) => {
                event.stopPropagation();
                handleActions({ isNext: false });
            }} />
            <div className="l-indicator">
                {products.map((e, i) => {
                    const selected = i == index;
                    return <span
                        key={e.name}
                        className={`${selected ? 'single-l-selected' : ''} single-l`}
                        onClick={(event) => {
                            event.stopPropagation();
                            setIndex(i);
                        }}
                    ></span>
                })}
            </div>
            <i className='fa fa-arrow-right' onClick={(event) => {
                event.stopPropagation();
                handleActions({ isNext: true });
            }} />
        </div>
    </div>
}


const newsLetter = ReactDOM.createRoot(document.getElementById('newsLetterForm'));
const gallery = ReactDOM.createRoot(document.getElementById('media'));
const contactUs = ReactDOM.createRoot(document.getElementById('contact-us-form'));
const products = ReactDOM.createRoot(document.getElementById('products'));

newsLetter.render(
    <React.StrictMode>
        <SubscribeToNewsLetter />
    </React.StrictMode>,
);

gallery.render(
    <React.StrictMode>
        <Gallery />
    </React.StrictMode>,
);

contactUs.render(
    <React.StrictMode>
        <ContactUsForm />
    </React.StrictMode>,
);

products.render(
    <React.StrictMode>
        <Products />
    </React.StrictMode>,
);








