import { useState, useEffect } from 'react';
import styles from './input.module.scss';

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
}) => {
  if (!name) {
    name = id;
  }

  const [focus, setFocus] = useState(value ? true : false);
  useEffect(() => {
    setFocus(value);
  }, [value]);

  const handleBlur = (e) => {
    // Call the onBlur function in your component
    if (!e.target.value) setFocus(false);

    // Call the onBlur function passed in the props
    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  return (
    <>
      {label ? (
        <label htmlFor={name} className={`pos-relative ${labelClasses}`}>
          <span
            className={`
              fw-light text-dark-grey 
              ${styles.label} 
              ${focus ? styles.focus : ''}
            `}
          >
            {label}
          </span>

          <input
            id={id}
            name={name}
            type={type}
            step={step}
            defaultValue={value}
            autoComplete={autocomplete}
            onChange={onChange}
            onFocus={() => setFocus(true)}
            onBlur={handleBlur}
            onMouseDown={onMouseDown}
            className={`
              rounded-s df aic jcc pl-3 pt-3 text-black 
              ${styles.input} 
              ${classes ? classes : null}
            `}
            required={required}
          />
        </label>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          step={step}
          defaultValue={value}
          onChange={onChange}
          onBlur={onBlur}
          onMouseDown={onMouseDown}
          className={`
            rounded-s df aic jcc pl-3 
            ${styles.input} 
            ${styles.noLabel} 
            ${classes ? classes : null}
          `}
          required={required}
        />
      )}
    </>
  );
};

export default Input;
