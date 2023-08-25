import { useEffect, useState } from 'react';
import { mainContentName } from '../../utils/types';
import './MainContentContainer.css';
import MainNewsContainer from './MainNewsContainer';
import CharacterContainer from '../Character/CharacterContainer';
import Equipment from '../Equipment/Equipment';
import React from 'react';
import MapContainer from '../Map/MapContainer';
import StoreContainer from '../Store/StoreContainer';
import EnemiesContainer from '../Enemies/EnemiesContainer';
import FightContainer from '../Enemies/FightContainer';
import EquipmentContextProvider from '../../store/equipment-context';

const MainContentContainer: React.FC<{currentContent: mainContentName}> = (props) => {

    const [content, setContent] = useState<JSX.Element>(<MainNewsContainer />);

    useEffect(() => {
        switch (props.currentContent) {
            case 'CHARACTER':
                setContent(<CharacterContainer /> );
                break;
            case 'NEWS':
                setContent(<MainNewsContainer />);
                break;
            case 'EQUIPMENT':
                setContent(<Equipment />);
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
        }
    }, [props.currentContent])

    return <div className="main-content-container">
        <EquipmentContextProvider>
            {content}
        </EquipmentContextProvider>
    </div>
};

export default MainContentContainer;