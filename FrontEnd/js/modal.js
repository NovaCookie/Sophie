const modal = document.getElementById("myModal_del");
const openModal = document.getElementById("openModal");
const modal2 = document.getElementById("myModal_add");
const btnAdd = document.getElementById("btnAdd");
const arrow = document.getElementById("arrow_left")
const fermer1 = document.getElementById("closeOne");
const fermer2 = document.getElementById("closeTwo");
const divAff = document.getElementById("div-img-aff")

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