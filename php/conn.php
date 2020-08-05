<?php

    // 设置字符编码。
    header('content-type:text/html;charset=utf-8');
    //利用php操作数据库
    //1.连接数据库 - mysqli类
    // new mysqli(主机名,用户名,密码,数据库的名称);

    define('HOST','localhost');//主机名
    define('USERNAME','root');//用户名
    define('PASSWORD','root');//密码
    define('DBNAME','project');//数据库的名称

    $conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
    //@:容错处理，让错误信息不显示。
    if($conn->connect_error){//如果上面的数据库连接出错，显示下面的错误。
        die('数据库连接失败'.$conn->connect_error);
    }