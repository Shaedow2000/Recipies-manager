import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Root from "./layouts/Root";
import getAllRecipes from "./loaders/getAllRecipes";
import Details from "./pages/Details";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        loader: getAllRecipes,
        Component: Home,
      },
      {
        path: "/recipe/:id",
        Component: Details,
      },
      {
        path: "/new",
        Component: () => <></>,
      },
    ],
  },
]);

export default router;
