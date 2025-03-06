document.getElementById("pseudo").addEventListener("keyup", function (){
    let formData=new FormData();
    formData.append("pseudo", this.value);
    fetch("checkPseudo.php",{
        method:"POST",
        body: formData
    })
    .then(response=>response.text())
    .then(data=>{
        if(data=="non"){
            console.log("Déjà Pris");
        }else{
            console.log(this.value);
        }
    });
});