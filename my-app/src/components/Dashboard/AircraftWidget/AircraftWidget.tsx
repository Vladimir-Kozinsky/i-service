import s from './AircraftWidget.module.scss';
import plane from './../../../assets/img/png/plane.png'
import cross from './../../../assets/img/png/cross.png'
import engine from './../../../assets/img/png/engine.png'
import apu from './../../../assets/img/png/apu.png'
import { IAircraft } from '../../../store/reducers/aircraftReducer';
import setting_icon from './../../../assets/img/png/setting_icon.png'
import { useNavigate } from 'react-router-dom';

type propsAircraftWidget = {
    handler?: () => void;
    type?: "new";
    aircraft?: IAircraft;
}

const AircraftWidget = ({ handler, type, aircraft }: propsAircraftWidget) => {
    const navigate = useNavigate();
    const cutData = (str: string | undefined) => {
        if (!str) return 'N/A'
        if (str.length <= 5) return str;
        const cutStr = str.slice(str.length - 3, str.length)
        return `...${cutStr}`;
    }

    return (
        <div className={s.widget} onClick={handler} >
            {!type ? <div className={s.widget__btns} >
                <button className={s.widget__btns__set} onClick={() => navigate("/aircraft/setting")} ><img src={setting_icon} alt="setting-icon" /></button>
            </div> : null}
            {!type ? <img className={s.widget__plane__img} src={plane} alt="plane-icon" /> : <img className={s.widget__cross__img} src={cross} alt="plane-icon" />}
            {!type
                ? <div className={s.widget__data}>
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
                : null}
        </div>
    )
}

export default AircraftWidget;