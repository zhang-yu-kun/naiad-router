import { RouterProvider, createBrowserRouter } from "react-router";
import KeepOutlet from "./KeepOutlet";
import { RouterSroreProvider } from "../store/routerStore";
import type { NaiadRouter } from "../types";
import { useEffect, useState } from "react";

const NaiadRouter = ({ mode, router, layout, routerConfig }: NaiadRouter) => {
  const [list, setList] = useState<{ path: string; element: null }[]>([]);

  useEffect(() => {
    const n_list = Object.values(routerConfig || {}).map((item) => ({
      path: item.path,
      element: null,
    }));
    setList(n_list);
  }, [routerConfig]);

  const getRoutes = () => {
    if (list.length > 0) {
      return createBrowserRouter([
        {
          path: "/",
          element: layout,
          children: [
            {
              path: "/",
              element: <KeepOutlet />,
              children: list,
            },
          ],
        },
      ]);
    }
    return createBrowserRouter([]);
  };

  if (mode === "routes") {
    return <RouterProvider router={router} />;
  }

  if (mode === "tabs") {
    return (
      <RouterSroreProvider routerConfig={routerConfig}>
        {list.length > 0 && <RouterProvider router={getRoutes()} />}
      </RouterSroreProvider>
    );
  }
};

export default NaiadRouter;
