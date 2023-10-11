import './HeaderLvlBar.css';

const HeaderLvlBar: React.FC<{currentEXP: number, lvl: number, lvlExpLimit: number}> = (props) => {

    const fill = `${(props.currentEXP / props.lvlExpLimit) * 100}%`;

    return <div className="header-lvl-bar">
        <div className="header-lvl-bar-fill">
            <span style={{width: fill}} className='header-lvl-bar-fill-color'></span>
            <span className='header-lvl-bar-current-exp'>{`${props.currentEXP} / ${props.lvlExpLimit}`}</span>
        </div>
        <div className='header-lvl-bar-icon'>{props.lvl}</div>
    </div>
};

export default HeaderLvlBar;