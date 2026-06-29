import { Form } from "react-router";

function New() {
  return (
    <section>
      <div>
        <h1>New recipe</h1>
      </div>
      <div>
        <Form method="post" action="/new">
          <input type="text" name="name" placeholder="name" />
          <select name="category">
            <option value={"Select a category"} disabled>
              Select a category
            </option>
          </select>
          <div>
            <input type="text" name="ing_name" placeholder="ingredient name" />
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
          <button type="submit">Submit</button>
        </Form>
      </div>
    </section>
  );
}

export default New;
