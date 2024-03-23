//Appel Categ/Filtre
export async function getCateg() {

    return fetch('http://localhost:5678/api/categories', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }).then(r => r.json())
}
//Appel des images et ajout dans l'index
export async function getImg() {

    return fetch('http://localhost:5678/api/works', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    }).then(r => r.json())
}