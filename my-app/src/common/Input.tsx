import s from './Input.module.scss'
import { Field } from 'formik';

type InputProps = {
    type: string;
    id: string;
    name: string;
    placeholder: string;
    value?: string | number;
    disabled?: boolean;
    min?: string,
    max?: string,
}

const Input = ({ type, id, name, placeholder, value, disabled, min, max }: InputProps) => {
    return (
        <Field type={type}
            id={id} name={name}
            placeholder={placeholder}
            className={s.input}
            value={value}
            disabled={disabled}
            min={min} max={max}
        />
    )
}

export default Input