import HeaderHamburger from "../Header/HeaderHamburger";
import HeaderResources from "../Header/HeaderResources";

import './Header.css';

type Props = {
    onClick:  () => void
}

const Header:React.FC<Props> = (props) => {
    

    return <div className="header">
        <header>
            <HeaderHamburger onClick={props.onClick}/>
            <HeaderResources />
        </header>
    </div>
};

export default Header;