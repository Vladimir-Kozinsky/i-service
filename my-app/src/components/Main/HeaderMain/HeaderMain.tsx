import s from './HeaderMain.module.scss'
import React, { useContext, useState } from 'react'
import logo from './../../../assets/img/png/logo_short.png'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { ThemeContext } from '../Main'
import Switch from "react-switch"

const HeaderMain: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [isMenu, setIsMenu] = useState(false)
    const appContext = useContext(ThemeContext);

    const [checked, setChecked] = useState(false);
    const handleChange = (nextChecked: boolean) => {
        setChecked(nextChecked);
        appContext?.toggleTheme()
    };

    const changeLang = (lang: string) => {
        i18n.changeLanguage(lang)
    }
    return (
        <div className={s.headerMain} id={s[`${appContext?.theme}__header`]}>
            <div className={s.header__container} >
                <div className={s.logo} >
                    <div className={s.headerMain__logo}>
                        <img src={logo} alt="logo" className={s.headerMain__logo__img} />
                    </div>
                    <h3 className={s.logo__title}>{t("company_name")}</h3>
                </div>
                <div className={s.nav__wrapper} >
                    <nav className={classNames(s.headerMain__nav, isMenu && s.active)}>
                        <ul>
                            <li><a className={s.headerMain__nav__link} href="#about">{t('about_link')}</a></li>
                            <li><a className={s.headerMain__nav__link} href="#fleet">{t('fleet_link')}</a></li>
                            <li><a className={s.headerMain__nav__link} href="#contacts">{t('contacts_link')}</a></li>
                            <li><NavLink className={s.headerMain__nav__link} to="/auth">{t('login_link')}</NavLink></li>
                        </ul>
                    </nav>
                    <div className={classNames(s.burger__icon, isMenu && s.active)} onClick={isMenu ? () => setIsMenu(false) : () => setIsMenu(true)} >
                        <span className={classNames(s.burger__icon__line, s.first)} ></span>
                        <span className={classNames(s.burger__icon__line, s.second)} ></span>
                        <span className={classNames(s.burger__icon__line, s.third)} ></span>
                    </div>
                    <div className={s.headerMain__lang} >
                        <button className={classNames(s.headerMain__lang__btn, i18n.language === "ru" && s.active)} onClick={() => changeLang("ru")} >RU</button>
                        <button className={classNames(s.headerMain__lang__btn, i18n.language === "en" && s.active)} onClick={() => changeLang("en")} >EN</button>
                    </div>
                    <div className={s.headerMain__switch}>
                        <Switch
                            onChange={handleChange}
                            checked={checked}
                            height={20}
                            width={42}
                            handleDiameter={23}
                            offHandleColor={'#008800'}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HeaderMain