import React from 'react';
import { useState } from 'react';
import styles from './input.module.scss'

const Input = ({ id, name, label, onChange, type, required  }) => {
  if (!name) {
    name = id
  }

  const [focus, setFocus] = useState(false)

  return (
    <label 
      htmlFor={name}
      className='pos-relative'

    >
      <span className={`${styles.label} ${focus ? styles.focus : ''}`}>
        {label}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          if (!e.target.value)
          setFocus(false)
        }}
        className={`rounded-s df aic jcc mb-4 pl-3 pt-3 ${styles.input}`}
        required={required} 
      />
    </label>
  )
}

export default Input