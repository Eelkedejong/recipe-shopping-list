import styles from './button.module.scss';

const Button = ({ type, text, onClick, className, loading }) => {
  const classes = `
    bg-main rounded-s df aic jcc text-white fs-18 
    ${styles.btn}
    ${className ? className : ''}
    ${type !== 'undefined' ? styles[type] : ' '} 
  `;

  // loading = true;

  return (
    <button onClick={onClick} className={classes}>
      {text}
      {/* {loading ? <span className={`loader ${styles.btnLoader}`}></span> : text} */}
    </button>
  );
};

export default Button;
