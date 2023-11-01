import { useState } from "react";
import { Avatar } from "../../utils/types";
import AvatarItem from "./AvatarItem";

import './AvatarList.css';

const AvatarList: React.FC<{avatars: Avatar[]}> = (props) => {

    const [avatars, setAvatars] = useState(props.avatars);
    const [clickedIndex, setClickedIndex] = useState(-1);
    
    const itemClickHandler = (index: number) => {
        setClickedIndex(index);
    }

    const itemsJSX = () => {
        return props.avatars.map((item, index) => {
            return <div
                key={index}
                className={`avatar-list-item ${index === clickedIndex ? 'clicked' : ''}`}
                onClick={() => itemClickHandler(index)}>
                    <img src={item.imageUrl} alt={item.name} /> 
                </div>
        });
    }; 

    return <div className="avatar-list">
        {itemsJSX()}
    </div>
};

export default AvatarList;