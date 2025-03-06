document.getElementById("pseudo").addEventListener("keyup", function (){
    document.querySelectorAll(".ok").forEach(function(errorDiv){
        errorDiv.remove();
    });
    document.querySelectorAll(".error").forEach(function(errorDiv){
        errorDiv.remove();
    });
    let formData=new FormData();
    formData.append("pseudo", this.value);
    let div=document .createElement("div");
    fetch("checkPseudoJson.php",{
        method:"POST",
        body: formData
    })
    .then(response=>response.json())
    .then(data=>{
        if(data["status"]=="success"){
            div.innerHTML="Le pseudo est pris par : "+data["data"]["user_name"];
            div.classList.add("error");
        }else{
            div.classList.add("ok");
            div.innerHTML="Pseudo dispo";
        }
        this.closest("form").appendChild(div);
        console.log(data);
    });
});