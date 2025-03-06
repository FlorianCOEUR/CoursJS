<?php
try {
    $pdo = new PDO("mysql:host=localhost;dbname=ajax;charset=utf8", 'root',"");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die($e->getMessage());
}
$result=["status"=>"fail", "data"=>""];

if(isset($_POST["pseudo"])){
    $stmt=$pdo->prepare("SELECT * FROM table_user WHERE user_pseudo=:pseudo");
    $stmt->bindValue(":pseudo", $_POST["pseudo"]);
    $stmt->execute();
    if($row=$stmt->fetch(PDO::FETCH_ASSOC)){
        $result=["data"=> $row, "status"=>"success"];
    }
}
echo json_encode($result, JSON_PRETTY_PRINT);