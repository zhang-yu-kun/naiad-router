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
  routerConfig?: { [path: string]: NaiadRouterConfig };
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
  | { type: "SAVE_ROUTER_CONFIG"; payload: NaiadRouter["routerConfig"] }
  | {
      type: "MOUNT_COMPONENT";
      payload: { path: string; element: ReactElement };
    };

export type NaiadRouterConfig = {
  path: string;
  label: string;
  icon?: ReactNode;
  loader: () => Promise<{ default: ComponentType }>;
};
export type NaiadRouter = {
  mode: "tabs" | "routes";
  router?: any;
  layout?: ReactElement;
  routerConfig?: { [path: string]: NaiadRouterConfig };
};
