$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.register-box').show()
    })
    $('#link_login').on('click', function() {
            $('.register-box').hide()
            $('.login-box').show()
        })
        //自定义layui表单校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
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
            username: $('#form_reg [name=userName]').val(),
            password: $('#form_reg [name=pwd]').val()
        }
        $.post('/api/auth/createUser', formData, function(res) {
            if (res.status !== 200) {
                console.log('注册失败')
                layer.msg('注册失败')
            } else {
                console.log('注册成功')
                layer.msg('注册成功')
            }
        })
    })
    $('#form_login').submit(function(e) {
        e.preventDefault();
        var formData = {
            username: $('#form_login [name=userName]').val(),
            password: $('#form_login [name=pwd]').val()
        }
        $.ajax({
                url: '/api/auth/login',
                method: 'POST',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 200) {
                        console.log('登录失败')
                        layer.msg('登录失败')
                        localStorage.setItem('token', res.token)
                    } else {
                        console.log('登录成功')
                        layer.msg('登录成功')
                    }
                }
            })
            //接口服务暂无时，测试token
        var token = localStorage.getItem('token')
        if (!token) localStorage.setItem('token', '123321')
        location.href = '/index.html'

    })
})