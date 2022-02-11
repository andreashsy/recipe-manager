import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Recipe } from "../models";

@Injectable()
export class RecipeService {

  url = "http://localhost:8080/api/recipes"

  constructor(private http: HttpClient) {

  }

  async getAllRecipes() {
    return await lastValueFrom(
      this.http.get<any>(this.url)
    )
  }
}
