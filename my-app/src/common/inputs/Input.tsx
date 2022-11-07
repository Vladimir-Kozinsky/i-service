import s from './Input.module.scss'



const Input = (props: any) => {
    return (
        <input className={s.input} {...props} />
    )
}

export default Input;