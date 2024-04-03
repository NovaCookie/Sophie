import { addElement } from "./gallery.js";
import { deleteImg, getCateg, getImg, postImg } from "./impoFetchApi.js";

const deleteModal = document.getElementById("deleteModal");
const addImgModal = document.getElementById("addImgModal");
const modal_gallery = document.getElementById("modal-gallery");
const fileTransfert = document.getElementById("fileTransfert");
const labelFile = document.getElementById("labelFile");
const previewImage = document.getElementById("previewImage");
const errMsg = document.getElementById("errMsgModal");
const tk = window.sessionStorage.getItem('token');

//Appel des images et ajout dans l'index
galleryModal()
async function galleryModal() {
    await getImg()
        .then(data => {
            data.map(image => {
                addElementDelModal(image.imageUrl, image.id);
            })
        })
}
//Création dynamique de balise et insère les images dedans
function addElementDelModal(url, id) {

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
//Ajout dynamique du formulaire d'ajout d'image
addElementAddModal()
function addElementAddModal() {
    getCateg().then(data => {
        data.map(categ => {
            const selectCateg = document.getElementById("categorie")
            const optionSelectCateg = document.createElement("option");
        selectCateg.insertAdjacentElement("beforeend", optionSelectCateg);
        optionSelectCateg.value = categ.id
        optionSelectCateg.innerText = categ.name
    })
    });

}

document.getElementById("openModal").addEventListener("click", function () {
    deleteModal.style.display = "block";
})

document.getElementById("addBtn").addEventListener("click", function () {
    deleteModal.style.display = "none";
    addImgModal.style.display = "block";
    resetFormAddImg();
})

document.getElementById("arrow_left").addEventListener("click", function () {
    deleteModal.style.display = "block";
    addImgModal.style.display = "none";

})

document.getElementById("closeDeleteModal").addEventListener("click", function () {
    deleteModal.style.display = "none";

})

document.getElementById("closeAddImgModal").addEventListener("click", function () {
    addImgModal.style.display = "none";
})

//ferme la modal en cliquant en dehors de celle-ci
window.addEventListener("click", function (event) {
    if (event.target == deleteModal || event.target == addImgModal) {
        deleteModal.style.display = "none";
        addImgModal.style.display = "none";
    }
})




async function delImage(id) {

    if (tk) {
        deleteImg(tk, id);
        document.getElementById(`modal_${id}`).remove();
        document.getElementById(`gallery_${id}`).remove();
    }

}

//Affiche l'image sélectionner
fileTransfert.addEventListener("change", PreviewImage);
function PreviewImage(e) {
    const input = e.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
        previewImage.style.display = "flex";
        labelFile.style.visibility = "hidden";

    }
}

document.getElementById("submitImg").addEventListener("click", sendImg);
async function sendImg(e) {
    e.preventDefault()
    const file = fileTransfert.files[0]
    let title = document.getElementById("titre").value;
    let cat = document.getElementById("categorie").value;

    if (file !== undefined && title.length !== 0) {
        const body = new FormData();
        body.set("image", file);
        body.set("title", title);
        body.set("category", cat);
        await postImg(tk, body).then(img => addElement(img.imageUrl, img.title, img.id));
        resetFormAddImg();
        refreshGalleryModal();
    } else {
        errMessages("Veuillez compléter tous les champs");

    }
}

//permet de rafraîchir la galleryModal sans rafraîchir la page
function refreshGalleryModal() {
    while (modal_gallery.firstChild) {
        modal_gallery.removeChild(modal_gallery.firstChild);
    }
    galleryModal();
}

//permet de vider le formulaire apres l'envoie
function resetFormAddImg() {
    document.getElementById("formModal").reset();
    previewImage.removeAttribute('src');
    previewImage.style.display = "none";
    labelFile.style.visibility = "visible";
    errMsg.textContent = "";
}

function errMessages(message) {
    errMsg.textContent = message;
}
