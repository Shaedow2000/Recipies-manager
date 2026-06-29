import { useLoaderData, useNavigate } from "react-router";
import RecipeCard from "../components/RecipeCard";
import type { RecipeLoader } from "../types/LoaderType";

function Home() {
  const data: RecipeLoader = useLoaderData();
  const navigate = useNavigate();

  return (
    <section>
      <div className="top">
        <h1>Home - All recipes</h1>
        <a onClick={() => navigate("/new")}>New</a>
      </div>
      <div className="recipes">
        {!data.ok ? (
          <p>
            An error occured: {data.data.status} - {data.data.message}
          </p>
        ) : data.data.recipes.length <= 0 ? (
          <p>No recipes found</p>
        ) : (
          data.data.recipes.map(
            (recipe: {
              id: number;
              name: string;
              category: string;
              ingredients: any[];
            }) => (
              <RecipeCard
                id={recipe.id}
                key={recipe.id}
                title={recipe.name}
                category={recipe.category}
                numberOfIngredients={recipe.ingredients.length}
              />
            ),
          )
        )}
      </div>
    </section>
  );
}

export default Home;
