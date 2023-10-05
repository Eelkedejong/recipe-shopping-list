import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getRecipe from './api/getRecipe'

const EditRecipe = ({ userToken }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const results = useQuery(
    ["recipes", userToken, id], 
    getRecipe,
    { enabled: !!userToken}
  )
  
  const recipe = results?.data?.data ?? [];
  console.log('recipe', recipe)

  return (
    <>
      {recipe ? (
        <div>{recipe.name}</div>
      ) : null }

      <button onClick={() => {navigate("/")}}>
        Back to homepage
      </button>
    </>
  )
}

export default EditRecipe