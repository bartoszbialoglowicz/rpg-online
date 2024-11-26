import { mainContentName } from '../../utils/types';
import MainContentContainer from '../Main/MainContentContainer';
import './Main.css';

type Props = {
    currentMainContent: mainContentName,
    menuHidden: boolean
}

const Main: React.FC<Props> = (props) => {

    const classes = props.menuHidden ? 'main-big' : 'main-small';

    return <div className={classes}>
        <MainContentContainer currentContent={props.currentMainContent}/>
    </div>
};

export default Main;