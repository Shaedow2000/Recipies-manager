import { useLoaderData, useNavigate } from "react-router";
import type { RecipeLoader } from "../types/LoaderType";

function Details() {
  const data: RecipeLoader = useLoaderData();
  const navigate = useNavigate();

  return (
    <section>
      <div className="top">
        <h1>
          {!data.ok
            ? `An error occured: ${data.data.error.message}`
            : `Recipe: ${data.data.recipes.name}`}
        </h1>
        <a onClick={() => navigate("/")}>Home</a>
      </div>
      <div className="recipe-info">
        <p>
          Category: <span>{data.data.recipes.category}</span>
        </p>
        <p>
          Preparation time: <span>{data.data.recipes.prep_time}</span>
        </p>
        <div className="ings">
          <p>Ingredients:</p>
          {data.data.recipes.ingredients.map(
            (ing: { name: string; amount: string }) => (
              <div className="ing">
                <p>
                  name: <span>{ing.name}</span>
                </p>
                <p>
                  amount: <span>{ing.amount}</span>
                </p>
              </div>
            ),
          )}
        </div>
        <div className="instr">
          <p>Instructions: </p>
          <span>{data.data.recipes.instructions}</span>
        </div>
        <p>
          Cooking time: <span>{data.data.recipes.cook_time}</span>
        </p>
      </div>
    </section>
  );
}

export default Details;
