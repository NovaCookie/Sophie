const modal = document.getElementById("myModal_del");
const openModal = document.getElementById("openModal");
const modal2 = document.getElementById("myModal_add");
const btnAdd = document.getElementById("btnAdd");
const arrow = document.getElementById("arrow_left")
const fermer1 = document.getElementById("closeOne");
const fermer2 = document.getElementById("closeTwo");
const modal_gallery = document.getElementById("modal-gallery");
const divAff = document.getElementById("div-img-aff")
const img = document.getElementById("img-aff");
const titre = document.getElementById("Titre")
const categ = document.getElementById("Catégorie")

const url = "http://localhost:5678/"

fetch(url + 'api/works')
    .then(r => r.json().then(data =>
        data.map(image => {
            addElementmodal(image.imageUrl, image.id);
        })
    )
    )

//Création dynamique de balise et insère les images dedans
function addElementmodal(url, id) {

    const figureModal = document.createElement("figure");
    const divModal = document.createElement("div");
    const spanModal = document.createElement("span");
    const iModal = document.createElement("i");
    iModal.className = "fa-solid fa-trash-can";
    iModal.id = id
    iModal.addEventListener("click", e => { delImage(e) })
    var imgModal = document.createElement("img");
    imgModal.src = url;

    modal_gallery.insertAdjacentElement("beforeend", figureModal);
    figureModal.insertBefore(divModal, null);
    divModal.insertAdjacentElement("beforeend", spanModal);
    spanModal.insertAdjacentElement("beforeend", iModal);
    divModal.insertAdjacentElement("afterend", imgModal);
}

openModal.onclick = function () {
    modal.style.display = "block";
}

btnAdd.onclick = function () {
    modal.style.display = "none";
    modal2.style.display = "block";

    divAff.style.opacity = "0";
    divAff.style.zIndex = "-1";
    document.getElementById("img-aff").src = ""
}

arrow.onclick = function () {
    modal.style.display = "block";
    modal2.style.display = "none";
}

fermer1.onclick = function () {
    modal.style.display = "none";
}

fermer2.onclick = function () {
    modal2.style.display = "none";
}

//ferme la modal en cliquant en dehors de celle-ci
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//Affiche l'image sélectionner dans les fichiers
function changeImg() {
    const imgSelected = document.getElementById("FileTransfert").files[0];
    img.classList.add("obj");
    img.file = imgSelected;

    const reader = new FileReader();
    reader.onload = (e) => {
        img.src = e.target.result;
    };
    reader.readAsDataURL(imgSelected);
    var divAff = document.getElementById("div-img-aff")
    divAff.style.opacity = "1";
    divAff.style.zIndex = "1";
}

async function delImage(e) {
    var id = e.currentTarget.getAttribute("id")
    const jeton_modal = window.sessionStorage.getItem('token');
    if (jeton_modal) {
        await fetch(url + "api/works/" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + jeton_modal,
            },
        });
        delElement();
    }
}

function delElement(e) {
    var parent = modal_gallery
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)

    }
}

async function sendImg() {
    const fileTrans = document.getElementById("FileTransfert").files[0];
    var titre_send = titre.value
    var categ_send = categ.value
    if (fileTrans === undefined || titre_send.length == 0) {
        var mess = document.getElementById("msg-err-modal")
        mess.style.display = "flex"
    }
    else {
        var formData = new FormData();
        formData.append("image", fileTrans);
        formData.append("title", titre_send);
        formData.append("category", categ_send);
        const jeton_modal = window.sessionStorage.getItem('token');
        url_local = "http://localhost:5500/"
        await fetch(url + "api/works/", {
            method: 'POST',
            headers: {
                "Authorization": 'Basic ' + jeton_modal,
            },
            body: formData,
        })
    }
}