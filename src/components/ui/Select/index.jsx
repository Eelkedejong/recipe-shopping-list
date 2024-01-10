import { useState } from "react";
// import styles from "./select.module.scss";
import { FaChevronDown } from "react-icons/fa";

const Select = ({
  id,
  name,
  label,
  value,
  onChange,
  type,
  required,
  options,
  placeholder,
}) => {
  if (!name) {
    name = id;
  }

  const [selectValue, setSelectValue] = useState(value);

  return (
    <label htmlFor={name} className="pos-relative df faic">
      <span className="ui-label select-label fw-light text-dark-grey">
        {label}
      </span>

      <select
        id={id}
        name={name}
        type={type}
        value={selectValue ? selectValue : value}
        onChange={
          onChange
            ? onChange
            : (e) => {
                setSelectValue(e.target.value);
              }
        }
        className="select rounded-s df aic jcc pl-3 pt-3"
        required={required}
      >
        {placeholder ? (
          <option value=" " disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>

      <span className="select-icon">
        <FaChevronDown />
      </span>
    </label>
  );
};

export default Select;
