import Checkbox from '@/components/ui/Checkbox';

/**
 * One supermarket aisle.
 *
 * Hand-added items sit among the generated ones rather than in a section of
 * their own, so extra fruit is picked up with the rest of the fruit.
 */
const GroceryListGroup = ({ group, onToggle }) => (
  <section className="mb-6">
    <h3 className="text-dark-grey text-14 mb-2 font-semibold tracking-wide uppercase">
      {group.categoryName}
    </h3>

    <ul className="flex flex-col">
      {group.items.map((item) => (
        <li
          key={item.key}
          className="border-light-grey flex items-center gap-3 border-b py-2 last:border-b-0"
        >
          <label className="flex flex-1 cursor-pointer items-center gap-3">
            <Checkbox
              checked={item.ticked}
              onCheckedChange={() => onToggle(item)}
            />
            <span className={item.ticked ? 'text-dark-grey line-through' : undefined}>
              {item.quantities.length ? (
                <span className="font-semibold">
                  {item.quantities.join(' + ')}{' '}
                </span>
              ) : null}
              {item.name}
            </span>
          </label>
        </li>
      ))}
    </ul>
  </section>
);

export default GroceryListGroup;
