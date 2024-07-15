import GroceryListItem from './GroceryListItem';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import styles from './groceryList.module.scss';

const GroceryListColumn = ({ groceries }) => {
  return (
    <div className={`${styles.groceryGrid} dg`}>
      <SortableContext items={groceries} strategy={verticalListSortingStrategy}>
        {groceries.map((item, index) => (
          <GroceryListItem item={item.title} id={item.id} key={item.id} />
        ))}
      </SortableContext>
    </div>
  );
};

export default GroceryListColumn;
