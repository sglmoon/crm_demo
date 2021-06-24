$(function() {

    getCateList()


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
            url: '/api/article/addCate',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 200) {
                    return layui.layer.msg('添加失败！')
                }
                layui.layer.msg('添加成功')
                    // 关闭弹窗，刷新列表
                getCateList()
                layui.layer.close(indexAdd)
            }
        })
        layui.layer.close(indexAdd)
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
            url: '/api/article/getCateInfo',
            method: 'GET',
            data: {
                id: id
            },
            success: function(res) {
                layui.form.val('form_edit', res.data)
            }
        })

        //加载模拟数据
        var cateInfo = {
            id: 101,
            name: 'NBA',
            alias: '职业篮球协会',
            createDate: '2021-06-24'
        }
        layui.form.val('form_edit', cateInfo)
    })

    $('body').on('submit', '#form_edit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/article/editCate',
            method: 'POST',
            data: layui.form.val('form_edit'),
            success: function(res) {
                if (res.status !== 200) {
                    return layui.layer.msg('修改失败！')
                }
                layui.layer.msg('修改成功！')
                getCateList()
                layui.layer.close(indexEdit)
            }
        })
        layui.layer.close(indexEdit)
    })

    //删除
    $('tbody').on('click', '.btn-del', function(e) {
        var id = $(this).data('id')
        layui.layer.confirm('确认删除?', {
            title: '提示',
            icon: 3
        }, function(index) {
            $.ajax({
                url: '/api/article/delCate',
                method: 'POST',
                data: {
                    id: id
                },
                success: function(res) {
                    if (res.status !== 200) {
                        return layui.layer.msg('删除失败！')
                    }
                    layui.layer.msg('删除成功！')
                    getCateList()
                    layui.layer.close(index)
                }
            })
        })
    })

})

var cateData = [{
        id: 101,
        name: 'NBA',
        alias: '职业篮球协会',
        createDate: '2021-06-24'
    },
    {
        id: 102,
        name: '军事',
        alias: '环球军事',
        createDate: '2021-06-24'
    },
    {
        id: 103,
        name: '航空',
        alias: '国际空间站',
        createDate: '2021-06-24'
    }
]



function getCateList() {
    //模拟数据
    $.ajax({
        url: '/api/article/getCateList',
        method: 'GET',
        success: function(res) {
            if (res.status !== 200) {
                return layui.layer.msg('获取列表失败')
            }
            cateData = res.data
        }
    })

    //模板引擎，渲染列表数据
    var listHtml = template('tpl_tb', { data: cateData })
        //渲染列表
    $('#cateList').html(listHtml)
}