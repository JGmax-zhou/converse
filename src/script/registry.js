;;(function($){
    //先取数据
    $list = $('.user_registry_top li input');
    $error = $('.user_registry_top .error');
    console.log($list);
    console.log($error);
    //手机号码验证
    $list.eq(0).on('blur',function(){
        if($list.eq(0).val()!==''){
            $error.eq(0).css('opacity','0')
            alert('1')
        }else{
            $error.eq(0).css('opacity','1')
        }
    })
})(jQuery)