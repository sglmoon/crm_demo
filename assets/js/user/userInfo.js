$(function() {
    //设置昵称校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickName: [
            /^\S.{0,8}\S+$/,
            '昵称长度必须在1~8个字符直接，且首尾不能出现空格！'
        ]
    })

    //加载用户信息
    function getUserInfo() {
        $.ajax({
            url: '/api/user/info',
            method: 'GET',
            success: function(res) {
                if (res.code !== 1) return layer.msg('获取信息失败，请刷新页面！');
                // $('[name=userName]').val(userInfo.userName)
                // $('[name=nickName]').val(userInfo.nickName)
                // $('[name=email]').val(userInfo.email)
                //layui表单快速赋值,layui表单添加lay-filter属性
                form.val('form_info', res.data)
            }
        })
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
        $.ajax({
            url: '/api/user/update',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 1) return layer.msg('保存失败！')
                layer.msg('保存成功！')
                window.parent.getUserInfo()
            }
        })

    })
})