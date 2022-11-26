const systemBaseUrl = 'http://192.168.1.102:8000/brewery/api';

async function postData(url = '', data = {}) {
    return await fetch(`${systemBaseUrl}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).catch((e) => {
        console.log(e);
        return {};
    });
}

async function fetchData(url = '') {
    return await fetch(`${systemBaseUrl}/${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json()).catch((e) => {
        console.log(e);
        return {};
    });
}

async function postDataWithFiles({ url = '', data = new FormData() }) {
    return await fetch(`${systemBaseUrl}/${url}`, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
        },
        body: data,
    }).then(response => response.json()).catch((e) => {
        console.log(e);
        return {};
    });
}


function SubscribeToNewsLetter() {
    const [email, setEmail] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
    const [errorMessage, setError] = React.useState('');
    const [successMessage, setSuccess] = React.useState('');

    const formRef = React.useRef();

    function sendMail() {
        setSuccess('');
        setError('');
        if (email.length) {
            setLoading(true);
            postData('blog/subscribe-newsletter', { Email: email }).then((response) => {
                setLoading(false);
                if (response.id && response.email) {
                    setSuccess('Votre e-mail a été enregistré avec succès');
                    formRef.current.reset();
                } else {
                    console.log('Failure', response);
                    setError("Une erreur s'est produite, soit l'e-mail existe déjà dans notre liste de diffusion, soit vérifiez votre connexion Internet.")
                }
            })
        } else {
            setError('Tout les champs sont obligatoires.');
        }

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
                    {index < (dummy2.length - 1) ? <i className='fa fa-arrow-right' onClick={(event) => {
                        event.stopPropagation();
                        handleActions({ isNext: true });
                    }} /> : <></>}
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
        setSuccess('');
        setError('');
        console.log(form);
        if (form?.Email?.length && form?.Name?.length && form?.Message?.length) {
            setAsync(true);
            postData('blog/contactus', form).then((response) => {
                setAsync(false);
                if (response.task) {
                    setSuccess('Votre message a été envoyé avec succès');
                    formRef.current.reset();
                    setForm({});
                } else {
                    console.log('Failure', response);
                    setError("Une erreur s'est produite, vérifiez votre connexion Internet, puis réessayez.")
                }
            })
        } else {
            setError('Tout les champs sont obligatoires.');
        }

    }

    return <form ref={formRef} className="contact-form" onChange={handleChange} onSubmit={handleSubmit}>
        <div className="input-labeled">
            <label>Votre nom</label>
            <input placeholder="Noms" name="Name" required />
        </div>
        <div className="input-labeled">
            <label>Adresse e-mail</label>
            <input placeholder="Adresse e-mail" name="Email" required />
        </div>
        <div className="input-labeled">
            <label>Message</label>
            <textarea placeholder="Message" name="Message" required></textarea>
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
        <button className={`${isAsync ? 'loading-button' : ''}`} type='submit'>{isAsync ? "S'il vous plaît, attendez..." : 'Envoyer le message'}</button>
    </form>
}

function EoiForm() {

    const [isAsync, setAsync] = React.useState(false);
    const [errorMessage, setError] = React.useState('');
    const [successMessage, setSuccess] = React.useState('');
    const [formData, setForm] = React.useState(new FormData());
    const formRef = React.useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');
        console.log(formData.entries);
        setAsync(true);
        postDataWithFiles({ url: 'job/eointerest', data: formData }).then((response) => {
            setAsync(false);
            if (response.saved) {
                setSuccess('Votre candidature a été envoyé avec succès');
                formRef.current.reset();
                setForm(new FormData());
            } else {
                console.log('Failure', response);
                setError("Une erreur s'est produite, vérifiez votre connexion Internet, puis réessayez.")
            }
        })

    }

    return <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
        <div className="input-labeled">
            <label>Nom de l'entreprise</label>
            <input type="name" placeholder="Entreprise" name="Name" required onChange={(e) => {
                e.stopPropagation();
                formData.set('Name', e.target.value);
            }} />
        </div>
        <div className="input-labeled">
            <label>Adresse e-mail</label>
            <input type="email" placeholder="Adresse e-mail" name="Email" required onChange={(e) => {
                e.stopPropagation();
                formData.set('Email', e.target.value);
            }} />
        </div>
        <div className="input-labeled">
            <label>Document</label>
            <input type="file" placeholder="Document" name="Document" required onChange={(e) => {
                e.stopPropagation();
                formData.set('Document', e.target.files[0]);
            }} />
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
        <button className={`${isAsync ? 'loading-button' : ''}`} type='submit'>{isAsync ? "S'il vous plaît, attendez..." : 'Envoyer'}</button>
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
        <h1 className="large-title colored">Nos produits</h1>
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


function ApplicationForm({ job = {}, onClose = () => { } }) {
    const [isAsync, setAsync] = React.useState(false);
    const [errorMessage, setError] = React.useState('');
    const [successMessage, setSuccess] = React.useState('');
    const [formData, setForm] = React.useState(new FormData());
    const formRef = React.useRef();

    const handleSubmit = (event) => {

        event.preventDefault();
        formData.set('Job_id', job.id);
        setSuccess('');
        setError('');
        console.log(formData.entries);
        setAsync(true);
        postDataWithFiles({ url: 'job/write/application_namespace', data: formData }).then((response) => {
            setAsync(false);
            if (response.id) {
                setSuccess('Votre candidature a été envoyé avec succès');
                formRef.current.reset();
                setForm(new FormData());
            } else {
                console.log('Failure', response);
                setError("Une erreur s'est produite, vérifiez votre connexion Internet, puis réessayez.")
            }
        })

    }
    return <div className="modal-curtain">
        <form ref={formRef} className="contact-form application-form" onSubmit={handleSubmit}>
            <div className="flex-row application-form-header">
                <h1>Formulaire de candidature pour {job?.title}</h1>
                <i className='fa fa-xmark action-icon' onClick={(event) => {
                    event.stopPropagation();
                    onClose();
                }} />
            </div>
            <div />
            <div className="input-labeled">
                <label>Votre nom complet</label>
                <input type="name" placeholder="Noms" name="Name" required onChange={(e) => {
                    e.stopPropagation();
                    formData.set('Name', e.target.value);
                }} />
            </div>
            <div className="input-labeled">
                <label>Adresse e-mail</label>
                <input type="email" placeholder="Adresse e-mail" name="Email" required onChange={(e) => {
                    e.stopPropagation();
                    formData.set('Email', e.target.value);
                }} />
            </div>
            <div className="input-labeled">
                <label>Votre CV</label>
                <input type="file" placeholder="Cv" name="Cv" required onChange={(e) => {
                    e.stopPropagation();
                    formData.set('Cv', e.target.files[0]);
                }} />
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
            <button className={`${isAsync ? 'loading-button' : ''}`} type='submit'>{isAsync ? "S'il vous plaît, attendez..." : 'Envoyer'}</button>
        </form>
    </div>
}


function Jobs() {

    const [fetching, setFetching] = React.useState(false);
    const [jobs, setJobs] = React.useState([]);
    const [isAsync, setAsync] = React.useState(false);
    const [wannaApply, setWannaApply] = React.useState(false);
    const [currentJob, setCurrentJob] = React.useState({});

    function fetchJobs() {
        if (!fetching) {
            setFetching(true);
            setAsync(true);
            fetchData('job/findmany/offer_namespace').then((response) => {
                setFetching(false);
                setAsync(false);
                const { data } = response;
                if (data && data?.length) {
                    setJobs(response.data);
                }
                console.log(response);
            })
        }
    }


    React.useEffect(() => {
        fetchJobs();
    }, []);



    return <div className="job-displayer">
        {wannaApply && jobs.length ? <ApplicationForm job={currentJob} onClose={() => {
            setWannaApply(false);
            setCurrentJob({});
        }} /> : <></>}
        <h1 className="large-title">Offre d'emploi</h1>
        {jobs.length
            ? <div className='jobs'>
                {jobs.map((e) => {
                    const { id, description, limit_day_to_submit, document, title } = e;
                    return <div className="single-job" key={id}>
                        <div className='job-header flex-row column-gap-middle'>
                            <p className="p-medium bold">{title}</p>
                            <button onClick={(event) => {
                                event.stopPropagation();
                                setCurrentJob(e);
                                setWannaApply(true);
                            }}>Postuler</button>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: description }}></div>
                        <p>Obtenez la description complète de cette offre <a href={document} target='_blank' className="bold">ici</a>.</p>
                        <p>Date limite {new Date(limit_day_to_submit).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                })}
            </div>
            : isAsync === true
                ? <p>Veuillez patienter ...</p>
                : <p>Aucune offre d'emploi disponible</p>
        }
    </div>
}

function ReactCompRender(id, component) {
    if (!id) return;
    const element = document.getElementById(id);
    if (element) {
        ReactDOM.createRoot(element).render(component);
    }
}

ReactCompRender('newsLetterForm', <SubscribeToNewsLetter />);
ReactCompRender('media', <Gallery />);
ReactCompRender('contact-us-form', <ContactUsForm />);
ReactCompRender('eoi-form', <EoiForm />);
ReactCompRender('products', <Products />);
ReactCompRender('jobs', <Jobs />);










