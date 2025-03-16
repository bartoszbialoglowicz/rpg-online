import { useEffect, useState } from 'react';
import './MainContentContainer.css';
import React from 'react';
import MapContainer from '../Map/MapContainer';
import StoreContainer from '../Store/StoreContainer';
import EnemiesContainer from '../Enemies/EnemiesContainer';
import InventoryContainer from '../Inventory/InventoryContainer';
import { mainContentName } from '../../utils/settings';
import QuestsContainer from '../Quests/QuestsContainer';
import PageTitle from '../UI/PageTitle';

const MainContentContainer: React.FC<{currentContent: mainContentName}> = (props) => {

    const [content, setContent] = useState<JSX.Element>(<p>W budowie...</p>);

    useEffect(() => {
        switch (props.currentContent) {
            case 'NEWS':
                setContent(<p>W budowie...</p>);
                break;
            case 'EQUIPMENT':
                setContent(<InventoryContainer />);
                break;
            case 'MAP':
                setContent(<MapContainer />);
                break;
            case 'STORE':
                setContent(<StoreContainer />);
                break;
            case 'ENEMIES':
                setContent(<EnemiesContainer />);
                break;
            case 'QUESTS':
                setContent(<QuestsContainer />);
                break;
        }
    }, [props.currentContent])

    return <div className="main-content-container">
            <PageTitle title={props.currentContent}/>
            {content}
    </div>
};

export default MainContentContainer;