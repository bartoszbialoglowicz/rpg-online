import { Avatar } from "../../utils/types";

import './Avatar.css';

const AvatarItem: React.FC<{avatar: Avatar, onClickHandler: () => void}> = (props) => {
    return <div className="avatar-list-item" onClick={() => props.onClickHandler()}>
        <img src={props.avatar.imageUrl} alt={props.avatar.name} key={props.avatar.id} />
    </div>
};

export default AvatarItem;