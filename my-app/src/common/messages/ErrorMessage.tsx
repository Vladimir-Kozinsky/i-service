import s from './ErrorMessage.module.scss';
type propsType = {
    message: string;
}

const ErrorMessage = ({ message }: propsType) => {
    return (
        <div className={s.message}>
            <div className={s.message__triangle}></div>
            <div className={s.message__block}>
                <p className={s.message__block__p}>{message}</p>
            </div>
        </div >
    )
}

export default ErrorMessage;