let editBandeau = document.getElementById("editBnd");
let editBtn = document.getElementById("openModal");

const jeton_edition = window.sessionStorage.getItem('token');
if (jeton_edition) {
  editBtn.style.display = "flex";
  editBandeau.style.display = "flex";
} else {
  editBandeau.style.display = "none";
  editBtn.style.display = "none";
}
