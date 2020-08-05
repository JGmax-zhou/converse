;
(function($) {
    //**********下拉菜单制作**************
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

    //*************render*************
    //先获取元素
    $NEW_show = $('#NEW_show'); //ul元素
    $sort = $('.sort'); //排序按钮
    $default = $('.default') //默认按钮
    $sortup = $('.sort i'); //向上
    $sortdown = $('.sort b'); //向下

    $.ajax({
        url: 'http://localhost/JavaScript/converse/php/data.php',
        dataType: 'json'
    }).done(function(data) {
        let defData = data
        let changeDate = {}
            // $.extend(true, changeDate, data)
        changeDate = JSON.parse(JSON.stringify(data))
        main(defData)
        $default.on('click', function() {
            main(defData)
        })
        let count = 0
        $sort.on('click', function() {
            count++
            if (count % 2 === 0) {
                getdata(changeDate, false) //获取数据进行处理
                $sortup.hide()
                $sortdown.css('display', 'inline-block')
            } else {
                getdata(changeDate, true) //获取数据进行处理
                $sortup.css('display', 'inline-block')
                $sortdown.hide()
            }
            main(changeDate) //执行代码模块
        })
    })


    //排序函数
    function getdata(data, sort) {
        let $price = []
        str = ''
        $.each(data, function(index, value) {
            $price.push(value.price)
        })
        for (let i = 0; i < $price.length; i++) {
            let maxindex = i;
            let maxvalue = $price[i]
            for (let j = i + 1; j < $price.length; j++) {
                if (sort) {
                    if ($price[j] < maxvalue) {
                        maxindex = j;
                        maxvalue = $price[j];
                    }
                } else {
                    if ($price[j] > maxvalue) {
                        maxindex = j;
                        maxvalue = $price[j];
                    }
                }
            }
            if (maxindex != i) {
                let temp = $price[i];
                $price[i] = maxvalue;
                $price[maxindex] = temp

                let dataindex = data[i]
                data[i] = data[maxindex]
                data[maxindex] = dataindex
            }
        }
    }

    //渲染函数
    function main(data) {
        $NEW_show.empty();
        let str = ''
        $.each(data, function(index, value) {
            str += `                    
            <a href="details.html?sid=${value.sid}" target = '_blank'>
            <li>
                <img class="lazy" data-original="${value.url}" width="165px" height="165px"/>
                <p>${value.title}</p>
                <p>￥${value.price}</p>
            </li>
        </a>`
        })
        $NEW_show.append(str)

        //2.添加懒加载
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
    }
})(jQuery)