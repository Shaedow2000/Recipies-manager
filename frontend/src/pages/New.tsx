import { Form, useLoaderData, useNavigate, useNavigation } from "react-router";
import type { RecipeLoader } from "../types/LoaderType";
import { useState } from "react";

function New() {
  const data: RecipeLoader = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const loading: boolean =
    navigation.state === "loading" || navigation.state === "submitting";

  const [ingredientDivs, setIngredients] = useState(() => [
    <div>
      <input type="text" placeholder="ingredient name" />
      <input type="text" placeholder="ingredient amount" />
    </div>,
  ]);

  function addIngredient() {
    let newIngredientDivs = ingredientDivs;
    newIngredientDivs.push(
      <div>
        <input type="text" placeholder="ingredient name" />
        <input type="text" placeholder="ingredient amount" />
      </div>,
    );

    setIngredients([...newIngredientDivs]);
  }

  return (
    <section>
      <div className="top">
        <h1>
          {!data.ok
            ? `An error occured: ${data.data.status} - ${data.data.message}`
            : `New`}
        </h1>
        <a onClick={() => navigate("/")}>Home</a>
      </div>
      <div>
        {data.ok ? (
          <Form method="post" action="/new">
            <input type="text" name="name" placeholder="name" />
            <select name="category" required>
              <option value={"Select a category"} disabled>
                Select a category
              </option>
              {data.data.categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <section>
              {ingredientDivs}
              <button type="button" onClick={addIngredient}>
                Add ingredient
              </button>
            </section>
            <textarea
              name="instructions"
              placeholder="recipe instructions"
            ></textarea>
            <input
              type="number"
              name="prep_time"
              placeholder="preparation time in min"
            />
            <input
              type="number"
              name="cook_time"
              placeholder="cooking time in min"
            />
            <button type="submit">{loading ? "SUBMITTING" : "Submit"}</button>
          </Form>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default New;
