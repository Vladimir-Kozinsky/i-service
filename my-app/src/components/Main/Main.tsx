import React, { Suspense, useEffect, useState } from 'react'
import HeaderMain from './HeaderMain/HeaderMain';
import s from './Main.module.scss'
import Slider from './Slider/Slider';
import plane_sheme4 from '../../assets/img/png/plane_il.png'
import Feedback from './Feedback/Feedback';
import plane_demen from './../../assets/img/jpeg/cargo.jpg'
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { abort } from 'process';

const Main: React.FC = () => {
    const [active, setActive] = useState('');
    const [isAbout, setIsAbout] = useState<boolean>(false);
    const { t, i18n } = useTranslation();
    useEffect(() => {
        setActive('active')
    }, [])
    return (
        <Suspense fallback="loading">
            <div className={s.main} >
                <HeaderMain />
                <main className={s.main__content}>
                    <div className={s.main__content__back}></div>
                    <div className={s.main__content__back2}></div>
                    <div className={s.content__container}>
                        <section className={classNames(s.about__wrap, isAbout && s['active']) }>
                            <div className={classNames(s.moove__block, s[active])}>
                                <div className={s.about} >
                                    <h3 className={classNames(s.about__title, isAbout && s[active])}>{t("about_title")}</h3>
                                    <p className={s.about__par}>
                                        {t("about_par1")}
                                    </p>
                                    {isAbout && <>
                                        <p className={s.about__par}>
                                            {t("about_par2")}
                                        </p>
                                        <p className={s.about__par}>
                                            {t("about_par3")}
                                        </p>
                                        <p className={classNames(s.about__par, s.about__par__last)}>
                                            {t("about_par4")}
                                        </p>
                                        <div className={s.hide__btn__wrap}>
                                            <button className={s.hide__btn} onClick={() => setIsAbout(false)}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.88128 7.38129L3.76256 12.5L8.88128 17.6187L10.1187 16.3813L7.11244 13.375H20V11.625H7.11244L10.1187 8.61872L8.88128 7.38129Z" fill="white" />
                                                </svg>
                                            </button>
                                        </div>
                                    </>}
                                    {!isAbout && <div className={s.about__btn} onClick={() => setIsAbout(true)} >
                                        <span className={s.about__btn__link}>{t("about_btn")}</span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.88128 7.38129L3.76256 12.5L8.88128 17.6187L10.1187 16.3813L7.11244 13.375H20V11.625H7.11244L10.1187 8.61872L8.88128 7.38129Z" fill="white" />
                                        </svg>
                                    </div>}
                                </div>
                                <Slider />
                            </div>

                        </section>
                        <section id='fleet' className={s.fleet__wrap}>
                            <h3 className={s.section__title} >{t("fleet_title")}</h3>
                            <div className={s.fleet} >
                                <div className={s.fleet__item} >
                                    <h4 className={s.fleet_title}>{t("plane_mogel1")}</h4>
                                    <div className={s.fleet__img} >
                                        <img src={plane_sheme4} alt="" />
                                    </div>
                                    <div className={s.fleet__item__info} >
                                        <div className={s.params}>
                                            <div className={s.params__disc}>
                                                <span>{t("MTW")}</span>
                                                <span>{t("max_payload")}</span>
                                                <span>{t("max_volume")}</span>
                                            </div>
                                            <div className={s.params__value} >
                                                <span>175 000</span>
                                                <span>43 400</span>
                                                <span>180</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.fleet__item} >
                                    <h4 className={s.fleet_title}>{t("plane_model2")}</h4>
                                    <div className={s.fleet__img} >
                                        <img src={plane_sheme4} alt="" />
                                    </div>
                                    <div className={s.fleet__item__info} >
                                        <div className={s.params}>
                                            <div className={s.params__disc}>
                                                <span>{t("MTW")}</span>
                                                <span>{t("max_payload")}</span>
                                                <span>{t("max_volume")}</span>
                                            </div>
                                            <div className={s.params__value} >
                                                <span>190 000</span>
                                                <span>50 000</span>
                                                <span>180</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img className={s.fleet__dimensions__img} src={plane_demen} alt="" />
                            </div>

                        </section>
                        <section className={s.contacts__wrap} id="contacts">
                            <h3 className={s.section__title} >{t("contacts_title")}</h3>
                            <div className={s.contacts} >
                                <div className={s.contacts__address}>
                                    <h4 className={s.contacts__address__title}>{t("company_name")}</h4>
                                    <span className={s.contacts__address__text} >{t("addres1")}</span><br />
                                    <span className={s.contacts__address__text} >{t("addres2")}</span><br />
                                    <span className={s.contacts__address__text} >{t("addres3")}</span>
                                    <iframe className={s.contacts__address__map}
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.7158185199273!2d74.60902077150811!3d42.85773337372006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb633eb4a865f%3A0xda48af2b2a2e4b59!2sVefa%20Center!5e0!3m2!1sen!2sae!4v1672640878930!5m2!1sen!2sae"
                                        width="550" height="350" loading="lazy" >
                                    </iframe>
                                </div>
                                <div className={s.contacts__feedBack}>
                                    <Feedback />
                                </div>
                            </div>
                        </section>
                    </div>
                </main >
                <footer className={s.footer}>
                    <div className={s.footer__container} >
                        <span>© New Way Cargo Airlines 2022 - 2023. All rights reserved</span>
                        <div className={s.links}>
                            <a href='https://www.facebook.com' className={s.links__item}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.6693 7.50005H11.6668V5.83339C11.6668 4.97339 11.7368 4.43172 12.9693 4.43172H13.6927C14.1527 4.43172 14.526 4.05838 14.526 3.59838V2.55338C14.526 2.11755 14.1918 1.74505 13.7568 1.71588C13.2535 1.68172 12.7493 1.66588 12.2443 1.66672C9.9835 1.66672 8.3335 3.04755 8.3335 5.58255V7.50005H6.66683C6.20683 7.50005 5.8335 7.87339 5.8335 8.33339V10.0001C5.8335 10.4601 6.20683 10.8334 6.66683 10.8334L8.3335 10.8326V17.5001C8.3335 17.9601 8.70683 18.3334 9.16683 18.3334H10.8335C11.2935 18.3334 11.6668 17.9601 11.6668 17.5001V10.8309L13.4785 10.8301C13.9018 10.8301 14.2577 10.5126 14.306 10.0917L14.4968 8.42839C14.5543 7.93422 14.1677 7.50005 13.6693 7.50005Z" fill="#F9F9F9" />
                                </svg>
                            </a>
                            <a href='https://www.linkedin.com/' className={s.links__item}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.13857 1C1.84567 1 1 1.82379 1 2.90709C1 3.96679 1.8212 4.81558 3.08841 4.81558H3.11366C4.4316 4.81558 5.25125 3.96695 5.25125 2.90709C5.22641 1.82379 4.4316 1 3.13857 1ZM18.6272 11.0317V17.3622H14.8491V11.4557C14.8491 9.97195 14.3027 8.95934 12.9351 8.95934C11.8912 8.95934 11.2699 9.64176 10.9966 10.3019C10.8969 10.5379 10.8713 10.8664 10.8713 11.1967V17.3622H7.09195C7.09195 17.3622 7.14285 7.35855 7.09195 6.3221H10.8709V7.88698C10.8673 7.89251 10.8632 7.89824 10.8591 7.90394L10.859 7.90398C10.8545 7.91034 10.8499 7.91667 10.8461 7.92265H10.8709V7.88698C11.373 7.13581 12.2696 6.06274 14.2766 6.06274C16.7631 6.0627 18.6272 7.64064 18.6272 11.0317ZM5.00622 17.3628H1.22831V6.32276H5.00622V17.3628Z" fill="#fff" />
                                </svg>
                            </a>
                            <a href='https://www.instagram.com/' className={s.links__item}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.66667 2.5C4.36583 2.5 2.5 4.36583 2.5 6.66667V13.3333C2.5 15.6342 4.36583 17.5 6.66667 17.5H13.3333C15.6342 17.5 17.5 15.6342 17.5 13.3333V6.66667C17.5 4.36583 15.6342 2.5 13.3333 2.5H6.66667ZM15 4.16667C15.46 4.16667 15.8333 4.54 15.8333 5C15.8333 5.46 15.46 5.83333 15 5.83333C14.54 5.83333 14.1667 5.46 14.1667 5C14.1667 4.54 14.54 4.16667 15 4.16667ZM10 5.83333C12.3008 5.83333 14.1667 7.69917 14.1667 10C14.1667 12.3008 12.3008 14.1667 10 14.1667C7.69917 14.1667 5.83333 12.3008 5.83333 10C5.83333 7.69917 7.69917 5.83333 10 5.83333ZM10 7.5C9.33696 7.5 8.70107 7.76339 8.23223 8.23223C7.76339 8.70107 7.5 9.33696 7.5 10C7.5 10.663 7.76339 11.2989 8.23223 11.7678C8.70107 12.2366 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.2366 11.7678 11.7678C12.2366 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.2366 8.70107 11.7678 8.23223C11.2989 7.76339 10.663 7.5 10 7.5Z" fill="#F9F9F9" />
                                </svg>
                            </a>
                            <a href='https://twitter.com/' className={s.links__item}>
                                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20 2.42375C19.2563 2.75 18.4637 2.96625 17.6375 3.07125C18.4875 2.56375 19.1363 1.76625 19.4412 0.805C18.6488 1.2775 17.7738 1.61125 16.8412 1.7975C16.0887 0.99625 15.0162 0.5 13.8462 0.5C11.5763 0.5 9.74875 2.3425 9.74875 4.60125C9.74875 4.92625 9.77625 5.23875 9.84375 5.53625C6.435 5.37 3.41875 3.73625 1.3925 1.2475C1.03875 1.86125 0.83125 2.56375 0.83125 3.32C0.83125 4.74 1.5625 5.99875 2.6525 6.7275C1.99375 6.715 1.3475 6.52375 0.8 6.2225C0.8 6.235 0.8 6.25125 0.8 6.2675C0.8 8.26 2.22125 9.915 4.085 10.2962C3.75125 10.3875 3.3875 10.4313 3.01 10.4313C2.7475 10.4313 2.4825 10.4163 2.23375 10.3612C2.765 11.985 4.2725 13.1788 6.065 13.2175C4.67 14.3088 2.89875 14.9662 0.98125 14.9662C0.645 14.9662 0.3225 14.9513 0 14.91C1.81625 16.0813 3.96875 16.75 6.29 16.75C13.835 16.75 17.96 10.5 17.96 5.0825C17.96 4.90125 17.9538 4.72625 17.945 4.5525C18.7588 3.975 19.4425 3.25375 20 2.42375Z" fill="#F9F9F9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </footer>
            </div >
        </Suspense>
    )
}

export default Main;