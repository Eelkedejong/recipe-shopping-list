import { useMemo, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { updateIngredientList } from '../../../store/ingredientSlice';
import { useIngredientCatalog } from '@/hooks/useIngredientCatalog';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { nextRowId } from '@/utils/ingredientRows';
import AddIngredientDialog from './AddIngredientDialog';
import Input from '../../ui/Input';
import Combobox from '../../ui/Combobox';
import { FaMinusCircle } from 'react-icons/fa';
import styles from '../recipe.module.scss';

const emptyRow = (id) => ({
  id,
  ingredientId: null,
  name: '',
  amount: '',
  unit: '',
  prep: '',
});

const isBlank = (row) => !row?.name && !row?.amount && !row?.unit;

const IngredientsRow = ({ ingredient, index, id }) => {
  const ingredientSlice = useSelector((state) => state.ingredientList.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { search, byId } = useIngredientCatalog();
  const { isAdmin } = useCurrentUser();
  const [rowData, setRowData] = useState(ingredient);
  const [addOpen, setAddOpen] = useState(false);

  // The row this component was mounted with can be replaced underneath it: an
  // edit page mounts its rows from the placeholder in the store and fills them
  // in once the recipe arrives, and the placeholder shares an id with the
  // recipe's first row - so React reuses this instance and the state above
  // would keep the placeholder's empty name forever. Resyncing during render
  // rather than in an effect is React's own answer to this; typing is
  // unaffected because only a store write replaces the object.
  const [syncedFrom, setSyncedFrom] = useState(ingredient);
  if (ingredient !== syncedFrom) {
    setSyncedFrom(ingredient);
    setRowData(ingredient);
  }
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

  // Offering to add something the catalog already has would only create
  // duplicates, so the action hides on an exact match.
  const typed = (rowData.name ?? '').trim();
  const exactMatch = suggestions.some(
    (item) => item.nameNl.toLowerCase() === typed.toLowerCase()
  );
  const canAdd = isAdmin && typed.length > 0 && !exactMatch;

  /**
   * Writes a row back to the store. Takes the next row explicitly rather than
   * reading state, so selecting a suggestion cannot race the blur that
   * follows it. `appendRow` adds a fresh row in the same dispatch, which keeps
   * the two updates from clobbering one another.
   */
  const commit = (next, { appendRow = false } = {}) => {
    const rows = ingredientSlice.map((row, i) => (i === index ? next : row));
    const last = rows[rows.length - 1];

    // Only ever grow the list from the end, and never while an empty row is
    // already waiting - so this is safe to call more than once per keystroke.
    if (appendRow && !isBlank(last)) {
      rows.push(emptyRow(nextRowId(rows)));
    }

    dispatch(updateIngredientList(rows));
  };

  /**
   * Moves to the amount field of this row. Deferred by a frame because Base UI
   * returns focus to its own input as the popup closes, which would otherwise
   * undo this immediately.
   */
  const focusAmount = () => {
    requestAnimationFrame(() => {
      document.getElementById(`amount_${index}`)?.focus();
    });
  };

  const handleBlur = () => commit(rowData);

  /** A suggestion was picked: link the row and adopt the catalog's spelling. */
  const handleSelect = (item) => {
    const next = {
      ...rowData,
      ingredientId: item.id,
      name: item.nameNl,
      // Only fill the unit when the row has none, so an existing choice stands.
      // The catalog stores canonical codes; the label shown is translated.
      unit: rowData.unit || t(`unit_${item.baseUnit}`, { defaultValue: '' }),
    };

    setRowData(next);
    commit(next, { appendRow: true });
    focusAmount();
  };

  /**
   * Free typing. The row stays linked only while the text still matches the
   * catalog entry it points at - comparing against the entry rather than the
   * previous keystroke, so the order Base UI fires its events in cannot
   * silently unlink a row.
   */
  const handleInputValueChange = (value, reason) => {
    // Base UI reports its own resets through this callback too. Pressing
    // Enter on text that matches nothing fires "input-clear", which would
    // otherwise wipe a perfectly good custom ingredient.
    if (reason && reason !== 'input-change' && reason !== 'item-press') return;

    setRowData((current) => {
      const linked = current.ingredientId ? byId.get(current.ingredientId) : null;
      return {
        ...current,
        name: value,
        ingredientId: linked && linked.nameNl === value ? current.ingredientId : null,
      };
    });
  };

  /**
   * Enter on free text advances too, not only on a picked suggestion.
   *
   * When suggestions are showing, Base UI's own Enter handling picks the
   * highlighted one and handleSelect takes it from there. Deciding on
   * `suggestions.length` rather than on which handler fires first keeps this
   * independent of event ordering.
   */
  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' || suggestions.length > 0) return;
    event.preventDefault();
    commit(rowData, { appendRow: true });
    focusAmount();
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
        // The first row must be filled in, so a recipe cannot be saved with no
        // ingredients at all. Later rows may be blank: picking an ingredient
        // appends an empty one, and requiring that would block every save.
        required={index === 0}
        items={suggestions}
        inputValue={rowData.name ?? ''}
        onInputValueChange={handleInputValueChange}
        onItemSelect={handleSelect}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => e.stopPropagation()}
        classes={styles.ingredientInput}
        action={
          canAdd ? (
            <button
              type="button"
              className="text-14 text-secondary w-full px-3 py-2 text-left"
              // The combobox would otherwise steal the click as a blur.
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setAddOpen(true)}
            >
              + {t('Add ingredient to the list')}
            </button>
          ) : null
        }
      />

      {addOpen ? (
        <AddIngredientDialog
          open={addOpen}
          onOpenChange={setAddOpen}
          initialName={typed}
          // Treated exactly like picking a suggestion, so the flow continues.
          onCreated={handleSelect}
        />
      ) : null}

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
