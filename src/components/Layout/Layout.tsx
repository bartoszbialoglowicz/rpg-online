import Header from "./Header";
import Main from "./Main";
import './Layout.css';
import SideBar from "./SideBar";
import { useState } from "react";
import { mainContentName } from "../../utils/types";
import GameContextProvider from "../../store/game-context";

const Layout = () => {

    const [currentMainContent, setCurrentMainContent] = useState<mainContentName>('NEWS');

    const setCurrentMainContentHandler = (name: mainContentName) => {
        setCurrentMainContent(name);
    }

    return <GameContextProvider>
            <div className="layout">
                <Header />
                <SideBar setCurrentMainContent={setCurrentMainContentHandler}/>
                <Main currentMainContent={currentMainContent}/>
            </div>
        </GameContextProvider>
};

export default Layout;