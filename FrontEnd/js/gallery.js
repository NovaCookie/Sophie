import { getImg, getCateg } from "./impoFetchApi.js";
const filtre_id = document.getElementById("filtre_id");
const gallery_id = document.getElementById("gallery_id");
const tk = window.sessionStorage.getItem('token');
filtres();
async function filtres() {
  createBtnFiltre("Tous", 0);
  await getCateg()
    .then(data => {
      data.map(categ => createBtnFiltre(categ.name, categ.id))
    });
}
function createBtnFiltre(name, id) {
  if (!tk) {
    const btn = document.createElement("button");
    filtre_id.insertAdjacentElement("beforeend", btn);
    btn.insertAdjacentText("afterbegin", name);
    if (id == 0) {
      selectBtnFiltre(btn);
    }
    btn.addEventListener("click", () => {
      selectBtnFiltre(btn);
      lesFiltres(id);
    })
  } else {
    filtre_id.style.margin = "2%";
  }
}
function selectBtnFiltre(btn) {
  const tableauChild = filtre_id.childNodes;
  tableauChild.forEach(btn => {
    if (btn.classList == "isSelected") {
      btn.classList.remove('isSelected');
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
    });
}

//Appelle des images et conserve uniquement les images avec la gateg demandé puis pour chaque images appelle addElement
async function lesFiltres(id) {
  delElement();
  await getImg()
    .then(imgList => {
      if (id == 0) {
        return imgList.map(image => addElement(image.imageUrl, image.title, image.id))
      } else {
        return imgList.filter(image => image.category.id == id).map(image => addElement(image.imageUrl, image.title, image.id))
      }
    });
}


//Création dynamique de balise et insère les images dedans
export function addElement(url, name, id) {


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
  while (gallery_id.firstChild) {
    gallery_id.removeChild(gallery_id.firstChild);
  }
}


