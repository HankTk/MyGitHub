// Algorithms to perform searches, filters, etc.

import { ACTIONS, SUPPLIES } from './Data';

/*
  Given some drink recipes and a list of available supplies, return all drink recipes
  that can be made with the supplies.
  Note that some drinks may require multiple of the same supply, and that the input
  array may have multiple of the same supply, indicating the available quantity.

  Parameter format:
  - drinks: array of drink objects:
      {
        name: drink name,
        steps: array of steps (strings) which come from either ACTIONS or SUPPLIES
      }
  - supplies: array of strings which come from SUPPLIES

  Return format:
  - array of drink objects whose recipes can be made with the supplies
*/
export function whatCanIMake(drinks, supplies) {
    /*
    return [{
        name: 'You Need To Implement This',
        steps: []
    }];
    */
    //  return null;

    const foundDrinks = [];
    for (let i = 0; i < drinks.length; i++) {

        // Steps
        let steps = drinks[i].steps;

        // Reduce dupplicate entries
        const ingredients = steps;
        const distinctIngredients = ingredients.reduce(
            (distinct, ingredient) => (distinct.indexOf(ingredient) !== -1) ? distinct : [...distinct, ingredient], []
        );

        // Remove action from steps
        let finalIngredients = [];
        for (let i = 0; i < distinctIngredients.length; i++) {
            const ingredient = distinctIngredients[i];
            if (ACTIONS.indexOf(ingredient) > -1) {
                continue;
            }
            finalIngredients.push(ingredient);
        }

        // compare
        if (finalIngredients.sort().toString() === supplies.sort().toString()) {
            foundDrinks.push(drinks[i]);
        }
    }

    // Return foundDrinks
    return foundDrinks;
}


/*
  Given some drink recipes and a given recipe, return any drink whose recipe matches
  the given recipe.

  Parameter format:
  - drinks: array of drink objects:
      {
        name: drink name,
        steps: array of steps (strings) which come from either ACTIONS or SUPPLIES
      }
  - recipe: array of strings of steps which come from either ACTIONS or SUPPLIES

  Return format:
  - array of drink objects whose recipes can be made with the supplies
*/
export function searchDrinks(drinks, recipe) {
    let drinkSet, recipeSet;
    drinks.forEach(drink => {
        drinkSet = new Set(drink.steps);
        recipeSet = new Set(recipe);
    });

    console.log(recipe.toString());

    /*
    return [{
        name: 'You Need To Implement This',
        steps: []
    }];
    */

    let newRecipeSteps = getStepWithoutOrder(recipe);

    const foundDrinks = [];
    for (let i = 0; i < drinks.length; i++) {

        /*
        if (drinks[i].steps.toString() === recipe.toString()) {
            foundDrinks.push(drinks[i]);
        }
        */
        let drinkRecipeSteps = getStepWithoutOrder(drinks[i].steps);
        if (drinkRecipeSteps.toString() === newRecipeSteps.toString()) {
            foundDrinks.push(drinks[i]);
        }
    }

    return foundDrinks;

}

export function getStepWithoutOrder(recipe) {
    let steps = [];
    let supplies = [];
    for (let j = 0; j < recipe.length; j++) {
        let item = recipe[j];
        if (ACTIONS.indexOf(item) > -1) {
            steps.push(item);
        } else {
            supplies.push(item);
            if (recipe.length === (j + 1)) {
                steps.push(supplies.sort());
                supplies = [];
            } else {
                let nextRecipe = recipe[j + 1];
                if (ACTIONS.indexOf(nextRecipe) > -1) {
                    steps.push(supplies.sort());
                    supplies = [];
                }
            }
        }
    }
    return steps;
}