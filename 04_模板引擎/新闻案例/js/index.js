$(function () {
    // 定义一个格式化时间的函数
    template.defaults.imports.dataFormat = function (dtSte) {
        var dt = new Date(dtSte)
        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        var d = dt.getDate()
        var h = dt.getHours()
        h = h < 10 ? '0' + h : h
        var mm = dt.getMinutes()
        mm = mm < 10 ? '0' + mm : mm
        var s = dt.getSeconds()
        s = s < 10 ? '0' + s : s
        return y + '-' + m + '-' + d + '-' + h + ':' + mm + ':' + s
    }
    function getNew() {
        $.get('http://www.liulongbin.top:3006/api/news', function (res) {
            if (res.status !== 200) {
                return alert('获取新闻列表失败')
            } else {
                console.log(res)
                // 清空原有的新闻
                $('.new-container').empty()
                console.log(res.data)
                // $.each(res.data,function(i,e){
                //     var lis = $('<li>'+e.img+'<div class="new"><h3>'+e.title+'</h3><span>特朗普</span><span>特朗普</span><span>特朗普</span><p>'+e.tags+'</p><div class="num">评论数量：'+e.cmtcount+'</div></div></li>')
                //     $('.new-container').append(lis)
                //     console.log(e.img)
                // })
                // 将新闻转为数组
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].tags = res.data[i].tags.split(',')
                }
                var addnew = template('addnwe', res)
                $('.new-container').html(addnew)
            }
        })
    }
    getNew()
})