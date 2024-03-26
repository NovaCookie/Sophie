import { postConnexion } from "./impoFetchApi.js";

//Connexion
document.getElementById("connexion").addEventListener("click", login);
function login(e) {
  e.preventDefault();
  let em = document.getElementById("email").value;
  let pwd = document.getElementById("password").value;
  if (isCompleted(em, pwd)) {
    postConnexion(em, pwd).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      else {
        response.json().then(data => {
          sessionStorage.setItem("token", data.token);
          window.location.href = "index.html";
        });
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
  if (mail.length == 0 || pass.length == 0) {
    errMessages("Veuillez compléter tous les champs");
    return false;
  } else {
    return true;
  }
}

function errMessages(mess) {
  const err = document.getElementById("errMsgLogin");
  err.textContent = mess;
}
