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