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
