import { useLoaderData } from "react-router";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const data = useLoaderData();

  return (
    <section>
      <div>
        <h1>Home - All recipes</h1>
      </div>
      <div className="recipes">
        {!data.ok ? (
          <p>An error occured: {data.data}</p>
        ) : data.data.recipes.length <= 0 ? (
          <p>No recipes found</p>
        ) : (
          data.data.recipes.map(
            (recipe: {
              name: string;
              instructions: string;
              ingredients: any[];
            }) => (
              <RecipeCard
                title={recipe.name}
                description={recipe.instructions}
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
