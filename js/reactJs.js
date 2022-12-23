// const systemBaseUrl = 'http://192.168.43.114:8000/brewery/api';
const systemBaseUrl = 'https://brewery.madosgroup.com/brewery/api';

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


function Gallery({ events = [] }) {
    const [catIndex, setCatIndex] = React.useState(0);


    function handleSlideGaller(isNext) {
        const sliderGap = 300;
        if (!isNext) {
            document.getElementById('caroussel002_items_gallery').scrollLeft += sliderGap;
        } else {
            document.getElementById('caroussel002_items_gallery').scrollLeft -= sliderGap;
        }
    }
    const currentEvent = events[catIndex];

    return events.length ? <div className='duo'>
        <div className="duo-left duo-yellow">
            <p className="rounded-card-p">Media</p>
            <h1 className="large-title">Notre galerie</h1>
            <p className="p-medium">Burundi Brewery est la première brasserie créée par des Burundais depuis que le Burundi existe. L’entreprise Burundi Brewery produit de l’eau minérale des boissons à base de banane et des jus de fruits.</p>
        </div>
        <div className="duo-right gallery-holder">
            <div id="caroussel002_items_gallery" className='caroussel002_items'>
                <div className='caroussel002_items_icons caroussel002_items_icons_left' onClick={(e) => {
                    e.stopPropagation();
                    handleSlideGaller(true);
                }}>
                    <i className='fa fa-arrow-left' />
                </div>
                {events.map((e, i) => {
                    return <p
                        className='categories_displayer_category'
                        id={catIndex === i ? 'categories_displayer_category_selected' : ''}
                        key={e.id}
                        value={e.id}
                        onClick={(event) => {
                            event.stopPropagation();
                            setCatIndex(i);
                        }}
                    >{e.title}</p>
                })}
                <div className='caroussel002_items_icons caroussel002_items_icons_right' onClick={(e) => {
                    e.stopPropagation();
                    handleSlideGaller(false);
                }}>
                    <i className='fa fa-arrow-right' />
                </div>
            </div>
            <div className="gallery-image-space">
                <GalleryImagesDisplayer images={currentEvent?.image} />
            </div>
        </div>
    </div> : <></>
}

function ImagesDisplayer({ images = [] }) {
    console.log(images);

    const [currentImage, setCurrentImage] = React.useState(0);

    function handleActions({ isNext = true }) {
        if (!isNext && currentImage > 0) {
            setCurrentImage(currentImage - 1)
        }

        if (isNext && currentImage < (images.length - 1)) {
            setCurrentImage(currentImage + 1)
        }
    }

    return images.length ? < div className='slide-show-slides' key={Math.random()} >
        <a className="prev" onClick={(event) => {
            event.stopPropagation();
            handleActions({ isNext: false });
        }}>&#10094;</a>
        <a className="next" onClick={(event) => {
            event.stopPropagation();
            handleActions({ isNext: true });
        }}>&#10095;</a>
        <img className="image-slide" src={images[currentImage]} alt="" />
    </div > : <p className="p-centered">Aucune image disponible</p>
}

function GalleryImagesDisplayer({ images = [] }) {
    console.log(images);

    const [currentImage, setCurrentImage] = React.useState(0);

    function handleActions({ isNext = true }) {
        if (!isNext && currentImage > 0) {
            setCurrentImage(currentImage - 1)
        }

        if (isNext && currentImage < (images.length - 1)) {
            setCurrentImage(currentImage + 1)
        }
    }

    return images.length ? < div className='slide-show-slides' key={Math.random()} >
        <a className="prev" onClick={(event) => {
            event.stopPropagation();
            handleActions({ isNext: false });
        }}>&#10094;</a>
        <a className="next" onClick={(event) => {
            event.stopPropagation();
            handleActions({ isNext: true });
        }}>&#10095;</a>
        <img className="image-slide" src={images[currentImage].link} alt={images[currentImage].description} />
        <div className="single-image-description">
            <p>{images[currentImage].description}</p>
            <div className="social-media">
                <a target="_blank" href={images[currentImage].facebook}><i
                    className="fa-brands fa-facebook"></i></a>
                <a target="_blank" href={images[currentImage].twitter}><i
                    className="fa-brands fa-twitter"></i></a>
                <a target="_blank" href={images[currentImage].instagram}><i
                    className="fa-brands fa-instagram"></i></a>
                <a target="_blank" href={images[currentImage].youtube}><i
                    className="fa-brands fa-youtube"></i></a>
            </div>
        </div>
    </div > : <p className="p-centered">Aucune image disponible</p>
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

function EoiForm({ id = '', onClose = () => { } }) {

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
        formData.set('EOI', id);
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

    return <form ref={formRef} className="contact-form eoi-form" onSubmit={handleSubmit}>
        <div className="flex-row application-form-header">
            <h1></h1>
            <i className='fa fa-xmark action-icon' onClick={(event) => {
                event.stopPropagation();
                onClose();
            }} />
        </div>
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


function Products({ products = [] }) {
    function handleActions({ isNext = true }) {
        if (isNext && index < (products.length - 1)) {
            setIndex(index + 1);
        }
        if (!isNext && index > 0) {
            setIndex(index - 1);
        }
    }

    console.log(typeof window.location.hash);


    const hash = window.location.hash;
    const [index, setIndex] = React.useState(Number(hash.replaceAll("#", "")));
    const currentProduct = products[index];

    React.useEffect(() => {
        window.addEventListener("hashchange", function set() {
            const hashF = window.location.hash;
            setIndex(Number(hashF.replaceAll("#", "")))
        }, false);

        return () => {
            window.removeEventListener('hashchange', () => { }, false);
        }
    }, [])



    return products.length ? <div key={Math.random()} className="products-displayer">
        {/* <h1 className="large-title">Nos produits</h1> */}
        <div className="products-displayer-details">
            <ImagesDisplayer images={currentProduct?.images.map((e) => e.link)} />
            <div className="row-gap-middle">
                <h1 className="headline1">{currentProduct?.name}</h1>
                <p className="p-medium">{currentProduct?.description}</p>
            </div>
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
    </div> : <></>
}

function ProductsList({ products = [] }) {

    function handleCloseSideMenu() {
        document.querySelector('.side-menu').style.transform = "scaleX(0)";
    }

    const homePath = localStorage.getItem('home') ?? '/';

    return <div className="contextual-arrow">
        <a>
            Nos produits
            <i className="fa fa-caret-down"></i>
        </a>
        <div className="contextual-menu">
            {products.map((e, i) => {
                return <a key={e.name} href={`${homePath}products/#${i}`} onClick={handleCloseSideMenu}>{e.name}</a>
            })}
        </div>
    </div>
}

function ProductsListFooter({ products = [] }) {

    function handleCloseSideMenu() {
        document.querySelector('.side-menu').style.transform = "scaleX(0)";
    }

    const homePath = localStorage.getItem('home') ?? '/';

    return <div className="foo-block">
        {products.map((e, i) => {
            return <a key={e.name} href={`${homePath}products/#${i}`}>{e.name}</a>
        })}
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

function ApplicationEoiForm({ job = {}, onClose = () => { } }) {
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
        <section className="duo eoi-form-parent">
            <div className="duo-left contact-info">
                <div className="contact-info-box">
                    <h1 className="large-title">Postuler</h1>
                    <p>L'appel à manifestation d'intérêt est un mode de présélection des candidats qui seront invités à
                        soumissionner lors de futures procédures de passation de marchés publics (appels d'offres restreints
                        ou procédure concurrentielle avec négociation).
                        <br></br>
                        Remplissez le formulaire et notre équipe vous
                        répondra dans les 24 heures.</p>
                    <p>Tous les champs sont obligatoires. L'e-mail sera utilisé pour vous contacter, Le document que vous
                        téléchargez doit contenir :</p>
                </div>
                <div className="contact-info-box">
                    <div className="single-contact flex-row column-gap-middle">
                        <p>1. Informations sur le fournisseur (Raison sociale, adresse physique, téléphone,
                            e-mail, NIF, RC, capacité financière, statut juridique , structure organisationnelle)</p>
                    </div>
                    <div className="single-contact flex-row column-gap-middle">
                        <p>2. Expérience (CV, certificat de service, autres pièces jointes)</p>
                    </div>
                    <div className="single-contact flex-row column-gap-middle">
                        <p>3. Offre technique (Décrivez ce que vous proposez)</p>
                    </div>
                </div>
            </div>
            <EoiForm id={job.id} onClose={onClose} />
        </section >
    </div >
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

function Eois() {

    const [fetching, setFetching] = React.useState(false);
    const [jobs, setJobs] = React.useState([]);
    const [isAsync, setAsync] = React.useState(false);
    const [wannaApply, setWannaApply] = React.useState(false);
    const [currentJob, setCurrentJob] = React.useState({});

    function fetchJobs() {
        if (!fetching) {
            setFetching(true);
            setAsync(true);
            fetchData('job/findmany/eoi_offer').then((response) => {
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
        {wannaApply && jobs.length ? <ApplicationEoiForm job={currentJob} onClose={() => {
            setWannaApply(false);
            setCurrentJob({});
        }} /> : <></>}
        <h1 className="large-title">Marchés publics</h1>
        {jobs.length
            ? <div className='jobs'>
                {jobs.map((e) => {
                    console.log(e);
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
                        {/* <p>Date limite {new Date(limit_day_to_submit).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
                    </div>
                })}
            </div>
            : isAsync === true
                ? <p>Veuillez patienter ...</p>
                : <p>Aucun marché public disponible</p>
        }
    </div>
}

function Agencies() {

    const [fetching, setFetching] = React.useState(false);
    const [jobs, setJobs] = React.useState([]);
    const [isAsync, setAsync] = React.useState(false);
    const [wannaApply, setWannaApply] = React.useState(false);
    const [currentJob, setCurrentJob] = React.useState({});

    function fetchJobs() {
        if (!fetching) {
            setFetching(true);
            setAsync(true);
            fetchData('blog/findmany/agence_namespace').then((response) => {
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
        <h1 className="large-title">Nos agences</h1>
        {jobs.length
            ? <div className='jobs'>
                {jobs.map((e) => {
                    const { id, address, fax, phone, name } = e;
                    return <div>
                        <h1>{name}</h1>
                        <p>{address}</p>
                        <p>Tel: {phone}</p>
                        <p>Fax: (+257) {fax}</p>
                    </div>
                })}
            </div>
            : isAsync === true
                ? <p>Veuillez patienter ...</p>
                : <p>Aucune agence disponible</p>
        }
    </div>
}

function Staff({ members = [] }) {
    return members.length ? <div className="job-displayer staff-members-displayer">
        <h1 className="large-title">Notre équipe</h1>
        <div className='staff-members'>
            {members.map((e) => {
                const { id, name, phone, email, post, profile } = e;
                return <div className="single-member">
                    <img src={profile} alt={name} />
                    <div className="single-member-info">
                        <p className="p-medium bold">{name}</p>
                        <p className="p-medium">{post}</p>
                    </div>
                </div>
            })}
        </div>
    </div> : <></>
}

function Covers({ covers = [] }) {

    const coversOfficial = covers?.length ? covers : [
        "https://brewerystorage.s3.af-south-1.amazonaws.com/bdi_burundi_brewery_02_2020_akezanet.jpeg",
        "https://brewerystorage.s3.af-south-1.amazonaws.com/DSC_0461.jpg",
        "https://brewerystorage.s3.af-south-1.amazonaws.com/Ngozieco1.jpg.png",
        "https://brewerystorage.s3.af-south-1.amazonaws.com/Bbrew2.JPG",
        "https://brewerystorage.s3.af-south-1.amazonaws.com/Cuves+Brew2.JPG",
    ].map((e) => {
        return { link: e }
    });

    let slideIndex = 0;

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 5000); // Change image every 2 seconds
    }

    React.useEffect(() => {
        if (coversOfficial.length) {
            showSlides();
        }
    }, []);

    return coversOfficial.length ? <div className="slideshow-container" style={{
        backgroundImage: `url(${coversOfficial[0].link})`,
    }}>
        {coversOfficial.map((e) => {
            return <div className="mySlides fade">
                <img src={e.link} />
            </div>
        })}
    </div> : <></>
}


function NewsCategoriesDisplayer({ onChange = () => { } }) {

    const [fetching, setFetching] = React.useState(false);
    const [jobs, setJobs] = React.useState([]);
    const [isAsync, setAsync] = React.useState(false);
    const [currentJob, setCurrentJob] = React.useState(0);

    function fetchJobs() {
        if (!fetching) {
            setFetching(true);
            setAsync(true);
            fetchData('blog/findmany/blogcategory_namespace?limit=100').then((response) => {
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

    return !isAsync
        ? <div className='categories_displayer'>
            <div className='categories_displayer_list_category'>
                <p className='categories_displayer_category'
                    id={currentJob === 0 ? 'categories_displayer_category_selected' : ''}
                    key={0}
                    value={0}
                    onClick={(event) => {
                        event.stopPropagation();
                        if (currentJob !== 0) {
                            setCurrentJob(0);
                            onChange(undefined);
                        }
                    }}>A la une</p>
                {jobs.map((e) => {
                    return <p
                        className='categories_displayer_category'
                        id={currentJob === e.id ? 'categories_displayer_category_selected' : ''}
                        key={e.id}
                        value={e.id}
                        onClick={(event) => {
                            event.stopPropagation();
                            if (currentJob !== e.id) {
                                setCurrentJob(e.id);
                                onChange(e.id);
                            }
                        }}
                    >{String(e.name).toLocaleUpperCase()}</p>
                })}
            </div>
        </div>
        : <div className='ct_displayer'>
            <div className='ct_displayer_category'>
                <div className='shimmer' />
                <div className='shimmer' />
                <div className='shimmer' />
                <div className='shimmer' />
            </div>
        </div>
}

function News() {

    const [fetching, setFetching] = React.useState(false);
    const [jobs, setJobs] = React.useState([]);
    const [isAsync, setAsync] = React.useState(false);
    const [wannaApply, setWannaApply] = React.useState(false);
    const [currentJob, setCurrentJob] = React.useState({});
    const [currentCategoryId, setCatId] = React.useState(undefined);

    function fetchJobs({ id = undefined }) {
        const url =
            id !== undefined ? `findone/blogcategory_namespace/${Number(id)}?more=yes`
                : 'findmany/blog_namespace?page=0';
        console.log('testtt', url);
        if (!fetching) {
            setFetching(true);
            setAsync(true);
            fetchData(`blog/${url}`).then((response) => {
                setFetching(false);
                setAsync(false);
                if (id !== undefined) {
                    const { blog } = response;
                    if (blog && blog?.length) {
                        setJobs(blog);
                    }
                } else {
                    const { data } = response;
                    if (data && data?.length) {
                        setJobs(response.data);
                    }
                }
                console.log(response);
            })
        }
    }


    React.useEffect(() => {
        fetchJobs({ id: currentCategoryId });
    }, [currentCategoryId]);



    return <div className="job-displayer">
        <h1 className="large-title">Actualités</h1>
        <NewsCategoriesDisplayer onChange={(id) => {
            setCatId(id);
        }} />
        {jobs.length && !isAsync
            ? <div className='articles-displayer'>
                {jobs.map((article) => {
                    return <a className='article_card' href={`/article/#${article.id}`}>
                        <img className='article_card_img' src={article.cover ? `${article.cover}` : 'https://archive.org/download/no-photo-available/no-photo-available.png'} alt='' />
                        <div className='article_card_info'>
                            <div className='timarticle_card_info_time_view'>
                                <p>{new Date(article.createdAt).toLocaleString()}</p>
                                <div className='timarticle_card_info_time_view_eye'>
                                    <i className='fa fa-eye' />
                                    <h6>{article.view}</h6>
                                </div>
                            </div>
                            <p className='article_card_info_topic'>{String(article?.category?.name).toLocaleUpperCase()}</p>
                            <h3 className=''>{article?.title}</h3>
                        </div>
                    </a>
                })}
            </div>
            : isAsync === true
                ? <p>Veuillez patienter ...</p>
                : <p>Aucun article  disponible</p>
        }
    </div>
}

function ArticleDetails() {

    const [fetching, setFetching] = React.useState(false);
    const [jobs, setJobs] = React.useState([]);
    const [isAsync, setAsync] = React.useState(false);
    const [wannaApply, setWannaApply] = React.useState(false);
    const [currentJob, setCurrentJob] = React.useState({});
    const [article, setArticle] = React.useState({});

    function fetchJobs() {
        if (!fetching) {
            setFetching(true);
            setAsync(true);
            const hashF = window.location.hash;
            fetchData(`blog/findone/blog_namespace/${Number(hashF.replaceAll("#", ""))}?more=true`).then((response) => {
                setFetching(false);
                setAsync(false);
                const { no_object } = response;
                if (!no_object) {
                    setArticle(response);
                    fetchMore({ id: response.category.id, articleId: response.id });
                }
                console.log(response);
            })
        }
    }

    function fetchMore({ id = undefined, articleId = undefined }) {
        if (id === undefined) return;
        if (!fetching) {
            fetchData(`blog/findone/blogcategory_namespace/${Number(id)}?more=yes`).then((response) => {
                const { blog } = response;
                if (blog && blog?.length) {
                    setJobs(blog);
                }
                console.log(response);
            })
        }
    }

    React.useEffect(() => {
        fetchJobs();
        window.addEventListener("hashchange", function set() {
            const hashF = window.location.hash;
            setArticle({});
            fetchJobs();
        }, false);

        return () => {
            window.removeEventListener('hashchange', () => { }, false);
        }
    }, [])


    const { id, title, view, createdAt, overView, cover, description, comment, category } = article;
    const isThereMore = jobs.filter((element) => element.id !== id).length > 0;
    return <div className="job-displayer">
        {Object.keys(article).length
            ? <div className='article-details_diplayer'>
                <div className='article_details_part'>
                    <div className='article_details_part article_details_part_top'>
                        <img src={cover ? `${cover}` : 'https://archive.org/download/no-photo-available/no-photo-available.png'} alt={title ?? ''} />
                        <div className='timarticle_card_info_time_view'>
                            <p>{createdAt ? new Date(createdAt).toLocaleString() : ''}</p>
                            <div className='timarticle_card_info_time_view_eye'>
                                <i className='fa fa-eye' />
                                <h6>{view ?? 0}</h6>
                            </div>
                        </div>
                        <p className='article_card_info_topic'>{String(category?.name).toLocaleUpperCase()}</p>
                        <h1>{title ?? ''}</h1>
                        <p className='art-overview'>{overView ?? ''}</p>
                        <div className='divider' />
                        <div dangerouslySetInnerHTML={{ __html: description ?? '' }} />
                    </div>
                    <ArticleDetailsComment comments={comment} articleId={id} />
                </div>
                <div>
                    {isThereMore ? <h2 className='more_text'>Plus d'articles</h2> : <></>}
                    <div className='red_separator' />
                    <div className='divider' /><div className='divider' /><div className='divider' />
                    <div className='more-articles-displayer'>
                        {isThereMore ? <>{jobs.filter((element) => element.id !== id).map((article) => {
                            return <a className='article_card_two' href={`/article/#${article.id}`}>
                                <img className='article_card_img_two' src={article.cover ? `${article.cover}` : 'https://archive.org/download/no-photo-available/no-photo-available.png'} alt={article?.title} />
                                <div className='article_card_info article_card_info_two'>
                                    <div className='timarticle_card_info_time_view'>
                                        <p>{new Date(article.createdAt).toLocaleString()}</p>
                                        <div className='timarticle_card_info_time_view_eye'>
                                            <i className='fa fa-eye' />
                                            <h6>{article.view}</h6>
                                        </div>
                                    </div>
                                    <p className='article_card_info_topic'>{String(article?.category?.name).toLocaleUpperCase()}</p>
                                    <h3 className=''>{article?.title}</h3>
                                </div>
                            </a>
                        })}</> : <></>}
                    </div>
                </div>
            </div>
            : isAsync === true
                ? <p>Veuillez patienter ...</p>
                : <p>Article introuvable</p>
        }
    </div>
}

function ArticleDetailsComment({ comments = [], articleId = undefined }) {
    const [email, setEmail] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);
    const [errorMessage, setError] = React.useState('');
    const [successMessage, setSuccess] = React.useState('');
    const [incomments, setComments] = React.useState([]);

    const formRef = React.useRef();

    function sendMail() {
        setSuccess('');
        setError('');
        if (email.length) {
            setLoading(true);
            postData(`blog/comment_on_post/${Number(articleId ?? 0)}`, { Text: email }).then((response) => {
                setLoading(false);
                if (response.id) {
                    setComments([response, ...incomments]);
                    setSuccess('Votre commentaire a été enregistré avec succès');
                    formRef.current.reset();
                } else {
                    console.log('Failure', response);
                    setError("Une erreur s'est produite,vérifiez votre connexion Internet.")
                }
            })
        } else {
            setError('Tout les champs sont obligatoires.');
        }

    }

    React.useEffect(() => {
        setComments(comments)
    }, [])

    return (
        <>
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
                <input required type='text' placeholder="Dites-nous ce que vous avez en tête..." name='Text' />
                <button className='comments_articles_input_button' type='submit'>{isLoading ? <i className='fa fa-spinner fa-spin' /> : <i className='fa fa-paper-plane' />}</button>
            </form>
            <div className='divider' />
            {incomments.length ? <div className='comments_articles_comments_list'>
                {incomments.map((e) => {
                    return <div key={e.id} className='comments_articles_comment'>
                        <div className='comments_articles_comment_header'>
                            <img src={`https://avatars.dicebear.com/api/personas/male/${Math.floor(Math.random() * 46542655127517)}.png`} alt='' />
                            <p>{new Date(e.createdAt).toLocaleString()}</p>
                        </div>
                        <p id='comments_articles_comment_body'>{e.content}</p>
                    </div>
                })}
            </div> : <></>}
        </>
    )
}


function doThisForAll(key, whatToDo) {
    if (document.querySelector(key)) {
        document.querySelectorAll(key).forEach((element) => {
            whatToDo(element);
        });
    }
}

function ReactCompRender(id, component) {

    if (!id) return;
    doThisForAll(`#${id}`, (element) => {
        ReactDOM.createRoot(element).render(component);
    })
}

fetchData('blog/view').then((response) => {
    console.log('Theee', response);
    const { cover, group_image, member, product } = response;
    ReactCompRender('products', <Products products={product} />);
    ReactCompRender('products-alizer', <ProductsList products={product} />);
    ReactCompRender('products-footer', <ProductsListFooter products={product} />);
    ReactCompRender('staff', <Staff members={member} />);
    ReactCompRender('media', <Gallery events={group_image} />);
    ReactCompRender('slide-from', <Covers covers={cover} />);
})


ReactCompRender('newsLetterForm', <SubscribeToNewsLetter />);
ReactCompRender('contact-us-form', <ContactUsForm />);
ReactCompRender('jobs', <Jobs />);
ReactCompRender('news', <News />);
ReactCompRender('view-article', <ArticleDetails />);
ReactCompRender('eoi', <Eois />);
ReactCompRender('agencies', <Agencies />);











