//urlApi
export const urlLocalApi = 'http://localhost:5678/';
export const urlLocalSite = 'http://localhost:5500/';
export const apiCateg = 'api/categories';
export const apiWorks = 'api/works/';
export const apiUsers = 'api/users/login';

//Connexion
export function postConnexion(email, password) {
    return fetch(urlLocalApi + apiUsers, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    });
}
//Appel Categ/Filtre
export function getCateg() {
    return fetch(urlLocalApi + apiCateg, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    }).then(response => response.json());
}
//Appel des images et ajout dans l'index
export function getImg() {
    return fetch(urlLocalApi + apiWorks, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
    }).then(response => response.json());
}

//Envoie d'img
export function postImg(tk, bd) {
    return fetch(urlLocalApi + apiWorks, {
        method: 'POST',
        headers: {
            "Authorization": 'Basic ' + tk,
        },
        body: bd,
    }).then(response => response.json());
}

export function deleteImg(tk, id) {
    return fetch(urlLocalApi + apiWorks + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Basic ' + tk,
        },
    });
}
