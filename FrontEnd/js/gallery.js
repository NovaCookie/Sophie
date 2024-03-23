import { getImg, getCateg } from "./impoFetch.js";
const parent = document.getElementById("filtre_id")
filtres();
async function filtres() {
  createBtn("Tous", 0);
  await getCateg()
    .then(data => {
      data.map(categ => createBtn(categ.name, categ.id))
    })
}
function createBtn(name, id) {
  const btn = document.createElement("button");
  parent.insertAdjacentElement("beforeend", btn)
  btn.insertAdjacentText("afterbegin", name);
  if(id == 0){
    selectBtn(btn)
  }
  btn.addEventListener("click", () => {
    selectBtn(btn);
    lesFiltres(id);
  })
}

function selectBtn(btn) {

  const tableauChild = parent.childNodes;
  // console.log(tableauChild)
  tableauChild.forEach(btn => {
    if (btn.classList == "isSelected") {
      btn.classList.remove('isSelected')
    }
  })
  btn.classList.add('isSelected');
}
//Appel des images et ajout dans l'index
gallery()
export async function gallery() {
  delElement()
  await getImg()
    .then(data => {
      data.map(image =>
        addElement(image.imageUrl, image.title, image.id)
      )
    })
}

//Appelle des images et conserve uniquement les images avec la gateg demandé puis pour chaque images appelle addElement
async function lesFiltres(id) {
  // console.log(id)
  delElement();
  fetch('http://localhost:5678/api/works')
    .then(dataFetch => dataFetch.json())
    .then(imgList => {
      if (id == 0) {
        return imgList.map(image => addElement(image.imageUrl, image.title, image.id))
      } else {
        return imgList.filter(image => image.category.id == id).map(image => addElement(image.imageUrl, image.title, image.id))
      }
    })
}


//Création dynamique de balise et insère les images dedans
export function addElement(url, name, id) {

  const gallery_id = document.getElementById("gallery_id");
  const figure = document.createElement("figure"); 
  figure.id = `gallery_${id}`;
  let img = document.createElement("img");
  img.src = url;
  const figcaption = document.createElement("figcaption");
 

  gallery_id.insertAdjacentElement("beforeend", figure);
  figure.insertBefore(img, null);
  img.insertAdjacentElement("afterend", figcaption);
  figcaption.insertAdjacentText("afterbegin", name);
}


//Suppression de toutes les enfants de la balise contenant toutes les images
function delElement() {

  let parent = document.getElementById('gallery_id');
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}


