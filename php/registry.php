<?php

include "conn.php";


//检测用户名是否重名
if(isset($_POST['name'])){
    $username = $_POST['name'];//获取前端失去焦点传入的用户名的值。
    $result=$conn->query("select * from registry where username = '$username'");//和数据库进行匹配
    if($result->fetch_assoc()){//返回数组，用户名存在
        echo true;//1
    }else{//用户名不存在
        echo false;//空
    }
}


// 判断是否点击submit
if(isset($_POST['submit'])){
    $user = $_POST['username'];
    $pass =sha1($_POST['password']);
    $repass = sha1($_POST['repass']);
    $email = $_POST['email'];
    $conn->query("insert registry values(null,'$user','$pass','$repass','$email',NOW())");
    //php页面跳转
    header('location:http://localhost/JavaScript/login&registry/src/login.html');
}

//前端 - 后端  后端 - 前端  绝对路径，其他的相对路径。
//目录里面如果存在index命名的文件，服务器默认自动找文件，前期不要采用index命名。