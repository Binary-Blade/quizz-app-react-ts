import {FC, useState} from "react";
import './ThemeToggleButton.css';
import {BgColor, useThemeStore} from "../../store/themeStore.tsx";
import circleToggle from '../../assets/images/Ellipse 10.svg';


export const ThemeToggleButton: FC= () => {
    const { toggleChangeTheme, backgroundColor, moonIcon, sunIcon } = useThemeStore();
    const [isMoved, setIsMoved] = useState(true);

    const handleClick = () => {
        toggleChangeTheme();
        setIsMoved(!isMoved);
    };

    return (
        <>
            <div className={'flex flex-row gap-3 center'}>
                {backgroundColor === BgColor.light ? <img src={sunIcon.dark} alt='sun-icon-dark'/>: <img src={sunIcon.light} alt='sun-icon-light'/>}
                <button className={'buttonThemeStore'} onClick={handleClick}>
                    <img src={circleToggle} className={`svgMove ${isMoved ? 'moved' : 'initial' }` }  alt='toggleCircle'/>
                </button>
                {backgroundColor === BgColor.light ? <img src={moonIcon.dark} alt='moon-icon-dark'/>: <img src={moonIcon.light} alt='moon-icon-light'/>}
            </div>
        </>
    );
};