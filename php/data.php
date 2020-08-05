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

    //2.查询数据
    $result= $conn->query("SELECT * FROM project");//查询所有的信息来自于project表
    // $result：结果集，所有的记录集
    // echo $result->num_rows;//获取记录集的条数
    // // $result->fetch_assoc():获取记录集，返回数组。
    // print_r($result->fetch_assoc());//依次获取第一条记录集
    // print_r($result->fetch_assoc());//依次获取第二条记录集
    // print_r($result->fetch_assoc());//依次获取第三条记录集


    $arr = array();//准备一个空数组
    for($i=0;$i<$result->num_rows;$i++){
        $arr[$i] = $result->fetch_assoc();//将获取的数组，继续给数组项，形成二维数组
    }

    echo json_encode($arr);//输出接口

    //http://10.31.163.50/JS2004/Day%2021_php+mysql/data.php

