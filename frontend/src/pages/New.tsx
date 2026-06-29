import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router";
import type { RecipeLoader } from "../types/LoaderType";
import { useState } from "react";

function New() {
  const data: RecipeLoader = useLoaderData();
  const response = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const loading: boolean =
    navigation.state === "loading" || navigation.state === "submitting";

  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);

  function removeIngredient(i: number): void {
    let newIngredients = [...ingredients];
    console.log(i);
    newIngredients.splice(i, 1);
    console.log(newIngredients);

    setIngredients(newIngredients);
  }

  function addIngredient(): void {
    let newIngredientDivs = [...ingredients];
    newIngredientDivs.push({ name: "", amount: "" });

    setIngredients(newIngredientDivs);
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
          <>
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
                {ingredients.map((_j, i) => {
                  return (
                    <div id={`${i}`}>
                      <input
                        type="text"
                        value={ingredients[i].name}
                        onChange={(e) => {
                          let newIngredients = [...ingredients];
                          newIngredients[i] = {
                            ...newIngredients[i],
                            name: e.target.value,
                          };

                          setIngredients(newIngredients);
                        }}
                        placeholder="ingredient name"
                      />
                      <input
                        type="text"
                        value={ingredients[i].amount}
                        onChange={(e) => {
                          let newIngredients = [...ingredients];
                          newIngredients[i] = {
                            ...newIngredients[i],
                            amount: e.target.value,
                          };

                          setIngredients(newIngredients);
                        }}
                        placeholder="ingredient amount"
                      />
                      <button type="button" onClick={() => removeIngredient(i)}>
                        x
                      </button>
                    </div>
                  );
                })}
                <button type="button" onClick={addIngredient}>
                  Add ingredient
                </button>

                <input
                  type="hidden"
                  name="ingredients"
                  value={JSON.stringify(ingredients)}
                />
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
            {!response ? (
              <></>
            ) : response.ok ? (
              <p>RECIPE CREATED</p>
            ) : (
              <p>ERROR</p>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default New;
