import classNames from "classnames";
import s from "./Button.module.scss"

type ButtonProps = {
    text: string;
    color: "white" | "green" | "white__dark";
    btnType: "button" | "submit" | "reset";
    handler?: () => void;
}

const Button = ({ text, color, btnType, handler }: ButtonProps) => {
    return (
        <button type={btnType} className={classNames(s.button, s[`button__${color}`])} onClick={handler}>{text}</button>
    )
}

export default Button;