$(function () {
    function getBookList() {
        $.get('http://www.liulongbin.top:3006/api/getbooks', function (res) {
            if (res.status !== 200) return alert('获取数据失败')
            var rows = []
            $.each(res.data, function (i, e) {
                rows.push('<tr><td>' + e.id + '</td><td>' + e.bookname + '</td><td>' + e.author + '</td><td>' + e.publisher + '</td><td><a href="javascript:;" class="remove" data-id = ' + e.id + '>删除</a></td></tr>')
            })
            $('#tbody').empty().append(rows)
        })
    }
    // 删除图书函数
    function delBook(id1) {
        $.get('http://www.liulongbin.top:3006/api/delbook', { id: id1 }, function (res) {
            if (res.status !== 200) return alert('删除图书失败')
            alert('删除成功')
            getBookList()
        })
    }
    getBookList()
    $('#tbody').on('click', '.remove', function () {
        // $(this).parent().parent().remove()
        // $(this).parents('tr').remove()
        // 获取自定义属性id
        var id = $(this).attr('data-id')
        // console.log(id)
        delBook(id)
        // $.get('http://www.liulongbin.top:3006/api/delbook',{id:id},function(res){
        //     if(res.status !== 200)return alert('删除失败')
        //     getBookList()
        // })
    })
    // 点击添加图书 将表单的数据发送到服务器
    $('#addbook').on('click', function () {
        $.post('http://www.liulongbin.top:3006/api/addbook', {
            bookname: $('#ipbookname').val(),
            author: $('#ipAuthor').val(),
            publisher: $('#iptpublisher').val()
        }, function (res) {
            if (res.status !== 201) return alert('添加图书失败')
            alert('添加图书成功')
            getBookList()
            // console.log(res)
        })
        // 将修改后的表单修饰页面
        // 清空添加图书的表单
        $('#ipbookname').val('')
        $('#ipAuthor').val('')
        $('#iptpublisher').val('')
    })
})