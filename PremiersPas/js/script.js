let button= document.getElementById("btn");
let i=0;
let buttonBefore= document.getElementById("addListBefore");
let buttonAfter= document.getElementById("addList");

button.addEventListener("click", function(){
    let h1=document.querySelector("h1");
    if(h1.innerText == "Hello, World!"){
        h1.innerText="Goodbye!";
        h1.classList.add("erreur");
        button.innerHTML="Bonjour";
    }else{
        h1.innerText="Hello, World!";
        h1.classList.remove("erreur");
        button.innerText="Au revoir"
    }

});

buttonBefore.addEventListener("click", function(){
    let li=document.createElement("li");
    let text=document.createTextNode("test"+i);
    li.appendChild(text);
    i++;
    document.getElementById("list").insertBefore(li, document.getElementById("list").firstChild);
});
buttonAfter.addEventListener("click", function(){
    let li=document.createElement("li");
    let text=document.createTextNode("test"+i);
    li.appendChild(text);
    i++;
    document.getElementById("list").appendChild(li);
});