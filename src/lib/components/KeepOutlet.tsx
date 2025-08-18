import React, { Suspense, useEffect } from "react";
import { useRouterStore } from "../store/routerStore";
import { matchPath, useLocation } from "react-router";
import LazyLoader from "./LazyLoader";
import useTabsRouter from "../hooks/useTabsRouter";

const KeepOutlet: React.FC = () => {
  const { state, dispatch } = useRouterStore();
  const { openTab } = useTabsRouter();
  const location = useLocation();

  useEffect(() => {
    // 页面加载对象存在，允许打开标签页
    if (state.routerConfig) {
      if (location.pathname === "/") {
        openTab(state.enter);
      }
      const targetRouter = state.routerConfig[location.pathname];

      if (targetRouter) {
        openTab(location.pathname);
      } else {
        openTab(state.notFound);
      }
    }
  }, [location.pathname, state.routerConfig]);

  const isPathMatch = (pathPattern: string) =>
    matchPath(pathPattern, location.pathname);

  return (
    <>
      {Array.from(state.cacheMap.entries()).map(([cacheKey, cacheItem]) => {
        const isActive = isPathMatch(cacheItem.path);

        return (
          <div key={cacheKey} style={{ display: isActive ? "block" : "none" }}>
            {cacheItem.element ? (
              cacheItem.element
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <LazyLoader
                  cacheItem={cacheItem}
                  onMount={(element) => {
                    dispatch({
                      type: "MOUNT_COMPONENT",
                      payload: {
                        path: cacheItem.path,
                        element,
                      },
                    });
                  }}
                />
              </Suspense>
            )}
          </div>
        );
      })}
    </>
  );
};

export default KeepOutlet;
