import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { FaXmark } from 'react-icons/fa6';
import PersonSelector from '../elements/PersonSelector';
import removeShippingListRecipe from '@/pages/shoppingList/api/removeShoppingListRecipe';
import Checkbox from '@/components/ui/Checkbox';

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
    <div className="bg-white p-6 rounded-20 mb-6">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-20 font-bold">{name}</h3>
        <button
          className="flex justify-center"
          onClick={(e) => {
            e.preventDefault();
            setRecipes((prevRecipes) =>
              prevRecipes.filter((recipe) => recipe.name !== name)
            );
            deleteMutation.mutate([userToken, id]);
          }}
        >
          <FaXmark className="text-20" />
        </button>
      </div>

      <PersonSelector
        personsState={personsState}
        setPersonsState={setPersonsState}
        recipeId={id}
      />

      <div className="flex flex-wrap mt-3">
        {ingredients
          ? ingredients.map((ingredient, index) => {
              const amount = ingredient.amount * (personsState / persons);
              // Recipes saved before the catalog existed store the text as
              // `ingredient`; everything since stores it as `name`.
              const ingredientName =
                ingredient.name ?? ingredient.ingredient ?? '';
              const ingredientText = [
                amount > 0 ? parseFloat(amount.toFixed(2)) : null, // max 2 decimals
                ingredient.unit,
                ingredientName,
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <div
                  className="flex w-1/2 gap-4 mb-4 pb-1"
                  // Keyed by position: a recipe may legitimately list the same
                  // ingredient twice, which a name-based key collided on.
                  key={ingredient.id ?? index}
                >
                  <label className="mr-3 flex gap-4 label cursor-pointer">
                    <Checkbox
                      name={ingredientText}
                      value={ingredientText}
                      defaultChecked={true}
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
