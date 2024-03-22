import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { FaXmark } from 'react-icons/fa6';
import PersonSelector from '../elements/PersonSelector';
import removeShippingListRecipe from '../../pages/shoppingList/api/removeShoppingListRecipe';

const ShoppingListRecipe = ({
  setRecipes,
  name,
  ingredients,
  persons,
  id,
  shoppingListPersons,
}) => {
  const userToken = useSelector((state) => state.user.value.token);
  const [personsState, setPersonsState] = useState(shoppingListPersons);

  const deleteMutation = useMutation({
    mutationFn: removeShippingListRecipe,
  });

  return (
    <div className="bg-white p-5 rounded-m mb-5">
      <div className="df aic jcsb pb-3">
        <h3 className="fs-20 fw-bold">{name}</h3>
        <button
          className="df jcc"
          onClick={(e) => {
            e.preventDefault();
            setRecipes((prevRecipes) =>
              prevRecipes.filter((recipe) => recipe.name !== name)
            );
            deleteMutation.mutate([userToken, id]);
          }}
        >
          <FaXmark className="fs-20" />
        </button>
      </div>

      <PersonSelector
        personsState={personsState}
        setPersonsState={setPersonsState}
        recipeId={id}
      />

      <div className="df fww mt-3">
        {ingredients
          ? ingredients.map((ingredient) => {
              const amount = ingredient.amount * (personsState / persons);
              const ingredientText =
                // Show max 2 decimals
                parseFloat(amount.toFixed(2)) +
                ' ' +
                ingredient.unit +
                ' ' +
                ingredient.ingredient;

              return (
                <div
                  className="df w-50 gap-4 mb-4 pb-1"
                  key={ingredient.ingredient}
                >
                  <label className="mr-3 df gap-4 label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name={ingredientText}
                      defaultChecked={true}
                      value={ingredientText}
                    />
                    <span>{ingredientText}</span>
                  </label>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ShoppingListRecipe;
