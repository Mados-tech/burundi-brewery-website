"use strict";

// const systemBaseUrl = 'http://192.168.1.101:8000/brewery/api';
const systemBaseUrl = 'https://server.cluster.madosgroup.com/brewery/api';
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
function Gallery({
  events = []
}) {
  var _currentEvent$image;
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
  return events.length ? /*#__PURE__*/React.createElement("div", {
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
    id: "caroussel002_items_gallery",
    className: "caroussel002_items"
  }, /*#__PURE__*/React.createElement("div", {
    className: "caroussel002_items_icons caroussel002_items_icons_left",
    onClick: e => {
      e.stopPropagation();
      handleSlideGaller(true);
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-arrow-left"
  })), events.map((e, i) => {
    return /*#__PURE__*/React.createElement("p", {
      className: "categories_displayer_category",
      id: catIndex === i ? 'categories_displayer_category_selected' : '',
      key: e.id,
      value: e.id,
      onClick: event => {
        event.stopPropagation();
        setCatIndex(i);
      }
    }, e.title);
  }), /*#__PURE__*/React.createElement("div", {
    className: "caroussel002_items_icons caroussel002_items_icons_right",
    onClick: e => {
      e.stopPropagation();
      handleSlideGaller(false);
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-arrow-right"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gallery-image-space"
  }, /*#__PURE__*/React.createElement(ImagesDisplayer, {
    images: currentEvent === null || currentEvent === void 0 ? void 0 : (_currentEvent$image = currentEvent.image) === null || _currentEvent$image === void 0 ? void 0 : _currentEvent$image.map(e => e.link)
  })))) : /*#__PURE__*/React.createElement(React.Fragment, null);
}
function ImagesDisplayer({
  images = []
}) {
  console.log(images);
  const [currentImage, setCurrentImage] = React.useState(0);
  function handleActions({
    isNext = true
  }) {
    if (!isNext && currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
    if (isNext && currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  }
  return images.length ? /*#__PURE__*/React.createElement("div", {
    className: "slide-show-slides",
    key: Math.random()
  }, /*#__PURE__*/React.createElement("a", {
    className: "prev",
    onClick: event => {
      event.stopPropagation();
      handleActions({
        isNext: false
      });
    }
  }, "\u276E"), /*#__PURE__*/React.createElement("a", {
    className: "next",
    onClick: event => {
      event.stopPropagation();
      handleActions({
        isNext: true
      });
    }
  }, "\u276F"), /*#__PURE__*/React.createElement("img", {
    className: "image-slide",
    src: images[currentImage],
    alt: ""
  })) : /*#__PURE__*/React.createElement("p", {
    className: "p-centered"
  }, "Aucune image disponible");
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
function Products({
  products = []
}) {
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
  return products.length ? /*#__PURE__*/React.createElement("div", {
    key: Math.random(),
    className: "products-displayer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "products-displayer-details"
  }, /*#__PURE__*/React.createElement(ImagesDisplayer, {
    images: currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.images.map(e => e.link)
  }), /*#__PURE__*/React.createElement("div", {
    className: "row-gap-middle"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "headline1"
  }, currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.name), /*#__PURE__*/React.createElement("p", {
    className: "p-medium"
  }, currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.description))), /*#__PURE__*/React.createElement("div", {
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
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null);
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
      fetchData('blog/findmany/agence_namespace').then(response => {
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
  }, "Nos agences"), jobs.length ? /*#__PURE__*/React.createElement("div", {
    className: "jobs"
  }, jobs.map(e => {
    const {
      id,
      address,
      fax,
      phone,
      name
    } = e;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, name), /*#__PURE__*/React.createElement("p", null, address), /*#__PURE__*/React.createElement("p", null, "Tel: ", phone), /*#__PURE__*/React.createElement("p", null, "Fax: (+257) ", fax));
  })) : isAsync === true ? /*#__PURE__*/React.createElement("p", null, "Veuillez patienter ...") : /*#__PURE__*/React.createElement("p", null, "Aucune agence disponible"));
}
function Staff({
  members = []
}) {
  return members.length ? /*#__PURE__*/React.createElement("div", {
    className: "job-displayer staff-members-displayer"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "large-title"
  }, "Notre \xE9quipe"), /*#__PURE__*/React.createElement("div", {
    className: "staff-members"
  }, members.map(e => {
    const {
      id,
      name,
      phone,
      email,
      post,
      profile
    } = e;
    return /*#__PURE__*/React.createElement("div", {
      className: "single-member"
    }, /*#__PURE__*/React.createElement("img", {
      src: profile,
      alt: ""
    }), /*#__PURE__*/React.createElement("div", {
      className: "single-member-info"
    }, /*#__PURE__*/React.createElement("p", {
      className: "p-medium bold"
    }, name), /*#__PURE__*/React.createElement("p", {
      className: "p-medium"
    }, post), /*#__PURE__*/React.createElement("p", {
      className: "p-contact"
    }, email), /*#__PURE__*/React.createElement("p", {
      className: "p-contact"
    }, phone)));
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null);
}
function Covers({
  covers = []
}) {
  let slideIndex = 0;
  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image every 2 seconds
  }

  React.useEffect(() => {
    if (covers.length) {
      showSlides();
    }
  }, []);
  return covers.length ? /*#__PURE__*/React.createElement("div", {
    class: "slideshow-container",
    style: {
      backgroundImage: `url(${covers[0].link})`
    }
  }, covers.map(e => {
    return /*#__PURE__*/React.createElement("div", {
      class: "mySlides fade"
    }, /*#__PURE__*/React.createElement("img", {
      src: e.link
    }));
  })) : /*#__PURE__*/React.createElement(React.Fragment, null);
}
function ReactCompRender(id, component) {
  if (!id) return;
  const element = document.getElementById(id);
  if (element) {
    ReactDOM.createRoot(element).render(component);
  }
}
fetchData('blog/view').then(response => {
  console.log('Theee', response);
  const {
    cover,
    group_image,
    member,
    product
  } = response;
  ReactCompRender('products', /*#__PURE__*/React.createElement(Products, {
    products: product
  }));
  ReactCompRender('staff', /*#__PURE__*/React.createElement(Staff, {
    members: member
  }));
  ReactCompRender('media', /*#__PURE__*/React.createElement(Gallery, {
    events: group_image
  }));
  ReactCompRender('slide-from', /*#__PURE__*/React.createElement(Covers, {
    covers: cover
  }));
});
ReactCompRender('newsLetterForm', /*#__PURE__*/React.createElement(SubscribeToNewsLetter, null));
ReactCompRender('contact-us-form', /*#__PURE__*/React.createElement(ContactUsForm, null));
ReactCompRender('eoi-form', /*#__PURE__*/React.createElement(EoiForm, null));
ReactCompRender('jobs', /*#__PURE__*/React.createElement(Jobs, null));
ReactCompRender('agencies', /*#__PURE__*/React.createElement(Agencies, null));