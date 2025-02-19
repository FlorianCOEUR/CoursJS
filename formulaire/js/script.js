document.getElementById("form").addEventListener("submit",function(event){
    this.querySelectorAll(".error").forEach(function(errorDiv){
        errorDiv.classList.remove("error");
        errorDiv.removeChild(errorDiv.querySelector("span"));
    });
    let allValid=true;
    let inputArray=["prenom","nom", "email", "mdp", "mdpConf"];
    for(let inputId of inputArray){
        let input=this.querySelector("#"+inputId);
        if(input.value==''){
            let spanError=document.createElement("span");
            let text=document.createTextNode("Champ obligatoire!");
            allValid=false;
            input.closest("div").classList.add("error");
            spanError.appendChild(text);
            input.closest("div").appendChild(spanError);
        }
    }
    let input=this.querySelector("#email");
    if(!validerEmail(input.value) && input.value!=''){
        let spanError=document.createElement("span");
        let text=document.createTextNode("Ce n'est pas un email valide");
        allValid=false;
        input.closest("div").classList.add("error");
        spanError.appendChild(text);
        input.closest("div").appendChild(spanError);
    }
    if(!allValid){
        event.preventDefault();
    }
});

function validerEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}