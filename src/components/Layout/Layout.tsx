import Header from "./Header";
import Main from "./Main";
import './Layout.css';
import SideBar from "./SideBar";

const Layout = () => {
    return <div className="layout">
        <Header />
        <SideBar />
        <Main />
    </div>
};

export default Layout;