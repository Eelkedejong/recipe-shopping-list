import { Field } from '@base-ui/react/field';
import { Select as BaseSelect } from '@base-ui/react/select';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import styles from './select.module.scss';

/**
 * Select
 *
 * Base UI's Select is a custom listbox rather than a native <select>, so the
 * popup can be styled. It still submits through a hidden input, so forms read
 * it back the same way.
 *
 * `options` accepts plain strings or { value, label } objects.
 */
const Select = ({
  id,
  name,
  label,
  value,
  defaultValue,
  onValueChange,
  required,
  disabled,
  options = [],
  placeholder,
  className,
  ...rest
}) => {
  const items = options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option
  );

  return (
    <Field.Root className={[styles.field, className].filter(Boolean).join(' ')}>
      {label ? (
        <Field.Label className={`font-light text-dark-grey ${styles.label}`}>
          {label}
        </Field.Label>
      ) : null}

      <BaseSelect.Root
        {...rest}
        items={items}
        name={name ?? id}
        value={value}
        defaultValue={defaultValue ?? null}
        onValueChange={onValueChange}
        required={required}
        disabled={disabled}
      >
        <BaseSelect.Trigger id={id} className={styles.select}>
          <BaseSelect.Value placeholder={placeholder} />
          <BaseSelect.Icon className={styles.icon}>
            <FaChevronDown />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner sideOffset={4} className={styles.positioner}>
            <BaseSelect.Popup className={styles.popup}>
              <BaseSelect.List>
                {items.map((item) => (
                  <BaseSelect.Item
                    key={item.value}
                    value={item.value}
                    className={styles.item}
                  >
                    <BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
                    <BaseSelect.ItemIndicator className={styles.itemIndicator}>
                      <FaCheck />
                    </BaseSelect.ItemIndicator>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </Field.Root>
  );
};

export default Select;
