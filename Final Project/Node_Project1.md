
# Class Notes

## Resources
[backend code](https://github.com/AllyTang/TopSocial)

## Node_Project1 (`13/08/2023`)
<p align='center'><img src='../image/Top Social.png' width='100%' height='100%' /></p>

### 上节课User_List补全deleteList和postUser

#### deleteList
```js
function deleteList() {
    const url = "http://localhost:8080/api/users";
    axios
        .delete(url)
        .then(function (res) {
            console.log("user list cleared in backend");
            getList();
        })
        .catch(function (err) {
            console.error("Error clearing user list:", err);
        });
}
```

#### postUser
```js
// 通过定义appendUsers(users)可以简化getUserList()和postUser()
function appendUsers(users) {
    users.forEach(function (user) {
        const li = document.createElement("li");
        li.innerHTML = user.name + " " + user.age;
        li.setAttribute("data-id", user.id);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteUserById(user.id);
        });
        li.appendChild(deleteButton);
        document.getElementById("user_list").appendChild(li);
    });
}

function postUser() {
    const url = "http://localhost:8080/api/users";
    const nameInput = document.getElementById("username");
    const nameValue = nameInput.value;
    const ageInput = document.getElementById("age");
    const ageValue = ageInput.value;
    console.log("value", nameValue, ageValue);
    if (!nameValue || !ageValue) return;
    const body = {
        name: nameValue,
        age: ageValue,
    };
    axios
        .post(url, body)
        .then(function (res) {
            const updatedUsers = res.data.data;
            console.log("updatedUsers", updatedUsers);
            clear_list();
            appendUsers(updatedUsers);
            nameValue='';
            ageValue='';
        })
        .catch(function (err) {
            console.error("error adding user:", err);
        });
}
```

### Top Social
`创建backend文件夹和index.js`
#### npm初始化
```shell
npm init
npm i express cors axios json-server
npm i nodemon concurrently -D
```

#### 修改package.json
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "json:server": "json-server --port 8000 --watch db.json",
    "server": "npx nodemon server.js",
    "dev": "concurrently \"npm run server\" \"npm run json:server\""
},
```

`使用npm run dev能同时启动两个server`

#### index.js
```js
const express = require("express");
const cors = require("cors");
const rouer = require("./routes/index");
const app = express();
app.use(cors()); //必须在router前挂载; 其他的像auhMiddleware也要在router前挂载
app.use(express.json());

const PORT = 80;
app.listen(PORT, function () {
    console.log("server is running on port 80");
});
```

#### 中间件顺序
<p align='center'><img src='../image/middleware sequence.png' width='80%' height='80%' /></p>

#### 创建routes文件夹实现模块化
##### index.js
```js
const express = require("express");
const axios = require("axios");
const profileRouter = require("./profile");

//create router
const router = express.Router();

router.use(profileRouter);

module.exports = router;
```

##### profile.js
```js
const express = require("express");
const axios = require("axios");
const profileRouter = express.Router();

// /api/profile  GET profile
// http://localhost/api/profile

profileRouter.get("/api/profile", async function (req, res, next) {
  try {
    const url = "http://localhost:8000/profile";
    const response = await axios.get(url);
    console.log("response", response.data);
    res.status(200).json({
      msg: "Get profile succeed",
      data: response.data,
    });
    // throw new Error("Server error");
  } catch (error) {
    console.error("error", error);
    next(error);
  }
});

module.exports = profileRouter;
```

#### errorhandler middleware
```js
const handleErrors = function (err, req, res, next) {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ error: message });
};

module.exports = { handleErrors };
```