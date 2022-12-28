import React from 'react'
import { NavLink } from 'react-router-dom';
import HeaderMain from './HeaderMain/HeaderMain';
import s from './Main.module.scss'
import Slider from './Slider/Slider';

const Main: React.FC = () => {
    return (
        <div className={s.main} >
            <HeaderMain />
            <Slider />
            <NavLink to={'/auth'}>To auth</NavLink>
        </div>
    )
}

export default Main;