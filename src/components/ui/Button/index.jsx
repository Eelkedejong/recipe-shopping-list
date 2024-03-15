import styles from './button.module.scss';

const Button = ({ type, text, onClick, className }) => {
  const classes = `
    bg-main rounded-s df aic jcc text-white fs-18 
    ${styles.btn}
    ${className ? className : ''}
    ${type !== 'undefined' ? styles[type] : ' '} 
  `;

  return (
    <button onClick={onClick} className={classes}>
      {text}
    </button>
  );
};

export default Button;
