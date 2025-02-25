function formSubmit(event){
    document.querySelectorAll(".error").forEach(function(errorDiv){
        errorDiv.classList.remove("error");
        if(errorDiv.querySelector("span")){
            errorDiv.removeChild(errorDiv.querySelector("span"));
        }
    });
    let allValid=true;

    document.getElementById("form").querySelectorAll("input[required], textarea[required], select[required]").forEach(function(input){
        if(input.value==''){
            let spanError=document.createElement("span");
            let text=document.createTextNode("Champ obligatoire!");
            allValid=false;
            input.closest("div").classList.add("error");
            spanError.appendChild(text);
            input.closest("div").appendChild(spanError);
        }
    });
    let input=document.querySelector("#email");
    if(!validerEmail(input.value) && input.value!=''){
        let spanError=document.createElement("span");
        let text=document.createTextNode("Ce n'est pas un email valide");
        allValid=false;
        input.closest("div").classList.add("error");
        spanError.appendChild(text);
        input.closest("div").appendChild(spanError);
    }
    let checkBox=document.getElementById("cgv");
    if(!checkBox.checked){
        checkBox.closest("div").classList.add("error");
    }
    if(!allValid){
        event.preventDefault();
    }
}

document.getElementById("form").addEventListener("submit", formSubmit);
document.getElementById("btn").addEventListener("click", formSubmit);

function validerEmail(email) {
    const regex = new RegExp("^[a-zA-Z0-9.\-_\+]+@[a-zA-Z0-9.\-]+[.]{1}[a-zA-Z0-9]{2,}$","i");
    return regex.test(email);
}

function checkMDP(mdp){
    let arrayRegEx=[
        ["^.{8,12}$", false, "Doit contenir entre 8 et 12 caractères"],
        ["^[a-z]$", false, "Doit contenir au moins une minuscule"],
        ["^[A-Z]$", false, "Doit contenir au moins une MAJUSCULE"],
        ["^[0-9]$", false, "Doit contenir au moins un chiffre"],
        []
    ]
}