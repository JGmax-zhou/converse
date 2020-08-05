<?php
include "conn.php";
echo 
//检测用户名和密码是否都已经传入
if(isset($_POST['name']) && isset($_POST['pass'])){
    $name = $_POST['name'];
    $pass = $_POST['pass'];
    $result = $conn->query("select * from registry where username = '$name' and password ='$pass'");
    if($result->fetch_assoc()){//匹配成功
        echo true;
    }else{//匹配不成功
        echo false;
    }
}