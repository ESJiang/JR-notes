# Class Notes

## Resources
[Postman官网](https://www.postman.com/)<br>
[moment库](https://momentjs.com/docs/)<br>

## Node_3 (`1/08/2023`)
<p align='center'><img src='../image/nodejs.png' width='30%' height='30%' /></p>

### package.json vs package-lock.json vs node_modules
| package.json | package-lock.json | node_modules
| :---: | :---: | :---: |
| ***项目信息和依赖项信息*** | ***npm包的地址,来源,具体版本号*** | ***下载包的位置*** |

> ^2.29.4：表示可以使用 2.29.4 版本及其后续的次版本或修订版本, 但不包括 3.x.x 版本. 换句话说, 它允许在 2.x.x 版本范围内自动更新, 但不允许更新到 3.x.x 版本.

> package.json和js中的object差别在于
- package.json最后出现逗号会报错. js的object最后的逗号是可选的

### 模块作用域
自定义模块中定义的变量,方法只能在模块内被访问

Node.js -> CommonJS的规范
- 默认用module.exports/require()
- 在package.json中添加`"type"="module"`就可以使用import/export语法

### Express介绍
#### 两种服务器
- WEB服务器: http -> createServer
- API服务器: Express (简化了http内置模块, 使用express更方便)

API: Application Programming Interface
> 连接前后端的桥梁

<p align='center'><img src='../image/how do apis work.png' width='80%' height='80%' /></p>

##### 安装express和nodemon
```shell
npm init
npm i express # 装在dependencies下
npm i nodemon -D # 装在devDependencies下
```

#### 搭建server
```js
const express = require("express");
const app = express();
const PORT = 8080;
app.get("/user", (req, res) => {
    console.log(req.query);
    res.send({ name: "Chris", age: 20 });
});
app.post("/user", (req, res) => {
    res.send("request succeeded");
});
app.get("/", (req, res) => {
    console.log(req.query);
    res.send(req.query);
});
app.get("/profiles/:name", (req, res) => {
    console.log("name", req.params.name);
    res.send(req.params);
});
app.get("/users/:id/:room", (req, res) => {
    console.log("id", req.params.id);
    console.log("room", req.params.room);
    res.send(req.params);
});
app.listen(PORT, () => console.log("server is running on 8080."));
```

> npx nodemon (启动server+实时更新)<br>
> req.query默认是{}, 可以使用?name=Chris&age=20 传输数据<br>

#### 模块化路由
为了方便管理, 不应该把路由挂载到app上, 推荐将路由抽离成独立的模块

`server.js`
```js
const express = require("express");
const router = require("./router");
const app = express();
app.use(router);
app.listen(8080, () => console.log("server is running on 8080"));
```

`router.js`
```js
const express = require("express");
const router = express.Router();
router.get("/list", (req, res) => res.send("get list succeed"));
router.post("/profile", (req, res) => res.send("add new profile"));
module.exports = router;
```