import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/buttons/Button';
import s from './Engines.module.scss';
import EngineWidget from './EngineWidget/EngineWidget';
import addEngineImg from '../../assets/img/png/cross.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getEngines } from '../../store/reducers/engineReducer';
import { IEngine } from '../../types/types';
import EngineAddForm from './EngineAddForm/EngineAddForm';
import Header from '../Header/Header';
import { Transition, TransitionStatus } from 'react-transition-group';
import Loader from '../../common/Loader/Loader';
import { compose } from 'redux';
import withEngineSuccMess from '../HOC/withEngineSuccMess';


const defaultStyle = {
    transition: `opacity ${2000}ms ease-in-out`,
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


const Engines: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const enginesArr = useSelector((state: RootState) => state.engine.engines);
    const [isLoader, setIsLoader] = useState(true);
    const nodeRef = useRef(null);
    const engines = enginesArr.map((engine: IEngine) => {
        return <EngineWidget engine={engine}
            key={engine._id}
            isLoader={isLoader} />
    })
    const [engAddForm, setEngAddForm] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            await dispatch(getEngines())
            setIsLoader(false)
        })()
    }, [])

    return (
        <div className={s.engines__container} >
            <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                {(state) => <Loader state={state} />}
            </Transition>
            <Header />
            <div className={s.engines}>
                <EngineAddForm setEngAddForm={setEngAddForm} toggle={engAddForm} isLoader={isLoader} />
                {engines}

                <Transition
                    nodeRef={nodeRef}
                    in={!isLoader}
                    timeout={2000}
                    unmountOnExit>
                    {(state: TransitionStatus) => (
                        <div className={s.widget} onClick={() => setEngAddForm(true)}
                            ref={nodeRef}
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}  >
                            <img className={s.widget__img} src={addEngineImg} alt="" />
                        </div>
                    )}
                </Transition>
            </div>

            <Button text='Back' color='white__dark' btnType='button' handler={() => navigate('/dashboard')} />
        </div>
    )
}

export default compose(withEngineSuccMess)(Engines);