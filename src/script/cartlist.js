;
(function() {
    // 获取元素
    let shop_list = $('.shop_list') //获取渲染父元素
    let sidlist = $.cookie('sid') //获取cookie的sid
    let sidcount = $.cookie('count') //获取cookie的count
    if (sidlist && sidcount) {
        for (let i = 0; i < sidlist.length; i++) {
            render(sidlist[i], sidcount[i])
        }
    }
    console.log(sidlist);

    function render(sid, count) {
        let str = ''
        $.ajax({
            url: 'http://localhost/JavaScript/converse/php/getsid.php?sid=' + sid,
            dataType: 'json'
        }).done(function(data) {
            str += `
                <li>
                <div class="shop_list_top">
                    <div class="shop_list_box">
                        <div></div>
                    </div>
                    <div class="shop_list_del">
                        <span>编辑</span>
                        <span>删除</span>
                    </div>
                </div>
                <div class="shop_list_bottom">
                    <div class="shop_img">
                        <img src="${data.url}" alt="">
                    </div>
                    <div class="shop_information">
                        <h2>${data.title}</h2>
                        <p>型号：<span class="shop_type">10020885102</span></p>
                        <p>颜色：<span class="shop_color">白色</span></p>
                        <p>尺码：<span class="shop_size">170/96A</span></p>
                    </div>
                    <div class="shop_item">
                        <p class="shop_price">￥${data.price}</p>
                        <div class="shop_num">
                            <span>数量</span>
                            <i></i>
                            <input type="text" value='${count}'>
                            <i></i>
                        </div>
                    </div>
                </div>
            </li>
            `
            shop_list.append(str)
                // 获取元素
            let list = $('.shop_list li')
            let original_price = $('.original_price')
            flag = true
            $('.shop_list_box').on('click', function() {
                if (flag) {
                    $('.shop_list_box').css({
                        background: `url(https://image.converse.com.cn/images/shoppingcart-2/checked.png) no-repeat left center`
                    });
                    flag = false
                        // original_price.html()
                } else {
                    $('.shop_list_box').html('')
                    flag = true
                }
            })
        })

    }
})()