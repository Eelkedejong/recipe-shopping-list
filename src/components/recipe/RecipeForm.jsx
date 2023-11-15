import { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUploader from "./image/ImageUploader";
import IngredientContext from "./ingredients/utils/ingredientContext";
import { Input, Textarea, Select } from "../ui/Fields";
import Button from "../ui/Button";
import IngredientsList from "./ingredients/IngredientsList";
import StepsList from "./steps/StepsList";
import LabelList from "./labels/LabelList";

const RecipeForm = ({ recipe, handleSubmit }) => {
  console.log("recipe", recipe, handleSubmit);
  const { t } = useTranslation();
  // TODO: Move the ingredientRows state to the IngredientsList component.
  // Possibly use redux instead of context?
  const ingredientRows = useState(
    recipe?.ingredients && recipe?.ingredients !== undefined
      ? recipe.ingredients
      : [{ unit: "", amount: "", ingredient: "" }]
  );

  const handleSubmitRecipe = (e) => {
    // Converts the form data into an object with key-value pairs.
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    // Extracts data from the values object by filtering out keys
    // that include "amount", "unit", or "ingredient".
    const responseData = Object.keys(values).reduce((obj, key) => {
      if (
        !key.includes("amount") &&
        !key.includes("unit") &&
        !key.includes("ingredient") &&
        !key.includes("step") &&
        !key.includes("label")
      ) {
        obj[key] = values[key];
      }
      return obj;
    }, {});
    responseData.ingredients = ingredientRows[0];
    responseData.persons = parseInt(responseData.persons);
    responseData.time = parseInt(responseData.time);

    // Combine the value of the steps input field into an array.
    const steps = Object.keys(values)
      .filter((key) => key.includes("step"))
      .map((key) => values[key]);
    responseData.steps = steps;

    const labels = Object.keys(values)
      .filter((key) => key.includes("label"))
      .map((key) => values[key]);
    responseData.tags = labels;

    console.log("responseData", responseData);
    handleSubmit(responseData);
  };

  return (
    <form
      className="df fdc gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitRecipe(e);
      }}
    >
      <div className="bg-white p-5 rounded-top-l rounded-m df fdc gap-4">
        <h2 className="fs-24 ff-header fw-bold">{t("Add a new recipe")}</h2>
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

        <LabelList tags={recipe ? recipe.tags : null} />
      </div>

      <div className="bg-white rounded-m p-5 mx-3">
        <h3 className="fs-20 mb-4 ff-header fw-semibold">{t("Details")}</h3>
        <div className="dg gtc-2 gtr-2 gap-4">
          <Input
            id="time"
            label={t("Cooking time")}
            type="number"
            value={recipe ? recipe.time : null}
            key="time"
          />
          <Input
            id="persons"
            label={t("For how many persons")}
            key="persons"
            type="number"
            required={true}
            value={recipe ? recipe.persons : 1}
          />
          <Select
            id="difficulty"
            label={t("Difficulty")}
            key="difficulty"
            value={recipe ? recipe.carb : " "}
            options={[`${t("Easy")}`, `${t("Medium")}`, `${t("Difficult")}`]}
            placeholder={t("Difficulty")}
          />
          <Input
            id="type"
            label={t("Dish type")}
            value={recipe ? recipe.type : null}
            key="type"
          />
        </div>
      </div>

      <div className="bg-white rounded-m p-5 mx-3">
        <h3 className="fs-20 mb-4 ff-header fw-semibold">{t("Image")}</h3>
        <ImageUploader image={recipe ? recipe?.image : null} />
        {/* <ImageUploader publicId={imageId} setPublicId={setImageId} /> */}
        {/* <div>
          <AdvancedImage
            style={{ maxWidth: "100%" }}
            cldImg={cld.image(imageId)}
            plugins={[responsive(), placeholder()]}
          />
        </div> */}
      </div>

      <div className="bg-white rounded-m p-5 mx-3">
        <h3 className="fs-20 mb-4 ff-header fw-semibold">{t("Ingredients")}</h3>
        <IngredientContext.Provider value={ingredientRows}>
          <IngredientsList ingredients={recipe ? recipe.ingredients : null} />
        </IngredientContext.Provider>
      </div>

      <div className="bg-white rounded-m p-5 mx-3">
        <h3 className="fs-20 mb-4 ff-header fw-semibold">
          {t("Cooking steps")}
        </h3>
        <StepsList steps={recipe ? recipe.steps : null} />
      </div>

      <Button text={t("Save recipe")} type="submit" />
    </form>
  );
};

export default RecipeForm;
