# naiad-router

此项目是 react 实现 vue 的 keepalive 的项目。主要针对中后台系统中，用户希望同时看到几个页面的情景。同时搭配 naiad-admin 使用有良好的体验。
安装此项目不需要安装 react-router 7，此项目将常用的方法暴露出来，以免出现版本的冲突。

此项目原理简单，利用 Map 对象进行缓存控制，display 进行显隐展示。

此项目可以通过模式切换，`tabs`和`routes`。如果选 routes 是正常 react-router 7 的模式。 如果选择 tabs 则是类似于 vue 的 keepalive 的模式。

## 使用方法

如果选择`tabs`模式。

```jsx
const routerConfig = {
  page: {
    "/a1": {
      path: "/a1",
      loader: () => import("./A1"),
      label: "a1",
    },
  },
  content: {
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
  },
};

<NaiadRouter mode="tabs" layout={<A0 />} routerConfig={routerConfig} />;
```

此时需要传递三个参数，模式选择 layout 组件 和 路由配置。这里因为针对中后台系统开发，所以默认需要布局组件。

如果选择`routes`模式。

```jsx
const routes = createBrowserRouter([{...}])
   <NaiadRouter mode="routes" router={routes} />
```

与 react-router 7 的用法一致。

### 新功能

增加入口路径和 404 页面。
入口路径可以理解为重定向，因为进入后默认是 `/` 路径，所以需要重定向到某个具体页面比如说`/home` 。
如果在 tabs 模式下，有找不到的页面，重新打开了一个页面，此时不是很友好，所以将 404 页面配置到页签里，可以提升用户体验。

```jsx
const routerConfig = {
  enter: "/home",
  notFound: "/404",
  page: {
    "/login": {
      path: "/login",
      loader: () => import("./login"),
      label: "登录",
    },
  },
  content: {
    "/home": {
      path: "/home",
      loader: () => import("./home"),
      label: "首页",
    },
    "/home/search": {
      path: "/home/search",
      loader: () => import("./home/search"),
      label: "搜索",
    },
    "/404": {
      path: "/404",
      loader: () => import("./notFound"),
      label: "找不到",
    },
  },
};
```

当然你也可以使用传统的方式，在路由配置中加入一个 404 的页面。

```jsx
const routerConfig = {
  enter: "/home",

  page: {
    "/login": {
      path: "/login",
      loader: () => import("./login"),
      label: "登录",
    },
    "*": {
      path: "*",
      loader: () => import("./notFound"),
    }, //此时会打开一个新的404页面，不在页签之内
  },
  content: {
    "/home": {
      path: "/home",
      loader: () => import("./home"),
      label: "首页",
    },
    "/home/search": {
      path: "/home/search",
      loader: () => import("./home/search"),
      label: "搜索",
    },
  },
};
```

## 日志

##### 0.6.5

1. 完成 tabs 样式的修改，加入鼠标移入后自动 tab 自动左右移动。
2. 增加入口路径和 404 页面

##### 0.5.0

新增：区分 tabs 中的 page 和 content 两种页面，page 不加入缓存且不存放至 layout 组件中，content 加入缓存。
