$(function() {
    //获取文章列表
    getCateList()

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //添加类型，弹窗层
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '新增分类',
            content: $('#dialog_add').html()
        })
    })

    //添加分类，弹窗动态添加的dom无法直接对元素进行事件绑定
    //通过jQuery的on进行事件代理绑定到body
    $('body').on('submit', '#form_add', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/articleCate/add',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 1) {
                    return layui.layer.msg('添加失败:' + res.msg)
                }
                layui.layer.msg('添加成功');
                // 关闭弹窗，刷新列表
                getCateList()
                layui.layer.close(indexAdd)
            }
        })
    })

    // 修改分类信息
    var indexEdit = null
        // 列表编辑按钮代理到tbody
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改分类',
            content: $('#dialog_edit').html()
        })

        //获取数据，加载信息
        var id = $(this).data('id')
        $.ajax({
            url: '/api/articleCate/info',
            method: 'GET',
            data: {
                uid: id
            },
            success: function(res) {
                layui.form.val('form_edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form_edit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/articleCate/update',
            method: 'POST',
            data: layui.form.val('form_edit'),
            success: function(res) {
                if (res.code !== 1) {
                    return layui.layer.msg('修改失败：' + res.msg)
                }
                layui.layer.msg('修改成功！')
                getCateList()
                layui.layer.close(indexEdit)
            }
        })
    })

    //删除
    $('tbody').on('click', '.btn-del', function(e) {
        var id = $(this).data('id')
        layui.layer.confirm('确认删除?', {
            title: '提示',
            icon: 3
        }, function(index) {
            $.ajax({
                url: '/api/articleCate/delete',
                method: 'POST',
                data: {
                    uid: id
                },
                success: function(res) {
                    if (res.code !== 1) {
                        return layui.layer.msg('删除失败:' + res.msg)
                    }
                    layui.layer.msg('删除成功！')
                    getCateList()
                    layui.layer.close(index)
                }
            })
        })
    })

})

//获取文章列表
function getCateList() {
    $.ajax({
        url: '/api/articleCate/getList',
        method: 'GET',
        success: function(res) {
            if (res.code !== 1) return layui.layer.msg('获取列表失败');
            //模板引擎，渲染列表数据
            var listHtml = template('tpl_tb', { data: res.data });
            //渲染列表
            $('#cateList').html(listHtml)
        }
    })
}