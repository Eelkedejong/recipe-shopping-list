// import styles from "./button.module.scss";

const Button = ({ type, text, onClick, className }) => {
  const classes = `
    btn bg-main rounded-s df aic jcc text-white fs-18 
    ${className ? className : ""}
    ${type !== "undefined" ? type : " "} 
  `;

  return (
    <button onClick={onClick} className={classes}>
      {text}
    </button>
  );
};

export default Button;
