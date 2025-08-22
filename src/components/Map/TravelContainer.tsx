import LoadingBar from "../UI/LoadingBar";

import './TravelContainer.css';

type Props = {
    startTravelTime: Date,
    travelTime: Date,
    remainingTime: string
}

const TravelContainer: React.FC<Props> = (props) => {

    return <div className="travel-container">
        <h2>Obecnie podróżujesz...</h2>
        <LoadingBar minValue={props.startTravelTime.getTime()} maxValue={props.travelTime.getTime()} currentValue={new Date().getTime()} barText={props.remainingTime}/>
    </div>
};

export default TravelContainer;

