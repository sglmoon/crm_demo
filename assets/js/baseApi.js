$.ajaxPrefilter(function(options) {
    //统一设置ajax的请求更目录
    options.url = 'http://127.0.0.1:3000' + options.url;
    //统一设置权限token的请求头
    if (/\/api\//.test(options.url)) {
        if (!options.headers) options.headers = {}
        options.headers['Authorization'] = localStorage.getItem('token')
    }
})