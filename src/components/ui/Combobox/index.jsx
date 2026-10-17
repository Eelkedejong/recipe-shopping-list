import { Combobox as BaseCombobox } from '@base-ui/react/combobox';

/**
 * Combobox
 *
 * A text input with suggestions, where free text stays valid. Picking a
 * suggestion reports the whole item through `onItemSelect`; typing something
 * with no match simply leaves the text as typed.
 *
 * Filtering is done by the call site and passed in through `items`, with Base
 * UI's own filter disabled, so results can be ranked (prefix before
 * substring) rather than only filtered.
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
  className,
  inputClassName,
  ...rest
}) => (
  <BaseCombobox.Root
    items={items}
    // The call site has already filtered and ranked; filtering again here
    // would drop results that matched on an alias rather than the label.
    filter={null}
    inputValue={inputValue ?? ''}
    onInputValueChange={onInputValueChange}
    value={null}
    onValueChange={(item) => {
      if (item) onItemSelect?.(item);
    }}
    itemToStringLabel={itemToLabel}
    openOnInputClick
    disabled={disabled}
  >
    <BaseCombobox.Input
      {...rest}
      id={id}
      name={name ?? id}
      placeholder={placeholder}
      required={required}
      className={[
        'rounded-10 w-full min-w-0 flex items-center pl-3 h-10',
        'bg-white border border-transparent text-black',
        'focus:outline-none focus:border-dark-grey',
        inputClassName,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />

    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={4} className="z-50">
        <BaseCombobox.Popup
          className={[
            'rounded-10 max-h-64 w-[var(--anchor-width)] overflow-y-auto',
            'bg-white py-1 shadow-lg',
          ].join(' ')}
        >
          {emptyMessage ? (
            <BaseCombobox.Empty className="px-3 py-2 text-14 text-dark-grey">
              {emptyMessage}
            </BaseCombobox.Empty>
          ) : null}

          <BaseCombobox.List>
            {(item) => (
              <BaseCombobox.Item
                key={itemToKey(item)}
                value={item}
                className={[
                  'cursor-pointer px-3 py-2 text-14 text-black',
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

export default Combobox;
