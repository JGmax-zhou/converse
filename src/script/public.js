//1.获取随机区间数
function ranNum(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

//2.封装函数实现获取任意的css样式
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

//3.获取元素对象。
function $(selector, all) {
    if (!all) {
        return document.querySelector(selector); //单个
    } else {
        return document.querySelectorAll(selector) //多个
    }
}

//4.缓冲运动
function bufferMove(obj, json, fn) {
    var speed = null;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;
        for (var attr in json) {
            var currentvalue = null;
            if (attr === 'opacity') {
                currentvalue = Math.round(getStyle(obj, attr) * 100);
            } else {
                currentvalue = parseInt(getStyle(obj, attr)); //带单位的
            }
            speed = (json[attr] - currentvalue) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (currentvalue !== json[attr]) {
                if (attr === 'opacity') {
                    obj.style.opacity = (currentvalue + speed) / 100;
                    obj.style.filter = 'alpha(opacity = ' + (currentvalue + speed) + ')';
                } else {
                    obj.style[attr] = currentvalue + speed + 'px';
                }
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            fn && fn();
        }
    }, 10);
};

//5.ajax交互
function objtostring(obj) {
    let arr = [];
    for (let i in obj) {
        arr.push(i + '=' + obj[i]);
    }
    return arr.join('&')
}

function $ajax(option) {
    let ajax = new XMLHttpRequest();
    //1.请求方式：post和get  默认是get
    option.type = option.type || 'get';

    //2.接口地址：不能为空。
    if (!option.url) {
        throw new Error('请输入接口地址');
    }
    //3.传输数据：数组是否存在，数组支持拼接的，对象格式会有问题。
    //3.1get:地址栏后面?和&
    if (option.data) { //数据存在
        if (Object.prototype.toString.call(option.data).slice(8, -1) === 'Object') { //是对象
            option.data = objtostring(option.data)
        }
    }
    //3.2数据存在，同时是get请求
    if (option.data && option.type === 'get') {
        option.url += '?' + option.data
    }

    //4.是否异步
    if (option.async === false || option.async === 'false') {
        option.async = false;
    } else {
        option.async = true;
    }

    ajax.open(option.type, option.url, option.async);

    //3.3数据存在，同时是post请求
    if (option.data && option.type === 'post') {
        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        ajax.send(option.data);
    } else {
        ajax.send();
    }

    //5.如果是同步无需监听的，异步才监听。
    if (option.async) { //异步监听就绪状态码
        ajax.onreadystatechange = function() {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    //6.通过回调函数调用将接口的数据传给success。
                    option.success && typeof option.success === 'function' && option.success(ajax.responseText);
                } else {
                    option.error && typeof option.error === 'function' && option.error('你的接口地址有误');
                }
            }
        }
    } else { //同步顺序执行
        if (ajax.status === 200) {
            //6.通过回调函数调用将接口的数据传给success。
            option.success && typeof option.success === 'function' && option.success(ajax.responseText);
        } else {
            option.error && typeof option.error === 'function' && option.error('你的接口地址有误');
        }
    }
}

function $ajaxpromise(option) {
    let promise = new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        //1.请求方式：post和get  默认是get
        option.type = option.type || 'get';

        //2.接口地址：不能为空。
        if (!option.url) {
            throw new Error('请输入接口地址');
        }
        //3.传输数据：数组是否存在，数组支持拼接的，对象格式会有问题。
        //3.1get:地址栏后面?和&
        if (option.data) { //数据存在
            if (Object.prototype.toString.call(option.data).slice(8, -1) === 'Object') { //是对象
                option.data = objtostring(option.data)
            }
        }
        //3.2数据存在，同时是get请求
        if (option.data && option.type === 'get') {
            option.url += '?' + option.data
        }

        //4.是否异步
        if (option.async === false || option.async === 'false') {
            option.async = false;
        } else {
            option.async = true;
        }

        ajax.open(option.type, option.url, option.async);

        //3.3数据存在，同时是post请求
        if (option.data && option.type === 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(option.data);
        } else {
            ajax.send();
        }

        //5.如果是同步无需监听的，异步才监听。
        if (option.async) { //异步监听就绪状态码
            ajax.onreadystatechange = function() {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        resolve(ajax.responseText);
                    } else {
                        reject('你的接口地址有误');
                    }
                }
            }
        } else { //同步顺序执行
            if (ajax.status === 200) {
                resolve(ajax.responseText);
            } else {
                reject('你的接口地址有误');
            }
        }
    });

    return promise; //返回promise实例，使用then和catch方法。
};

//cookie读写删封装。
let cookie = {
    set: function(key, value, day) {
        let d = new Date();
        d.setDate(d.getDate() + day);
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${d};path=/`;
    },
    get: function(key) {
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let value of arr) {
            let newarr = value.split('=');
            if (key === newarr[0]) {
                return newarr[1];
            }
        }
    },
    remove: function(key) {
        cookie.set(key, '', -1);
    }
}