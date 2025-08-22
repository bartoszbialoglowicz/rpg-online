import './HeaderHamburger.css';

import hamburger from '../../assets/svgs/hamburger-menu-svgrepo-com.svg';

type Props = {
    onClick: () => void,
}

const HeaderHamburger:React.FC<Props> = (props) => {
    return <div className="header-hamburger" onClick={() => props.onClick()}>
        <img src={hamburger} alt='hamburger-menu' />
    </div>
};

export default HeaderHamburger;