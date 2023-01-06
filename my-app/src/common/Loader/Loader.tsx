import classNames from 'classnames';
import React from 'react';
import s from './Loader.module.scss';

type LoaderPropsType = {
    state: string;
}

const Loader: React.FC<LoaderPropsType> = ({ state }) => {
    return (
        <div className={classNames(s.loader__container, s[state])}>
            <div className={s.ring}></div>
            <span className={s.ring__text}>loading...</span>
        </div>
    )
}

export default Loader;