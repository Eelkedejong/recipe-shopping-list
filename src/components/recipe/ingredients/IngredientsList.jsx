import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateIngredientList,
  resetIngredientList,
} from '../../../store/ingredientSlice';
import { FaPlusCircle } from 'react-icons/fa';
import IngredientsWrapper from './IngredientsWrapper';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import styles from '../recipe.module.scss';

const IngredientsList = ({ ingredients }) => {
  const { t } = useTranslation();
  const ingredientSlice = useSelector((state) => state.ingredientList.value);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetIngredientList());
    };
  }, [dispatch]);

  // Save the ingredients in the ingredientSlice and add an id to each ingredient.
  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      const ingredientsWithId = ingredients.map((ingredient, index) => ({
        ...ingredient,
        id: index + 1,
      }));

      dispatch(updateIngredientList(ingredientsWithId));
    }
  }, [ingredients, dispatch]);

  // Create an empty ingredient row for when the user clicks the "Add ingredient" button.
  const emptyIngredientRow = {
    unit: '',
    amount: '',
    ingredient: '',
    id: ingredientSlice.length + 1,
  };

  // Build the sensors for the DndContext.
  const sensors = useSensors(
    // useSensor(PointerSensor),
    useSensor(MouseSensor, {
      activationConstraint: {
        // Enable sort function only when dragging 10px so clickable elements are still clickable.
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /**
   * Handles the drag end event for the ingredient list.
   *
   * @param {object} event - The drag end event object.
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    const updateList = (rows) => {
      const oldIndex = rows.findIndex((item) => item.id === active.id);
      const newIndex = rows.findIndex((item) => item.id === over.id);

      const newRows = arrayMove(rows, oldIndex, newIndex);
      return newRows;
    };

    dispatch(updateIngredientList(updateList(ingredientSlice)));
  };

  return (
    <div className="dg gap-3">
      <div className={`dg gap-4 fs-16 ${styles.ingredientGrid}`}>
        <div> </div>
        <div>{t('Ingredient name')}</div>
        <div>{t('Amount')}</div>
        <div>{t('Unit (optional)')}</div>
      </div>
      <div className="df fdc gap-3 fs-14">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <IngredientsWrapper ingredientSlice={ingredientSlice} />
        </DndContext>
      </div>
      <div className="df jcfe">
        <button
          // type="button"
          className="df aic jcfe gap-3 py-2 fs-16"
          onClick={(e) => {
            e.preventDefault;
            // Add an empty ingredient row to the ingredientsSlice
            dispatch(
              updateIngredientList([...ingredientSlice, emptyIngredientRow])
            );
          }}
        >
          <span>{t('Add ingredient')}</span>
          <FaPlusCircle />
        </button>
      </div>
    </div>
  );
};

export default IngredientsList;
