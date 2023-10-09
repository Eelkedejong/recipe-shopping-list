import styles from './button.module.scss'


const Button = ({type, text, onClick}) => {
  const classes = `
    bg-black rounded-s df aic jcc text-white fs-18 
    ${type !== 'undefined' ? styles[type] : null} 
    ${styles.btn}
  `

  return (
    <button
      onClick={onClick}
      className={classes}
    >
      {text}
    </button>
  )
}

export default Button