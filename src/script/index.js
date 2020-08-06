;
//登录注册点击显示
(function($) {
    $user = $('#user') //控制高度运动出来
    $login = $('.user a:first-child') //登录按钮
    $registry = $('.user a:nth-child(2)') //注册按钮
    $user_login = $('#user_login') //登录页面
    $user_registry = $('#user_registry') //注册页面
    $user_btn = $('.header_container_right li:nth-child(2)') //用户按钮跳转登录
    $login_left_more = $('.login_left_more') //注册按钮跳转注册
    $sjx = $('.sjx')
    let login_count = 0;
    let registry_count = 0;

    //登录页面显示
    $login.on('click', function() {
        $user_registry.css('display', 'none')
        registry_count = 0
        login_count++
        if (login_count % 2 === 1) {
            $user.animate({
                'height': '397px'
            });
            $user_login.css('display', 'block');
            $sjx.css('display', 'block')
        } else {
            $user.animate({
                'height': '0px'
            });
            $user_login.css('display', 'none');
            $sjx.css('display', 'none')
        }
    })

    //注册页面显示
    $registry.on('click', function() {
        $user_login.css('display', 'none')
        login_count = 0
        registry_count++
        if (registry_count % 2 === 1) {
            $user.animate({
                'height': '397px'
            });
            $user_registry.css('display', 'block');
            $sjx.css('display', 'block')
        } else {
            $user.animate({
                'height': '0px'
            });
            $user_registry.css('display', 'none');
            $sjx.css('display', 'none')
        }
    })

    //点击注册用户触发
    $login_left_more.on('click', function() {
        $registry.click()
    })

    //点击登录按钮触发
    $user_btn.on('click', function() {
        $login.click()
    })


    //设置头部购物车数量
    let headerCount = $('.header_container_count') //头部数量
    let countarr = []
    let head_count = 0;
    if ($.cookie('count')) {
        countarr = $.cookie('count').split(',')

        //遍历购物车数量，把值赋值给圆
        $.each(countarr, function(index, value) {
            head_count += parseInt(value)
        })
        headerCount.html(head_count)
    }
})(jQuery);

//***********轮播效果******************
(function($) {
    //首先把所有需要的元素取下来
    let $banner = $('#banner') //父元素
    let $btn = $('#banner_menu li'); //下面按钮
    let $btnLeft = $('.banner_left'); //右边按钮
    let $btnRight = $('.banner_right'); //右边按钮
    let $picList = $('#banner ul li'); //图片
    let $banner_menu = $('#banner_menu') //轮播按钮
    let index = null;
    let timer = null;
    let timerrun = null;

    // 设置主程序用来控制图片运动
    function carousel() {
        $picList.eq(index).stop(true).animate({ "opacity": '1' }).siblings().stop(true).animate({ "opacity": '0' })
        $btn.eq(index).css({
            'text-decoration': 'overline',
            'color': 'black',
            "cursor": "pointer"
        }).siblings('#banner_menu li').css({
            'text-decoration': 'none',
            'color': '#ccc'
        })
    }
    //按钮移入事件
    $btn.on('mouseover', function() {
        index = $(this).index()
        clearTimeout(timer); //在下一个定时器开始前 先清除上一个定时器 防止叠加
        timer = setTimeout(function() {
            carousel()
        }, 600)
    })

    // 左边按钮点击事件
    $btnLeft.on('click', function() {
        index--;
        if (index < 0) {
            index = $picList.length - 1
        }
        carousel()
    })

    // 右边按钮点击事件
    $btnRight.on('click', function() {
        index++;
        if (index > $picList.length - 1) {
            index = 0
        }
        carousel()
    })

    //开启定时器每隔三秒点击右按钮
    timerrun = setInterval(function() {
        $btnRight.click()
    }, 3000)

    //如果鼠标划入停止运动，划出继续运动
    $banner.hover(function() {
        clearTimeout(timerrun)
    }, function() {
        timerrun = setInterval(function() {
            $btnRight.click()
        }, 3000)
    })

    $banner_menu.hover(function() {
        clearTimeout(timerrun)
        console.log('1');
    }, function() {
        timerrun = setInterval(function() {
            $btnRight.click()
        }, 3000)
    })
})(jQuery);
//Tab切换部分
(function($) {
    //首先先把需要的元素取到
    $Hot_button = $('#Hot_button li'); //所有的按钮
    $HOt_TAB_ALL = $('.HOt_TAB_item'); //所有需要切换的页面
    $sjx = $('#HOt_TAB_ALL>.sjx') //三角形
    $more = $('#MORE span')
    $sjxleft = parseInt($sjx.css('left')) //原本的left值
    $Hot_button.on('mouseover', function() {
        $HOt_TAB_ALL.eq($(this).index()).addClass('show').siblings('.HOt_TAB_item').removeClass('show');
        leftmove = 236 * $(this).index()
        $sjx.css('left', $sjxleft + leftmove + 'px')
        $more.html($('#Hot_button h2').eq($(this).index()).html())
    })

    //like you
    $likeyou = $('#likeyou');
    $likeyoutop = parseInt($likeyou.css('top'))
    $likeyou.css('top', $likeyoutop + $(window).scrollTop() + 'px')
    $(window).on('scroll', function() {
        $likeyou.stop(true).animate({
            'top': $likeyoutop + $(window).scrollTop() + 'px'
        })
    })
})(jQuery)