import { ReactNode, ComponentType, ReactElement } from "react";

export type CacheItem = {
  path: string;
  loader: () => Promise<{ default: ComponentType }>;
  element?: ReactElement;
  timestamp: number;
};

export type RouterState = {
  cacheMap: Map<string, CacheItem>;
  tabsList: NaiadRouterConfig[];
  routerConfig?: routerConfigTy;
  cacheLog: number;
};

export type RouterAction =
  | {
      type: "ADD_TAB";
      payload: {
        path: string;
        routerItem: NaiadRouterConfig;
        loader: () => Promise<{ default: ComponentType }>;
      };
    }
  | { type: "REMOVE_TAB"; payload: string }
  | { type: "REMOVE_ALL_TABS" }
  | { type: "SAVE_ROUTER_CONFIG"; payload: routerConfigTy }
  | {
      type: "MOUNT_COMPONENT";
      payload: { path: string; element: ReactElement };
    };

//关于routerConfigTy的定义
export type routerConfigTy = { [path: string]: NaiadRouterConfig };
export type NaiadRouterConfig = {
  path: string;
  label: string;
  icon?: ReactNode;
  loader: () => Promise<{ default: ComponentType }>;
};

export type NaiadRouter = {
  mode: "tabs" | "routes";
} & (
  | {
      mode: "tabs";
      layout: ReactElement;
      routerConfig: {
        content: routerConfigTy;
        page?: routerConfigTy;
      };
    }
  | {
      mode: "routes";
      router: any;
    }
);
