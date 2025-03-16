import type { UserQuestRequirement, QuestRequirementType } from "../../types/QuestsTypes";
import { BsCheckSquare, BsSquare } from "react-icons/bs";

import './QuestRequirement.css';

type Props = {
  requirement: UserQuestRequirement
}

const QuestRequirement: React.FC<Props> = (props) => {

    const getDescription = (type: QuestRequirementType) => {
        const amount = props.requirement.requirement.amount? `(${props.requirement.amount_progress}/${props.requirement.requirement.amount})` : '';

        switch (type) {
            case 'kill':
                return `Zabij: ${props.requirement.requirement.target} ${amount}`;
            case 'collect':
                return `Zbierz: ${props.requirement.requirement.target} ${amount}`;
            case 'explore':
                return `Udaj się do ${props.requirement.requirement.target}`;
            case 'talk':
                return `Porozmawiaj z ${props.requirement.requirement.target}`;
            default:
                return '';
        }
    }


    const getIcon = (progress: string): JSX.Element | null => {
        switch (progress) {
            case "completed":
                return <BsCheckSquare className="quest-icon completed" />;
            case "in_progress":
                return <BsSquare className="quest-icon in-progress" />;
            default:
                return <BsSquare className="quest-icon not-started" />;
        }
    };
    

    return (
        <div className={`quest-requirement ${props.requirement.progress === 'completed' ? 'completed' : props.requirement.progress === 'in_progress' ? 'in-progress' : 'not-started'}`}>
            <p>{getDescription(props.requirement.requirement.type)}</p>
            {getIcon(props.requirement.progress)}
        </div>
    );
    
}

export default QuestRequirement;