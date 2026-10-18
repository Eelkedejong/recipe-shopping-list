import { useTranslation } from 'react-i18next';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { FaGripVertical } from 'react-icons/fa6';
import Checkbox from '@/components/ui/Checkbox';

/**
 * One line on the list.
 *
 * Hand-added items get a drag handle so they can be moved to the aisle they
 * actually belong in - the aisle is guessed when the item is added, and in the
 * shop you find out it was wrong. The handle carries the drag listeners rather
 * than the whole row, which keeps the checkbox clickable: dnd-kit would
 * otherwise claim the press before Base UI sees it.
 */
const GroceryListItem = ({ item, onToggle }) => {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.key,
    disabled: !item.manual,
  });

  return (
    <li
      ref={setNodeRef}
      style={
        transform
          ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              zIndex: 10,
              position: 'relative',
            }
          : undefined
      }
      className={`border-light-grey flex items-center gap-3 border-b py-2 last:border-b-0 ${
        // Opaque while dragging, so the row it passes over does not show
        // through it - it should read as lifted off the list, not blended in.
        isDragging ? 'rounded-10 border-b-transparent bg-white px-2 shadow-lg' : ''
      }`}
    >
      <label className="flex flex-1 cursor-pointer items-center gap-3">
        <Checkbox checked={item.ticked} onCheckedChange={() => onToggle(item)} />
        <span className={item.ticked ? 'text-dark-grey line-through' : undefined}>
          {item.quantities.length ? (
            <span className="font-semibold">{item.quantities.join(' + ')} </span>
          ) : null}
          {item.name}
        </span>
      </label>

      {item.manual ? (
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label={t('Move {{name}} to another aisle', { name: item.name })}
          className="text-light-grey hover:text-dark-grey cursor-grab touch-none px-2 py-1"
        >
          <FaGripVertical />
        </button>
      ) : null}
    </li>
  );
};

/**
 * One supermarket aisle, and a drop target for hand-added items.
 *
 * Hand-added items sit among the generated ones rather than in a section of
 * their own, so extra fruit is picked up with the rest of the fruit.
 */
const GroceryListGroup = ({ group, onToggle }) => {
  const { setNodeRef, isOver } = useDroppable({ id: group.categorySlug });

  return (
    <section
      ref={setNodeRef}
      className={`mb-6 rounded-10 transition-colors ${
        isOver ? 'bg-main-bg-light outline-main -m-2 p-2 outline-2 outline-dashed' : ''
      }`}
    >
      <h3 className="text-dark-grey text-14 mb-2 font-semibold tracking-wide uppercase">
        {group.categoryName}
      </h3>

      <ul className="flex flex-col">
        {group.items.map((item) => (
          <GroceryListItem key={item.key} item={item} onToggle={onToggle} />
        ))}
      </ul>
    </section>
  );
};

export default GroceryListGroup;
