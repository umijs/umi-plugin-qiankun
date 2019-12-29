# 如何在 IE11 中使用 umi-plugin-qiankun

## 主要问题

现在在 IE11 中使用`umi-plugin-qiankun`主要有两个问题：

- 如果开启了`jsSandbox: true`会使用`proxy`, 由于 IE 不支持`proxy`, 应用将无法运行
- `qiankun`加载微前端的请求是基于`fetch`的，而 IE 不支持`fetch`, 需要加载对应的`polyfill`

## 解决方案

### proxy 解决方案：

- 在 master 应用的`.umirc.js`中不设置`jsSandbox`或者设置`jsSandbox: false`
- 在 master 及 slave 应用的`.umirc.js`中，配置`runtimePublicPath`及`publicPath`, 不然会报错。具体内容参考这次 commit: [子应用默认开启 runtimePublicPath](https://github.com/umijs/umi-plugin-qiankun/commit/a2b4387c0ee6e2c23a03e2cd0284224a96bd6a20)

### fetch 解决方案：

- 在 master 应用中安装`fetch`的 polyfill

```javascript
yarn add whatwg-fetch
```

- 引入对应的 polyfill

在 master 应用的`global.js`中引入对应的 polyfill, 如下：

```javascript
import 'whatwg-fetch';
```

## 在 IE11 上调试

如果需要在 Windows 及 IE11 上进行开发调试，需要在 IE11 上进行以下设置：

打开 IE11 的 Internet 选项，选择“安全”——“本地 Intranet”, 点击下方“站点”，在弹出窗口中取消勾选所有选项； ![image](https://user-images.githubusercontent.com/15656042/71427231-35cfb500-26f1-11ea-8d08-a297aca290b6.png)
