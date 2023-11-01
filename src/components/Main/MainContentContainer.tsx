import { useContext, useEffect, useState } from 'react';
import { mainContentName } from '../../utils/types';
import './MainContentContainer.css';
import MainNewsContainer from './MainNewsContainer';
import CharacterContainer from '../Character/CharacterContainer';
import Equipment from '../Equipment/Equipment';
import React from 'react';
import MapContainer from '../Map/MapContainer';
import StoreContainer from '../Store/StoreContainer';
import EnemiesContainer from '../Enemies/EnemiesContainer';
import EquipmentContextProvider from '../../store/equipment-context';
import Alert from '../UI/Alert';
import { UserContext } from '../../store/user-context';
import { useHttp } from '../../hooks/use-http';
import AvatarList from '../UI/AvatarList';

type responseType = {
    id: number,
    name: string,
    imageUrl: string
}

const MainContentContainer: React.FC<{currentContent: mainContentName}> = (props) => {

    const [content, setContent] = useState<JSX.Element>(<MainNewsContainer />);
    const [itemsReady, setItemsReady] = useState(false);
    
    const userCtx = useContext(UserContext);
    const sendRequest = useHttp<responseType[]>('api/avatars/', 'GET', undefined, userCtx.user?.authToken);
    const [isNew, setIsNew] = useState(userCtx.user?.isNew);

    const [avatarsJSX, setAvatarsJSX] = useState<JSX.Element>();

    useEffect(() => {
        const getData = async () => {
            const {data, code} = await sendRequest();

            if (code === 200) {
                setItemsReady(true);
                setAvatarsJSX(<AvatarList avatars={data} />);
            }
        }

        getData();
    }, [])

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
        {(itemsReady && !isNew) && <Alert title={`Witaj ${userCtx.user?.nickname}!`}
        description='Aby zakończyć proces tworzenia postaci wybierz awatar z listy poniżej'
        buttonText='OK'
        onButtonClick={() => {}}
        onOutOfBoxClickHandler={() => {}}
        children={avatarsJSX}
        />}
    </div>
};

export default MainContentContainer;