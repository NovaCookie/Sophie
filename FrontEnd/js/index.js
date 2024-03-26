const jeton_login = window.sessionStorage.getItem('token');
if (jeton_login) {
  if (loginId.innerHTML === "login") {
    loginId.innerHTML = "logout";
  } else {
    loginId.innerHTML = "login";
  }

}
document.getElementById("loginId").addEventListener("click", loginout)
function loginout() {
  if (loginId.innerHTML === "logout") {
    sessionStorage.clear();
    loginId.innerHTML = "login";
  }
}
