const modal = document.getElementById("myModal_del");
const openModal = document.getElementById("openModal");
const modal2 = document.getElementById("myModal_add");
const btnAdd = document.getElementById("btnAdd");
const retour = document.getElementById("arrow_left")
const fermer1 = document.getElementById("closeOne");
const fermer2 = document.getElementById("closeTwo");
const modal_gallery = document.getElementById("modal-gallery");
const img = document.getElementById("img-aff");
const titre = document.getElementById("Titre");
const categ = document.getElementById("Catégorie");
const fileTransfert = document.getElementById("FileTransfert");
const labelFile = document.getElementById("labelFile");
const image = document.getElementById("previewImage");
const btnAddImg = document.getElementById("modal-add-input");
const mess = document.getElementById("msg-err-modal")


const url = "http://localhost:5678/"

fetch(url + 'api/works')
    .then(r => r.json().then(data =>
        data.map(image => {
            openModal.addEventListener("click", addElementmodal(image.imageUrl, image.id));
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
    iModal.addEventListener("click", e => { delImage(e); e.defaultPrevented() })
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
    labelFile.style.visibility = "visible"
    image.setAttribute("src", "")

}

retour.onclick = function () {
    modal.style.display = "block";
    modal2.style.display = "none";
    image.removeAttribute('src')
    image.style.display = "none"    
}

fermer1.onclick = function () {
    modal.style.display = "none";
    
}

fermer2.onclick = function () {
    modal2.style.display = "none";
    
}

//ferme la modal en cliquant en dehors de celle-ci
window.onclick = function (event) {
    if (event.target == modal || event.target == modal2) {
        modal.style.display = "none";
        modal2.style.display = "none";
    }
}

//Affiche l'image sélectionner
fileTransfert.addEventListener("change", PreviewImage);
function PreviewImage(e) {
    e.preventDefault()
    const input = e.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // image.src = e.target.result
            image.src = input.result
        }
        reader.readAsDataURL(input.files[0])
        image.style.display = "flex"
        labelFile.style.visibility = "hidden"

    }
}

async function delImage(e) {
    e.preventDefault();
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
        f();
    }
    
}

function delElement(e) {
    e.preventDefault()
    var parent = modal_gallery
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

btnAddImg.addEventListener("click", async function sendImg(e) {
    e.preventDefault();
    var titre_send = titre.value
    var categ_send = categ.value


    if (fileTransfert.files[0] === undefined || titre_send.length == 0) {
        mess.style.display = "flex"
    }
    else {
        const body = new FormData();
        body.set("image", fileTransfert.files[0]);
        body.set("title", titre_send);
        body.set("category", categ_send);
        console.log(body)
        const jeton_modal = window.sessionStorage.getItem('token');
        url_local = "http://localhost:5500/"
        await fetch(url + "api/works/", {
            method: 'POST',
            headers: {
                "Authorization": 'Basic ' + jeton_modal,
            },
            body,

        })
    }
})
