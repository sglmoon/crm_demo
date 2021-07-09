$(function() {
    //自定义校验规则
    layui.form.verify({
        pwd: [
            /^\S{6,8}$/,
            '密码必须是6~8位以上非空格字符！'
        ],
        newPwd: function(value) {
            if ($('[name=pwd]').val() === value) {
                return '原密码和新密码不能相同！'
            }
        },
        rePwd: function(value) {
            if ($('[name=newPwd]').val() !== value) {
                return '两次密码不一致'
            }
        }
    })

    //重置密码
    $('#form_info').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/user/updatePwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 1) return layui.layer.msg('密码修改失败')
                layui.layer.msg('密码修改成功!');
                //重置表单
                $('#form_info')[0].reset()
            }
        })

    })

})