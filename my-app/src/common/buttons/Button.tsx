import classNames from "classnames";
import { createBrotliCompress } from "zlib";
import s from "./Button.module.scss"

type ButtonProps = {
    text: string;
    color: string;
    btnType: "button" | "submit" | "reset";
    handler?: () => void;
}

const Button = ({ text, color, btnType, handler }: ButtonProps) => {
    return (
        <button type={btnType} className={classNames(s.button, s[`button__${color}`])} onClick={handler}>{text}</button>
    )
}

export default Button;