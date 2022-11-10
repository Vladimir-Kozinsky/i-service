import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import s from './Input.module.scss'

const Input = (props: any) => {
    const myRef = useRef(null);
    const [isMessage, setIsMessage] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [message, setMessage] = useState('');
    const [className, setClassName] = useState('');
    useEffect(() => {
        if (props.error) {
            setIsMessage(true)
            setMessage(props.error)
            setClassName('active')
        } else {
            setClassName('deactive')
            setTimeout(() => {
                setIsMessage(false)
                setMessage('')
            }, 500);
        }
    }, [props.error])
    return (
        <div className={s.input}>
            <input className={s.input__field} {...props} />
            {isMessage &&
                <div ref={myRef} className={classNames(s.input__message, s[className])}>
                    <div className={s.input__message__triangle}></div>
                    <div className={s.input__message__block}>
                        <p>{message}</p>
                    </div>
                </div >
            }
        </div >
    )
}

export default Input;