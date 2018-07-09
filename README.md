# ionic3_tabs_demo

1、自定义model动画

2、自定义消息弹窗

3、多环境配置，包括开发环境，测试环境、生产环境等。

针对开发的需要，需要切换不同的api地址，如果手动切换实在太麻烦，最好想法是用webpack工具实现环境的切换

```bash
//package.json文件中引入自定义的webpack.config.js文件
"config": {
    "ionic_webpack": "src/config/webpack.config.js"
  }

//配置自定义的命令
 "scripts": {
    "clean": "ionic-app-scripts clean",
    "build": "ionic-app-scripts build",
    "lint": "ionic-app-scripts lint",
    "ionic:build": "ionic-app-scripts build",
    "ionic:serve": "ionic-app-scripts serve",
    "ionic:serve:dev": "NODE_ENV=dev ionic-app-scripts serve",
    "ionic:serve:beta": "NODE_ENV=beta ionic-app-scripts serve",
    "ionic:serve:prod": "NODE_ENV=prod ionic-app-scripts serve --prod"
  },
```

具体逻辑实现的办法，在src同级目录下的config/webpack.config.js文件中实现