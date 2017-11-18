const blurListener = (e) => {
  const field = e.target;
  let message = "";

  if (field.value == "") {
    message = "Verplicht veld";
  }

  field.parentNode.querySelector('.feedback').textContent = message;
  field.classList.add("error");
}

const focusListener = (e) => {
  const field = e.target;

  field.parentNode.querySelector('.feedback').textContent = "";
  field.classList.remove("error");
}

const init = () => {
  console.log("test");
  document.querySelectorAll(".form-field input").forEach(field => {
    console.log(field);
    field.addEventListener('blur', blurListener);
    field.addEventListener('focus', focusListener);
  });
};

init();
