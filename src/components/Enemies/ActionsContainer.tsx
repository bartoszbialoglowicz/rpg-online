const ActionsContainer: React.FC<{onAttack: () => void}> = (props) => {
    return <div className="actions-container">
        <div className="action-button"><button onClick={props.onAttack}>Szybki Atak</button></div>
        <div className="action-button"><button>Silny Atak</button></div>
        <div className="action-button"><button>Kula ognia</button></div>
        <div className="action-button"><button>Ucieczka</button></div>
    </div>
};

export default ActionsContainer;