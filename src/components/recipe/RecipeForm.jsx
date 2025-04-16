import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import ImageUploader from './image/ImageUploader';
import { Input, Textarea } from '../ui/Fields';
import { CheckboxGroup } from '../ui/Fields';
import Button from '../ui/Button';
import IngredientsList from './ingredients/IngredientsList';
import StepsList from './steps/StepsList';
import LabelList from './labels/LabelList';
import styles from './recipe.module.scss';

const RecipeForm = ({ recipe, loading, handleSubmit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const store = useStore();

  console.log('recipe', recipe);

  const handleSubmitRecipe = (e) => {
    // Convert the form data into an object with key-value pairs.
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    // Extract data from the values object.
    // Filter out specific keys that are handled separately
    const responseData = Object.keys(values).reduce((obj, key) => {
      if (
        !key.includes('amount') &&
        !key.includes('unit') &&
        !key.includes('ingredient') &&
        !key.includes('step') &&
        !key.includes('label') &&
        !key.includes('cuisine') &&
        !key.includes('mealtype') &&
        !key.includes('dishtype') &&
        !key.includes('isChildFriendly') &&
        !key.includes('isVegetarian')
      ) {
        obj[key] = values[key];
      }
      return obj;
    }, {});

    // Get the ingredients from the store.
    const ingredients = store.getState().ingredientList.value;

    // Add ingredients to responseData
    responseData.ingredients = ingredients;

    // Convert numeric fields to integers
    responseData.persons = parseInt(responseData.persons);
    responseData.time = parseInt(responseData.time);

    // Combine the value of the steps into an array.
    const steps = Object.keys(values)
      .filter((key) => key.includes('step'))
      .map((key) => values[key]);
    responseData.steps = steps;

    // Process tags/labels
    const labels = Object.keys(values)
      .filter((key) => key.includes('label'))
      .map((key) => values[key])
      .filter((label) => label.trim() !== ''); // Remove empty labels
    responseData.tags = labels;

    // Get meal types from checkboxes (checkbox values that are checked will be in the form data)
    const mealTypes = Object.keys(values)
      .filter((key) => key.includes('mealtype') && values[key] === 'on')
      .map((key) => key.replace('mealtype-', ''));
    responseData.typeOfMeal = mealTypes;

    // Get dishtype values
    const dishTypes = Object.keys(values)
      .filter((key) => key.includes('dishtype'))
      .map((key) => values[key])
      .filter((type) => type.trim() !== ''); // Remove empty dish types
    responseData.typeOfDish = dishTypes;

    const cuisineValue = values.cuisine ? values.cuisine.trim() : '';
    responseData.cuisine = cuisineValue ? [cuisineValue] : [];

    // Handle boolean values for isChildFriendly and isVegetarian
    responseData.isChildFriendly = values.isChildFriendly === 'on';
    responseData.isVegetarian = values.isVegetarian === 'on';

    // Call the handleSubmit function passed as prop with the complete responseData
    handleSubmit(responseData);
  };

  // Define meal type options
  const mealTypeOptions = [
    { id: 'main', label: t('Main') },
    { id: 'starter', label: t('Starter') },
    { id: 'breakfast', label: t('Breakfast') },
    { id: 'dessert', label: t('Dessert') },
    { id: 'lunch', label: t('Lunch') },
    { id: 'snack', label: t('Snack') },
    { id: 'side', label: t('Side dish') },
  ];

  // Determine which meal types are selected (if editing a recipe)
  let selectedMealTypes = [];
  if (recipe) {
    if (Array.isArray(recipe.typeOfMeal) && recipe.typeOfMeal.length > 0) {
      selectedMealTypes = recipe.typeOfMeal;
    }
  }

  return (
    <form
      className={`df fdc gap-4 pb-5 mb-5 ${styles.form}`}
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

        <div className="mt-0">
          <h4 className="fs-16 mb-4 mt-2 fw-semibold">
            {t('Select meal category')}
          </h4>
          <CheckboxGroup
            name="mealtype"
            options={mealTypeOptions}
            selected={selectedMealTypes}
          />
        </div>

        <div className="mt-0">
          <h4 className="fs-16 mb-4 mt-2 fw-semibold">
            {t('Characteristics')}
          </h4>
          <div className="dg gtc-2 gap-2">
            <label className="df aic gap-2">
              <input
                type="checkbox"
                id={'isChildFriendly'}
                name={'isChildFriendly'}
                defaultChecked={recipe?.isChildFriendly || false}
                className="checkbox filled"
              />
              <span className="text-sm checkbox-label">
                {t('Child friendly')}
              </span>
            </label>

            <label className="df aic gap-2">
              <input
                type="checkbox"
                id={'isVegetarian'}
                name={'isVegetarian'}
                defaultChecked={recipe?.isVegetarian || false}
                className="checkbox filled"
              />
              <span className="text-sm checkbox-label">{t('Vegetarian')}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-m p-5 mx-3">
        <h3 className="fs-20 mb-4 fw-semibold">{t('Advanced')}</h3>
        <div className={`dg gap-4 ${styles.advancedFields}`}>
          <Input
            id="time"
            label={t('Cooking time (in minutes)')}
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
          <Input
            id="cuisine"
            label={t('Cuisine')}
            key="cuisine"
            type="text"
            required={false}
            value={
              recipe
                ? Array.isArray(recipe.cuisine) && recipe.cuisine.length > 0
                  ? recipe.cuisine[0]
                  : recipe.cuisine
                : null
            }
            labelClasses={styles.cuisine}
          />
        </div>

        <div className="mt-5">
          <h4 className="fs-16 mb-1 fw-semibold">{t('Dish type')}</h4>
          <p className="fs-14 mb-2">
            {t('Add dish type (e.g., Soup, Salad, Pasta)')}
          </p>
          <LabelList
            tags={recipe ? recipe.typeOfDish : null}
            placeholder={t('Type')}
            prefix={'dishtype'}
          />
        </div>

        <div className="mt-4">
          <h4 className="fs-16 mb-1 fw-semibold">{t('Tags')}</h4>
          <p className="fs-14 mb-2">{t('Add extra labels to recipe')}</p>
          <LabelList
            tags={recipe ? recipe.tags : null}
            placeholder={t('Label')}
            prefix={'label'}
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

      <div className="bg-white rounded-m p-5 mx-3 mb-5">
        <h3 className="fs-20 mb-4 fw-semibold">{t('Cooking steps')}</h3>
        <StepsList steps={recipe ? recipe.steps : null} />
      </div>

      <div
        className={`w-100 bg-white rounded-m p-5 df ${styles.submitButtonWrapper}`}
      >
        <Button
          className={`w-100 ${styles.submitButton}`}
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
