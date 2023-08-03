//1.导入express
const express = require("express");
const cors = require("cors");
//2.创建一个web服务器
const app = express();
const messageRouter = require("./router");
//允许postman的body使用json和x-www-form-urlencoded格式
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//设置cors请求头 - 允许跨域请求
app.use(cors());
//4.处理一个简单的request
app.get("/test", (req, res) => res.send("hello world"));
app.use(messageRouter);
//3.启动服务器
app.listen(8080, () => console.log("Server is running on port 8080"));
