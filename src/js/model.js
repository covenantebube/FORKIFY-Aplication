import { async } from "regenerator-runtime";
import { API_URL } from "./config";
import { getJSON } from "./helpers";
export const state ={
 recipe: {}
};
export const loadRecipe = async function(id){
         try{
       const data = await getJSON(`${API_URL}/${id}`);
       const {recipe} = data.data;
       state.recipe = {
        id :recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl :recipe.source_url,
        image: recipe.image_url,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings,
        ingredients: recipe.ingredients
       };
       console.log(state.recipe);
    }catch(err){
        // Temp error handling
       console.error(`${err}****`);
       throw err;
    }
};