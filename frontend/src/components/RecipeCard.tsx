import { useNavigate } from "react-router";

function RecipeCard({
  id,
  title,
  category,
  numberOfIngredients,
}: {
  id: number;
  title: string;
  category: string;
  numberOfIngredients: number;
}) {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate(`/recipe/${id}`);
  }

  return (
    <section
      id={`recipe-${id}`}
      onClick={handleRedirect}
      className="recipe-card"
    >
      <h2>{title}</h2>
      <h4>Category: {category}</h4>
      <p>
        Number of ingredients:
        <span> {numberOfIngredients}</span>
      </p>
    </section>
  );
}

export default RecipeCard;
