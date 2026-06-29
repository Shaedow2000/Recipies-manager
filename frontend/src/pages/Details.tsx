import { useLoaderData } from "react-router";
import type { RecipeLoader } from "../types/LoaderType";

function Details() {
  const data: RecipeLoader = useLoaderData();
  console.log(data);

  return (
    <section>
      <div>
        <h1>
          {!data.ok
            ? `An error occured: ${data.data.error.message}`
            : `Recipe: ${data.data.recipes.name}`}
        </h1>
      </div>
      <div className="recipe-info">
        <p>Category: {data.data.recipes.category}</p>
        <p>Preparation time: {data.data.recipes.prep_time}</p>
        <div className="ings">
          <p>Ingredients:</p>
          {data.data.recipes.ingredients.map(
            (ing: { name: string; amount: string }) => (
              <div className="ing">
                <p>name: {ing.name}</p>
                <span>amount: {ing.amount}</span>
              </div>
            ),
          )}
        </div>
        <div>
          <p>Instructions: </p>
          <p>{data.data.recipes.instructions}</p>
        </div>
        <p>Cooking time: {data.data.recipes.cook_time}</p>
      </div>
    </section>
  );
}

export default Details;
