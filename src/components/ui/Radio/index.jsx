import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import styles from './radio.module.scss';

/**
 * Radio
 *
 * Must be rendered inside a RadioGroup, which owns the selected value. The
 * group renders the hidden input, so native form submission is unchanged.
 */
const Radio = ({ id, value, className, label, labelClassName, ...rest }) => {
  const root = (
    <BaseRadio.Root
      {...rest}
      id={id}
      value={value}
      className={[styles.radio, label ? null : className]
        .filter(Boolean)
        .join(' ')}
    >
      <BaseRadio.Indicator className={styles.indicator} />
    </BaseRadio.Root>
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

export const RadioGroup = BaseRadioGroup;
export default Radio;
