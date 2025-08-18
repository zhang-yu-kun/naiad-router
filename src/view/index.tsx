import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NaiadRouter } from "../index";
import A0 from "./A0";

const routeronfig = {
  enter: "/a2",
  notFound: "/a2",

  page: {
    "/a1": {
      path: "/a1",
      loader: () => import("./A1"),
      label: "a1",
    },
  },
  "*": {
    path: "*",
    loader: () => import("./404"),
    label: "b1",
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

    // "/404": {
    //   path: "/404",
    //   loader: () => import("./404"),
    //   label: "找不到",
    // },
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NaiadRouter mode="tabs" layout={<A0 />} routerConfig={routeronfig} />
  </StrictMode>
);
