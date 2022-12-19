import s from './Slider.module.scss'
import slider1 from '../../../assets/img/jpeg/slider-img1.jpeg'
import slider2 from '../../../assets/img/jpeg/slider-img2.jpeg'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

const slides = [
    slider1,
    slider2,
    slider1,
    slider2
]


const Slider = () => {
    const SLIDE_SIZE = 1200;
    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = () => {
        setCurrentSlide((current: number) => {
            return current === slides.length - 1 ? 0 : current + 1
        })
    }
    const prevSlide = () => {
        setCurrentSlide((current: number) => {
            return current === 0 ? slides.length - 1 : current - 1
        })
    }
 
    return (
        <div className={s.slider} >
            <div className={s.carousel} >
                <button className={s.carousel__btn__left} onClick={prevSlide} >Prev</button>
                <div className={s.carousel__container} >
                    {slides.map((item: string, index: number) => <div key={index} className={s.carousel__container__item}
                        style={{ transform: `translateX(${-SLIDE_SIZE * currentSlide}px)` }}>
                        <img src={item} alt="" />
                    </div>)}
                </div>
                <button className={s.carousel__btn__right} onClick={nextSlide} >Next</button>
                <div className={s.carousel__dotes} >
                    {slides.map((item: string, index: number) =>
                        <button
                            className={classNames(s.carousel__dotes__item, index === currentSlide ? s.active : null)}
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                        ></button>)}
                </div>
            </div>
        </div>
    )
}

export default Slider