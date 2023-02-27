import s from './EngineWidget.module.scss';
import engineImg from './../../../assets/img/png/engine-widget-icon.png';
import { IEngine } from '../../../types/types';
import React, { useRef, useState } from 'react';
import EngineFile from '../EngineFile/EngineFile';
import { Transition, TransitionStatus } from 'react-transition-group';
import WidgetMenu from '../../../common/WidgetMenu/WidgetMenu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { deleteEngine, setChoosedEngine } from '../../../store/reducers/engineReducer';
import DeleteMessage from '../../../common/messages/DeleteMessage/DeleteMessage';
import EngineEditForm from '../EngineEditForm/EngineEditForm';

type EngineWidgetProps = {
    engine: IEngine;
    isLoader: boolean;
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

const EngineWidget: React.FC<EngineWidgetProps> = ({ engine, isLoader }) => {
    const dispatch = useDispatch<AppDispatch>();
    const choosedEngine = useSelector((state: any) => state.engine.choosedEngine);
    const nodeRef = useRef(null);
    const [engineFile, setEngineFile] = useState(false);
    const [delMess, setDelMess] = useState(false);
    const [engineEditForm, setEngineEditForm] = useState(false);

    const updateForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        console.log("update form")
    }

    const showEngineEditForm = () => {
        engineEditForm ? setEngineEditForm(false) : setEngineEditForm(true);
        dispatch(setChoosedEngine(engine));
    }

    const widgetOnClick = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement
        if (engine && target.tagName !== "BUTTON") {
            setEngineFile(true);
            dispatch(setChoosedEngine(engine))
        }
    }

    const delEngine = (engineId: string | undefined) => {
        if (engineId) dispatch(deleteEngine(engineId))
    }

    return (
        <>
            <DeleteMessage
                handleBack={() => setDelMess(false)}
                handleSubmit={() => delEngine(engine._id)}
                toggle={delMess}
                header='Would you like to delete this Engine?'
                text='The Engine will be permanently deleted' />
            <EngineEditForm engine={choosedEngine} showEngineEditForm={showEngineEditForm} toggle={engineEditForm} />
            <EngineFile engine={engine} setEngineFile={setEngineFile} toggle={engineFile} />
            <Transition
                nodeRef={nodeRef}
                in={!isLoader}
                timeout={duration}
                unmountOnExit>
                {(state: TransitionStatus) => (

                    <div className={s.engineWidget} onClick={widgetOnClick} ref={nodeRef}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }} >
                        <WidgetMenu showEditForm={showEngineEditForm} setDelMess={setDelMess} />
                        <img className={s.engineWidget__img} src={engineImg} alt="icon" />
                        {/* <button className={s.widget__btns__set} onClick={updateForm} /> */}
                        <h3 className={s.engineWidget__header} >MSN: {engine.msn}</h3>
                        <div className={s.engineWidget__data} >
                            <div className={s.engineWidget__data__block}>
                                <span>Type:</span>
                                <span>{engine.type}</span>
                            </div>
                            <div className={s.engineWidget__data__block}>
                                <span> TSN:</span>
                                <span>{engine.tsn}</span>
                            </div>
                            <div className={s.engineWidget__data__block}>
                                <span>CSN:</span>
                                <span>{engine.csn}</span>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </>

    )
}

export default EngineWidget;