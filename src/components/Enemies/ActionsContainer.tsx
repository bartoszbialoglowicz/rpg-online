import './ActionsContainer.css';

const ActionsContainer: React.FC<{onAttack: () => void}> = (props) => {
    return <div className="actions-container">
        <div className="action-button-container"><button onClick={props.onAttack}>Szybki Atak</button></div>
        <div className="action-button-container"><button>Silny Atak</button></div>
        <div className="action-button-container"><button>Kula ognia</button></div>
        <div className="action-button-container"><button>Ucieczka</button></div>
    </div>
};

export default ActionsContainer;