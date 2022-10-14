import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import s from "./Dashboard.module.scss"
import planeImg from "../../assets/img/png/plane-icon.png"
import engineImg from "../../assets/img/png/engine-icon.png"
import classNames from "classnames";

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className={s.dashboard} >
            <div className={s.background__circle}></div>
            <div className={s.dashboard__container}>
                <Header />
                <div className={s.main}>
                    <div className={s.main__widgets} >
                        <div className={s.dashboard__widget} onClick={() => navigate('/aircrafts')} >
                            <h3 className={s.dashboard__widget__header}>Aircrafts</h3>
                            <img className={s.dashboard__widget__img} src={planeImg} alt="icon" />
                        </div>
                    </div>
                    <div className={s.main__widgets} >
                        <div className={s.dashboard__widget} onClick={() => navigate('/engines')} >
                            <h3 className={s.dashboard__widget__header}>Engines</h3>
                            <img className={classNames(s.dashboard__widget__img, s.dashboard__widget__engine)} src={engineImg} alt="icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;