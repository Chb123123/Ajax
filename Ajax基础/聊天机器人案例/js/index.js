$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    // resetui()
    // 点击发送 将输入框中的内容添加在聊天框中
    $('#send').on('click', function () {
        if ($('#input-text').val().trim().length > 0) {
            var lis = $('<li class="chat-right"> <img src="image/R-C1.jpg" alt=""><span>' + $('#input-text').val() + ' <i><img src="image/corner02.png" alt=""></i></span></li>')
            $('.chat-box').append(lis)
            // 清空输入框内容
        } else {
            alert('输入框内容为空')
        }
        $('#input-text').val('')
        // resetui()
    })
    // 点击回车 将输入框的内容发送到 聊天框
    $('#input-text').on('keyup', function (event) {
        if (event.keyCode == 13) {
            if ($('#input-text').val().trim().length > 0) {
                var lis = $('<li class="chat-right"> <img src="image/R-C1.jpg" alt=""><span>' + $('#input-text').val() + ' <i><img src="image/corner02.png" alt=""></i></span></li>')
                $('.chat-box').append(lis)
                // 清空输入框内容
            } else {
                alert('输入框内容为空')
            }
            $('#input-text').val('')
            getMag($('#input-text').val())
        }
    })
    // 发起请求获取聊天信息
    function getMag(text) {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                spoken: text
            },
            // 获取请求 将请求的数据渲染页面
            success: function (res) {
                if (res.message === 'success') {
                    var lis1 = $('<li class="chat-left"> <img src="image/R-C.jpg" alt=""><span>' + res.data.info.text + ' <i><img src="image/corner01.png" alt=""></i></span></li>')
                    $('.chat-box').append(lis1)
                }
            }
        })
    }

})