import classes from "./Button.module.css";



const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className={`${classes['button']} ${classes[props.className]}`}
      value={props.value}
      pressed={props.pressed}
    >
        {props.children}
    </button>
  );
};

export default Button;
