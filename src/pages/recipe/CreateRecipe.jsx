import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import createRecipe from './api/createRecipe';
import RecipeForm from '../../components/recipe/RecipeForm';
import Button from '../../components/ui/Button';

const CreateRecipe = () => {
  const userToken = useSelector((state) => state.user.value.token);
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: (data) => {
      // queryClient.setQueryData('recipes', data);
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      // Check if the data has an id, if not, navigate to the home page.
      navigate('/recipe/' + data);
    },
  });

  return (
    <>
      <RecipeForm
        handleSubmit={(responseData) => {
          mutation.mutate([responseData, userToken]);
        }}
      />
    </>
  );
};

export default CreateRecipe;
