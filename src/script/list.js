;
(function($) {
    // 获取元素
    const $dlList = $('.dropdown_bottom dl');
    const $dtList = $('.dropdown_bottom dt');
    let count = []; //设置数组用来判断是否重复点击
    $dlList.on('click', function() {
        if (count.indexOf($(this).index()) === -1) {
            $(this).css({
                height: 'auto',
            }).siblings('dl').stop(true).animate({
                height: '27px',
            }, 100)

            $dtList.eq($(this).index()).css({
                background: "url('https://image.converse.com.cn/images/commons/minus.png')right center no-repeat",
            }).siblings('dl').css({
                background: "url('https://image.converse.com.cn/images/commons/plus.png')right center no-repeat",
            })

            count.push($(this).index())
        } else {
            $(this).animate({
                height: '27px',
            })
            $dtList.eq($(this).index()).css({
                background: "url('https://image.converse.com.cn/images/commons/plus.png')right center no-repeat",
            })
            count = []
        }
    })
})(jQuery)