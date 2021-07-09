$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.register-box').show()
    })
    $('#link_login').on('click', function() {
        $('.register-box').hide()
        $('.login-box').show()
    });
    //自定义layui表单校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,18}$/, '密码必须6到18位，且不能出现空格'
        ],
        repwd: function(value, item) {
            var pwd = $('.register-box [name=pwd]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var formData = {
            userName: $('#form_reg [name=userName]').val(),
            pwd: $('#form_reg [name=pwd]').val()
        }
        $.post('/api/auth/regUser', formData, function(res) {
            if (res.code !== 1) {
                return layer.msg('注册失败:' + res.msg)
            }
            layer.msg('注册成功');
            //显示登陆页
            $('#link_login').click()
        })
    })
    $('#form_login').submit(function(e) {
        e.preventDefault();
        var formData = {
            userName: $('#form_login [name=userName]').val(),
            pwd: $('#form_login [name=pwd]').val()
        }
        $.ajax({
            url: '/api/auth/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 1) {
                    return layer.msg('登录失败:' + res.msg)
                }
                layer.msg('登录成功');
                //存储token,跳转首页
                localStorage.setItem('token', res.data)
                location.href = '/index.html'
            }
        })
    })
})