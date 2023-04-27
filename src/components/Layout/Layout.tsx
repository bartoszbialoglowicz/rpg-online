import Header from "./Header";
import Main from "./Main";
import './Layout.css';
import SideBar from "./SideBar";
import { useState } from "react";
import { mainContentName } from "../../utils/types";

const Layout = () => {

    const [currentMainContent, setCurrentMainContent] = useState<mainContentName>('NEWS');

    const setCurrentMainContentHandler = (name: mainContentName) => {
        setCurrentMainContent(name);
    }

    return <div className="layout">
        <Header />
        <SideBar setCurrentMainContent={setCurrentMainContentHandler}/>
        <Main currentMainContent={currentMainContent}/>
    </div>
};

export default Layout;