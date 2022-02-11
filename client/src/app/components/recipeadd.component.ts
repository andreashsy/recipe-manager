import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient, Recipe } from '../models';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipeadd',
  templateUrl: './recipeadd.component.html',
  styleUrls: ['./recipeadd.component.css']
})
export class RecipeAddComponent implements OnInit {

  addForm!: FormGroup
  ingredientsArray!: FormArray

  constructor(
    private fb: FormBuilder,
    private recipeSvc: RecipeService
    ) { }

  ngOnInit(): void {
    this.addForm = this.createRecipeForm()
    this.ingredientsArray = this.addForm.get('ingredients') as FormArray
  }

  sendRecipe() {
    let recipe = this.addForm.value as Recipe
    console.info("Sending Recipe Details: ", JSON.stringify(recipe))
    console.info("Recipe ingredients before: ", JSON.stringify(recipe.ingredients))
    let newIngredients = []
    for (let i of recipe.ingredients) {
      var a = JSON.stringify(i)
      let newLine1 = a.replace(String.raw`{"ingredientLine":"`, "")
      let newLine = newLine1.replace(String.raw`"}`, "")
      newIngredients.push(newLine)
    }
    recipe.ingredients = newIngredients
    console.info("Recipe ingredients after: ", JSON.stringify(recipe.ingredients))

  }

  createRecipeForm(): FormGroup {
    this.ingredientsArray = this.createIngredients()
    return this.fb.group({
      title: this.fb.control(''),
      ingredients: this.createIngredients(),
      instruction: this.fb.control(''),
      image: this.fb.control('')
    })
  }

  addIngredient(ing: Ingredient) {
    this.ingredientsArray.push(this.createIngredient(ing))
  }

  createIngredient(ing: Partial<Ingredient>): FormGroup {
    return this.fb.group ({
      ingredientLine: this.fb.control(ing?.ingredient || '', [Validators.required])
    })
  }

  createIngredients(ingredients: Ingredient[] = []): FormArray {
    const ingredientList = this.fb.array([], Validators.required)
    for (let i of ingredients)
      ingredientList.push(this.createIngredient(i))
    return ingredientList
  }

  deleteIngredient(i: number) {
    this.ingredientsArray.removeAt(i)
  }

}
