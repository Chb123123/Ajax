## （1） Ajax 基础

### 1.1 用户获取数据的原理：

客户机发送请求 服务器处理请求 服务器响应请求

### 1.2 jQuery中的Ajax

$.get() : 获取数据

$.get() 语法：$.get(url, [data], [callback])

| 参数名   | 参数类型 | 是否必选 | 说明                 |
| -------- | -------- | -------- | -------------------- |
| url      | string   | 是       | 请求的url地址        |
| data     | string   | 否       | 请求资源要携带的参数 |
| callback | function | 否       | 请求成功的回调函数   |

$.post(): 向服务器发送数据

$.post()语法： $.post(url, [data],[callback])

| 参数名   | 参数类型 | 是否必选 | 说明                     |
| -------- | -------- | -------- | ------------------------ |
| url      | string   | 是       | 提交数据的url地址        |
| data     | objext   | 否       | 要提交的时间             |
| callback | function | 否       | 数据提交成功时的回调函数 |

$.Ajax() : 请求成功后的回调函数

$.Ajax()语法:

```javascript
$.ajax({
    type: '' 请求类型 例如 get/post
    url: '' 请求的url地址
    data: {} 请求携带的数据
    success: function(){} 请求成功的回调函数
})
```

### 2.1 接口

#### 接口的概念

我们在使用Ajax请求数据的url 地址，就叫做数据接口（俗称接口），同时每个接口必须要有请求方式

#### 接口的组成方式

1. 接口名称：用来标识各个接口的简单说明 例如登录接口，获取图书列表接口
2. 接口的url地址：接口的调用地址
3. 调用方式：接口的调用方式 例如get/post
4. 参数格式：接口想要传递的参数，每个参数必须包含参数名称、参数类型、是否必选、参数说明这四项内容
5. 响应式格式：接口的返回值的详细描述，一般包含数据名称、数据类型、说明3项内容
6. 返回示例（可有可无）：通过对象的形式，距离服务器返回数据的结构

### 2.2  表单    from

表单当中的target属性的作用

| 值        | 描述                       |
| --------- | -------------------------- |
| _blank    | 点击提交，在新窗口打开     |
| _self     | （默认）在相同的框架打开   |
| _parent   | 在父框架集中打开（不常用） |
| _top      | 在整个窗口打开（不常用）   |
| framaname | 在指定的窗口打开（不常用） |

####  表单中的 method = 'get/post'

在提交一些重要数据时 最好使用post 在url地址栏看不到提交的内容

get方式适合用来提交少量的数据，简单的数据

post方式适合用来提交大量的、复杂的、或包含文件上传的数据

#### 表单中的    enctype

enctype 属性用来规定在 发送表单数据之前任何对数据进行编码

它有三个可选值 默认情况下 enctype 的值为applicaton/x-www-from-urlencoded（默认），表示在发送前编码使用的字符

| 值                               | 描述                                                       |
| -------------------------------- | ---------------------------------------------------------- |
| applicaton/x-www-from-urlencoded | 在发送前编码使用的字符（默认）                             |
| multiparty/from-data             | 不对字符编码，在使用包含文件上传控件的表单时，必须使用该值 |
| text/plain                       | 空格转化为"+"号，但不对特殊符号编码（很少有）              |

如果涉及到文件上传 必须将 enctype 的值设置为multiparty/from-data

如果提交的表单不涉及文件上传的操作 则直接将enctype设置为 applicaton/x-www-from-urlencoded（默认）

### 2.3   模板引擎

通过数据和模板组合而成

#### 模板引擎的好处：

1. 减少了字符串的拼接操作
2. 使代码结构更加清晰
3. 使代码结构更加清晰

#### art-template 模板引擎的使用

1. 导入 art-template 
2. 定义数据
3. 定义模板
4. 调用template
5. 语法：

```javascript
<body>
	<div class="container"></div>
</body>
<script type="text/html" id="uname">
        <!-- 双括号代表占位符 -->
        <h1>{{name}} ---------------  {{age}}</h1> 
    </script>
    <script>
        // 定义需要渲染的数据
        var data = {name: '张三',age: 18}
        // 调用 tmmplate 函数
        var html = template('uname',data)
        console.log(html)
        $('.container').html(html)
    </script>
```

#### 标准语法 - 输出

```javascript
{{value}}
{{obj.key}}
{{obj['key']}}
{{a ? b :c}}
{{a || b}}
{{a + b}}
```

#### 标准语法 - 原文输出

如果输出的内容带有 标签 则 需要添加 @ 符号让页面正常渲染

语法 ： {{ @ value}}  

```javascript
{{@text}} // 输出的是 原文输出 如果不带@ 则会把标签当成字符串输出到页面
var data = {text: '<h2>原文输出</h2>'}
```

#### 标准语法 - 条件输出

如果实现条件输出 则可以在 {{}} 当中使用 if ..else if .../if的方式，进行按需输出

```javascript
{{if value}} 按需输出内容{{/if}}
{{if v1}} 按需输出内容 {{else if v2}} 按需输入内容{{/if}}
```

#### 标准输出 - 循环输出

如果要实现循环输出，则可以在 {{}}内，通过each 语法循环数组，当前循环的索引号使用$index 进行访问，当前的循环使用$value 进行访问

```javascript
{{each arr}}
	{{$index}} {{$value}}
{{/each}}
```

#### 标准语法 - 过滤器

语法：{{value | filterName}}

定义过滤器的基本语法

```javascript
template.defaults.imports.filterName = function(value){/* return处理的结果 */}
例题如下 定义一个格式化时间的过滤器
<div>注册的时间：{{regTime | dateFormat}}</div>
// 定义一个过滤器
            template.dafaults.imports.dateFormat = function(data){
                var y = data.getFullYear()
                var m = data.getFullMonth() + 1
                var d = data.getFullDate()
                return y + '-' + m + "-" +d
            }
```

#### 正则表达式

exec() 用来检索字符串中正则表达式的匹配

如果字符中有匹配的值 则返回该匹配的值 如果没有 则返回 null

```javascript
语法：要匹配的值.exec(匹配的字符串)
var str = 'hello'
var pattern  = /o/
console.log(pattern.exec(str))
```

提取分组的内容

```javascript
var str = '<div>我是傻逼{{name}}</div>'
var pattern = /{{([a-zA-Z]+)}}/  // 小括号代表将匹配到的元素提取出来
console.log(pattern.exec(str)) //将提取出的数据打印出来
```

字符串的replace() 函数

replace() 函数用于在字符中用一些字符替换另一些字符 格式如下：

```javascript
var result = '123456'.replace('123','abc') //将匹配到的字符"123"替换成 "abc"
```

多次replace 操作

```javascript
var str = '<div>我是{{name}}，今年:{{age}}</div>'
        var pattenrn = /{{\s*([a-zA-Z]+)\s*}}/ // \s* \s* 用来去除字符中的空格 * 代表多次
        // 第一次匹配
        var src1 = pattenrn.exec(str)
        str = str.replace(src1[0],src1[1])
        console.log(str)
        // 第二次匹配
        var src2 = pattenrn.exec(str)
        str = str.replace(src2[0],src2[1])
        console.log(str)
        // 第三次匹配
        src3 = pattenrn.exec(str)
        console.log(src3)
```

利用循环进行多次 replace() 操作

```javascript
var str = '<div>今天{{date}},天气{{sun}},我的名字是{{name}},我的年纪{{age}}</div>'
        var patten = /{{\s*([a-zA-Z]+)\s*}}/
        var pattenrn = null
        while(pattenrn = patten.exec(str)){
            str = str.replace(pattenrn[0],pattenrn[1])
        }
        console.log(str)
```

replace() 将匹配的值替换为真值

```javascript
var str = '<div>今天{{date}},天气{{sun}},我的名字是{{name}},我的年纪{{age}}</div>'
        var patten = /{{\s*([a-zA-Z]+)\s*}}/
        var pattenrn = null
        var data = {data: '星期四',sun: '凉爽',name: '老赵',age: 15 }
        while(pattenrn = patten.exec(str)){
            str = str.replace(pattenrn[0],data[pattenrn[1]])
        }
        console.log(str)
```

#### 实现简易的模板引擎

1. 定义模板结构
2. 预调用模板引擎
3. 封装 template 函数
4. 导入并使用自定义模板引擎

## （2）Ajax进阶

### 1.1 XMLHTTPRequest 的基本使用

#### 使用xhr 发起get请求

1. 创建 xhr 对象
2. 调用 xhr.open() 函数
3. 调用 xhr.send() 函数
4. 监听 xhr.onreadystatechange 事件

```javascript
// 创建一个 xhr 对象
        var xhr = new XMLHttpRequest()
        // 调用 open 函数 指定 请求方式 与 url 地址
        xhr.open('get','http://www.liulongbin.top:3006/api/getbooks')
        // 调用 send() 函数 发起 Ajax 请求
        xhr.send()
        // 监听 onreadystatechange 事件
        xhr.onreadystatechange = function(){
            // 监听xhr的请求状态 readyState 与服务器响应的状态 status
            if(xhr.readyState ===4 && xhr.status === 200){   // 当前的status == 200为固定数据 和返回的数据不是同一个 表示获取数据请求成功
                // 打印响应服务器回来的数据
                console.log(xhr.responseText)
            }
        }
```

#### XMLHttpRequset() 发起post请求

```javascript
// 创建 xhr 对象
			var xhr = new XMLHttpRequest();
			// 调用 open函数
			xhr.open("post", "http://www.liulongbin.top:3006/api/addbook");
			// 设置 Content-type 属性(固定写法)
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			// 调用send 函数
			xhr.send("bookname=水浒传&author=老赵&publisher=家里");
			xhr.onreadyStatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					console.log(xhr.responseText);
				}
			};
```



#### readyState属性

| 值   | 状态             | 描述                                               |
| ---- | ---------------- | -------------------------------------------------- |
| 0    | UNSENT           | XMLHttpRequest方法已经被创建，但尚未调用 open 函数 |
| 1    | OPENED           | open 函数已经被调用                                |
| 2    | HEADERS_RECEIVED | send() 方法已经被调用，响应头也已经被接收          |
| 3    | LOADING          | 数据接收中，此时 response 属性中已经包含部分数据   |
| 4    | DONE             | Ajax请求完成，在意味着数据传输已经彻底完成或者失败 |

#### 查询字符串

什么是查询字符串：

查询字符串是指在url的末尾加上用于向服务器发送信息的字符串（变量）

格式：将英文的？放在url的末尾，然后在加上 参数=值，想要加上多个参数的值可以用&分隔。以这个形式，可以将想要发送到服务器的数据添加到url中

#### url编码

url地址中不允许出现中文字符，如果url 需要包含中文这样的字符 ，则必须对中文进行编码

encodeURl() 编码函数

decodeURI() 解码函数

#### XML 的概念

xml是可扩展标记语言 因此 XML 和 HTML 类似

缺点：体积大 格式雍肿 在javascript 中解析比较麻烦

#### JSON概念

JSON 就是 JavaScript 对象和数组的字符串表示法，它使用文本表示一个JS对象或组的信息，因此JSON本质就是字符串

优点：轻量级 在作用上类似XML 专门用于存储和传输数据，但是 JSON 比XML 更小  更快 更易解析

格式：

对象结构：对象结构在 JSON 中表示为 { } 括起来的内容。数据结构为 { key: value, key: value, … } 的键值对结构。其中，key 必须是使用英文的双引号包裹的字符串，value 的数据类型可以是数字、字符串、布尔值、null、数组、对象6种类型

#### JSON 转换为 js

parse()方法： JSON.parse()

```javascript
var jsonstr = '{"a":"abc","b": 12,"c":"你好"}'
var obj = JSON.parse(jsonstr)
```

#### js对象转换为 JSON 

stringify()方法:    JSON.stringify()

```javascript
var obj = {a:1,b:'123',c:'你好'}
var jsonstr = JSON.stringify(obj)
```

#### 序列化和反序列化

把数据转化为字符串的过程 叫做序列化 比如调用JSON.stringify() 函数

把字符串转化为数据对象的过程 叫做反序列化 例如调用JSON.stringify() 函数

#### XMLHttpRequest LeveI2 的新特性

新功能：

1. 可以设置请求的时限
2. 可以使用FromData 对象管理表单数据
3. 可以上传文件
4. 可以获取数据传输的进度信息

设置时限 timeout

xhr.timeout = 3000   //毫秒

```javascript
//写在定义 xhr 后面
xhr.timeout = 3000
        xhr.ontimeout = function(){
            console.log('请求失败')
        }
```

FormData 对象管理表单数据

```javascript
// 新建一个 FormDate对象
        var fd = new FormData()
        // 为 FormData 添加表单项
        fd.append('uname','张三')
        fd.append('upwd','123456')
        // 创建 xhr 对象
        var xhr = new XMLHttpRequest()
        // 指定请求类型
        xhr.open('get','http://www.liulongbin.top:3006/api/getbooks')
        // 直接提交
        xhr.send(fd)
```

FormData() 获取表单的值

```javascript
// 获取表单元素
var form = document.querySelector('#form1')
        // 监听表单元素的 submit 事件
        form.addEventListener('submit',function(e){
            // 禁止表单的默认行为
            e.preventDefault()
            // 将表单获取到的数据传递到 创建的表单项
            var fd = new FormData(form)  // form 为获取的表单元素
            var xhr = new XMLHttpRequest()
            xhr.open('post','http://www.liulongbin.top:3006/api/formdata')
            xhr.send(fd)
            xhr.onreadystatechange = function(){
                console.log(xhr.responseText)
            }
        })
```

#### 向服务器上传文件

```javascript
	// 获取上传文件的按钮
			var btn = document.querySelector("#btn");
			btn.addEventListener("click", function () {
				var files = document.querySelector("#file1").files;
				if (files.length <= 0) {
					alert("请选择上传的文件");
				} else {
					// 创建 FormData 对象
					var fd = new FormData();
					// 向 FormData 追加文件
					fd.append("avatar", files[0]);
                    // 创建 xhr 对象
                    var xhr = new XMLHttpRequest()
                    xhr.open('post','http://www.liulongbin.top:3006/api/upload/avatar')
                    xhr.send(fd)
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState === 4 && xhr.status === 200){
                            var data = JSON.parse(xhr.responseText)
                            if(data.status === 200){
                                // 文件上传成功
                                console.log(data)
                                // 将服务器返回的图片地址设置为 img 标签的 src 属性
                                document.querySelector('#img').src= 'http://www.liulongbin.top:3006'+data.url
                            }else{
                                alert('文件上传失败')
                            }
                        }
                    }
				}
			});
```

#### 显示文件上传的进度

```javascript
var xhr = new XMLHttpRequest();
// 监听 xhr.upload 的 onprogress 事件
xhr.upload.onprogress = function (e) {
    if(e.lengthComputable){
        var procent = Math.ceil(( e.loaded/e.total ) * 100) //e.loaded 上传了多少 e.total文件大小为多少
          console.log(procent)
  }
};
```

#### jQuery实现文件上传

```javascript
 $.ajax({
                    method: 'post',
                    url: 'http://www.liulongbin.top:3006/upload/avatar',
                    data: fd,
     				//上传文件一定要加下面两段代码
                    processData: false,
                    contentType: false,
                    success: function(res){
                        console.log(res)
                    }
                })
```

####  jQuery实现loading效果

```javascript
当 ajax发起时显示loading效果
$(document).ajaxStart(function() {
     $('#loading').show()
 })
当ajax请求结束时隐藏 loading效果
 $(document).ajaxStop(function() {
     $('#loading').hide()
 })
```

#### axios库

专注于网络数据请求的库

相比于jQuery.js 的ajax 体积更小 简单易用

axios发起get请求

```javascript
<button class="btn">发起get请求</button>
    <script>
        var btn = document.querySelector('.btn')
        btn.addEventListener('click',function(){
            var url = 'http://www.liulongbin.top:3006/api/get'
            var paramsObj = {
                name:'zs',
                age: 18
            }
            axios.get(url,{params: paramsObj}).then(function(res){
                console.log(res.data)
            })
        })
    </script>
```

axios发起post请求

```javascript
<button id="btn1">发起post请求</button>
var btn1 = document.querySelector('#btn1')
        btn1.addEventListener('click',function(){
            var url = 'http://www.liulongbin.top:3006/api/post'
            var dataObj = {name: 'laozhao',location: '上海',address: '老铁'}
            axios.post(url,dataObj).then(function(res){
                console.log(res)
            })
        })
```

axios发起ajax请求

```javascript
axios({
     method: '请求类型',
     url: '请求的URL地址',
     data: { /* POST数据 */ },
     params: { /* GET参数 */ }
 }) .then(callback)
```

### （3）同源和跨越

#### 同源的概念：

指两个页面有相同的端口、协议、域名 则被称为同源

#### 跨域的概念：

两个页面的端口、协议、域名其中的任意一项不相同、则被称为跨域

#### 同源策略

是浏览器的安全策略，主要用来隔离潜在恶意文件的安全机制

浏览器允许发起跨域的请求，但是返回的数据会被浏览器的同源策略所拦截

#### JSONP:为了解决跨越问题

JSONP的原理：通过<script>的src 属性，请求跨域的数据接口，并接收跨域响应回来的数据

JSONP只支持get请求 不支持 post请求

JSONP 与 ajax 没有任何关系

#### 防抖和节流

节流的概念： 防止同一件事情多次的触发

节流的应用场景： 降低事件触发的频率

### （4）HTTP协议加强

http协议：

#### 4.1什么是通信： 通信就是信息的传输和交换

#### 4.2通信三要素：

1. 通信的主体
2. 通信的内容
3. 通信的方式

#### 4.3互联网中的传输协议

网页内容称为超文本：因此网页内容传输协议也称为超文本传输协议

http请求消息也称为请求报文

##### http请求的组成部分：

1. 请求行

   请求行由：请求方式、url、http协议版本 三部分组成 它们之间用空格隔开

2. 请求头部

3. 空行

4. 请求体

   get 请求没有请求体 post 请求才有请求体

##### http响应消息

概念：服务器响应给客户端的消息

组成部分：

1. 状态行 

   状态行由 http协议版本、状态码、状态码的描述文本 三部分组成 它们之间由空格隔开

2. 响应头部

3. 空行

4. 响应体

##### http请求的方法

![image-20220416130336941](C:\Users\蔡怀彬\AppData\Roaming\Typora\typora-user-images\image-20220416130336941.png)

##### HTTP响应状态码的组成和分类

| 分类 | 分类描述                                     |
| ---- | -------------------------------------------- |
| 1**  | 信息，服务器收到请求，需要请求者继续执行操作 |
| 2**  | 成功，操作被成功接收并处理                   |
| 3**  | 重定向，需要进一步的操作以完成请求           |
| 4**  | 客户端错误，请求包含语法错误或无法完成请求   |
| 5**  | 服务器错误，服务器正在处理请求发生了错误     |

![image-20220416131951292](C:\Users\蔡怀彬\AppData\Roaming\Typora\typora-user-images\image-20220416131951292.png)

![image-20220416132121281](C:\Users\蔡怀彬\AppData\Roaming\Typora\typora-user-images\image-20220416132121281.png)
