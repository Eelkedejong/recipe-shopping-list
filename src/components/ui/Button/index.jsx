import { Button as BaseButton } from '@base-ui/react/button';
import styles from './button.module.scss';

/**
 * Button
 *
 * `type` is the native button type ('button' | 'submit' | 'reset') and
 * defaults to 'button' so a button never submits a surrounding form by
 * accident. Use `variant` for styling.
 */
const Button = ({
  type = 'button',
  variant,
  text,
  children,
  onClick,
  className,
  loading = false,
  disabled = false,
  ...rest
}) => {
  const label = children ?? text;

  const classes = [
    'bg-main rounded-10 flex items-center justify-center text-white text-18',
    styles.btn,
    variant ? styles[variant] : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <BaseButton
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
      // While loading the button stays focusable, so focus is not lost
      // mid-submit. Base UI still blocks the click (and the submit with it).
      focusableWhenDisabled={loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <>
          <span className={`loader ${styles.btnLoader}`} aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </>
      ) : (
        label
      )}
    </BaseButton>
  );
};

export default Button;
