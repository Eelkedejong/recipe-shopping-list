import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './groceryList.module.scss';

const GroceryListItem = ({ item, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.groceryListItem}
    >
      <div className="mr-3 p-3 df gap-4 label">
        <input
          type="checkbox"
          className="checkbox cursor-pointer"
          name={item}
          defaultChecked={true}
          value={item}
        />
        <span>{item}</span>
      </div>
    </div>
  );
};

export default GroceryListItem;
