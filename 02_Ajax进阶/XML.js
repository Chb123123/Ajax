function resolveData(data) {
    var arr = []
    for (k in data) {
        var str = k + "=" + data[k]
        arr.push(str)
    }
    return arr.join('$')
}
function itheima(options) {
    var xhr = new XMLHttpRequest()
    var qs = resolveData(options.data)
    if (options.method.toUpperCase() === 'GET') {
        xhr.open('get', options.url + '?' + qs)
        xhr.send()
    } else if (options.method.toUpperCase() === 'POST') {
        xhr.open('post', options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-from-urlencoded')
        xhr.send(qs)
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var JSONstr = JSON.parse(xhr.responseText)
            options.success(JSONstr)
            // console.log(JSONstr)
        }
    }
}