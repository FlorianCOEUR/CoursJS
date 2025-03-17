<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/include/connect.php";

$customerId=0; //A mettre à jour avec la session utilisateur
if(!empty($_GET["id"]) && is_numeric( $_GET["id"] )) {
    $id = $_GET["id"];
    $recordSet=["status"=>'fail', "data"=>""];
    if($customerId==0){
        (isset($_COOKIE['cart'][$id])) ? $qte=$_COOKIE['cart'][$id]+1 : $qte= 1;
        setcookie('cart['.$id.']',$qte,time()+30*24*60*60);
        $sql='SELECT product_name , product_id, product_serie, product_price, product_image FROM table_product WHERE product_id= :id';
        $stmt=$db->prepare($sql);
        $stmt->bindParam(':id',$id,PDO::PARAM_INT);
        $stmt->execute();
        if($row=$stmt->fetch(PDO::FETCH_ASSOC)){
            $recordSet=['status'=> 'success','data'=> $row];
            $recordSet['data']['qty']= $qte;
        echo json_encode($recordSet);
        }
    }

}