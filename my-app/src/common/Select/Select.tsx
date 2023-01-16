import s from './Select.module.scss'
import Select from 'react-select'
import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

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

interface IOption {
    value: string | null;
    label: string | null;
}

type SelectProps = {
    options: IOption[];
    onChange: ()=> void;
    customStyles: any;
    error: string | undefined;
    setSelectedOption: (selectedOption: null | string) => void
}

const FormSelect: React.FC<SelectProps> = ({ options, onChange, customStyles, error, setSelectedOption }) => {
    const nodeRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    useEffect(() => {
        if (error === 'error') setErrorMessage('Aircraft type is required')
    }, [error])
    return (
        <div className={s.formSelect}>
            <Select onFocus={() => !error && setSelectedOption('error')} className={s.select} options={options} onChange={onChange} styles={customStyles} />
            <Transition
                nodeRef={nodeRef}
                in={error === 'error' ? true : false}
                timeout={500}
                onExited={() => setErrorMessage(null)}
                unmountOnExit >
                {(state: TransitionStatus) => (
                    <div className={s.input__message} ref={nodeRef} style={{
                        ...transitionStyles[state]
                    }} >
                        <div className={s.input__message__triangle}></div>
                        <div className={s.input__message__block}>
                            <p>{errorMessage}</p>
                        </div>
                    </div >
                )}
            </Transition>
        </div>
    )
}

export default FormSelect;