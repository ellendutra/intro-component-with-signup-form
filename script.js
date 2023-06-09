const formFields = document.querySelectorAll("[required]");
const form = document.querySelector(".form");
const btn = document.querySelector(".form__button");

formFields.forEach((field) => {
  btn.addEventListener("click", () => fieldCheck(field));
  field.addEventListener("invalid", (event) => {
    event.preventDefault();
  })
});

const errorTypes = [
  "valueMissing", 
  "typeMismatch",
  "patternMismatch",
  "tooShort"
]; 

const messages = {
  firstName: {
      valueMissing: "First name cannot be empty",
      patternMismatch: "Please enter a valid first name",
      tooShort: "The first name field does not have enough characters"
  },
  lastName: {
      valueMissing: "Last name cannot be empty",
      patternMismatch: "Please enter a valid last name",
      tooShort: "The last name field does not have enough characters"
  },
  emailAddress: {
      valueMissing: "Email address cannot be empty",
      typeMismatch: "Looks like this is not an email",
      patternMismatch: "Please enter a valid email",
      tooShort: "The email field does not have enough characters"
  },
  password: {
      valueMissing: "Password cannot be empty",
      typeMismatch: "Please enter a valid password",
      tooShort: "The password field does not have enough characters"
  }
};

function fieldCheck(field){
  let message = "";
  field.setCustomValidity("");

  errorTypes.forEach((error) => {
    if(field.validity[error]){
      message = messages[field.name][error];
    }
  })

  formFields.forEach((field) => {
    const errorMessage = field.parentNode.querySelector(".form__error");
    const isValid = field.checkValidity();
    
    if (!isValid) {
      const fieldName = field.name;
      const errorType = errorTypes.find((error) => field.validity[error]);
      const message = messages[fieldName][errorType];

      field.style.borderColor = "#FF7A7A";
      field.style.color = "#FF7A7A";
      errorMessage.textContent = message;
      field.parentNode.querySelector(".form__img").style.display = "block";
    } else {
      field.style.borderColor = "";
      field.style.color = "";
      errorMessage.textContent = "";
      field.parentNode.querySelector(".form__img").style.display = "none";
    }
  });
}
