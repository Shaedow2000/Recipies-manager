import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Root from "./layouts/Root";
import getAllRecipes from "./loaders/getAllRecipes";
import Details from "./pages/Details";
import getRecipeById from "./loaders/getRecipeById";
import New from "./pages/New";
import newRecipe from "./actions/createRecipe";

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
        loader: ({ params }) => getRecipeById(params),
        Component: Details,
      },
      {
        path: "/new",
        action: newRecipe,
        Component: New,
      },
    ],
  },
]);

export default router;
