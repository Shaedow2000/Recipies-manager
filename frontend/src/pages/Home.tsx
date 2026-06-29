import { useLoaderData } from "react-router";
import RecipeCard from "../components/RecipeCard";
import type { RecipeLoader } from "../types/LoaderType";

function Home() {
  const data: RecipeLoader = useLoaderData();

  return (
    <section>
      <div>
        <h1>Home - All recipes</h1>
      </div>
      <div className="recipes">
        {!data.ok ? (
          <p>An error occured: {String(data.data)}</p>
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
