import { useMemo, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { updateIngredientList } from '../../../store/ingredientSlice';
import { useIngredientCatalog } from '@/hooks/useIngredientCatalog';
import Input from '../../ui/Input';
import Combobox from '../../ui/Combobox';
import { FaMinusCircle } from 'react-icons/fa';
import styles from '../recipe.module.scss';

const IngredientsRow = ({ ingredient, index, id }) => {
  const ingredientSlice = useSelector((state) => state.ingredientList.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { search } = useIngredientCatalog();
  const [rowData, setRowData] = useState(ingredient);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, animateLayoutChanges: () => false });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const suggestions = useMemo(
    () => search(rowData.name ?? ''),
    [search, rowData.name]
  );

  /**
   * Writes a row back to the store. Takes the next row explicitly rather than
   * reading state, so selecting a suggestion cannot race the blur that
   * follows it.
   */
  const commit = (next) => {
    dispatch(
      updateIngredientList(
        ingredientSlice.map((row, i) => (i === index ? next : row))
      )
    );
  };

  const handleBlur = () => commit(rowData);

  /** A suggestion was picked: link the row and adopt the catalog's spelling. */
  const handleSelect = (item) => {
    const next = {
      ...rowData,
      ingredientId: item.id,
      name: item.nameNl,
      // Only fill the unit when the row has none, so an existing choice stands.
      unit: rowData.unit || item.baseUnit || '',
    };
    setRowData(next);
    commit(next);
  };

  /**
   * Free typing. Editing the text away from the linked ingredient's name
   * unlinks the row, which is what keeps a renamed row from claiming to be a
   * catalog ingredient it no longer matches.
   */
  const handleInputValueChange = (value) => {
    setRowData((current) => ({
      ...current,
      name: value,
      ingredientId: value === current.name ? current.ingredientId : null,
    }));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`grid gap-4 ${styles.ingredientGrid}`}
      id={`row_${index}`}
    >
      <div className={`px-2 flex items-center ${styles.ingredientIndex}`}>
        {index + 1}
      </div>

      <Combobox
        id={`ingredient_${index}`}
        required={true}
        items={suggestions}
        inputValue={rowData.name ?? ''}
        onInputValueChange={handleInputValueChange}
        onItemSelect={handleSelect}
        onBlur={handleBlur}
        onMouseDown={(e) => e.stopPropagation()}
        emptyMessage={t('No ingredient found')}
        inputClassName={styles.ingredientInput}
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
        value={rowData.unit}
        key={`unit_${rowData.unit}`}
        classes={styles.ingreidentInput}
        onChange={(e) => setRowData({ ...rowData, unit: e.target.value })}
        onBlur={handleBlur}
        onMouseDown={(e) => e.stopPropagation()}
      />

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            updateIngredientList(ingredientSlice.filter((_, i) => i !== index))
          );
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <FaMinusCircle />
      </button>
    </div>
  );
};

export default IngredientsRow;
