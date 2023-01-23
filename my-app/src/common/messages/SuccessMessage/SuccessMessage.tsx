import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { AppDispatch } from '../../../store/store';
import Button from '../../buttons/Button';
import icon from './../../../assets/img/png/success-icon.png'
import s from './SuccessMessage.module.scss';
import { compose } from 'redux';
import { withContainerBlur } from '../../../components/HOC/withContainerBlur/withContainerBlur';

type SuccessMessageProps = {
    handler: () => any
}

const SuccessMessage = ({ handler }: SuccessMessageProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);
    const buttonHandler = () => {
        dispatch(handler())
    }
    return (
        <div className={s.message} ref={nodeRef}>
            <h3 className={s.message__header} >Success!</h3>
            <span>Your request has been successfully <br />processed</span>
            <img className={s.message__icon} src={icon} alt="img" />
            <Button btnType='button' text='Continue' handler={buttonHandler} color="green" />
        </div >
    )
}

export default compose(withContainerBlur)(SuccessMessage);