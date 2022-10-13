import React from 'react'
import s from './withContainerBlur.module.scss'


export const withContainerBlur = (Component: any) => {
    class newComponent extends React.Component<any> {
        render() {
            return (
                <div className={s.container}>
                    <div className={s.container__blur} ></div>
                    <Component {...this.props} />
                </div>
            )
        }
    }
    return newComponent;
}

