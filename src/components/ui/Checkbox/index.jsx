import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import styles from './checkbox.module.scss';

/**
 * Checkbox
 *
 * Base UI renders a <span> for the box plus a hidden <input>, so form
 * submission is unchanged: a ticked box submits `value`, or the native 'on'
 * when no value is given. The surrounding <label> markup is left to the call
 * site, which keeps the existing layouts intact.
 *
 * Pass `label` to get the wrapping <label> + text for free instead.
 */
const Checkbox = ({
  id,
  name,
  value,
  variant,
  className,
  label,
  labelClassName,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  required,
  ...rest
}) => {
  const root = (
    <BaseCheckbox.Root
      {...rest}
      id={id}
      name={name}
      value={value}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      required={required}
      className={[
        styles.checkbox,
        variant ? styles[variant] : null,
        label ? null : className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <BaseCheckbox.Indicator className={styles.indicator} />
    </BaseCheckbox.Root>
  );

  if (!label) {
    return root;
  }

  return (
    <label className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {root}
      <span className={labelClassName}>{label}</span>
    </label>
  );
};

export default Checkbox;
