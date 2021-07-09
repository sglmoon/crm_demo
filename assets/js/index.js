$(function() {
    //获取用户信息
    getUserInfo()
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

//获取用户信息，正常系统，需要动态加载左侧菜单栏
function getUserInfo() {
    $.get('/api/user/info', function(res) {
        if (res.code !== 1) {
            return layui.layer.msg('获取用户信息失败！')
        }
        renderUserInfo(res.data)
    })
}

function renderUserInfo(userInfo) {
    var name = userInfo.nickName || userInfo.userName
    $('#userName').html(name)
    if (userInfo.userPic) {
        $('#userPhoto')
            .attr('src', userInfo.userPic)
            .show()
        $('.text-avatar').hide()
    } else {
        $('#userPhoto').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}