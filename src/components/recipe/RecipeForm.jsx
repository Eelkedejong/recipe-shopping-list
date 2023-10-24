import { useState } from "react";

import { useTranslation } from "react-i18next";
import IngredientContext from "./utils/ingredientContext";
import { Input, Textarea, Select } from "../ui/Fields";
import Button from "../ui/Button";
import IngredientsList from "./IngredientsList";

const RecipeForm = ({ recipe, handleSubmit }) => {
  const { t } = useTranslation();
  const ingredientRows = useState();

  return (
    <form
      className="df fdc gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        // Converts the form data into an object with key-value pairs.
        const formData = new FormData(e.target);
        const values = Object.fromEntries(formData.entries());

        // Extracts data from the values object by filtering out keys
        // that include "amount", "unit", or "ingredient".
        const responseData = Object.keys(values).reduce((obj, key) => {
          if (
            !key.includes("amount") &&
            !key.includes("unit") &&
            !key.includes("ingredient")
          ) {
            obj[key] = values[key];
          }
          return obj;
        }, {});
        responseData.ingredients = ingredientRows[0];
        responseData.persons = parseInt(responseData.persons);

        handleSubmit(responseData);
      }}
    >
      <Input
        id="name"
        label={t("Recipe name")}
        required={true}
        value={recipe ? recipe.name : null}
        key="name"
      />

      <Textarea
        id="description"
        label={t("Description")}
        value={recipe ? recipe.description : null}
        key="description"
      />

      <div className="dg gtc-2 column-gap-4">
        {/* <Input id="tag" label={t("Tag")} value={recipe.tag} key="tag" /> */}

        <Select
          id="persons"
          label={t("Persons")}
          key="persons"
          value={recipe ? recipe.persons : " "}
          options={Array.from({ length: 8 }, (_, i) => i + 1)}
          placeholder={t("Number of persons")}
        />
      </div>

      <div className="dg gtc-2 column-gap-4">
        <Select
          id="carb"
          label={t("Carb")}
          key="carb"
          value={recipe ? recipe.carb : " "}
          options={["Does not apply", "Pasta", "Potato", "bread"]}
          placeholder={t("Choose carb")}
        />

        <Select
          id="time"
          label={t("Time")}
          key="time"
          value={recipe ? recipe.time : " "}
          options={["Short", "Medium", "Long"]}
          placeholder={t("Cooking time")}
        />
      </div>

      <h2 className="fs-18 my-4">{t("Ingredients")}</h2>

      <IngredientContext.Provider value={ingredientRows}>
        <IngredientsList ingredients={recipe ? recipe.ingredients : null} />
      </IngredientContext.Provider>

      <Button text={t("Save recipe")} type="submit" />
    </form>
  );
};

export default RecipeForm;
