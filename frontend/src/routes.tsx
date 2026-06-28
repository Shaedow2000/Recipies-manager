import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <></>,
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
