import classNames from "classnames";
import s from "./Button.module.scss"

type ButtonProps = {
    text: string;
    color: "white" | "green" | "white__dark" | "red";
    btnType: "button" | "submit" | "reset";
    handler?: (value?: any) => void;
    state?: any 
}

const Button = ({ text, color, btnType, handler, state }: ButtonProps) => {
    return (
        <button type={btnType} className={classNames(s.button, s[`button__${color}`])} onClick={handler}>{text}</button>
    )
}

export default Button;