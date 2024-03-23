//Connexion
const btnCo = document.getElementById("connexion");
btnCo.addEventListener("click", login);

function login(e) {
  e.preventDefault();
  let em = document.getElementById("email");
  let pwd = document.getElementById("password");
  if (isCompleted(em, pwd)) {
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      // mode: 'no-cors',*
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: em.value,
        password: pwd.value,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        else {
          response.json().then(data => {
            sessionStorage.setItem("token", data.token);
            window.location.href = "index.html"
          })
        }
      })
      .catch(e => {
        if (e.message == 401) {
          errMessages("Erreur dans l’identifiant ou le mot de passe");
        }
      });
  }
};

function isCompleted(mail, pass) {
  if (mail.value.length == 0 || pass.value.length == 0) {
    errMessages("Veuillez compléter tous les champs");
    return false;
  } else {
    return true;
  }
}

function errMessages(mess) {
  const err = document.getElementById("msg-err")
  err.textContent = mess;
}
