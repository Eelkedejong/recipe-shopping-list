import { Field } from '@base-ui/react/field';
import { Input as BaseInput } from '@base-ui/react/input';
import styles from './input.module.scss';

/**
 * Input
 *
 * Wraps Base UI's Input (which is Field.Control under the hood). The floating
 * label is driven by the `data-filled` / `data-focused` attributes Base UI sets
 * on Field.Root, so the component no longer tracks focus in React state.
 *
 * The input stays uncontrolled (`defaultValue`): the forms in this app read
 * their values back through FormData, and call sites remount via `key` when the
 * incoming value changes.
 */
const Input = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  onMouseDown,
  type,
  step,
  required,
  classes,
  autocomplete,
  labelClasses,
  placeholder,
  ...rest
}) => {
  const controlProps = {
    id,
    name: name ?? id,
    type,
    step,
    defaultValue: value ?? '',
    placeholder,
    autoComplete: autocomplete,
    required,
    onChange,
    onBlur,
    onMouseDown,
  };

  // Without a label there is nothing to float, so the input is rendered bare.
  // Several call sites drop it straight into a CSS grid (IngredientsRow,
  // ShoppingListItems), where an extra wrapper element would break the columns.
  if (!label) {
    return (
      <BaseInput
        {...rest}
        {...controlProps}
        onKeyDown={(event) => event.stopPropagation()}
        className={[
          'rounded-10 flex items-center justify-center pl-3',
          styles.input,
          styles.noLabel,
          classes,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    );
  }

  return (
    <Field.Root
      className={[styles.field, labelClasses].filter(Boolean).join(' ')}
    >
      {/* Base UI points htmlFor at the registered control, so no id wiring here. */}
      <Field.Label className={`font-light text-dark-grey ${styles.label}`}>
        {label}
      </Field.Label>

      <BaseInput
        {...rest}
        {...controlProps}
        className={[
          'rounded-10 flex items-center justify-center pl-3 pt-3 text-black',
          styles.input,
          classes,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </Field.Root>
  );
};

export default Input;
