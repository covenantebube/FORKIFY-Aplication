import { async } from 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
const { compileString } = require("sass");






const controlRecipes = async function (){
  try {
    // const id = window.location.hash.slice(1);
      const id = window.location.pathname.slice(1);
      console.log(id);

      if (!id) return;
    recipeView.renderSpinner();

    //* 1) Loading Recipe
    await model.loadRecipe(id);
      
     //* 2)Rendering recipe
    recipeView.render(model.state.recipe);        
  } catch (err){
    recipeView.renderError()
  }
}; 

const controlSearchResults = async function(){
  try{
    const query = searchView.getQuery();
    if(!query) return;

   await model.loadSearchResults(query);
   console.log(model.state.search.results)
  }catch(err){
    console.log(err);
  }
};
controlSearchResults();


const init = function(){
    recipeView.addHandlerRender(controlRecipes)
    searchView.addHandlerSearch(controlSearchResults)
}
init();

