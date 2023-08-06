import { mainContentName } from '../../utils/types';
import MainContentContainer from '../Main/MainContentContainer';
import './Main.css';

const Main: React.FC<{currentMainContent: mainContentName}> = (props) => {
    return <div className="main">
        <MainContentContainer currentContent={props.currentMainContent}/>
    </div>
};

export default Main;