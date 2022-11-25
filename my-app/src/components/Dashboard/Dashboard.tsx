import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import s from "./Dashboard.module.scss"
import planeImg from "../../assets/img/png/plane-icon.png"
import engineImg from "../../assets/img/png/engine-icon.png"
import apuImg from "../../assets/img/png/apu.png"
import classNames from "classnames";
import Aircrafts from "../Aircrafts/Aircrafts";
import Engines from "../Engines/Engines";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setUser } from "../../store/reducers/authReducer";
import Apus from "../Apus/Apus";
import Loader from "../../common/Loader/Loader";
import { Transition } from 'react-transition-group';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(setUser())
    }, []);
    return (
        <div className={s.dashboard} >
            <div className={s.dashboard__container}>
                <Header />
                <Routes>
                    <Route path='/aircrafts' element={<Aircrafts />} />
                    <Route path='/engines' element={<Engines />} />
                    <Route path='/apus' element={<Apus />} />
                    <Route path='/' element={<div className={s.dashboard__widgets} >
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
                    } />
                </Routes>
            </div>

        </div>
    )
}

export default Dashboard;