Node.js在线备忘录
==
##  项目简介

使用NodeJs + Express搭建一个在线备忘录，带有OAuth第三方认证登录、数据库的功能。

## 项目目标：
- 前端：
	- 前端代码结构的组织
	- 模块化开发
	- webpack 及loader和插件的使用
	- npm 的使用
	- 前后端联调
- 后端：
	- 网站后端架构
	- MVC概念
	- Express的使用
	- 路由
	- 中间件
	- sqlite3
	- nodejs 调试
- 运维：
	- linux 命令行
	- git
	- pm2
	- 代理配置

## 涉及的技术栈：
前端：
- js组件封装
- 事件发布订阅模式
- webpack的使用
- less
后端：
- nodejs
- express快速搭建框架
- 中间件的引入
- 路由
- 使用sequelize+sqlite3

##  使用方法：
1. 事前准备好node.js
2. git clone项目到本地
3. 打开终端，在项目目录下，执行`npm install`安装依赖。
4. 安装完以后，执行`npm run start`，在浏览器打开`http://localhost:333`

## 项目心得：
1. 首次搭建一个全栈项目，对后端工作有了一定的了解，方便日后在前后端开发进度不一致的时候，可以通过搭建nodejs服务器提前进行前后端测试。

2. 提升webpack的使用熟练度。webpack现在在前端开发中的重要性不言而喻，是前端工程化中的重要一环，掌握webpack可大大提升生成效率，关键在于需要熟悉webpack的配置使用方法（这个也是很多坑的地方。。。）另外在使用webpack的过程中，建议引入onchange，监听src目录下less和js文件的变化，自动执行打包。

3. 要善用工具提高开发效率，本次项目涉及到了express的使用，所以如果对后端进行了任意的修改都需要手动重启（重复3次以上都应该要考虑使用工具来替代），我使用nodemon + browser-sync实现自动重启，前者用于监听后端文件自动重启服务器，后者监听webpack打包出来的js和css实行刷新页面。


## 目录结构：
```
├── app.js
├── bin			//网站入口
│   └── www
├── database	//数据库
│   └── database.sqlite
├── model
│   └── note.js		//数据库的模型
├── nodemon.json	//nodemon配置文件
├── package-lock.json
├── package.json
├── public		//打包后的静态资源目录
│   ├── css
│   │   ├── style.css
│   │   └── style.css.map
│   ├── img
│   │   └── c00d4f1a.main-bg.jpg
│   └── js
│       ├── index.js
│       ├── index.js.map
│       └── jquery-3.3.1.min.js
├── routes		//路由
│   ├── all.js
│   ├── api.js
│   ├── auth.js
│   └── index.js
├── src			//静态资源的源文件
│   ├── font
│   │   ├── iconfont.eot
│   │   ├── iconfont.svg
│   │   ├── iconfont.ttf
│   │   └── iconfont.woff
│   ├── images
│   │   └── main-bg.jpg
│   ├── js
│   │   ├── app		//入口
│   │   │   └── index.js
│   │   ├── lib		//js库
│   │   │   └── jquery-3.3.1.min.js
│   │   └── mod		//模块组件
│   │       ├── event.js
│   │       ├── note-manager.js
│   │       ├── note.js
│   │       ├── toast.js
│   │       └── waterfall.js
│   ├── less
│   │   ├── iconfont.css
│   │   ├── index.less
│   │   ├── note.less
│   │   └── toast.less
│   └── webpack.config.js
└── views		//ejs模板
    ├── error.ejs
    └── index.ejs
```
