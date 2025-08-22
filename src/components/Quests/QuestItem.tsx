import type { UserQuest } from "../../types/QuestsTypes";
import QuestRequirement from "./QuestRequirement";

import './QuestItem.css';
import { useState } from "react";

type Props = {
  userQuest: UserQuest
}

const QuestItem: React.FC<Props> = (props) => {

  const [isExpanded, setIsExpanded] = useState(true);

  const requirements = props.userQuest.requirements.map(requirement => {
    return requirement.progress !== 'not_started' ? <QuestRequirement key={requirement.id} requirement={requirement} /> : <></>;
  });

  return (
    <div className={`quest-item`}>
      <h2 onClick={()=>setIsExpanded(prev=>!prev)}>{props.userQuest.quest.title}</h2>
      { isExpanded && <><p>{props.userQuest.quest.description}</p>
      {requirements}</>}
    </div>
);

}   

export default QuestItem;