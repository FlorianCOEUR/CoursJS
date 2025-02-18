document.querySelectorAll(".addCart").forEach(function(button){
    button.addEventListener("click", function(){
        console.log(this.closest("article").querySelector("h3").innerText);
        console.log(this.getAttribute("data-id"));
        let li=document.createElement("li");
        let text=document.createTextNode(this.closest("article").querySelector("h3").innerText);
        li.appendChild(text);
        document.querySelector("ul").appendChild(li);
    });
});