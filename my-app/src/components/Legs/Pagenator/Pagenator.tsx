import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Button from '../../../common/buttons/Button';
import s from './Pagenator.module.scss';

type IPagenatorProps = {
    totalPages: number;
    currentPage: number;
    changePage: (page: number) => void;
}

const Pagenator = ({ totalPages, currentPage, changePage }: IPagenatorProps) => {
    const pagesArr = [];
    for (let i = 1; i <= totalPages; i++) {
        pagesArr.push(i)
    }

    const pageHandler = (page: number) => {
        if (currentPage !== page) changePage(page);
    }

    const prevPageHandler = () => {
        if (currentPage > 1) changePage(currentPage - 1)
    }
    const nextPageHandler = () => {
        if (currentPage < totalPages) changePage(currentPage + 1)
    }

    const pages = pagesArr.map((item) => {
        if (item === currentPage)
            return <div className={classNames(s.page, s.active)}>{` ${item} `}</div>
        if (item === 1)
            return <div className={s.page} onClick={() => pageHandler(item)}>{` ${item} `}</div>
        if (item === totalPages)
            return <div className={s.page} onClick={() => pageHandler(item)}>{` ${item} `}</div>
        if ((item < currentPage && item >= currentPage - 2) || (item > currentPage && item <= currentPage + 2))
            return <div className={s.page} onClick={() => pageHandler(item)}>{` ${item} `}</div>
        if (item === currentPage - 4 || item === currentPage + 4)
            return <div className={s.page__dot}> . . . </div>
    })
  
    return (
        <div className={s.pagenator}>
            <Button state={currentPage} handler={prevPageHandler} text='Prev' color='white' btnType='button' />
            <div className={s.pagenator__pages}>
                {pages}
            </div>
            <Button state={currentPage} handler={nextPageHandler} text='Next' color='white' btnType='button' />
        </div>
    )
}

export default Pagenator;

