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
        url: 'http://localhost/JavaScript/converse/php/getsid.php' + sid,
        dataType: 'json'
    }).done(function(data) {
        let arr = data.smpic.split(',')
        let str = ''
        $.each(arr, function(index, value) {
            str += `<li><img src="${value}" alt=""></li>`
        })
        smpic.append(str)
        smimg.append(`<img src="${data.url}" alt="">`)
        $('.smpic li').on('click', function() {
            alert($(this).index())
        })
    })
})(jQuery)