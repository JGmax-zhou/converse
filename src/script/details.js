;
(function($) {
    // 先获取元素
    let sid = window.location.search; // 首先先获取地址栏的sid
    let df = $('.df'); //大放
    let sf = $('.sf'); //小放
    let smimg = $('.smimg'); //小图
    let smpic = $('.smpic'); //切换图
    let box = $('.content_right .box') //颜色图
    $.ajax({
        url: 'http://localhost/JavaScript/converse/php/getsid.php' + sid, //利用地址栏的sid来获取数据
        dataType: 'json' //设置回传数据为json格式
    }).done(function(data) {
        let arr = data.smpic.split(',') //把取出来的链接转换成数组
        let str = ''
        $.each(arr, function(index, value) {
            str += `<li><img src="${value}" alt=""></li>` //遍历切换图
        })
        smpic.append(str) //把所有的切换图追加到对应盒子
        let list = $('.smpic li') //取到所有渲染出来的li元素
        let bigpic = data.bigpic.split(',') //把获取到的图片数据转换成数据
        list.eq(0).addClass('action') //给切换图第一张加上默认样式
        smimg.append(`<img src="${bigpic[0]}" alt="">`) //默认小图显示第一张图
        df.append(`<img src="${bigpic[0]}" alt="">`) //默认大图显示第一张图
        $('.smpic li').on('click', function() { //设置点击效果，同时切换小图和大图
            $(this).addClass('action').siblings('.smpic li').removeClass('action')
            smimg.empty('img') //清空原先默认的小图
            df.empty() //清空原先默认的大图
            smimg.append(`
            <div class="sf"></div>
            <img src="${bigpic[$(this).index()]}" alt="">
            `) //利用小图切换的索引值进行切换小图
            df.append(`<img src="${bigpic[$(this).index()]}" alt="">`) //利用小图切换的索引值进行切换大图
        })

        // ***设置放大镜效果***

        smimg.hover(function(ev) {
                sf.show()
                df.show()
                    // 计算大图移动比例
                bili = $('.df img').width() / smimg.width()
                smimg.on('mousemove', function(ev) {
                    let sortX = ev.clientX - smimg.offset().left - (sf.width() / 2)
                    let sortY = ev.clientY - smimg.offset().top - (sf.height() / 2)
                    if (sortX <= 0) {
                        sortX = 0
                    } else if (sortX > smimg.width() - sf.width()) {
                        sortX = smimg.width() - sf.width()
                    }
                    if (sortY <= 0) {
                        sortY = 0
                    } else if (sortY > smimg.height() - sf.height()) {
                        sortY = smimg.height() - sf.height()
                    }
                    sf.css({
                        left: sortX + 'px',
                        top: sortY + 'px',
                    })

                    $('.df>img').css({
                        left: -sortX * bili + 'px',
                        top: -sortY * bili + 'px',
                    })
                })
            },
            function() {
                sf.hide()
                df.hide()
            })

        //***尺码选择****
        let size = $('.select_right span').eq(0)
        let num = $('.select_right span').eq(1)
        $('.select_size').on('click', function() {
            size.html($(".select_size :selected").text())
        })
        $('.select_num').on('click', function() {
            num.html($(".select_num :selected").text())
        })

        //*****立即购买加入购物车按钮******
        //获取元素
        let shopsid = window.location.search.slice(5);
        let payshop = $('.shop_btn') //获取立即购买和加入购物车按钮
        let headerCount = $('.header_container_count') //头部数量
        let headercount = 0 //总共数量
        let shopsidArr = []
        let numberArr = []
            // let sizeArr = []

        //获取cookie原有的值赋值给数组
        function getcookie() {
            if ($.cookie('sid')) {
                shopsidArr = $.cookie('sid').split(',')
                numberArr = $.cookie('count').split(',')
                    // sizeArr = $.cookie('size').split(',')
            }
        }
        getcookie()

        //设置按钮点击事件 每当点击加数量
        payshop.on('click', function() {
            let reg = /\d/; //设置条件如果不是数字，不进入购物车
            if (reg.exec(num.html()) && reg.exec(size.html())) {
                getcookie()

                //判断sid是否在cookie存在
                if (shopsidArr.indexOf(shopsid) === -1) {
                    shopsidArr.push(shopsid)
                    numberArr.push(num.html())
                        // sizeArr.push(size.html())
                    $.cookie('sid', shopsidArr, { expires: 7 })
                    $.cookie('count', numberArr, { expires: 7 })
                        // $.cookie('size', sizeArr, { expires: 7 })
                } else {
                    //如果sid已存在则数量追加
                    index = shopsidArr.indexOf(shopsid)
                    numberArr[index] = parseInt(numberArr[index]) + parseInt(num.html())
                    $.cookie('count', numberArr, { expires: 7 })
                }
                //如果已经选择尺码和数量则立即购买可以跳转购物车
                $('.gocar').attr('href', 'shoppingCart.html')
            }
        })

        //遍历购物车数量，把值赋值给圆
        $.each(numberArr, function(index, value) {
            headercount += parseInt(value)
        })
        headerCount.html(headercount)
    })
})(jQuery)