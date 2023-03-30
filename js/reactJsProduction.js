"use strict";

// const systemBaseUrl = 'http://192.168.43.114:8000/brewery/api';
const systemBaseUrl = 'https://brewery.madosgroup.com/brewery/api';
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
  }, /*#__PURE__*/React.createElement(GalleryImagesDisplayer, {
    images: currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.image
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
function GalleryImagesDisplayer({
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
    src: images[currentImage].link,
    alt: images[currentImage].description
  }), /*#__PURE__*/React.createElement("div", {
    className: "single-image-description"
  }, /*#__PURE__*/React.createElement("p", null, images[currentImage].description), /*#__PURE__*/React.createElement("div", {
    className: "social-media"
  }, /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    href: images[currentImage].facebook
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-brands fa-facebook"
  })), /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    href: images[currentImage].twitter
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-brands fa-twitter"
  })), /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    href: images[currentImage].instagram
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-brands fa-instagram"
  })), /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    href: images[currentImage].youtube
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-brands fa-youtube"
  }))))) : /*#__PURE__*/React.createElement("p", {
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
function EoiForm({
  id = '',
  onClose = () => {}
}) {
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
    formData.set('EOI', id);
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
    className: "contact-form eoi-form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-row application-form-header"
  }, /*#__PURE__*/React.createElement("h1", null), /*#__PURE__*/React.createElement("i", {
    className: "fa fa-xmark action-icon",
    onClick: event => {
      event.stopPropagation();
      onClose();
    }
  })), /*#__PURE__*/React.createElement("div", {
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
  console.log(typeof window.location.hash);
  const hash = window.location.hash;
  const [index, setIndex] = React.useState(Number(hash.replaceAll("#", "")));
  const currentProduct = products[index];
  React.useEffect(() => {
    window.addEventListener("hashchange", function set() {
      const hashF = window.location.hash;
      setIndex(Number(hashF.replaceAll("#", "")));
    }, false);
    return () => {
      window.removeEventListener('hashchange', () => {}, false);
    };
  }, []);
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
function ProductsList({
  products = []
}) {
  var _localStorage$getItem;
  function handleCloseSideMenu() {
    document.querySelector('.side-menu').style.transform = "scaleX(0)";
  }
  const homePath = (_localStorage$getItem = localStorage.getItem('home')) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : '/';
  return /*#__PURE__*/React.createElement("div", {
    className: "contextual-arrow"
  }, /*#__PURE__*/React.createElement("a", null, "Nos produits", /*#__PURE__*/React.createElement("i", {
    className: "fa fa-caret-down"
  })), /*#__PURE__*/React.createElement("div", {
    className: "contextual-menu"
  }, products.map((e, i) => {
    return /*#__PURE__*/React.createElement("a", {
      key: e.name,
      href: `${homePath}products/#${i}`,
      onClick: handleCloseSideMenu
    }, e.name);
  })));
}
function ProductsListFooter({
  products = []
}) {
  var _localStorage$getItem2;
  function handleCloseSideMenu() {
    document.querySelector('.side-menu').style.transform = "scaleX(0)";
  }
  const homePath = (_localStorage$getItem2 = localStorage.getItem('home')) !== null && _localStorage$getItem2 !== void 0 ? _localStorage$getItem2 : '/';
  return /*#__PURE__*/React.createElement("div", {
    className: "foo-block"
  }, products.map((e, i) => {
    return /*#__PURE__*/React.createElement("a", {
      key: e.name,
      href: `${homePath}products/#${i}`
    }, e.name);
  }));
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
function ApplicationEoiForm({
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
  }, /*#__PURE__*/React.createElement("section", {
    className: "duo eoi-form-parent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "duo-left contact-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contact-info-box"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "large-title"
  }, "Postuler"), /*#__PURE__*/React.createElement("p", null, "L'appel \xE0 manifestation d'int\xE9r\xEAt est un mode de pr\xE9s\xE9lection des candidats qui seront invit\xE9s \xE0 soumissionner lors de futures proc\xE9dures de passation de march\xE9s publics (appels d'offres restreints ou proc\xE9dure concurrentielle avec n\xE9gociation).", /*#__PURE__*/React.createElement("br", null), "Remplissez le formulaire et notre \xE9quipe vous r\xE9pondra dans les 24 heures."), /*#__PURE__*/React.createElement("p", null, "Tous les champs sont obligatoires. L'e-mail sera utilis\xE9 pour vous contacter, Le document que vous t\xE9l\xE9chargez doit contenir :")), /*#__PURE__*/React.createElement("div", {
    className: "contact-info-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "single-contact flex-row column-gap-middle"
  }, /*#__PURE__*/React.createElement("p", null, "1. Informations sur le fournisseur (Raison sociale, adresse physique, t\xE9l\xE9phone, e-mail, NIF, RC, capacit\xE9 financi\xE8re, statut juridique , structure organisationnelle)")), /*#__PURE__*/React.createElement("div", {
    className: "single-contact flex-row column-gap-middle"
  }, /*#__PURE__*/React.createElement("p", null, "2. Exp\xE9rience (CV, certificat de service, autres pi\xE8ces jointes)")), /*#__PURE__*/React.createElement("div", {
    className: "single-contact flex-row column-gap-middle"
  }, /*#__PURE__*/React.createElement("p", null, "3. Offre technique (D\xE9crivez ce que vous proposez)")))), /*#__PURE__*/React.createElement(EoiForm, {
    id: job.id,
    onClose: onClose
  })));
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
      fetchData('job/findmany/eoi_offer').then(response => {
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
  }, wannaApply && jobs.length ? /*#__PURE__*/React.createElement(ApplicationEoiForm, {
    job: currentJob,
    onClose: () => {
      setWannaApply(false);
      setCurrentJob({});
    }
  }) : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement("h1", {
    className: "large-title"
  }, "March\xE9s publics"), jobs.length ? /*#__PURE__*/React.createElement("div", {
    className: "jobs"
  }, jobs.map(e => {
    console.log(e);
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
    }, "ici"), "."));
  })) : isAsync === true ? /*#__PURE__*/React.createElement("p", null, "Veuillez patienter ...") : /*#__PURE__*/React.createElement("p", null, "Aucun march\xE9 public disponible"));
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
      alt: name
    }), /*#__PURE__*/React.createElement("div", {
      className: "single-member-info"
    }, /*#__PURE__*/React.createElement("p", {
      className: "p-medium bold"
    }, name), /*#__PURE__*/React.createElement("p", {
      className: "p-medium"
    }, post)));
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null);
}
function Covers({
  covers = []
}) {
  const coversOfficial = covers !== null && covers !== void 0 && covers.length ? covers : ["https://brewerystorage.s3.af-south-1.amazonaws.com/bdi_burundi_brewery_02_2020_akezanet.jpeg", "https://brewerystorage.s3.af-south-1.amazonaws.com/DSC_0461.jpg", "https://brewerystorage.s3.af-south-1.amazonaws.com/Ngozieco1.jpg.png", "https://brewerystorage.s3.af-south-1.amazonaws.com/Bbrew2.JPG", "https://brewerystorage.s3.af-south-1.amazonaws.com/Cuves+Brew2.JPG"].map(e => {
    return {
      link: e
    };
  });
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
    if (coversOfficial.length) {
      showSlides();
    }
  }, []);
  return coversOfficial.length ? /*#__PURE__*/React.createElement("div", {
    className: "slideshow-container",
    style: {
      backgroundImage: `url(${coversOfficial[0].link})`
    }
  }, coversOfficial.map(e => {
    return /*#__PURE__*/React.createElement("div", {
      className: "mySlides fade"
    }, /*#__PURE__*/React.createElement("img", {
      src: e.link
    }));
  })) : /*#__PURE__*/React.createElement(React.Fragment, null);
}
function NewsCategoriesDisplayer({
  onChange = () => {}
}) {
  const [fetching, setFetching] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);
  const [isAsync, setAsync] = React.useState(false);
  const [currentJob, setCurrentJob] = React.useState(0);
  function fetchJobs() {
    if (!fetching) {
      setFetching(true);
      setAsync(true);
      fetchData('blog/findmany/blogcategory_namespace?limit=100').then(response => {
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
  return !isAsync ? /*#__PURE__*/React.createElement("div", {
    className: "categories_displayer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "categories_displayer_list_category"
  }, /*#__PURE__*/React.createElement("p", {
    className: "categories_displayer_category",
    id: currentJob === 0 ? 'categories_displayer_category_selected' : '',
    key: 0,
    value: 0,
    onClick: event => {
      event.stopPropagation();
      if (currentJob !== 0) {
        setCurrentJob(0);
        onChange(undefined);
      }
    }
  }, "A la une"), jobs.map(e => {
    return /*#__PURE__*/React.createElement("p", {
      className: "categories_displayer_category",
      id: currentJob === e.id ? 'categories_displayer_category_selected' : '',
      key: e.id,
      value: e.id,
      onClick: event => {
        event.stopPropagation();
        if (currentJob !== e.id) {
          setCurrentJob(e.id);
          onChange(e.id);
        }
      }
    }, String(e.name).toLocaleUpperCase());
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "ct_displayer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ct_displayer_category"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shimmer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "shimmer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "shimmer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "shimmer"
  })));
}
function News() {
  const [fetching, setFetching] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);
  const [isAsync, setAsync] = React.useState(false);
  const [wannaApply, setWannaApply] = React.useState(false);
  const [currentJob, setCurrentJob] = React.useState({});
  const [currentCategoryId, setCatId] = React.useState(undefined);
  function fetchJobs({
    id = undefined
  }) {
    const url = id !== undefined ? `findone/blogcategory_namespace/${Number(id)}?more=yes` : 'findmany/blog_namespace?page=0';
    console.log('testtt', url);
    if (!fetching) {
      setFetching(true);
      setAsync(true);
      fetchData(`blog/${url}`).then(response => {
        setFetching(false);
        setAsync(false);
        if (id !== undefined) {
          const {
            blog
          } = response;
          if (blog && blog !== null && blog !== void 0 && blog.length) {
            setJobs(blog);
          }
        } else {
          const {
            data
          } = response;
          if (data && data !== null && data !== void 0 && data.length) {
            setJobs(response.data);
          }
        }
        console.log(response);
      });
    }
  }
  React.useEffect(() => {
    fetchJobs({
      id: currentCategoryId
    });
  }, [currentCategoryId]);
  return /*#__PURE__*/React.createElement("div", {
    className: "job-displayer"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "large-title"
  }, "Actualit\xE9s"), /*#__PURE__*/React.createElement(NewsCategoriesDisplayer, {
    onChange: id => {
      setCatId(id);
    }
  }), jobs.length && !isAsync ? /*#__PURE__*/React.createElement("div", {
    className: "articles-displayer"
  }, jobs.map(article => {
    var _article$category;
    return /*#__PURE__*/React.createElement("a", {
      className: "article_card",
      href: `/article/#${article.id}`
    }, /*#__PURE__*/React.createElement("img", {
      className: "article_card_img",
      src: article.cover ? `${article.cover}` : 'https://archive.org/download/no-photo-available/no-photo-available.png',
      alt: ""
    }), /*#__PURE__*/React.createElement("div", {
      className: "article_card_info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "timarticle_card_info_time_view"
    }, /*#__PURE__*/React.createElement("p", null, new Date(article.createdAt).toLocaleString()), /*#__PURE__*/React.createElement("div", {
      className: "timarticle_card_info_time_view_eye"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-eye"
    }), /*#__PURE__*/React.createElement("h6", null, article.view))), /*#__PURE__*/React.createElement("p", {
      className: "article_card_info_topic"
    }, String(article === null || article === void 0 ? void 0 : (_article$category = article.category) === null || _article$category === void 0 ? void 0 : _article$category.name).toLocaleUpperCase()), /*#__PURE__*/React.createElement("h3", {
      className: ""
    }, article === null || article === void 0 ? void 0 : article.title)));
  })) : isAsync === true ? /*#__PURE__*/React.createElement("p", null, "Veuillez patienter ...") : /*#__PURE__*/React.createElement("p", null, "Aucun article  disponible"));
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
      fetchData(`blog/findone/blog_namespace/${Number(hashF.replaceAll("#", ""))}?more=true`).then(response => {
        setFetching(false);
        setAsync(false);
        const {
          no_object
        } = response;
        if (!no_object) {
          setArticle(response);
          fetchMore({
            id: response.category.id,
            articleId: response.id
          });
        }
        console.log(response);
      });
    }
  }
  function fetchMore({
    id = undefined,
    articleId = undefined
  }) {
    if (id === undefined) return;
    if (!fetching) {
      fetchData(`blog/findone/blogcategory_namespace/${Number(id)}?more=yes`).then(response => {
        const {
          blog
        } = response;
        if (blog && blog !== null && blog !== void 0 && blog.length) {
          setJobs(blog);
        }
        console.log(response);
      });
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
      window.removeEventListener('hashchange', () => {}, false);
    };
  }, []);
  const {
    id,
    title,
    view,
    createdAt,
    overView,
    cover,
    description,
    comment,
    category
  } = article;
  const isThereMore = jobs.filter(element => element.id !== id).length > 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "job-displayer"
  }, Object.keys(article).length ? /*#__PURE__*/React.createElement("div", {
    className: "article-details_diplayer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "article_details_part"
  }, /*#__PURE__*/React.createElement("div", {
    className: "article_details_part article_details_part_top"
  }, /*#__PURE__*/React.createElement("img", {
    src: cover ? `${cover}` : 'https://archive.org/download/no-photo-available/no-photo-available.png',
    alt: title !== null && title !== void 0 ? title : ''
  }), /*#__PURE__*/React.createElement("div", {
    className: "timarticle_card_info_time_view"
  }, /*#__PURE__*/React.createElement("p", null, createdAt ? new Date(createdAt).toLocaleString() : ''), /*#__PURE__*/React.createElement("div", {
    className: "timarticle_card_info_time_view_eye"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-eye"
  }), /*#__PURE__*/React.createElement("h6", null, view !== null && view !== void 0 ? view : 0))), /*#__PURE__*/React.createElement("p", {
    className: "article_card_info_topic"
  }, String(category === null || category === void 0 ? void 0 : category.name).toLocaleUpperCase()), /*#__PURE__*/React.createElement("h1", null, title !== null && title !== void 0 ? title : ''), /*#__PURE__*/React.createElement("p", {
    className: "art-overview"
  }, overView !== null && overView !== void 0 ? overView : ''), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: description !== null && description !== void 0 ? description : ''
    }
  })), /*#__PURE__*/React.createElement(ArticleDetailsComment, {
    comments: comment,
    articleId: id
  })), /*#__PURE__*/React.createElement("div", null, isThereMore ? /*#__PURE__*/React.createElement("h2", {
    className: "more_text"
  }, "Plus d'articles") : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement("div", {
    className: "red_separator"
  }), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "more-articles-displayer"
  }, isThereMore ? /*#__PURE__*/React.createElement(React.Fragment, null, jobs.filter(element => element.id !== id).map(article => {
    var _article$category2;
    return /*#__PURE__*/React.createElement("a", {
      className: "article_card_two",
      href: `/article/#${article.id}`
    }, /*#__PURE__*/React.createElement("img", {
      className: "article_card_img_two",
      src: article.cover ? `${article.cover}` : 'https://archive.org/download/no-photo-available/no-photo-available.png',
      alt: article === null || article === void 0 ? void 0 : article.title
    }), /*#__PURE__*/React.createElement("div", {
      className: "article_card_info article_card_info_two"
    }, /*#__PURE__*/React.createElement("div", {
      className: "timarticle_card_info_time_view"
    }, /*#__PURE__*/React.createElement("p", null, new Date(article.createdAt).toLocaleString()), /*#__PURE__*/React.createElement("div", {
      className: "timarticle_card_info_time_view_eye"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-eye"
    }), /*#__PURE__*/React.createElement("h6", null, article.view))), /*#__PURE__*/React.createElement("p", {
      className: "article_card_info_topic"
    }, String(article === null || article === void 0 ? void 0 : (_article$category2 = article.category) === null || _article$category2 === void 0 ? void 0 : _article$category2.name).toLocaleUpperCase()), /*#__PURE__*/React.createElement("h3", {
      className: ""
    }, article === null || article === void 0 ? void 0 : article.title)));
  })) : /*#__PURE__*/React.createElement(React.Fragment, null)))) : isAsync === true ? /*#__PURE__*/React.createElement("p", null, "Veuillez patienter ...") : /*#__PURE__*/React.createElement("p", null, "Article introuvable"));
}
function ArticleDetailsComment({
  comments = [],
  articleId = undefined
}) {
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
      postData(`blog/comment_on_post/${Number(articleId !== null && articleId !== void 0 ? articleId : 0)}`, {
        Text: email
      }).then(response => {
        setLoading(false);
        if (response.id) {
          setComments([response, ...incomments]);
          setSuccess('Votre commentaire a été enregistré avec succès');
          formRef.current.reset();
        } else {
          console.log('Failure', response);
          setError("Une erreur s'est produite,vérifiez votre connexion Internet.");
        }
      });
    } else {
      setError('Tout les champs sont obligatoires.');
    }
  }
  React.useEffect(() => {
    setComments(comments);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
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
    type: "text",
    placeholder: "Entrez votre commentaire...",
    name: "Text"
  }), /*#__PURE__*/React.createElement("button", {
    className: "comments_articles_input_button",
    type: "submit"
  }, isLoading ? /*#__PURE__*/React.createElement("i", {
    className: "fa fa-spinner fa-spin"
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa fa-paper-plane"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), incomments.length ? /*#__PURE__*/React.createElement("div", {
    className: "comments_articles_comments_list"
  }, incomments.map(e => {
    return /*#__PURE__*/React.createElement("div", {
      key: e.id,
      className: "comments_articles_comment"
    }, /*#__PURE__*/React.createElement("div", {
      className: "comments_articles_comment_header"
    }, /*#__PURE__*/React.createElement("img", {
      src: `https://avatars.dicebear.com/api/personas/male/${Math.floor(Math.random() * 46542655127517)}.png`,
      alt: ""
    }), /*#__PURE__*/React.createElement("p", null, new Date(e.createdAt).toLocaleString())), /*#__PURE__*/React.createElement("p", {
      id: "comments_articles_comment_body"
    }, e.content));
  })) : /*#__PURE__*/React.createElement(React.Fragment, null));
}
function doThisForAll(key, whatToDo) {
  if (document.querySelector(key)) {
    document.querySelectorAll(key).forEach(element => {
      whatToDo(element);
    });
  }
}
function ReactCompRender(id, component) {
  if (!id) return;
  doThisForAll(`#${id}`, element => {
    ReactDOM.createRoot(element).render(component);
  });
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
  ReactCompRender('products-alizer', /*#__PURE__*/React.createElement(ProductsList, {
    products: product
  }));
  ReactCompRender('products-footer', /*#__PURE__*/React.createElement(ProductsListFooter, {
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
ReactCompRender('jobs', /*#__PURE__*/React.createElement(Jobs, null));
ReactCompRender('news', /*#__PURE__*/React.createElement(News, null));
ReactCompRender('view-article', /*#__PURE__*/React.createElement(ArticleDetails, null));
ReactCompRender('eoi', /*#__PURE__*/React.createElement(Eois, null));
ReactCompRender('agencies', /*#__PURE__*/React.createElement(Agencies, null));