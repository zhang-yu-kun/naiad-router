import { enableMapSet } from "immer";
import type { RouterState, RouterAction } from "../types";
import type { Draft } from "immer";

const routerReducer = (state: Draft<RouterState>, action: RouterAction) => {
  enableMapSet();

  switch (action.type) {
    case "ADD_TAB": {
      const { path, routerItem, loader } = action.payload;
      // 如果标签页已存在，则更新缓存时间
      if (state.tabsList.some((tab) => tab.path === path)) {
        const cache = state.cacheMap.get(path);
        if (cache !== undefined) {
          cache.timestamp = Date.now();
        }
        return;
      }

      // 否则，添加新的标签页
      state.tabsList.push(routerItem);
      state.cacheMap.set(path, {
        path,
        loader,
        timestamp: Date.now(),
      });
      state.cacheLog++;
      break;
    }

    case "REMOVE_TAB": {
      const path = action.payload;
      const index = state.tabsList.findIndex((tab) => tab.path === path);

      if (index !== -1) {
        state.tabsList.splice(index, 1);
        state.cacheMap.delete(path);
        state.cacheLog++;
      }
      break;
    }

    case "REMOVE_ALL_TABS": {
      const currentPath = window.location.pathname;
      const currentTab = state.tabsList.find((tab) => tab.path === currentPath);
      state.tabsList = currentTab ? [currentTab] : [];
      // 清理缓存
      Array.from(state.cacheMap.keys()).forEach((key) => {
        if (key !== currentPath) {
          state.cacheMap.delete(key);
        }
      });

      state.cacheLog++;
      break;
    }

    case "MOUNT_COMPONENT": {
      const { path, element } = action.payload;
      const cache = state.cacheMap.get(path);

      if (cache) {
        cache.element = element;
      }
      break;
    }

    case "SAVE_ROUTER_CONFIG": {
      state.routerConfig = action.payload;
      break;
    }

    default:
      break;
  }
};

export default routerReducer;
