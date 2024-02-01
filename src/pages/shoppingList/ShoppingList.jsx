import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import getShoppingList from "./api/getShoppingList";
import getShoppingListRecipes from "./api/getShoppingListRecipes";
import { updateShoppingListItems } from "./api/updateShoppingList";
import ShoppingListRecipeList from "../../components/shoppingList/ShoppingListRecipeList";
import ShoppingListItems from "../../components/shoppingList/ShoppingListItems";
import { submbitShoppingList } from "./utils/sumbitShopingList";
import Button from "../../components/ui/Button";
import styles from "./shoppinglist.module.scss";

const ShoppingList = () => {
  const user = useSelector((state) => state.user.value);
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const editMutation = useMutation({
    mutationFn: updateShoppingListItems,
    onSuccess: (data) => {
      console.log("mutation data", data?.data);
      // queryClient.setQueryData("shoppingList", data?.data);
      queryClient.invalidateQueries({ queryKey: ["shoppingList"] });
      console.log("success");
      navigate("/list");
    },
  });

  let ids = []; // Track the ids of the recipes in the shopping list.

  // Get the shopping list.
  const shopplingList = useQuery({
    queryKey: ["shoppingList", user.token],
    queryFn: getShoppingList,
    ...{
      // The query will not execute until the userToken exists.
      enabled: !!user.token,
    },
  });

  // const QueryData = queryClient.getQueryData("shoppingList");
  // console.log("QueryData", QueryData);

  const list = shopplingList?.data?.data ?? [];
  // console.log("ShoppingList", list);

  if (!shopplingList.isLoading) {
    if (list.recipes) {
      // Get a string of all the ids of the recipes in the shoppinglist. Join them with a comma.
      ids = list.recipes.map((item) => item.id).join(",");
    }
  }

  // console.log("ids", ids, ids.length);

  const recipes = useQuery({
    queryKey: ["shoppingList recipes", user.token, ids],
    queryFn: getShoppingListRecipes,
    ...{
      // The query will not execute until the userToken exists and there are ids.
      enabled: !!user.token && ids.length > 0,
    },
  });

  const recipeList = recipes?.data?.data ?? [];

  console.log("recipeList", recipeList);

  /**
   * Handles the submission of a recipe form.
   *
   * @param {Event} e - The form submission event.
   */
  // const handleSubmitRecipe = (e) => {
  //   const formData = new FormData(e.target);
  //   const values = Object.fromEntries(formData.entries());

  //   console.log("values", values, typeof values);

  //   // All values of which the key starts with "extra" sould go in an array.
  //   // Create an array of all the values that start with "extra".
  //   const extraItems = {
  //     extraItems: Object.keys(values)
  //       .filter((key) => key.startsWith("extra"))
  //       .map((key) => values[key]),
  //   };

  //   // console.log("extraValues", extraItems);

  //   // Get the values from the values const, and create an array of strings.
  //   const items = { items: Object.values(values) };

  //   // combine items and extraValues into a single object
  //   // console.log("items", items);

  //   editMutation.mutate([Object.assign(items, extraItems), user.token]);
  // };

  return (
    <form
      className={`gap-5 dg gap-30 ${styles.grid}`}
      onSubmit={(e) => {
        e.preventDefault();
        // handleSubmitRecipe(e);
        const items = submbitShoppingList(e);
        editMutation.mutate([items, user.token]);
      }}
    >
      <div className="">
        {!recipes.isLoading && recipes.isSuccess ? (
          <ShoppingListRecipeList recipeList={recipeList} />
        ) : null}
      </div>

      <div>
        {!shopplingList.isLoading && recipes.isSuccess ? (
          <ShoppingListItems items={list.extraItems} />
        ) : null}

        <Button text={t("Save recipe")} type="submit" className="w-100" />
      </div>
    </form>
  );
};

export default ShoppingList;
