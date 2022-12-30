import s from './HeaderMain.module.scss'
import React from 'react'
import logo from './../../../assets/img/png/airline-logo.png'
import { Link } from 'react-router-dom'

const HeaderMain: React.FC = () => {
    return (
        <div className={s.headerMain}>
            <div className={s.header__container} >
                <div className={s.logo} >
                    <div className={s.headerMain__logo}>
                        <img src={logo} alt="logo" className={s.headerMain__logo__img} />
                    </div>
                    <h3 className={s.logo__title}>New Way Cargo <br />Airlines LLC</h3>
                </div>

                <div className={s.nav__wrapper} >
                    <nav className={s.headerMain__nav}>
                        <ul>
                            <li><Link className={s.headerMain__nav__link} to="/about">О компании</Link></li>
                            <li><Link className={s.headerMain__nav__link} to="/fleet">Наш флот</Link></li>
                            <li><Link className={s.headerMain__nav__link} to="/contacts">Контакты</Link></li>
                        </ul>
                    </nav>
                    <div className={s.headerMain__lang} >
                        <button>RU</button>
                        <button>EN</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default HeaderMain