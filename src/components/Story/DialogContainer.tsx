import { Dialog, DialogOptions } from "../../types/StoryTypes";

type Props = {
    dialog: Dialog,
    dialogOptions: DialogOptions[],
    onOptionSelect: (id: number) => void
}

const DialogContainer: React.FC<Props> = (props) => {

    const handleDialogOption = (nextDialogId?: number) => {
        if (nextDialogId)
            props.onOptionSelect(nextDialogId);
        else
            props.onOptionSelect(0);
    }

    return <div className="dialog-container">
        <div className="dialog-text">{props.dialog.content}</div>
        <div className="dialog-options">
            {props.dialogOptions.map(option => (
                <button key={option.id} onClick={() => handleDialogOption(option.nextDialog)}>
                    {option.content}
                </button>
            ))}
        </div>
    </div>
};

export default DialogContainer;