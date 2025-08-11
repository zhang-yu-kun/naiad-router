import { useNavigate } from "react-router";
import { useRouterStore } from "../store/routerStore";

const useTabsRouter = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useRouterStore();

  const openTab = (path: string) => {
    const routerItem = state.routerConfig && state.routerConfig[path];
    if (!routerItem) {
      console.warn(`找不到路径为 ${path} 的菜单项`);
      return;
    }
    navigate(path);

    if (!state.cacheMap.has(path)) {
      dispatch({
        type: "ADD_TAB",
        payload: {
          routerItem,
          path,
          loader: state.routerConfig?.[path]?.loader as () => Promise<{
            default: React.ComponentType;
          }>,
        },
      });
    }
  };
  const closeTab = (path: string, currentPath: string) => {
    const { tabsList } = state;

    if (tabsList.length === 1) return;

    if (currentPath === path) {
      const currentIndex = tabsList.findIndex((item) => item.path === path);
      let targetPath = "";
      if (currentIndex === 0) {
        targetPath = tabsList[1]?.path || "/";
      } else if (currentIndex === tabsList.length - 1) {
        targetPath = tabsList[tabsList.length - 2]?.path || "/";
      } else {
        targetPath = tabsList[currentIndex - 1]?.path || "/";
      }

      navigate(targetPath);
      dispatch({ type: "REMOVE_TAB", payload: path });
    } else {
      dispatch({ type: "REMOVE_TAB", payload: path });
    }
  };
  const closeAllTabs = () => dispatch({ type: "REMOVE_ALL_TABS" });

  return {
    openTab,
    closeTab,
    closeAllTabs,
    state,
    dispatch,
  };
};

export default useTabsRouter;
