import { useState, useEffect } from "react";
// import styles from "./textarea.module.scss";

const Textarea = ({ id, name, label, value, onChange, type, required }) => {
  if (!name) {
    name = id;
  }

  const [focus, setFocus] = useState(value ? true : false);
  useEffect(() => {
    setFocus(value);
  }, [value]);

  return (
    <label htmlFor={name} className="pos-relative">
      <span
        className={`ui-label textarea-label fw-light text-dark-grey ${
          focus ? "focus" : ""
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
        className="textarea rounded-s df aic jcc pl-3 pt-5"
        required={required}
      />
    </label>
  );
};

export default Textarea;
