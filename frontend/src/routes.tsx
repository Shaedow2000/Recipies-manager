import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Root from "./layouts/Root";
import getAllRecipes from "./loaders/getAllRecipes";

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
        Component: () => <p>RECIPE</p>,
      },
      {
        path: "/new",
        Component: () => <></>,
      },
    ],
  },
]);

export default router;
