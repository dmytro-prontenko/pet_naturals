import IMask from "imask";
const phone = document.querySelector(".hero_form-phone");

const mask = new IMask(phone, {
  mask: "+{38}(000)000-00-00",
});