import { Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { compose } from 'redux';
import aircraftAPI from '../../../API/aircraftAPI';
import Button from '../../../common/buttons/Button';
import Input from '../../../common/Input';
import { IAircraft } from '../../../store/reducers/aircraftReducer';
import { withContainerBlur } from '../../HOC/withContainerBlur/withContainerBlur';
import s from "./../Print/Print.module.scss";

interface IFilterValues {
    from: string;
    to: string;
}

type PrintProps = {
    setPrint: (print: boolean) => void;
    aircraft: IAircraft;
}

interface ILeg {
    _id: string;
    depDate: string;
    flightNumber: string;
    from: string;
    to: string;
    blockOff: string;
    takeOff: string;
    landing: string;
    blockOn: string;
    flightTime: string;
    blockTime: string;
    fh: string;
    fc: string;
}

const Print = ({ aircraft, setPrint }: PrintProps) => {
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [legs, setLegs] = useState([]);
    return (
        <div className={s.print} >
            <Formik
                initialValues={{
                    from: '',
                    to: ''
                }}
                onSubmit={async (
                    values: IFilterValues,
                    { setSubmitting }: FormikHelpers<IFilterValues>
                ) => {
                    try {
                        const response = await aircraftAPI.getPrintLegs(aircraft.msn, values.from, values.to);
                        setLegs(response.data);
                    } catch (error) {
                        console.log(error);
                    }


                }}
            >
                <Form className={s.legs__filter}>
                    <div className={s.value__wrap}>
                        <label>From</label>
                        <Input type='date' id='from' name='from' placeholder='' />
                    </div>
                    <div className={s.value__wrap}>
                        <label>To</label>
                        <Input type='date' id='to' name='to' placeholder='' />
                    </div>
                    <Button text="Search" color="white" btnType="submit" />
                </Form>
            </Formik>
            <h3 className={s.print__header} >Print preview</h3>
            <ComponentToPrint legs={legs} aircraft={aircraft} ref={componentRef} />
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => setPrint(false)} />
                <Button text="Print" btnType="button" color="green" handler={handlePrint} />
            </div>
        </div>
    )
}

type ComponentToPrintProps = {
    legs: ILeg[];
    aircraft: IAircraft;
}

const ComponentToPrint = React.forwardRef(({ legs, aircraft }: ComponentToPrintProps, ref: any) => {
    const reduceLegs = (legs: ILeg[]) => {
        const resArr = [];
        let tempArr = [];
        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            tempArr.push(leg);
            if (tempArr.length === 15) {
                resArr.push(tempArr);
                tempArr = [];
            }
            if (i === legs.length - 1) {
                resArr.push(tempArr);
            }
        }
        return resArr;
    }

    let [pages, setPages] = useState<any | null>(null)



    useEffect(() => {
        const pages = reduceLegs(legs);
        const pagesToPrint = pages.map((page, index) => {
            const legsComp = page.map((leg: ILeg) => {
                return (
                    <div key={leg._id} className={s.leg}>
                        <div className={s.leg__title__value}>{leg.depDate}</div>
                        <div className={s.leg__title__value}>{leg.flightNumber}</div>
                        <div className={s.leg__title__value}>{leg.from}</div>
                        <div className={s.leg__title__value}>{leg.to}</div>
                        <div className={s.leg__title__value}>{leg.blockOff}</div>
                        <div className={s.leg__title__value}>{leg.takeOff}</div>
                        <div className={s.leg__title__value}>{leg.landing}</div>
                        <div className={s.leg__title__value}>{leg.blockOn}</div>
                        <div className={s.leg__title__value}>{leg.flightTime}</div>
                        <div className={s.leg__title__value}>{leg.blockTime}</div>
                        <div className={s.leg__title__value}>{leg.fh}</div>
                        <div className={s.leg__title__value}>{leg.fc}</div>
                    </div>
                )
            })

            return (
                <>
                    < div className={s.page} >
                        <div className={s.aircraftInfo}>
                            <div className={s.aircraftInfo__wrap} >
                                <div className={s.aircraftInfo__block} >
                                    <span className={s.aircraftInfo__block__title}>Type:</span>
                                    <span className={s.aircraftInfo__block__value}>{aircraft.type}</span>
                                </div>

                                <div className={s.aircraftInfo__block}>
                                    <span className={s.aircraftInfo__block__title}>Reg:</span>
                                    <span className={s.aircraftInfo__block__value}>{aircraft.regNum}</span>
                                </div>
                            </div>
                            <div className={s.aircraftInfo__wrap} >
                                <div className={s.aircraftInfo__block}>
                                    <span className={s.aircraftInfo__block__title}>MSN:</span>
                                    <span className={s.aircraftInfo__block__value}>{aircraft.msn}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={s.leg__title}>
                                <div className={s.leg__title__value}>Date</div>
                                <div className={s.leg__title__value}>Flight No</div>
                                <div className={s.leg__title__value}>From</div>
                                <div className={s.leg__title__value}>To</div>
                                <div className={s.leg__title__value}>Block Off</div>
                                <div className={s.leg__title__value}>Take Off</div>
                                <div className={s.leg__title__value}>Landing</div>
                                <div className={s.leg__title__value}>Block On</div>
                                <div className={s.leg__title__value}>Flight Time</div>
                                <div className={s.leg__title__value}>Block Time</div>
                                <div className={s.leg__title__value}>FH</div>
                                <div className={s.leg__title__value}>FC</div>
                            </div>
                            {legsComp}
                        </div>
                        <div className={s.page__footer} >
                            <span>Page</span>
                            <span>{index + 1}</span>
                            <span>of</span>
                            <span>{pages.length}</span>
                        </div>
                    </div >
                    <div className={s.break} />
                </>
            )
        })
        setPages(pagesToPrint);
    }, [legs])

    return (
        <div className={s.printBlock} ref={ref}>
            {pages}
        </div>
    );

});

export default compose(withContainerBlur)(Print);