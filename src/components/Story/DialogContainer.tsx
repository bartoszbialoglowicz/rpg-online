import { NPC } from "../../types/GameTypes";
import { Dialog, DialogOptions } from "../../types/StoryTypes";
import tmp_img from '../../assets/images/tmp_avatar.png';
import { IoChatboxSharp } from "react-icons/io5";
import { IoExitSharp } from "react-icons/io5";


import './DialogContainer.css';

type Props = {
    dialog: Dialog,
    onOptionSelect: (id: number) => void,
    npc: NPC,
}

const DialogContainer: React.FC<Props> = (props) => {
    const handleDialogOption = (dialogOption: DialogOptions) => {
        if (dialogOption.next_dialog)
            props.onOptionSelect(dialogOption.next_dialog);
        else
            props.onOptionSelect(-1);
    }

    const renderIcon = (option: DialogOptions) => {
        if (!option.effects)
            return <IoChatboxSharp className="dialog-option-icon" />
        if (Object.keys(option.effects).includes('fight'))
            return <IoChatboxSharp className="dialog-option-icon" />
        else if (Object.keys(option.effects).includes('exit'))
            return <IoExitSharp className="dialog-option-icon" />
        else
            return <IoChatboxSharp className="dialog-option-icon" />
    }

    return <div className="dialog-container">
        <div className="dialog-player-img">
            <img src={tmp_img} alt='avatar' />
        </div>
        <div className="dialog-text">  
            <div className="dialog-text-description">{props.dialog.content}</div>
            <div className="dialog-options">
                {props.dialog.options.map(option => {
                const icon = renderIcon(option);
                return <div className="dialog-option" key={option.id} onClick={() => handleDialogOption(option)}>
                        <>{icon}{`${option.content}`}</>
                    </div>
            })}
            </div>
        </div>
        <div className="dialog-npc-img">
            <img src={props.npc.imageUrl} alt={props.npc.name} />
        </div>
    </div>
};

export default DialogContainer;