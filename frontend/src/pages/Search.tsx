import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import search from "../utils/search";
import RecipeCard from "../components/RecipeCard";

function Search() {
  const navigate = useNavigate();
  const foundRecipesDivRef = useRef(null);
  const [data, setData] = useState([]);

  async function handleSearch(e: any) {
    const response = await search(e.target.value);

    setData(response.data);
  }

  return (
    <section>
      <div className="top">
        <h1>Search</h1>
        <a onClick={() => navigate("/")}>Home</a>
      </div>
      <div>
        <input onChange={handleSearch} placeholder="search" />
        <div className="found-recipes" ref={foundRecipesDivRef}>
          {data && data.length > 0 ? (
            data.map(
              (recipe: {
                id: number;
                name: string;
                category: string;
                ingredients: { name: string; amount: string }[];
              }) => (
                <RecipeCard
                  id={recipe.id}
                  title={recipe.name}
                  category={recipe.category}
                  numberOfIngredients={recipe.ingredients.length}
                />
              ),
            )
          ) : (
            <p>No recipes found</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Search;
