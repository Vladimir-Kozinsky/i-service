import classNames from 'classnames';
import { useState } from 'react';
import Button from '../../../common/buttons/Button';
import s from './Pagenator.module.scss';

const Pagenator = () => {
    const totalPages = 15;
    const pagesArr = [];
    for (let i = 1; i <= totalPages; i++) {
        pagesArr.push(i)
    }

    const pageHandler = () => {

    }
    
    const prevPageHandler = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }
    const nextPageHandler = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const [currentPage, setCurrentPage] = useState(1);

    const pages = pagesArr.map((item) => {
        if (item === currentPage)
            return <div className={classNames(s.page, s.active)}>{` ${item} `}</div>
        if (item === 1)
            return <div className={s.page}>{` ${item} `}</div>
        if (item === totalPages)
            return <div className={s.page}>{` ${item} `}</div>
        if ((item < currentPage && item >= currentPage - 2) || (item > currentPage && item <= currentPage + 2))
            return <div className={s.page}>{` ${item} `}</div>
        if (item === currentPage - 4 || item === currentPage + 4)
            return <div className={s.page__dot}> . . . </div>
    })
    return (
        <div className={s.pagenator}>
            <Button state={currentPage} handler={prevPageHandler} text='Prev' color='green' btnType='button' />
            <div className={s.pagenator__pages}>
                {pages}
            </div>
            <Button state={currentPage} handler={nextPageHandler} text='Next' color='green' btnType='button' />
        </div>
    )
}

export default Pagenator;

