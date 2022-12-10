// const systemBaseUrl = 'http://192.168.1.101:8000/brewery/api';
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
                <ImagesDisplayer images={currentEvent?.image?.map((e) => e.link)} />
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

    return images.length ? <div className='slide-show-slides' key={Math.random()}>
        <a className="prev" onClick={(event) => {
            event.stopPropagation();
            handleActions({ isNext: false });
        }}>&#10094;</a>
        <a className="next" onClick={(event) => {
            event.stopPropagation();
            handleActions({ isNext: true });
        }}>&#10095;</a>
        <img className="image-slide" src={images[currentImage]} alt="" />
    </div> : <p className="p-centered">Aucune image disponible</p>
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


function Products({ products = [] }) {
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
                    <img src={profile} alt="" />
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

    return coversOfficial.length ? <div class="slideshow-container" style={{
        backgroundImage: `url(${coversOfficial[0].link})`,
    }}>
        {coversOfficial.map((e) => {
            return <div class="mySlides fade">
                <img src={e.link} />
            </div>
        })}
    </div> : <></>
}

function ReactCompRender(id, component) {
    if (!id) return;
    const element = document.getElementById(id);
    if (element) {
        ReactDOM.createRoot(element).render(component);
    }
}

fetchData('blog/view').then((response) => {
    console.log('Theee', response);
    const { cover, group_image, member, product } = response;
    ReactCompRender('products', <Products products={product} />);
    ReactCompRender('staff', <Staff members={member} />);
    ReactCompRender('media', <Gallery events={group_image} />);
    ReactCompRender('slide-from', <Covers covers={cover} />);
})

ReactCompRender('newsLetterForm', <SubscribeToNewsLetter />);
ReactCompRender('contact-us-form', <ContactUsForm />);
ReactCompRender('eoi-form', <EoiForm />);
ReactCompRender('jobs', <Jobs />);
ReactCompRender('agencies', <Agencies />);











