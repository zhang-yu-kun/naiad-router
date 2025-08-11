import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NaiadRouter } from "../index";
import A0 from "./A0";

const routerConfig = {
  "/a1": {
    path: "/a1",
    loader: () => import("./A1"),
    label: "a1",
  },
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
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NaiadRouter mode="tabs" layout={<A0 />} routerConfig={routerConfig} />
  </StrictMode>
);
