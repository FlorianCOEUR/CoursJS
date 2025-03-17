<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/include/connect.php";
include_once $_SERVER['DOCUMENT_ROOT'] . "/include/function.php";
$sql = "SELECT * FROM table_product ORDER BY product_serie ASC, product_name ASC LIMIT 50";
$stmt = $db->prepare($sql);
$stmt->execute();
$recordset = $stmt->fetchAll(PDO::FETCH_ASSOC);
$recordSetCart=[];
if(!empty($_COOKIE['cart'])){
    $idList="";
    $i=1;
    $idArray=[];
    foreach($_COOKIE['cart'] as $key=>$value){
        $idList.=":id".$i.",";
        $idArray["id". $i++] = $key;
    }
    $idList=rtrim($idList,",");
    $sql="SELECT product_name , product_id, product_serie, product_price, product_image FROM table_product WHERE product_id IN (".$idList.")";
    $stmt= $db->prepare($sql);
    $stmt->execute($idArray);
    $recordSetCart = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BdShop - Accueil</title>
    <link rel="icon" href="/image/favicon.png">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js" defer></script>
    <link href=" https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.min.css " rel="stylesheet">
</head>
<body>

    <?php include_once $_SERVER['DOCUMENT_ROOT'] . '/include/header.php'; ?>
    
    <span><i id="panier__icon" class="ri-shopping-basket-fill"></i></span>

    

     <main class="container">
        <div class="row">
            <?php foreach($recordset as $row){ ?>  
                    <article class="col-12 col-md-6 col-lg-4 col-xl-3">
                        <h3>
                            <?= $row['product_name']; ?>&nbsp;
                            <?= $row['product_serie']; ?> 
                        </h3>

                        <?php if(!empty($row['product_image'])){ ?>
                        <img src="/upload/md_<?= $row['product_image']; ?>" alt="Illustration de la couverture de la bande dessinée <?= $row['product_name']; ?> et de la série <?= $row['product_serie']; ?> " class="img-fluid">
                        <?php }else{ ?>
                        <img src="/image/default.jpg" alt="Illustration de la couverture de la bande dessinée <?= $row['product_name']; ?> et de la série <?= $row['product_serie']; ?> " class="img-fluid">
                        <?php } ?>

                        <div><button class="btn btn-success addToCart" data-id="<?= $row['product_id'] ?>">Add to cart</button></div>
                    </article>  
            <?php } ?>
        </div>
        <div id="panier">
            <h2>Mon panier</h2>
            <span class="fermeture"><i class="ri-close-circle-line"></i></span>
            <hr>
            <div id="cart">
                <?php $cartTotal=0;
                if(count($recordSetCart)>0){?>
                    <ul>
                        <?php foreach($recordSetCart as $rowCart){
                            $cartItemQty=$_COOKIE['cart'][hsc($rowCart['product_id'])];
                            $cartItemPrice=hsc($rowCart['product_price']);
                            $cartItemTotal=$cartItemPrice*$cartItemQty;
                            $cartTotal+=$cartItemTotal;
                            ?>
                            <li data-id="<?= hsc($rowCart['product_id'])?>">
                                <div>
                                    <?php if(!empty($rowCart['product_image'])){ ?>
                                    <img src="/upload/xs_<?= $rowCart['product_image']; ?>" alt="Illustration de la couverture de la bande dessinée <?= $rowCart['product_name']; ?>" >
                                    <?php }else{ ?>
                                    <img src="/image/default.jpg" alt="Illustration de la couverture de la bande dessinée <?= $rowCart['product_name']; ?> ">
                                    <?php } ?>
                                </div>
                                <div>
                                    <div><?= hsc($rowCart['product_name'])?></div>
                                    <div><?= hsc($rowCart['product_serie'])?></div>
                                    <div>
                                        <?= number_format($cartItemTotal,2,',', ' ')?> €
                                        (<?=$cartItemQty ?> x <?= number_format($cartItemPrice,2 ,","," ")?> €)
                                    </div>
                                    <div>
                                        <button class="btnMinus">-</button>
                                        <input type="number" name="" id="" value="<?=$_COOKIE['cart'][hsc($rowCart['product_id'])] ?>">
                                        <button class="btnPlus">+</button>
                                        <button class="btnDelete">Delete</button>
                                    </div>
                                </div>
                            </li>
                    <?php }?>
                    </ul>
                <?php }?>
                <div>
                Total : <span id="cart__total"><?=  number_format($cartTotal,2,',',' ')?></span> €
                </div>
            </div>
        </div>
    </main>
    
    <?php include_once $_SERVER['DOCUMENT_ROOT'] . '/include/header.php'; ?>
    <template id="cartItem">
        <li>
            <div>
                <img src="" alt="">
            </div>
            <div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button class="btnMinus">-</button>
                    <input type="number">
                    <button class="btnPlus">+</button>
                    <button class="btnDelete">Delete</button>
                </div>
            </div>
        </li>
    </template>
</body>
</html>