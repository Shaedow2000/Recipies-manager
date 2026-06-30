import { useNavigate } from "react-router";
import RecipeCard from "../components/RecipeCard";
import getAllRecipes from "../loaders/getAllRecipes";
import { useEffect, useState } from "react";
import type { RecipeLoader } from "../types/LoaderType";

function Home() {
  const [data, setData]: [data: RecipeLoader, setData: any] = useState(
    {} as any,
  );
  const [isLoading, setLoading]: [isLoading: boolean, setLoading: any] =
    useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRecipes()
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error: unknown) => {
        setData(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{ width: "100vw", height: "100vh", backgroundColor: "green" }}
        >
          <p style={{ fontSize: "24px", color: "red" }}>LOADING</p>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default Home;
