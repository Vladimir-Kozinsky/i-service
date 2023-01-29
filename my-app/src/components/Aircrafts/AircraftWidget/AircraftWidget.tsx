import s from './AircraftWidget.module.scss';
import plane from './../../../assets/img/png/plane.png'
import engine from './../../../assets/img/png/engine.png'
import apu from './../../../assets/img/png/apu.png'
import { deleteAircraft, IAircraft, setChoosedAircraft } from '../../../store/reducers/aircraftReducer';
import React, { useState } from 'react';
import AircraftEditForm from '../AircraftEditForm/AircraftEditForm';
import { IAircraftFile } from '../Aircrafts';
import AircraftFile from '../AircraftFile/AircraftFile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { setEngine } from '../../../utils/forms';
import DeleteMessage from '../../../common/messages/DeleteMessage/DeleteMessage';
import { useRef } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import WidgetMenu from '../../../common/WidgetMenu/WidgetMenu';

type propsAircraftWidget = {
    onClick?: ({ show, msn }: IAircraftFile) => void
    aircraft?: IAircraft;
    setIsLoader: (isLoader: boolean) => void
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

const AircraftWidget = ({ onClick, aircraft, setIsLoader, isLoader }: propsAircraftWidget) => {
    const dispatch = useDispatch<AppDispatch>();
    const choosedAircraft = useSelector((state: any) => state.aircraft.choosedAircraft);
    const nodeRef = useRef(null);
    const [arcraftEditForm, setArcraftEditForm] = useState(false);
    const [arcraftFile, setArcraftFile] = useState(false);
    const [delMess, setDelMess] = useState(false);

    const cutData = (str: string | undefined | null) => {
        if (!str) return 'N/A'
        if (str.length <= 5) return str;
        const cutStr = str.slice(str.length - 3, str.length)
        return `...${cutStr}`;
    }

    const delAircraft = (aircraftId: string | undefined) => {
        if (aircraftId) dispatch(deleteAircraft(aircraftId))
    }

    const showArcraftEditForm = () => {
        arcraftEditForm ? setArcraftEditForm(false) : setArcraftEditForm(true);
        dispatch(setChoosedAircraft(aircraft));
    }

    const widgetOnClick = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement
        if (aircraft && onClick && target.tagName !== "BUTTON") {
            setArcraftFile(true);
            dispatch(setChoosedAircraft(aircraft))
        }
    }

    return (
        <>
            <DeleteMessage
                handleBack={() => setDelMess(false)}
                handleSubmit={() => delAircraft(aircraft?._id)}
                toggle={delMess}
                header='Would you like to delete this Aircraft?'
                text='The Aircraft will be permanently deleted' />
            <AircraftFile aircraft={choosedAircraft} setArcraftFile={setArcraftFile} toggle={arcraftFile} setIsLoader={setIsLoader} />
            <AircraftEditForm aircraft={choosedAircraft} showArcraftEditForm={showArcraftEditForm} toggle={arcraftEditForm} />
            <Transition
                nodeRef={nodeRef}
                in={!isLoader}
                timeout={duration}
                unmountOnExit>
                {(state: TransitionStatus) => (
                    <div className={s.widget} onClick={widgetOnClick} ref={nodeRef}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }} >
                        <WidgetMenu showEditForm={showArcraftEditForm} setDelMess={setDelMess} />

                        <img className={s.widget__plane__img} src={plane} alt="plane-icon" />
                        <div className={s.widget__data}>
                            <h3 className={s.widget__data__value}>{`Type: ${aircraft?.type}`}</h3>
                            <h3 className={s.widget__data__value}>{`MSN: ${aircraft?.msn}`}</h3>
                            <div className={s.widget__data__engines}>
                                <div className={s.engine}>
                                    <img src={engine} alt="engine-icon" />
                                    {aircraft
                                        ? <span>{`#1: ${cutData(setEngine('1', aircraft.engines))}`}</span>
                                        : <span>{`#1: N/A`}</span>}
                                </div>
                                <div className={s.engine}>
                                    <img src={engine} alt="engine-icon" />
                                    {aircraft
                                        ? <span>{`#2: ${cutData(setEngine('2', aircraft.engines))}`}</span>
                                        : <span>{`#2: N/A`}</span>}
                                </div>
                                <div className={s.engine}>
                                    <img src={engine} alt="engine-icon" />
                                    {aircraft
                                        ? <span>{`#3: ${cutData(setEngine('3', aircraft.engines))}`}</span>
                                        : <span>{`#3: N/A`}</span>}
                                </div>
                                <div className={s.engine}>
                                    <img src={engine} alt="engine-icon" />
                                    {aircraft
                                        ? <span>{`#4: ${cutData(setEngine('4', aircraft.engines))}`}</span>
                                        : <span>{`#4: N/A`}</span>}
                                </div>
                                <div className={s.engine}>
                                    <img src={apu} alt="engine-icon" />
                                    <span>{`APU: ${cutData(aircraft?.apu ? aircraft?.apu.msn : '')}`}</span>
                                </div>
                            </div >
                        </div>
                    </div>
                )}
            </Transition>
        </>
    )
}

export default AircraftWidget;