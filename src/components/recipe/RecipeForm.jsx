import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import ImageUploader from './image/ImageUploader';
// import IngredientContext from './ingredients/utils/ingredientContext';
import { Input, Textarea, Select } from '../ui/Fields';
import Button from '../ui/Button';
import IngredientsList from './ingredients/IngredientsList';
import StepsList from './steps/StepsList';
import LabelList from './labels/LabelList';
import styles from './recipe.module.scss';

const RecipeForm = ({ recipe, loading, handleSubmit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const store = useStore();

  const handleSubmitRecipe = (e) => {
    // Convert the form data into an object with key-value pairs.
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    // Extract data from the values object.
    // Filter out keys that include "amount", "unit", or "ingredient" as these are pulled from the IngredientRows
    // Filter out keys that incluse "stap" and "label" as these are handled separately.
    const responseData = Object.keys(values).reduce((obj, key) => {
      if (
        !key.includes('amount') &&
        !key.includes('unit') &&
        !key.includes('ingredient') &&
        !key.includes('step') &&
        !key.includes('label')
      ) {
        obj[key] = values[key];
      }
      return obj;
    }, {});

    // Get the ingredients from the store.
    const ingredients = store.getState().ingredientList.value;

    responseData.ingredients = ingredients;
    responseData.persons = parseInt(responseData.persons);
    responseData.time = parseInt(responseData.time);

    // Combine the value of the steps and labels input fields into an array.
    const steps = Object.keys(values)
      .filter((key) => key.includes('step'))
      .map((key) => values[key]);
    responseData.steps = steps;

    const labels = Object.keys(values)
      .filter((key) => key.includes('label'))
      .map((key) => values[key]);
    responseData.tags = labels;

    handleSubmit(responseData);
  };

  return (
    <form
      className={`df fdc gap-4 pb-5 ${styles.form}`}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitRecipe(e);
      }}
    >
      <div className="bg-white p-5 rounded-top-l rounded-m mobile-exclude-top df fdc gap-4">
        <h3 className="fs-20 fw-semibold">{t('Recipe details')}</h3>
        <Input
          id="name"
          label={t('Recipe name')}
          required={true}
          value={recipe ? recipe.name : null}
          key="name"
        />

        <Textarea
          id="description"
          label={t('Description')}
          value={recipe ? recipe.description : null}
          key="description"
        />

        <LabelList tags={recipe ? recipe.tags : null} />
      </div>

      <div className="bg-white rounded-m p-5 mx-3">
        <h3 className="fs-20 mb-4 fw-semibold">{t('Advanced')}</h3>
        <div className={`dg gap-4 ${styles.advancedFields}`}>
          <Input
            id="time"
            label={t('Cooking time')}
            type="number"
            value={recipe ? recipe.time : null}
            key="time"
          />
          <Input
            id="persons"
            label={t('For how many persons')}
            key="persons"
            type="number"
            required={true}
            value={recipe ? recipe.persons : 1}
          />
          <Select
            id="difficulty"
            label={t('Difficulty')}
            key="difficulty"
            value={recipe ? recipe.difficulty : ' '}
            options={[`${t('Easy')}`, `${t('Medium')}`, `${t('Difficult')}`]}
            placeholder={t('Choose difficulty')}
          />
          <Select
            id="type"
            label={t('Dish type')}
            key="type"
            value={recipe ? recipe.type : ' '}
            options={[
              `${t('Main')}`,
              `${t('Starter')}`,
              `${t('Dessert')}`,
              `${t('Side dish')}`,
              `${t('Breakfast')}`,
              `${t('Lunch')}`,
              `${t('Snack')}`,
              `${t('Pastry')}`,
            ]}
            placeholder={t('Choose type')}
          />
        </div>
      </div>

      <div className="bg-white rounded-m p-5 mx-3">
        <h3 className="fs-20 mb-4 fw-semibold">{t('Image')}</h3>
        <ImageUploader image={recipe ? recipe?.image : null} />
      </div>

      <div className="bg-white rounded-m p-5 mx-3">
        <h3 className="fs-20 mb-2 fw-semibold">{t('Ingredients')}</h3>
        <p className="mb-4 fs-14">
          {t('Drag the numbers to re-arrange the ingredient order')}
        </p>
        <IngredientsList ingredients={recipe ? recipe.ingredients : null} />
      </div>

      <div className="bg-white rounded-m p-5 mx-3">
        <h3 className="fs-20 mb-4 fw-semibold">{t('Cooking steps')}</h3>
        <StepsList steps={recipe ? recipe.steps : null} />
      </div>

      <div
        className={`w-100 bg-white rounded-m p-5 df ${styles.submitButtonWrapper}`}
      >
        <Button
          className={`w-100 ${styles.submitButton}`}
          // Change text when loading
          loading={loading}
          text={t('Save recipe')}
          type="submit"
        />

        <Button
          onClick={() => {
            navigate(-1);
          }}
          text={t('Cancel')}
          type="ghost"
          className="w-100"
        />
      </div>
    </form>
  );
};

export default RecipeForm;
