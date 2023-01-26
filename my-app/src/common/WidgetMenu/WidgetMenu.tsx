import { useRef, useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import s from "./WidgetMenu.module.scss"

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

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

type WidgetMenuProps = {
    showEditForm: () => void
    setDelMess: (mess: boolean) => void
}

const WidgetMenu: React.FC<WidgetMenuProps> = ({ showEditForm, setDelMess }) => {
    const [menu, setMenu] = useState(false);
    const nodeRef = useRef(null);
    
    const menuHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        menu ? setMenu(false) : setMenu(true)
        setTimeout(() => {
            setMenu(false)
        }, 5000);
    }
    return (
        <div>
            <button className={s.widget__menu} onClick={menuHandler}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <Transition
                nodeRef={nodeRef}
                in={menu}
                timeout={500}
                unmountOnExit>
                {(state: TransitionStatus) => (
                    <div className={s.widget__btns}
                        ref={nodeRef}
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                        <button className={s.widget__btns__set} onClick={showEditForm} />
                        <button className={s.widget__btns__del} onClick={() => setDelMess(true)} />
                    </div>
                )}
            </Transition>
        </div>
    )
}

export default WidgetMenu;