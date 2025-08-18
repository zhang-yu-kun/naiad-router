import { ReactNode, ComponentType, ReactElement } from "react";

export type CacheItem = {
  path: string;
  loader: () => Promise<{ default: ComponentType }>;
  element?: ReactElement;
  timestamp: number;
};

export type RouterState = {
  cacheMap: Map<string, CacheItem>;
  tabsList: NaiadRouterConfigItem[];
  routerConfig?: routerConfigTy;
  cacheLog: number;
  enter: string;
  notFound: string;
};

export type RouterAction =
  | {
      type: "ADD_TAB";
      payload: {
        path: string;
        routerItem: NaiadRouterConfigItem;
        loader: () => Promise<{ default: ComponentType }>;
      };
    }
  | { type: "REMOVE_TAB"; payload: string }
  | { type: "REMOVE_ALL_TABS" }
  | { type: "SAVE_ROUTER_CONFIG"; payload: routerConfigTy }
  | { type: "SAVE_ROUTER_ENTER"; payload: string }
  | { type: "SAVE_ROUTER_NOTFOUND"; payload: string }
  | {
      type: "MOUNT_COMPONENT";
      payload: { path: string; element: ReactElement };
    };

//关于routerConfigTy的定义
export type routerConfigTy = { [path: string]: NaiadRouterConfigItem };
export type NaiadRouterConfigItem = {
  path: string;
  label: string;
  icon?: ReactNode;
  loader: () => Promise<{ default: ComponentType }>;
};

export type NaiadRouterConfig = {
  enter: NaiadRouterConfigItem["path"];
  notFound: NaiadRouterConfigItem["path"];
  content: routerConfigTy;
  page?: routerConfigTy;
};

export type NaiadRouter = {
  mode: "tabs" | "routes";
} & (
  | {
      mode: "tabs";
      layout: ReactElement;
      routerConfig: NaiadRouterConfig;
    }
  | {
      mode: "routes";
      router: any;
    }
);
