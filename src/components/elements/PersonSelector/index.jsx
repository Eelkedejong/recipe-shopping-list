import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NumberField } from '@base-ui/react/number-field';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import { updateRecipes } from '@/store/shoppingListRecipesSlice';
import styles from './person-selector.module.scss';

/**
 * PersonSelector
 *
 * Base UI's NumberField gives the value real spinbutton semantics and keyboard
 * support, which the plain <span> it replaced had neither of.
 *
 * Deliberately has no `name`: this renders inside the shopping list <form>,
 * whose submit handler collects every form value into the items array.
 *
 * `recipeId` is optional. Without one the selector is display-only and never
 * touches the shopping list.
 */
const PersonSelector = ({ personsState, setPersonsState, recipeId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const labelId = useId();

  const handlePersonsChange = (newPersonsState) => {
    setPersonsState(newPersonsState);

    // On a recipe detail page there is no recipeId: the selector only scales
    // what is displayed. Dispatching anyway wrote { persons } with no id into
    // the shopping list, which then broke the page that reads it back.
    if (recipeId === undefined || recipeId === null) return;

    dispatch(updateRecipes({ id: recipeId, persons: newPersonsState }));
  };

  return (
    <NumberField.Root
      value={personsState}
      onValueChange={(value) => {
        // null while the input is empty mid-edit; ignore until it resolves.
        if (value !== null) {
          handlePersonsChange(value);
        }
      }}
      min={1}
    >
      <NumberField.Group className="flex items-center gap-6">
        <NumberField.Decrement
          className={styles.step}
          aria-label={t('Fewer persons')}
        >
          <FaCircleMinus />
        </NumberField.Decrement>

        <div className="flex flex-col items-center">
          <span id={labelId} className="text-sm">
            {t('Persons')}
          </span>
          {/* The label lives on the input, not on NumberField.Root: Root
              renders a <div>, so labelling it named the group and left the
              input with no accessible name at all. */}
          <NumberField.Input
            className={styles.input}
            aria-labelledby={labelId}
          />
        </div>

        <NumberField.Increment
          className={styles.step}
          aria-label={t('More persons')}
        >
          <FaCirclePlus />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
};

export default PersonSelector;
