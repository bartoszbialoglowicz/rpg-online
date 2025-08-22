import { useNumber } from '../../hooks/use-number';
import './HeaderLvlBar.css';
import LoadingBar from '../UI/LoadingBar';

const HeaderLvlBar: React.FC<{currentEXP: number, lvl: number, lvlExpLimit: number}> = (props) => {

    const numberConverter = useNumber();

    const currExp = numberConverter.convertWithSIPrefix(props.currentEXP);
    const expGap = numberConverter.convertWithSIPrefix(props.lvlExpLimit);

    const lvlBarText = `${currExp} / ${expGap}`;

    return <div className="header-lvl-bar">
            <LoadingBar currentValue={props.currentEXP} maxValue={props.lvlExpLimit} barText={lvlBarText} minValue={0}/>
            <div className='header-lvl-bar-icon'>{props.lvl}</div>
        </div>
        
};

export default HeaderLvlBar;