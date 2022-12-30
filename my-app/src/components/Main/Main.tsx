import React from 'react'
import HeaderMain from './HeaderMain/HeaderMain';
import s from './Main.module.scss'
import Slider from './Slider/Slider';

const Main: React.FC = () => {
    return (
        <div className={s.main} >
            <HeaderMain />
            <main className={s.main__content}>
                <div className={s.content__container} >
                    <div className={s.news__wrap}>
                        <div className={s.news} >
                            News
                        </div>
                        <Slider />
                    </div>
                </div>
            </main>
            Main Page
        </div>
    )
}

export default Main;