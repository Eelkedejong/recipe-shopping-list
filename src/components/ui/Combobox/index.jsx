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
  emptyMessage,
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
      onInputValueChange={onInputValueChange}
      value={null}
      onValueChange={(item) => {
        if (item) onItemSelect?.(item);
      }}
      itemToStringLabel={itemToLabel}
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
        <BaseCombobox.Positioner sideOffset={4} className="z-50">
          <BaseCombobox.Popup
            className={[
              'rounded-10 max-h-64 w-(--anchor-width) overflow-y-auto',
              'bg-white py-1 shadow-lg',
            ].join(' ')}
          >
            {/* Only meaningful once something has been typed. */}
            {emptyMessage && query ? (
              <BaseCombobox.Empty className="text-14 text-dark-grey px-3 py-2">
                {emptyMessage}
              </BaseCombobox.Empty>
            ) : null}

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
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
};

export default Combobox;
