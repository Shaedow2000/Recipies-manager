function RecipeCard({
  title,
  description,
  numberOfIngredients,
}: {
  title: string;
  description: string;
  numberOfIngredients: number;
}) {
  return (
    <section className="recipe-card">
      <h2>{title}</h2>
      <h4>{description}</h4>
      <p>
        Number of ingredients:
        <span> {numberOfIngredients}</span>
      </p>
    </section>
  );
}

export default RecipeCard;
