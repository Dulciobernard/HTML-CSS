window.addEventListener("scroll",function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem',window.scrollY > 33)
})

/*Menu hambuguer*/

const hambuger = document.querySelector(".hamburger");

const nav = document.querySelector(".nav");

hambuger.addEventListener("click",() => nav.classList.toggle("active"));

const btnContato = document.getElementById('btn-contato');


const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function () {
  if (window.getComputedStyle(btnContato).display !== 'none') {
    btnContato.style.display = 'none';
  } else {
    btnContato.style.display = 'block';
  }
});

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formbutton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }
  displaySuccess() {
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.innerHTML = "Mensagem enviada!";
    this.form.innerHTML = ""; // Clear the form content
    this.form.appendChild(successDiv); // Append the success message
  }
  displayError() {
    this.form.innerHTML = this.settings.error;
  }
  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }
  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }
  }
  init() {
    if (this.form) this.formbutton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "Mensagem enviada!", // Custom success message
  error: " <h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();
