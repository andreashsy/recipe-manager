export interface Recipe {
  id: string;
  title: string;
  image: string;
  instruction: string;
  ingredients: string[];
}

export interface Ingredient {
  ingredient: string
}
