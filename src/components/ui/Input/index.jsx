import { useState, useEffect } from "react";
// import styles from "./input.module.scss";

const Input = ({
  id,
  name,
  label,
  value,
  onChange,
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

  return (
    <>
      {label ? (
        <label htmlFor={name} className={`pos-relative ${labelClasses}`}>
          <span
            className={`ui-label input-label fw-light text-dark-grey ${
              focus ? "focus" : ""
            }`}
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
            onBlur={(e) => {
              if (!e.target.value) setFocus(false);
            }}
            className={`input rounded-s df aic jcc pl-3 pt-3 text-black ${
              classes ? classes : null
            }`}
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
          className={`no-label rounded-s df aic jcc pl-3  ${
            classes ? classes : null
          }`}
          required={required}
        />
      )}
    </>
  );
};

export default Input;
