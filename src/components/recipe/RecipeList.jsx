import Recipe from './RecipeTile'
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom'
import getRecipes from './api/getRecipe'

const RecipeList = ({ userToken }) => {

  const results = useQuery(
    ["recipes", userToken, ''], 
    getRecipes,
    {
      // The query will not execute until the userToken exists.
      enabled: !!userToken,
    }
  )
  
  const recipes = results?.data?.data ?? [];

  return (
    <div className='recipe-list'>
      {!recipes.length ? (
        null
      ) : (
        recipes.map((recipe) => {
          return (
            <Recipe
              name={recipe.name}
              description={recipe.description}
              persons={recipe.persons}
              carb={recipe.carb}
              time={recipe.time}
              ingredients={recipe.ingredients}
              id={recipe.id}
              key={recipe.id}
            />
          )
        })
      )}
    </div>
  )
}

export default RecipeList