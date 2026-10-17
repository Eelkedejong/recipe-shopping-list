import styles from './button.module.scss';

const Button = ({ type, text, onClick, className, loading }) => {
  const classes = `
    bg-main rounded-10 flex items-center justify-center text-white text-18 
    ${styles.btn}
    ${className ? className : ''}
    ${type !== 'undefined' ? styles[type] : ' '} 
  `;

  return (
    <button onClick={onClick} className={classes}>
      {loading ? <span className={`loader ${styles.btnLoader}`}></span> : text}
    </button>
  );
};

export default Button;
