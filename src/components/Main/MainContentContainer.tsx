import { useEffect, useState } from 'react';
import { mainContentName } from '../../utils/types';
import './MainContentContainer.css';
import MainNewsContainer from './MainNewsContainer';
import CharacterContainer from '../Character/CharacterContainer';

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
        }
    }, [props.currentContent])

    return <div className="main-content-container">
        {content}
    </div>
};

export default MainContentContainer;