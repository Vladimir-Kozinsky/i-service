import s from './ApuWidget.module.scss';
import apuImg from './../../../assets/img/png/apu.png';
import { IApu } from '../../../types/types';
import React, { useState } from 'react';
import ApuFile from '../ApuFile/ApuFile';

type EngineWidgetProps = {
    apu: IApu
}

const ApuWidget: React.FC<EngineWidgetProps> = ({ apu }) => {
    const [apuFile, setApuFile] = useState<boolean>(false);
    const updateForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        console.log("update form")
    }

    return (
        <>
            <ApuFile apu={apu} setApuFile={setApuFile} toggle={apuFile} />
            <div className={s.apuWidget} onClick={() => setApuFile(true)}>
                <button className={s.widget__btns__set} onClick={updateForm} />
                <h3 className={s.apuWidget__header} >MSN: {apu.msn}</h3>
                <div className={s.apuWidget__data} >
                    <div className={s.apuWidget__data__block}>
                        <span>Type:</span>
                        <span>{apu.type}</span>
                    </div>
                    <div className={s.apuWidget__data__block}>
                        <span> TSN:</span>
                        <span>{apu.tsn}</span>
                    </div>
                    <div className={s.apuWidget__data__block}>
                        <span>CSN:</span>
                        <span>{apu.csn}</span>
                    </div>
                </div>
                <div></div>
                <img className={s.apuWidget__img} src={apuImg} alt="icon" />
            </div>
        </>
    )
}

export default ApuWidget;