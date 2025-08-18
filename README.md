# naiad-router

此项目是 react 实现 vue 的 keepalive 的项目。主要针对中后台系统中，用户希望同时看到几个页面的情景。同时搭配 naiad-admin 使用有良好的体验。
安装此项目不需要安装 react-router 7，此项目将常用的方法暴露出来，以免出现版本的冲突。

此项目原理简单，利用 Map 对象进行缓存控制，display 进行显隐展示。

此项目可以通过模式切换，`tabs`和`routes`。如果选 routes 是正常 react-router 7 的模式。 如果选择 tabs 则是类似于 vue 的 keepalive 的模式。

## 使用方法

如果选择`tabs`模式。

```
const routerConfig = {
  "/a1": {
    path: "/a1",
    loader: () => import("./A1"),
    label: "a1",
  },
  "/a2": {
    path: "/a2",
    loader: () => import("./a2"),
    label: "a2",
  },
  "/a2/b1": {
    path: "/a2/b1",
    loader: () => import("./a2/b1"),
    label: "b1",
  },
};

   <NaiadRouter mode="tabs" layout={<A0 />} routerConfig={routerConfig} />
```

此时需要传递三个参数，模式选择 layout 组件 和 路由配置。这里因为针对中后台系统开发，所以默认需要布局组件。

如果选择`routes`模式。

```
const routes = createBrowserRouter([{...}])
   <NaiadRouter mode="routes" router={routes} />
```

与 react-router 7 的用法一致。

## 日志

##### 0.6.0

完成 tabs 样式的修改，加入鼠标移入后自动 tab 自动左右移动。
