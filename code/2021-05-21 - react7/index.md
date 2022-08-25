# React 实战
## 课程目标
- 掌握 CSS Modules 在项目中的使用
- 掌握 antd 在项目中的配置
- 掌握项目结构划分

## 课程内容
### 严格模式(Strict Mode)
    识别具有不安全生命周期的组件
    有关旧式字符串ref用法的警告
    检测意外的副作用
    检测遗留 context API

### CSS Modules
- 在 create-react-app 中的使用：
    - .css .sass 正常文件
    - [name].module.css [name].module.sass 需要模块化的文件
- CSS Modules 使用
    - 局部 声明:local(.className) .className 使用 styled.className 
    - 全局 :global(.className)
    - composes 引入其他样式
        

### Ant Design
官网: https://ant.design/index-cn

#### 使用

- 最基本使用
    - 安装 npm install antd
    - 引入
        import { DatePicker } from 'antd';
        import 'antd/dist/antd.css';
- 自定义主题
    - npm i @craco/craco   yarn add @craco/craco
        craco （一个对 create-react-app 进行自定义配置的社区解决方案）
    - 修改 package.json
        
        "scripts": {
        -   "start": "react-scripts start",
        -   "build": "react-scripts build",
        -   "test": "react-scripts test",
        +   "start": "craco start",
        +   "build": "craco build",
        +   "test": "craco test",
        }
    - 创建一个 craco.config.js 用于修改默认配置
        ```
            /* craco.config.js */
            module.exports = {
            // ...
            };
        ``` 
    - 安装 $ yarn add craco-less
    - 修改 craco.config.js 配置
    ```
        const CracoLessPlugin = require('craco-less');
        module.exports = {
        plugins: [
            {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                lessOptions: {
                    modifyVars: { '@primary-color': '#1DA57A' },
                    javascriptEnabled: true,
                },
                },
            },
        },
    ],
};
```
       

### 实战：搭建 CNode 项目
- src
    - index.js -- 项目入口文件，项目配置
    - App.js -- 项目的根组件
    - assets 静态文件 (图片、css)
    - component 通用组件
    - router 路由相关配置
          - view 各个视图
            - 视图1
                index.js
                视图的私有组件
            - 视图2
    - store 状态仓库
        - reducer
        - action

### 练习
通过班班发布到群里的答题链接，完成本次测试

### 下节课内容
- 利用 hooks 解决异步 action 问题
- renderProps
    - 弹窗组件编写
- 高阶组件 HOC 
    - 路由守卫
- 路由懒加载
- 路由动画



















