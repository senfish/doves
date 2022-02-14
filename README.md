# doves


## 核心包

`doves` 是由两个核心包 `doves-cli` 和 `create-doves` 组成。

### doves-cli

> 负责CLI服务，目前包括serve、build等，

### create-doves

> 负责创建应用模版，问询式交互，提供多种应用模板，目前支持模板有react、react-ts等

## 创建应用

`create-doves` 用于快速创建项目模板，提供可配置信息

> 兼容性注意 !!!
 需要 Node.js 版本 >= 12.0.0。


### 通过包管理工具

使用npm:
```bash
npm init doves@latest
```

使用yarn:
```bash
yarn create doves
```

使用pnpm:
```bash
pnpm create doves
```
然后按照提示操作即可！
输入你的 `Project name`
// todo
输入你想要的 template
// todo


一切就绪之后，等在下载即可。

### 通过全局安装

当然，你也可以安装全局包create-doves来创建你的新应用。



使用NPM:
```bash
yarn global add create-doves

create-doves doves-demo
```

然后按照提示操作即可！

当看到doves logo时，即代表应用创建成功，以上两种方法效果是一样的。

