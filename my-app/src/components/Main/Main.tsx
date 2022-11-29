import React from 'react'
import HeaderMain from './HeaderMain/HeaderMain';
import s from './Main.module.scss'
import Slider from './Slider/Slider';

const Main: React.FC = () => {
    return (
        <div className={s.main} >
            <HeaderMain />
            <Slider />
            Main Page
        </div>
    )
}

export default Main;