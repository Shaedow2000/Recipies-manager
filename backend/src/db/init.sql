CREATE TABLE IF NOT EXISTS category (
  id int UNIQUE,
  name varchar(10)
);

CREATE TABLE IF NOT EXISTS ingredients (
  id int UNIQUE,
  name varchar(80) UNIQUE
);

CREATE TABLE IF NOT EXISTS recipe (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name varchar(80),
  category_id int,
  instructions text,
  prep_time int,
  cook_time int
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
  recipe_id int,
  ingredient_id int,
  amount text
);
