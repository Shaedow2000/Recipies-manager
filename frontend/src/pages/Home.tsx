import RecipeCard from "../components/RecipeCard";

function Home() {
  return (
    <section>
      <div>
        <h1>Home - All recipes</h1>
      </div>
      <div className="recipes">
        <RecipeCard
          title="Test"
          description="asdfasdfasdfasdfasdf"
          numberOfIngredients={2}
        />
        <RecipeCard
          title="Test"
          description="asdfasdfasdfasdfasdf"
          numberOfIngredients={2}
        />
        <RecipeCard
          title="Test"
          description="asdfasdfasdfasdfasdf"
          numberOfIngredients={2}
        />
        <RecipeCard
          title="Test"
          description="asdfasdfasdfasdfasdf"
          numberOfIngredients={2}
        />
      </div>
    </section>
  );
}

export default Home;
