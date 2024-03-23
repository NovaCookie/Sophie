import { addElement } from "./gallery.js";
import { getImg } from "./impoFetch.js";

const modal = document.getElementById("myModal_del");
const openModal = document.getElementById("openModal");
const modal2 = document.getElementById("myModal_add");
const btnAdd = document.getElementById("btnAdd");
const retour = document.getElementById("arrow_left")
const fermer1 = document.getElementById("closeOne");
const fermer2 = document.getElementById("closeTwo");
const modal_gallery = document.getElementById("modal-gallery");
const titre = document.getElementById("Titre");
const categ = document.getElementById("Catégorie");
const fileTransfert = document.getElementById("FileTransfert");
const labelFile = document.getElementById("labelFile");
const image = document.getElementById("previewImage");
const btnAddImg = document.getElementById("modal-add-input");
const mess = document.getElementById("msg-err-modal")
const url = "http://localhost:5678/";

//Appel des images et ajout dans l'index
galleryModal()
async function galleryModal() {
    await getImg()
        .then(data => {
            data.map(image => {
                addElementmodal(image.imageUrl, image.id);
            })
        })
}
//Création dynamique de balise et insère les images dedans
function addElementmodal(url, id) {

    const figureModal = document.createElement("figure");
    const divModal = document.createElement("div");
    const spanModal = document.createElement("span");
    const iModal = document.createElement("i");
    iModal.className = "fa-solid fa-trash-can";
    figureModal.id = `modal_${id}`;
    iModal.addEventListener("click", () => delImage(id));
    var imgModal = document.createElement("img");
    imgModal.src = url;

    modal_gallery.insertAdjacentElement("beforeend", figureModal);
    figureModal.insertBefore(divModal, null);
    divModal.insertAdjacentElement("beforeend", spanModal);
    spanModal.insertAdjacentElement("beforeend", iModal);
    divModal.insertAdjacentElement("afterend", imgModal);
}

openModal.addEventListener("click", function () {
    modal.style.display = "block";
})

btnAdd.addEventListener("click", function () {
    modal.style.display = "none";
    modal2.style.display = "block";
    resetFormAddImg();
})

retour.addEventListener("click", function () {
    modal.style.display = "block";
    modal2.style.display = "none";

})

fermer1.addEventListener("click", function () {
    modal.style.display = "none";

})

fermer2.addEventListener("click", function () {
    modal2.style.display = "none";
})

//ferme la modal en cliquant en dehors de celle-ci
window.addEventListener("click", function (event) {
    if (event.target == modal || event.target == modal2) {
        modal.style.display = "none";
        modal2.style.display = "none";
    }
})

//Affiche l'image sélectionner
fileTransfert.addEventListener("change", PreviewImage);
function PreviewImage(e) {
    const input = e.target;
    console.log(input)
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            image.src = e.target.result
            // image.src = input.result
        }
        reader.readAsDataURL(input.files[0])
        image.style.display = "flex"
        labelFile.style.visibility = "hidden"

    }
}


async function delImage(id) {
    const jeton_modal = window.sessionStorage.getItem('token');
    if (jeton_modal) {
        await fetch(url + "api/works/" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + jeton_modal,
            },
        });
        document.getElementById(`modal_${id}`).remove()
        document.getElementById(`gallery_${id}`).remove();
    }

}


btnAddImg.addEventListener("click", sendImg);
async function sendImg(e) {
    e.preventDefault()
    const file = fileTransfert.files[0]
    let title = titre.value
    let cat = categ.value

    if (file !== undefined && title.length !== 0) {
        const body = new FormData();
        body.set("image", file);
        body.set("title", title);
        body.set("category", cat);
        console.log(body)
        const jeton_modal = window.sessionStorage.getItem('token');

        const newImg = await fetch(url + "api/works/", {
            method: 'POST',
            headers: {
                "Authorization": 'Basic ' + jeton_modal,
            },
            body,

        }).then(res => res.json())
        console.log(newImg);
        addElement(newImg.imageUrl, newImg.title, newImg.id)
        resetFormAddImg();
        refreshGalleryModal();
    } else {
        errMessages("Veuillez compléter tous les champs");

    }
}
function refreshGalleryModal() {
    while (modal_gallery.firstChild) {
        modal_gallery.removeChild(modal_gallery.firstChild)
    }
    galleryModal();
}

function resetFormAddImg() {
    document.getElementById("formModal").reset();
    image.removeAttribute('src')
    image.style.display = "none"
    labelFile.style.visibility = "visible"
    mess.textContent = "";
}

function errMessages(message) {
    mess.textContent = message;
}
