import { RouterProvider, createBrowserRouter } from "react-router";
import KeepOutlet from "./KeepOutlet";
import { RouterSroreProvider } from "../store/routerStore";
import type { NaiadRouter } from "../types";
import React, { ReactElement, Suspense, useEffect, useState } from "react";

const NaiadRouter: React.FC<NaiadRouter> = (props) => {
  let mode = props.mode;
  const layout = props.mode === "tabs" ? props.layout : null;
  const routerConfig = props.mode === "tabs" ? props.routerConfig : null;

  const router = props.mode === "routes" ? props.router : null;

  const [content, setContent] = useState<{ path: string; element: null }[]>([]);
  const [page, setPage] = useState<{ path: string; element: ReactElement }[]>(
    []
  );

  useEffect(() => {
    const n_list = Object.values(routerConfig?.content || {}).map((item) => ({
      path: item.path,
      element: null,
    }));
    setContent(n_list);
    const p_list = Object.values(routerConfig?.page || {}).map((item) => {
      const Com = React.lazy(item.loader);
      return {
        path: item.path,
        element: (
          <Suspense fallback={<div>Loading</div>}>
            <Com />
          </Suspense>
        ),
      };
    });
    setPage(p_list);
  }, [routerConfig]);

  const getRoutes = () => {
    const routes = [
      {
        path: "/",
        element: layout,
        children: [
          {
            path: "/",
            element: <KeepOutlet />,
            children: content,
          },
        ],
      },
      ...page,
    ];

    if (content.length > 0) {
      return createBrowserRouter(routes);
    }
    return createBrowserRouter([]);
  };

  if (mode === "routes") {
    return <RouterProvider router={router} />;
  }

  if (mode === "tabs") {
    return (
      <RouterSroreProvider
        routerConfig={{ ...routerConfig?.content, ...routerConfig?.page }}
      >
        {content.length > 0 && <RouterProvider router={getRoutes()} />}
      </RouterSroreProvider>
    );
  }
};

export default NaiadRouter;
