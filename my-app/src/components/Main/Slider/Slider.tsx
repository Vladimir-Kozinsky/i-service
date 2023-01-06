import s from './Slider.module.scss'
import slider5 from '../../../assets/img/jpeg/slider-img5.jpeg'
import slider2 from '../../../assets/img/jpeg/slider-img2.jpeg'
import slider3 from '../../../assets/img/jpeg/slider-img3.jpeg'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

const slides = [
    slider5,
    slider2,
    slider5,
    slider3
]


const Slider = () => {
    const SLIDE_SIZE = 770;
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
                <div className={s.carousel__btns}>
                   <button className={s.carousel__btn__left} onClick={prevSlide} >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.88128 7.38129L3.76256 12.5L8.88128 17.6187L10.1187 16.3813L7.11244 13.375H20V11.625H7.11244L10.1187 8.61872L8.88128 7.38129Z" fill="white" />
                    </svg>
                </button>
                <button className={s.carousel__btn__right} onClick={nextSlide} >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.88128 7.38129L3.76256 12.5L8.88128 17.6187L10.1187 16.3813L7.11244 13.375H20V11.625H7.11244L10.1187 8.61872L8.88128 7.38129Z" fill="white" />
                    </svg>
                </button> 
                </div>
                
                <div className={s.carousel__container} >
                    {slides.map((item: string, index: number) => <div key={index} className={s.carousel__container__item}
                        style={{ transform: `translateX(${-SLIDE_SIZE * currentSlide}px)` }}>
                        <img src={item} alt="" />
                    </div>)}
                </div>

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