const tk = window.sessionStorage.getItem('token');
let editBandeau = document.getElementById("editBnd");
let editBtn = document.getElementById("openModal");

if (tk) {
  if (loginId.innerHTML === "login") {
    loginId.innerHTML = "logout";
  } else {
    loginId.innerHTML = "login";
  }
  editBtn.style.display = "flex";
  editBandeau.style.display = "flex";
} else {
  editBandeau.style.display = "none";
  editBtn.style.display = "none";
}

document.getElementById("loginId").addEventListener("click", function () {
  if (loginId.innerHTML === "logout") {
    sessionStorage.clear();
    loginId.innerHTML = "login";
  }
}
)

