import { useState } from "react";
import type { UserQuest } from "../../types/QuestsTypes";
import QuestItem from "./QuestItem";

import './QuestListContainer.css';

type Props = {
    quests: UserQuest[];
    title: string;
}

const QuestListContainer: React.FC<Props> = (props) => {
    const { quests, title } = props;

    const [isHidden, setIsHidden] = useState(false);

    const renderQuests = quests.length !== 0 ? quests.map((quest: UserQuest) => {
        return <QuestItem key={quest.id} userQuest={quest} />
    }) :  <p>Brak zadań</p>;

    return <div className="quests-list-container">
        <div className="quests-list-container-title" onClick={() => setIsHidden(!isHidden)}>
            <p className="quests-list-container-title-wrap-title">{isHidden ? "Rozwiń" : "Zwiń"}</p>
            <h2>{title}</h2>
        </div>
        {!isHidden && renderQuests}
    </div>   
}

export default QuestListContainer;