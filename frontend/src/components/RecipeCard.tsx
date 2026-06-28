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
      <p>{description}</p>
      <span>{numberOfIngredients}</span>
    </section>
  );
}

export default RecipeCard;
