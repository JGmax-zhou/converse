<?php

include "conn.php";
//获取前端传入的sid
if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    //利用sid查找对应的数据，返回给前端。
    $result=$conn->query("select * from project where sid = $sid");
    echo json_encode($result->fetch_assoc());
}