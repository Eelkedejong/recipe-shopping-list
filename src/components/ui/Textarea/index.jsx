import { useState, useEffect } from "react";
import styles from "./textarea.module.scss";

const Textarea = ({ id, name, label, value, onChange, type, required }) => {
  if (!name) {
    name = id;
  }

  const [focus, setFocus] = useState(value ? true : false);
  useEffect(() => {
    setFocus(value);
  }, [value]);

  return (
    <label htmlFor={name} className="pos-relative ff-text ">
      <span
        className={`fw-light text-dark-grey ${styles.label} ${
          focus ? styles.focus : ""
        }`}
      >
        {label}
      </span>

      <textarea
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          if (!e.target.value) setFocus(false);
        }}
        className={`rounded-s df aic jcc pl-3 pt-5 ${styles.textarea}`}
        required={required}
      />
    </label>
  );
};

export default Textarea;
