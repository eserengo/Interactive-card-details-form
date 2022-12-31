(function () {
  const nameRegEx = /^([a-zA-Z\-\'\s])+([a-zA-Z\-\'\s]+)+$/;
  const cardNumberRegEx = /^[0-9 ]{19}$/;
  const dateRegEx = /^[0-9]{2}$/;
  const cardCvcRegEx = /^[0-9]{3}$/;
  const name = document.getElementById("name");
  const number = document.getElementById("number");
  const mdate = document.getElementById("mdate");
  const ydate = document.getElementById("ydate");
  const cvc = document.getElementById("cvc");
  const numberDisplay = document.getElementById("number-display");
  const nameDisplay = document.getElementById("name-display");
  const mDateDisplay = document.getElementById("mdate-display");
  const yDateDisplay = document.getElementById("ydate-display");
  const cvcDisplay = document.getElementById("cvc-display");

  number.addEventListener("change", validateInput.bind(number, cardNumberRegEx, numberDisplay));
  name.addEventListener("change", validateInput.bind(name, nameRegEx, nameDisplay));
  mdate.addEventListener("change", validateInput.bind(mdate, dateRegEx, mDateDisplay));
  ydate.addEventListener("change", validateInput.bind(ydate, dateRegEx, yDateDisplay));
  cvc.addEventListener("change", validateInput.bind(cvc, cardCvcRegEx, cvcDisplay));
  document.getElementById("confirm-btn").addEventListener("click", event => {
    document.querySelectorAll(".input").forEach((input) => {
      if (document.querySelector(".form").querySelector(".error") !== null) event.preventDefault();
      if (input.value === "") event.preventDefault();
      return false;
    })
    if (!event.defaultPrevented) {
      document.querySelector(".form").classList.add("inactive");
      document.querySelector(".complete").classList.remove("inactive");
      return true;
    }
  })
  document.getElementById("continue-btn").addEventListener("click", event => {
    document.querySelector(".form").classList.remove("inactive");
    document.querySelector(".complete").classList.add("inactive");
  })

  function validateInput(regEx, display) {
    this.parentElement.querySelectorAll(".message").forEach(item => { item.remove() });
    this.parentElement.parentElement.querySelectorAll(".message").forEach(item => { item.remove() });
    if (this.value === "") {
      this.parentElement.insertAdjacentHTML("beforeend", `<div class="message error invalid"><i class="fa fa-exclamation-circle error"></i> ${this.name} cannot be empty</div>`);
      this.classList.contains("valid") ? (this.classList.remove("valid"), this.classList.add("invalid")) : this.classList.add("invalid");
    } else if (!this.value.match(regEx)) {
      this.parentElement.insertAdjacentHTML("beforeend", `<div class="message error invalid"><i class="fa fa-exclamation-circle error"></i> ${this.name} wrong format</div>`);
      this.classList.contains("valid") ? (this.classList.remove("valid"), this.classList.add("invalid")) : this.classList.add("invalid");
    } else {
      this.parentElement.insertAdjacentHTML("beforeend", `<div class="message success valid"><i class="fa fa-check-circle success"></i> Correct!</div>`);
      this.classList.contains("invalid") ? (this.classList.remove("invalid"), this.classList.add("valid")) : this.classList.add("valid");
    }
    display.textContent = this.value;
  }
})();