//Appel des images et ajout dans l'index
fetch('http://localhost:5678/api/works', {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
  },
}).then(r => r.json().then(data =>
  data.map(image => {
    addElement(image.imageUrl, image.title);
  })
)
)
//Création dynamique de balise et insère les images dedans
function addElement(url, name) {

  const gallery_id = document.getElementById("gallery_id")
  const figure = document.createElement("figure")
  var img = document.createElement("img");
  img.src = url;
  const figcaption = document.createElement("figcaption");

  gallery_id.insertAdjacentElement("beforeend", figure);
  figure.insertBefore(img, null);
  img.insertAdjacentElement("afterend", figcaption);
  figcaption.insertAdjacentText("afterbegin", name)

}



