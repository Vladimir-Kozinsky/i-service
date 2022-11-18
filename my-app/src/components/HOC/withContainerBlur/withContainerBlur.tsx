import React from 'react'
import { Transition, TransitionStatus } from 'react-transition-group';
import s from './withContainerBlur.module.scss'

type transitionStylesType = {
    entering: { [key: string]: string };
    entered: { [key: string]: string };
    exiting: { [key: string]: string };
    exited: { [key: string]: string };
    unmounted?: { [key: string]: string };
}

const transitionStyles: transitionStylesType = {
    entering: { opacity: '1' },
    entered: { opacity: '1' },
    exiting: { opacity: '0' },
    exited: { opacity: '0' },
};



export const withContainerBlur = (Component: any) => {
    class newComponent extends React.Component<any> {
        myRef: any;

        constructor(props: any) {
            super(props);
            this.myRef = React.createRef();
        }
        render() {
            return (
                <Transition
                    nodeRef={this.myRef}
                    in={this.props.toggle}
                    timeout={500}
                    unmountOnExit
                >
                    {(state: TransitionStatus) => (
                        <div className={s.container}
                            ref={this.myRef}
                            style={{
                                ...transitionStyles[state]
                            }} >
                            <Component {...this.props} />
                        </div>
                    )}
                </ Transition>
            )
        }
    }
    return newComponent;
}

