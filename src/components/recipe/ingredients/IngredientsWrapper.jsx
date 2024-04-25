import IngredientsRow from './IngredientsRow';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const IngredientsWrapper = ({ ingredientSlice }) => {
  return (
    <SortableContext
      items={ingredientSlice}
      strategy={verticalListSortingStrategy}
    >
      {ingredientSlice
        ? ingredientSlice.map((ingredient, index) => {
            return (
              <IngredientsRow
                index={index}
                ingredient={ingredient}
                id={ingredient.id}
                key={ingredient.id}
              />
            );
          })
        : null}
    </SortableContext>
  );
};

export default IngredientsWrapper;
