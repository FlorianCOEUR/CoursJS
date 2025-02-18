document.getElementById("displayModal").addEventListener("click", function(){
    document.getElementById("modal").style.display="flex";
    document.querySelector("#modal>div").focus();
});

document.getElementById("closeModal").addEventListener("click", function(){
    document.getElementById("modal").style.display="none";
});

document.getElementById("backModal").addEventListener("focus", function(){
    document.querySelector("#modal>div").focus();
});