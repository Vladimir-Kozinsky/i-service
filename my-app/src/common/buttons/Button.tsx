import classNames from "classnames";
import s from "./Button.module.scss"

type ButtonProps = {
    text: string;
    color: string;
    btnType: "button" | "submit" | "reset";
}

const Button = ({ text, color, btnType }: ButtonProps) => {
    return (
        <button type={btnType} className={classNames(s.button, s[`button__${color}`]) }>{text}</button>
    )
}

export default Button;