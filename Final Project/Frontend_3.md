- [Class Notes](#class-notes)
  - [Resources](#resources)
  - [Frontend\_3 (`30/08/2023`)](#frontend_3-30082023)
    - [从后端拿数据 (避免在HTML 中直接写)](#从后端拿数据-避免在html-中直接写)
      - [之前的HTML](#之前的html)
      - [预期的HTML](#预期的html)
      - [利用DOM方法实现参数传递](#利用dom方法实现参数传递)
    - [createCards方法(classList \& appendChild)](#createcards方法classlist--appendchild)
      - [index.js](#indexjs)
      - [common.js](#commonjs)
    - [部署项目](#部署项目)
      - [前端部署](#前端部署)
      - [后端部署](#后端部署)

# Class Notes

## Resources
[Class code](http://github.com/jessieyu1/top-soical-fe/tree/main)<br>
[netlify](https://www.netlify.com/)<br>
[fly.io](https://fly.io/)<br>
[render](https://render.com/)<br>

## Frontend_3 (`30/08/2023`)
<p align='center'><img src='../image/Top Social.png' width='100%' height='100%' /></p>

### 从后端拿数据 (避免在HTML 中直接写)
#### 之前的HTML
```html
<a href="/" class="profile">
<div class="profile-photo">
    <img
    src="./public/images/profile/profile_1.png"
    alt="profile-photo"
    />
</div>
<div class="profile-description">
    <h2>Jess Ye</h2>
    <p>Jess Ye</p>
</div>
</a>
```

#### 预期的HTML
```html
<a href="/" class="profile">
<div class="profile-photo">
    <img
    alt="profile-photo"
    />
</div>
<div class="profile-description">
    <h2></h2>
    <p></p>
</div>
</a>
```

#### 利用DOM方法实现参数传递
```js
const main = document.querySelector("main");
const main_container = main.querySelector(".container");
const left = main_container.querySelector(".main-left");
const left_profile = left.querySelector(".profile");
const left_profile_name = left_profile.querySelector("h2");
const left_profile_at = left_profile.querySelector("p");
const left_profile_img = left_profile.querySelector("img");
left_profile_name.textContent = profile.name;
left_profile_at.textContent = profile.at;
left_profile_img.src = profile.img_src;
```

### createCards方法(classList & appendChild)
#### index.js
```js
import "./index.css";

import { highline, profile, cards } from "@/js/database";

import {
  left_profile_name,
  left_profile_at,
  left_profile_img,
  middle_highline_description,
  middle_highline_description_img,
  middle_highline_description_p,
  create_news,
  create_picture_structure
} from "@/js/common.js";

//main left

left_profile_name.textContent = profile.name;
left_profile_at.textContent = profile.at;
left_profile_img.src = profile.img_src;

//main middle

middle_highline_description_p.forEach((ele, i) => {
  ele.textContent = highline.description[i];
});

// background image
middle_highline_description.forEach((ele, i) => {
  ele.style.backgroundImage = `url("./images/highline/highline_${i + 1}.jpeg")`;
});
//profile
middle_highline_description_img.forEach((ele, i) => {
  ele.src = `./images/profile/profile_${i + 1}.png`;
});

//middle form
const middle = document.querySelector(".main-middle")
const middle_form = middle.querySelector("form");
const middle_form_input_text = middle_form.querySelector("#create-post");
//name
middle_form_input_text.placeholder = `What's on your mind, ${profile.name}`;

//Cards

const cardsDom = document.querySelector(".card")

cards.forEach((element) => {
 const doms = create_news();
 cardsDom.appendChild(doms.info)
 create_picture_structure(doms.info_picture, element.picture)
})
```

#### common.js
```js
/* Main Left */
const main = document.querySelector("main");
const main_container = main.querySelector(".container");
const left = main_container.querySelector(".main-left");
const left_profile = left.querySelector(".profile");
export const left_profile_name = left_profile.querySelector("h2");
export const left_profile_at = left_profile.querySelector("p");
export const left_profile_img = left_profile.querySelector("img");

/* Main middle highline */
const middle = document.querySelector(".main-middle");
const middle_highline = middle.querySelector(".highline");
export const middle_highline_description = middle_highline.querySelectorAll(".description");
export const middle_highline_description_img = middle_highline.querySelectorAll(".description img");
export const middle_highline_description_p = middle_highline.querySelectorAll(".description p");

/* Main middle cards */
export const create_news = () => {
    const doms = {
        info: document.createElement("div"),
        info_profile: document.createElement("div"),
        info_picture: document.createElement("div"),
        info_control: document.createElement("div"),
        info_comment: document.createElement("div"),
    };
    doms.info.classList.add("info");
    doms.info_profile.classList.add("info-profile");
    doms.info_picture.classList.add("info-picture");
    doms.info_control.classList.add("info-control");
    doms.info_comment.classList.add("info-comment");
    doms.info.appendChild(doms.info_profile);
    doms.info.appendChild(doms.info_picture);
    doms.info.appendChild(doms.info_control);
    doms.info.appendChild(doms.info_comment);
    return doms;
};

export const create_picture_structure = (picture_dom, info) => {
    const picture = document.createElement("img");
    picture.setAttribute("width", "100%");
    picture_dom.appendChild(picture);
    picture.src = info.img_src;
};
```

### 部署项目
#### 前端部署
*tbc*

#### 后端部署
*tbc*