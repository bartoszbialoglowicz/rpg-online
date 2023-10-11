import { useContext } from "react";
import { UserContext } from "../../store/user-context";
import HeaderResources from "../Header/HeaderResources";

import './Header.css';

const Header = () => {
    const userCtx = useContext(UserContext);
    
    return <div className="header">
        <header>
            <p>Hello  {userCtx.user!.nickname}</p>
            <HeaderResources />
        </header>
    </div>
};

export default Header;