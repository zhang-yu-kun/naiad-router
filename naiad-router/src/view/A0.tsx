import { TabsRouter } from "../index";
import { Outlet, useNavigate } from "react-router";

const A0 = () => {
  const navigete = useNavigate();
  const menu = [
    {
      key: "/a1",
      label: "a1",
    },
    {
      key: "/a2",
      label: "a2",
    },
  ];

  return (
    <div>
      <nav>
        {menu.map((item) => (
          <li key={item.key} onClick={() => navigete(item?.key)}>
            {item.label}
          </li>
        ))}
      </nav>
      <TabsRouter />

      <Outlet />
    </div>
  );
};

export default A0;
