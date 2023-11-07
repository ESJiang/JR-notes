- [Self-learning Notes](#self-learning-notes)
  - [Resources](#resources)
  - [TypeScript\_1 (`07/11/2023`)](#typescript_1-07112023)
    - [Why companies prefer to use TypeScript than JavaScript?](#why-companies-prefer-to-use-typescript-than-javascript)
    - [How to initialize a TypeScript project?](#how-to-initialize-a-typescript-project)
      - [npm](#npm)
      - [vite](#vite)
    - [tsconfig.json](#tsconfigjson)

# Self-learning Notes

## Resources
[tsconfig bases recommendation](https://github.com/tsconfig/baseshttps://github.com/tsconfig/bases)<br>
[typescript documentation](https://www.typescriptlang.org/tsconfig)

## TypeScript_1 (`07/11/2023`)

<p align='center'><img src='../image/TypeScript.png' width='30%' height='30%' /></p>

### Why companies prefer to use TypeScript than JavaScript?
- Write code quickly: support autocomplete
- Detect errors easily - type detection

### How to initialize a TypeScript project?
#### npm
```shell
npm init -y
npm i -D typescript
npx tsc --init # generate a tsconfig.json file
npx tsc script.ts --noEmitOnError # convert script.ts to script.js
```

#### vite
```shell
npm create vite@latest . # 选择framework后选择typescript
npm i
npm run dev
```

### tsconfig.json
``compilerOptions``
```shell
target # 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
module # 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
allowJs # 是否检测js的语法
strict # enable common rules to follow

```

``include``
```shell
include # 指定需要编译的文件
```