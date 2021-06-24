$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //选择文件
    $('#btnChoose').on('click', function() {
        $('#file1').click()
    })
    var file = null
    $('#file1').on('change', function(e) {
        if (e.target.files.length) {
            file = e.target.files[0]
        }
        //创建一个imgURL
        var newImgURL = URL.createObjectURL(file)
            //切换cropper的剪切图片
            //1、销毁当前剪切图片
            //2、替换新图片路径
            //3、重新创建裁剪区域
        $image
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    })

    //上传图片
    // cropper提供base64图片字符串获取方式
    $('#btnUpload').on('click', function() {
        var base64Str = $image
            .cropper('getCroppedCanvas', {
                //创建一个100*100像素的画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') //将画布转换成base64字符串
        $.ajax({
                url: 'api/user/avatarChange',
                method: 'POST',
                data: {
                    avatar: base64Str
                },
                success: function(res) {
                    if (res.status !== 200) {
                        return layui.layer.msg('图像切换失败！')
                    }
                    //更新index的用户图像
                }
            })
            //模拟数据，更新图像
        window.parent.renderUserInfo({
            userName: 'admin',
            photo: base64Str
        })
    })

})