document.querySelectorAll(".addCart").forEach(function(button){
    button.addEventListener("click", function(){
        let text=document.createTextNode(this.closest("article").querySelector("h3").innerText);
        let lineCart=document.querySelectorAll(".cart tr");
        let here = false;
        let id=this.getAttribute("data-id");
        let price=this.closest("article").querySelector(".price strong").innerText;
        console.log(price);
        lineCart.forEach(function(line){
            if(line.getAttribute("data-id")==id){
                here=true;
                let quantite = parseInt(line.querySelector(".quantite").innerText)+1;
                line.querySelector(".quantite").innerText=quantite;
                line.querySelector(".ssTot").innerText=price*quantite;
            }
        });
        if(!here){
            let tr=document.createElement("tr");
            tr.setAttribute("data-id",id);
            let nomTd=document.createElement("td");
            nomTd.classList.add("nomArticle");
            nomTd.appendChild(text);
            tr.appendChild(nomTd);
            let quantiteTd=document.createElement("td")
            quantiteTd.classList.add("quantite");
            quantiteTd.innerText=1;
            tr.appendChild(quantiteTd);
            let ssTotTd=document.createElement("td");
            ssTotTd.classList.add("ssTot");
            ssTotTd.innerText=price;
            tr.appendChild(ssTotTd);
            document.querySelector("tbody").appendChild(tr);
        }
        document.querySelector(".total").innerText=parseInt(document.querySelector(".total").innerText)+parseInt(price);
        
    });
});