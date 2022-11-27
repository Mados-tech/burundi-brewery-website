const systemBaseUrl = 'http://192.168.1.102:8000/brewery/api';
async function postData(url = '', data = {}) {
  return await fetch(`${systemBaseUrl}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json()).catch(e => {
    console.log(e);
    return {};
  });
}
async function fetchData(url = '') {
  return await fetch(`${systemBaseUrl}/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).catch(e => {
    console.log(e);
    return {};
  });
}
async function postDataWithFiles({
  url = '',
  data = new FormData()
}) {
  return await fetch(`${systemBaseUrl}/${url}`, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
    },
    body: data
  }).then(response => response.json()).catch(e => {
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
      postData('blog/subscribe-newsletter', {
        Email: email
      }).then(response => {
        setLoading(false);
        if (response.id && response.email) {
          setSuccess('Votre e-mail a été enregistré avec succès');
          formRef.current.reset();
        } else {
          console.log('Failure', response);
          setError("Une erreur s'est produite, soit l'e-mail existe déjà dans notre liste de diffusion, soit vérifiez votre connexion Internet.");
        }
      });
    } else {
      setError('Tout les champs sont obligatoires.');
    }
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "Abonnez-vous \xE0 notre newsletter"), /*#__PURE__*/React.createElement("div", {
    className: "flex-row column-gap-middle text-close"
  }, errorMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "p-error"
  }, errorMessage) : /*#__PURE__*/React.createElement(React.Fragment, null), successMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "p-success"
  }, successMessage) : /*#__PURE__*/React.createElement(React.Fragment, null), errorMessage.length || successMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "close",
    onClick: event => {
      event.stopPropagation();
      setSuccess('');
      setError('');
    }
  }, "Fermer") : /*#__PURE__*/React.createElement(React.Fragment, null)), /*#__PURE__*/React.createElement("form", {
    ref: formRef,
    className: "form-row-s-button",
    onChange: event => {
      event.stopPropagation();
      setEmail(event.target.value);
    },
    onSubmit: event => {
      event.preventDefault();
      sendMail();
    }
  }, /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "email",
    placeholder: "Votre adresse e-mail",
    name: "Email"
  }), /*#__PURE__*/React.createElement("button", {
    className: "comments_articles_input_button",
    type: "submit"
  }, isLoading ? /*#__PURE__*/React.createElement("i", {
    className: "fa fa-spinner fa-spin"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa fa-paper-plane"
  }))));
}
function Gallery() {
  const [index, setIndex] = React.useState(0);
  const [playing, setPlay] = React.useState(false);
  var interval = null;
  const dummy2 = ["https://www.burundi-forum.org/wp-content/uploads/2020/07/bdi_burundi_brewery_01_2020_akezanet.jpeg", "https://akeza.net/wp-content/uploads/2020/07/Ngozieco1.jpg.png", "https://en.investburundi.bi/images/helix/gallerie/DSC_0461.jpg", "https://burundi-agnews.org/wp-content/uploads/2012/12/BurundiBrewery.jpg", "https://www.burundibrewery.com/wp-content/uploads/elementor/thumbs/N-p8gmzyq8wkwah55qamqc8xd8u4o6tshtk14vg8crug.jpg"];
  function handleActions({
    isNext = true
  }) {
    if (isNext && index < dummy2.length - 1) {
      setIndex(index + 1);
    }
    if (!isNext && index > 0) {
      setIndex(index - 1);
    }
  }
  function automaticDisplay({
    isPlay = true
  }) {
    if (isPlay) {
      interval = setInterval(() => {
        if (index < dummy2.length - 1) {
          setIndex(index + 1);
        } else {
          setIndex(0);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "duo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "duo-left duo-yellow"
  }, /*#__PURE__*/React.createElement("p", {
    className: "rounded-card-p"
  }, "Media"), /*#__PURE__*/React.createElement("h1", {
    className: "large-title"
  }, "Notre galerie"), /*#__PURE__*/React.createElement("p", {
    className: "p-medium"
  }, "Burundi Brewery est la premi\xE8re brasserie cr\xE9\xE9e par des Burundais depuis que le Burundi existe. L\u2019entreprise Burundi Brewery produit de l\u2019eau min\xE9rale des boissons \xE0 base de banane et des jus de fruits.")), /*#__PURE__*/React.createElement("div", {
    className: "duo-right gallery-holder"
  }, /*#__PURE__*/React.createElement("div", {
    className: "galley"
  }, /*#__PURE__*/React.createElement("img", {
    key: Math.random(),
    src: dummy2[index],
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "gallery-actions"
  }, index > 0 ? /*#__PURE__*/React.createElement("i", {
    className: "fa fa-arrow-left",
    onClick: event => {
      event.stopPropagation();
      handleActions({
        isNext: false
      });
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null), index < dummy2.length - 1 ? /*#__PURE__*/React.createElement("i", {
    className: "fa fa-arrow-right",
    onClick: event => {
      event.stopPropagation();
      handleActions({
        isNext: true
      });
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null)))));
}
function ContactUsForm() {
  const [form, setForm] = React.useState({});
  const [isAsync, setAsync] = React.useState(false);
  const [errorMessage, setError] = React.useState('');
  const [successMessage, setSuccess] = React.useState('');
  const formRef = React.useRef();
  const handleChange = event => {
    const {
      name,
      value
    } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };
  const handleSubmit = event => {
    var _form$Email, _form$Name, _form$Message;
    event.preventDefault();
    setSuccess('');
    setError('');
    console.log(form);
    if (form !== null && form !== void 0 && (_form$Email = form.Email) !== null && _form$Email !== void 0 && _form$Email.length && form !== null && form !== void 0 && (_form$Name = form.Name) !== null && _form$Name !== void 0 && _form$Name.length && form !== null && form !== void 0 && (_form$Message = form.Message) !== null && _form$Message !== void 0 && _form$Message.length) {
      setAsync(true);
      postData('blog/contactus', form).then(response => {
        setAsync(false);
        if (response.task) {
          setSuccess('Votre message a été envoyé avec succès');
          formRef.current.reset();
          setForm({});
        } else {
          console.log('Failure', response);
          setError("Une erreur s'est produite, vérifiez votre connexion Internet, puis réessayez.");
        }
      });
    } else {
      setError('Tout les champs sont obligatoires.');
    }
  };
  return /*#__PURE__*/React.createElement("form", {
    ref: formRef,
    className: "contact-form",
    onChange: handleChange,
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-labeled"
  }, /*#__PURE__*/React.createElement("label", null, "Votre nom"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Noms",
    name: "Name",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-labeled"
  }, /*#__PURE__*/React.createElement("label", null, "Adresse e-mail"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Adresse e-mail",
    name: "Email",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-labeled"
  }, /*#__PURE__*/React.createElement("label", null, "Message"), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Message",
    name: "Message",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-row column-gap-middle text-close"
  }, errorMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "p-error"
  }, errorMessage) : /*#__PURE__*/React.createElement(React.Fragment, null), successMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "p-success"
  }, successMessage) : /*#__PURE__*/React.createElement(React.Fragment, null), errorMessage.length || successMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "close",
    onClick: event => {
      event.stopPropagation();
      setSuccess('');
      setError('');
    }
  }, "Fermer") : /*#__PURE__*/React.createElement(React.Fragment, null)), /*#__PURE__*/React.createElement("button", {
    className: `${isAsync ? 'loading-button' : ''}`,
    type: "submit"
  }, isAsync ? "S'il vous plaît, attendez..." : 'Envoyer le message'));
}
function EoiForm() {
  const [isAsync, setAsync] = React.useState(false);
  const [errorMessage, setError] = React.useState('');
  const [successMessage, setSuccess] = React.useState('');
  const [formData, setForm] = React.useState(new FormData());
  const formRef = React.useRef();
  const handleSubmit = event => {
    event.preventDefault();
    setSuccess('');
    setError('');
    console.log(formData.entries);
    setAsync(true);
    postDataWithFiles({
      url: 'job/eointerest',
      data: formData
    }).then(response => {
      setAsync(false);
      if (response.saved) {
        setSuccess('Votre candidature a été envoyé avec succès');
        formRef.current.reset();
        setForm(new FormData());
      } else {
        console.log('Failure', response);
        setError("Une erreur s'est produite, vérifiez votre connexion Internet, puis réessayez.");
      }
    });
  };
  return /*#__PURE__*/React.createElement("form", {
    ref: formRef,
    className: "contact-form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-labeled"
  }, /*#__PURE__*/React.createElement("label", null, "Nom de l'entreprise"), /*#__PURE__*/React.createElement("input", {
    type: "name",
    placeholder: "Entreprise",
    name: "Name",
    required: true,
    onChange: e => {
      e.stopPropagation();
      formData.set('Name', e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-labeled"
  }, /*#__PURE__*/React.createElement("label", null, "Adresse e-mail"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "Adresse e-mail",
    name: "Email",
    required: true,
    onChange: e => {
      e.stopPropagation();
      formData.set('Email', e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-labeled"
  }, /*#__PURE__*/React.createElement("label", null, "Document"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    placeholder: "Document",
    name: "Document",
    required: true,
    onChange: e => {
      e.stopPropagation();
      formData.set('Document', e.target.files[0]);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-row column-gap-middle text-close"
  }, errorMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "p-error"
  }, errorMessage) : /*#__PURE__*/React.createElement(React.Fragment, null), successMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "p-success"
  }, successMessage) : /*#__PURE__*/React.createElement(React.Fragment, null), errorMessage.length || successMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "close",
    onClick: event => {
      event.stopPropagation();
      setSuccess('');
      setError('');
    }
  }, "Fermer") : /*#__PURE__*/React.createElement(React.Fragment, null)), /*#__PURE__*/React.createElement("button", {
    className: `${isAsync ? 'loading-button' : ''}`,
    type: "submit"
  }, isAsync ? "S'il vous plaît, attendez..." : 'Envoyer'));
}
function Products() {
  const products = [{
    name: 'Soma Burundi',
    description: "Notre bière Soma Burundi a la spécificité de ne pas contenir de sucre ajouté et le taux d’alcool est de 6%. La matière première, à savoir la banane et l’eau sont disponibles sur place sauf le malt qui est importé. Burundi Brewery utilise deux sortes de bananes à savoir la banane FIA 17 et la banane FIA 25.",
    image: './assets/products/soma.png'
  }, {
    name: 'Sangwe Burundi',
    description: "Un autre ingrédient indispensable à la production de la bière Soma Burundi est l’eau. La brasserie Burundi Brewery en a trouvé dans la commune Mwumba à 4 km de la ville de Ngozi où est basée cette entreprise. Nous avons trouvé une bonne qualité d’eau thermique à cet endroit et nous avons décidé de produire de l’eau minérale baptisée Sangwe.",
    image: './assets/products/sangwe.png'
  }, {
    name: 'Jus Ok & One Burundi',
    description: "Le projet de production du jus d’ananas n’est pas abandonné pour autant. Neuf (9) cuves pouvant contenir 800 hectolitres ont été achetés pour appuyer les quatres (4) autres cuves de Septante (70) hectolitres existant. Nous projetons d’augmenter la production, de signer des contrats avec d’autres brasseries et de produire un jus d’ananas mais aussi un jus de banane.",
    image: './assets/products/ok.png'
  }];
  function handleActions({
    isNext = true
  }) {
    if (isNext && index < products.length - 1) {
      setIndex(index + 1);
    }
    if (!isNext && index > 0) {
      setIndex(index - 1);
    }
  }
  const [index, setIndex] = React.useState(0);
  const currentProduct = products[index];
  return /*#__PURE__*/React.createElement("div", {
    key: Math.random(),
    className: "products-displayer"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "large-title colored"
  }, "Nos produits"), /*#__PURE__*/React.createElement("div", {
    className: "products-displayer-details"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "headline1"
  }, currentProduct.name), /*#__PURE__*/React.createElement("img", {
    src: currentProduct.image
  }), /*#__PURE__*/React.createElement("p", {
    className: "p-medium"
  }, currentProduct.description)), /*#__PURE__*/React.createElement("div", {
    className: "products-displayer-actions"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-arrow-left",
    onClick: event => {
      event.stopPropagation();
      handleActions({
        isNext: false
      });
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "l-indicator"
  }, products.map((e, i) => {
    const selected = i == index;
    return /*#__PURE__*/React.createElement("span", {
      key: e.name,
      className: `${selected ? 'single-l-selected' : ''} single-l`,
      onClick: event => {
        event.stopPropagation();
        setIndex(i);
      }
    });
  })), /*#__PURE__*/React.createElement("i", {
    className: "fa fa-arrow-right",
    onClick: event => {
      event.stopPropagation();
      handleActions({
        isNext: true
      });
    }
  })));
}
function ApplicationForm({
  job = {},
  onClose = () => {}
}) {
  const [isAsync, setAsync] = React.useState(false);
  const [errorMessage, setError] = React.useState('');
  const [successMessage, setSuccess] = React.useState('');
  const [formData, setForm] = React.useState(new FormData());
  const formRef = React.useRef();
  const handleSubmit = event => {
    event.preventDefault();
    formData.set('Job_id', job.id);
    setSuccess('');
    setError('');
    console.log(formData.entries);
    setAsync(true);
    postDataWithFiles({
      url: 'job/write/application_namespace',
      data: formData
    }).then(response => {
      setAsync(false);
      if (response.id) {
        setSuccess('Votre candidature a été envoyé avec succès');
        formRef.current.reset();
        setForm(new FormData());
      } else {
        console.log('Failure', response);
        setError("Une erreur s'est produite, vérifiez votre connexion Internet, puis réessayez.");
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-curtain"
  }, /*#__PURE__*/React.createElement("form", {
    ref: formRef,
    className: "contact-form application-form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-row application-form-header"
  }, /*#__PURE__*/React.createElement("h1", null, "Formulaire de candidature pour ", job === null || job === void 0 ? void 0 : job.title), /*#__PURE__*/React.createElement("i", {
    className: "fa fa-xmark action-icon",
    onClick: event => {
      event.stopPropagation();
      onClose();
    }
  })), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    className: "input-labeled"
  }, /*#__PURE__*/React.createElement("label", null, "Votre nom complet"), /*#__PURE__*/React.createElement("input", {
    type: "name",
    placeholder: "Noms",
    name: "Name",
    required: true,
    onChange: e => {
      e.stopPropagation();
      formData.set('Name', e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-labeled"
  }, /*#__PURE__*/React.createElement("label", null, "Adresse e-mail"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "Adresse e-mail",
    name: "Email",
    required: true,
    onChange: e => {
      e.stopPropagation();
      formData.set('Email', e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-labeled"
  }, /*#__PURE__*/React.createElement("label", null, "Votre CV"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    placeholder: "Cv",
    name: "Cv",
    required: true,
    onChange: e => {
      e.stopPropagation();
      formData.set('Cv', e.target.files[0]);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-row column-gap-middle text-close"
  }, errorMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "p-error"
  }, errorMessage) : /*#__PURE__*/React.createElement(React.Fragment, null), successMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "p-success"
  }, successMessage) : /*#__PURE__*/React.createElement(React.Fragment, null), errorMessage.length || successMessage.length ? /*#__PURE__*/React.createElement("p", {
    className: "close",
    onClick: event => {
      event.stopPropagation();
      setSuccess('');
      setError('');
    }
  }, "Fermer") : /*#__PURE__*/React.createElement(React.Fragment, null)), /*#__PURE__*/React.createElement("button", {
    className: `${isAsync ? 'loading-button' : ''}`,
    type: "submit"
  }, isAsync ? "S'il vous plaît, attendez..." : 'Envoyer')));
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
      fetchData('job/findmany/offer_namespace').then(response => {
        setFetching(false);
        setAsync(false);
        const {
          data
        } = response;
        if (data && data !== null && data !== void 0 && data.length) {
          setJobs(response.data);
        }
        console.log(response);
      });
    }
  }
  React.useEffect(() => {
    fetchJobs();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "job-displayer"
  }, wannaApply && jobs.length ? /*#__PURE__*/React.createElement(ApplicationForm, {
    job: currentJob,
    onClose: () => {
      setWannaApply(false);
      setCurrentJob({});
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement("h1", {
    className: "large-title"
  }, "Offre d'emploi"), jobs.length ? /*#__PURE__*/React.createElement("div", {
    className: "jobs"
  }, jobs.map(e => {
    const {
      id,
      description,
      limit_day_to_submit,
      document,
      title
    } = e;
    return /*#__PURE__*/React.createElement("div", {
      className: "single-job",
      key: id
    }, /*#__PURE__*/React.createElement("div", {
      className: "job-header flex-row column-gap-middle"
    }, /*#__PURE__*/React.createElement("p", {
      className: "p-medium bold"
    }, title), /*#__PURE__*/React.createElement("button", {
      onClick: event => {
        event.stopPropagation();
        setCurrentJob(e);
        setWannaApply(true);
      }
    }, "Postuler")), /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: description
      }
    }), /*#__PURE__*/React.createElement("p", null, "Obtenez la description compl\xE8te de cette offre ", /*#__PURE__*/React.createElement("a", {
      href: document,
      target: "_blank",
      className: "bold"
    }, "ici"), "."), /*#__PURE__*/React.createElement("p", null, "Date limite ", new Date(limit_day_to_submit).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })));
  })) : isAsync === true ? /*#__PURE__*/React.createElement("p", null, "Veuillez patienter ...") : /*#__PURE__*/React.createElement("p", null, "Aucune offre d'emploi disponible"));
}
function ReactCompRender(id, component) {
  if (!id) return;
  const element = document.getElementById(id);
  if (element) {
    ReactDOM.createRoot(element).render(component);
  }
}
ReactCompRender('newsLetterForm', /*#__PURE__*/React.createElement(SubscribeToNewsLetter, null));
ReactCompRender('media', /*#__PURE__*/React.createElement(Gallery, null));
ReactCompRender('contact-us-form', /*#__PURE__*/React.createElement(ContactUsForm, null));
ReactCompRender('eoi-form', /*#__PURE__*/React.createElement(EoiForm, null));
ReactCompRender('products', /*#__PURE__*/React.createElement(Products, null));
ReactCompRender('jobs', /*#__PURE__*/React.createElement(Jobs, null));