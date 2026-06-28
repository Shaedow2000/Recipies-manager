import { createBrowserRouter } from "react-router";
import Root from "./layouts/Root";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/recipe/:id",
        Component: () => <></>,
      },
      {
        path: "/new",
        Component: () => <></>,
      },
    ],
  },
]);

export default router;
