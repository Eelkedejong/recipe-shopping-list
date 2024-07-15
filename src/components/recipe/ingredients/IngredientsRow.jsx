import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSelector, useDispatch } from 'react-redux';
import { updateIngredientList } from '../../../store/ingredientSlice';
import Input from '../../ui/Input';
import { FaMinusCircle } from 'react-icons/fa';
import styles from '../recipe.module.scss';

const IngredientsRow = ({ ingredient, index, id }) => {
  const ingredientSlice = useSelector((state) => state.ingredientList.value);
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState(ingredient);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, animateLayoutChanges: () => false });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  /**
   * Handles the blur event for the ingredient row.
   * Updates the ingredient list with the modified row data.
   */
  const handleBlur = () => {
    const newRows = ingredientSlice.map((row, i) =>
      i === index ? rowData : row
    );
    dispatch(updateIngredientList(newRows));
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`dg gap-4 ${styles.ingredientGrid}`}
        id={`row_${index}`}
        key={index}
      >
        <div className={`px-2 df aic ${styles.ingredientIndex}`}>
          {index + 1}
        </div>
        <Input
          id={`ingredient_${index}`}
          required={true}
          value={ingredient.ingredient}
          key={`ingredient_${ingredient.ingredient}`}
          classes={styles.ingredientInput}
          onChange={(e) =>
            setRowData({ ...rowData, ingredient: e.target.value })
          }
          onBlur={handleBlur}
          onMouseDown={(e) => e.stopPropagation()}
        />

        <Input
          id={`amount_${index}`}
          type={'number'}
          step={'any'}
          value={ingredient.amount}
          key={`amount_${ingredient.amount}`}
          classes={styles.ingreidentInput}
          onChange={(e) => {
            const value = e.target.value.replace(/,/g, '.');
            setRowData({ ...rowData, amount: parseFloat(value) });
          }}
          onBlur={handleBlur}
          onMouseDown={(e) => e.stopPropagation()}
        />

        <Input
          id={`unit_${index}`}
          required={false}
          value={ingredient.unit}
          key={`unit_${ingredient.unit}`}
          classes={styles.ingreidentInput}
          onChange={(e) => setRowData({ ...rowData, unit: e.target.value })}
          onBlur={handleBlur}
          onMouseDown={(e) => e.stopPropagation()}
        />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            const newRows = ingredientSlice.filter((_, i) => i !== index);
            dispatch(updateIngredientList(newRows));
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <FaMinusCircle />
        </button>
      </div>
    </>
  );
};

export default IngredientsRow;
