import { async } from 'regenerator-runtime';
import * as model from './model.js'
import resultsView from './views/resultsView.js';
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
const { compileString } = require("sass");


// if(module.hot){
//   module.hot.accept();
// }



const controlRecipes = async function (){
  try {
     const id = window.location.hash.slice(1);
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
     
    
       // 1) Get  search query
    const query = searchView.getQuery();
     if(!query) return;
     resultsView.renderSpinner();
   
    // 2) Load search result
       
   await model.loadSearchResults(query);

   // 3) render search result
   
  //  console.log(model.state.search.results);
   resultsView.render(model.getSearchResultsPage());

  }catch(err){
    console.log(err);
  }
};
// controlSearchResults();


const init = function(){
    recipeView.addHandlerRender(controlRecipes)
    searchView.addHandlerSearch(controlSearchResults)
}
init();

