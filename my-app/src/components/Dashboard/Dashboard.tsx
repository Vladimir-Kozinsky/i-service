import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import s from "./Dashboard.module.scss"
import planeImg from "../../assets/img/png/plane-icon.png"
import engineImg from "../../assets/img/png/engine-icon.png"
import apuImg from "../../assets/img/png/apu.png"
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setUser } from "../../store/reducers/authReducer";
import Loader from "../../common/Loader/Loader";
import { Transition } from 'react-transition-group';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoader, setIsLoader] = useState(false);
    useEffect(() => {
        (async () => {
            await setIsLoader(true)
            await dispatch(setUser())
            await setIsLoader(false)
        })()
    }, []);
    return (
        <div className={s.dashboard} >
            <div className={s.dashboard__container}>
                <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                    {(state) => <Loader state={state} />}
                </Transition>
                <Header />
                <div className={s.dashboard__widgets} >
                    <div className={s.dashboard__widget} onClick={() => navigate('/dashboard/aircrafts')} >
                        <h3 className={s.dashboard__widget__header}>Aircrafts</h3>
                        <img className={s.dashboard__widget__img} src={planeImg} alt="icon" />
                    </div>
                    <div className={s.dashboard__widget} onClick={() => navigate('/dashboard/engines')} >
                        <h3 className={s.dashboard__widget__header}>Engines</h3>
                        <img className={classNames(s.dashboard__widget__img, s.dashboard__widget__engine)} src={engineImg} alt="icon" />
                    </div>
                    <div className={s.dashboard__widget} onClick={() => navigate('/dashboard/apus')} >
                        <h3 className={s.dashboard__widget__header}>APUs</h3>
                        <img className={classNames(s.dashboard__widget__img, s.dashboard__widget__engine)} src={apuImg} alt="icon" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;