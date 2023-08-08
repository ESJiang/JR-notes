# Class Notes

## Resources

## Node_5 (`08/08/2023`)
<p align='center'><img src='../image/nodejs.png' width='30%' height='30%' /></p>

### 中间件
#### express 中间件的调用流程
当一个请求到达Express的服务器后, 连续调用多个中间件, 对这次请求进行预处理

#### express中间件的格式
<p align='center'><img src='../image/express middleware format.png' width='50%' height='50%' /></p>

#### next函数的作用
next函数是多个中间件调用的关键

<p align='center'><img src='../image/next function.png' width='50%' height='50%' /></p>


```js
const nw = function(req,res,next) {
    console.log("这是一个中间件函数");
    next();
}

app.use(nw);
```

#### 练习
```shell
npm init
npm i express && npm i nodemon -D
```

#### index.js
```js
const express = require("express");
const app = express();
const PORT = 8000;
// 定义一个最简单的中间件函数
function mw(req, res, next) {
    console.log("This is a middleware function");
    next();
};
// 注册成全局中间件
app.use(mw);
app.use((req,res,next) => {
    console.log("This is the second middleware");
    next();
})
app.get("/home",(req, res) => {
    console.log("Home Page");
    res.send("home page");
});
app.get("/users",  (req, res) => {
    console.log("users Page");
    res.send("users page");
})
app.listen(PORT, () => console.log("server is running on http://127.0.0.1:8000"));
```

*结论: 中间件先执行, 后执行router, 如果next()忘记写, postman会陷入死循环.*

#### index2.js
```shell
npm i moment
```

```js
const express = require("express");
const moment = require("moment");
const app = express();

// 定义全局中间件
app.use((req, res, next) => {
    const time = moment().format();
    req.startTime = time;
    next();
});

// 路由拿到全局中间件
app.get("/", (req, res) => {
    console.log("startTime ", req.startTime);
    res.send("home page " + req.startTime);
});

app.get("/users", (req, res) => {
    console.log("startTime ", req.startTime);
    res.send("user page " + req.startTime);
});

app.listen(8000, () => console.log("the server is running on port 8000"));
```

> 全局中间件可以和路由共享req和res, 在前面的中间件定义req和res的属性, 后面的路由可以得到这些值

#### 局部中间件 index3.js
```js
const express = require("express");
const app = express();
app.use(express.json());
const mw1 = function (req, res, next) {
    console.log("first middleware");
    next();
};
const mw2 = function (req, res, next) {
    console.log("second middleware");
    next();
};
// 先执行mw1后执行mw2
app.get("/book", mw1, mw2, (req, res) => {
    console.log("book page");
    res.send("book page");
});
app.post("/user", (req, res) => {
    console.log("body", req.body);
    res.send({ msg: "post succeed", data: req.body });
});
app.listen(8000, () => console.log("the server is running on port 8000"));
```

> 局部中间件的执行顺序在定义api时可以指定<br>
> 要解析post req.body的json数据, 使用`app.use(express.json());`

#### index4.js & router.js
`index4.js`
```js
const express = require("express");
const router = require("./router");
const app = express();
app.use(router);
app.listen(8000, () => console.log("the server is running on port 8000"));
```

`router.js`
```js
const express = require("express");
const router = express.Router();

// add post api
router.post("/", function (req, res, next) {
    const error = new Error("this is an error");
    next(error); // pass error to next middleware
});

// define error middleware
const errorHandler = function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        msg: "internal server error",
    });
};
// add error middleware
router.use(errorHandler);
module.exports = router;
```

> 路由可以传递参数给下一个中间件

### User list前端练习
`axios导入`
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```