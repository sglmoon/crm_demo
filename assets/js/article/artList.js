$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

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

    //获取分类下拉框
    function initCate() {
        $.ajax({
            url: '/api/articleCate/getList',
            method: 'GET',
            success: function(res) {
                var html = template('tpl-cate', { data: res.data })
                $('#selCate').html(html)
                form.render()
            }
        })

    }
    initCate()

    var q = {
        pageNum: 1, // 当前页码值，默认请求第一页的数据
        pageSize: 5, // 分页大小，默认每页显示2条
        cateId: '', // 文章分类的 Id
        status: '' // 文章的发布状态
    }

    //获取列表
    function getList() {
        $.ajax({
            url: '/api/article/getList',
            method: 'GET',
            data: q,
            success: function(res) {
                if (res.code !== 1) {
                    $('tbody').html('')
                    renderPage(0)
                    return layer.msg('获取列表失败:' + res.msg)
                }
                var html = template('tpl-table', { data: res.data.list })
                $('tbody').html(html)
                renderPage(res.data.count)
            }
        })
    }
    getList()

    //查询
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中项的值
        var cateId = $('[name=cateId]').val()
        var status = $('[name=status]').val()
            // 为查询参数对象 q 中对应的属性赋值
        q.cateId = cateId
        q.status = status
            // 根据最新的筛选条件，重新渲染表格的数据
        getList()
    })

    //渲染分页
    function renderPage(totalCount) {
        laypage.render({
            elem: 'pageBox',
            count: totalCount,
            curr: q.pageNum,
            limit: q.pageSize,
            limits: [2, 3, 5, 10],
            groups: 5, //页面个数，超出groups+2显示...
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            jump: function(obj, first) {
                //obj，即render的options
                //first,render渲染会先调用一次jump，首次条用时first=true
                q.pageNum = obj.curr
                q.pageSize = obj.limit
                if (!first) {
                    getList()
                }
            }
        })
    }

    //删除
    $('tbody').on('click', '.btn-delete', function() {
        var len = $('.btn-delete').length
        var id = $(this).data('id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/api/article/delete',
                method: 'POST',
                data: {
                    uid: id
                },
                success: function(res) {
                    if (res.code !== 1) {
                        return layer.msg('删除失败:' + res.msg)
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pageNum = q.pageNum === 1 ? 1 : q.pageNum - 1
                    }
                    getList()
                }
            })
        })
    })

})