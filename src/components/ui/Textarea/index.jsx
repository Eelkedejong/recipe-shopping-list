import { Field } from '@base-ui/react/field';
import styles from './textarea.module.scss';

/**
 * Textarea
 *
 * Base UI has no Textarea component, so Field.Control renders one through its
 * `render` prop. The function form is used because Field.Control is typed
 * against HTMLInputElement.
 *
 * Like Input, the floating label comes from Field.Root's `data-filled` /
 * `data-focused` attributes and the control stays uncontrolled.
 */
const Textarea = ({
  id,
  name,
  label,
  value,
  onChange,
  required,
  className,
  classes,
  ...rest
}) => {
  return (
    <Field.Root className={[styles.field, className].filter(Boolean).join(' ')}>
      <Field.Label className={`font-light text-dark-grey ${styles.label}`}>
        {label}
      </Field.Label>

      <Field.Control
        {...rest}
        render={(props) => <textarea {...props} />}
        id={id}
        name={name ?? id}
        defaultValue={value ?? ''}
        onChange={onChange}
        required={required}
        className={[
          'rounded-10 flex items-center justify-center pl-3 pt-6',
          styles.textarea,
          classes,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </Field.Root>
  );
};

export default Textarea;
