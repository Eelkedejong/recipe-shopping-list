import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
// Deliberately the Input component's stylesheet rather than a copy of it: a
// combobox is a text field, and the two must not drift apart visually.
import inputStyles from '../Input/input.module.scss';

/**
 * Combobox
 *
 * A text input with suggestions, where free text stays valid. Picking a
 * suggestion reports the whole item through `onItemSelect`; typing something
 * with no match simply leaves the text as typed.
 *
 * Filtering is done by the call site and passed in through `items`, with Base
 * UI's own filter disabled, so results can be ranked (prefix before
 * substring) rather than only filtered. The call site also decides when there
 * is anything worth suggesting - an empty query should return nothing rather
 * than an arbitrary slice of the catalog.
 *
 * `action` renders below the list - an escape hatch for when nothing matches,
 * rather than a dead-end "not found" message.
 *
 * `onInputValueChange` receives Base UI's change reason as a second argument,
 * because the component also reports resets ("input-clear") through the same
 * callback and those must not be mistaken for the user editing the text.
 */
const Combobox = ({
  id,
  name,
  items = [],
  inputValue,
  onInputValueChange,
  onItemSelect,
  itemToLabel = (item) => item?.nameNl ?? '',
  itemToKey = (item) => item?.id,
  renderItem,
  placeholder,
  required,
  disabled,
  action,
  classes,
  ...rest
}) => {
  const query = inputValue ?? '';

  return (
    <BaseCombobox.Root
      items={items}
      // The call site has already filtered and ranked; filtering again here
      // would drop results that matched on an alias rather than the label.
      filter={null}
      inputValue={query}
      onInputValueChange={(next, details) =>
        onInputValueChange?.(next, details?.reason)
      }
      // Selection is left uncontrolled on purpose. Pinning `value` to null
      // made Base UI reset the input back to empty straight after a pick,
      // which wiped the name the selection had just set.
      onValueChange={(item) => {
        if (item) onItemSelect?.(item);
      }}
      itemToStringLabel={itemToLabel}
      // Highlight the top match so Enter picks it without arrowing down.
      autoHighlight
      disabled={disabled}
    >
      <BaseCombobox.Input
        {...rest}
        id={id}
        name={name ?? id}
        placeholder={placeholder}
        required={required}
        className={[
          'rounded-10 flex w-full min-w-0 items-center pl-3',
          inputStyles.input,
          inputStyles.noLabel,
          classes,
        ]
          .filter(Boolean)
          .join(' ')}
      />

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner sideOffset={4} className="z-[200]">
          <BaseCombobox.Popup
            className={[
              'rounded-10 max-h-64 w-(--anchor-width) overflow-y-auto',
              'bg-white py-1 shadow-lg',
            ].join(' ')}
          >
            <BaseCombobox.List>
              {(item) => (
                <BaseCombobox.Item
                  key={itemToKey(item)}
                  value={item}
                  className={[
                    'text-14 cursor-pointer px-3 py-2 text-black',
                    'data-highlighted:bg-main-bg-light',
                  ].join(' ')}
                >
                  {renderItem ? renderItem(item) : itemToLabel(item)}
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>

            {/* Rendered outside the List so it is never a selectable item. */}
            {action && query ? (
              <div className="border-light-grey border-t">{action}</div>
            ) : null}
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
};

export default Combobox;
