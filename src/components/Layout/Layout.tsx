import Header from "./Header";
import Main from "./Main";
import './Layout.css';
import SideBar from "./SideBar";
import { useState } from "react";
import { mainContentName } from "../../utils/types";
import GameContextProvider from "../../store/game-context";

const Layout = () => {

    const [currentMainContent, setCurrentMainContent] = useState<mainContentName>('NEWS');
    const [menuHidden, setMenuHidden] = useState(false);

    const setCurrentMainContentHandler = (name: mainContentName) => {
        setCurrentMainContent(name);
    }

    const toggleSideBarMenu = () => {
        setMenuHidden((prevState) => !prevState);
    }

    return <GameContextProvider>
            <div className="layout">
                <Header onClick={toggleSideBarMenu}/>
                <SideBar setCurrentMainContent={setCurrentMainContentHandler} menuHidden={menuHidden}/>
                <Main currentMainContent={currentMainContent} menuHidden={menuHidden}/>
            </div>
        </GameContextProvider>
};

export default Layout;