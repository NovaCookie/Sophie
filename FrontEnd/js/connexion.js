// localStorage.clear();
let loginout = document.querySelector(".Page-login");

//Connexion
const submit = document.getElementById("connexion");
submit.addEventListener("click", login);
async function login(e) {
  e.preventDefault();
  let em = document.getElementById("email").value
  let pwd = document.getElementById("password").value
  await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    // mode: 'no-cors',*
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: em,
      password: pwd,
    }),
  }).then(async data => {
    if (data.ok) {
      await data.json().then(response => {
        sessionStorage.setItem("token", response.token);
        window.location.href = "index.html"
      })
    }
  })
  errMessages();
 
};

const jeton_login = window.sessionStorage.getItem('token');
if (jeton_login) {
  if (loginout.textContent === "login") {
    loginout.textContent = "logout";
  } else {
    loginout.textContent = "login";
  }

}
loginout.addEventListener("click", function () {
  if (loginout.textContent === "logout") {
    sessionStorage.clear();
    loginout.textContent = "login";
  }
})

function errMessages() {
  const jet = window.sessionStorage.getItem("token")
  let err = document.getElementById("msg-err")
  if (jet) {
    console.log(jet)
    err.style.display = "none"
    err.textContent = ""
  } else {
    let id = document.getElementById("email").textContent.length
    let pass = document.getElementById("password").textContent.length
    if (id == 0 || pass == 0) {
      err.style.display = "block"
      err.textContent = "Erreur dans l’identifiant ou le mot de passe"
    }
  }
}
