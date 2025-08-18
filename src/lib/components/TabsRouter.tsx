import React, { useEffect, useRef } from "react";
import { useRouterStore } from "../store/routerStore";
import useTabsRouter from "../hooks/useTabsRouter";
import { useLocation } from "react-router";
import useScrollAuto from "../hooks/useScrollAuto";
import { HiX } from "react-icons/hi";
import type { NaiadRouterConfigItem } from "../types";

type TabsRouterProps = {
  clearAllThreshold?: number;
};
type TabItemProps = {
  tab: NaiadRouterConfigItem;
  isActive: boolean;
  onClose: () => void;
};

const TabItem: React.FC<TabItemProps> = ({ tab, isActive, onClose }) => {
  const { openTab } = useTabsRouter();

  return (
    <div
      style={{
        minWidth: 80,
        maxWidth: 140,
        width: "auto",
        height: 35,
        padding: "0 5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        background: "#fff",
        marginRight: 5,
        borderRadius: 4,
        borderBottom: isActive ? "2px solid #0052d9" : "none",
      }}
    >
      <div onClick={() => !isActive && openTab(tab.path)}>
        {tab.icon && (
          <span style={{ height: "auto", width: 18 }}>{tab.icon}</span>
        )}
        <span style={{ maxWidth: 100, overflow: "hidden" }}>{tab.label}</span>
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
  const tabsWrapperRef = useRef<HTMLDivElement>(null);

  //路由标签移动
  const { tabsRef, dir, speed, handleMouseMove, handleMouseLeave } =
    useScrollAuto();
  useEffect(() => {
    const el = tabsWrapperRef.current;
    if (!el) return;
    const uid = `slider-${Math.random().toString(36).slice(2)}`;
    el.classList.add(uid);
    const style = document.createElement("style");
    style.innerHTML = `
      .${uid}::-webkit-scrollbar { display: none; }
      .${uid} { scrollbar-width: none; -ms-overflow-style: none; }
    `;
    document.head.appendChild(style);
    return () => {
      el.classList.remove(uid);
      style.remove();
    };
  }, []);

  useEffect(() => {
    if (!tabsWrapperRef.current || dir === 0) return;

    let frameId: number;
    const scroll = () => {
      tabsWrapperRef.current!.scrollLeft += dir * speed;
      frameId = requestAnimationFrame(scroll);
    };
    frameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(frameId);
  }, [dir, speed]);

  return (
    <div
      style={{ width: "100%", overflow: "hidden", position: "relative" }}
      ref={tabsRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          display: "flex",
          width: "clac(100% - 100px)",
          height: 46,
          borderBottom: "1px solid #f0f0f0",
          justifyContent: "space-between",
          alignItems: "flex-end",
          overflowX: "auto",
          paddingRight: 100,
        }}
        ref={tabsWrapperRef}
        className="tabs-router-tabs-wrapper"
      >
        <div style={{ display: "flex", marginLeft: 5 }}>
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
          <button
            style={{
              position: "absolute",
              right: 0,
              bottom: 3,
              border: "none",
              color: "#0052d9",
              width: "auto",
              height: 37,
              padding: "0 5px",
              cursor: "pointer",
              background: "#fff",
              marginRight: 5,
              borderRadius: 4,
            }}
            onClick={closeAllTabs}
          >
            关闭全部
          </button>
        )}
      </div>
    </div>
  );
};

export default TabsRouter;
