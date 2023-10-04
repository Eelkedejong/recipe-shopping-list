import Recipe from './RecipeTile'
import { Link } from 'react-router-dom'

const RecipeList = ({ recipes }) => {

  return (
    <div className='recipe-list'>
      {!recipes.length ? (
        <>
          <h1>No recipies found</h1>
          <Link to="/recipe/create">Add recipe</Link>
        </>
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
          );
        })
      )}
    </div>
  )
}

export default RecipeList