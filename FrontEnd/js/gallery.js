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
//Appelle des images et conserve uniquement les images avec la gateg demandé puis pour chaque images appelle addElement
async function lesFiltres(filtre) {
delElement();
  await fetch('http://localhost:5678/api/works')
    .then(dataFetch => dataFetch.json()
      .then(dataList => dataList.filter(image => image.category.name == filtre).map(image => addElement(image.imageUrl, image.title))
      ))
}

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

//Suppression de toutes les enfants de la balise contenant toutes les images
function delElement() {

  var parent = document.getElementById('gallery_id');
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}


