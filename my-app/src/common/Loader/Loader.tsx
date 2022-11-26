import classNames from 'classnames';
import React, { useState } from 'react';
import s from './Loader.module.scss';

type LoaderPropsType = {
    state: string;
}

const Loader: React.FC<LoaderPropsType> = ({ state }) => {
    return (
        <div className={classNames(s.loader, s[state])} >
        </div>
    )
}

export default Loader;