import s from './EngineWidget.module.scss';
import engineImg from './../../../assets/img/png/engine-widget-icon.png';

const EngineWidget: React.FC<any> = ({ engine }) => {
    return (
        <div className={s.engineWidget}>
            <h3 className={s.engineWidget__header} >MSN: 25089</h3>
            <div></div>
            <img className={s.engineWidget__img} src={engineImg} alt="icon" />
        </div>
    )
}

export default EngineWidget;