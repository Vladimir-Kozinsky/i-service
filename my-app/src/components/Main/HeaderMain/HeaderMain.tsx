import s from './HeaderMain.module.scss'
import React from 'react'
import logo from './../../../assets/img/png/logo_short.png'
import { Link } from 'react-scroll'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

const HeaderMain: React.FC = () => {
    return (
        <div className={s.headerMain}>
            <div className={s.header__container} >
                <div className={s.logo} >
                    <div className={s.headerMain__logo}>
                        <img src={logo} alt="logo" className={s.headerMain__logo__img} />
                    </div>
                    <h3 className={s.logo__title}>New Way Cargo Airlines LLC</h3>
                </div>
                <div className={s.nav__wrapper} >
                    <nav className={s.headerMain__nav}>
                        <ul>
                            <li><a className={s.headerMain__nav__link} href="#about">О компании</a></li>
                            <li><a className={s.headerMain__nav__link} href="#fleet">Наш флот</a></li>
                            <li><a className={s.headerMain__nav__link} href="#contacts">Контакты</a></li>
                            <li><NavLink className={s.headerMain__nav__link} to="/auth">Войти</NavLink></li>
                        </ul>
                    </nav>
                    <div className={s.headerMain__lang} >
                        <button className={classNames(s.headerMain__lang__btn, s.active)} >RU</button>
                        <button className={classNames(s.headerMain__lang__btn)} >EN</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HeaderMain