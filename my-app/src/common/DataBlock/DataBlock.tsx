import classNames from 'classnames';
import s from './DataBlock.module.scss';

type DataBlockProps = {
    title: string;
    value: string | number | null | undefined;
}

const DataBlock: React.FC<DataBlockProps> = ({ title, value }) => {
    return (
        <div className={s.dataBlock}>
            <div className={s.dataBlock__title}>
                <span className={classNames(s.dataBlock__span, s.dataBlock__span__title)}>{title}:</span>
            </div>
            <div className={s.dataBlock__value}>
                <span className={classNames(s.dataBlock__span, s.dataBlock__span__value)}>{value}</span>
            </div>
        </div>
    )
}

export default DataBlock; 