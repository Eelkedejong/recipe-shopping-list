import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import { updateRecipes } from '@/store/shoppingListRecipesSlice';

const PersonSelector = ({ personsState, setPersonsState, recipeId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let shopplingListRecipeData = {
    id: recipeId,
    persons: personsState,
  };

  const handlePersonsChange = (newPersonsState) => {
    setPersonsState(newPersonsState);
    shopplingListRecipeData = {
      ...shopplingListRecipeData,
      persons: newPersonsState,
    };
    dispatch(updateRecipes(shopplingListRecipeData));
  };

  return (
    <div className="flex items-center gap-6">
      <button
        type="button"
        onClick={() => {
          const newPersonsState =
            personsState > 1 ? personsState - 1 : personsState;
          handlePersonsChange(newPersonsState);
        }}
      >
        <FaCircleMinus style={{ color: '#F1A661', fontSize: '22px' }} />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-14">{t('Persons')}</span>
        <span className="text-main font-semibold">{personsState}</span>
      </div>
      <button
        type="button"
        onClick={() => {
          const newPersonsState = personsState + 1;
          handlePersonsChange(newPersonsState);
        }}
      >
        <FaCirclePlus style={{ color: '#F1A661', fontSize: '22px' }} />
      </button>
    </div>
  );
};

export default PersonSelector;
