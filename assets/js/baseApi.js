$.ajaxPrefilter(function(options) {
    //统一设置ajax的请求更目录
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})