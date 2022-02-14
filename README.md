# doves


## 核心包

`doves` 是由两个核心包 `doves-cli` 和 `create-doves` 组成。

#### doves-cli

> 负责CLI服务，目前包括serve、build等，

#### create-doves

> 负责创建应用模版，问询式交互，提供多种应用模板，目前支持模板有react、react-ts等

## 创建应用

`create-doves` 用于快速创建项目模板，提供可配置信息

> 兼容性注意 !!!
 需要 Node.js 版本 >= 12.0.0。


#### 通过包管理工具

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
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9623f5940f864eefa0f3bfab7d248c4f~tplv-k3u1fbpfcp-watermark.image?)
选择你想要的 template
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e07f4ffd76746a08e64a79a6962bbf4~tplv-k3u1fbpfcp-watermark.image?)


一切就绪之后，等在下载即可。

#### 通过全局安装

当然，你也可以安装全局包create-doves来创建你的新应用。



使用NPM:
```bash
yarn global add create-doves

create-doves doves-demo
```

然后按照提示操作即可！
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ab7b1cea60c4f89887b20da998e88aa~tplv-k3u1fbpfcp-watermark.image?)
当看到 `doves` logo时，即代表应用创建成功，以上两种方法效果是一样的。


## cli 服务

#### 全局安装（建议）

```bash
yarn global add doves-cli
```

#### 使用命令

当通过 `create-doves` 创建应用时，会帮你自动安装 `doves-cli` 到目标应用，所以你可以使用默认 preset 应用的 package.json：

```json
{
	"scripts": {
    "start": "doves-cli serve",
    "build": "doves-cli build"
  }
}
```

你可以通过 `npm` 或 `yarn` 调用这些 `script` ：

```bash
npm run start
# or
yarn start
```

甚至你还可以这样:

```bash
doves-cli serve
# or
doves-cli build
```

#### doves-cli serve

```bash
用法：def-cli serve [options] [entry]

选项：

  --open    在服务器启动时打开浏览器
  --copy    在服务器启动时将 URL 复制到剪切版
  --mode    指定环境模式 (默认值：development)
  --host    指定 host (默认值：0.0.0.0)
  --port    指定 port (默认值：8080)
  --hot     开启热更新
  --config  指定webpack配置文件
```

`doves-cli serve` 命令会启动一个开发服务器 (基于 [webpack-dev-server](https://github.com/webpack/webpack-dev-server)) 并附带开箱即用的模块热重载 (`Hot-Module-Replacement`)。
除了通过命令行参数，你也可以使用 `webpack.config.js` 里的 `devServer` 字段配置开发服务器。

#### doves-cli build

```json
用法：def-cli build [options] [entry]

选项：

  --mode        指定环境模式 (默认值：production)
  --output      指定输出目录 (默认值：dist)
  --config      指定webpack配置文件
  --clean       删除上一次打包文件
```

#### !注意

命令行参数优先及大于 `webpack` 配置，也就是说，会覆盖 `webpack.config.js` 里面的值。