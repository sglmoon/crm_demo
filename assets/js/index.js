$(function() {
    //获取用户信息，正常系统，需要动态加载左侧菜单栏
    $.get('/api/getUserInfo', function(res) {
        if (res.status === 200) {
            console.log(res);
            renderUserInfo(res.data);
        }
    })

    function renderUserInfo(userInfo) {
        $('#userName').html(userInfo.userName)
        $('#userPhoto').attr('src', userInfo.photo)
    }
    //模拟数据
    var userInfo = {
        userName: 'admin',
        photo: '//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg'
    }
    renderUserInfo(userInfo)

    //退出
    $('#quit').on('click', function() {
        layui.layer.confirm('确认退出登录？', {
            icon: 3,
            title: '提示'
        }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layui.layer.close(index)
        })
    })

})