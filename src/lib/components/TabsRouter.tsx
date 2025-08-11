import React from "react";
import { useRouterStore } from "../store/routerStore";
import useTabsRouter from "../hooks/useTabsRouter";
import { useLocation } from "react-router";
import { HiX } from "react-icons/hi";
import type { NaiadRouterConfig } from "../types";

type TabsRouterProps = {
  clearAllThreshold?: number;
};
type TabItemProps = {
  tab: NaiadRouterConfig;
  isActive: boolean;
  onClose: () => void;
};

const TabItem: React.FC<TabItemProps> = ({ tab, isActive, onClose }) => {
  const { openTab } = useTabsRouter();

  return (
    <div
      style={{
        minWidth: 80,
        width: "auto",
        height: 35,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        borderBottom: isActive ? "2px solid #0052d9" : "none",
      }}
    >
      <div onClick={() => !isActive && openTab(tab.path)}>
        {tab.icon && (
          <span style={{ height: "auto", width: 18 }}>{tab.icon}</span>
        )}
        <span>{tab.label}</span>
      </div>
      <button
        style={{
          background: "none",
          border: "none",
          width: "auto",
          height: "auto",
          color: "#c0c0c0",
        }}
        title="关闭标签页"
        onClick={() => onClose()}
      >
        <HiX />
      </button>
    </div>
  );
};

const TabsRouter: React.FC<TabsRouterProps> = ({ clearAllThreshold = 5 }) => {
  const { state } = useRouterStore();
  const { closeTab, closeAllTabs } = useTabsRouter();
  const location = useLocation();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: 46,
        borderBottom: "1px solid #f0f0f0",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <div style={{ display: "flex" }}>
        {state.tabsList.map((tab) => (
          <TabItem
            key={tab.path}
            tab={tab}
            isActive={location.pathname === tab.path}
            onClose={() => closeTab(tab.path, location.pathname)}
          />
        ))}
      </div>
      {state.tabsList?.length > clearAllThreshold && (
        <button onClick={closeAllTabs}>关闭全部</button>
      )}
    </div>
  );
};

export default TabsRouter;
