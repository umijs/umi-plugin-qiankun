# umi-plugin-single-spa

Umi plugin for [single-spa](https://single-spa.js.org/).

**试验性质的项目，不要用于生产环境。**

[![NPM version](https://img.shields.io/npm/v/umi-plugin-single-spa.svg?style=flat)](https://npmjs.org/package/umi-plugin-single-spa)
[![Build Status](https://img.shields.io/travis/umijs/umi-plugin-single-spa.svg?style=flat)](https://travis-ci.org/umijs/umi-plugin-single-spa)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-single-spa.svg?style=flat)](https://npmjs.org/package/umi-plugin-single-spa)

## Why

验证 SingleSPA 在 umi 下的可行性，作为微前端其中一种方式的探索，可能是最佳实践，也可能不是。灵感来源于内部的 OneX 项目和[前端微服务化进阶 1 - 基于 umi 的子模块方案](https://alili.tech/archive/9xuojm75d2a/)。

## 如何验证这个项目

依赖 [umi 的这个 PR](https://github.com/umijs/umi/pull/2340)。

安装依赖，

```bash
$ yarn
```

编译 `src` 为 `es` 目录，

```bash
$ yarn build
```

在 `test/fixtures` 下的 master、app1 和 app2 下同时运行，

```bash
$ umi dev
```

## Feature

- ✔︎ 基于 SingleSPA
- ✔︎ 支持主应用和子应用都用 umi

## TODO

暂没很多时间深入，有需求的同学最好自己上。

- [ ] 按需加载（配置不放在 slave 里）
- [ ] HTML Entry
- [ ] Config Entry
- [ ] CSS 隔离
- [ ] JS 沙箱
- [ ] 公共依赖加载策略
- [ ] 预加载

## Installation

```bash
$ yarn add umi-plugin-single-spa
```

## Usage

暂无。

## 相关

- [umi-example-monorepo](https://github.com/umijs/umi-example-monorepo) - 之前尝试的另一种简单粗糙的微前端试验

## LICENSE

MIT © [Chen Cheng](https://sorrycc.com)
