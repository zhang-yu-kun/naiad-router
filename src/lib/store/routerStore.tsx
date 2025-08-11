import { createContext, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import routerReducer from "./routerReducer";
import type { Dispatch, ReactNode } from "react";
import type { RouterAction, RouterState, NaiadRouter } from "../types";

export const initialState = {
  cacheMap: new Map(), // 缓存的页面数据
  tabsList: [], // 标签页列表
  menuList: [], // 菜单列表
  routerConfig: {}, // 页面加载器列表，用于缓存页面数据
  cacheLog: 0, // 缓存日志，用于调试
};

export const RouterStoreContext = createContext<{
  state: RouterState;
  dispatch: Dispatch<RouterAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const RouterSroreProvider = ({
  children,
  routerConfig,
}: {
  children: ReactNode;
  routerConfig: NaiadRouter["routerConfig"];
}) => {
  const [state, dispatch] = useImmerReducer(routerReducer, initialState);
  useEffect(() => {
    dispatch({ type: "SAVE_ROUTER_CONFIG", payload: routerConfig });
  }, [routerConfig]);
  return (
    <RouterStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </RouterStoreContext.Provider>
  );
};

export const useRouterStore = () => useContext(RouterStoreContext);
