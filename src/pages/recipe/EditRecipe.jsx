import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import getRecipe from './api/getRecipe'
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const EditRecipe = ({ userToken }) => {
  const { t } = useTranslation()
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

      <Button 
        onClick={() => {navigate("/")}}
        text={t("Cancel")}
        type="ghost"
      />
    </>
  )
}

export default EditRecipe