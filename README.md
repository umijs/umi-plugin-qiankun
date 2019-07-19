# @umijs/plugin-qiankun

Umi plugin for [qiankun](https://github.com/umijs/qiankun).

[![NPM version](https://img.shields.io/npm/v/@umijs/plugin-qiankun.svg?style=flat)](https://npmjs.org/package/@umijs/plugin-qiankun)
[![Build Status](https://img.shields.io/travis/umijs/umi-plugin-qiankun.svg?style=flat)](https://travis-ci.org/umijs/umi-plugin-qiankun)
[![NPM downloads](http://img.shields.io/npm/dm/@umijs/plugin-qiankun.svg?style=flat)](https://npmjs.org/package/@umijs/plugin-qiankun)

## Installation

```shell
$ npm i @umijs/plugin-qiankun -S
```

or

```shell
$ yarn add @umijs/plugin-qiankun
```

## Examples

导航是主应用，App1 和 App2 是子应用，

![](https://cdn.nlark.com/yuque/0/2019/gif/86025/1556528226619-df48c9c3-a5ec-4796-b23d-78f12b46fb68.gif)

```bash
$ yarn
$ yarn build
$ yarn start:master & yarn start:app1 & yarn start:app2
```

## Features

- ✔︎ 基于 qiankun
- ✔︎ 支持主应用和子应用都用 umi
- ✔︎ 父子应用通讯
- ✔︎ 子应用运行时配置自定义 `bootstrap()`、`mount()` 和 `unmount()`

## Usage

### 主应用

配 `@umijs/plugin-qiankun/master` 插件，

```js
export default {
  plugins: [
    [
      '@umijs/plugin-qiankun/master',
      {
        // 注册子应用信息
        apps: [
          {
            name: 'app1', // 唯一 id
            entry: '//locahost:7001', // html entry
            base: '/app1', // app1 的路由前缀，通过这个前缀判断是否要启动该应用，通常跟子应用的 base 保持一致
            history: 'browser', // 子应用的 history 配置，默认为 'browser'
          },
          {
            name: 'app2',
            entry: {
              // TODO 支持 config entry
              scripts: [],
              styles: [],
            },
            base: '/app2',
          },
        ],
        jsSandBox: true, // 是否启用 js 沙箱，默认为 false
        prefetch: true, // 是否启用 prefetch 特性，默认为 true
      },
    ],
  ],
};
```

#### app 配置

| 配置           | 说明                                                                                                                          | 类型                                       | 是否必填 | 默认值      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | -------- | ----------- |
| name           | 子应用唯一 id                                                                                                                 | string                                     | 是       |             |
| entry          | 子应用 html 地址                                                                                                              | string \| { script: string[], styles: [] } | 是       |             |
| base           | 子应用路由前缀，通常跟子应用的 [base 配置](https://umijs.org/config/#base) 一致，框架会以这个配置作为前缀判断是否激活当前应用 | string \| string[]                         | 是       |             |
| history        | [umi history mode](https://umijs.org/config/#history)                                                                         | string                                     | 否       | browser     |
| mountElementId | 子应用挂载到主应用的哪个 id 节点上                                                                                            | string                                     | 否       | root-subapp |

### 子应用

配 `@umijs/plugin-qiankun/slave` 插件，

```js
export default {
  base: `/${appName}`, // 子应用的 base，默认为 package.json 中的 name 字段
  plugins: ['@umijs/plugin-qiankun/slave'],
};
```

## 父子应用通讯

1. 约定父应用中在 `src/rootExports.js` 里 export 内容

2. 子应用中通过 `import { useRootExports } from 'umi'; const rootExports = useRootExports();` 取到

## 子应用运行时配置

在子应用的 `src/app.js` 里输出 `qiankun`，

```js
export const qiankun = {
  // 应用加载之前
  async bootstrap() {
    console.log('app1 bootstrap');
  },
  // 应用 render 之前触发
  async mount() {
    console.log('app1 mount');
  },
  // 应用卸载之后触发
  async unmount() {
    console.log('app1 unmount');
  },
};
```

## Roadmap

- [x] 支持 browserHistory
- [ ] 公共依赖加载策略
- [ ] 子应用嵌套
- [ ] 子应用单独调试
- [ ] 基于 Hooks 的父子应用通讯（需强制 external React 保证一个 React 实例）

## 相关

- [RFC: 微前端（@umijs/plugin-qiankun） by sorrycc · Pull Request #3 · umijs/rfcs · GitHub](https://github.com/umijs/rfcs/pull/3)

- [umi-example-monorepo](https://github.com/umijs/umi-example-monorepo) 之前尝试的另一种简单粗糙的微前端试验

## LICENSE

MIT
