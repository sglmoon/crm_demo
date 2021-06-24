$(function() {
    //设置昵称校验规则
    var form = layui.form
    form.verify({
        nickName: [
            /^\S.{0,4}\S+$/,
            '昵称长度必须在1~6个字符直接，且首尾不能出现空格！'
        ]
    })

    //模拟数据，ajax的远程服务随时可能停机
    var userInfo = {
        id: 10001,
        userName: 'admin001',
        nickName: '系统管理员',
        email: '197@163.com'
    }

    //加载用户信息
    function getUserInfo() {
        $.ajax({
                url: 'api/user/getUserInfo',
                method: 'GET',
                success: function(res) {
                    if (res.status === 200) {
                        userInfo = res.data
                    } else {
                        layui.layer.msg('获取信息失败，请刷新页面！')
                    }
                }
            })
            // $('[name=userName]').val(userInfo.userName)
            // $('[name=nickName]').val(userInfo.nickName)
            // $('[name=email]').val(userInfo.email)
            //layui表单快速赋值,layui表单添加lay-filter属性
        form.val('form_info', userInfo)
    }
    getUserInfo()

    //重置表单数据
    $('#btnReset').on('click', function(e) {
        //阻止表单默认重置行为
        e.preventDefault()
        getUserInfo()
    })

    //保存
    $('#form_info').on('submit', function(e) {
        e.preventDefault()
            //获取表单数据
        var data = form.val('form_info')
        userInfo = data
        $.ajax({
            url: '',
            method: 'POST',
            success: function(res) {
                if (res.status === 200) {
                    layui.layer.msg('保存成功！')
                } else {
                    layui.layer.msg('保存失败！')
                }
            }
        })
        window.parent.renderUserInfo(userInfo)
    })
})