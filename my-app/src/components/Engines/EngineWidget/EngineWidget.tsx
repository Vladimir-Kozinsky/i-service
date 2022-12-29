import s from './EngineWidget.module.scss';
import engineImg from './../../../assets/img/png/engine-widget-icon.png';
import { IEngine } from '../../../types/types';
import React, { useState } from 'react';
import EngineFile from '../EngineFile/EngineFile';

type EngineWidgetProps = {
    engine: IEngine
}

const EngineWidget: React.FC<EngineWidgetProps> = ({ engine }) => {
    const [engineFile, setEngineFile] = useState<boolean>(false);
    const updateForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        console.log("update form")
    }

    return (
        <>
            <EngineFile engine={engine} setEngineFile={setEngineFile} toggle={engineFile} />
            <div className={s.engineWidget} onClick={() => setEngineFile(true)}>
                <img className={s.engineWidget__img} src={engineImg} alt="icon" />
                <button className={s.widget__btns__set} onClick={updateForm} />
                <h3 className={s.engineWidget__header} >MSN: {engine.msn}</h3>
                <div className={s.engineWidget__data} >
                    <div className={s.engineWidget__data__block}>
                        <span>Type:</span>
                        <span>{engine.type}</span>
                    </div>
                    <div className={s.engineWidget__data__block}>
                        <span> TSN:</span>
                        <span>{engine.tsn}</span>
                    </div>
                    <div className={s.engineWidget__data__block}>
                        <span>CSN:</span>
                        <span>{engine.csn}</span>
                    </div>
                </div>
            </div>
        </>

    )
}

export default EngineWidget;