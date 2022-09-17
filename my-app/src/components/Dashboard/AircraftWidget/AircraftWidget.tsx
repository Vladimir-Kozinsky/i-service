import s from './AircraftWidget.module.scss';
import plane from './../../../assets/img/png/plane.png'
import cross from './../../../assets/img/png/cross.png'

type propsAircraftWidget = {
    handler?: () => void;
    type?: "new";
}

const AircraftWidget = ({ handler, type }: propsAircraftWidget) => {
    return (
        <div className={s.widget} onClick={handler} >
            {!type ? <img className={s.widget__plane__img} src={plane} alt="plane-icon" /> : <img className={s.widget__cross__img} src={cross} alt="plane-icon" />}
            {!type
                ? <div className={s.widget__data}>
                    <h3 className={s.widget__data__value}>{"Type: IL-76"}</h3>
                    <h3 className={s.widget__data__value}>{"MSN: 25096"}</h3>
                    <h3 className={s.widget__data__value}>{"FH: 25096"}</h3>
                    <h3 className={s.widget__data__value}>{"FC: 25096"}</h3>
                </div>
                : null}
        </div>
    )
}

export default AircraftWidget;