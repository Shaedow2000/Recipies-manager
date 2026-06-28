export type RecipeType = {
  id: number;
  name: string;
  category: number;
  instructions: string;
  prep_time: number;
  cook_time: number;
  ingredients: {
    name: string;
    amount: string;
  }[];
};

export type Recipe = {
  id: number;
  name: string;
  category: number;
  instructions: string;
  prep_time: number;
  cook_time: number;
  ingretients_name: string;
  amount: string;
};

export type RecipeInfo = {
  id: number;
  name: string;
  category: number;
  instructions: string;
  prep_time: number;
  cook_time: number;
}[];

export type Ingredients = {
  id: number;
  ingredients: {
    name: string;
    amount: string;
  }[];
}[];
