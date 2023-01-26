import { Transition, TransitionStatus } from "react-transition-group";
import cross from './../../../assets/img/png/cross.png'
import s from './AddAircraftWidget.module.scss';
import { useRef } from 'react';

type AddAircraftWidgetProps = {
    setAddForm: (isForm: boolean) => void
    isLoader: boolean
}

const duration = 2000;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

type transitionStylesType = {
    entering: { [key: string]: string };
    entered: { [key: string]: string };
    exiting: { [key: string]: string };
    exited: { [key: string]: string };
    unmounted?: { [key: string]: string };
}

const transitionStyles: transitionStylesType = {
    entering: { opacity: '1' },
    entered: { opacity: '1' },
    exiting: { opacity: '0' },
    exited: { opacity: '0' },
};

const AddAircraftWidget: React.FC<AddAircraftWidgetProps> = ({ setAddForm, isLoader }) => {
    const nodeRef = useRef(null);
    return (
        <Transition
            nodeRef={nodeRef}
            in={!isLoader}
            timeout={duration}
            unmountOnExit>
            {(state: TransitionStatus) => (
                <div className={s.widget}
                    onClick={() => setAddForm(true)}
                    ref={nodeRef}
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }} >
                    <div className={s.widget__btns} >
                    </div>
                    <img className={s.widget__cross__img} src={cross} alt="plane-icon" />
                </div>
            )}
        </Transition>
    )
}

export default AddAircraftWidget;