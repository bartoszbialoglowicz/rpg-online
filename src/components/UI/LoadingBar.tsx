import './LoadingBar.css';

type Props = {
    maxValue: number,
    minValue: number,
    currentValue: number,
    barText: string,
}

const LoadingBar: React.FC<Props> = (props) => {

    const fill = `${((props.currentValue - props.minValue) / (props.maxValue - props.minValue)) * 100}%`;

    return <div className="loading-bar">
            <div className="loading-bar-fill">
                <span style={{width: fill}} className='loading-bar-fill-color'></span>
                <span className='loading-bar-fill-text'>{props.barText}</span>
            </div>
        </div>
};

export default LoadingBar;