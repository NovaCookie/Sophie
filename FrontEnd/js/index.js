const jeton_login = window.sessionStorage.getItem('token');
let loginId = document.getElementById("loginId");
console.log("ici",jeton_login)
if (jeton_login) {
  console.log(loginId.innerHTML);
  if (loginId.innerHTML === "login") {
    loginId.innerHTML = "logout";
  } else {
    loginId.innerHTML = "login";
  }

}
loginId.addEventListener("click", loginout)
function loginout() {
  if (loginId.innerHTML === "logout") {
    sessionStorage.clear();
    loginId.innerHTML = "login";
  }
}
