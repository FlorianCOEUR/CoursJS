function formSubmit(event){
    document.querySelectorAll(".error").forEach(function(errorDiv){
        errorDiv.classList.remove("error");
        if(errorDiv.querySelector("span")){
            errorDiv.querySelectorAll("span").forEach((div)=>{
                errorDiv.removeChild(div);
            });
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
    if(document.getElementById("mdp")!=''){
        let mdp=document.getElementById("mdp").value;
        let arrayRegEx=[
            [new RegExp("^.{8,12}$","i"), "Doit contenir entre 8 et 12 caractères<br>"],
            [new RegExp("(?=.*[a-z])"), "Doit contenir au moins une minuscule<br>"],
            [new RegExp("(?=.*[A-Z])"), "Doit contenir au moins une MAJUSCULE<br>"],
            [new RegExp("(?=.*[0-9])","i"), "Doit contenir au moins un chiffre<br>"],
            [new RegExp("(?=.*[#!@$!%^+-\.])","i"), "Doit contenir au moins un caractère spécial<br>"]
        ];
        arrayRegEx.forEach((regEx)=>{
            if(!regEx[0].test(mdp)){
                text=regEx[1];
                let spanError=document.createElement("span");
                spanError.innerHTML=text;
                let mdpDiv=document.getElementById("mdp").closest("div");
                mdpDiv.classList.add("error");
                mdpDiv.appendChild(spanError);
            }
        });
        if(document.getElementById("mdp").value!=document.getElementById("mdpConf") && document.getElementById("mdpConf")!=''){
            text=document.createTextNode("Les mots de passes sont différents!");
            let spanError=document.createElement("span");
            spanError.appendChild(text);
            let mdpConfDiv=document.getElementById("mdpConf").closest("div");
            mdpConfDiv.classList.add("error");
            mdpConfDiv.appendChild(spanError);
        }
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
