$(function () {
    // 定义防抖
    var timsr = null
    // 定义防抖函数
    // 定义缓存对象
    var obj = {}
    function debounce(kw) {
        timsr = setTimeout(function () {
            getSuggestList(kw)
        }, 500)
    }
    $('#inputText').on('keyup', function () {
        // 用户按下键盘 清空发起的 JSONP 请求
        clearTimeout(timsr)
        var keywords = $(this).val().trim()
        if (keywords.length <= 0) {
            $('.menu').hide()
            // $('.menu').css('display', 'none')
            return getSuggestList(keywords)
        } else {
            $('.menu').show()
            // 先从本地查看是否有缓存列表
            console.log(obj[keywords])
            if(obj[keywords]){
                return getSuggestList(keywords)
            }
            // 发起JSONP 请求
            debounce(keywords)
            // getSuggestList(keywords)
            // console.log(keywords)
        }
    })
    function getSuggestList(kw) {
        $.ajax({
            url: 'https://suggest.taobao.com/sug?q=' + kw,
            dataType: 'jsonp',
            success: function (res) {
                // console.log(res)
                // 清空原有 li 添加新增的 li
                $('.menu').empty()
                var htmlstr = template('new', res)
                $('.menu').html(htmlstr)
                // 缓存建议的搜索列表
                // 获取用户输入的内容当作键
                var k = $('#inputText').val().trim()
                // 将数据作为值进行缓存
                obj[k] = res
            }
        })

    }
})