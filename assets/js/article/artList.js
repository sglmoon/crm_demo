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

    var q = {
        pagenum: 1, // 当前页码值，默认请求第一页的数据
        pagesize: 5, // 分页大小，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }

    //获取列表
    function getList() {
        $.ajax({
                url: '/api/article/getList',
                method: 'GET',
                data: q,
                success: function(res) {
                    if (res.status !== 200) {
                        return layer.msg('获取列表失败')
                    }
                    dataList = res.data
                }
            })
            //加载模拟数据
        var list = dataList.slice((q.pagenum - 1) * q.pagesize, q.pagenum * q.pagesize)
        var html = template('tpl-table', { data: list })
        $('tbody').html(html)
        renderPage(dataList.length)
    }
    getList()

    //获取分类下拉框
    function initCate() {
        var cateList = [{ id: 1, name: '草稿' }, { id: 2, name: '已发布' }]
        $.ajax({
            url: '/api/article/getAticleCate',
            method: 'GET',
            success: function(res) {
                cateList = res.data
            }
        })
        var html = template('tpl-cate', { data: cateList })
        $('#selCate').html(html)
        form.render()
    }
    initCate()

    //查询
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
            // 根据最新的筛选条件，重新渲染表格的数据
        getList()
    })

    //渲染分页
    function renderPage(totalCount) {
        laypage.render({
            elem: 'pageBox',
            count: totalCount,
            curr: q.pagenum,
            limit: q.pagesize,
            limits: [2, 3, 5, 10],
            groups: 5, //页面个数，超出groups+2显示...
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            jump: function(obj, first) {
                //obj，即render的options
                //first,render渲染会先调用一次jump，首次条用时first=true
                q.pagenum = obj.curr
                q.pagesize = obj.limit
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
                url: '/api/article/delArticle',
                method: 'POST',
                data: {
                    id: id
                },
                success: function(res) {
                    if (res.status !== 200) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功')
                    getList()
                }
            })

            //模拟操作成功
            $.each(dataList, function(index, value) {
                if (value.id === id) {
                    dataList.splice(index, 1)
                    return false
                }
            })
            layer.close(index)
            if (len === 1) {
                q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
            }
            getList()
        })
    })

})

var dataList = [{
        id: 1,
        title: '全国疫情高风险再次清零',
        cateName: '防疫',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 2,
        title: '苹果打败橙子成为太空水果',
        cateName: '航空',
        state: '草稿',
        pubDate: new Date()
    }, {
        id: 3,
        title: '成都理科状元高考739分',
        cateName: '高考',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 4,
        title: '这些专业知识看上去相似',
        cateName: '高考',
        state: '草稿',
        pubDate: new Date()
    }, {
        id: 5,
        title: '中国代表批驳日本核污水排海',
        cateName: '国际',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 6,
        title: '航天员太空生活大揭秘',
        cateName: '航空',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 7,
        title: '中国世贸组织起诉澳大利亚',
        cateName: '国际',
        state: '草稿',
        pubDate: new Date()
    },
    {
        id: 11,
        title: '全国疫情高风险再次清零',
        cateName: '防疫',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 12,
        title: '苹果打败橙子成为太空水果',
        cateName: '航空',
        state: '草稿',
        pubDate: new Date()
    }, {
        id: 13,
        title: '成都理科状元高考739分',
        cateName: '高考',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 14,
        title: '这些专业知识看上去相似',
        cateName: '高考',
        state: '草稿',
        pubDate: new Date()
    }, {
        id: 15,
        title: '中国代表批驳日本核污水排海',
        cateName: '国际',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 16,
        title: '航天员太空生活大揭秘',
        cateName: '航空',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 17,
        title: '中国世贸组织起诉澳大利亚',
        cateName: '国际',
        state: '草稿',
        pubDate: new Date()
    },
    {
        id: 21,
        title: '全国疫情高风险再次清零',
        cateName: '防疫',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 22,
        title: '苹果打败橙子成为太空水果',
        cateName: '航空',
        state: '草稿',
        pubDate: new Date()
    }, {
        id: 23,
        title: '成都理科状元高考739分',
        cateName: '高考',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 24,
        title: '这些专业知识看上去相似',
        cateName: '高考',
        state: '草稿',
        pubDate: new Date()
    }, {
        id: 25,
        title: '中国代表批驳日本核污水排海',
        cateName: '国际',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 26,
        title: '航天员太空生活大揭秘',
        cateName: '航空',
        state: '已发布',
        pubDate: new Date()
    }, {
        id: 27,
        title: '中国世贸组织起诉澳大利亚',
        cateName: '国际',
        state: '草稿',
        pubDate: new Date()
    }
]