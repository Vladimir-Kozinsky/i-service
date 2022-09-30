import s from './AircraftWidget.module.scss';
import plane from './../../../assets/img/png/plane.png'
import engine from './../../../assets/img/png/engine.png'
import apu from './../../../assets/img/png/apu.png'
import { IAircraft } from '../../../store/reducers/aircraftReducer';
import React, { useState } from 'react';
import AircraftEditForm from '../AircraftEditForm/AircraftEditForm';
import { IAircraftFile } from '../Dashboard';

type propsAircraftWidget = {
    onClick?: ({ show, msn }: IAircraftFile) => void
    aircraft?: IAircraft;
}

const AircraftWidget = ({ onClick, aircraft }: propsAircraftWidget) => {
    const cutData = (str: string | undefined) => {
        if (!str) return 'N/A'
        if (str.length <= 5) return str;
        const cutStr = str.slice(str.length - 3, str.length)
        return `...${cutStr}`;
    }
    const [arcraftEditForm, setArcraftEditForm] = useState(false);

    const showArcraftEditForm = () => {
        arcraftEditForm ? setArcraftEditForm(false) : setArcraftEditForm(true);
    }

    const widgetOnClick = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement
        if (aircraft && onClick && target.tagName !== "BUTTON") {
            onClick({ show: true, msn: aircraft.msn })
        }
    }

    return (
        <>
            {arcraftEditForm && aircraft ? <AircraftEditForm aircraft={aircraft} showArcraftEditForm={showArcraftEditForm} /> : null}
            <div className={s.widget} onClick={widgetOnClick} >
                <div className={s.widget__btns} >
                    <button className={s.widget__btns__set} onClick={showArcraftEditForm} >
                    </button>
                </div>
                <img className={s.widget__plane__img} src={plane} alt="plane-icon" />
                <div className={s.widget__data}>
                    <h3 className={s.widget__data__value}>{`Type: ${aircraft?.type}`}</h3>
                    <h3 className={s.widget__data__value}>{`MSN: ${aircraft?.msn}`}</h3>
                    <div className={s.widget__data__engines}>
                        <div className={s.engine}>
                            <img src={engine} alt="engine-icon" />
                            <span>{`#1: ${cutData(aircraft?.engines[0].msn)}`}</span>
                        </div>
                        <div className={s.engine}>
                            <img src={engine} alt="engine-icon" />
                            <span>{`#2: ${cutData(aircraft?.engines[1].msn)}`}</span>
                        </div>
                        <div className={s.engine}>
                            <img src={engine} alt="engine-icon" />
                            <span>{`#3: ${cutData(aircraft?.engines[2].msn)}`}</span>
                        </div>
                        <div className={s.engine}>
                            <img src={engine} alt="engine-icon" />
                            <span>{`#4: ${cutData(aircraft?.engines[3].msn)}`}</span>
                        </div>
                        <div className={s.engine}>
                            <img src={apu} alt="engine-icon" />
                            <span>{`APU: ${cutData(aircraft?.apu)}`}</span>
                        </div>
                    </div >
                </div>
            </div>
        </>
    )
}

export default AircraftWidget;