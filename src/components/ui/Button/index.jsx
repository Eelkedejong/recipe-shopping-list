import styles from "./button.module.scss";

const Button = ({ type, text, onClick, className }) => {
  const classes = `
    bg-black rounded-s df aic jcc text-white fs-18 
    ${className ? className : ""}
    ${type !== "undefined" ? styles[type] : " "} 
    ${styles.btn}
  `;

  return (
    <button onClick={onClick} className={classes}>
      {text}
    </button>
  );
};

export default Button;
