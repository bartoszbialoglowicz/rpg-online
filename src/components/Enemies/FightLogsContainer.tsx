import { useEffect, useRef } from 'react';
import './FightLogsContainer.css';

type Props = {
    logs: string[]
}

const FightLogsContainer: React.FC<Props> = (props) => {

    const logsJSX= props.logs.map(log => {
        return <p>{log}</p>;
    })

    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContainerRef.current)
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }, [props.logs])

    return <div className="fight-logs-container" ref={logContainerRef}>
        {logsJSX}
    </div>
};

export default FightLogsContainer;