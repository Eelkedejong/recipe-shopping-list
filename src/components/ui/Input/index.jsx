import { useState, useEffect } from "react";
import styles from "./input.module.scss";

const Input = ({
  id,
  name,
  label,
  value,
  onChange,
  type,
  required,
  classes,
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
        <label htmlFor={name} className="pos-relative">
          <span className={`${styles.label} ${focus ? styles.focus : ""}`}>
            {label}
          </span>

          <input
            id={id}
            name={name}
            type={type}
            defaultValue={value}
            onChange={onChange}
            onFocus={() => setFocus(true)}
            onBlur={(e) => {
              if (!e.target.value) setFocus(false);
            }}
            className={`rounded-s df aic jcc pl-3 pt-3 ${styles.input} ${
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
          defaultValue={value}
          onChange={onChange}
          className={`rounded-s df aic jcc pl-3 ${styles.input} ${
            styles.noLabel
          } ${classes ? classes : null}`}
          required={required}
        />
      )}
    </>
  );
};

export default Input;
