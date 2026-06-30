import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Root from "./layouts/Root";
import Details from "./pages/Details";
import getRecipeById from "./loaders/getRecipeById";
import New from "./pages/New";
import newRecipe from "./actions/createRecipe";
import getCategories from "./loaders/getCategories";
import Search from "./pages/Search";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/recipe/:id",
        loader: ({ params }) => getRecipeById(params),
        Component: Details,
      },
      {
        path: "/new",
        loader: getCategories,
        action: newRecipe,
        Component: New,
      },
      {
        path: "/search",
        Component: Search,
      },
    ],
  },
]);

export default router;
