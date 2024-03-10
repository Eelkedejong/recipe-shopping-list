import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import { updateRecipes } from '../../../store/shoppingListRecipesSlice';

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

  // let shoppingListRecipeData = [];

  // const handlePersonsChange = (recipeId, newPersonsState) => {
  //   setPersonsState(newPersonsState);
  //   // Check if the recipe already exists in the state
  //   const existingRecipeIndex = shoppingListRecipeData.findIndex((recipe) => recipe.id === recipeId);

  //   if (existingRecipeIndex !== -1) {
  //     // If it exists, update the persons value
  //     shoppingListRecipeData[existingRecipeIndex].persons = newPersonsState;
  //   } else {
  //     // If it doesn't exist, add a new recipe object to the state
  //     shoppingListRecipeData.push({
  //       id: recipeId,
  //       persons: newPersonsState,
  //     });
  //   }

  //   dispatch(updateRecipes([...shoppingListRecipeData]));
  //   console.log('shoppingListRecipeData', shoppingListRecipeData);
  // };

  return (
    <div className="df aic gap-5">
      <button
        type="button"
        onClick={() => {
          const newPersonsState = personsState > 1 ? personsState - 1 : personsState;
          handlePersonsChange(newPersonsState);
        }}
      >
        <FaCircleMinus style={{ color: '#F1A661', fontSize: '22px' }} />
      </button>
      <div className="df fdc aic">
        <span className="fs-14">{t('Persons')}</span>
        <span className="text-main fw-semibold">{personsState}</span>
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
