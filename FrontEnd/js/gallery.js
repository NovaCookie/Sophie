import { getImg } from "./impoFetch.js";

const btn0 = document.getElementById("0");
const btn1 = document.getElementById("1");
const btn2 = document.getElementById("2");
const btn3 = document.getElementById("3");

btn0.addEventListener("click", () => lesFiltres("", btn0));
btn1.addEventListener("click", () => lesFiltres("Objets", btn1));
btn2.addEventListener("click", () => lesFiltres("Appartements", btn2));
btn3.addEventListener("click", () => lesFiltres("Hotels & restaurants", btn3));

//Appel des images et ajout dans l'index
gallery()
export async function gallery() {
  delElement()
  await getImg()
    .then(data => {
      data.map(image => {
        addElement(image.imageUrl, image.title);
      })
    })
}

//Appelle des images et conserve uniquement les images avec la gateg demandé puis pour chaque images appelle addElement
async function lesFiltres(filtre, btn) {
  if (btn.classList != "isSelected") {
    const idAll = [btn0, btn1, btn2, btn3];
    idAll.forEach((e) => {
      e.classList.remove('isSelected')
    });
    delElement();
    btn.classList.add('isSelected');
    fetch('http://localhost:5678/api/works')
      .then(dataFetch => dataFetch.json())
      .then(dataList => (filtre == "" ? dataList : dataList
        .filter(image => image.category.name == filtre))
        .map(image => addElement(image.imageUrl, image.title))
      )
  }
}

//Création dynamique de balise et insère les images dedans
function addElement(url, name) {

  const gallery_id = document.getElementById("gallery_id")
  const figure = document.createElement("figure")
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


