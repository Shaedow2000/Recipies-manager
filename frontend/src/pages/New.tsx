import { Form, useLoaderData, useNavigate, useNavigation } from "react-router";
import type { RecipeLoader } from "../types/LoaderType";

function New() {
  const data: RecipeLoader = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const loading: boolean =
    navigation.state === "loading" || navigation.state === "submitting";

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
            <div>
              <input
                type="text"
                name="ing_name"
                placeholder="ingredient name"
              />
              <input
                type="text"
                name="ing_amount"
                placeholder="ingredient amount"
              />
            </div>
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
