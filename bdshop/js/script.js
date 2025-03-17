document.getElementById('panier__icon').addEventListener('click', function() {
    document.getElementById('panier').classList.add('active')
 }) 

 document.querySelector('.fermeture').addEventListener('click', function() {
   document.getElementById('panier').classList.remove('active')
 })

document.addEventListener('click', function(event){
    if(!document.getElementById('panier').contains(event.target) && !document.getElementById('panier__icon').contains(event.target)){
        document.getElementById('panier').classList.remove('active');
    }
});


document.querySelectorAll(".addToCart").forEach((btn)=>{
    btn.addEventListener('click',()=>{
        fetch("addTocart.php?id="+btn.getAttribute("data-id"))
        .then(response => response.json())
        .then(data=>{
            if(data['status']=='success'){
                inCart=false;
                document.querySelectorAll('#cart li').forEach(function(li){
                    if(li.getAttribute("data-id")==btn.getAttribute("data-id")){
                        inCart=true;
                        li.querySelector("input").value+=1;
                    }
                });
                if(!inCart){
                    let template=document.getElementById("cartItem");
                    let cartItem=document.importNode(template.content, true);
                    cartItem.querySelector('li').setAttribute('data-id',data['data']['product_id']);
                    let div=cartItem.querySelectorAll('div');
                    let itemPrice=data['data']['product_price'];
                    let qty=data['data']['qty'];
                    if(data['data']['product_image']!=""){
                        cartItem.querySelector('img').src="/upload/xs_"+data['data']['product_image'];
                    }else{
                        cartItem.querySelector('img').src="/image/default.jpg";
                    }
                    div[2].textContent=data['data']['product_name'];
                    div[3].textContent=data['data']['product_serie'];
                    let itemTotal=itemPrice*qty;
                    div[4].textContent=itemTotal+" € (Soit "+itemPrice+"x"+qty+")";
                    cartItem.querySelector('input').value=qty;
                    if(document.querySelector("#cart ul")==null){
                        let ul=document.createElement('ul');
                        document.getElementById("cart").prepend(ul);
                    }
                    cartItem.querySelector(".btnDelete").addEventListener('click',()=>{
                        console.log('toto');
                    });
                    document.querySelector("#cart ul").appendChild(cartItem);
                }
                
            }
            
            // document.querySelector('#panier ul').appendChild(cartItem);
        });
    });
});