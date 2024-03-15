import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import getShoppingList from './api/getShoppingList';
import getShoppingListRecipes from './api/getShoppingListRecipes';
import {
  updateShoppingListItems,
  updateShoppingListRecipes,
} from './api/updateShoppingList';
import ShoppingListRecipeList from '../../components/shoppingList/ShoppingListRecipeList';
import ShoppingListItems from '../../components/shoppingList/ShoppingListItems';
import { submbitShoppingList } from './utils/sumbitShopingList';
import Button from '../../components/ui/Button';
import styles from './shoppinglist.module.scss';

const ShoppingList = () => {
  const [message, setMessage] = useState('');
  const user = useSelector((state) => state.user.value);
  const shoppingListRecipes = useSelector(
    (state) => state.shoppingListRecipes.value
  );
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const editItems = useMutation({
    mutationFn: updateShoppingListItems,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shoppingList'] });
      setMessage(t('Shopping list saved successfully'));
    },
  });

  const editRecipes = useMutation({
    mutationFn: updateShoppingListRecipes,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['shoppingList'] });
    },
  });

  let ids = []; // Track the ids of the recipes in the shopping list.

  // Get the shopping list.
  const shopplingList = useQuery({
    queryKey: ['shoppingList', user.token],
    queryFn: getShoppingList,
    ...{
      // The query will not execute until the userToken exists.
      enabled: !!user.token,
    },
  });

  const list = shopplingList?.data?.data ?? [];

  if (!shopplingList.isLoading) {
    if (list.recipes) {
      // Get a string of all the ids of the recipes in the shoppinglist. Join them with a comma.
      ids = list.recipes.map((item) => item.id).join(',');
    }
  }

  const recipes = useQuery({
    queryKey: ['shoppingList recipes', user.token, ids],
    queryFn: getShoppingListRecipes,
    ...{
      // The query will not execute until the userToken exists and there are ids.
      enabled: !!user.token && ids.length > 0,
    },
  });

  const recipeList = recipes?.data?.data ?? [];

  return (
    <form
      className={`gap-5 dg gap-30 ${styles.grid}`}
      onSubmit={(e) => {
        e.preventDefault();
        const items = submbitShoppingList(e);
        // Save the shopping list items.
        editItems.mutate([items, user.token]);
        // Save the shopping list recipes.
        editRecipes.mutate([shoppingListRecipes, user.token]);
      }}
    >
      <div className="">
        {!recipes.isLoading && recipes.isSuccess ? (
          <ShoppingListRecipeList
            recipeList={recipeList}
            shoppingListRecipes={list.recipes}
          />
        ) : null}
      </div>

      <div>
        {!shopplingList.isLoading ? (
          <ShoppingListItems items={list.extraItems} />
        ) : null}

        {message ? <p className="message success mb-3">{message}</p> : null}
        <Button
          text={t('Save shopping list')}
          type="submit"
          className="w-100"
        />
      </div>
    </form>
  );
};

export default ShoppingList;
