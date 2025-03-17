
/*Gestion de la fenêtre modale*/

let modal=document.getElementById('modal');
document.querySelector('form a').addEventListener('click', function(event){
    event.preventDefault();
    console.log('ici');
    modal.style.display="flex";
});
document.querySelector('#modal button').addEventListener('click',function(){
    modal.style.display="none";
});
modal.addEventListener('click',function(event){
    if(!modal.querySelector('div').contains(event.target)){
        modal.style.display="none"
    }
})
/*Contrôle des champs de saisie*/
document.querySelector('form').addEventListener('submit', function(event){
    if(document.querySelector('.synthese')){
        document.querySelector('main>div').removeChild(document.querySelector('.synthese'));
    }
    event.preventDefault();
    document.querySelectorAll(".error").forEach(function(errorDiv){
        errorDiv.classList.remove("error");
        if(errorDiv.querySelector("span")){
            errorDiv.querySelectorAll("span").forEach((div)=>{
                errorDiv.querySelector('div').removeChild(div);
            });
        }
    });
    /*Controle du champ email au bon format*/
    let allValid=true;
    let synthese=document.createElement('ul');
    synthese.classList.add('synthese');
    synthese.setAttribute("tab-index","-1");
    let emailRegEx=new RegExp("^[a-zA-Z0-9.\-_\+]+@[a-zA-Z0-9.\-]+[.]{1}[a-zA-Z0-9]{2,}$","i");
    if(!emailRegEx.test(document.getElementById("mail").value)){
        let span=document.createElement('span');
        (document.getElementById("mail").closest('div').parentNode).classList.add('error');
        span.innerHTML='Veuillez entrer un email valide';
        document.getElementById("mail").closest('div').appendChild(span);
        allValid=false;
        let li=document.createElement('li');
        li.innerHTML=span.innerHTML;
        synthese.appendChild(li);

        
    }
    /*Controle du pseudo*/
    fetch('checkpseudo.php')
    .then(response=>response.text())
    .then(data=>{
        if(data!='okay'){
            console.log(data);
            let span=document.createElement('span');
            span.innerHTML='Pseudo Présent';
            allValid=false;
            (document.getElementById("pseudo").closest('div').parentNode).classList.add('error');
            document.getElementById("pseudo").closest('div').appendChild(span);
            let li=document.createElement('li');
            li.innerHTML=span.innerHTML;
            synthese.appendChild(li);
        }
    })

    /*Controle du mot de passe*/
    let arrayRegEx=[
        [new RegExp("^.{8,}$","i"), "Au moins 8 caractères"],
        [new RegExp("(?=.*[a-z])"), "1 minuscule"],
        [new RegExp("(?=.*[A-Z])"), "1 MAJUSCULE"],
        [new RegExp("(?=.*[0-9])","i"), "1 chiffre"],
        [new RegExp("(?=.*[#!@$!%^+-\.])","i"), "1 caractère spécial"]
    ];
    if(document.getElementById('password').value==""){
        let span=document.createElement('span');
        span.innerHTML='Le mot de passe est obligatoire';
        (document.getElementById("password").closest('div').parentNode).classList.add('error');
        document.getElementById("password").closest('div').appendChild(span);
        allValid=false;
        let li=document.createElement('li');
        li.innerHTML=span.innerHTML;
        synthese.appendChild(li);

    }else{
        arrayRegEx.forEach((regEx)=>{
            if(!regEx[0].test(document.getElementById('password').value)){
                let span=document.createElement('span');
                span.innerHTML=regEx[1];
                (document.getElementById("password").closest('div').parentNode).classList.add('error');
                document.getElementById("password").closest('div').appendChild(span);
                allValid=false;
                let li=document.createElement('li');
                li.innerHTML=span.innerHTML;
                synthese.appendChild(li);
            }
            }
        );
    }
    if(document.getElementById('password').value!=document.getElementById('confirm').value){
        let span=document.createElement('span');
        let span1=document.createElement('span');
        span1.innerHTML='Les mots de passes doivent être identiques';
        span.innerHTML='Les mots de passes doivent être identiques';
        (document.getElementById("confirm").closest('div').parentNode).classList.add('error');
        document.getElementById("confirm").closest('div').appendChild(span);
        (document.getElementById("password").closest('div').parentNode).classList.add('error');
        document.getElementById("password").closest('div').appendChild(span1);
        let li=document.createElement('li');
        li.innerHTML=span.innerHTML;
        synthese.appendChild(li);

    }
    let telRegEx=/^\+33[67]\d{8}$/;
    telNumber=document.getElementById('tel').value.replace(/\s+/g,'');
    if(!telRegEx.test(telNumber)){
        let span=document.createElement('span');
        span.innerHTML='Entrez un numéro correct';
        (document.getElementById('tel').closest('div').parentNode).classList.add('error');
        document.getElementById('tel').closest('div').appendChild(span);
        let li=document.createElement('li');
        li.innerHTML=span.innerHTML;
        synthese.appendChild(li);
    }


    if(!allValid){
        event.preventDefault();
        document.querySelector('main>div').insertBefore(synthese,document.querySelector('form'));
        document.querySelector('h1').focus();
    }
});
document.getElementById("tel").addEventListener("keyup", function(){
    if(!this.value.startsWith("+33")){
        this.value="+33";
    }
});